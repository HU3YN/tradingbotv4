# Research provenance and implementation scope

This is a bounded research review, not a survey of every SSRN paper or Goldman Sachs publication. The implementation evaluates **20 algorithm families with 60 configurations each**, not 1,200 independent academic discoveries. All are long-only daily ETF adaptations. No proprietary Goldman Sachs alpha model is represented as reproduced code.

The original grid was fixed before the first historical holdout was inspected. Subsequent runs refresh the same grid and rolling calendar boundaries; they are not independent new experiments. Previously examined data cannot become an unseen test set again. Archive old reports before refreshing.

## Sources actually retrieved and reviewed

The following notes summarize retrieved pages in our own words. Full texts and abstracts remain local under ignored `data/research/`; they are not redistributed in the source tree.

| Source | Material reviewed | What it contributes / what differs |
|---|---|---|
| [Faber, A Quantitative Approach to Tactical Asset Allocation](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=962461) | SSRN abstract and bibliographic page; posted 2007, revised 2014 | Tactical moving-average allocation across asset classes. Our moving-average windows, daily ETF universe, selection and cash assumptions differ. The PDF delivery URL returned HTML, so no full-paper review is claimed. |
| [Moskowitz, Ooi & Pedersen, Time Series Momentum](https://www.aqr.com/Insights/Research/Journal-Article/Time-Series-Momentum) | AQR research summary, May 2012 | Own trailing returns versus cross-sectional ranking; original evidence spans 58 futures/forward contracts. Ours uses long-only ETFs and shorter horizons, without futures leverage. |
| [Antonacci, Risk Premia Harvesting Through Dual Momentum](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2042750) | SSRN abstract; posted 2012, revised 2017 | Combine an absolute return filter with relative selection. Our absolute hurdle is zero instead of an estimated cash excess return. PDF delivery returned HTML. |
| [Hurst, Ooi & Pedersen, A Century of Evidence on Trend-Following Investing](https://www.aqr.com/Insights/Research/Journal-Article/A-Century-of-Evidence-on-Trend-Following-Investing) | AQR summary and paper PDF, especially construction methodology | Original combines 1-, 3-, and 12-month long/short signals in 67 markets, monthly rebalancing and 10% portfolio volatility scaling. Our multi-horizon candidate uses n/2, n, 2n daily horizons, long-only top-k ETF selection. It is not a replication. |
| [Zakamulin, Real-Life Performance of Market Timing](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2242795) | SSRN abstract | Direct counter-evidence: data mining and omitted trading frictions can overstate timing-rule performance. Motivates the holdout and cost stress test. |
| [Daniel, Momentum Crashes](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1914673) | SSRN abstract | Momentum losses can cluster after declines and during rebounds. Motivates reporting drawdowns; does not supply an implemented crash-prediction model. |
| [Faber, Relative Strength Strategies for Investing](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1585517) | SSRN abstract | Relative strength and trend filters across sectors/global assets. Our ETF selection is a simplified adaptation. |
| [Marshall, Nguyen & Visaltanachoti, Time-Series Momentum versus Moving Average Trading Rules](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2225551) | SSRN abstract | Moving-average crossings and trailing-return signs are related but need not trigger at the same time. We preserve both families. |
| [Clare et al., The Trend is Our Friend](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2126478) | SSRN abstract | Contrasts trend following, momentum, and risk parity in multi-asset allocation. Our inverse-volatility weights approximate risk allocation; they do not solve full covariance risk parity. |
| [Richardson, Saffi & Sigurdsson, Deleveraging Risk](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2180785) | SSRN abstract | Uses equity lending/levered-investor data. Not implemented because the necessary historical inputs are absent and the selected workflow is unlevered ETFs. |
| [Han, Zhou & Zhu, A Trend Factor](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2182667) | SSRN abstract | Multiple investment horizons motivate multi-horizon comparisons. The paper's fitted factor construction is not replicated. |
| [Cremers & Pareek, Short-Term Trading and Stock Return Anomalies](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1571191) | SSRN abstract | Institutional holding duration and reversal evidence. Not replicated: quarterly holdings and issuer-level inputs are absent. |
| [Goldman Sachs Asset Management, Managing Equity Market Concentration: Two Ways to Improve Portfolio Efficiency](https://am.gs.com/en-us/advisors/insights/article/2026/managing-equity-market-concentration-two-ways-to-improve-portfolio-efficiency) | Full public article; Andrew Alford, Laurene Azoulay, Hania Schmidt | Discusses low tracking-error portfolios and long/short extensions. It does not publish the proprietary alpha forecasts or optimizer inputs required for replication. Our long-only cross-asset ETF workflow does not implement its leveraged extension proposal. |

## The 20 implemented families

| Family | Exact signal / selection |
|---|---|
| SMA trend | Close above n-day SMA; rank eligible ETFs by n-day return |
| EMA trend | Close above n-span EMA; rank by n-day return |
| Absolute momentum | Positive n-day return; equal score with deterministic universe-order tie breaking |
| Dual momentum | Positive n-day return and highest relative n-day returns |
| Relative momentum | Highest n-day returns, even when negative |
| Channel breakout | Close above the previous day's rolling n-day closing high |
| Bollinger reversion | Closing-price z-score below −1; rank most negative first |
| RSI reversion | Simple rolling gain/loss RSI below 35; rank lowest first (not Wilder smoothing) |
| Stochastic reversion | Close in the bottom 20% of the rolling closing-price range |
| MACD | n/2 fast EMA minus n slow EMA above its n/4 signal EMA and zero |
| MA crossover | n/4 SMA above n SMA; rank ratio |
| Multi-horizon | Mean trailing returns over n/2, n, 2n; positive score, top-k |
| Low volatility | Lowest n-day standard deviation of daily returns, equal weights |
| Inverse volatility | Select low-volatility ETFs and weight inverse standard deviation |
| Inverse downside deviation | Select/weight inverse RMS negative daily returns |
| Trend-filtered inverse volatility | Inverse-volatility allocation above n-day SMA |
| Volatility breakout | Trailing return divided by daily volatility × sqrt(n), score above 1 |
| Efficient trend | Net n-day price change / sum of absolute daily changes above 0.25 |
| Drawdown recovery | Below rolling high by 3% and positive n/4-day return |
| Trend quality | Positive trailing return / (volatility × sqrt(n)); rank top-k |

The non-paper-specific indicator combinations are original experiments using conventional technical-analysis primitives. They are not represented as literature-proven edges.

Each family uses lookbacks **10, 20, 40, 60, 120**, top-k **1, 2, 3**, daily or weekly execution, and either no volatility cap or a **15%** cap. The cap uses a conservative fully-correlated risk estimate and leaves the remainder in cash; it never adds leverage. Weekly decisions use Friday's close and execute on the next available session. A Friday exchange holiday skips that week's refresh.

## What the tournament means

All candidates run on the same five-year window and initial capital. The first three years supply diagnostics, the fourth ranks candidates, and the fifth evaluates four frozen finalists. Within-batch winners enter pairwise elimination using the same validation return; this tournament is a transparent ranking mechanism, not independent repeated evidence.

The separate **retrospective champion** maximizes the full five-year return after looking at all five years. It is selected with hindsight and is not automatically assigned to paper agents. It must not be described as an out-of-sample winner.

Cash earns zero. Costs default to 10 basis points per side, including a combined spread/slippage/fee allowance. Signals use adjusted closes; trades occur at the next adjusted open. Dividend-adjusted OHLC approximate reinvested total returns. Taxes, borrowing, intraday execution, impact, order queueing, and broker dividend accounting are not simulated. Choosing today's ETF universe introduces selection bias despite all symbols having existed throughout the window.

A positive backtest, a bootstrap interval, or the highest-ranked configuration is not proof of future profitability. The diagnostic Bonferroni p-value is only a normal approximation and does not remove serial correlation or research-selection effects.
