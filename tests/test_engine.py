import numpy as np
import pandas as pd
import pytest
from pond.strategies import registry,SignalFactory,Candidate,FAMILIES
from pond.backtest import simulate,metrics
from pond.data import synthetic_market,validate,SYMBOLS

def test_registry_has_1200_unique_configs_and_20_families():
    configs=registry(); assert len(configs)==1200
    assert len({c.id for c in configs})==1200
    assert len({c.family for c in configs})==20

@pytest.mark.parametrize('family',FAMILIES)
def test_signals_cannot_see_future_and_respect_budget(family):
    _,close=synthetic_market(350);cfg=Candidate(family,20,3,1,.15)
    before=SignalFactory(close).weights(cfg)
    changed=close.copy();changed.iloc[250:]*=np.linspace(1,3,100)[:,None]
    after=SignalFactory(changed).weights(cfg)
    pd.testing.assert_frame_equal(before.iloc[:250],after.iloc[:250])
    assert np.isfinite(before.to_numpy()).all()
    assert (before>=0).all().all()
    assert (before.sum(axis=1)<=1.00000001).all()

def test_close_signal_executes_at_next_open_without_overnight_leak():
    ix=pd.bdate_range('2024-01-01',periods=4)
    o=pd.DataFrame({'SPY':[100,200,220,242]},index=ix)
    w=pd.DataFrame({'SPY':[1,1,1,1]},index=ix)
    r,_=simulate(o,w,cost_bps=0)
    np.testing.assert_allclose(r,[0,0,.1,.1])
    assert metrics(r)['net_return']==pytest.approx(.21)

def test_costs_charge_entry_and_exit():
    ix=pd.bdate_range('2024-01-01',periods=4)
    o=pd.DataFrame({'SPY':[100]*4},index=ix);w=pd.DataFrame({'SPY':[1,0,0,0]},index=ix)
    r,turn=simulate(o,w,cost_bps=10)
    assert (1+r).prod()==pytest.approx((1/1.001)*.999)
    assert (turn>0).sum()==2

def test_cash_stays_cash_and_invalid_leverage_is_rejected():
    o,c=synthetic_market(10);w=c*0;r,_=simulate(o,w);assert r.eq(0).all()
    w.iloc[0]=1
    with pytest.raises(ValueError,match='weights'):simulate(o,w)

def test_weekly_holds_without_daily_rebalancing():
    ix=pd.bdate_range('2024-01-01',periods=10);o=pd.DataFrame({'SPY':np.arange(100,110)},index=ix)
    w=pd.DataFrame({'SPY':[.5]*10},index=ix);_,turn=simulate(o,w,cost_bps=0,rebalance=5)
    assert list(turn[turn>0].index.weekday)==[0]

def test_misaligned_prices_rejected():
    o,c=synthetic_market(10)
    with pytest.raises(ValueError,match='Misaligned'):simulate(o,c.iloc[::-1])

def test_bad_bars_rejected():
    rows=[dict(date='2024-01-02',symbol=s,open=100,high=101,low=99,close=100,volume=1000) for s in SYMBOLS]
    frame=pd.DataFrame(rows);validate(frame)
    frame.loc[0,'open']=-1
    with pytest.raises(ValueError,match='nonpositive'):validate(frame)

def test_tournament_holdout_does_not_choose_champion(monkeypatch):
    import pond.tournament as module
    configs=[Candidate(f,20,2,1,0.) for f in ['momentum','sma_trend','risk_parity','rsi_reversion','relative_momentum','ma_crossover']]
    monkeypatch.setattr(module,'registry',lambda:configs)
    o,c=synthetic_market(1600);r1=module.run_tournament(o,c,{'kind':'synthetic'},batch_size=2)
    start=c.index.max()-pd.DateOffset(years=1)
    c2=c.copy();o2=o.copy();mask=c.index>=start
    c2.loc[mask]*=np.linspace(1,2,mask.sum())[:,None];o2.loc[mask]*=np.linspace(1,2,mask.sum())[:,None]
    r2=module.run_tournament(o2,c2,{'kind':'synthetic'},batch_size=2)
    assert r1['champion']==r2['champion']
    assert [x['id'] for x in r1['finalists']]==[x['id'] for x in r2['finalists']]
    assert r1['status']=='synthetic_validation_only'
    assert r1['batch_count']==3
