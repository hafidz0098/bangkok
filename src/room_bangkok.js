/* ---- KANTOR POS SORE HARI: dinding krem-oranye + lis merah, papan "KANTOR POS", jam dinding besar (16.55 → 17.00), papan "TRUK POS TERAKHIR 17.00", rak paket di balik loket,
   poster prangko, jendela jalan dengan truk pos merah (WALL); lantai ubin, loket kaca + meja petugas, meja tulis panjang + rak amplop, pintu kaca kanan, kotak pos merah (MAIN);
   kardus buram dekat lensa (FG); sinar matahari sore (LIGHT) ---- */
const CAST = ['MY', 'VN', 'PH', 'ID', 'TH', 'SG'];   // urutan dibuat = urutan lapisan
const SEAT = { SG: -640, TH: -350, ID: -120, PH: 100, VN: 310, MY: 520 };
const HOME = { doorX: 880, winX: 1520 };
grad('wallP', [[0, '#FBEBD0'], [.7, '#F6DDB4'], [1, '#EFCE9C']]);
grad('wood', [[0, '#A8703E'], [1, '#6E4424']]);
grad('woodL', [[0, '#C98E55'], [1, '#93602F']], 1, 0);
grad('skyS', [[0, '#8FC9F0'], [.6, '#F6D9A8'], [1, '#F2B27A']]);
grad('glass', [[0, '#DDF1FA', .55], [1, '#B8DDEE', .35]], 1, 1);
grad('sunO', [[0, '#FFE2A8', .9], [1, '#FFB45A', 0]]);
{ const g = WALL.g, o = { stroke: INK, 'stroke-width': 7, 'stroke-linejoin': 'round' };
  R(g, -3800, -3400, 8400, 3500, 'url(#wallP)');
  R(g, -3800, -560, 8400, 560, '#C8463A', 0); R(g, -3800, -582, 8400, 34, 'url(#woodL)', 0, o);   // lambris merah pos
  for (let x = -3600; x < 4400; x += 240) R(g, x, -520, 190, 440, '#D65A4C', 10, { stroke: '#A8382E', 'stroke-width': 5 });
  R(g, -3800, -1720, 8400, 40, '#C8463A', 0); R(g, -3800, -1680, 8400, 14, '#FFFFFF', 0, { opacity: .8 });   // lis atas
  // papan nama "KANTOR POS" di atas loket
  const sg = G(g, { transform: 'translate(-520,-1500)' }); R(sg, -420, -110, 840, 220, '#C8463A', 18, o); R(sg, -395, -85, 790, 170, 'none', 12, { stroke: '#FFFFFF', 'stroke-width': 6 });
  const env = G(sg, { transform: 'translate(-300,0)' }); R(env, -70, -48, 140, 96, '#FFFFFF', 8, { stroke: INK, 'stroke-width': 5 }); PA(env, 'M-70 -48 L0 8 L70 -48', null, { stroke: INK, 'stroke-width': 5 });
  TX(sg, 60, 36, 'KANTOR POS', { 'font-family': 'Lilita One', 'font-size': 104, fill: '#FFFFFF', stroke: INK, 'stroke-width': 9, 'paint-order': 'stroke' });
  // rak paket di balik loket
  const rk = G(g, { transform: 'translate(-1250,-600)' }); [0, 1, 2].forEach(k => R(rk, -330, -260 - k * 260, 660, 22, 'url(#woodL)', 4, o));
  const rr = rng(8); for (let k = 0; k < 3; k++) for (let i = 0; i < 4; i++) { const w = 90 + rr() * 60, h = 70 + rr() * 80, x = -300 + i * 160; R(rk, x, -260 - k * 260 - h, w, h, ['#C9A26A', '#E3C08A', '#B88A52'][(i + k) % 3], 6, { stroke: INK, 'stroke-width': 5 }); PA(rk, `M${x + w / 2} ${-260 - k * 260 - h} V${-260 - k * 260}`, null, { stroke: '#8A6A3A', 'stroke-width': 6 }); }
  // jam dinding besar + papan jadwal truk
  const ck = G(g, { transform: 'translate(150,-1250)' }); HOME.clock = ck; CI(ck, 0, 0, 190, '#FFFFFF', { stroke: INK, 'stroke-width': 10 }); CI(ck, 0, 0, 190, 'none', { stroke: '#C8463A', 'stroke-width': 22 });
  for (let k = 0; k < 60; k++) { const a = k / 60 * Math.PI * 2, r0 = k % 5 ? 160 : 145; PA(ck, `M${Math.sin(a) * r0} ${-Math.cos(a) * r0} L${Math.sin(a) * 170} ${-Math.cos(a) * 170}`, null, { stroke: INK, 'stroke-width': k % 5 ? 3 : 8 }); }
  [12, 3, 6, 9].forEach(n => { const a = n / 12 * Math.PI * 2; TX(ck, Math.sin(a) * 118, -Math.cos(a) * 118 + 18, String(n), { 'font-family': 'Lilita One', 'font-size': 52, fill: INK }); });
  HOME.hourH = PA(ck, 'M0 0 V-90', null, { stroke: INK, 'stroke-width': 16, 'stroke-linecap': 'round' }); HOME.minH = PA(ck, 'M0 0 V-140', null, { stroke: '#C8463A', 'stroke-width': 10, 'stroke-linecap': 'round' }); HOME.secH = PA(ck, 'M0 30 V-160', null, { stroke: '#E8A33A', 'stroke-width': 4, 'stroke-linecap': 'round' }); CI(ck, 0, 0, 16, INK);
  const bd = G(g, { transform: 'translate(150,-930)' }); R(bd, -250, -70, 500, 140, '#24343C', 14, o); TX(bd, 0, -14, 'TRUK POS TERAKHIR', { 'font-family': 'Lilita One', 'font-size': 40, fill: '#FFE14D' });
  HOME.sched = TX(bd, 0, 46, '17.00', { 'font-family': 'Lilita One', 'font-size': 52, fill: '#FFFFFF' });
  // poster prangko
  [[-1900, '#4FB0E0', 'KIRIM SURAT'], [620, '#7CC46A', 'SALAM DARI ASEAN']].forEach(([x, c_, t_], k) => { const p = G(g, { transform: `translate(${x},-1150) rotate(${k ? 3 : -3})` });
    R(p, -170, -210, 340, 420, '#FFFFFF', 4, o); R(p, -140, -180, 280, 300, c_, 4, { stroke: INK, 'stroke-width': 4 });
    CI(p, 0, -40, 80, '#FFE14D', { stroke: INK, 'stroke-width': 5 }); TX(p, 0, 175, t_, { 'font-family': 'Lilita One', 'font-size': t_.length > 12 ? 30 : 38, fill: INK });
    for (let i = 0; i < 10; i++) { CI(p, -170 + i * 37.7, -210, 9, '#F6DDB4'); CI(p, -170 + i * 37.7, 210, 9, '#F6DDB4'); } });
  // jendela jalan + truk pos (bisa jalan)
  const wn = G(g, { transform: `translate(${HOME.winX},-1050)` }), wc = uid('win'); R(N('clipPath', { id: wc }, defs), -330, -330, 660, 560, '#000');
  const view = G(wn, { 'clip-path': `url(#${wc})` }); R(view, -340, -340, 680, 580, 'url(#skyS)'); R(view, -340, 120, 680, 120, '#8A8F98'); R(view, -340, 110, 680, 14, '#C9CDD2');
  [[-250, 40], [-60, -10], [180, 20]].forEach(([x, y]) => { R(view, x - 60, y - 190, 120, 300, '#E9B88A', 4, { stroke: '#B8865A', 'stroke-width': 4 }); for (let j = 0; j < 3; j++) R(view, x - 40, y - 170 + j * 80, 80, 50, '#FFF2C8', 3); });
  HOME.vstrip = [PA(view, '', null, { stroke: INK, 'stroke-width': 40, 'stroke-linejoin': 'round' }), PA(view, '', null, { stroke: '#FFFDF6', 'stroke-width': 30, 'stroke-linejoin': 'round' }), PA(view, '', null, { stroke: '#1F3B78', 'stroke-width': 5, 'stroke-dasharray': '18 10' })];
  HOME.truck = G(view, { transform: 'translate(40,150)' }); const tk = HOME.truck;
  R(tk, -250, -170, 330, 180, '#D63A2E', 14, o); R(tk, 80, -120, 130, 130, '#D63A2E', 14, o); R(tk, 105, -105, 85, 55, '#BFE3F5', 6, { stroke: INK, 'stroke-width': 5 });
  TX(tk, -85, -60, 'POS', { 'font-family': 'Lilita One', 'font-size': 84, fill: '#FFFFFF', stroke: INK, 'stroke-width': 7, 'paint-order': 'stroke' }); R(tk, -230, -30, 290, 14, '#FFFFFF');
  [-170, 130].forEach(x => { CI(tk, x, 12, 40, '#2A2A2A', o); CI(tk, x, 12, 16, '#C9CDD2'); });
  HOME.puffs = [0, 1, 2].map(k => CI(view, -310, 140, 18, '#E6E6E6', { opacity: 0, stroke: '#9A9A9A', 'stroke-width': 3 }));
  R(wn, -330, -330, 660, 560, 'none', 8, { stroke: '#F4F0E6', 'stroke-width': 24 }); R(wn, -330, -330, 660, 560, 'none', 8, o); PA(wn, 'M0 -330 V230', null, { stroke: '#F4F0E6', 'stroke-width': 16 });
  R(wn, -370, 230, 740, 34, 'url(#woodL)', 6, o);
}
/* ---- MAIN: lantai, pintu kaca kanan, kotak pos ---- */
MAIN.back = G(MAIN.g);
{ const g = MAIN.back, o = { stroke: INK, 'stroke-width': 7, 'stroke-linejoin': 'round' };
  R(g, -3800, -300, 8400, 2700, '#D9CBB0');
  const ys = [-300, -255, -195, -115, -5, 140, 330, 590, 940, 1400], xs = []; for (let x = -3800; x <= 4600; x += 240) xs.push(x);
  const X = (x, y) => x * (1 + .6 * (y + 300) / 1700);
  for (let j = 0; j < ys.length - 1; j++) for (let i = 0; i < xs.length - 1; i++) { const y0 = ys[j], y1 = ys[j + 1], a = xs[i], b = xs[i + 1];
    PA(g, `M${X(a, y0)} ${y0} L${X(b, y0)} ${y0} L${X(b, y1)} ${y1} L${X(a, y1)} ${y1}Z`, (i + j) % 2 ? '#E6D9BE' : '#CDBB98', { stroke: '#B5A07A', 'stroke-width': 3 }); }
  EL(g, 700, 30, 2000, 240, '#FFE2A8', { opacity: .2, filter: 'url(#soft)' });
  // pintu kaca (tempat kertas Thailand keluar)
  const dg = G(g, { transform: `translate(${HOME.doorX},-230)` }); HOME.dg = dg; R(dg, -230, -880, 460, 880, '#5A3A20', 6, o); HOME.out = R(dg, -205, -855, 410, 855, '#BFE3F5', 0); R(dg, -205, -200, 410, 200, '#9AA0A8', 0); R(dg, -205, -212, 410, 14, '#D6D9DE', 0);
  HOME.door = G(dg, { transform: 'translate(-205,0)' }); R(HOME.door, 0, -855, 410, 855, 'url(#glass)', 4, o); R(HOME.door, 30, -460, 350, 40, '#C9CDD2', 6, { stroke: INK, 'stroke-width': 5 });
  TX(HOME.door, 205, -620, 'BUKA', { 'font-family': 'Lilita One', 'font-size': 64, fill: '#2E9B5A', stroke: '#FFFFFF', 'stroke-width': 6, 'paint-order': 'stroke' });
  // kotak pos merah di samping pintu
  const mb = G(g, { transform: `translate(${HOME.doorX - 380},-210)` }); R(mb, -70, -300, 140, 300, '#D63A2E', 16, o); PA(mb, 'M-70 -260 Q0 -340 70 -260', '#D63A2E', o); R(mb, -46, -230, 92, 16, INK, 6);
  TX(mb, 0, -140, 'POS', { 'font-family': 'Lilita One', 'font-size': 46, fill: '#FFFFFF' }); R(mb, -60, -10, 120, 14, '#8A2018', 4);
  // panggung kecil petugas (Singapura berdiri sedikit lebih tinggi di balik loket)
  R(g, SEAT.SG - 190, -250, 380, 40, '#8A5A32', 6, o);
}
MAIN.chars = G(MAIN.g); MAIN.table = G(MAIN.g); MAIN.dish = G(MAIN.g); MAIN.fx = G(MAIN.g);
/* loket kaca (depan Singapura) + meja tulis panjang (depan pelanggan) */
{ const g = MAIN.table, o = { stroke: INK, 'stroke-width': 7, 'stroke-linejoin': 'round' };
  const lk = G(g, { transform: `translate(${SEAT.SG},0)` }), T0 = -300;
  R(lk, -200, T0, 400, 30, 'url(#woodL)', 6, o); R(lk, -188, T0 + 30, 376, -205 - T0 - 30, '#C8463A', 4, o); R(lk, -150, T0 + 50, 300, 30, '#FFFFFF', 4, { stroke: INK, 'stroke-width': 4 });
  TX(lk, 0, T0 + 75, 'LOKET 1', { 'font-family': 'Lilita One', 'font-size': 26, fill: '#C8463A' });
  R(lk, -200, T0 - 330, 24, 330, '#8A8F98', 4, { stroke: INK, 'stroke-width': 4 }); R(lk, -200, T0 - 350, 400, 26, '#8A8F98', 4, { stroke: INK, 'stroke-width': 4 });   // rangka kaca loket (kaca tipis)
  PA(lk, `M-176 ${T0 - 324} H176 V${T0 - 74} H145 A145 145 0 0 0 -145 ${T0 - 74} H-176Z`, 'url(#glass)', { opacity: .3 }); PA(lk, `M-150 ${T0 - 300} L-90 ${T0 - 200}`, null, { stroke: '#FFFFFF', 'stroke-width': 8, opacity: .6 });
  const sc = G(lk, { transform: `translate(-140,${T0})` }); R(sc, -40, -16, 80, 16, '#8A8F98', 4, { stroke: INK, 'stroke-width': 4 }); R(sc, -30, -26, 60, 10, '#C9CDD2', 3, { stroke: INK, 'stroke-width': 3 });   // timbangan
  const md = G(g), x0 = SEAT.TH - 170, x1 = SEAT.MY + 190, T1 = -270; HOME.desk = { x0, x1, top: T1 };
  R(md, x0, T1, x1 - x0, 28, 'url(#woodL)', 6, o); R(md, x0 + 14, T1 + 28, x1 - x0 - 28, 60, 'url(#wood)', 4, o);
  [x0 + 40, (x0 + x1) / 2, x1 - 40].forEach(x => PA(md, `M${x} ${T1 + 88} L${x} -200`, null, { stroke: '#5A3A20', 'stroke-width': 14, 'stroke-linecap': 'round' }));
  const pp = x => G(md, { transform: `translate(${x},${T1 + 3})` }), so = { stroke: INK, 'stroke-width': 4 };
  { const p = pp(-235); [0, 1, 2].forEach(k => R(p, -36 + k * 4, -14 - k * 13, 72, 14, ['#FFFDF6', '#F4E6C4', '#FFFDF6'][k], 3, so)); R(p, 10, -40, 14, 10, '#E85D4A', 2, { stroke: INK, 'stroke-width': 2 }); }
  { const p = pp(-10); R(p, -40, -16, 80, 16, '#2A2A3A', 4, so); R(p, -32, -14, 64, 6, '#C8463A', 2); R(p, 14, -50, 14, 30, '#8A5A32', 4, so); CI(p, 21, -54, 10, '#8A5A32', so); }
  { const p = pp(205); [[-12, '#C8463A', -14], [0, '#1F3B78', 0], [12, '#2E9B5A', 12]].forEach(([x, c_, r_]) => PA(p, `M${x} -40 L${x + r_ * .5} -82`, null, { stroke: c_, 'stroke-width': 7, 'stroke-linecap': 'round' })); R(p, -22, -50, 44, 50, '#2E9BD6', 6, so); }
  { const p = pp(415); R(p, -40, -54, 80, 54, '#C9A26A', 5, so); PA(p, 'M0 -54 V0', null, { stroke: '#8A6A3A', 'stroke-width': 7 }); R(p, -30, -40, 22, 16, '#FFFFFF', 2, { stroke: INK, 'stroke-width': 2 }); }
  { const p = pp(640); R(p, -15, -56, 30, 56, '#FFFFFF', 6, so); R(p, -8, -70, 16, 16, '#F2A03A', 4, so); TX(p, 0, -22, 'LEM', { 'font-family': 'Lilita One', 'font-size': 14, fill: '#C8463A' }); }
}
/* ---- FG: kardus paket buram dekat lensa ---- */
{ const g = FG.g, o = { stroke: INK, 'stroke-width': 8, 'stroke-linejoin': 'round' };
  [[-1350, 260, 300, 220], [-1060, 330, 220, 170], [1250, 280, 320, 230], [1540, 340, 240, 180]].forEach(([x, y, w, h]) => { R(g, x - w / 2, y - h, w, h, '#C9A26A', 8, o); PA(g, `M${x} ${y - h} V${y}`, null, { stroke: '#8A6A3A', 'stroke-width': 10 }); R(g, x - w * .3, y - h * .7, w * .6, h * .25, '#FFFFFF', 4, { stroke: INK, 'stroke-width': 4 }); });
  const rb = rng(23); for (let i = 0; i < 10; i++) CI(g, (i % 2 ? -1 : 1) * (2300 + rb() * 700), -1500 - rb() * 400, 60 + rb() * 60, ['#FFD970', '#FF9A6A'][i % 2], { opacity: .3 }); }
/* ---- LIGHT: sinar matahari sore dari jendela ---- */
HOME.sun = G(LIGHT.g, { opacity: .9 }); PA(HOME.sun, `M${HOME.winX - 330} -1380 L${HOME.winX + 330} -1380 L${HOME.winX - 900} -120 L${HOME.winX - 1900} -120Z`, '#FFD9A0', { opacity: .14 });
HOME.motes = []; { const rm = rng(31); for (let i = 0; i < 24; i++) HOME.motes.push({ x: -300 + rm() * 2200, y: -1400 + rm() * 1100, ph: rm() * 6, el: CI(HOME.sun, 0, 0, 4 + rm() * 5, '#FFF6DE', { opacity: .6 }) }); }
