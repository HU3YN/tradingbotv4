from pathlib import Path
import json
import pytest
from pond.trading import Controller
from pond.broker import BrokerError,PAPER_URL
from pond.strategies import Candidate
from pond.data import synthetic_market

class FakeBroker:
    def __init__(self): self.records={};self.submissions=[];self.holdings=[];self.is_open=True;self.external=[]
    def close(self):pass
    def account(self):return {'id':'paper-account','cash':'100000','status':'ACTIVE','trading_blocked':False}
    def clock(self):return {'is_open':self.is_open,'timestamp':'2026-10-19T14:00:00+00:00','next_open':'2026-10-20T13:30:00Z'}
    def positions(self):return self.holdings
    def open_orders(self):return self.external
    def order(self,id):return self.records.get(id)
    def prices(self,symbols):return {s:100. for s in symbols}
    def submit(self,id,symbol,side,qty):
        self.submissions.append(id)
        r={'id':f'broker-{id}','status':'new','filled_qty':'0','filled_avg_price':None}
        self.records[id]=r;return r
    def cancel(self,id):
        for r in self.records.values():
            if r['id']==id:r['status']='canceled'

@pytest.fixture
def setup(tmp_path,monkeypatch):
    import pond.trading as module
    fake=FakeBroker();c=Controller(tmp_path/'paper.sqlite',lambda:fake)
    o,close=synthetic_market(400)
    monkeypatch.setattr(module,'load_market',lambda:(o,close,{'kind':'historical'}))
    configs=[Candidate('relative_momentum',20,1,1,0.).record() for _ in range(4)]
    monkeypatch.setattr(c,'report',lambda:({'finalists':configs},'hash'))
    return c,fake

def order_intent(c):
    with c.db() as db:
        db.execute("INSERT INTO agents VALUES (0,'Mac',1000,1000,'{}')")
        db.execute("INSERT INTO orders(client_id,agent,symbol,side,qty,status,session,created) VALUES ('test-order',0,'SPY','buy',4,'intent','2026-10-19','now')")
        return db.execute('SELECT * FROM orders').fetchone()

def test_partial_fills_are_idempotent_and_use_cumulative_notional(tmp_path):
    c=Controller(tmp_path/'test.sqlite');row=order_intent(c);fake=FakeBroker()
    fake.records['test-order']={'id':'broker-1','status':'partially_filled','filled_qty':'2','filled_avg_price':'100'}
    c.reconcile(fake,row);c.reconcile(fake,row)
    with c.db() as db:
        assert db.execute('SELECT cash FROM agents').fetchone()[0]==800
        assert db.execute('SELECT qty FROM positions').fetchone()[0]==2
    fake.records['test-order'].update(status='filled',filled_qty='4',filled_avg_price='101')
    c.reconcile(fake,row);c.reconcile(fake,row)
    with c.db() as db:
        assert db.execute('SELECT cash FROM agents').fetchone()[0]==596
        assert db.execute('SELECT qty FROM positions').fetchone()[0]==4
        assert db.execute('SELECT cost FROM positions').fetchone()[0]==404

def test_start_requires_dedicated_account(setup):
    c,b=setup;b.holdings=[{'symbol':'SPY','qty':'1'}]
    with pytest.raises(BrokerError,match='dedicated'):c.start()
    assert not c.status()['armed']

def test_closed_market_requires_schedule(setup):
    c,b=setup;b.is_open=False
    with pytest.raises(BrokerError,match='closed'):c.start()
    assert c.start(schedule=True)['schedule']

def test_daily_tick_does_not_duplicate_open_orders(setup):
    c,b=setup;c.start();c.tick();assert len(b.submissions)==4
    c.tick();assert len(b.submissions)==4
    assert len(set(b.submissions))==4
    assert c.status()['agents'][0]['active']

def test_ambiguous_submission_never_resubmits(setup):
    c,b=setup;c.start()
    def uncertain(*args):raise BrokerError('network outcome unknown')
    b.submit=uncertain
    with pytest.raises(BrokerError):c.tick()
    with pytest.raises(BrokerError,match='no broker record'):c.tick()
    with c.db() as db:assert db.execute('SELECT COUNT(*) FROM orders').fetchone()[0]==1

def test_unmanaged_position_halts(setup):
    c,b=setup;c.start();b.holdings=[{'symbol':'SPY','qty':'1'}]
    with pytest.raises(BrokerError,match='differ'):c.tick()
    assert not b.submissions

def test_pause_cancels_orders_and_disarms(setup):
    c,b=setup;c.start();c.tick();s=c.stop()
    assert not s['armed'] and not s['schedule']
    assert all(x['status']=='canceled' for x in s['orders'])

def test_restart_disarms_manual_session(setup):
    c,b=setup;c.start();assert c.status()['armed']
    assert not Controller(c.path,lambda:b).status()['armed']

def test_resident_rename_preserves_existing_ledger(tmp_path):
    path=tmp_path/'existing.sqlite'
    c=Controller(path)
    with c.db() as db:
        for i,name in enumerate(['Marigold','Cobalt','Bumble','Indigo']):
            db.execute('INSERT INTO agents VALUES (?,?,?,?,?)',(i,name,1234+i,2000,'{"family":"trend"}'))
        db.execute("INSERT INTO positions VALUES (2,'SPY',3,900)")
        before=[tuple(row) for row in db.execute('SELECT id,cash,initial,strategy FROM agents ORDER BY id')]
    reopened=Controller(path)
    with reopened.db() as db:
        assert [row[0] for row in db.execute('SELECT name FROM agents ORDER BY id')]==['Mac','Cobalt','Cheese','Bluey']
        assert [tuple(row) for row in db.execute('SELECT id,cash,initial,strategy FROM agents ORDER BY id')]==before
        assert tuple(db.execute('SELECT * FROM positions').fetchone())==(2,'SPY',3,900)

def test_endpoint_is_fixed_to_paper():assert PAPER_URL=='https://paper-api.alpaca.markets'

def test_manual_start_does_not_authorize_next_day(setup):
    c,b=setup;c.start()
    old_clock=b.clock
    b.clock=lambda:{**old_clock(),'timestamp':'2026-10-20T14:00:00+00:00'}
    c.tick()
    assert not c.status()['armed'] and not b.submissions

def test_manual_session_disarms_at_close(setup):
    c,b=setup;c.start();b.is_open=False;c.tick()
    assert not c.status()['armed']

def test_daily_schedule_remains_armed_at_close(setup):
    c,b=setup;c.start(schedule=True);b.is_open=False;c.tick()
    assert c.status()['armed'] and c.status()['schedule']

def test_fill_average_price_correction_is_idempotent(tmp_path):
    c=Controller(tmp_path/'correction.sqlite');row=order_intent(c);b=FakeBroker()
    b.records['test-order']={'id':'broker-1','status':'partially_filled','filled_qty':'2','filled_avg_price':'100'}
    c.reconcile(b,row)
    b.records['test-order']['filled_avg_price']='101'
    c.reconcile(b,row);c.reconcile(b,row)
    with c.db() as db:
        assert db.execute('SELECT cash FROM agents').fetchone()[0]==798
        assert db.execute('SELECT cost FROM positions').fetchone()[0]==202
