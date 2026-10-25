@echo off
setlocal
cd /d "%~dp0"
echo Setting up Terrarium in:
echo "%CD%"
echo Your existing data and paper ledger will be kept.
echo.
if not exist ".venv\Scripts\python.exe" goto create_environment
".venv\Scripts\python.exe" -c "import sys; assert sys.version_info[:2] == (3, 12)" >nul 2>&1
if not errorlevel 1 goto install
:create_environment
py -3.12 --version
if errorlevel 1 goto python_missing
py -3.12 -m venv .venv
if errorlevel 1 goto failed
:install
".venv\Scripts\python.exe" -m pip install -r requirements.lock
if errorlevel 1 goto failed
".venv\Scripts\python.exe" -m pip install --no-deps -e .
if errorlevel 1 goto failed
".venv\Scripts\python.exe" scripts\check_frontend.py
if not errorlevel 1 goto ready
echo Building the dashboard from this folder. Node.js 22.12 or newer is required for source edits.
call npm.cmd --version >nul 2>&1
if errorlevel 1 goto node_missing
call npm.cmd --prefix frontend ci
if errorlevel 1 goto failed
call npm.cmd --prefix frontend run build
if errorlevel 1 goto failed
".venv\Scripts\python.exe" scripts\check_frontend.py
if errorlevel 1 goto failed
:ready
echo.
echo Setup complete. This folder is ready to run.
if /i not "%~1"=="--no-pause" pause
exit /b 0
:python_missing
echo.
echo Python 3.12 or its Windows launcher was not found.
echo Install 64-bit Python 3.12 with the Python launcher, then start Terrarium again.
goto failed
:node_missing
echo.
echo This dashboard needs rebuilding, but npm was not found.
echo Install Node.js 22.12 or newer, or extract a fresh complete GitHub ZIP.
:failed
echo.
echo Setup could not complete. Keep the error text above for diagnosis.
if /i not "%~1"=="--no-pause" pause
exit /b 1
