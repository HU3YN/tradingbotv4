"""Audit saved tournament selection and rerun frozen finalists at different costs."""
import hashlib,json
from pathlib import Path
import numpy as np
from pond.data import ROOT,load_market,atomic_json
from pond.strategies import Candidate,SignalFactory
from pond.backtest import simulate,metrics

report=json.loads((ROOT/'reports/tournament.json').read_text())
opens,close,meta=load_market()
assert report['data']['sha256']==meta['sha256'], 'Report/data mismatch'
assert report['candidate_count']==1200 and report['batch_count']==120
assert sum(len(b['candidates']) for b in report['batches'])==1200
rows={r['id']:r for r in report['leaderboard']}
assert len(rows)==1200
key=lambda id:(rows[id]['validation']['net_return'],id)
assert max(rows,key=key)==report['champion']
assert report['bracket'][-1][0]['winner']==report['champion']
assert report['retrospective_champion']==max(rows,key=lambda id:(rows[id]['five_year']['net_return'],id))
for batch in report['batches']: assert max(batch['candidates'],key=key)==batch['winner']
for name,digest in report['code_sha256'].items():
    assert hashlib.sha256((ROOT/'backend/pond'/name).read_bytes()).hexdigest()==digest, f'Changed implementation: {name}'
factory=SignalFactory(close);start=report['periods']['start'];holdout=report['periods']['holdout_start'];checks=[]
for row in report['finalists']:
    cfg=Candidate.from_record(row);weights=factory.weights(cfg).loc[start:]
    sensitivity=[]
    for cost in [0,10,25,50]:
        returns,_=simulate(opens.loc[start:],weights,cost_bps=cost,rebalance=cfg.rebalance)
        m=metrics(returns.loc[holdout:]);sensitivity.append({'cost_bps':cost,'holdout':m})
        if cost==10:
            assert np.isclose(m['net_return'],row['holdout']['net_return'],atol=1e-12)
    checks.append({'id':row['id'],'cost_sensitivity':sensitivity})
atomic_json(ROOT/'reports/validation-audit.json',{'selection_checks':'passed','checked_candidates':1200,'checked_batches':120,'finalists':checks,'data_sha256':meta['sha256']})
print('Verified all 120 batches, 1200 unique IDs, tournament champion, code/data hashes, and four finalists at 0/10/25/50 bps.')
