import json
from fastapi.testclient import TestClient
from pond import api
from pond.trading import Controller

def client(tmp_path,monkeypatch):
    import pond.trading as trading
    monkeypatch.setattr(api,'ROOT',tmp_path)
    monkeypatch.setattr(trading,'ROOT',tmp_path)
    c=Controller(tmp_path/'api.sqlite')
    monkeypatch.setattr(api,'controller',c)
    return TestClient(api.app)

def test_health_and_empty_state_do_not_invent_profits(tmp_path,monkeypatch):
    c=client(tmp_path,monkeypatch)
    assert c.get('/api/health').json()['mode']=='paper'
    payload=c.get('/api/state').json()
    assert all(a['daily_pnl'] is None for a in payload['agents'])
    assert payload['tournament'] is None

def test_mutations_require_local_csrf_token(tmp_path,monkeypatch):
    c=client(tmp_path,monkeypatch)
    assert c.post('/api/stop').status_code==403
    token=c.get('/api/state').json()['csrf']
    assert c.post('/api/stop',headers={'X-Terrarium-Token':token}).status_code==200

def test_start_cannot_deploy_synthetic_or_missing_report(tmp_path,monkeypatch):
    c=client(tmp_path,monkeypatch)
    token=c.get('/api/state').json()['csrf']
    r=c.post('/api/start',headers={'X-Terrarium-Token':token},json={'schedule':False})
    assert r.status_code==409
    assert 'real-data tournament' in r.json()['detail']

def test_dns_rebinding_host_is_rejected(tmp_path,monkeypatch):
    c=client(tmp_path,monkeypatch)
    assert c.get('/api/state',headers={'host':'evil.example'}).status_code==400

def test_credential_values_are_never_in_state(tmp_path,monkeypatch):
    c=client(tmp_path,monkeypatch)
    monkeypatch.setenv('ALPACA_API_KEY','test-secret-key')
    monkeypatch.setenv('ALPACA_SECRET_KEY','test-secret-value')
    result=c.get('/api/state')
    assert 'test-secret-key' not in result.text
    assert 'test-secret-value' not in result.text


def test_restart_does_not_treat_persisted_market_clock_as_fresh(tmp_path,monkeypatch):
    import pond.trading as trading
    from datetime import datetime, timezone
    c=client(tmp_path,monkeypatch)
    controller=api.controller
    with controller.db() as db:
        controller.set(db,'market_open','true')
        controller.set(db,'error','Old trading error')
    status=c.get('/api/state').json()
    assert status['market_open'] is True
    assert status['market_clock_fresh'] is False
    assert abs((datetime.now(timezone.utc)-datetime.fromisoformat(status['server_time'])).total_seconds())<5
    monkeypatch.setattr(trading.time,'monotonic',lambda:100.)
    controller.mark_clock_fresh()
    assert c.get('/api/state').json()['market_clock_fresh'] is True
    monkeypatch.setattr(trading.time,'monotonic',lambda:191.)
    assert c.get('/api/state').json()['market_clock_fresh'] is False
    restored=Controller(controller.path)
    assert restored.status()['market_open'] is True
    assert restored.status()['market_clock_fresh'] is False


def test_reconnect_clears_only_auth_error_and_does_not_restart_trading(tmp_path,monkeypatch):
    from pond.broker import AuthenticationError,BrokerError
    monkeypatch.setenv('ALPACA_API_KEY','previous-test-key')
    monkeypatch.setenv('ALPACA_SECRET_KEY','previous-test-secret')
    c=client(tmp_path,monkeypatch)
    class Connection:
        def account(self):return {'id':'paper-test','status':'ACTIVE'}
        def clock(self):return {'is_open':True}
        def close(self):pass
    monkeypatch.setattr(api,'Alpaca',Connection)
    token=c.get('/api/state').json()['csrf']
    for failure,expected in [(AuthenticationError('Bad keys'),''),(BrokerError('Reconcile orders'),'Reconcile orders')]:
        api.controller.fail(failure)
        r=c.post('/api/connect',headers={'X-Terrarium-Token':token},json={'key':' paper-test-key ','secret':' paper-test-secret '})
        assert r.status_code==200
        s=c.get('/api/state').json()
        assert s['error']==expected and not s['armed'] and not s['schedule']
        assert s['market_clock_fresh']


def test_background_loop_preserves_retryable_error_type(monkeypatch):
    import asyncio
    from pond.broker import MarketDataUnavailable
    failure=MarketDataUnavailable('Waiting for DBC')
    received=[]
    class WaitingController:
        def tick(self):raise failure
        def fail(self,error):received.append(error)
    async def end_cycle(seconds):
        assert seconds==20
        raise asyncio.CancelledError
    monkeypatch.setattr(api,'controller',WaitingController())
    monkeypatch.setattr(api.asyncio,'sleep',end_cycle)
    async def run():
        try:await api.loop()
        except asyncio.CancelledError:pass
    asyncio.run(run())
    assert received==[failure]
