import argparse,json
from .data import fetch_yahoo,load_market,synthetic_market,ROOT
from .tournament import run_tournament

def main():
    p=argparse.ArgumentParser(description='Terrarium research tools'); sub=p.add_subparsers(dest='command',required=True)
    sub.add_parser('download',help='Fetch adjusted seven-year history (five evaluation years plus warmup)')
    t=sub.add_parser('tournament'); t.add_argument('--synthetic',action='store_true',help='Test-only generated data; cannot be deployed'); t.add_argument('--cost-bps',type=float,default=10)
    a=p.parse_args()
    if a.command=='download': print(json.dumps(fetch_yahoo(),indent=2)); return
    if a.cost_bps<0: p.error('cost-bps must be nonnegative')
    if a.synthetic:
        o,c=synthetic_market(); meta={'kind':'synthetic','seed':42}; output=ROOT/'reports/synthetic-validation.json'
    else: o,c,meta=load_market(); output=ROOT/'reports/tournament.json'
    r=run_tournament(o,c,meta,output,cost_bps=a.cost_bps,progress=lambda i,n: print(f'{i}/{n}',flush=True) if i%100==0 else None)
    print(json.dumps({k:r[k] for k in ['status','candidate_count','family_count','unique_signal_paths','champion','periods']},indent=2))

if __name__=='__main__': main()
