from __future__ import annotations
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from pathlib import Path
import hashlib, json, os, tempfile, shutil
import httpx
import numpy as np
import pandas as pd

ROOT=Path(__file__).resolve().parents[2]
SYMBOLS=['SPY','QQQ','IWM','EFA','EEM','TLT','IEF','GLD','VNQ','DBC']

def atomic_json(path, payload):
    path=Path(path); path.parent.mkdir(parents=True,exist_ok=True)
    fd,tmp=tempfile.mkstemp(dir=path.parent,suffix='.tmp')
    try:
        with os.fdopen(fd,'w') as f: json.dump(payload,f,indent=2,allow_nan=False)
        os.replace(tmp,path)
    finally:
        if os.path.exists(tmp): os.unlink(tmp)

def last_completed_session(now=None):
    import exchange_calendars as xc
    now=pd.Timestamp.now(tz='America/New_York') if now is None else pd.Timestamp(now).tz_convert('America/New_York')
    calendar=xc.get_calendar('XNYS')
    day=now.tz_localize(None).normalize()
    if calendar.is_session(day) and now>=calendar.session_close(day)+pd.Timedelta(minutes=15):
        return day
    return calendar.date_to_session(day-pd.Timedelta(days=1),direction='previous').tz_localize(None)

def fetch_yahoo(destination=ROOT/'data/market.csv'):
    """Adjusted OHLC + provenance. Never falls back to generated prices."""
    last=last_completed_session()
    today=datetime.now(ZoneInfo('America/New_York')).date()
    start=today-timedelta(days=365*7)
    end=(last+pd.Timedelta(days=1)).tz_localize('America/New_York')
    frames=[]; sources=[]
    with httpx.Client(timeout=40,follow_redirects=True,headers={'User-Agent':'TerrariumResearch/0.1'}) as client:
        for symbol in SYMBOLS:
            url=f'https://query1.finance.yahoo.com/v8/finance/chart/{symbol}'
            response=client.get(url,params={'period1':int(pd.Timestamp(start,tz='America/New_York').timestamp()),'period2':int(end.timestamp()),'interval':'1d','events':'div,splits'})
            response.raise_for_status()
            payload=response.json()['chart']['result'][0]
            q=payload['indicators']['quote'][0]; adj=payload['indicators']['adjclose'][0]['adjclose']
            dates=pd.to_datetime(payload['timestamp'],unit='s',utc=True).tz_convert('America/New_York').tz_localize(None).normalize()
            frame=pd.DataFrame(q,index=dates); factor=pd.Series(adj,index=dates)/frame.close
            for col in ['open','high','low','close']: frame[col]=frame[col]*factor
            frame['symbol']=symbol; frame.index.name='date'; frame=frame[frame.index<=last]
            frames.append(frame.reset_index()); sources.append({'symbol':symbol,'url':url,'sha256_response':hashlib.sha256(response.content).hexdigest()})
    combined=pd.concat(frames).sort_values(['date','symbol'])
    validate(combined)
    destination=Path(destination); destination.parent.mkdir(parents=True,exist_ok=True)
    # Preserve the prior dataset so an archived report remains reproducible.
    if destination.exists() and destination.with_suffix('.json').exists():
        old_hash=hashlib.sha256(destination.read_bytes()).hexdigest()
        archive=destination.parent/'archive';archive.mkdir(exist_ok=True)
        if not (archive/f'{old_hash}.csv').exists():
            shutil.copy2(destination,archive/f'{old_hash}.csv')
            shutil.copy2(destination.with_suffix('.json'),archive/f'{old_hash}.json')
    # Publish CSV before metadata; hashes reject any interrupted pair.
    temp=destination.with_suffix('.tmp'); combined.to_csv(temp,index=False); os.replace(temp,destination)
    meta={'kind':'historical','provider':'Yahoo Finance chart API','adjustment':'split and dividend adjusted OHLC','retrieved_at':datetime.now().astimezone().isoformat(),'as_of':str(today),'sha256':hashlib.sha256(destination.read_bytes()).hexdigest(),'sources':sources}
    atomic_json(destination.with_suffix('.json'),meta)
    return meta

def validate(frame):
    required={'date','symbol','open','high','low','close','volume'}
    if not required.issubset(frame): raise ValueError(f'Missing columns: {required-set(frame)}')
    f=frame.copy(); f['date']=pd.to_datetime(f.date)
    if f.duplicated(['date','symbol']).any(): raise ValueError('Duplicate symbol/date bars')
    numbers=f[['open','high','low','close','volume']].to_numpy(dtype=float)
    if not np.isfinite(numbers).all() or (numbers[:,:4]<=0).any() or (numbers[:,4]<0).any(): raise ValueError('Invalid, missing, or nonpositive price')
    if ((f.high<f[['open','close','low']].max(axis=1)-1e-7)|(f.low>f[['open','close','high']].min(axis=1)+1e-7)).any(): raise ValueError('Inconsistent OHLC bars')
    if set(f.symbol)!=set(SYMBOLS): raise ValueError('The complete predefined ETF universe is required')
    close=f.pivot(index='date',columns='symbol',values='close').sort_index()
    if close.isna().any().any(): raise ValueError('Unequal ETF trading calendars / missing bars')
    return f

def load_market(path=ROOT/'data/market.csv', require_current=True):
    path=Path(path); meta=json.loads(path.with_suffix('.json').read_text())
    if meta.get('kind')!='historical': raise ValueError('Only provenance-tagged historical data is accepted')
    if hashlib.sha256(path.read_bytes()).hexdigest()!=meta.get('sha256'): raise ValueError('Historical dataset checksum mismatch')
    f=validate(pd.read_csv(path))
    import exchange_calendars as xc
    calendar=xc.get_calendar('XNYS')
    close=f.pivot(index='date',columns='symbol',values='close').sort_index()[SYMBOLS]
    opens=f.pivot(index='date',columns='symbol',values='open').sort_index()[SYMBOLS]
    expected=calendar.sessions_in_range(close.index.min(),close.index.max()).tz_localize(None)
    if not expected.equals(close.index): raise ValueError('Missing or unexpected exchange sessions')
    now=pd.Timestamp.now(tz='America/New_York')
    if close.index.max()>last_completed_session(now): raise ValueError('Dataset contains incomplete or future daily bars')
    if require_current:
        prior=last_completed_session(now)
        if close.index.max()!=prior: raise ValueError(f'Data stale: last {close.index.max().date()}, required {prior.date()}')
    if close.index.min()>close.index.max()-pd.DateOffset(years=6): raise ValueError('Need five evaluation years plus at least one warm-up year')
    if (close.pct_change(fill_method=None).abs()>.45).any().any(): raise ValueError('Suspicious daily price movement requires review')
    return opens,close,meta

def synthetic_market(periods=1800,seed=42):
    """Only for tests and explicitly labeled demonstrations."""
    rng=np.random.default_rng(seed); dates=pd.bdate_range('2019-01-02',periods=periods)
    common=rng.normal(.0002,.008,(periods,1)); shocks=rng.normal(.0001,.006,(periods,len(SYMBOLS)))
    close=pd.DataFrame(100*np.exp(np.cumsum(common+shocks,axis=0)),index=dates,columns=SYMBOLS)
    opens=close.shift(1).fillna(100)*np.exp(rng.normal(0,.002,close.shape))
    return opens,close
