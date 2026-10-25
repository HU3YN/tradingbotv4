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
