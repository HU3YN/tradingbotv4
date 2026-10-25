$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
& (Join-Path $projectRoot 'Setup-Windows.cmd') --no-pause
if ($LASTEXITCODE -ne 0) { throw 'Terrarium setup failed; see the error above.' }
