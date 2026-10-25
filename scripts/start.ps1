$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
& .\.venv\Scripts\python.exe -m uvicorn pond.api:app --host 127.0.0.1 --port 8000 --no-access-log
if ($LASTEXITCODE -ne 0) { throw 'Terrarium server exited with an error' }
