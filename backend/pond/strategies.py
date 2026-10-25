"""Causal daily ETF signals. Families are adaptations, not claimed paper replications."""
from dataclasses import dataclass, asdict
from itertools import product
import numpy as np
import pandas as pd

FAMILIES = {
 'sma_trend': 'Price / moving average trend',
 'ema_trend': 'Exponential trend',
 'momentum': 'Absolute momentum',
 'dual_momentum': 'Absolute + relative momentum',
 'relative_momentum': 'Cross-sectional momentum',
 'donchian': 'Channel breakout',
 'bollinger_reversion': 'Bollinger mean reversion',
 'rsi_reversion': 'RSI mean reversion',
 'stochastic_reversion': 'Stochastic mean reversion',
 'macd': 'MACD trend',
 'ma_crossover': 'Moving average crossover',
 'multi_horizon': 'Multi-horizon momentum',
 'low_volatility': 'Minimum volatility selection',
 'risk_parity': 'Inverse volatility allocation',
 'downside_risk': 'Inverse downside deviation',
 'trend_risk_parity': 'Trend-filtered risk parity',
 'volatility_breakout': 'Volatility-adjusted breakout',
 'efficiency_trend': 'Efficient trend',
 'drawdown_recovery': 'Drawdown recovery',
 'trend_quality': 'Risk-adjusted momentum',
}
@dataclass(frozen=True)
class Candidate:
    family: str
    lookback: int
    top_k: int
    rebalance: int
    volatility_target: float

    @property
    def id(self):
        return f'{self.family}-{self.lookback}-{self.top_k}-{self.rebalance}-{int(self.volatility_target*100)}'

    def record(self):
        return {'id': self.id, **asdict(self), 'name': FAMILIES[self.family]}

    @classmethod
    def from_record(cls, item):
        return cls(**{k:item[k] for k in cls.__dataclass_fields__})

def registry():
    return [Candidate(f, n, k, r, v) for f,n,k,r,v in product(
        FAMILIES, [10,20,40,60,120], [1,2,3], [1,5], [0.,.15])]

class SignalFactory:
    def __init__(self, close: pd.DataFrame):
        self.close = close
        self.ret = close.pct_change(fill_method=None)
        self.cache = {}

    def features(self, n):
        if n not in self.cache:
            c,r = self.close,self.ret
            ma=c.rolling(n).mean(); vol=r.rolling(n).std()
            delta=c.diff(); up=delta.clip(lower=0).rolling(n).mean(); down=(-delta.clip(upper=0)).rolling(n).mean()
            rsi=100-100/(1+up/down.replace(0,np.nan)); rsi=rsi.mask((down==0)&(up>0),100).mask((down==0)&(up==0),50)
            self.cache[n]={'ma':ma,'ema':c.ewm(span=n,adjust=False,min_periods=n).mean(),
             'vol':vol,'mom':c.pct_change(n,fill_method=None),'rsi':rsi,
             'high':c.rolling(n).max(),'low':c.rolling(n).min(),
             'z':(c-ma)/c.rolling(n).std().replace(0,np.nan),
             'down':r.clip(upper=0).pow(2).rolling(n).mean().pow(.5)}
        return self.cache[n]

    def weights(self, cfg: Candidate):
        c=self.close; n=cfg.lookback; f=self.features(n); family=cfg.family
        mom=f['mom']; vol=f['vol']; mask=c.notna(); score=mom.copy()
        if family=='sma_trend': mask=c>f['ma']
        elif family=='ema_trend': mask=c>f['ema']
        elif family=='momentum': mask=mom>0; score=mom.where(mask,0).gt(0).astype(float)
        elif family=='dual_momentum': mask=mom>0
        elif family=='relative_momentum': pass
        elif family=='donchian': mask=c>f['high'].shift(1); score=c/f['high'].shift(1)-1
        elif family=='bollinger_reversion': score=-f['z']; mask=f['z'] < -1
        elif family=='rsi_reversion': score=100-f['rsi']; mask=f['rsi']<35
        elif family=='stochastic_reversion': score=1-(c-f['low'])/(f['high']-f['low']).replace(0,np.nan); mask=score>.8
        elif family=='macd':
            fast=c.ewm(span=max(3,n//2),adjust=False,min_periods=n).mean(); line=fast-f['ema']; sig=line.ewm(span=max(2,n//4),adjust=False).mean()
            score=(line-sig)/c; mask=(line>sig)&(line>0)
        elif family=='ma_crossover': score=c.rolling(max(3,n//4)).mean()/f['ma']-1; mask=score>0
        elif family=='multi_horizon': score=sum(c.pct_change(p,fill_method=None) for p in [n,max(2,n//2),n*2])/3; mask=score>0
        elif family=='low_volatility': score=1/vol.replace(0,np.nan)
        elif family=='risk_parity': score=1/vol.replace(0,np.nan)
        elif family=='downside_risk': score=1/f['down'].replace(0,np.nan)
        elif family=='trend_risk_parity': score=1/vol.replace(0,np.nan); mask=c>f['ma']
        elif family=='volatility_breakout': score=mom/(vol*np.sqrt(n)).replace(0,np.nan); mask=score>1
        elif family=='efficiency_trend': score=c.diff(n)/c.diff().abs().rolling(n).sum().replace(0,np.nan); mask=score>.25
        elif family=='drawdown_recovery':
            dd=c/f['high']-1; score=c.pct_change(max(2,n//4),fill_method=None); mask=(dd<-.03)&(score>0)
        elif family=='trend_quality': score=mom/(vol*np.sqrt(n)).replace(0,np.nan); mask=score>0
        else: raise ValueError('Unknown family')
        valid=mask & score.notna() & vol.notna()
        ranks=score.where(valid).rank(axis=1,ascending=False,method='first')
        chosen=valid & (ranks<=cfg.top_k)
        if family in ['risk_parity','downside_risk','trend_risk_parity']:
            raw=score.where(chosen,0).clip(lower=0)
        else: raw=chosen.astype(float)
        w=raw.div(raw.sum(axis=1).replace(0,np.nan),axis=0).fillna(0)
        if cfg.volatility_target:
            # Conservative fully correlated risk estimate; leaves residual in cash.
            risk=(w*vol*np.sqrt(252)).sum(axis=1)
            scale=(cfg.volatility_target/risk.replace(0,np.nan)).clip(upper=1).fillna(0)
            w=w.mul(scale,axis=0)
        # Calendar-anchored schedule, invariant to the length of the downloaded history.
        if cfg.rebalance==5:
            schedule=pd.Series(c.index.weekday==4,index=c.index)
            w=w.where(schedule,axis=0).ffill().fillna(0)
        return w.clip(0,1)
