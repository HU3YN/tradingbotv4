from datetime import datetime, timedelta, timezone

import httpx
import pytest

from pond.broker import Alpaca, AuthenticationError, BrokerError, MarketDataUnavailable


def broker(monkeypatch, payload, status=200):
    monkeypatch.setenv('ALPACA_API_KEY', '  paper-test-key  ')
    monkeypatch.setenv('ALPACA_SECRET_KEY', '  paper-test-secret  ')
    b=Alpaca()
    headers=b.client.headers
    b.close()
    b.client=httpx.Client(headers=headers,transport=httpx.MockTransport(
        lambda request:httpx.Response(status,json=payload)))
    return b


def point(age, **fields):
    return {'t':(datetime.now(timezone.utc)-timedelta(seconds=age)).isoformat(),**fields}


def test_rejected_keys_have_actionable_message_without_secrets(monkeypatch):
    b=broker(monkeypatch, {'message':'paper-test-secret'}, 401)
    assert b.client.headers['APCA-API-KEY-ID']=='paper-test-key'
    with pytest.raises(AuthenticationError) as error: b.clock()
    assert 'HTTP 401' in str(error.value) and 'Paper Trading' in str(error.value)
    assert 'paper-test-secret' not in str(error.value)
    b.close()


def test_data_permission_denial_is_not_retryable_quote_gap(monkeypatch):
    b=broker(monkeypatch, {}, 403)
    with pytest.raises(BrokerError,match='permissions') as error: b.prices(['DBC'])
    assert not isinstance(error.value,MarketDataUnavailable)
    b.close()


def test_fresh_minute_bar_handles_missing_trade_and_newest_observation_wins(monkeypatch):
    b=broker(monkeypatch, {
        'DBC':{'latestTrade':None,'minuteBar':point(60,c=24.1)},
        'SPY':{'latestTrade':point(20,p=500),'minuteBar':point(60,c=499)},
        'TLT':{'latestTrade':point(240,p=90),'minuteBar':point(60,c=91)},
    })
    assert b.prices(['DBC','SPY','TLT'])=={'DBC':24.1,'SPY':500,'TLT':91}
    b.close()


@pytest.mark.parametrize('snapshot',[
    None,{}, {'latestTrade':point(301,p=24),'minuteBar':point(301,c=24)},
    {'latestTrade':point(-60,p=24)}, {'latestTrade':point(0,p='nan')},
    {'latestTrade':point(0,p='inf')}, {'latestTrade':point(0,p=0)},
    {'latestTrade':{'p':24,'t':'bad timestamp'}},
    {'latestTrade':{'p':24,'t':'2026-11-16T10:00:00'}},
    {'dailyBar':point(0,c=24)},
])
def test_missing_invalid_or_stale_prices_cannot_authorize_orders(monkeypatch,snapshot):
    b=broker(monkeypatch,{'DBC':snapshot})
    with pytest.raises(MarketDataUnavailable,match='DBC.*retrying automatically'): b.prices(['DBC'])
    b.close()
