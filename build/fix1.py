P = 'C:/Users/User/Documents/tes-bals/bangkok/src/'
def patch(fn, reps):
    s = open(P + fn, encoding='utf-8').read()
    for a, b in reps:
        n = s.count(a)
        if n != 1: raise SystemExit(f'{fn}: {n}x {a[:90]}')
        s = s.replace(a, b)
    open(P + fn, 'w', encoding='utf-8').write(s)
patch('room_bangkok.js', [
 # rak amplop dihapus (menutupi wajah Filipina di close-up)
 ("  const ra = G(md, { transform: `translate(${(SEAT.PH + SEAT.VN) / 2},${T1})` }); R(ra, -60, -36, 120, 36, '#5A3A20', 4, { stroke: INK, 'stroke-width': 4 }); [-36, 0, 36].forEach(x => R(ra, x - 14, -60, 28, 30, '#FFFFFF', 3, { stroke: INK, 'stroke-width': 3 }));   // rak amplop\n", ""),
 # pintu terbuka: tampak jalan di luar
 ("HOME.out = R(dg, -205, -855, 410, 855, '#F6D9A8', 0);", "HOME.out = R(dg, -205, -855, 410, 855, '#BFE3F5', 0); R(dg, -205, -200, 410, 200, '#9AA0A8', 0); R(dg, -205, -212, 410, 14, '#D6D9DE', 0);"),
 ("PA(p, 'M-170 -210 ' + Array.from({ length: 12 }, (_, i) => `h28 a6 6 0 0 1 0 0`).join(' '), null, {}); ", ""),
])
patch('scene_bangkok.js', [
 ("QUEUE: { x: 225, z: 1.0, gs: 1540 }", "QUEUE: { x: 225, z: 1.25, gs: 1620 }"),
 ("WINDOW: { x: 1250, z: 1.15, gs: 1500 }", "WINDOW: { x: 1850, z: 1.15, gs: 2000 }"),
 ("const BEATS = [['01', 'SG', 'angry'],", "const BEATS = [['01', 'WIDE', 'angry'],"),
 ("pow(HOME.winX * .82 - 120, -1250, t, 'TIIN!', '#FFE14D', .55, WALL.g, 50, .8);", "pow(HOME.winX - 120, -1310, t, 'TIIN!', '#FFE14D', .7, WALL.g, 54, .8);"),
 ("TX(ii, 0, -700, 'ARTINYA?', {", "TX(ii, 0, -600, 'ARTINYA?', {"),
 ("translate(0,${-420 + k * 330})", "translate(0,${-330 + k * 320})"),
 # angka di kartu akhir: di ujung batang
 ("const fill = tx.querySelector('.fill'), num = tx.querySelector('.num'), wpx = id === 'TH' ? 1400 : n * 34;",
  "const fill = tx.querySelector('.fill'), num = tx.querySelector('.num'), wpx = id === 'TH' ? 1400 : n * 34; if (id === 'TH') { num.style.left = '360px'; num.style.color = '#FFFFFF'; num.style.fontSize = '54px'; num.style.top = '-10px'; num.textContent = '168!'; } else num.style.left = (wpx + 8) + 'px';"),
])
print('ok')
