@echo off
setlocal
cd /d "%~dp0"
if not exist ".venv\Scripts\python.exe" goto setup_missing
if not exist "frontend\dist\index.html" goto setup_missing
echo Starting Terrarium. Leave this window open while using the dashboard.
echo In your browser, type: http://127.0.0.1:8000
echo Press Ctrl+C in this window to stop the server.
echo.
".venv\Scripts\python.exe" -m uvicorn pond.api:app --host 127.0.0.1 --port 8000 --no-access-log
if errorlevel 1 goto failed
exit /b 0
:setup_missing
echo Run Setup-Windows.cmd first, and extract the entire ZIP before starting.
pause
exit /b 1
:failed
echo.
echo The server stopped with an error. If port 8000 is already in use,
echo check whether another Terrarium window is already running.
pause
exit /b 1
