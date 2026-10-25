import hashlib,json
import pandas as pd
import numpy as np
import pytest
from pond.data import load_market,validate,SYMBOLS

def test_complete_historical_calendar_can_be_loaded(tmp_path):
    import exchange_calendars as xc
    dates=xc.get_calendar('XNYS').sessions_in_range('2019-01-02','2025-01-03').tz_localize(None)
    rows=[]
    for i,date in enumerate(dates):
        for s in SYMBOLS:
            price=100+i*.01
            rows.append({'date':date,'symbol':s,'open':price,'high':price+1,'low':price-1,'close':price,'volume':1000})
    f=pd.DataFrame(rows);path=tmp_path/'market.csv';f.to_csv(path,index=False)
    # Generated prices are tagged historical here solely to exercise validation in an isolated fixture.
    meta={'kind':'historical','sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
    path.with_suffix('.json').write_text(json.dumps(meta))
    o,c,_=load_market(path,require_current=False)
    assert len(c)==len(dates) and list(c.columns)==SYMBOLS
    with pytest.raises(ValueError,match='stale'):load_market(path,require_current=True)
    with path.open('a') as out:out.write('\n')
    with pytest.raises(ValueError,match='checksum'):load_market(path,require_current=False)

def test_missing_session_is_rejected(tmp_path):
    import exchange_calendars as xc
    dates=xc.get_calendar('XNYS').sessions_in_range('2019-01-02','2025-01-03').tz_localize(None).delete(50)
    f=pd.DataFrame([dict(date=d,symbol=s,open=100,high=101,low=99,close=100,volume=100) for d in dates for s in SYMBOLS])
    p=tmp_path/'market.csv';f.to_csv(p,index=False);p.with_suffix('.json').write_text(json.dumps({'kind':'historical','sha256':hashlib.sha256(p.read_bytes()).hexdigest()}))
    with pytest.raises(ValueError,match='Missing or unexpected'):load_market(p,require_current=False)

def test_synthetic_provenance_cannot_be_loaded_as_real(tmp_path):
    p=tmp_path/'market.csv';p.write_text('date,symbol\n');p.with_suffix('.json').write_text(json.dumps({'kind':'synthetic'}))
    with pytest.raises(ValueError,match='historical'):load_market(p)

def test_completed_session_handles_intraday_close_and_holiday():
    from pond.data import last_completed_session
    assert str(last_completed_session('2026-10-19T14:00:00Z').date())=='2026-10-16'
    assert str(last_completed_session('2026-10-19T20:20:00Z').date())=='2026-10-19'
    assert str(last_completed_session('2026-12-25T22:00:00Z').date())=='2026-12-24'

def test_refresh_preserves_previous_dataset_snapshot(tmp_path,monkeypatch):
    import httpx
    import pond.data as module
    dates=pd.date_range('2026-01-05',periods=2,tz='America/New_York')
    value=[100.]
    def respond(request):
        price=value[0]
        q={'open':[price]*2,'high':[price+1]*2,'low':[price-1]*2,'close':[price]*2,'volume':[1000]*2}
        payload={'chart':{'result':[{'timestamp':[int(d.timestamp()) for d in dates],
            'indicators':{'quote':[q],'adjclose':[{'adjclose':[price]*2}]}}]}}
        return httpx.Response(200,json=payload)
    real_client=httpx.Client
    monkeypatch.setattr(module.httpx,'Client',lambda **kwargs:real_client(transport=httpx.MockTransport(respond),**kwargs))
    path=tmp_path/'market.csv'
    first=module.fetch_yahoo(path);original=path.read_bytes()
    value[0]=101.;second=module.fetch_yahoo(path)
    assert first['sha256']!=second['sha256']
    archive=tmp_path/'archive'/f'{first["sha256"]}.csv'
    assert archive.read_bytes()==original
    assert json.loads(archive.with_suffix('.json').read_text())['sha256']==first['sha256']
