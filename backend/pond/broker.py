"""Paper-only Alpaca adapter. Credentials stay in the server process."""
import math,os
from datetime import datetime,timezone
from decimal import Decimal
import httpx

PAPER_URL='https://paper-api.alpaca.markets'
DATA_URL='https://data.alpaca.markets'
class BrokerError(RuntimeError): pass
class AuthenticationError(BrokerError): pass
class MarketDataUnavailable(BrokerError): pass
class Alpaca:
    def __init__(self):
        key=os.getenv('ALPACA_API_KEY') or os.getenv('APCA_API_KEY_ID')
        secret=os.getenv('ALPACA_SECRET_KEY') or os.getenv('APCA_API_SECRET_KEY')
        key=(key or '').strip(); secret=(secret or '').strip()
        if not key or not secret: raise AuthenticationError('Open Connection & settings and connect your Alpaca paper API key and secret.')
        self.client=httpx.Client(timeout=20,headers={'APCA-API-KEY-ID':key,'APCA-API-SECRET-KEY':secret})

    def close(self): self.client.close()
    def request(self,method,path,body=None,data=False,missing_ok=False):
        try: r=self.client.request(method,(DATA_URL if data else PAPER_URL)+path,json=body)
        except httpx.HTTPError as e: raise BrokerError(f'Alpaca transport failure ({type(e).__name__}); credentials were not logged.') from None
        if r.status_code==404 and missing_ok: return None
        if r.status_code==401:
            raise AuthenticationError('Alpaca rejected the API credentials (HTTP 401). Trading is paused. Open Connection & settings and reconnect with the matching key and secret from Alpaca Paper Trading, then click Start or enable the daily schedule again. Live-account keys do not work here.')
        if r.status_code==403 and data:
            raise BrokerError('Alpaca denied IEX market-data access (HTTP 403). Check this paper account\'s market-data permissions, then restart paper trading.')
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
            snapshot=(payload or {}).get(s) or {}
            # IEX covers one exchange: a thin ETF can lack a recent last trade.
            # A recent minute-bar close is also an observed price, never a daily
            # close or a synthetic replacement. Keep the same five-minute limit.
            candidates=[]
            for field,price_key in [('latestTrade','p'),('minuteBar','c')]:
                point=snapshot.get(field) or {}
                try:
                    price=float(point.get(price_key,0))
                    timestamp=datetime.fromisoformat(point.get('t','').replace('Z','+00:00'))
                    age=(now-timestamp).total_seconds()
                except (ValueError,TypeError,AttributeError,OverflowError): continue
                if math.isfinite(price) and price>0 and -5<=age<=300:
                    candidates.append((timestamp,price))
            if not candidates:
                raise MarketDataUnavailable(f'{s}: waiting for a fresh IEX market price. No new orders will be placed until prices are current; retrying automatically. IEX ETF updates can be sparse, especially near the open.')
            result[s]=max(candidates,key=lambda item:item[0])[1]
        return result
