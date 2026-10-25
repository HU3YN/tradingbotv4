# Windows quick start

Both the GitHub ZIP and the cumulative `terrarium-windows.zip` include the verified dashboard build. **Python 3.12, 64-bit, is the only required installation for a complete Windows download.** Node.js 22.12+ is needed only for frontend source changes or rebuilding an incomplete/mismatched download.

1. Install Python 3.12 for Windows. Include the Python launcher (`py`) in the installer options. Python 3.12.10 is the last 3.12 release with the traditional Windows executable installer; a newer 3.12 runtime installed through Python's official install manager also works. Close and reopen any terminal after installing.
2. Download and extract the entire Terrarium ZIP. Move the extracted `tradingbotv4` folder somewhere permanent, for example `C:\Users\hueyn\Documents\tradingbotv4`. Do not run the files from inside the ZIP.
3. Run `Setup-Windows.cmd` once for a new installation and wait for **Setup complete**. It installs dependencies and verifies the build. Initial setup requires internet access.
4. Double-click `Start-Terrarium.cmd` for daily use. It only launches the server; it never runs setup or installs anything. Wait for the Uvicorn server-started message, check the printed folder path, and leave that window open. Do not run another Terrarium server on port 8000 at the same time.
5. Open Edge or Chrome and type `http://127.0.0.1:8000` into the address bar. This address works on the Windows computer running the program; it is not a cloud preview link.
6. Open **Strategy lab → Run historical tournament**. Wait for all 1,200 candidates to finish. This refreshes the bundled research through the latest completed market session. Do this before initially starting paper trading so the history passes its freshness check.
7. In your Alpaca dashboard, switch to **Paper Trading** and obtain that paper account's API key and secret. Use a dedicated paper account with no positions or open orders for the first connection. No real-money funding is needed for this software.
8. In Terrarium, select **Connection & settings**, enter the paper key and secret, and click **Connect paper account**. Enter secrets only in the local app or secure environment settings, never in chat. Keys entered in the app last for the server session; restarting the server requires reconnecting.
9. During regular US market hours, click **Start paper trading**. If the market is closed, enable **A fresh start, every morning** under settings. It will wait for Alpaca to report the market open. Keep the server running, the computer awake, and the internet connected.

## Every morning

If the server is still running and the daily schedule is enabled, no extra launch is needed. If you stopped it or restarted Windows, double-click `Start-Terrarium.cmd`, reconnect your paper keys, and check the schedule or click Start during market hours. Historical prices refresh automatically when a running scheduled agent needs a new daily plan. If a manual start reports stale data, refresh the history from Strategy lab first.

Closing the browser does not stop the backend. Closing the server window stops the bot. **Pause residents** stops new submissions and attempts to cancel pending managed orders; existing positions remain open. Keep the `data/paper.sqlite` ledger once you start trading.

Automatic startup after a Windows reboot is a separate, optional step using Task Scheduler and persistent credentials. First verify the manual workflow and the account connection before enabling unattended startup.

## If something fails

- **Python not found:** confirm `py -3.12 --version` works in a new terminal. Install the official Python launcher with Python 3.12.
- **Setup error:** copy the error text from the setup window. Do not continue to paper trading until installation succeeds.
- **Browser cannot connect:** keep the server window open, check for errors, and verify you used port 8000 on the same computer.
- **Port already in use:** another Terrarium server may already be running; do not start multiple instances.
- **Alpaca rejects the connection:** verify that the key and secret belong to the paper account and that the account is active. Never send the key values when reporting an error.
- **Market closed:** this is expected outside regular sessions and on exchange holidays. Use the daily schedule to wait for the next opening.
- **Historical-data request fails:** keep the previous report and share the displayed error. The app does not substitute generated prices for missing history.

The core application and dashboard were tested in Linux. The Windows launchers follow the same commands, but have not been executed on a Windows machine here. Authenticated Alpaca order execution still requires validation with your paper account.

## Updated habitat and camera

The yellow residents are Mac (ground level) and Cheese (upper left branch); the blue residents are Cobalt (ground level) and Bluey (right branch fork). Click a resident to enter the desk view, then click **Free camera**. Drag to orbit in any direction, scroll or pinch to zoom, and right-drag to pan. **Return to desk view** resets the camera; **Back to the habitat** shows all four residents. Monitor backs temporarily hide if they block a resident's face during an orbit. Gentle typing is decorative; trading status and profits still come from the paper controller.

All changes are included in the same cumulative `terrarium-windows.zip` download. To update an existing installation, stop the server, extract the ZIP to a temporary folder, and copy its `frontend`, `backend`, and `scripts` folders plus `Start-Terrarium.cmd`, `Setup-Windows.cmd`, `requirements.lock`, `pyproject.toml`, and `.python-version` into the existing `tradingbotv4` folder, replacing matching files. Keep your existing `data` and `reports` folders; do not replace them with the bundled starter research. Restart with `Start-Terrarium.cmd`, then press Ctrl+F5 in your browser. Start and Setup are separate. Run Setup explicitly for a new installation or dependency repair; Start never runs it automatically. A new extraction is a separate installation; never copy `.venv` between computers or extracted folders. Existing agent IDs, balances, positions, and order history are retained when their names change.

## Off-duty residents

When the market is closed and a resident has no active order, that frog may randomly nap in its chair, stand and stretch, drink its coffee, or hop on all fours to catch tiny flightless fruit flies. Each frog has an independent schedule; departures are staggered and at least one remains at a desk. Ground residents take turns hunting on the central leaf litter; branch residents hunt on their supporting wood. Other routines can overlap independently. The camera and name bubble follow a hunting resident.

These are decorative routines. They do not change profits, orders, or strategy signals. An open market, an active order for that frog, or lost/stale server status returns it to the desk. Without a connected broker, the preview permits routines only outside regular weekday US market hours using New York time; special holidays and early closes require the broker clock.

## Graphics and camera performance

The habitat automatically adjusts 3D resolution, shadow updates, and small background details when frame times stay slow, then cautiously restores detail when there is sustained headroom. Dashboard text and controls remain at normal screen resolution. A single slow frame does not trigger a quality change. Scene animation pauses while the habitat is hidden; the trading backend continues independently. No setup change is required for the prebuilt ZIP.

Back-wall droplets are distributed across the wall; there are no rendered guide lines or four shared stream paths.

## Relaxing music

Click the **speaker** above the tank to play or pause. Open **Music** beside it to choose **Soft jazz** or **Quiet piano**, and adjust the volume. Both tracks are included and loop offline. Your track and volume are remembered; music starts paused when you reload the page. The old wind sound has been removed.

## Startup and resting-animation repair

The original GitHub source ZIP omitted the dashboard build, and the old setup skipped rebuilding whenever any `index.html` existed. Complete GitHub downloads now contain the same current dashboard as the chat bundle. Setup verifies both the source fingerprint and every built asset; Start skips that full check to launch promptly. It starts the backend from the folder you launched, avoiding an older editable Python installation.

Close **all old Terrarium server windows** before launching the updated folder. Otherwise port 8000 may still show the old app. Press **Ctrl+F5** after starting. `/api/health` reports `dashboard_build`; it should match the ID in `frontend/dist/build-info.json` or printed by Setup.

With the market closed, wait about 5–30 seconds for staggered departures. A fresh broker clock wins. When it is unavailable, the server’s current New York time allows preview outside regular weekday market hours, even if API keys are saved on this computer. Active orders and stale/offline app status still stop resting. Unknown regular weekday sessions stay at the desks. Under **Residents at work**, the status says **Off hours · routines enabled**, **Market closed · routines enabled**, or explains why the frogs are at their desks. Saved keys alone no longer prevent off-hours routines.

These launchers were reviewed and the extracted distribution was tested in Linux; native Windows batch execution still needs confirmation on your machines. If startup still fails, share the printed folder path, build ID, and error text, without keys.
