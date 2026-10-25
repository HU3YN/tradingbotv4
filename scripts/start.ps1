$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
& (Join-Path $projectRoot 'Start-Terrarium.cmd')
if ($LASTEXITCODE -ne 0) { throw 'Terrarium could not start; see the error above.' }
