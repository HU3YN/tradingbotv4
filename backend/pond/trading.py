"""Durable four-agent paper controller with serialized, idempotent order intents."""
import hashlib,json,os,sqlite3,threading,time
from datetime import datetime
from decimal import Decimal,ROUND_DOWN
from zoneinfo import ZoneInfo
from .data import ROOT,SYMBOLS,load_market,fetch_yahoo
from .broker import Alpaca,BrokerError
from .strategies import Candidate,SignalFactory

NAMES=['Mac','Cobalt','Cheese','Bluey']
ACTIVE=('intent','new','accepted','pending_new','partially_filled','pending_cancel','accepted_for_bidding','held','pending_replace','stopped','calculated')
TERMINAL=('filled','canceled','expired','rejected','done_for_day','replaced')
class Controller:
    def __init__(self,path=None,broker_factory=Alpaca):
        self.path=path or ROOT/'data/paper.sqlite'; self.path.parent.mkdir(parents=True,exist_ok=True)
        self.broker_factory=broker_factory; self.lock=threading.RLock()
        self.clock_checked_at=None
        with self.db() as db:
            db.executescript('''
            CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY,value TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS agents (id INTEGER PRIMARY KEY,name TEXT,cash REAL,initial REAL,strategy TEXT);
            CREATE TABLE IF NOT EXISTS positions (agent INTEGER,symbol TEXT,qty REAL,cost REAL,PRIMARY KEY(agent,symbol));
            CREATE TABLE IF NOT EXISTS orders (client_id TEXT PRIMARY KEY,agent INTEGER,symbol TEXT,side TEXT,qty REAL,status TEXT,broker_id TEXT,filled REAL DEFAULT 0,notional REAL DEFAULT 0,session TEXT,created TEXT);
            CREATE TABLE IF NOT EXISTS plans (session TEXT,agent INTEGER,targets TEXT,PRIMARY KEY(session,agent));
            CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT,time TEXT,message TEXT);
            CREATE TABLE IF NOT EXISTS baselines (session TEXT,agent INTEGER,equity REAL,PRIMARY KEY(session,agent));
            ''')
            # Resident labels may change; their IDs and financial history stay intact.
            db.executemany('UPDATE agents SET name=? WHERE id=?',[(name,i) for i,name in enumerate(NAMES)])
            # On a process restart, require an explicit Start click unless daily scheduling is enabled.
            if self.get(db,'schedule','false')!='true': self.set(db,'armed','false')
    def db(self):
        db=sqlite3.connect(self.path,timeout=30); db.row_factory=sqlite3.Row; return db
    def get(self,db,key,default=None):
        row=db.execute('SELECT value FROM settings WHERE key=?',(key,)).fetchone(); return row[0] if row else default
    def set(self,db,key,value): db.execute('INSERT OR REPLACE INTO settings VALUES (?,?)',(key,str(value)))
    def event(self,db,message): db.execute('INSERT INTO events(time,message) VALUES (?,?)',(datetime.now().astimezone().isoformat(),message))
    def report(self):
        path=ROOT/'reports/tournament.json'
        if not path.exists(): raise BrokerError('Run the real-data tournament before deploying paper agents.')
        report=json.loads(path.read_text())
        if report.get('status')!='historical_completed' or report.get('data',{}).get('kind')!='historical': raise BrokerError('Synthetic results cannot be deployed.')
        return report,hashlib.sha256(path.read_bytes()).hexdigest()
    def start(self,schedule=False):
        with self.lock:
            report,digest=self.report(); load_market()  # current, complete, checksummed history
            broker=self.broker_factory()
            try:
                account=broker.account(); clock=broker.clock()
                if account.get('trading_blocked') or account.get('account_blocked') or account.get('status')!='ACTIVE': raise BrokerError('The paper account is not active for trading.')
                if not clock['is_open'] and not schedule: raise BrokerError('Market is closed. Enable the daily schedule to start at the next opening.')
                with self.db() as db:
                    if not db.execute('SELECT 1 FROM agents LIMIT 1').fetchone():
                        if broker.positions() or broker.open_orders(): raise BrokerError('Use a dedicated paper account with no existing positions or open orders for initial setup.')
                        budget=min(float(account['cash'])*.20,10000.)
                        if budget<100: raise BrokerError('At least $500 paper cash is required.')
                        for i in range(4):
                            cfg=report['finalists'][[0,1,0,2][i]]
                            db.execute('INSERT INTO agents VALUES (?,?,?,?,?)',(i,NAMES[i],budget,budget,json.dumps(cfg)))
                        self.set(db,'report_hash',digest); self.set(db,'account_id',account['id'])
                    elif self.get(db,'account_id')!=account['id']: raise BrokerError('Connected account differs from the account bound to the local ledger.')
                    self.set(db,'armed','true'); self.set(db,'schedule',json.dumps(schedule)); self.set(db,'error','')
                    self.set(db,'manual_session',datetime.fromisoformat(clock['timestamp'].replace('Z','+00:00')).astimezone(ZoneInfo('America/New_York')).date().isoformat())
                    self.event(db,'Daily paper schedule enabled' if schedule else 'Paper agents started')
            finally: broker.close()
        return self.status()
    def stop(self):
        with self.lock:
            with self.db() as db:
                self.set(db,'armed','false'); self.set(db,'schedule','false'); self.event(db,'Paused; held positions remain open.')
                pending=db.execute('SELECT * FROM orders').fetchall()
            if any(x['status'] not in TERMINAL for x in pending):
                broker=self.broker_factory()
                try:
                    for row in pending:
                        if row['status'] in TERMINAL: continue
                        found=broker.order(row['client_id'])
                        if found and found.get('status') not in TERMINAL: broker.cancel(found['id'])
                        self.reconcile(broker,row)
                finally: broker.close()
        return self.status()
    def reconcile(self,broker,row):
        found=broker.order(row['client_id'])
        if found is None: return False
        qty=float(found.get('filled_qty') or 0); notional=qty*float(found.get('filled_avg_price') or 0)
        with self.db() as db:
            latest=db.execute('SELECT * FROM orders WHERE client_id=?',(row['client_id'],)).fetchone()
            delta=qty-latest['filled']; money=notional-latest['notional']
            if delta<-1e-6: raise BrokerError('Non-monotonic broker fill requires reconciliation')
            if delta>0 or abs(money)>1e-8:
                pos=db.execute('SELECT * FROM positions WHERE agent=? AND symbol=?',(row['agent'],row['symbol'])).fetchone()
                oldqty=pos['qty'] if pos else 0.; cost=pos['cost'] if pos else 0.
                if row['side']=='buy': newqty=oldqty+delta; cost+=money; cash_delta=-money
                else:
                    newqty=oldqty-delta
                    if newqty<-1e-6: raise BrokerError('Broker sell exceeds virtual agent position')
                    cost=cost*(max(0,newqty)/oldqty) if oldqty else 0.; cash_delta=money
                db.execute('INSERT OR REPLACE INTO positions VALUES (?,?,?,?)',(row['agent'],row['symbol'],max(0,newqty),cost))
                db.execute('UPDATE agents SET cash=cash+? WHERE id=?',(cash_delta,row['agent']))
                self.event(db,f'{NAMES[row["agent"]]} · {row["side"]} {delta:.5f} {row["symbol"]} filled')
            db.execute('UPDATE orders SET status=?,broker_id=?,filled=?,notional=? WHERE client_id=?',(found['status'],found['id'],qty,notional,row['client_id']))
        return True
    def tick(self):
        with self.lock:
            with self.db() as db:
                armed=self.get(db,'armed','false')=='true'
                rows=db.execute('SELECT * FROM orders').fetchall()
            active=[r for r in rows if r['status'] not in TERMINAL]
            credentials=bool((os.getenv('ALPACA_API_KEY') or os.getenv('APCA_API_KEY_ID')) and (os.getenv('ALPACA_SECRET_KEY') or os.getenv('APCA_API_SECRET_KEY')))
            if not armed and not active and not credentials and self.broker_factory is Alpaca: return
            broker=self.broker_factory()
            try:
                for row in active:
                    exists=self.reconcile(broker,row)
                    if not exists:
                        # Unknown POST outcome is never resubmitted automatically.
                        raise BrokerError('An order intent has no broker record. Pause and reconcile it before resuming; automatic resubmission is disabled.')
                clock=broker.clock()
                with self.db() as db: self.set(db,'market_open',json.dumps(bool(clock['is_open']))); self.set(db,'next_open',clock.get('next_open',''))
                self.mark_clock_fresh()
                if not clock['is_open']:
                    with self.db() as db:
                        if armed and self.get(db,'schedule','false')!='true':
                            self.set(db,'armed','false'); self.event(db,'Market closed; manual session finished.')
                    return
                if not armed:
                    with self.db() as db: has_agents=bool(db.execute('SELECT 1 FROM agents LIMIT 1').fetchone())
                    if has_agents:
                        prices=broker.prices(SYMBOLS)
                        with self.db() as db:
                            self.set(db,'prices',json.dumps(prices)); self.set(db,'last_quote',clock['timestamp'])
                    return
                session=datetime.fromisoformat(clock['timestamp'].replace('Z','+00:00')).astimezone(ZoneInfo('America/New_York')).date().isoformat()
                with self.db() as db:
                    if self.get(db,'schedule','false')!='true' and self.get(db,'manual_session')!=session:
                        self.set(db,'armed','false'); self.event(db,'Manual session ended; click Start for a new day.'); return
                account=broker.account()
                with self.db() as db:
                    if self.get(db,'account_id')!=account['id']: raise BrokerError('Paper account changed; trading paused')
                    if account.get('trading_blocked') or float(account.get('cash',0))<0: raise BrokerError('Account risk check failed')
                    rows=db.execute('SELECT * FROM orders').fetchall()
                    owned={r['broker_id'] for r in rows if r['broker_id']}
                    if any(o['id'] not in owned for o in broker.open_orders()): raise BrokerError('Unmanaged open orders detected; trading paused')
                    if any(r['status'] not in TERMINAL for r in rows): return
                    expected={r['symbol']:r['qty'] for r in db.execute('SELECT symbol,SUM(qty) qty FROM positions GROUP BY symbol')}
                    actual={r['symbol']:float(r['qty']) for r in broker.positions()}
                    if any(abs(expected.get(s,0)-actual.get(s,0))>1e-4 for s in set(expected)|set(actual)): raise BrokerError('Broker positions differ from the agent ledger; trading paused')
                    agents=[dict(a) for a in db.execute('SELECT * FROM agents')]
                prices=broker.prices(SYMBOLS)
                with self.db() as db:
                    self.set(db,'prices',json.dumps(prices)); self.set(db,'last_quote',clock['timestamp'])
                need_plan=False
                with self.db() as db: need_plan=db.execute('SELECT COUNT(*) FROM plans WHERE session=?',(session,)).fetchone()[0]!=4
                if need_plan:
                    try: _,close,_=load_market()
                    except (ValueError, FileNotFoundError):
                        fetch_yahoo(); _,close,_=load_market()
                    factory=SignalFactory(close)
                    with self.db() as db:
                        for agent in agents:
                            cfg=Candidate.from_record(json.loads(agent['strategy']))
                            pos={r['symbol']:r['qty'] for r in db.execute('SELECT * FROM positions WHERE agent=?',(agent['id'],))}
                            equity=agent['cash']+sum(q*prices[s] for s,q in pos.items())
                            db.execute('INSERT OR IGNORE INTO baselines VALUES (?,?,?)',(session,agent['id'],equity))
                            w=factory.weights(cfg).iloc[-1]
                            previous_plans=db.execute('SELECT 1 FROM plans WHERE agent=? LIMIT 1',(agent['id'],)).fetchone()
                            if cfg.rebalance==5 and close.index[-1].weekday()!=4 and previous_plans:
                                targets=pos
                            else: targets={s:float(Decimal(str(equity*.98*float(w[s])/prices[s])).quantize(Decimal('.000001'),rounding=ROUND_DOWN)) for s in SYMBOLS}
                            db.execute('INSERT OR IGNORE INTO plans VALUES (?,?,?)',(session,agent['id'],json.dumps(targets)))
                # One outstanding order per agent; execute all sells before buys and use confirmed cash.
                for agent in agents:
                    with self.db() as db:
                        baseline=db.execute('SELECT equity FROM baselines WHERE session=? AND agent=?',(session,agent['id'])).fetchone()[0]
                        positions={r['symbol']:r['qty'] for r in db.execute('SELECT * FROM positions WHERE agent=?',(agent['id'],))}
                        cash=db.execute('SELECT cash FROM agents WHERE id=?',(agent['id'],)).fetchone()[0]
                        equity=cash+sum(q*prices[s] for s,q in positions.items())
                        if equity<baseline*.95: raise BrokerError(f'{agent["name"]}: 5% daily loss stop; new orders paused, positions remain held')
                        targets=json.loads(db.execute('SELECT targets FROM plans WHERE session=? AND agent=?',(session,agent['id'])).fetchone()[0])
                        candidates=[]
                        for symbol in SYMBOLS:
                            delta=targets.get(symbol,0)-positions.get(symbol,0)
                            if abs(delta)*prices[symbol]<5: continue
                            side='buy' if delta>0 else 'sell'
                            if side=='buy' and delta*prices[symbol]>cash*.98: continue
                            candidates.append((side,symbol,abs(delta)))
                        candidates.sort(key=lambda x:x[0]=='buy')
                        if not candidates: continue
                        side,symbol,qty=candidates[0]
                        existing=db.execute('SELECT COUNT(*) FROM orders WHERE agent=? AND session=? AND symbol=? AND side=?',(agent['id'],session,symbol,side)).fetchone()[0]
                        if existing: continue  # rejected/partial-canceled orders require next session/manual review
                        client_id=f'pond-{session}-{agent["id"]}-{symbol}-{side}'
                        qty=float(Decimal(str(qty)).quantize(Decimal('.000001'),rounding=ROUND_DOWN))
                        db.execute('INSERT INTO orders(client_id,agent,symbol,side,qty,status,session,created) VALUES (?,?,?,?,?,?,?,?)',(client_id,agent['id'],symbol,side,qty,'intent',session,datetime.now().astimezone().isoformat()))
                    try: broker.submit(client_id,symbol,side,qty)
                    except Exception:
                        with self.db() as db: self.event(db,f'{agent["name"]}: submission outcome uncertain; reconciliation required')
                        raise
                    with self.db() as db: row=db.execute('SELECT * FROM orders WHERE client_id=?',(client_id,)).fetchone()
                    self.reconcile(broker,row)
                with self.db() as db: self.set(db,'error','')
            finally: broker.close()
    def fail(self,error):
        with self.db() as db:
            self.set(db,'error',str(error)); self.set(db,'armed','false'); self.set(db,'schedule','false'); self.event(db,str(error))
    def mark_clock_fresh(self):
        # Process-local: a persisted market-open flag is not a fresh broker clock.
        self.clock_checked_at=time.monotonic()
    def status(self):
        with self.db() as db:
            prices=json.loads(self.get(db,'prices','{}')); agents=[]
            session=datetime.now(ZoneInfo('America/New_York')).date().isoformat()
            for i in range(4):
                a=db.execute('SELECT * FROM agents WHERE id=?',(i,)).fetchone()
                pos=[dict(r) for r in db.execute('SELECT * FROM positions WHERE agent=? AND qty>0.000001',(i,))]
                equity=(a['cash']+sum(r['qty']*prices.get(r['symbol'],r['cost']/r['qty']) for r in pos)) if a else 0.
                baseline=db.execute('SELECT equity FROM baselines WHERE session=? AND agent=?',(session,i)).fetchone()
                cfg=json.loads(a['strategy']) if a else None
                agents.append({'id':i,'name':NAMES[i],'species':'Yellow-banded' if i in (0,2) else 'Blue poison dart',
                 'strategy':cfg,'cash':a['cash'] if a else None,'equity':equity if a else None,'daily_pnl':equity-baseline[0] if baseline else None,
                 'total_pnl':equity-a['initial'] if a else None,'positions':pos,
                 'active':bool(db.execute('SELECT 1 FROM orders WHERE agent=? AND status NOT IN (?,?,?,?,?,?) LIMIT 1',(i,*TERMINAL)).fetchone())})
            return {'mode':'paper','armed':self.get(db,'armed','false')=='true','schedule':self.get(db,'schedule','false')=='true',
             'market_clock_fresh':self.clock_checked_at is not None and time.monotonic()-self.clock_checked_at<90,
             'market_open':self.get(db,'market_open','false')=='true','next_open':self.get(db,'next_open',''),
             'error':self.get(db,'error',''),'last_quote':self.get(db,'last_quote',''),'agents':agents,
             'events':[dict(x) for x in db.execute('SELECT * FROM events ORDER BY id DESC LIMIT 30')],
             'orders':[dict(x) for x in db.execute('SELECT * FROM orders ORDER BY created DESC LIMIT 30')]}
