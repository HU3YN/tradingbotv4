#!/usr/bin/env bash
set -euo pipefail
project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_dir"
if [[ ! -f frontend/dist/index.html ]]; then
  printf '%s\n' 'Build the dashboard first: bash scripts/setup.sh' >&2
  exit 1
fi
.venv/bin/python scripts/check_frontend.py || { printf "%s\n" "Rebuild this checkout: bash scripts/setup.sh"; exit 1; }
exec .venv/bin/python -m uvicorn pond.api:app --app-dir backend --host 127.0.0.1 --port 8000 --no-access-log
