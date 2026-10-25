"""Check the shipped dashboard against current source and all its output assets."""
from pathlib import Path
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
TEXT = {'.ts', '.js', '.mjs', '.css', '.json', '.html', '.svg', '.md', '.txt'}


def check_frontend(root=ROOT):
    frontend = Path(root) / 'frontend'
    dist = frontend / 'dist'
    try:
        manifest = json.loads((dist / 'build-info.json').read_text())
        if manifest.get('schema') != 1:
            return False, 'Dashboard build information is outdated.'
        inputs = [p for folder in ['src', 'public', 'scripts']
                  for p in (frontend / folder).rglob('*') if p.is_file()]
        inputs += [frontend / name for name in ['index.html', 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts']]
        actual = {}
        for p in inputs:
            content = p.read_bytes()
            if p.suffix in TEXT:
                content = content.replace(b'\r\n', b'\n')
            actual[p.relative_to(frontend).as_posix()] = hashlib.sha256(content).hexdigest()
        if actual != manifest['sources']:
            return False, 'Dashboard source has changed since the last build.'
        assets = manifest['assets']
        if 'index.html' not in assets or not assets:
            return False, 'Dashboard entry page is missing from the build.'
        for name, expected in assets.items():
            path = (dist / name).resolve()
            if not path.is_relative_to(dist.resolve()) or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
                return False, 'Dashboard output is incomplete or has changed: ' + name
        return True, 'Dashboard build ' + str(manifest['build']) + ' is current.'
    except (OSError, ValueError, KeyError, TypeError):
        return False, 'A complete, current dashboard build is missing.'


if __name__ == '__main__':
    ok, message = check_frontend()
    print(message)
    sys.exit(0 if ok else 1)
