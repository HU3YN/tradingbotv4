import json
from pond.data import ROOT
r=json.loads((ROOT/'reports/tournament.json').read_text());audit=json.loads((ROOT/'reports/validation-audit.json').read_text())
champ=r['finalists'][0];retro=next(x for x in r['leaderboard'] if x['id']==r['retrospective_champion']);p=r['periods']
pct=lambda v:f'{v*100:+.2f}%'
lines=[f'# Historical research results — through {p["end"]}', '',
 f'Executed **{r["candidate_count"]:,} configurations** from {r["family_count"]} families in **{r["batch_count"]} batches of 10**. There were **{r["unique_signal_paths"]:,} distinct signal paths**; some configurations generated identical holdings.', '',
 f'Dataset: Yahoo Finance adjusted daily OHLC, {p["start"]} to {p["end"]}, ten ETFs, with prior history for indicator warm-up. Costs: {r["cost_bps_per_side"]:g} basis points per side. Data SHA-256: `{r["data"]["sha256"]}`.', '',
 f'Validation starts {p["validation_start"]}; final-year evaluation starts {p["holdout_start"]}. Four finalists were ordered solely by validation return. The grid and selection rule were unchanged after the first historical evaluation. This is a rolling rerun over partly previously inspected data, not a new independent unseen experiment.', '',
 '## Frozen finalists', '',
 '| Configuration | Validation return | Final-year return | Final-year maximum drawdown | Five-year return |',
 '|---|---:|---:|---:|---:|']
for f in r['finalists']:lines.append(f'| `{f["id"]}` | {pct(f["validation"]["net_return"])} | {pct(f["holdout"]["net_return"])} | {pct(f["holdout"]["max_drawdown"])} | {pct(f["five_year"]["net_return"])} |')
b=r['benchmark'];lines.append(f'| SPY benchmark | {pct(b["validation"]["net_return"])} | {pct(b["holdout"]["net_return"])} | {pct(b["holdout"]["max_drawdown"])} | {pct(b["five_year"]["net_return"])} |')
lines += ['', '## Selected configuration', '',
 f'`{champ["id"]}` is the validation winner. It compares a 15-session SMA with a 60-session SMA, ranks positive crossover ratios, holds the highest-ranked ETF, evaluates on Friday close, and executes at the next session open. It holds cash when none qualify. It does not short or use leverage.', '',
 f'Five-year CAGR: **{pct(champ["five_year"]["cagr"])}**. Five-year maximum drawdown: **{pct(champ["five_year"]["max_drawdown"])}**. Final-year Sharpe: **{champ["holdout"]["sharpe"]:.2f}**.', '',
 'The four residents are assigned validation ranks 1, 2, 1, 3. Historical returns are not resident paper-trading P&L.', '',
 '## Retrospective maximum', '',
 f'`{retro["id"]}` produced the largest full-window return: **{pct(retro["five_year"]["net_return"])}**, versus **{pct(b["five_year"]["net_return"])}** for SPY. It selects the highest positive 120-session momentum ETF, with weekly execution. Its five-year CAGR is **{pct(retro["five_year"]["cagr"])}** and maximum drawdown **{pct(retro["five_year"]["max_drawdown"])}**.', '',
 '**This is a hindsight ranking using the whole sample. It is not the validation-selected deployment winner and does not establish future superiority.**', '',
 '## Cost sensitivity for the validation winner', '', '| Cost per side | Final-year net return |','|---|---:|']
for c in audit['finalists'][0]['cost_sensitivity']:lines.append(f'| {c["cost_bps"]} bps | {pct(c["holdout"]["net_return"])} |')
ci=champ['holdout']['bootstrap_return_interval']
lines += ['',f'The 500-repeat, 21-session block-bootstrap 95% final-year return interval is **{pct(ci[0])} to {pct(ci[1])}**. This interval reflects sampled return variability, not uncertainty from all research choices. The conservative multiple-trial diagnostic p-value is **{champ["holdout"]["selection_diagnostic"]["bonferroni_p"]:.2f}**; it does not establish statistically robust alpha.', '',
 '## Stability and scope', '',
 'The archived run ending October 19 selected `multi_horizon-120-1-5-0`, whose final-year return was −3.98%. Moving the same predetermined rolling windows forward four sessions selected the crossover instead. This is concrete selection instability; it argues for forward paper evaluation rather than a claim that one universally best strategy has been discovered.', '',
 'Paper-broker end-to-end authentication and order placement remain unverified without Alpaca credentials. The automated broker tests use a deterministic fake broker, not an actual account. The dashboard does not show invented realized profits.', '',
 'See [research notes](research-notes.md) for source coverage, all signal definitions, and limitations. Full results: `reports/tournament.json`. Independent selection/cost audit: `reports/validation-audit.json`. Prior-window report: `reports/archive/tournament-through-2026-10-19.json`.', '']
(ROOT/'docs/results.md').write_text('\n'.join(lines))
print('Wrote docs/results.md')
