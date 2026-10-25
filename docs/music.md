# Terrarium music

Use the speaker button above the tank to play or pause. Click **Music** beside it to choose **Soft jazz** (electric piano and bass) or **Quiet piano** (a gentle waltz), and adjust the volume. The setting applies in overview, desk, and free-camera views. Both tracks loop.

Music starts paused whenever the page loads. Your browser remembers the soundtrack and volume, starting at 30% on a first visit. Preferences still work for the current visit if browser storage is unavailable. Sound has no connection to market hours or the trading controller.

The two original instrumental compositions are bundled in `frontend/public/assets/music/` and copied to the production build. They need no streaming service, login, or internet connection. If playback fails, the music panel shows a retry message; press **Play music** again. No wind or noise loop is layered underneath.

## Source and reproduction

`scripts/render_soundtracks.py` contains the complete scores and instrument rendering. Soft jazz is a 48-bar, 72 BPM miniature in 4/4 with extended piano chords, sparse swung melody, and bass. Quiet piano is a 48-bar, 68 BPM waltz in 3/4. The timbres are synthesized from mathematical oscillators offline, with a light stereo room effect. No sampled recordings, soundfonts, or third-party songs are used. Track lengths are approximately 2:40 and 2:07.

To recreate the assets, install NumPy in a build environment and FFmpeg with the `libmp3lame` encoder, run `python scripts/render_soundtracks.py`, then rebuild the frontend. These tools are not required to run the prepared Windows download.

At runtime one HTML audio element streams the selected MP3. A single Web Audio gain node provides volume control on mobile browsers that ignore media-element volume. There is no runtime note synthesis, audio interval, or additional work in the 3D animation loop. Playback begins from a user gesture; no autoplay permission is assumed. The files use roughly 4 MB total; the ZIP includes both source assets and the ready-to-run build.

## Validation

`node frontend/music-check.mjs` exercises the production app: no autoplay or initial audio download, decoded sound reaching the output graph, both tracks, volume/mute, looping, rapid play/pause/track changes, playback rejection and retry, saved preferences, unavailable browser storage, and the mobile control layout. It uses Chromium and the running local server. Physical speaker quality and iOS/Safari playback still need checking on those devices.
