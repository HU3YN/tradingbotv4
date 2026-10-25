from datetime import datetime,timezone
from pathlib import Path
import hashlib,json
import numpy as np
import pandas as pd
from .strategies import registry,SignalFactory
from .backtest import simulate,metrics,block_interval,selection_diagnostic
from .data import atomic_json,ROOT

def run_tournament(opens,close,metadata,output=None,batch_size=10,cost_bps=10.,progress=None):
    if not opens.index.equals(close.index): raise ValueError('Price indices differ')
    end=close.index.max(); begin=end-pd.DateOffset(years=5)
    validation_start=end-pd.DateOffset(years=2); test_start=end-pd.DateOffset(years=1)
    evaluation=opens.index>=begin; ix=opens.index[evaluation]
    train=ix<validation_start; validation=(ix>=validation_start)&(ix<test_start); test=ix>=test_start
    if min(train.sum(),validation.sum(),test.sum())<200: raise ValueError('Need five years including full validation and holdout years')
    factory=SignalFactory(close); configs=registry(); results=[]; streams={}; fingerprints=set(); batches=[]
    for i,cfg in enumerate(configs):
        w=factory.weights(cfg).loc[evaluation]
        fingerprints.add(hashlib.sha256(w.to_numpy().round(8).tobytes()).hexdigest())
        r,turn=simulate(opens.loc[evaluation],w,cost_bps,cfg.rebalance)
        streams[cfg.id]=r
        row={**cfg.record(),'train':metrics(r[train]),'validation':metrics(r[validation]),
             'five_year':metrics(r),'annual_turnover':float(turn.mean()*252),'trading_days':int((turn>1e-8).sum())}
        results.append(row)
        if (i+1)%batch_size==0 or i+1==len(configs):
            group=results[i//batch_size*batch_size:i+1]; winner=max(group,key=lambda x:(x['validation']['net_return'],x['id']))
            batches.append({'batch':len(batches)+1,'candidates':[x['id'] for x in group],'winner':winner['id']})
            if progress: progress(i+1,len(configs))
    byid={x['id']:x for x in results}; pool=[b['winner'] for b in batches]; bracket=[]
    while len(pool)>1:
        next_pool=[]; matches=[]
        for i in range(0,len(pool),2):
            pair=pool[i:i+2]; win=max(pair,key=lambda x:(byid[x]['validation']['net_return'],x))
            matches.append({'contestants':pair,'winner':win}); next_pool.append(win)
        bracket.append(matches); pool=next_pool
    champion=pool[0]
    ranking=sorted(results,key=lambda x:(x['validation']['net_return'],x['id']),reverse=True)
    finalists=ranking[:4]  # frozen before any holdout results are consulted
    for row in finalists:
        r=streams[row['id']]; row['holdout']=metrics(r[test]); row['holdout']['bootstrap_return_interval']=block_interval(r[test])
        row['holdout']['selection_diagnostic']=selection_diagnostic(r[test],len(configs))
        row['five_year']=metrics(r)
    benchmark_w=pd.DataFrame(0.,index=ix,columns=close.columns); benchmark_w['SPY']=1.
    bench,_=simulate(opens.loc[evaluation],benchmark_w,cost_bps)
    sample_indices=np.linspace(0,len(ix)-1,min(400,len(ix)),dtype=int)
    series=[]
    for key,r in [('SPY buy & hold',bench)]+[(x['id'],streams[x['id']]) for x in finalists]:
        eq=(1+r).cumprod()*100000
        series.append({'name':key,'points':[[str(ix[i].date()),round(float(eq.iloc[i]),2)] for i in sample_indices]})
    code_files=['strategies.py','backtest.py','tournament.py','data.py']
    code_hashes={name:hashlib.sha256((Path(__file__).parent/name).read_bytes()).hexdigest() for name in code_files}
    report={'schema':1,'code_sha256':code_hashes,'created_at':datetime.now(timezone.utc).isoformat(),
     'data':metadata,'status':'historical_completed' if metadata.get('kind')=='historical' else 'synthetic_validation_only',
     'candidate_count':len(configs),'family_count':len(set(x.family for x in configs)),
     'unique_signal_paths':len(fingerprints),'batch_size':batch_size,'batch_count':len(batches),
     'cost_bps_per_side':cost_bps,'periods':{'start':str(ix[0].date()),'validation_start':str(ix[validation][0].date()),'holdout_start':str(ix[test][0].date()),'end':str(ix[-1].date())},
     'selection':'Highest net validation return at equal initial capital; holdout never selects or reranks finalists.',
     'champion':champion,'retrospective_champion':max(results,key=lambda x:(x['five_year']['net_return'],x['id']))['id'],'finalists':finalists,'leaderboard':ranking,'batches':batches,'bracket':bracket,
     'benchmark':{'five_year':metrics(bench),'validation':metrics(bench[validation]),'holdout':metrics(bench[test])},'equity_curves':series,
     'limitations':['ETF universe chosen today; universe-selection bias remains.','20 families and 1200 configurations are not 1200 independent published strategies.','Adjusted OHLC total-return approximation, no taxes, zero cash yield; cost assumptions are not guaranteed fills.','Next-open backtest differs from paper orders submitted after the open; compare execution slippage.','Single untouched holdout plus block bootstrap; no guarantee of future profits.','Retrospective champion maximizes the full five-year sample after the fact and is not the deployment selection.','Sources are adaptations unless the research ledger explicitly records a verified replication.']}
    if output: atomic_json(output,report)
    return report
