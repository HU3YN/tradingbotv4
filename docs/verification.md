# Verification record

Validated in the Linux cloud workspace with Python 3.12.14, Node 24.19.0, and installed Chromium.

- **52 backend tests passed.** The runner emitted one Starlette test-client deprecation warning; no tests failed or were skipped.
- **Production frontend build passed.** TypeScript checking and Vite bundling both completed.
- **Repeat installation passed.** `bash scripts/setup.sh` completed using the pinned Python dependency list and `npm ci` lockfile.
- **Dependency consistency passed.** `pip check` found no broken requirements.
- **Documented startup passed.** Restarted using `bash scripts/start.sh`; `/api/health`, `/api/state`, and `/api/charts` returned HTTP 200, four residents, and ten verified historical price series.
- **Historical tournament completed.** 1,200 candidates, 120 batches, five years ending October 23, 2026. The selection audit independently checked every batch winner, the final winner, unique candidate IDs, code/data hashes, and finalist returns at 0, 10, 25 and 50 basis points per side.
- **Browser checks passed.** Desktop canvas, four residents, desk selection and return, four-row results table, account settings dialog, password field, mobile layout with no horizontal overflow, and no JavaScript errors. The current documentation screenshots are in [`docs/screenshots/`](screenshots/), with an annotated [gallery](gallery.md). Old screenshot iterations have been removed. Browser test scripts may write new temporary captures to ignored `reports/`.

Not executed: authenticated Alpaca account requests, live market-data entitlement checks, actual paper-order submission/fills, Windows helper scripts, environment publication, or restoration in a separate future cloud task. No paper API credentials were present. Broker lifecycle tests use a fake broker.

The interface and procedural 3D scene are a working prototype. The scene is stylized and has not been validated as a dimensionally exact reconstruction of the supplied photograph. Research coverage is explicitly bounded in `research-notes.md`.

## Documentation and publication update

The current application was captured across the desktop dashboard, strategy lab, journal, settings, help, all four resident desks and free-camera views, fullscreen, music controls, mobile layout, and four off-duty poses. Only read-only API requests were permitted during capture. Resting poses were staged through existing in-browser animation controls; account values were not fabricated.

This update changes documentation and screenshot assets, with an application-source hash comparison to verify that runtime code and existing tests remain unchanged. Music playback, looping, volume, track-switch races, preferences, recovery, and mobile controls were checked in the preceding implementation update; see [music notes](music.md).

Publication checks: **52 backend tests and 9 animation/rendering unit tests passed**. Documentation links and all 21 screenshot references were checked. The backend run retained the known Starlette test-client deprecation warning.

## Startup, distribution, and resting-animation regression fix

The original GitHub archive omitted `frontend/dist`; the chat bundle contained it. The tracked source was identical between those distributions. Setup previously accepted any existing `index.html`, so an older build could remain in use. A saved open-market flag or historical trading error could also suppress closed-market routines.

The GitHub archive now includes the verified build. A source/output manifest rejects stale or incomplete builds, and the Windows launcher repairs missing setup in the current extracted folder. Launchers explicitly select that folder's backend, avoiding a different editable installation. Resting uses current server time for disconnected preview and a process-local fresh broker clock for connected accounts. Trading errors remain visible; orders and risk controls are unchanged.

Validation: **56 backend/distribution tests and 11 animation/rendering tests passed**. A clean Git archive was extracted without Node modules or historical caches, its build verified, and its backend served using the existing Python runtime with an explicit app directory. Browser checks confirmed routines with an old saved open flag/error, fresh-open interruption, fresh-closed recovery, active-order blocking, stale-clock blocking, offline blocking, and narrow-screen controls. No trading requests were sent. The browser pose check also exercised 128 sleep/coffee/hunt/stretch poses, confirmed finite transforms and correct props, and verified open-market and stale-status resets. A second Windows ZIP was successfully packaged from that clean archive without including its ledger.

Windows batch scripts have not been executed on a native Windows machine here. The user's laptop/desktop Downloads folders are not accessible from this cloud workspace; comparison used the exact previously supplied chat ZIP.

## Separate daily startup and off-hours preview with saved credentials

`Start-Terrarium.cmd` no longer calls Setup, imports the scientific stack as a preflight, verifies the full source/build fingerprint, or installs anything. It checks for the local Python executable and built entry page, checks port availability, and starts this folder's server. Setup remains an explicit separate command. A regression check guards against reintroducing installer calls into Start.

The prior resting rule treated saved credentials with a stale clock differently from a disconnected laptop. The stored market flag could still display “Market closed” while that rule denied rest. A fresh broker clock now takes priority; otherwise the same server-time off-hours preview applies with or without credentials. Unknown regular weekday sessions, active orders, and offline/stale application status still block resting. The resident status text explains whether routines are enabled or waiting, and unverified broker state is labeled “Checking market clock.”

Validation: **57 backend/distribution tests and 12 animation/rendering tests passed**. Chrome checks against a clean extracted Git archive confirmed the stored-credentials/stale-clock regression, fresh-open interruption, closed-clock behavior, unknown-weekday blocking, active-order blocking, offline recovery, and mobile layout with no browser errors or trading mutations. Native Windows execution and the user's actual desktop state were not available in this environment; the reproduced clock-state case matches the reported moving water/typing hands with absent resting routines.

## Morning authentication errors and sparse IEX ETF prices

The reported screenshot showed HTTP 401 for Alpaca's clock and a missing/stale DBC price. Previously every controller exception disabled the session and daily schedule. Missing prices now have a separate retryable state: new orders wait, previously granted Start/schedule authorization is retained, and Pause still disarms it. Recovery clears the notice and records a journal event. Fresh IEX trades and minute-bar closes qualify within the same five-minute limit; missing, malformed, nonfinite, future-dated, or stale observations cannot authorize orders. Daily bars are never a fallback.

HTTP 401 remains a hard stop with explicit paper-key reconnection instructions. It invalidates the cached clock, disables trading, and does not log credential values. Successful reconnection clears only an authentication error and never restarts trading; reconciliation errors remain visible. Repeated identical failures no longer flood the event journal. The dashboard distinguishes a price wait from a paused authentication failure. No changes were made to frog animation geometry or the Windows launch/setup separation.

Regression coverage includes sparse snapshots, fresh minute-bar fallback, invalid prices, quote-gap recovery without duplicate orders, Pause during a wait, authentication disarming, error deduplication, background exception routing, and reconnecting without clearing unrelated failures. Authenticated Alpaca requests and the user's Windows installation cannot be verified from this workspace; broker responses in tests are controlled fixtures.

Validation: **77 backend/distribution tests and 12 animation/rendering tests passed**. Chrome exercised the built dashboard's 401 reconnect control, price-wait notice and recovery, open/closed-clock transitions, independent resting, active-order and offline guards, and mobile controls, with no browser errors or trading mutations. The source/build manifest and cumulative ZIP integrity checks passed. The known Starlette test-client deprecation warning remains.
