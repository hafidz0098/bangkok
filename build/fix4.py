"""Revisi 2: perbaikan 1-9 (pembuka jam, potongan jam, reaksi penonton, gag kertas-truk, tulisan kertas, amplop, properti meja, kaca loket)."""
P = 'C:/Users/User/Documents/tes-bals/bangkok/'
def patch(fn, reps):
    s = open(P + fn, encoding='utf-8').read()
    for a, b in reps:
        n = s.count(a)
        if n != 1: raise SystemExit(f'{fn}: {n}x {a[:90]}')
        s = s.replace(a, b)
    open(P + fn, 'w', encoding='utf-8').write(s)

patch('build.py', [
 ("c = {'hook': 0.0, 'open': HOOK}", "c = {'hook': 0.0, 'open': 1.2}   # cold open: close-up jam 0-1,2 dtk"),
 ("e = place('01', c['open'] + .45)", "e = place('01', c['open'] + .5)"),
 ("e = place('06', e + .3)", "c['clk56'] = e + .25; e = place('06', c['clk56'] + 1.0)"),
 ("e = place('12', e + .2)", "c['clk57'] = e + .2; e = place('12', c['clk57'] + 1.0)"),
 ("c['door'] = c['big'] + .5", "c['clk58'] = c['big'] + .5; c['door'] = c['clk58'] + 1.0"),
 ("e = place('15', e + .15)", "c['clk59'] = e + .15; e = place('15', c['clk59'] + 1.0)"),
 ("c['honk'] = e + .2; c['leave'] = c['honk'] + .6", "c['clk60'] = e + .2; c['honk'] = c['clk60'] + 1.0; c['leave'] = c['honk'] + .6"),
 ("c['card'] = c['leave'] + 1.2", "c['card'] = c['leave'] + 2.2"),
 ("sfx = [(0.0, 'bass_impact', -14), (HOOK - .15, 'whoosh', -16),", "sfx = [(c['open'] - .1, 'whoosh', -18),"),
 ("(c['leave'], 'whoosh', -20),", "(c['leave'], 'whoosh', -20), (c['leave'] + .6, 'whoosh', -22), (c['leave'] + .65, 'boing', -26), (c['leave'] + 1.05, 'pop', -24),"),
])

patch('src/mix_bangkok.py', [
 ("for buf in (music, musL, musR): buf[fe0:fe1] *= np.linspace(1, 0, fe1 - fe0); buf[fe1:] = 0",
  "for buf in (music, musL, musR): buf[fe0:fe1] *= np.linspace(1, 0, fe1 - fe0); buf[fe1:] = 0\n"
  "def tik(t0, g=.55):   # detak jam close-up: klik kayu + dentum kecil\n"
  "    t = tt(.12); put(music, (np.sin(2 * np.pi * 1900 * t) * np.exp(-t * 80) + .6 * np.sin(2 * np.pi * 950 * t) * np.exp(-t * 45) + .5 * np.sin(2 * np.pi * 120 * t) * np.exp(-t * 30)) * g, t0)\n"
  "tik(0.0, .3); tik(.5); tik(1.0, .3)\n"
  "for k in ('clk56', 'clk57', 'clk58', 'clk59', 'clk60'): silence(C[k] + .03, C[k] + .8, .05); tik(C[k] + .3, .65 if k == 'clk60' else .55)"),
])

patch('src/room_bangkok.js', [
 # jarum detik
 ("HOME.minH = PA(ck, 'M0 0 V-140', null, { stroke: '#C8463A', 'stroke-width': 10, 'stroke-linecap': 'round' }); CI(ck, 0, 0, 16, INK);",
  "HOME.minH = PA(ck, 'M0 0 V-140', null, { stroke: '#C8463A', 'stroke-width': 10, 'stroke-linecap': 'round' }); HOME.secH = PA(ck, 'M0 30 V-160', null, { stroke: '#E8A33A', 'stroke-width': 4, 'stroke-linecap': 'round' }); CI(ck, 0, 0, 16, INK);"),
 # kertas Thailand masuk ke truk (terlihat dari jendela)
 ("HOME.truck = G(view, { transform: 'translate(40,150)' });",
  "HOME.vstrip = [PA(view, '', null, { stroke: INK, 'stroke-width': 40, 'stroke-linejoin': 'round' }), PA(view, '', null, { stroke: '#FFFDF6', 'stroke-width': 30, 'stroke-linejoin': 'round' }), PA(view, '', null, { stroke: '#1F3B78', 'stroke-width': 5, 'stroke-dasharray': '18 10' })];\n  HOME.truck = G(view, { transform: 'translate(40,150)' });"),
 # kaca loket tipis dengan lubang bicara (wajah Singapura tidak pudar)
 ("R(lk, -176, T0 - 324, 352, 250, 'url(#glass)', 0, { opacity: .45 });",
  "PA(lk, `M-176 ${T0 - 324} H176 V${T0 - 74} H125 A125 125 0 0 0 -125 ${T0 - 74} H-176Z`, 'url(#glass)', { opacity: .3 }); PA(lk, `M125 ${T0 - 74} A125 125 0 0 0 -125 ${T0 - 74}`, null, { stroke: '#8A8F98', 'stroke-width': 10 });"),
 # properti meja + papan peringatan di depan meja (mengisi close-up)
 ("  [x0 + 40, (x0 + x1) / 2, x1 - 40].forEach(x => PA(md, `M${x} ${T1 + 88} L${x} -200`, null, { stroke: '#5A3A20', 'stroke-width': 14, 'stroke-linecap': 'round' }));\n",
  "  [x0 + 40, (x0 + x1) / 2, x1 - 40].forEach(x => PA(md, `M${x} ${T1 + 88} L${x} -200`, null, { stroke: '#5A3A20', 'stroke-width': 14, 'stroke-linecap': 'round' }));\n"
  "  const sign = (x, t_) => { const s = G(md, { transform: `translate(${x},${T1 + 58}) rotate(-1.5)` }); R(s, -165, -22, 330, 44, '#FFFDF6', 6, { stroke: INK, 'stroke-width': 4 }); TX(s, 0, 10, t_, { 'font-family': 'Lilita One', 'font-size': 26, fill: '#C8463A' }); };\n"
  "  sign(-235, 'TULIS ALAMAT SINGKAT!'); sign(415, '1 AMPLOP = 1 ALAMAT');\n"
  "  const pp = x => G(md, { transform: `translate(${x},${T1 + 3})` }), so = { stroke: INK, 'stroke-width': 4 };\n"
  "  { const p = pp(-235); [0, 1, 2].forEach(k => R(p, -36 + k * 4, -14 - k * 13, 72, 14, ['#FFFDF6', '#F4E6C4', '#FFFDF6'][k], 3, so)); R(p, 10, -40, 14, 10, '#E85D4A', 2, { stroke: INK, 'stroke-width': 2 }); }\n"
  "  { const p = pp(-10); R(p, -40, -16, 80, 16, '#2A2A3A', 4, so); R(p, -32, -14, 64, 6, '#C8463A', 2); R(p, 14, -50, 14, 30, '#8A5A32', 4, so); CI(p, 21, -54, 10, '#8A5A32', so); }\n"
  "  { const p = pp(205); [[-12, '#C8463A', -14], [0, '#1F3B78', 0], [12, '#2E9B5A', 12]].forEach(([x, c_, r_]) => PA(p, `M${x} -40 L${x + r_ * .5} -82`, null, { stroke: c_, 'stroke-width': 7, 'stroke-linecap': 'round' })); R(p, -22, -50, 44, 50, '#2E9BD6', 6, so); }\n"
  "  { const p = pp(415); R(p, -40, -54, 80, 54, '#C9A26A', 5, so); PA(p, 'M0 -54 V0', null, { stroke: '#8A6A3A', 'stroke-width': 7 }); R(p, -30, -40, 22, 16, '#FFFFFF', 2, { stroke: INK, 'stroke-width': 2 }); }\n"
  "  { const p = pp(640); R(p, -15, -56, 30, 56, '#FFFFFF', 6, so); R(p, -8, -70, 16, 16, '#F2A03A', 4, so); TX(p, 0, -22, 'LEM', { 'font-family': 'Lilita One', 'font-size': 14, fill: '#C8463A' }); }\n"),
])

patch('src/scene_bangkok.js', [
 # waktu potongan reaksi penonton (dipakai koreografi & watermark)
 ("const MULTI = \"'Baloo 2'\";\n",
  "const MULTI = \"'Baloo 2'\";\n"
  "function cutTimes() { const w = (k, pre) => { const l = LN_[k], i = l.words.findIndex(x => x.w.toLowerCase().replace(/[^a-z]/g, '').startsWith(pre)); if (i < 0) throw new Error('cut ' + k + pre); return l.start + l.words[i].s; };\n"
  "  return { SG: [w('09', 'rattanakosin') + .35, w('09', 'ayuthaya') - .1], ID: [w('12', 'noppharat') - .05, LN_['12'].end - .35], QUEUE: [w('15', 'amon') - .05, w('15', 'witsanukam') - .1] }; }\n"),
 # kertas lebih lebar + tulisan lebih besar + masuk ambang pintu
 ("L${HOME.doorX - 20} -232`;", "L${HOME.doorX - 20} -232 L${HOME.doorX - 10} -330`;"),
 ("{ stroke: INK, 'stroke-width': 60, 'stroke-linecap': 'butt', 'stroke-linejoin': 'round' }", "{ stroke: INK, 'stroke-width': 84, 'stroke-linecap': 'butt', 'stroke-linejoin': 'round' }"),
 ("{ stroke: '#FFFDF6', 'stroke-width': 48, 'stroke-linejoin': 'round' }", "{ stroke: '#FFFDF6', 'stroke-width': 70, 'stroke-linejoin': 'round' }"),
 ("{ stroke: '#FFFFFF', 'stroke-width': 60, 'stroke-linejoin': 'round' }", "{ stroke: '#FFFFFF', 'stroke-width': 84, 'stroke-linejoin': 'round' }"),
 ("'font-size': 30, fill: '#1F3B78', dy: 10,", "'font-size': 44, fill: '#1F3B78', dy: 15,"),
 # jam: mulai 16.54, jarum detik, kertas di jendela mengikuti truk
 ("const CLK = { m: 55 }", "const CLK = { m: 54 }"),
 ("HOME.hourH.setAttribute('transform', `rotate(${(4 + CLK.m / 60) * 30})`);",
  "HOME.hourH.setAttribute('transform', `rotate(${(4 + CLK.m / 60) * 30})`); HOME.secH.setAttribute('transform', `rotate(${(Math.floor(t) + Math.min(1, (t % 1) / .08)) * 6})`);\n"
  "    { const ex = -212 + TRK.x, vd = `M-345 212 Q-270 212 ${ex - 10} 110 L${ex + 30} 70`, vo = SP.b > .88 && SP.a < .4 ? 1 : 0; HOME.vstrip.forEach(p => { p.setAttribute('d', vd); p.setAttribute('opacity', vo); }); }"),
 # amplop dipegang di depan perut (tidak menutupi wajah tetangga)
 ("tl.set(P, { o: 0, dx: 0, dy: 0, rot: 0 }, 0); tl.set(P, { o: 1 }, S_(k) - .05); arm(C[id], 1, { a: 70, len: 1.15 }, S_(k) - .05, .15, 'back.out(2)');",
  "tl.set(P, { o: 0, dx: 0, dy: 0, rot: 0, s: .8 }, 0); tl.set(P, { o: 1 }, S_(k) - .05); arm(C[id], 1, { a: 235, len: .75 }, S_(k) - .05, .15, 'back.out(2)');"),
 ("dx: SEAT.SG + 90 - (SEAT[id] + r * 1.6), dy: -40,", "dx: SEAT.SG + 90 - (SEAT[id] + r * .6), dy: -255 + r * .25,"),
 ("tl.set(thEnv, { o: 1, dx: 0, dy: 0, rot: 0, s: 1 }, WF('24', 'aja') - .1); arm(C.TH, 1, { a: 70, len: 1.15 },",
  "tl.set(thEnv, { o: 1, dx: 0, dy: 0, rot: 0, s: .8 }, WF('24', 'aja') - .1); arm(C.TH, 1, { a: 235, len: .75 },"),
 ("dx: SEAT.SG + 90 - (SEAT.TH + RAD.TH * 1.6), dy: -40,", "dx: SEAT.SG + 90 - (SEAT.TH + RAD.TH * .6), dy: -255 + RAD.TH * .25,"),
 ("    tl.to(SP, { a: 1, duration: .6, ease: 'power2.in' }, WF('24', 'aja'));   // kertas panjang ditarik keluar pintu\n", ""),
 # pembuka: close-up jam berdetak, kamera mundur saat Singapura berteriak
 ("  camTo(0, .01, { x: 0, z: .7, gs: 1480 }); camTo(c.open, S_('01') - .2 - c.open, SHOT.WIDE, 'sine.inOut');",
  "  const wallShot = (wx, wy, Z, Y = 860) => { const zf = 1 + (Z - 1) * .85; return { x: wx / .82, z: Z, gs: 960 + (Y - 960 - wy * zf) * Z / zf }; }, CLS = wallShot(150, -1250, 2.4);\n"
  "  const tLab = (t, txt) => { const g = G(HUD, { transform: 'translate(540,330)' }), i = G(g); TX(i, 0, 42, txt, { 'font-family': 'Lilita One', 'font-size': 120, fill: '#FFE14D', stroke: INK, 'stroke-width': 16, 'stroke-linejoin': 'round', 'paint-order': 'stroke' }); popIn(i, t, .4); tl.to(i, { opacity: 0, duration: .12 }, t + .5); };\n"
  "  const clockCut = (t0, m) => { camTo(t0, .01, CLS, 'none'); camTo(t0 + .02, .8, wallShot(150, -1250, 2.6), 'none'); tick(m, t0 + .3); tLab(t0 + .3, m < 60 ? '16.' + m : '17.00'); };\n"
  "  const cutaway = (a, b, shot) => { camTo(a, .01, SHOT[shot], 'none'); camTo(b, .01, SHOT.TH, 'none'); };\n"
  "  camTo(0, .01, CLS, 'none'); camTo(.02, c.open - .02, wallShot(150, -1250, 2.6), 'none'); tick(55, .5); tLab(.5, '16.55'); camTo(c.open, .45, SHOT.WIDE, 'power3.inOut');\n"
  "  [[c.clk56, 56], [c.clk57, 57], [c.clk58, 58], [c.clk59, 59], [c.clk60, 60]].forEach(([t, m]) => clockCut(t, m));\n"
  "  LINES.filter(l => l.who === 'SG').forEach(l => { tl.to(C.SG, { sc: 1.07, duration: .2, ease: 'power2.out' }, l.start - .1); tl.to(C.SG, { sc: 1, duration: .3 }, l.end + .05); });   // Singapura mencondongkan badan ke lubang loket\n"
  "  // reaksi penonton saat Thailand menulis panjang\n"
  "  { const T_ = cutTimes();\n"
  "    { const [a, b] = T_.SG; cutaway(a, b, 'SG'); expr(C.SG, 'closed', a, .1); arm(C.SG, 0, { a: 118, len: .95 }, a, .15); tl.to(C.SG.arm[0], { a: 140, duration: .16, yoyo: true, repeat: 5, ease: 'sine.inOut' }, a + .15); arm(C.SG, 0, REST, b, .15); expr(C.SG, 'angry', b, .1); }\n"
  "    { const [a, b] = T_.ID; cutaway(a, b, 'ID'); expr(C.ID, 'sleepy', a, .2); arm(C.ID, 2, { a: 75, len: 1.15 }, a + .1, .35, 'sine.out'); tl.to(C.ID, { sy: 1.12, sx: .93, duration: .45, ease: 'sine.out' }, a + .1);\n"
  "      tl.to(C.ID, { sy: 1, sx: 1, duration: .3 }, b - .3); arm(C.ID, 2, REST, b - .3, .25); qmark(SEAT.ID, -560, a + .3, b - a - .4, 'HOAAAM', .5); expr(C.ID, 'open', b, .1); }\n"
  "    { const [a, b] = T_.QUEUE; cutaway(a, b, 'QUEUE'); look(C.VN, -.8, -1, a, .2); expr(C.VN, 'scared', a + .1, .1); look(C.VN, -.7, -.1, b, .2);\n"
  "      arm(C.MY, 0, { a: -10, len: .85 }, a, .12); tl.to(C.MY.arm[0], { a: -30, duration: .1, yoyo: true, repeat: 13, ease: 'power1.in' }, a + .12); arm(C.MY, 0, REST, b, .15); expr(C.MY, 'angry', a, .1);\n"
  "      expr(C.PH, 'scared', a + .15, .1); floaters('M0 -16 Q11 0 0 10 Q-11 0 0 -16Z', '#7FC8FF', SEAT.PH + 90, BASE - 190, a + .3, 4, 90, 1, .9); expr(C.ID, 'sleepy', a, .15);\n"
  "      ['VN', 'MY', 'PH', 'ID'].forEach(id => expr(C[id], 'open', b, .1)); } }"),
 # ticks lama dipindah ke potongan jam
 ("  tick(56, S_('06'));\n", ""),
 ("  tick(57, S_('12'));\n", ""),
 (" tick(58, t + .2); }", " }"),
 ("tick(59, td); ", ""),
 (" tick(60, t); tl.to(TRK,", " tl.to(TRK,"),
 # truk berangkat menyeret kertas, Thailand ikut terseret
 ("  tl.to(HOME.door, { scaleX: 1, duration: .3, ease: 'power2.in' }, c.leave + .3);\n",
  "  { const L = c.leave; camTo(L + .6, .01, SHOT.WIDE, 'none'); tl.to(SP, { a: 1, duration: .55, ease: 'power2.in' }, L + .6);\n"
  "    tl.to(C.TH, { x: SEAT.TH + 90, rot: 24, duration: .14, ease: 'power3.out' }, L + .62); expr(C.TH, 'shock', L + .6, .06); arm(C.TH, 1, { a: 10, len: 1.3 }, L + .6, .1); arm(C.TH, 0, { a: 130, len: 1.1 }, L + .6, .1);\n"
  "    tl.to(C.TH, { x: SEAT.TH, rot: 0, duration: .6, ease: 'elastic.out(1,.4)' }, L + 1.05); arm(C.TH, 2, REST, L + 1.1, .25);\n"
  "    ['ID', 'PH', 'VN', 'MY', 'SG'].forEach((id, k) => expr(C[id], 'shock', L + .65 + k * .04, .06)); pow(SEAT.TH + 230, -640, L + .66, 'SRETT!', '#FFE14D', .75); }\n"
  "  tl.to(HOME.door, { scaleX: 1, duration: .3, ease: 'power2.in' }, c.leave + 1.3);\n"),
 # watermark: pembuka jam + jendela potongan jam / reaksi
 ("const L = [[0, 760, 1200, 'd'], [c.open, 300, B, 'd']]", "const L = [[0, 540, 205, 'd'], [c.open, 300, B, 'd']]"),
 ("  [[c.record - .05, E('18') + .25], [WFw('20', 'kota') - .1, E('20') + .2], [WFw('22', 'ada') - .05, E('22') + .25]].forEach(([a, b]) => {",
  "  const CT = cutTimes(); [[c.record - .05, E('18') + .25], [WFw('20', 'kota') - .1, E('20') + .2], [WFw('22', 'ada') - .05, E('22') + .25],\n"
  "   ...['clk56', 'clk57', 'clk58', 'clk59', 'clk60'].map(k => [c[k], c[k] + .8]), [...CT.SG, 780, U], [...CT.ID, 300, B], [...CT.QUEUE, 780, B]].sort((p, q) => p[0] - q[0]).forEach(([a, b, x = 540, y = 205]) => {"),
 ("    L.push([a, 540, 205, 'd'], [b + .2, prev[1], prev[2], prev[3]]); });", "    L.push([a, x, y, 'd'], [b + .2, prev[1], prev[2], prev[3]]); });"),
])
print('ok')
