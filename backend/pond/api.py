import asyncio,json,os,secrets,threading
from datetime import datetime,timezone
from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI,HTTPException,Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from pydantic import BaseModel,Field
from .data import ROOT,fetch_yahoo,load_market
from .tournament import run_tournament
from .trading import Controller
from .broker import Alpaca,BrokerError

controller=Controller(); csrf=secrets.token_urlsafe(32)
research={'running':False,'completed':0,'total':1200,'error':''}; research_lock=threading.Lock()
async def loop():
    while True:
        try: await asyncio.to_thread(controller.tick)
        except Exception as e: controller.fail(e if isinstance(e,(BrokerError,ValueError)) else f'Controller stopped: {type(e).__name__}')
        await asyncio.sleep(20)
@asynccontextmanager
async def lifespan(app):
    task=asyncio.create_task(loop())
    yield
    task.cancel()
    try: await task
    except asyncio.CancelledError: pass
app=FastAPI(title='Terrarium paper trading',lifespan=lifespan)
app.add_middleware(TrustedHostMiddleware,allowed_hosts=['localhost','127.0.0.1','testserver'])
@app.middleware('http')
async def guard(request:Request,call_next):
    if request.method in ('POST','PUT','DELETE','PATCH') and not secrets.compare_digest(request.headers.get('X-Terrarium-Token',''),csrf):
        from fastapi.responses import JSONResponse
        return JSONResponse({'detail':'Missing local session token'},status_code=403)
    response=await call_next(request)
    response.headers['Cache-Control']='no-store' if request.url.path.startswith('/api') else 'no-cache'
    response.headers['X-Content-Type-Options']='nosniff'
    response.headers['Referrer-Policy']='no-referrer'
    return response
@app.get('/api/health')
def health():
    try: build_id=json.loads((ROOT/'frontend/dist/build-info.json').read_text())['build']
    except (OSError,ValueError,KeyError): build_id=None
    return {'ok':True,'mode':'paper','version':'0.1.0','dashboard_build':build_id}
@app.get('/api/state')
def state():
    s=controller.status(); s['csrf']=csrf; s['research']=research.copy()
    s['server_time']=datetime.now(timezone.utc).isoformat()
    s['credentials_present']=bool((os.getenv('ALPACA_API_KEY') or os.getenv('APCA_API_KEY_ID')) and (os.getenv('ALPACA_SECRET_KEY') or os.getenv('APCA_API_SECRET_KEY')))
    path=ROOT/'reports/tournament.json'
    s['tournament']=None
    if path.exists():
        r=json.loads(path.read_text())
        s['tournament']={k:r[k] for k in ['status','candidate_count','family_count','unique_signal_paths','batch_count','champion','retrospective_champion','finalists','periods','benchmark','equity_curves','limitations']}
    return s
class Start(BaseModel): schedule:bool=False
@app.post('/api/start')
def start(body:Start):
    try: return controller.start(body.schedule)
    except (BrokerError,ValueError,FileNotFoundError) as e: raise HTTPException(409,str(e)) from None
@app.post('/api/stop')
def stop():
    try: return controller.stop()
    except BrokerError as e: raise HTTPException(409,str(e)) from None
class Credentials(BaseModel):
    key:str=Field(min_length=8,max_length=256)
    secret:str=Field(min_length=8,max_length=256)
@app.post('/api/connect')
def connect(body:Credentials):
    # Memory only; no browser storage, file writing, or value-bearing logging.
    with controller.lock:
        if controller.status()['armed']: raise HTTPException(409,'Pause trading before changing credentials.')
        old={k:os.environ.get(k) for k in ['ALPACA_API_KEY','ALPACA_SECRET_KEY']}
        os.environ['ALPACA_API_KEY']=body.key.strip(); os.environ['ALPACA_SECRET_KEY']=body.secret.strip()
        try:
            broker=Alpaca()
            try: account=broker.account(); clock=broker.clock()
            finally: broker.close()
            with controller.db() as db:
                bound=controller.get(db,'account_id')
                if bound and account['id']!=bound: raise BrokerError('This ledger is bound to a different paper account.')
                controller.set(db,'market_open',json.dumps(bool(clock['is_open'])))
                controller.set(db,'next_open',clock.get('next_open',''))
                if controller.get(db,'error_kind')=='authentication':
                    controller.set(db,'error',''); controller.set(db,'error_kind','')
                controller.event(db,'Paper account connection verified. Click Start or enable the daily schedule to trade.')
            controller.mark_clock_fresh()
            return {'connected':True,'status':account['status'],'market_open':clock['is_open']}
        except BrokerError as e:
            for k,v in old.items():
                if v is None: os.environ.pop(k,None)
                else: os.environ[k]=v
            raise HTTPException(409,str(e)) from None

def research_job():
    try:
        meta=fetch_yahoo(); o,c,meta=load_market()
        def progress(i,n): research.update(completed=i,total=n)
        run_tournament(o,c,meta,ROOT/'reports/tournament.json',progress=progress)
    except Exception as e:
        research['error']=f'{type(e).__name__}: historical research could not complete. Check provider access and dataset quality.'
        (ROOT/'reports/research-error.txt').write_text(f'{type(e).__name__}: {str(e)}\n')
    finally: research['running']=False; research_lock.release()
@app.post('/api/research')
def run_research():
    if controller.status()['armed']: raise HTTPException(409,'Pause trading before running research.')
    if not research_lock.acquire(blocking=False): raise HTTPException(409,'Research is already running')
    research.update(running=True,completed=0,error='')
    threading.Thread(target=research_job,daemon=True).start()
    return research
@app.get('/api/report')
def report():
    path=ROOT/'reports/tournament.json'
    if not path.exists(): raise HTTPException(404,'No historical tournament has completed')
    return FileResponse(path,filename='terrarium-tournament.json',media_type='application/json')

build=ROOT/'frontend/dist'
if build.exists():
    app.mount('/assets',StaticFiles(directory=build/'assets'),name='assets')
    @app.get('/favicon.svg')
    def favicon(): return FileResponse(build/'favicon.svg')
    @app.get('/')
    def home(): return FileResponse(build/'index.html')

@app.get('/api/charts')
def charts():
    """Actual cached daily OHLC only. Absent data yields no artificial price series."""
    path=ROOT/'data/market.csv'
    if not path.exists(): return {'kind':'unavailable','series':{}}
    try:
        import pandas as pd
        load_market(require_current=False)
        frame=pd.read_csv(path)
        series={symbol:group.tail(60)[['date','open','high','low','close']].to_dict('records') for symbol,group in frame.groupby('symbol')}
        return {'kind':'historical','series':series}
    except (ValueError,FileNotFoundError): return {'kind':'unavailable','series':{}}
