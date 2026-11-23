"""Cek independen tiap take dengan Whisper lokal: transkrip + skor kemiripan dengan naskah → vo/takes/whisper.json, chosen.json (draf)."""
import difflib, glob, json, os, re, sys
from faster_whisper import WhisperModel

ROOT = os.path.dirname(os.path.abspath(__file__)); os.chdir(ROOT)
model = WhisperModel(sys.argv[1] if len(sys.argv) > 1 else 'large-v3', device='cpu', compute_type='int8', local_files_only=True)
P = json.load(open('vo/prompts.json', encoding='utf-8'))
norm = lambda s: re.sub(r'[^a-z0-9 ]', '', re.sub(r'\[[^\]]*\]', '', s.lower()).replace('-', ' ')).split()
out, best = {}, {}
for f in sorted(glob.glob('vo/takes/*.mp3')):
    t = os.path.basename(f)[:-4]; lab = t.rsplit('_t', 1)[0]
    seg, _ = model.transcribe(f, language='id', word_timestamps=True, vad_filter=False)
    words = [{'w': w.word.strip(), 's': round(w.start, 3), 'e': round(w.end, 3)} for s in seg for w in s.words]
    heard = ' '.join(w['w'] for w in words)
    score = round(difflib.SequenceMatcher(None, norm(P[lab][1]), norm(heard)).ratio(), 2)
    out[t] = {'heard': heard, 'score': score, 'words': words}
    if score > best.get(lab, ('', -1))[1]: best[lab] = (t, score)
    print(f'{score:.2f}  {t:22s} | {heard}', flush=True)
json.dump(out, open('vo/takes/whisper.json', 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
json.dump({k: {'take': v[0], 'score': v[1]} for k, v in sorted(best.items())}, open('vo/takes/chosen.json', 'w'), indent=1)
