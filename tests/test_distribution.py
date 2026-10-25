"""Regression checks for complete downloads and stale copied dashboards."""
import importlib.util
import json
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('check_frontend', ROOT/'scripts/check_frontend.py')
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


def copy_frontend(tmp_path):
    shutil.copytree(ROOT/'frontend', tmp_path/'frontend', ignore=shutil.ignore_patterns('node_modules', '*.test.mjs', '*check.mjs'))
    return tmp_path


def test_shipped_dashboard_is_complete_and_matches_current_source():
    ok, reason = checker.check_frontend(ROOT)
    assert ok, reason


def test_old_or_missing_dashboard_is_rejected(tmp_path):
    root=copy_frontend(tmp_path)
    assert checker.check_frontend(root)[0]
    source=root/'frontend/src/idle-behavior.ts'
    source.write_text(source.read_text()+'\n// source updated without a rebuild\n')
    assert not checker.check_frontend(root)[0]
    shutil.copy2(ROOT/'frontend/src/idle-behavior.ts',source)
    manifest=json.loads((root/'frontend/dist/build-info.json').read_text())
    script=next(n for n in manifest['assets'] if n.endswith('.js'))
    (root/'frontend/dist'/script).unlink()
    assert not checker.check_frontend(root)[0]


def test_legacy_dist_and_cross_platform_line_endings(tmp_path):
    root=copy_frontend(tmp_path)
    source=root/'frontend/src/idle-behavior.ts'
    source.write_bytes(source.read_bytes().replace(b'\n',b'\r\n'))
    assert checker.check_frontend(root)[0]
    (root/'frontend/dist/build-info.json').unlink()
    assert not checker.check_frontend(root)[0]


def test_windows_start_never_installs_or_runs_setup():
    # Inspect executable batch lines, excluding user-facing setup instructions.
    commands=[line.strip().lower() for line in (ROOT/'Start-Terrarium.cmd').read_text().splitlines()
              if line.strip() and not line.strip().lower().startswith(('echo ', 'echo.', 'rem ', ':'))]
    assert not any('setup-windows.cmd' in line or 'pip install' in line or 'npm' in line for line in commands)
    assert not any('check_frontend.py' in line or 'import numpy' in line for line in commands)
    assert any('-m uvicorn pond.api:app --app-dir' in line for line in commands)
    setup=(ROOT/'Setup-Windows.cmd').read_text().lower()
    assert '-m pip install -r requirements.lock' in setup
    assert 'scripts\\check_frontend.py' in setup
