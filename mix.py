"""Nama Ibu Kota Terpanjang: musik sintesis deterministik + track SFX + track VO, ducking otomatis.
Output: audio/vo_track.wav, audio/sfx_track.wav, audio/music_track.wav, audio/mix.wav, audio/mix.m4a"""
import json, os, subprocess
import numpy as np, soundfile as sf, librosa
from scipy.signal import butter, lfilter

ROOT = os.path.dirname(os.path.abspath(__file__)); os.chdir(ROOT); os.makedirs('audio', exist_ok=True)
SR = 44100
D = json.load(open('data.json', encoding='utf-8')); C = D['cues']; LINES = D['lines']
N = int((C['end'] + .2) * SR)
db = lambda x: 10 ** (x / 20)
rng = np.random.default_rng(11)
def lp(x, fc, o=2): b, a = butter(o, fc / (SR / 2)); return lfilter(b, a, x)
def hp(x, fc, o=2): b, a = butter(o, fc / (SR / 2), 'high'); return lfilter(b, a, x)
def put(buf, x, t, g=1.0):
    i = int(t * SR); n = min(len(x), len(buf) - i)
    if n > 0 and i >= 0: buf[i:i + n] += x[:n] * g
mf = lambda m: 440 * 2 ** ((m - 69) / 12)
tt = lambda d: np.arange(int(d * SR)) / SR

def marimba(m, d=.35):
    t = tt(d); f = mf(m); return (np.sin(2 * np.pi * f * t) * np.exp(-t * 9) + .35 * np.sin(2 * np.pi * f * 3.9 * t) * np.exp(-t * 35)) * .5
def bell(m, d=1.2):   # bonang/gamelan-ish: parsial inharmonik
    t = tt(d); f = mf(m); return (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 3) + .25 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t * 6)) * np.exp(-t * 2.6) * .35
def pluck_bass(m, d=.3):
    t = tt(d); f = mf(m); saw = 2 * ((f * t) % 1) - 1; return lp(saw, 900) * np.exp(-t * 7) * .55 + np.sin(2 * np.pi * f * t) * np.exp(-t * 5) * .35
def pizz(m, d=.25):
    t = tt(d); f = mf(m); return lp(2 * ((f * t) % 1) - 1, 1600) * np.exp(-t * 14) * .5
def brass(ms, d=.5, att=.02, bright=2400, g=.18):
    t = tt(d); out = np.zeros_like(t)
    for m in ms:
        for det in (-.12, .0, .12): f = mf(m + det); out += 2 * ((f * t) % 1) - 1
    env = np.minimum(1, t / att) * np.exp(-t * 2.2) * np.minimum(1, (d - t) / .05); return lp(out, bright) * env * g / len(ms)
def kick(d=.3):
    t = tt(d); f = 50 + 120 * np.exp(-t * 30); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * .9
def snare(d=.18):
    t = tt(d); return (hp(rng.standard_normal(len(t)), 1500) * .5 + np.sin(2 * np.pi * 190 * t) * .4) * np.exp(-t * 22) * .5
def hat(d=.05, g=.18):
    t = tt(d); return hp(rng.standard_normal(len(t)), 7000) * np.exp(-t * 80) * g
def kendang(d=.22, f0=110):
    t = tt(d); f = f0 * (1 + .6 * np.exp(-t * 25)); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14) * .6
def pad(ms, d, g=.07):
    t = tt(d); out = sum(np.sin(2 * np.pi * mf(m) * t) + .3 * np.sin(2 * np.pi * mf(m) * 2.01 * t) for m in ms)
    return out * np.minimum(1, t / .3) * np.minimum(1, (d - t) / .3) * g
def cymbal(d=1.6, g=.18):
    t = tt(d); return hp(rng.standard_normal(len(t)), 5000) * np.exp(-t * 2.5) * g

CH = {'C': [60, 64, 67], 'Am': [57, 60, 64], 'F': [53, 57, 60], 'G': [55, 59, 62], 'Dm': [50, 53, 57], 'Em': [52, 55, 59], 'E': [52, 56, 59]}
music = np.zeros(N); musL = np.zeros(N); musR = np.zeros(N)   # music = tengah; musL/musR = instrumen yang di-pan
def putp(x, t, g, pan):   # pan -1..1 (equal power)
    a = (pan + 1) * np.pi / 4; put(musL, x, t, g * np.cos(a)); put(musR, x, t, g * np.sin(a))
def strings(ms, d, g=.05):   # ensemble gesek: saw detune + low-pass, attack lambat
    t = tt(d); out = np.zeros_like(t)
    for m in ms:
        for det in (-.08, -.03, .03, .08): f = mf(m + det); out += 2 * ((f * t + det * 3) % 1) - 1
    return lp(out, 2200) * np.minimum(1, t / .45) * np.minimum(1, (d - t) / .4) * g / len(ms)
def festive(t0, t1, bpm, prog, energy=1.0, bells=False):
    b = 60 / bpm; k = 0; t = t0
    while t < t1 - .05:
        ch = CH[prog[k % len(prog)]]; root = ch[0] - 24
        for i in range(4):
            tb = t + i * b
            if tb >= t1: break
            put(music, kick(), tb, .5 if i % 2 == 0 else 0); put(music, kendang(f0=140 if i % 2 else 100), tb + b / 2, .35 * energy)
            if i % 2: put(music, snare(), tb, .35 * energy)
            for h in range(2): put(music, hat(), tb + h * b / 2, .6)
            put(music, pluck_bass(root + (7 if i % 2 else 0), b * .9), tb, .5)
        pat = [0, 2, 1, 2, 0, 1, 2, 3] if k % 2 == 0 else [2, 1, 0, 1, 2, 3, 2, 1]; tones = ch + [ch[0] + 12]
        for j, p in enumerate(pat):
            tm = t + j * b / 2
            if tm >= t1: break
            putp((bell if bells else marimba)(tones[p] + 12, .6 if bells else .32), tm, .32 if bells else .4, -.45 if j % 2 else .45)
        if energy > .55:   # jawaban melodi suling-ish (sinus + vibrato) tiap dua birama
            if k % 2 == 1:
                for j, m in enumerate([ch[2] + 12, ch[1] + 12, ch[0] + 12, ch[1] + 12]):
                    tm = t + j * b; d = b * .95
                    if tm + d < t1: tq = tt(d); putp(np.sin(2 * np.pi * mf(m + 12) * tq + .25 * np.sin(2 * np.pi * 5.5 * tq)) * np.minimum(1, tq / .04) * np.exp(-tq * 1.8) * .16, tm, energy, .2)
        put(music, strings([ch[0], ch[1] + 12, ch[2]], 4 * b, .05 * energy), t)
        t += 4 * b; k += 1

# Musik kantor pos sore: groove santai + detak jam (hi-hat) yang makin rapat seiring jam 16.55 → 17.00, pizzicato "menulis", stab panik amplop, string tegang saat kertas keluar pintu & truk dipanaskan,
# hentakan "Selesai!", hening lalu riser hitung huruf → BOOM 168, fanfare rekor dunia, lonceng mimpi "kota para malaikat", groove kaset 1989, womp ongkir, klakson + perayaan, hangat di kartu, bed hook untuk loop.
S_ = {l['id']: l for l in LINES}
def W_(k, pre):
    l = S_[k]; return l['start'] + next((w['s'] for w in l['words'] if w['w'].lower().lstrip('.¡¿,!?" ').startswith(pre.lower())), l['words'][0]['s'])
st = lambda k: S_[k]['start']; en = lambda k: S_[k]['end']
def upright(m, d=.5, g=.5):
    t = tt(d); f = mf(m); return (np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t * 7)) * np.exp(-t * 4.5) * np.minimum(1, t / .012) * g
def pizzline(t0, t1, bpm, notes, g=.3):
    b = 60 / bpm; t = t0; k = 0
    while t < t1 - .05: put(music, pizz(notes[k % len(notes)], .2), t, g); t += b; k += 1
def chime(t0, m=84, g=.35, pan=.2): putp(bell(m, 1.0) * 1.2, t0, g, pan)
def womp(t0, ms=(58, 57, 56, 53), d=.34, g=.16):
    for k, m in enumerate(ms): put(music, brass([m], d * (2.2 if k == len(ms) - 1 else 1), .03, 1300, g), t0 + k * d)
def stab(t0, ms=(48, 55, 60, 64), g=.22): put(music, brass(list(ms), .6, .02, 2800, g), t0); put(music, cymbal(1.2, .14), t0); put(music, kick(.5), t0, .5)
def hook_bed(t0, d):
    put(music, pad([45, 52, 57], d, .09), t0); tq = tt(d); put(music, hp(rng.standard_normal(len(tq)), 2500) * (tq / d) ** 2 * .07, t0)
    for i in range(int(d / .5) + 1): put(music, kick(.3), t0 + i * .5, .3 if i % 2 else .18)
    for k, m in enumerate([76, 79, 84]): putp(bell(m, .8), t0 + .25 + k * .45, .15, (k - 1) * .5)
def silence(t0, t1, f=.08):
    a, b = int(t0 * SR), int(t1 * SR); n = int(f * SR)
    for buf in (music, musL, musR): buf[a:a + n] *= np.linspace(1, 0, n); buf[a + n:b] = 0; buf[b:b + n] *= np.linspace(0, 1, n)
def ticks(t0, t1, every, g=.5):   # detak jam
    t = t0; k = 0
    while t < t1: putp(hat(.04, .3) * (1.4 if k % 2 == 0 else .9), t, g, .35 if k % 2 else -.35); t += every; k += 1
hook_bed(0.0, C['open'])
# A. buru-buru: groove + detak jam
festive(C['open'] + .1, st('06'), 108, ['C', 'Am', 'F', 'G'], .45); ticks(C['open'] + .1, st('06'), .5, .4)
for k in ('st_id', 'st_ph', 'st_vn', 'st_my'): chime(C[k], 88, .2)
# B. Thailand menulis: pizzicato tenang, detak makin rapat
pizzline(st('07'), en('12'), 96, [60, 62, 64, 67, 64, 62], .22); ticks(st('07'), C['big'], .42, .45)
put(music, strings([45, 52, 57], en('09') - st('08'), .04), st('08'))
stab(st('13') - .02, (50, 57, 62, 65), .2); ticks(C['big'], W_('15', 'Selesai'), .3, .5)
put(music, strings([40, 47, 52, 55], W_('15', 'Selesai') - C['big'], .05), C['big']); pizzline(C['door'], W_('15', 'Selesai'), 140, [45, 48, 52, 51, 50, 48, 47, 48], .26)
stab(W_('15', 'Selesai') - .02, (48, 55, 60, 64), .26); festive(W_('15', 'Selesai') + .1, st('17') - .05, 116, ['C', 'F', 'G', 'C'], .55)
# C. hitung huruf: riser → BOOM 168 → rekor dunia
t1 = W_('17', '168'); silence(st('17') - .05, t1 - .02); n_ = int((t1 - st('17')) * SR); put(music, hp(rng.standard_normal(n_), 1500) * np.linspace(0, 1, n_) ** 2 * .07, st('17'))
for k in range(int((t1 - st('17')) / .14)): put(music, pizz(55 + k, .15), st('17') + k * .14, .25)
stab(t1 - .02, (43, 50, 55, 59), .3); put(music, brass([60, 64, 67], .5, .02, 2600, .16), C['record']); put(music, brass([65, 69, 72], .9, .02, 2600, .16), C['record'] + .4)
put(music, strings([53, 57, 60, 65], en('20') - st('19'), .05), st('19'))
for k, pre in enumerate(['para', 'agung', 'sembilan']): chime(W_('20', pre), [79, 83, 86][k], .26, (k - 1) * .4)
festive(W_('22', 'Ada'), en('22') + .1, 120, ['C', 'Am', 'F', 'G'], .7, bells=True)
# D. ongkir per huruf → Krung Thep aja → klakson, truk berangkat
silence(st('23') - .05, en('23')); womp(W_('23', 'huruf') + .1, (58, 57, 56, 53), .2, .11)
put(music, upright(45, .3, .45), st('24')); stab(W_('24', 'aja') - .02, (52, 59, 64, 67), .2)
festive(st('25'), C['card'], 124, ['C', 'F', 'G', 'C'], .85, bells=True); stab(C['honk'] - .02, (48, 55, 60, 64), .22)
t = C['card']; put(music, strings([53, 57, 60, 65], C['end_in'] - t, .06), t); festive(t + .3, C['end_in'], 96, ['F', 'C', 'Dm', 'G'], .4)
festive(C['end_in'] + .1, C['loop'] + .1, 112, ['C', 'Am', 'F', 'G'], .85, bells=True)
fe0, fe1 = int(C['loop'] * SR), int((C['loop'] + .5) * SR)
for buf in (music, musL, musR): buf[fe0:fe1] *= np.linspace(1, 0, fe1 - fe0); buf[fe1:] = 0
def tik(t0, g=.55):   # detak jam close-up: klik kayu + dentum kecil
    t = tt(.12); put(music, (np.sin(2 * np.pi * 1900 * t) * np.exp(-t * 80) + .6 * np.sin(2 * np.pi * 950 * t) * np.exp(-t * 45) + .5 * np.sin(2 * np.pi * 120 * t) * np.exp(-t * 30)) * g, t0)
tik(0.0, .3); tik(.5); tik(1.0, .3)
for k in ('clk56', 'clk57', 'clk58', 'clk59', 'clk60'): silence(C[k] + .03, C[k] + .8, .05); tik(C[k] + .3, .65 if k == 'clk60' else .55)

def ir(seed, d=1.6):
    r_ = np.random.default_rng(seed); tq = tt(d); x = r_.standard_normal(len(tq)) * np.exp(-tq * 3.6); x = lp(x, 5000); x[:int(.012 * SR)] = 0; return x / np.abs(x).sum() * 9
from scipy.signal import fftconvolve
dryL, dryR = music + musL, music + musR
musicL = dryL + fftconvolve(dryL, ir(1))[:N] * .32; musicR = dryR + fftconvolve(dryR, ir(2))[:N] * .32
vo = np.zeros(N)
for l in LINES:
    y, _ = librosa.load(f"build/vo/{l['id']}.wav", sr=SR); put(vo, y, l['start'])
for h in D.get('hook', []): put(vo, librosa.load(f"build/vo/{h['id']}.wav", sr=SR)[0], h['start'])   # VO hook
sfx = np.zeros(N)
for s in D['sfx']:
    y, _ = librosa.load(s['f'], sr=SR)
    if 'rate' in s: y = np.interp(np.arange(0, len(y) - 1, s['rate']), np.arange(len(y)), y)   # nada kunyah per karakter
    put(sfx, y / (np.abs(y).max() + 1e-9) * .9, s['t'], db(s['db']))

env = np.convolve(np.abs(vo), np.ones(int(.02 * SR)) / int(.02 * SR), 'same'); act = (env > .01).astype(float)
duck = np.zeros(N); a, r = 1 - np.exp(-1 / (.04 * SR)), 1 - np.exp(-1 / (.28 * SR)); v = 0.0
for i in range(0, N, 64):
    tgt = act[i]; v += ((a if tgt > v else r) * 64) * (tgt - v); v = min(max(v, 0), 1); duck[i:i + 64] = v
dk = db(-12) * duck + (1 - duck); sfx_g = sfx * (db(-6) * duck + (1 - duck))
vo_t = vo / (np.abs(vo).max() + 1e-9) * .89
pk = max(np.abs(musicL).max(), np.abs(musicR).max()) + 1e-9
mL, mR = musicL * dk / pk * .21, musicR * dk / pk * .21; mus_t = (mL + mR) / 2
lim = lambda x: np.tanh(x * 1.1) / np.tanh(1.1)
mix = np.stack([lim(vo_t + mL + sfx_g * .75), lim(vo_t + mR + sfx_g * .75)], 1)
for nm, x in [('vo_track', vo_t), ('sfx_track', sfx_g * .75)]:
    sf.write(f'audio/{nm}.wav', np.stack([x, x], 1).astype(np.float32), SR, subtype='PCM_16')
sf.write('audio/music_track.wav', np.stack([mL, mR], 1).astype(np.float32), SR, subtype='PCM_16')
sf.write('audio/mix.wav', mix.astype(np.float32), SR, subtype='PCM_16')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', 'audio/mix.wav', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '44100', '-c:a', 'aac', '-b:a', '256k', 'audio/mix.m4a'], check=True)
from scipy.signal import butter as _b
b_, a_ = _b(2, 500 / (SR / 2), 'high'); vh, sh = lfilter(b_, a_, vo_t), lfilter(b_, a_, sfx_g * .75)
rms = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-9)
for l in LINES:
    i0, i1 = int(l['start'] * SR), int(l['end'] * SR)
    print(f"{l['id']} {l['who']:3s} VO-music {rms(vo_t[i0:i1]) - rms(mus_t[i0:i1]):5.1f} dB  VO-sfx(>500Hz) {rms(vh[i0:i1]) - rms(sh[i0:i1]):5.1f} dB")
print('audio ok', round(N / SR, 2))
