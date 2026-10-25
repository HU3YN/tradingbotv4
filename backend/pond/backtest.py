"""Next-open execution, cash residual, long-only allocation, explicit transaction costs."""
import numpy as np
import pandas as pd
from scipy.stats import norm

def simulate(opens, weights, cost_bps=10., rebalance=1):
    if not opens.index.equals(weights.index) or list(opens.columns)!=list(weights.columns): raise ValueError('Misaligned signals and prices')
    w=weights.to_numpy(float)
    if not np.isfinite(w).all() or (w<0).any() or (w.sum(axis=1)>1.000001).any(): raise ValueError('Invalid long-only weights')
    returns=opens.pct_change(fill_method=None).fillna(0).to_numpy()
    result=np.zeros(len(opens)); turnover=np.zeros(len(opens)); exposures=np.zeros(opens.shape[1]); equity=1.; cash=1.
    for t in range(1,len(opens)):
        previous=equity
        exposures*=1+returns[t]; equity=cash+exposures.sum()
        if rebalance==1 or opens.index[t-1].weekday()==4:
            target=w[t-1]  # yesterday close -> today open; never earn the overnight move before buying
            fee=0.
            for _ in range(5): fee=np.abs(target*(equity-fee)-exposures).sum()*cost_bps/10000
            turnover[t]=np.abs(target*(equity-fee)-exposures).sum()/equity
            equity-=fee; exposures=target*equity; cash=equity-exposures.sum()
        result[t]=equity/previous-1
    return pd.Series(result,index=opens.index),pd.Series(turnover,index=opens.index)

def metrics(returns):
    r=np.asarray(returns,dtype=float)
    if len(r)<2: raise ValueError('Insufficient evaluation observations')
    eq=np.r_[1,np.cumprod(1+r)]; total=eq[-1]-1; vol=np.std(r,ddof=1)
    return {'net_return':float(total),'cagr':float(eq[-1]**(252/len(r))-1),
        'sharpe':float(np.mean(r)/vol*np.sqrt(252)) if vol>1e-12 else 0.,
        'max_drawdown':float(np.min(eq/np.maximum.accumulate(eq)-1)),
        'volatility':float(vol*np.sqrt(252)), 'days':len(r),'positive_days':int((r>0).sum())}

def block_interval(returns,seed=7,repeats=500,block=21):
    r=np.asarray(returns); rng=np.random.default_rng(seed); results=[]
    for _ in range(repeats):
        starts=rng.integers(0,len(r),int(np.ceil(len(r)/block)))
        ix=((starts[:,None]+np.arange(block))%len(r)).ravel()[:len(r)]
        results.append(np.prod(1+r[ix])-1)
    return [float(x) for x in np.quantile(results,[.025,.975])]

def selection_diagnostic(returns, trials):
    """Conservative Bonferroni normal-approximation mean-return test, not proof of alpha."""
    r=np.asarray(returns); std=np.std(r,ddof=1)
    z=float(np.mean(r)/std*np.sqrt(len(r))) if std>1e-12 else 0.
    return {'bonferroni_p':float(min(1.,norm.sf(z)*trials)),
            'note':'Approximation assumes independent daily observations; autocorrelation and correlated trials limit interpretation.'}
