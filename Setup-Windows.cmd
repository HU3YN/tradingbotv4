@echo off
setlocal
cd /d "%~dp0"
echo Setting up Terrarium. Keep this window open until setup finishes.
echo.
py -3.12 --version
if errorlevel 1 goto python_missing
py -3.12 -m venv .venv
if errorlevel 1 goto failed
".venv\Scripts\python.exe" -m pip install -r requirements.lock
if errorlevel 1 goto failed
".venv\Scripts\python.exe" -m pip install --no-deps -e .
if errorlevel 1 goto failed
if exist "frontend\dist\index.html" goto ready
echo Building the dashboard. This source checkout requires Node.js 22.12 or newer.
call npm.cmd --prefix frontend ci
if errorlevel 1 goto failed
call npm.cmd --prefix frontend run build
if errorlevel 1 goto failed
:ready
echo.
echo Setup complete. Double-click Start-Terrarium.cmd next.
pause
exit /b 0
:python_missing
echo.
echo Python 3.12 or its Windows launcher was not found.
echo Install 64-bit Python 3.12 with the Python launcher, then run this file again.
pause
exit /b 1
:failed
echo.
echo Setup stopped. Copy the error text above so it can be diagnosed.
pause
exit /b 1
