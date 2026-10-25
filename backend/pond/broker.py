"""Paper-only Alpaca adapter. Credentials stay in the server process."""
import os
from datetime import datetime,timezone
from decimal import Decimal
import httpx

PAPER_URL='https://paper-api.alpaca.markets'
DATA_URL='https://data.alpaca.markets'
class BrokerError(RuntimeError): pass
class Alpaca:
    def __init__(self):
        key=os.getenv('ALPACA_API_KEY') or os.getenv('APCA_API_KEY_ID')
        secret=os.getenv('ALPACA_SECRET_KEY') or os.getenv('APCA_API_SECRET_KEY')
        if not key or not secret: raise BrokerError('Add Alpaca paper API credentials in environment settings, then restart the server.')
        self.client=httpx.Client(timeout=20,headers={'APCA-API-KEY-ID':key,'APCA-API-SECRET-KEY':secret})

    def close(self): self.client.close()
    def request(self,method,path,body=None,data=False,missing_ok=False):
        try: r=self.client.request(method,(DATA_URL if data else PAPER_URL)+path,json=body)
        except httpx.HTTPError as e: raise BrokerError(f'Alpaca transport failure ({type(e).__name__}); credentials were not logged.') from None
        if r.status_code==404 and missing_ok: return None
        if r.status_code>=400: raise BrokerError(f'Alpaca returned HTTP {r.status_code} for {method} {path.split("?")[0]}')
        return r.json() if r.content else None
    def account(self): return self.request('GET','/v2/account')
    def clock(self): return self.request('GET','/v2/clock')
    def positions(self): return self.request('GET','/v2/positions')
    def open_orders(self): return self.request('GET','/v2/orders?status=open&limit=500')
    def order(self,client_id): return self.request('GET',f'/v2/orders:by_client_order_id?client_order_id={client_id}',missing_ok=True)
    def submit(self,client_id,symbol,side,qty):
        asset=self.request('GET',f'/v2/assets/{symbol}')
        if not asset.get('tradable') or not asset.get('fractionable'): raise BrokerError(f'{symbol} must be tradable and fractionable')
        return self.request('POST','/v2/orders',{'symbol':symbol,'qty':str(qty),'side':side,'type':'market','time_in_force':'day','client_order_id':client_id})
    def cancel(self,order_id): return self.request('DELETE',f'/v2/orders/{order_id}')
    def prices(self,symbols):
        payload=self.request('GET','/v2/stocks/snapshots?feed=iex&symbols='+','.join(symbols),data=True)
        result={}; now=datetime.now(timezone.utc)
        for s in symbols:
            trade=payload.get(s,{}).get('latestTrade',{}); price=float(trade.get('p',0))
            timestamp=datetime.fromisoformat(trade.get('t','1970-01-01T00:00:00+00:00').replace('Z','+00:00'))
            if price<=0 or abs((now-timestamp).total_seconds())>300: raise BrokerError(f'{s}: missing or stale market price')
            result[s]=price
        return result
