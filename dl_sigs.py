"""Unduh take (Nama Ibu Kota Terpanjang) dari vo/sigs.txt (session gen signature). URL bertanda tangan kedaluwarsa ±2 jam."""
import json, os, urllib.request
os.chdir(os.path.dirname(os.path.abspath(__file__)))
S = json.load(open('vo/sessions.json')); P = json.load(open('vo/prompts.json', encoding='utf-8'))
lab = {s: (k, i + 1) for k, v in S.items() if k != 'flow_id' for i, s in enumerate(v)}
BASE = 'https://elevenlabsusercontent.com/database/workspace/b54c244514b844289192745c0fc9f68d/content_generation'
meta = {m['take']: m for m in json.load(open('vo/takes/takes.json'))} if os.path.exists('vo/takes/takes.json') else {}
for ln in open('vo/sigs.txt').read().split('\n'):
    if not ln.strip(): continue
    sess, gid, sig, *ex = ln.split(); exp = ex[0] if ex else '1793908800'; ws = ex[1] if len(ex) > 1 else 'b54c244514b844289192745c0fc9f68d'; k, n = lab[sess]; take = f'{k}_t{n}'; f = f'vo/takes/{take}.mp3'
    if not os.path.exists(f):
        url = f'https://elevenlabsusercontent.com/database/workspace/{ws}/content_generation/{sess}/{gid}/content.mp3?Expires={exp}&KeyName=assets-cdn-key-1&Signature={sig}'
        open(f, 'wb').write(urllib.request.urlopen(url).read())
    if take not in meta: meta[take] = {'take': take, 'label': k, 'generation_id': gid, 'session': sess, 'who': P[k][0], 'prompt': P[k][1], 'model_id': 'eleven_v4'}
json.dump(sorted(meta.values(), key=lambda m: m['take']), open('vo/takes/takes.json', 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
print(len(meta), 'takes')
