"""Cek subtitle vs suara: tiap unit harus mulai di bagian bersuara, dan tidak ada unit yang tampil jauh sebelum/ sesudah ucapannya."""
import json, os
import numpy as np, librosa

ROOT = os.path.dirname(os.path.abspath(__file__)); os.chdir(ROOT)
D = json.load(open('data.json', encoding='utf-8')); SR = 22050; bad = 0; n = 0; lead = []
y, _ = librosa.load('audio/vo_track.wav', sr=SR, mono=True); db = 20 * np.log10(librosa.feature.rms(y=y, frame_length=512, hop_length=128)[0] + 1e-9); mask = db > -42; H = 128 / SR
for l in D['lines']:
    w = l['words']
    for i, u in enumerate(w):
        s = l['start'] + u['s']; n += 1
        on = np.where(mask[int(s / H):int((s + .35) / H)])[0]; d = on[0] * H if len(on) else None
        lead.append(d if d is not None else 9)
        if d is None or d > .08: bad += 1; print(f"{l['id']} {u['w']!r} mulai {s:.2f}: suara baru {('tidak ada' if d is None else f'{d:.2f} dtk kemudian')}")
        if i and u['s'] < w[i - 1]['s']: bad += 1; print(l['id'], 'urutan salah', u['w'])
print(f'{n} unit, {bad} bermasalah, selisih onset rata-rata {np.mean(lead):.3f} dtk')
