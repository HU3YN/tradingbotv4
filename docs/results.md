# Historical research results — through 2026-10-23

Executed **1,200 configurations** from 20 families in **120 batches of 10**. There were **1,136 distinct signal paths**; some configurations generated identical holdings.

Dataset: Yahoo Finance adjusted daily OHLC, 2021-10-25 to 2026-10-23, ten ETFs, with prior history for indicator warm-up. Costs: 10 basis points per side. Data SHA-256: `e576c043795df51395c77b0729ee88b52685ed33bef8d0eb5efdbcddd15ebe21`.

Validation starts 2024-10-23; final-year evaluation starts 2025-10-23. Four finalists were ordered solely by validation return. The grid and selection rule were unchanged after the first historical evaluation. This is a rolling rerun over partly previously inspected data, not a new independent unseen experiment.

## Frozen finalists

| Configuration | Validation return | Final-year return | Final-year maximum drawdown | Five-year return |
|---|---:|---:|---:|---:|
| `ma_crossover-60-1-5-0` | +28.13% | +32.99% | -14.82% | +111.96% |
| `multi_horizon-120-1-5-0` | +26.52% | +3.47% | -32.32% | +55.71% |
| `multi_horizon-120-1-5-15` | +25.97% | +9.25% | -19.65% | +69.59% |
| `ma_crossover-60-2-5-0` | +25.96% | +3.77% | -14.98% | +22.22% |
| SPY benchmark | +17.06% | +14.30% | -8.09% | +77.53% |

## Selected configuration

`ma_crossover-60-1-5-0` is the validation winner. It compares a 15-session SMA with a 60-session SMA, ranks positive crossover ratios, holds the highest-ranked ETF, evaluates on Friday close, and executes at the next session open. It holds cash when none qualify. It does not short or use leverage.

Five-year CAGR: **+16.28%**. Five-year maximum drawdown: **-28.41%**. Final-year Sharpe: **1.24**.

The four residents are assigned validation ranks 1, 2, 1, 3. Historical returns are not resident paper-trading P&L.

## Retrospective maximum

`dual_momentum-120-1-5-0` produced the largest full-window return: **+118.86%**, versus **+77.53%** for SPY. It selects the highest positive 120-session momentum ETF, with weekly execution. Its five-year CAGR is **+17.03%** and maximum drawdown **-26.03%**.

**This is a hindsight ranking using the whole sample. It is not the validation-selected deployment winner and does not establish future superiority.**

## Cost sensitivity for the validation winner

| Cost per side | Final-year net return |
|---|---:|
| 0 bps | +35.13% |
| 10 bps | +32.99% |
| 25 bps | +29.83% |
| 50 bps | +24.74% |

The 500-repeat, 21-session block-bootstrap 95% final-year return interval is **+0.45% to +80.19%**. This interval reflects sampled return variability, not uncertainty from all research choices. The conservative multiple-trial diagnostic p-value is **1.00**; it does not establish statistically robust alpha.

## Stability and scope

The archived run ending October 19 selected `multi_horizon-120-1-5-0`, whose final-year return was −3.98%. Moving the same predetermined rolling windows forward four sessions selected the crossover instead. This is concrete selection instability; it argues for forward paper evaluation rather than a claim that one universally best strategy has been discovered.

Paper-broker end-to-end authentication and order placement remain unverified without Alpaca credentials. The automated broker tests use a deterministic fake broker, not an actual account. The dashboard does not show invented realized profits.

See [research notes](research-notes.md) for source coverage, all signal definitions, and limitations. Full results: `reports/tournament.json`. Independent selection/cost audit: `reports/validation-audit.json`. Prior-window report: `reports/archive/tournament-through-2026-10-19.json`.
