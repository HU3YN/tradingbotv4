"""Retrieve a bounded source ledger. Failed retrievals remain explicitly unverified."""
from datetime import datetime,timezone
import hashlib
import httpx
from .data import ROOT,atomic_json

SOURCES=[
 {'id':'faber2007','title':'A Quantitative Approach to Tactical Asset Allocation','author':'Mebane Faber','year':2007,'url':'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=962461','families':['sma_trend','ema_trend','ma_crossover'],'relationship':'Moving-average tactical allocation inspiration; ETF universe and windows differ.'},
 {'id':'moskowitz2012','title':'Time Series Momentum','author':'Moskowitz, Ooi, Pedersen','year':2012,'url':'https://www.aqr.com/Insights/Research/Journal-Article/Time-Series-Momentum','families':['momentum','multi_horizon','volatility_breakout'],'relationship':'Long-only ETF adaptations; original futures universe, shorts, and leverage are not replicated.'},
 {'id':'antonacci2012','title':'Risk Premia Harvesting Through Dual Momentum','author':'Gary Antonacci','year':2012,'url':'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2042750','families':['dual_momentum','relative_momentum'],'relationship':'Absolute and relative momentum concepts; lookbacks and defensive asset rules differ.'},
 {'id':'hurst2017','title':'A Century of Evidence on Trend-Following Investing','author':'Hurst, Ooi, Pedersen','year':2017,'url':'https://www.aqr.com/Insights/Research/Journal-Article/A-Century-of-Evidence-on-Trend-Following-Investing','families':['donchian','macd','efficiency_trend'],'relationship':'Conceptual trend-following inspiration, not an exact replication.'},
 {'id':'gs-factor','title':'Goldman Sachs Asset Management — investment insights','author':'Goldman Sachs Asset Management','year':None,'url':'https://am.gs.com/en-us/advisors/insights','families':['low_volatility','trend_quality'],'relationship':'Research discovery entry point only. No proprietary Goldman Sachs strategy is claimed or reproduced.'},
 {'id':'gs-research','title':'Goldman Sachs — insights','author':'Goldman Sachs','year':None,'url':'https://www.goldmansachs.com/insights','families':[],'relationship':'Research discovery entry point; no exhaustive coverage claim.'},
 {'id':'ssrn-search','title':'SSRN research search','author':'SSRN','year':None,'url':'https://www.ssrn.com/index.cfm/en/','families':[],'relationship':'Discovery entry point; retrieval does not imply all papers were reviewed.'},
]

def retrieve_sources():
    rows=[];folder=ROOT/'data/research';folder.mkdir(parents=True,exist_ok=True)
    with httpx.Client(timeout=25,follow_redirects=True) as client:
        for source in SOURCES:
            row={**source,'review_status':'not_reviewed','retrieved_at':datetime.now(timezone.utc).isoformat()}
            try:
                response=client.get(source['url']);row['http_status']=response.status_code
                response.raise_for_status()
                row['retrieval_status']='retrieved';row['sha256']=hashlib.sha256(response.content).hexdigest();row['bytes']=len(response.content)
                (folder/f'{source["id"]}.html').write_bytes(response.content)
            except httpx.HTTPError as error:
                row['retrieval_status']='blocked_or_unavailable';row['error_type']=type(error).__name__
            rows.append(row)
    atomic_json(ROOT/'reports/source-ledger.json',{'sources':rows,'coverage':'Bounded candidate bibliography; source pages have not been substantively reviewed unless individually marked.'})
    return rows

if __name__=='__main__':
    for source in retrieve_sources(): print(source['id'],source['retrieval_status'],source.get('http_status','transport_error'))
