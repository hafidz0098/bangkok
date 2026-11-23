"""Waktu kata asli untuk subtitle (Nama Ibu Kota Terpanjang): Whisper pada VO terpotong (build/vo) → cocokkan ke teks naskah → vo/align.json.
Jalankan sesudah build.py, lalu jalankan build.py lagi supaya timeline memakainya."""
import json, os, re, sys
from difflib import SequenceMatcher
import numpy as np, librosa
from faster_whisper import WhisperModel

ROOT = os.path.dirname(os.path.abspath(__file__)); os.chdir(ROOT)
D = json.load(open('data.json', encoding='utf-8')); SR = 22050
meta = {m['id']: m for m in json.load(open('vo/vo_metadata.json', encoding='utf-8'))}
SATUAN = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas']
def terbilang(n):
    if n < 12: return SATUAN[n]
    if n < 20: return SATUAN[n - 10] + ' belas'
    if n < 100: return SATUAN[n // 10] + ' puluh ' + SATUAN[n % 10]
    if n < 200: return 'seratus ' + terbilang(n - 100)
    if n < 1000: return SATUAN[n // 100] + ' ratus ' + terbilang(n % 100)
    if n < 2000: return 'seribu ' + terbilang(n - 1000)
    return terbilang(n // 1000) + ' ribu ' + terbilang(n % 1000)
norm = lambda s: re.sub(r'[^a-z0-9]', '', s.lower())
syl = lambda w: max(1, len(re.findall(r'[aiueo]+', w.lower())))

def spoken_tokens(words):
    """token Whisper → kata terucap; angka digit dipecah jadi kata dengan waktu proporsional suku kata"""
    merged = []
    for w, s, e in words:
        if merged and re.fullmatch(r'[.,]\d{3}\W*', w): merged[-1] = (merged[-1][0] + w, merged[-1][1], e)
        else: merged.append((w, s, e))
    out = []
    for w, s, e in merged:
        digits = re.sub(r'\D', '', w)
        if re.fullmatch(r'\W*[.,]5\W*', w): out.append(('setengah', s, e)); continue   # "10 ,5" dari Whisper
        if digits:
            n_ = int(re.match(r'\D*(\d+)', w).group(1))   # angka dibaca sebagai bilangan (42 = empat puluh dua)
            spoken = terbilang(n_) + (' persen' if '%' in w else '') + (' setengah' if re.search(r'[.,]5', w) else '')
            parts = spoken.split(); tot = sum(map(syl, parts)); acc = 0
            for p in parts: out.append((p, s + (e - s) * acc / tot, s + (e - s) * (acc + syl(p)) / tot)); acc += syl(p)
        else: out.append((norm(w), s, e))
    return out

def voiced_mask(path):
    y, _ = librosa.load(path, sr=SR, mono=True); db = 20 * np.log10(librosa.feature.rms(y=y, frame_length=512, hop_length=128)[0] + 1e-9)
    return db > max(-42, db.max() - 32), 128 / SR

def align(text, tokens, mask, hop, dur):
    S = text.split(); out = [None] * len(S); T = [t[0] for t in tokens]; used = -1
    # pencocokan berurutan: kata naskah ke token paling mirip di depannya
    for i, w in enumerate(S):
        best, score = None, .6
        for j in range(used + 1, min(used + 7, len(T))):   # angka terurai jadi beberapa token ("1600-an" = 4)
            r = SequenceMatcher(None, norm(w), T[j]).ratio() - (j - used - 1) * .05
            if r > score: best, score = j, r
        if best is not None: out[i] = [tokens[best][1], tokens[best][2]]; used = best
    # kata yang tidak cocok: isi di antara jangkar menurut suku kata
    i = 0
    while i < len(S):
        if out[i] is not None: i += 1; continue
        j = i
        while j < len(S) and out[j] is None: j += 1
        a = out[i - 1][1] if i else 0.0; b = out[j][0] if j < len(S) else dur
        tot = sum(syl(S[k]) for k in range(i, j)); acc = 0
        for k in range(i, j): out[k] = [a + (b - a) * acc / tot, a + (b - a) * (acc + syl(S[k])) / tot]; acc += syl(S[k])
        i = j
    # rapikan: mulai kata digeser ke onset suara bila jatuh di jeda, urutan dijaga
    for k, (s, e) in enumerate(out):
        i0, i1 = int(s / hop), max(int(s / hop) + 1, int(e / hop))
        on = np.where(mask[i0:i1])[0]
        if len(on): s = (i0 + on[0]) * hop
        if k: s = max(s, out[k - 1][0] + .04)
        out[k] = [round(s, 3), round(max(e, s + .05), 3)]
    # dua kata yang menempel tidak wajar (Whisper kadang memadatkan): bagi rentangnya menurut suku kata
    for k in range(1, len(S)):
        if out[k][0] - out[k - 1][0] < .07 * syl(S[k - 1]):
            a_, b_ = out[k - 1][0], out[k][1]; out[k][0] = round(a_ + (b_ - a_) * syl(S[k - 1]) / (syl(S[k - 1]) + syl(S[k])), 3); out[k - 1][1] = out[k][0]
    return [{'w': w, 's': s, 'e': e} for w, (s, e) in zip(S, out)]

model = WhisperModel('large-v3', device='cpu', compute_type='int8', local_files_only=True); res = {}
for l in D['lines']:
    p = f"build/vo/{l['id']}.wav"; seg, _ = model.transcribe(p, language='id', word_timestamps=True, vad_filter=False, initial_prompt=meta[l['id']]['teks'])
    raw = [(w.word.strip(), w.start, w.end) for s in seg for w in s.words]; mask, hop = voiced_mask(p)
    res[l['id']] = {'take': l['take'], 'whisper': ' '.join(r[0] for r in raw), 'words': align(l['text'], spoken_tokens(raw), mask, hop, l['dur'])}
    print(l['id'], '|', res[l['id']]['whisper'], '\n   ', ' '.join(f"{w['w']}@{w['s']:.2f}" for w in res[l['id']]['words']))
json.dump(res, open('vo/align.json', 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
