# Rendering performance

The main camera hitch came from repeated ray tests through dense foliage and thousands of moss instances. Static geometry now uses bounding-volume trees, and the thin moss/water layers use wall-shaped visibility proxies. Stationary cameras reuse their visibility result. Rigid furniture, frog parts, and fly details are batched without merging animated pivots, eyes, or the tongue.

Other changes include shared geometry/materials, cached monitor textures, fewer DOM rebuilds, cached viewport dimensions, no redundant canvas resize on resident selection, 1024-pixel shadows refreshed at most 12 times per second, and a pixel budget that adjusts to sustained frame times. The lowest tier disables shadows, uses simpler geometry for the tiny moss patches, and caps the 3D drawing buffer at 320,000 pixels. Frame-time hysteresis prevents rapid quality changes.

## Fixed-resolution comparison

Chromium with SwiftShader flags, 1000 × 720 pixels, pixel ratio 1, the same eight-step path from the overview toward Mac. Each render waits for GPU completion. Automatic quality changes are bypassed for this comparison.

| Measurement | Before | After | Reduction |
|---|---:|---:|---:|
| Overview draw calls | 595.00 | 203.00 | 65.9% |
| Mean desk draw calls | 259.50 | 101.12 | 61.0% |
| Mean visibility check (ms) | 216.24 | 2.94 | 98.6% |
| Mean render + GPU completion (ms) | 6.60 | 4.54 | 31.3% |

These are measurements of individual operations in this environment, rather than a promised frame rate on every computer. Initial construction was about 2.27 seconds before and 2.37 seconds after; building the acceleration structures moves a small amount of work to startup.

## Verification

- Water samples cover at least 15 of 16 wall regions across multiple times; there are no stream-line meshes.
- Unit checks cover adaptive quality, batching without losing animated parts, equivalent accelerated ray hits, idle scheduling, and hunting routes.
- Browser checks exercise all resident poses and resets, monitor texture caching, moving versus stationary cameras, and low/high graphics tiers.
- The cumulative ZIP includes the prebuilt frontend and the updated dependency lockfile.
