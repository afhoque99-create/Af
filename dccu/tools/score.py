#!/usr/bin/env python3
"""Synthesize the DCCU unveiling score from the film's cue sheet.

Everything is generated from oscillators and filtered noise (no samples), so the
score is original. Impacts land on chapter reveals; a soft whoosh marks each project.
Usage: python3 tools/score.py cues.json out.wav
"""
import json
import sys

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, oaconvolve, sosfilt

SR = 44100
rng = np.random.default_rng(7)

cues = json.load(open(sys.argv[1]))
out_path = sys.argv[2]
TOTAL = cues[-1]['start'] + cues[-1]['dur']
N = int(TOTAL * SR) + SR * 4
music = np.zeros((2, N), dtype=np.float32)   # goes through reverb
fx = np.zeros((2, N), dtype=np.float32)      # mostly dry


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def tt(dur):
    return np.arange(int(dur * SR), dtype=np.float32) / SR


def env(n, a, r, sustain=1.0):
    e = np.full(n, sustain, dtype=np.float32)
    na, nr = min(int(a * SR), n), min(int(r * SR), n)
    if na:
        e[:na] = np.linspace(0, sustain, na, dtype=np.float32)
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr, dtype=np.float32) ** 1.5
    return e


def lp(x, fc, order=2):
    return sosfilt(butter(order, min(fc, SR * 0.45), 'low', fs=SR, output='sos'), x).astype(np.float32)


def hp(x, fc, order=2):
    return sosfilt(butter(order, fc, 'high', fs=SR, output='sos'), x).astype(np.float32)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], 'band', fs=SR, output='sos'), x).astype(np.float32)


def saw(f, t, phase=0.0):
    return (2 * ((f * t + phase) % 1.0) - 1).astype(np.float32)


def add(bus, start, sig, pan=0.0, gain=1.0):
    i = int(start * SR)
    if i >= N:
        return
    sig = sig[: N - i] * gain
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    bus[0, i:i + len(sig)] += sig * l
    bus[1, i:i + len(sig)] += sig * r


# ── instruments ─────────────────────────────────────────────────────────────
def pad(start, dur, notes, gain=0.05, cutoff=1400, attack=1.2, release=1.8):
    t = tt(dur + release)
    e = env(len(t), attack, release + 0.4)
    for k, n in enumerate(notes):
        f = midi(n)
        for d, pan in ((-0.0035, -0.6), (0.0, 0.0), (0.0042, 0.6)):
            s = saw(f * (1 + d), t, phase=rng.random())
            add(music, start, lp(s, cutoff) * e, pan=pan * (0.5 + 0.5 * (k % 2)), gain=gain / len(notes))


def choir(start, dur, notes, gain=0.05):
    t = tt(dur + 2.0)
    e = env(len(t), 1.6, 2.4)
    vib = 1 + 0.004 * np.sin(2 * np.pi * 5.2 * t)
    for n in notes:
        f = midi(n)
        ph = np.cumsum(f * vib) / SR
        s = (2 * (ph % 1.0) - 1).astype(np.float32)
        v = bp(s, 650, 1250) * 1.4 + bp(s, 250, 500) * 0.6
        add(music, start, v * e, pan=rng.uniform(-0.5, 0.5), gain=gain / len(notes))


def brass(start, dur, notes, gain=0.12, swell=False):
    t = tt(dur + 1.2)
    e = env(len(t), 0.9 if swell else 0.03, 1.2)
    bright = np.exp(-t * (1.5 if swell else 4.0)).astype(np.float32)
    if swell:
        bright = np.clip(t / max(dur, 0.1), 0, 1).astype(np.float32)
    for n in notes:
        f = midi(n)
        s = saw(f, t) + 0.6 * saw(f * 1.003, t)
        dark, br = lp(s, 600), lp(s, 3200)
        add(music, start, (dark * (1 - bright) + br * bright) * e, pan=rng.uniform(-0.3, 0.3), gain=gain / len(notes))


def pluck(start, n, gain=0.05, dur=0.42, cutoff=1800, pan=0.0):
    t = tt(dur)
    f = midi(n)
    s = saw(f, t) + 0.5 * saw(f * 2.002, t)
    e = np.exp(-t * 9).astype(np.float32) * env(len(t), 0.004, 0.05)
    add(music, start, lp(s, cutoff) * e, pan=pan, gain=gain)


def bell(start, n, gain=0.05, pan=0.0):
    t = tt(2.2)
    f = midi(n)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 3) + 0.15 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t * 6)
    add(music, start, (s * np.exp(-t * 2.2)).astype(np.float32), pan=pan, gain=gain)


def bass(start, dur, n, gain=0.12):
    t = tt(dur + 0.5)
    f = midi(n)
    s = np.sin(2 * np.pi * f * t).astype(np.float32) + 0.35 * lp(saw(f, t), 280)
    add(music, start, s * env(len(t), 0.25, 0.8), gain=gain)


def timpani(start, n=38, gain=0.4):
    t = tt(2.4)
    f = midi(n) * (1 + 0.35 * np.exp(-t * 18))
    ph = np.cumsum(f) / SR
    s = np.sin(2 * np.pi * ph).astype(np.float32) * np.exp(-t * 2.6).astype(np.float32)
    noise = lp(rng.standard_normal(len(t)).astype(np.float32), 900) * np.exp(-t * 30).astype(np.float32)
    add(music, start, s + noise * 0.6, gain=gain)


def boom(start, gain=0.7):
    t = tt(4.0)
    f = 34 + 70 * np.exp(-t * 5)
    ph = np.cumsum(f) / SR
    s = np.sin(2 * np.pi * ph).astype(np.float32) * np.exp(-t * 1.3).astype(np.float32)
    noise = lp(rng.standard_normal(len(t)).astype(np.float32), 220) * np.exp(-t * 2.5).astype(np.float32)
    add(fx, start, s + noise * 0.8, gain=gain)
    crash = hp(rng.standard_normal(len(t)).astype(np.float32), 4500) * np.exp(-t * 1.6).astype(np.float32)
    add(music, start, crash, gain=gain * 0.12)


def riser(end, dur=1.6, gain=0.18):
    t = tt(dur)
    k = t / dur
    noise = rng.standard_normal(len(t)).astype(np.float32)
    lo, hi = bp(noise, 300, 900), bp(noise, 2500, 7000)
    s = lo * (1 - k) + hi * k
    tone = np.sin(2 * np.pi * np.cumsum(180 + 520 * k ** 2) / SR).astype(np.float32) * 0.25
    add(music, end - dur, (s + tone) * (k ** 2.2), gain=gain)


def whoosh(start, gain=0.05):
    d = 0.7
    t = tt(d)
    k = t / d
    e = np.sin(np.pi * k) ** 2
    s = bp(rng.standard_normal(len(t)).astype(np.float32), 500, 3500) * e.astype(np.float32)
    add(fx, start - d * 0.55, s, pan=-0.4, gain=gain)


def drone(start, dur, notes, gain=0.08):
    t = tt(dur)
    e = env(len(t), 2.5, 2.0)
    for n in notes:
        s = lp(saw(midi(n), t) + saw(midi(n) * 1.002, t), 400)
        add(music, start, s * e, gain=gain / len(notes))


# ── harmony ─────────────────────────────────────────────────────────────────
CH = {
    'Dm': ([50, 53, 57, 62], 38), 'Bb': ([46, 50, 53, 58], 34), 'F': ([53, 57, 60, 65], 41), 'C': ([48, 52, 55, 60], 36),
    'Gm': ([55, 58, 62, 67], 43), 'A': ([45, 49, 52, 57], 33), 'D': ([50, 54, 57, 62], 38), 'Am': ([45, 48, 52, 57], 33),
    'Bm': ([47, 50, 54, 59], 35), 'G': ([43, 47, 50, 55], 31),
}
PROG = {
    'minor': ['Dm', 'Bb', 'F', 'C'],
    'dark': ['Dm', 'Bb', 'Gm', 'A'],
    'major': ['D', 'A', 'Bm', 'G'],
}
BEAT = 60 / 96
BAR = BEAT * 4
CHORD = BAR * 2

seg_start = {}
for c in cues:
    seg_start.setdefault(c['type'], []).append(c)
chapters = [c for c in cues if c['type'] == 'chapter']
projects = [c for c in cues if c['type'] == 'project']
intro = seg_start['intro'][0]
mediums = seg_start['mediums'][0]
timelines = seg_start['timelines'][0]
outro = seg_start['outro'][0]

# section plan: (start, end, progression, layers, gain scale)
sections = [(mediums['start'], chapters[0]['start'], 'minor', {'pad', 'bass', 'pluck'}, 0.8)]
layer_plan = {
    1: ('minor', {'pad', 'bass', 'pluck'}),
    2: ('minor', {'pad', 'bass', 'pluck', 'timp', 'swell'}),
    3: ('dark', {'pad', 'bass', 'pluck', 'timp', 'lowbrass'}),
    4: ('dark', {'pad', 'bass', 'pluck', 'pluck16', 'timp'}),
    5: ('minor', {'pad', 'bass', 'pluck', 'pluck16', 'timp', 'choir', 'swell'}),
    6: ('major', {'pad', 'bass', 'pluck', 'bells', 'choir'}),
}
for i, c in enumerate(chapters):
    end = chapters[i + 1]['start'] if i + 1 < len(chapters) else timelines['start']
    prog, layers = layer_plan[c['ch']]
    sections.append((c['start'], end, prog, layers, 1.0))
sections.append((timelines['start'], outro['start'], 'major', {'pad', 'bass', 'bells'}, 0.75))

for (s0, s1, prog, layers, g) in sections:
    t = s0
    k = 0
    while t < s1 - 0.05:
        dur = min(CHORD, s1 - t)
        name = PROG[prog][k % 4]
        notes, root = CH[name]
        if 'pad' in layers:
            pad(t, dur, notes, gain=0.075 * g)
        if 'choir' in layers:
            choir(t, dur, [n + 12 for n in notes[1:]], gain=0.07 * g)
        if 'bass' in layers:
            bass(t, dur, root, gain=0.11 * g)
        if 'lowbrass' in layers:
            brass(t, dur, [root + 12, root + 19], gain=0.06 * g, swell=True)
        if 'swell' in layers and k % 2 == 1:
            brass(t, dur, notes, gain=0.05 * g, swell=True)
        if 'timp' in layers:
            for b in range(int(dur / BAR + 0.001)):
                timpani(t + b * BAR, n=root + 12 if root < 40 else root, gain=0.2 * g)
        steps = int(dur / (BEAT / 2) + 0.001)
        pat = [notes[0], notes[2], notes[3], notes[2]]
        for st in range(steps):
            tt0 = t + st * BEAT / 2
            if 'pluck' in layers:
                pluck(tt0, pat[st % 4] - 12 if pat[st % 4] > 60 else pat[st % 4], gain=0.06 * g * (1.0 if st % 2 == 0 else 0.7), pan=-0.25)
            if 'pluck16' in layers:
                pluck(tt0 + BEAT / 4, pat[(st + 1) % 4] + 12, gain=0.025 * g, dur=0.25, cutoff=2600, pan=0.35)
            if 'bells' in layers and st % 2 == 0:
                bell(tt0, [notes[1], notes[2], notes[3], notes[2] + 12][(st // 2) % 4] + 12, gain=0.035 * g, pan=0.3 if st % 4 else -0.3)
        t += dur
        k += 1

# intro
drone(0.0, 7.4, [38, 45, 50], gain=0.1)
riser(intro['start'] + 6.9, dur=3.2, gain=0.22)
title_hit = intro['start'] + 6.9
boom(title_hit, gain=0.8)
timpani(title_hit, 38, gain=0.5)
brass(title_hit, 3.5, [38, 50, 57, 62, 65], gain=0.2)
pad(title_hit, 4.1, CH['Dm'][0], gain=0.08, attack=0.3)
bass(title_hit, 4.0, 38, gain=0.12)

# mediums: little counters
for i in range(5):
    bell(mediums['start'] + 0.7 + i * 0.28, [62, 65, 69, 72, 74][i], gain=0.05, pan=-0.6 + i * 0.3)

# chapter impacts
for c in chapters:
    riser(c['start'], dur=1.5, gain=0.16)
    boom(c['start'], gain=0.75)
    timpani(c['start'], 38, gain=0.45)
    prog, _ = layer_plan[c['ch']]
    notes, root = CH[PROG[prog][0]]
    brass(c['start'], 2.2, [root, root + 12] + notes, gain=0.18)

for p in projects:
    whoosh(p['start'], gain=0.045)

# timelines: three soft hits for the three layouts
for k in range(3):
    bell(timelines['start'] + k * 6.5 + 0.1, 74, gain=0.08)
    timpani(timelines['start'] + k * 6.5 + 0.1, 38, gain=0.18)

# outro
o = outro['start']
boom(o, gain=0.7)
timpani(o, 38, gain=0.5)
brass(o, 5.0, [38, 50, 54, 57, 62, 66], gain=0.2, swell=False)
choir(o, 7.5, [62, 66, 69, 74], gain=0.09)
pad(o, 8.0, CH['D'][0], gain=0.09, attack=0.4, release=3.0)
bass(o, 8.0, 38, gain=0.12)
bell(o + 2.0, 74, gain=0.06)
bell(o + 2.5, 78, gain=0.05)
bell(o + 3.0, 81, gain=0.05)

# ── reverb + master ─────────────────────────────────────────────────────────
ir_len = int(2.9 * SR)
ti = np.arange(ir_len) / SR
ir = []
for ch in range(2):
    n = rng.standard_normal(ir_len) * np.exp(-ti * 2.3)
    n = lp(n.astype(np.float32), 5000)
    n[: int(0.012 * SR)] = 0
    ir.append(n / np.sqrt(np.sum(n ** 2)))
wet = np.stack([oaconvolve(music[ch], ir[ch])[:N] for ch in range(2)]).astype(np.float32)
mix = music * 0.85 + wet * 0.55 + fx
mix = hp(mix, 28)
drive = 1.6
mix = np.tanh(mix * drive) / np.tanh(drive)
fade_in = int(0.05 * SR)
mix[:, :fade_in] *= np.linspace(0, 1, fade_in)
end = int(TOTAL * SR)
mix = mix[:, :end]
fo = int(1.2 * SR)
mix[:, -fo:] *= np.linspace(1, 0, fo)
peak = np.max(np.abs(mix))
mix = mix / peak * 0.89
wavfile.write(out_path, SR, (mix.T * 32767).astype(np.int16))
print(f'wrote {out_path}: {TOTAL:.1f}s, peak normalized from {peak:.2f}')
