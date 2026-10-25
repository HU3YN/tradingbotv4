"""Render Terrarium's original instrumental loops. Build-time only: numpy + ffmpeg.

No recordings, soundfonts, external songs, or runtime synthesis are used.
Run: python scripts/render_soundtracks.py
"""
from pathlib import Path
import math
import subprocess
import tempfile
import wave
import numpy as np

RATE = 32000
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'frontend/public/assets/music'


def voice(note, duration, kind, velocity):
    frequency = 440 * 2 ** ((note - 69) / 12)
    t = np.arange(int((duration + 2.0) * RATE), dtype=np.float64) / RATE
    phase = 2 * np.pi * frequency * t
    if kind == 'electric':
        # A soft tine attack opens into a warm, almost sinusoidal body.
        wave = np.sin(phase + .65 * np.exp(-t * 4.5) * np.sin(phase * 2))
        wave += .18 * np.sin(phase * 2.001) * np.exp(-t * 1.4)
        wave *= np.exp(-t / 2.3)
    elif kind == 'bass':
        wave = np.sin(phase) + .27 * np.sin(phase * 2) + .07 * np.sin(phase * 3)
        wave *= np.exp(-t / 1.0)
    else:
        wave = np.zeros_like(t)
        for harmonic in range(1, 10):
            # Inharmonic partials, softly detuned strings, faster upper-partial decay.
            partial = phase * harmonic * math.sqrt(1 + .000035 * harmonic ** 2)
            decay = np.exp(-t * (.42 + harmonic * .23) * (frequency / 261.6) ** .28)
            wave += (np.sin(partial) + .3 * np.sin(partial * 1.0008)) * decay / harmonic ** 1.65
    attack = 1 - np.exp(-t * (90 if kind == 'bass' else 170))
    release = np.exp(-np.maximum(t - duration, 0) * (7 if kind == 'bass' else 3.8))
    return (wave * attack * release * velocity).astype(np.float32)


def render(name, bars, beats, bpm, events):
    length = round(bars * beats * 60 / bpm * RATE)
    mix = np.zeros((length, 2), dtype=np.float32)
    for beat, note, duration, kind, velocity, pan in events:
        signal = voice(note, duration * 60 / bpm, kind, velocity)
        start = round(beat * 60 / bpm * RATE)
        # Circular mixing preserves the final chord/reverb tail at the loop boundary.
        indices = (np.arange(len(signal)) + start) % length
        mix[indices, 0] += signal * math.sqrt((1 - pan) / 2)
        mix[indices, 1] += signal * math.sqrt((1 + pan) / 2)
    dry = mix.copy()
    # Gentle, diffuse stereo room. No noise bed or percussion hiss.
    for delay, level in [(.047, .10), (.083, .09), (.137, .07), (.211, .055),
                         (.307, .045), (.421, .035), (.589, .025), (.743, .018)]:
        mix += np.roll(dry[:, ::-1], round(delay * RATE), axis=0) * level
    mix -= np.mean(mix, axis=0)
    rms = float(np.sqrt(np.mean(mix ** 2)))
    mix *= min(.095 / rms, .78 / float(np.max(np.abs(mix))))
    # Gentle cyclic seam; only the very edge (2ms), not a silence between phrases.
    edge = 64
    mix[:edge] *= np.linspace(0, 1, edge)[:, None]
    mix[-edge:] *= np.linspace(1, 0, edge)[:, None]
    OUT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / 'track.wav'
        with wave.open(str(wav), 'wb') as output:
            output.setnchannels(2); output.setsampwidth(2); output.setframerate(RATE)
            output.writeframes((mix * 32767).astype('<i2').tobytes())
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(wav), '-codec:a',
                        'libmp3lame', '-b:a', '112k', '-metadata',
                        'artist=Terrarium', '-metadata', 'title=' + name.replace('-', ' ').title(),
                        str(OUT / (name + '.mp3'))], check=True)
    print(f'{name}: {length / RATE:.1f}s, peak={np.max(np.abs(mix)):.3f}, rms={np.sqrt(np.mean(mix ** 2)):.3f}')


def jazz():
    # AABA-inspired 48-bar miniature in C, extended chords with sparse swung phrases.
    chords = [([52, 55, 59, 62], 36), ([52, 55, 59, 62], 36),
              ([48, 52, 55, 59], 33), ([48, 52, 55, 59], 33),
              ([53, 57, 60, 64], 38), ([53, 57, 59, 64], 43),
              ([52, 55, 59, 62], 36), ([52, 58, 61, 65], 45),
              ([53, 57, 60, 64], 38), ([53, 57, 59, 64], 43),
              ([52, 55, 59, 62], 36), ([52, 55, 59, 62], 36),
              ([52, 57, 60, 64], 41), ([51, 55, 58, 62], 41),
              ([52, 55, 59, 62], 36), ([53, 57, 59, 62], 43)]
    melodies = [[(0, 76, 1), (1.67, 74, .5), (2.67, 71, .7)],
                [(1, 67, 1.5), (3, 74, .6)], [(0, 72, 1.5), (2.67, 71, .6)],
                [(0.67, 69, 2.1)], [(1, 69, .8), (2.67, 72, .5), (3.33, 76, .5)],
                [(0, 74, 1.4), (2.67, 71, .8)], [(0, 67, 2.6)], [],
                [(0.67, 69, .8), (2, 72, 1.4)], [(1, 71, .8), (2.67, 69, .6)],
                [(0, 67, 1.4), (2.67, 64, .6)], [], [(0, 69, 1.3), (2, 72, 1.1)],
                [(1, 70, 1.4), (3, 67, .7)], [(0, 64, 2.5)], [(2, 62, 1.2)]]
    rng = np.random.default_rng(24)
    events = []
    for bar in range(48):
        chord, root = chords[bar % 16]
        base = bar * 4
        for beat, strength in [(0, .105), (2.67, .066)]:
            for j, pitch in enumerate(chord):
                events.append((base + beat + j * .018, pitch, 1.5, 'electric', strength * rng.uniform(.9, 1.06), -.18))
        for beat, pitch in [(0, root), (2, root + (12 if bar % 3 == 0 else 7))]:
            events.append((base + beat, pitch, 1.55, 'bass', .16, .05))
        phrase = melodies[bar % 16]
        if bar >= 16 and bar < 32:
            phrase = [(0.67, chord[-1] + 12, 1.5), (2.67, chord[-2] + 12, .9)] if bar % 3 else []
        for beat, pitch, duration in phrase:
            events.append((base + beat + .012, pitch, duration, 'electric', .145 * rng.uniform(.92, 1.05), .22))
    render('soft-jazz', 48, 4, 72, events)


def piano():
    # An original slow 3/4 waltz; each eight-bar phrase settles back to the tonic.
    chords = [(48, [55, 60, 64]), (43, [55, 59, 62]), (45, [57, 60, 64]),
              (40, [55, 59, 64]), (41, [53, 57, 60]), (48, [55, 60, 64]),
              (43, [55, 59, 62]), (48, [55, 60, 64])]
    melody = [[(0, 76, 1.4), (1.5, 74, .5), (2, 72, .8)],
              [(0, 71, 1.8), (2, 67, .8)], [(0, 69, 1), (1, 72, 1), (2, 76, .8)],
              [(0, 74, 2.5)], [(0, 72, 1), (1, 69, 1), (2, 65, .8)],
              [(0, 67, 1.5), (1.5, 64, 1.2)], [(0, 62, 1), (1, 67, .8), (2, 71, .8)],
              [(0, 72, 2.7)]]
    events = []
    rng = np.random.default_rng(7)
    for bar in range(48):
        root, chord = chords[bar % 8]
        base = bar * 3
        events.append((base, root, 2.5, 'piano', .14, -.24))
        for beat, pitch in enumerate(chord):
            events.append((base + beat + .025, pitch, 1.9, 'piano', .07, -.12))
        phrase = melody[bar % 8]
        if 16 <= bar < 32:
            phrase = [(0, chord[-1] + 12, 1.5), (1.5, chord[1] + 12, 1.2)]
        for beat, pitch, duration in phrase:
            events.append((base + beat + .012, pitch, duration, 'piano', .14 * rng.uniform(.88, 1.05), .20))
    render('quiet-piano', 48, 3, 68, events)


if __name__ == '__main__':
    jazz()
    piano()
