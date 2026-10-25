@echo off
setlocal
cd /d "%~dp0"
echo Terrarium folder:
echo "%CD%"
echo.
if not exist ".venv\Scripts\python.exe" goto setup_missing
if not exist "frontend\dist\index.html" goto dashboard_missing
goto launch
:launch
".venv\Scripts\python.exe" -c "import socket; s=socket.socket(); s.bind(('127.0.0.1',8000)); s.close()" >nul 2>&1
if errorlevel 1 goto port_busy
echo.
echo Starting Terrarium from the folder shown above.
echo Leave this window open. In your browser, type: http://127.0.0.1:8000
echo Press Ctrl+C in this window to stop the server.
echo.
".venv\Scripts\python.exe" -m uvicorn pond.api:app --app-dir "%CD%\backend" --host 127.0.0.1 --port 8000 --no-access-log
if errorlevel 1 goto failed
exit /b 0
:setup_missing
echo This folder has not been set up yet.
echo Run Setup-Windows.cmd once in this same folder, then run Start-Terrarium.cmd.
pause
exit /b 1
:dashboard_missing
echo The built dashboard is missing from this folder.
echo Extract the complete current ZIP, or run Setup-Windows.cmd to rebuild it.
pause
exit /b 1
:port_busy
echo.
echo Port 8000 is unavailable. Close any older Terrarium server window first.
echo This copy was not started, so it cannot trade alongside the existing server.
goto failed
:failed
echo.
echo Terrarium could not start. Read the error above.
echo If Python or a dependency is missing, run Setup-Windows.cmd separately.
echo If port 8000 is in use, close the other Terrarium server window first.
echo Otherwise your browser may still be showing the program from that older folder.
echo Keep your existing data folder and paper ledger when updating.
pause
exit /b 1
