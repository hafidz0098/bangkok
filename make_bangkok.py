"""Rakit index.src.html dari template kerupuk: latar (src/room_bangkok.js), adegan (src/scene_bangkok.js), bendera GR/PL, font Yunani/Jepang, LOUD; mix.py dari template + src/mix_bangkok.py."""
import os, re, sys
R = os.path.dirname(os.path.abspath(__file__)) + '/'; T = R + '../kerupuk/'
s = open(T + 'index.src.html', encoding='utf-8').read()
cut = lambda a, b: (s.index(a), s.index(b))
i0, i1 = cut('/* ---- LAPANGAN KAMPUNG 17-AN', '/* ---------- RIG COUNTRYBALL'); s = s[:i0] + open(R + 'src/room_bangkok.js', encoding='utf-8').read() + '\n' + s[i1:]
i0, i1 = cut('/* ================= KARAKTER & PROPERTI', 'let renderWM = () => {};'); s = s[:i0] + open(R + 'src/scene_bangkok.js', encoding='utf-8').read() + s[i1:]
s, n = re.subn(r'<link href="https://fonts\.googleapis\.com/css2\?family=Noto\+Sans\+Thai[^>]*>\n', '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&display=block" rel="stylesheet">\n', s); assert n == 1
s, n = re.subn(r"\[\['Noto Sans Thai', 'มวยไทย'\][^\n]*?\]\]", "[['Noto Sans', 'Hà Nội ♪']]", s); assert n == 1, 'font load'
for a, b in [("<title>Kerupuk dalam Berbagai Negara</title>", "<title>Nama Ibu Kota Terpanjang</title>"),
             ("linear-gradient(180deg,#8E1B1B,#D23C2C)", "linear-gradient(180deg,#5A1E18,#C8463A)"),
             ]:
    if s.count(a) != 1: print('GAGAL', a[:70], s.count(a)); sys.exit(1)
    s = s.replace(a, b)
s, n = re.subn(r"const LOUD = \{[^}]*\};", "const LOUD = { '01': 1.3, '06': 1.2, '13': 1.6, '14': 1.4, '17': 1.4, '10': .6, '11': .7, '07': .7, '09': .7, '12': .7, '15': .8, '20': .7, '23': .7 };", s); assert n == 1
CSS = ('#endc{background:radial-gradient(ellipse at 50% 30%,#8E2A22,#3A1210 75%)!important;box-shadow:inset 0 0 0 16px #FFE14D,inset 0 0 0 26px #3A1210,inset 0 0 0 30px #FFE14D!important;overflow:hidden}'
       '#endc h1{top:300px;font-size:84px}#endc h1 span{color:#FFE14D}#endc .bar{top:500px;background:#FFE14D}#endc .col{top:560px;gap:18px}'
       '#endc .row{height:128px;background:#FFFDF6!important;border:none!important;color:#3A1210;box-shadow:0 8px 0 rgba(0,0,0,.35);overflow:visible}#endc .row.id{background:#FFE14D!important}'
       '#endc .flag{width:96px;height:96px}#endc .w{font-size:46px}#endc .track{position:relative;height:34px;margin-top:10px}#endc .fill{position:absolute;left:0;top:0;height:34px;border-radius:17px;background:#C8463A;width:0}'
       '#endc .row.id .fill{background:#8E2A22}#endc .num{position:absolute;left:0;top:-4px;font:400 40px/1 Lilita One,sans-serif;color:#3A1210;padding-left:8px;transform:translateX(var(--x,0))}'
       '#endc .foot{top:1340px;font-size:26px;color:#F6D9C8}\n')
assert s.count('</style>') == 1; s = s.replace('</style>', CSS + '</style>')
open(R + 'index.src.html', 'w', encoding='utf-8').write(s)
m = open(T + 'mix.py', encoding='utf-8').read(); a = m.index('# Musik lomba 17-an'); b = m.index('def ir(seed')
m = m[:a] + open(R + 'src/mix_bangkok.py', encoding='utf-8').read() + '\n' + m[b:]; m = m.replace('Kerupuk dalam Berbagai Negara:', 'Nama Ibu Kota Terpanjang:')
v_ = "    y, _ = librosa.load(f\"build/vo/{l['id']}.wav\", sr=SR); put(vo, y, l['start'])\n"; assert m.count(v_) == 1, 'vo loop'
m = m.replace(v_, v_ + "for h in D.get('hook', []): put(vo, librosa.load(f\"build/vo/{h['id']}.wav\", sr=SR)[0], h['start'])   # VO hook\n")
open(R + 'mix.py', 'w', encoding='utf-8').write(m)
print('ok')
