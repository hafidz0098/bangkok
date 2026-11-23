"""Nama Ibu Kota Terpanjang: potong VO terpilih → timeline dari durasi aktual → cue aksi & SFX → data.json."""
import json, os, re, subprocess
import numpy as np, librosa, soundfile as sf

ROOT = os.path.dirname(os.path.abspath(__file__)); os.chdir(ROOT)
os.makedirs('build/vo', exist_ok=True); os.makedirs('output', exist_ok=True)
SR = 44100
VOICE = {'SG': ('QuLloIKxiP3i9uFXzfgD', 'Zulsyifah'), 'TH': ('BSiuHWDgVlCBuGpext0k', 'Suara Pria Indonesia NPC'), 'ID': ('R86jddkroI9bJwXFfjsr', 'Saos cocol'),
         'MY': ('qXOoUJU1h7AiwSe4ltRA', 'Zulfa'), 'PH': ('ffTJE9l3Kt2ipEM32UOc', 'Aita'), 'VN': ('2lcxSPWqG78QhJnKPyMX', 'Genesius'), 'NR': ('ZowYWFat3iypr7PwKMPb', 'Vivan')}
HOOK = 0.0;   # tanpa hook pembuka (permintaan user)
SPEED = 1.12; LEVEL = -21
takes = {t['take']: t for t in json.load(open('vo/takes/takes.json', encoding='utf-8'))}
P = json.load(open('vo/prompts.json', encoding='utf-8')); CH_ = json.load(open('vo/takes/chosen.json', encoding='utf-8'))
strip = lambda s: re.sub(r'\s+', ' ', re.sub(r'\[[^\]]*\]', '', s)).strip()
# teks subtitle (ejaan asli + angka; ejaan fonetik/terbilang hanya untuk TTS)
SUB = {'04': 'Hà Nội. Dua suku kata aja.', '06': 'Selanjutnya! Thailand!',
       '07': 'Sebentar ya... Krung Thep Mahanakhon...',
       '09': 'Bangkok itu nama panggilan. Nama lengkapnya... Amon Rattanakosin... Mahinthara Ayuthaya...',
       '12': '...Mahadilok Phop, Noppharat Ratchathani, Burirom...',
       '15': '...Udomratchaniwet Mahasathan, Amon Piman Awatan Sathit, Sakkathattiya Witsanukam Prasit. Selesai!',
       '17': 'Satu, dua, tiga... 168 huruf?!', '22': 'Ada lagunya, lho. Tahun 1989.',
       '24': '...Krung Thep aja deh.', '25': 'Nah gitu! Orang sana juga manggilnya Krung Thep!',
       '26': 'Nama seremonial Bangkok tercatat di Guinness sebagai nama tempat terpanjang di dunia, 168 huruf. Sehari-hari, warga Thailand menyebutnya Krung Thep, Kota Para Malaikat.'}
L, chosen = {}, {}
for lab, (who, p) in P.items():
    k = lab[:2]; L[k] = (who, SUB.get(k, strip(p))); chosen[k] = CH_[lab]['take']

def squeeze(y, thr=-40, keep=.13, minlen=.2):   # padatkan jeda panjang di dalam baris
    hop = 256; db = 20 * np.log10(librosa.feature.rms(y=y, frame_length=1024, hop_length=hop)[0] + 1e-9); q = db < thr; n = len(q); out = []; last = 0; i = 0
    while i < n:
        if not q[i]: i += 1; continue
        j = i
        while j < n and q[j]: j += 1
        if i > 0 and j < n and (j - i) * hop / SR > minlen: a = i * hop + int(keep / 2 * SR); b = j * hop - int(keep / 2 * SR); out.append(y[last:a]); last = b
        i = j
    out.append(y[last:]); return np.concatenate(out)
def fade(y, ms=12):
    n = int(SR * ms / 1000); y = y.copy(); y[:n] *= np.linspace(0, 1, n); y[-n:] *= np.linspace(1, 0, n); return y
def voiced(y, thr=-38):
    db = 20 * np.log10(librosa.feature.rms(y=y, frame_length=1024, hop_length=256)[0] + 1e-9); on = np.where(db > thr)[0]
    return on[0] * 256 / SR, (on[-1] + 4) * 256 / SR
syl = lambda w: max(1, len(re.findall(r'[aiueoAIUEOÁ]+', w)))
def even_words(text, s0, s1):   # cadangan sebelum align_words.py dijalankan
    t = text.split(); tot = sum(map(syl, t)); acc = 0; out = []
    for w in t: out.append({'w': w, 's': round(s0 + (s1 - s0) * acc / tot, 3), 'e': round(s0 + (s1 - s0) * (acc + syl(w)) / tot, 3)}); acc += syl(w)
    return out
def tempo(tk):
    tp = f'build/tempo/{tk}.wav'
    if not os.path.exists(tp): subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'vo/takes/{tk}.mp3', '-filter:a', f'atempo={SPEED}', '-ar', str(SR), tp], check=True)
    return librosa.load(tp, sr=SR, mono=True)[0]

ALIGN = json.load(open('vo/align.json', encoding='utf-8')) if os.path.exists('vo/align.json') else {}
seg = {}; os.makedirs('build/tempo', exist_ok=True)
def prep(k):
    who, text = L[k]; take = chosen[k]; y = squeeze(tempo(take))
    s0, s1 = voiced(y); x = fade(y[int(max(0, s0 - .04) * SR):int(min(len(y) / SR, s1 + .06) * SR)])
    r = librosa.feature.rms(y=x, frame_length=1024, hop_length=256)[0]; act = r[r > 10 ** (-48 / 20)]
    g = float(np.clip(.9 * (LEVEL + 20 * -np.log10(np.sqrt(np.mean(act ** 2)) + 1e-9)), -10, 18)); x = x * 10 ** (g / 20)
    x = x * min(1, .98 / (np.abs(x).max() + 1e-9)); seg[k] = x
    w = ALIGN[k]['words'] if ALIGN.get(k, {}).get('take') == take else even_words(text, *voiced(x))
    db = 20 * np.log10(librosa.feature.rms(y=x, frame_length=512, hop_length=128)[0] + 1e-9); H_ = 128 / SR
    for w_ in w:
        i_ = int(w_['s'] / H_); on_ = np.where(db[i_:i_ + int(.6 / H_)] > -42)[0]
        if len(on_) and on_[0] > 0: w_['s'] = round((i_ + on_[0]) * H_, 3)
    return {'id': k, 'take': take, 'who': who, 'text': text, 'dur': round(len(x) / SR, 3), 'words': w}
lines = {k: prep(k) for k in L}
for l_ in lines.values():   # urutan dijaga, tiap kata minimal 0,13 dtk di layar
    w = l_['words']
    for i in range(1, len(w)):
        lim = w[i + 1]['s'] - .05 if i + 1 < len(w) else l_['dur']
        if w[i]['s'] - w[i - 1]['s'] < .13: w[i]['s'] = round(min(w[i - 1]['s'] + .13, lim), 3)

T = {}
def place(k, t):
    l = lines[k]; l['start'] = round(t, 3); l['end'] = round(t + l['dur'], 3); T[k] = l; return l['end']
c = {'hook': 0.0, 'open': HOOK}
# A. jam 16.55: semua menulis alamat cepat-cepat
e = place('01', c['open'] + .45)
e = place('02', e + .2); c['st_id'] = e + .02
e = place('03', e + .1); c['st_ph'] = e + .02
e = place('04', e + .12); c['st_vn'] = e + .02
e = place('05', e + .12); c['st_my'] = e + .02
# B. Thailand mulai menulis nama lengkap
e = place('06', e + .3); e = place('07', e + .15); c['write'] = T['07']['start'] + .5
e = place('08', e + .08); e = place('09', e + .12)
e = place('10', e + .2); e = place('11', e + .12)
e = place('12', e + .2); e = place('13', e + .1); c['big'] = T['13']['end'] + .05
c['door'] = c['big'] + .5; e = place('14', c['door'] + .5)
e = place('15', e + .15); c['done'] = T['15']['end'] - .2
# C. gengsi → hitung huruf → rekor dunia
e = place('16', e + .3); e = place('17', e + .15); e = place('18', e + .15); c['record'] = T['18']['start']
e = place('19', e + .2); e = place('20', e + .12); e = place('21', e + .25); e = place('22', e + .12)
# D. ongkos kirim per huruf → Krung Thep → truk berangkat
e = place('23', e + .3); e = place('24', e + .1); e = place('25', e + .12)
c['honk'] = e + .2; c['leave'] = c['honk'] + .6
c['card'] = c['leave'] + 1.2; e = place('26', c['card'] + .3)
c['end_in'] = e + .4; c['loop'] = c['end_in'] + 2.8; c['end'] = round(c['loop'] + .85, 2)
c = {k: round(float(v), 3) for k, v in c.items()}

order = sorted(T.values(), key=lambda l: l['start'])
for l in order: sf.write(f"build/vo/{l['id']}.wav", seg[l['id']], SR)
S = lambda k: T[k]['start']; E = lambda k: T[k]['end']
def W(k, pre):
    w = T[k]['words']; return T[k]['start'] + next((x['s'] for x in w if x['w'].lower().lstrip('.¡¿,!?" ').startswith(pre.lower())), w[0]['s'])
CR = '../enak/sfx/door_creak'; CHAT = '../enak/sfx/party_chatter'
HOOKVO = []   # tanpa hook pembuka
sfx = [(0.0, 'bass_impact', -14), (HOOK - .15, 'whoosh', -16),
       (S('01') - .05, 'impact', -30), (c['st_id'], 'stamp', -24), (c['st_ph'], 'stamp', -24), (c['st_vn'], 'stamp', -24), (c['st_my'], 'stamp', -24),
       (S('06') - .03, 'pop', -28), (W('07', 'Krung') - .05, 'sparkle', -30), (S('08') - .03, 'record_scratch', -32),
       (W('09', 'Amon') - .05, 'whoosh', -32), (W('12', 'Mahadilok') - .05, 'whoosh', -32), (S('13') - .03, 'boing', -28),
       (c['big'] + .05, 'whoosh', -24), (c['door'], CR, -32), (c['door'] + .1, 'whoosh', -22),
       (W('15', 'Selesai') - .05, 'stamp', -22), (W('15', 'Selesai'), 'sparkle', -26),
       (W('17', '168') - .05, 'bass_impact', -20), (c['record'] - .02, 'impact', -22), (c['record'] + .05, 'crowd_gasp', -34),
       (W('20', 'Kota') - .03, 'sparkle', -30), (W('22', '1989') - .05, 'pop', -26),
       (S('23') + .1, 'record_scratch', -30), (S('24') - .03, 'boing', -28), (W('24', 'aja') - .05, 'stamp', -24),
       (c['leave'], 'whoosh', -20), (c['card'], 'whoosh', -13), (c['end_in'], 'whoosh', -13)]
sfx += [(round(T['17']['start'] + .05 + i * .14, 3), 'pop', -32, 1.2 + (i % 3) * .2) for i in range(6)]   # hitung huruf
sfx += [(round(c['end_in'] + .35 + i * .12, 3), 'pop', -18) for i in range(5)]
sfx += [(c['loop'] + .2, 'whoosh', -16)]
sfx = [{'t': round(x[0], 3), 'f': (x[1] if '/' in x[1] else f'../sfx/{x[1]}') + '.mp3', 'db': x[2], **({'rate': x[3]} if len(x) > 3 else {})} for x in sfx]
json.dump({'lines': order, 'cues': c, 'sfx': sfx, 'hook': HOOKVO}, open('data.json', 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
meta = [{'id': l['id'], 'file': f"vo/takes/{l['take']}.mp3", 'karakter': l['who'], 'teks': l['text'], 'prompt_tts': takes[l['take']]['prompt'], 'voice_id': VOICE[l['who']][0], 'voice_name': VOICE[l['who']][1],
         'model_id': 'eleven_v4', 'flow_id': 'npDs238LkcKR13h09n7c', 'durasi_aktual_s': l['dur'], 'mulai_di_video_s': l['start'], 'kata': l['words']} for l in order]
json.dump(meta, open('vo/vo_metadata.json', 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
for l in order: print(f"{l['id']} {l['who']:3s} {l['start']:6.2f}-{l['end']:6.2f} {l['text'][:50]}")
print(c); print('durasi', c['end'])
