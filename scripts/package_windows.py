"""Rebuild the single cumulative download; never package local keys or the paper ledger."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT.parent / 'terrarium-windows.zip'


def main():
    files = {Path(name) for name in [
        '.gitignore', '.python-version', 'README.md', 'Setup-Windows.cmd',
        'Start-Terrarium.cmd', 'pyproject.toml', 'requirements.lock',
        'frontend/index.html', 'frontend/package.json', 'frontend/package-lock.json',
        'frontend/tsconfig.json', 'frontend/vite.config.ts',
        'frontend/browser-check.mjs', 'frontend/visual-check.mjs', 'frontend/music-check.mjs',
        'frontend/performance-check.mjs', 'frontend/render-performance.test.mjs', 'frontend/render-compat-check.mjs',
        'frontend/idle-behavior.test.mjs', 'frontend/resident-life.test.mjs', 'frontend/life-check.mjs', 'frontend/idle-integration-check.mjs',
        'data/market.csv', 'data/market.json', 'reports/tournament.json',
        'reports/validation-audit.json', 'reports/archive/tournament-through-2026-10-19.json',
    ]}
    for folder in ['backend/pond', 'tests', 'docs', 'scripts']:
        files.update(p.relative_to(ROOT) for p in (ROOT / folder).rglob('*')
                     if p.is_file() and p.suffix in {'.py', '.md', '.sh', '.ps1'})
    for folder in ['frontend/src', 'frontend/public', 'frontend/dist']:
        files.update(p.relative_to(ROOT) for p in (ROOT / folder).rglob('*') if p.is_file())
    assert (ROOT / 'frontend/dist/index.html').is_file(), 'Build the dashboard before packaging.'
    temporary = DESTINATION.with_suffix('.tmp.zip')
    with ZipFile(temporary, 'w', ZIP_DEFLATED, compresslevel=9) as bundle:
        for relative in sorted(files):
            assert not any(part in {'.venv', 'node_modules', '__pycache__'} for part in relative.parts)
            assert relative.suffix not in {'.sqlite', '.env'}
            content = (ROOT / relative).read_bytes()
            if relative.suffix == '.cmd':
                content = content.replace(b'\r\n', b'\n').replace(b'\n', b'\r\n')
            bundle.writestr('tradingbotv4/' + relative.as_posix(), content)
        bundle.writestr('READ-ME-FIRST.txt', '''TERRARIUM - ONE CUMULATIVE DOWNLOAD

This ZIP includes the latest application and all previous habitat changes.
Future releases replace this same terrarium-windows.zip download.

EXISTING INSTALLATION - THIS HABITAT UPDATE:
1. Close the Terrarium server window.
2. Extract this ZIP to a temporary folder.
3. Copy frontend and backend from the extracted tradingbotv4 folder into
   your existing tradingbotv4 folder. Replace matching files.
4. Keep your existing data and reports folders, Python environment, and keys.
   Do not overwrite them with the bundled starter research.
5. Run your existing Start-Terrarium.cmd and press Ctrl+F5 in your browser.
   Reconnect paper keys after restarting the server. No setup rerun is needed.

FIRST INSTALLATION:
Extract the whole tradingbotv4 folder and follow docs/windows-quickstart.md.

The resident names are Mac, Cheese, Cobalt, and Bluey. Select a resident,
then Free camera to orbit. All previous visual changes are included, plus
fully green side walls, side ferns, a mossy trickling back wall, grass, leaf litter, and
independent off-duty frog routines, scattered wall droplets without lines, and
automatic graphics adjustment for slower devices. Use Music above the tank to choose
soft jazz or quiet piano and set the volume; the speaker button plays/pauses.
Routines only run when the market is
closed and the resident has no active order. They never submit trades.
''')
    with ZipFile(temporary) as bundle:
        assert bundle.testzip() is None
        assert bundle.read('tradingbotv4/frontend/dist/index.html') == (ROOT / 'frontend/dist/index.html').read_bytes()
    temporary.replace(DESTINATION)
    print(f'{DESTINATION}: {len(files)} application files; archive integrity verified')


if __name__ == '__main__':
    main()
