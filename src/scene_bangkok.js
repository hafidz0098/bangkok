/* ================= KARAKTER & PROPERTI ================= */
const RAD = { SG: 100, TH: 104, ID: 112, PH: 100, VN: 100, MY: 102 };
const RATIO = { SG: 2 / 3, TH: 2 / 3, ID: 2 / 3, PH: 1 / 2, VN: 2 / 3, MY: 1 / 2 };   // tinggi / lebar
const FULL = 'Krung Thep Mahanakhon Amon Rattanakosin Mahinthara Ayuthaya Mahadilok Phop Noppharat Ratchathani Burirom Udomratchaniwet Mahasathan Amon Piman Awatan Sathit Sakkathattiya Witsanukam Prasit';
let renderWorld = () => {}; let TL_T = 0;
function ballHead(p, id, x, y, s, dir = 0, defsHost = defs) { const b = G(p, { transform: `translate(${x},${y}) scale(${s})` }), cid = uid('hd'), bd = blobD(82, 0, 0, 82); PA(N('clipPath', { id: cid }, defsHost), bd); const fi = G(b, { 'clip-path': `url(#${cid})` }); flag(id, fi, -100, -82, 200, 164); PA(fi, blobShade(82, 82), '#000', { opacity: .13, 'fill-rule': 'evenodd' }); PA(b, bd, null, { stroke: INK, 'stroke-width': 8, 'stroke-linejoin': 'round' }); [-1, 1].forEach(sg => { EL(b, sg * 30, -14, 20, 23, '#FFFFFF', { stroke: INK, 'stroke-width': 5 }); CI(b, sg * 30 + dir * 6, -18, 7, INK); }); return b; }
function flatFlag(p, id, x, y, h, dh) { const w = h / RATIO[id], g = G(p, { transform: `translate(${x},${y})` }), cid = uid('ff'); R(N('clipPath', { id: cid }, dh), -w / 2, -h / 2, w, h, '#000'); flag(id, G(g, { 'clip-path': `url(#${cid})` }), -w / 2, -h / 2, w, h); R(g, -w / 2, -h / 2, w, h, 'none', 0, { stroke: INK, 'stroke-width': Math.max(3, h * .03) }); return g; }
/* aksesoris (r = jari-jari, oy = alas; puncak bola di oy - 2r) */
const ACC = {
  ID: (a, r, oy = 0) => { PA(a, `M${-r * .66} ${oy - r * 1.84} L${-r * .56} ${oy - r * 2.26} Q0 ${oy - r * 2.38} ${r * .56} ${oy - r * 2.26} L${r * .66} ${oy - r * 1.84} Q0 ${oy - r * 1.74} ${-r * .66} ${oy - r * 1.84}Z`, '#1C1C1C', { stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' });
    PA(a, `M${-r * .5} ${oy - r * 2.18} Q0 ${oy - r * 2.28} ${r * .5} ${oy - r * 2.18}`, null, { stroke: '#4A4A4A', 'stroke-width': 5 }); },
  MY: (a, r, oy = 0) => PA(a, `M${-r * .62} ${oy - r * 1.7} L${-r * .56} ${oy - r * 2.2} Q0 ${oy - r * 2.3} ${r * .56} ${oy - r * 2.2} L${r * .62} ${oy - r * 1.7} Q0 ${oy - r * 1.6} ${-r * .62} ${oy - r * 1.7}Z`, '#1C1C24', { stroke: INK, 'stroke-width': 4 }),
  PH: (a, r, oy = 0) => { PA(a, `M${-r * 1.3} ${oy - r * 1.78} Q0 ${oy - r * 1.9} ${r * 1.3} ${oy - r * 1.78} L0 ${oy - r * 2.5}Z`, '#D9A55A', { stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' });
    for (let k = -3; k <= 3; k++) PA(a, `M0 ${oy - r * 2.48} L${k * r * .36} ${oy - r * 1.84}`, null, { stroke: '#A8783A', 'stroke-width': 3 }); },
  VN: (a, r, oy = 0) => { PA(a, `M${-r * 1.25} ${oy - r * 1.66} L0 ${oy - r * 2.55} L${r * 1.25} ${oy - r * 1.66} Q0 ${oy - r * 1.5} ${-r * 1.25} ${oy - r * 1.66}Z`, '#F2D58A', { stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' });
    [-.6, -.2, .2, .6].forEach(k => PA(a, `M${r * k * 1.25} ${oy - r * 1.62} L0 ${oy - r * 2.5}`, null, { stroke: '#C9A55A', 'stroke-width': 2.5 })); },
  TH: (a, r, oy = 0) => { const f = G(a, { transform: `translate(${r * .72},${oy - r * 1.62}) rotate(18)` });   // anggrek ungu
    [0, 72, 144, 216, 288].forEach(an => { const c = Math.cos(an * Math.PI / 180) * r * .2, s = Math.sin(an * Math.PI / 180) * r * .2; EL(f, c, s, r * .2, r * .13, an === 72 ? '#F5D6F0' : '#C25BB8', { stroke: INK, 'stroke-width': 3, transform: `rotate(${an} ${c} ${s})` }); });
    CI(f, 0, 0, r * .09, '#FFE07A', { stroke: INK, 'stroke-width': 2.5 }); },
  SG: (a, r, oy = 0) => { const y = oy - r * 1.95; PA(a, `M${-r * .42} ${y + r * .12} Q${-r * .44} ${y - r * .32} 0 ${y - r * .34} Q${r * .44} ${y - r * .32} ${r * .42} ${y + r * .12}Z`, '#1F3B78', { stroke: INK, 'stroke-width': 4 });   // topi petugas pos
    PA(a, `M${-r * .4} ${y + r * .12} Q${r * .2} ${y + r * .26} ${r * .62} ${y + r * .14}`, null, { stroke: '#101C3C', 'stroke-width': r * .1, 'stroke-linecap': 'round' }); CI(a, 0, y - r * .12, r * .08, '#E8C468', { stroke: INK, 'stroke-width': 3 }); },
};
function glasses(g, ex, ey, er) { [-1, 1].forEach(s => R(g, s * ex - er * 1.25, ey - er, er * 2.5, er * 2, 'none', er * .5, { stroke: '#2A2A3A', 'stroke-width': Math.max(4, er * .18) })); PA(g, `M${-ex + er * 1.25} ${ey} L${ex - er * 1.25} ${ey}`, null, { stroke: '#2A2A3A', 'stroke-width': Math.max(4, er * .18) }); }
const MULTI = "'Baloo 2'";
function cutTimes() { const w = (k, pre) => { const l = LN_[k], i = l.words.findIndex(x => x.w.toLowerCase().replace(/[^a-z]/g, '').startsWith(pre)); if (i < 0) throw new Error('cut ' + k + pre); return l.start + l.words[i].s; };
  return { SG: [w('09', 'rattanakosin') + .35, w('09', 'ayuthaya') - .1], ID: [w('12', 'noppharat') - .05, LN_['12'].end - .35], QUEUE: [w('15', 'amon') - .05, w('15', 'witsanukam') - .1] }; }

function build() {
  CAST.forEach(id => makeChar(id, SEAT[id], RAD[id], { face: 0 }).y0 = 0); CHARS.SG.y0 = -40;   // y0 wajib angka (bila undefined GSAP menganimasikannya sebagai string)
  const C = CHARS, c = CUE, S_ = k => LN_[k].start, E_ = k => LN_[k].end,
    WF = (k, pre, n = 0) => { const L_ = LN_[k], p_ = pre.toLowerCase().replace(/[^a-z0-9]/g, ''), ix = L_.words.map((w, i) => [w.w.toLowerCase().replace(/[^a-z0-9]/g, ''), i]).filter(([w]) => w.startsWith(p_)).map(([, i]) => i); if (!ix.length) throw new Error('WF ' + k + ' ' + pre); return L_.start + L_.words[ix[Math.min(n, ix.length - 1)]].s; };
  const handAt = (c_, i) => { const A = c_.arm[i], r = c_.r, tri = c_.id === 'SG', sx0 = A.sgn * (tri ? r * .5 : r * 1.02), sy0 = tri ? -c_.H * .4 : -r * .86, ar = A.a * Math.PI / 180, L = A.len * r; let x = c_.x + sx0 + A.sgn * Math.cos(ar) * L, y = BASE + (c_.y0 || 0) + c_.y + sy0 - Math.sin(ar) * L;
    if (c_.rot) { const cx = c_.x, cy = BASE + (c_.y0 || 0) + c_.y - c_.H / 2, a = c_.rot * Math.PI / 180, dx = x - cx, dy = y - cy; x = cx + dx * Math.cos(a) - dy * Math.sin(a); y = cy + dx * Math.sin(a) + dy * Math.cos(a); } return [x, y]; };
  const prop = (id, side, draw) => { const P = { o: 0, rot: 0, dx: 0, dy: 0, s: 1 }, g = G(MAIN.fx); draw(g); live(() => { const [x, y] = handAt(C[id], side); g.setAttribute('transform', `translate(${x + P.dx},${y + P.dy}) rotate(${P.rot + C[id].rot}) scale(${P.s})`); g.setAttribute('opacity', P.o * C[id].vis); }); return P; };
  const pow = (x, y, t, txt, col = '#FFE14D', sc = 1, host = MAIN.fx, fs = 58, d = .7) => { const g = G(host, { transform: `translate(${x},${y})` }), i = G(g); PA(i, star(0, 0, 120, 74, 12, -90), col, { stroke: INK, 'stroke-width': 7, 'stroke-linejoin': 'round' });
    TX(i, 0, 22, txt, { 'font-family': 'Lilita One', 'font-size': fs, fill: '#FFFFFF', stroke: INK, 'stroke-width': 10, 'paint-order': 'stroke' }); i.style.opacity = 0;
    tl.fromTo(i, { scale: .2 * sc, opacity: 1, rotation: -15, svgOrigin: '0 0' }, { scale: sc, rotation: 6, duration: .14, ease: 'back.out(3)', immediateRender: false }, t); tl.to(i, { opacity: 0, scale: .6 * sc, duration: .2 }, t + d); };
  const popIn = (el, t, from = .3) => { el.style.opacity = 0; tl.fromTo(el, { opacity: 0, scale: from, svgOrigin: '0 0' }, { opacity: 1, scale: 1, duration: .22, ease: 'back.out(2.4)', immediateRender: false }, t); };
  const qmark = (x, y, t, d = .8, txt = '?', s = 1) => { const g = G(MAIN.fx, { transform: `translate(${x},${y})` }), i = G(g); TX(i, 0, 0, txt, { 'font-family': 'Lilita One', 'font-size': 110 * s, fill: '#FFFFFF', stroke: INK, 'stroke-width': 12, 'paint-order': 'stroke' }); popIn(i, t, .2); tl.to(i, { rotation: 10, duration: .15, yoyo: true, repeat: 3, svgOrigin: '0 0' }, t + .2); tl.to(i, { opacity: 0, duration: .15 }, t + d); };
  /* aksesoris */
  CAST.forEach(id => ACC[id](G(C[id].acc), RAD[id])); glasses(C.SG.eyesG, C.SG.ex + 6, 0, C.SG.ER * 1.2);
  /* amplop pelanggan (tangan kanan) + pulpen Thailand + cap pos Singapura */
  const envDraw = txt => g => { const e = G(g, { transform: 'rotate(-8)' }); R(e, -70, -46, 140, 92, '#FFFDF6', 6, { stroke: INK, 'stroke-width': 5 }); PA(e, 'M-70 -46 L0 4 L70 -46', null, { stroke: '#B8A888', 'stroke-width': 4 });
    R(e, 34, -38, 26, 30, '#E85D4A', 3, { stroke: INK, 'stroke-width': 3 }); const t_ = TX(e, -6, 30, txt, { 'font-family': BALOO, 'font-weight': 800, 'font-size': 22, fill: '#1F3B78' }); if (t_.getComputedTextLength() > 120) t_.setAttribute('font-size', 22 * 120 / t_.getComputedTextLength()); };
  const ENV = { ID: prop('ID', 1, envDraw('JAKARTA')), PH: prop('PH', 1, envDraw('MANILA')), VN: prop('VN', 1, envDraw('HÀ NỘI')), MY: prop('MY', 1, envDraw('KUALA LUMPUR')) };
  const thEnv = prop('TH', 1, envDraw('KRUNG THEP'));
  const pen = prop('TH', 0, g => { const p = G(g, { transform: 'rotate(150)' }); R(p, -6, -10, 12, 72, '#1F3B78', 5, { stroke: INK, 'stroke-width': 4 }); PA(p, 'M-6 62 L0 78 L6 62Z', '#E8C468', { stroke: INK, 'stroke-width': 3 }); });
  const stamp = prop('SG', 1, g => { const s = G(g, { transform: 'rotate(180)' }); R(s, -10, -60, 20, 50, '#8A5A32', 6, { stroke: INK, 'stroke-width': 4 }); CI(s, 0, -66, 16, '#8A5A32', { stroke: INK, 'stroke-width': 4 }); R(s, -30, -12, 60, 22, '#C8463A', 4, { stroke: INK, 'stroke-width': 4 }); });
  tl.set([pen, stamp], { o: 1 }, 0); tl.set(thEnv, { o: 0 }, 0);
  /* kertas alamat Thailand yang memanjang sampai keluar pintu */
  const SP = { a: 0, b: 0 }, sd = `M${SEAT.TH + 40} -286 Q${SEAT.TH + 75} -268 ${SEAT.TH + 72} -215 L${SEAT.TH + 70} -60 Q${SEAT.TH + 72} 70 ${SEAT.TH + 200} 70 L${HOME.doorX - 160} 70 Q${HOME.doorX - 40} 70 ${HOME.doorX - 30} -60 L${HOME.doorX - 20} -232 L${HOME.doorX - 10} -330`;
  const strip = G(MAIN.table), spO = PA(strip, sd, null, { stroke: INK, 'stroke-width': 84, 'stroke-linecap': 'butt', 'stroke-linejoin': 'round' }), spI = PA(strip, sd, null, { stroke: '#FFFDF6', 'stroke-width': 70, 'stroke-linejoin': 'round' });
  const mid = uid('spm'), msk = N('mask', { id: mid, maskUnits: 'userSpaceOnUse', x: -3000, y: -3000, width: 6000, height: 6000 }, defs), spM = PA(msk, sd, null, { stroke: '#FFFFFF', 'stroke-width': 84, 'stroke-linejoin': 'round' });
  const pid = uid('spp'); PA(defs, sd, null, { id: pid }); const ttx = N('text', { 'font-family': BALOO, 'font-weight': 800, 'font-size': 44, fill: '#1F3B78', dy: 15, mask: `url(#${mid})` }, strip), tp = N('textPath', { href: `#${pid}`, startOffset: 14 }, ttx); tp.textContent = FULL + ' · ' + FULL;
  const SL = spI.getTotalLength();
  live(() => { const a = SP.a * SL, b = Math.max(a, SP.b * SL), da = `${b - a} ${SL * 3}`, off = -a; [spO, spI, spM].forEach(p => { p.setAttribute('stroke-dasharray', da); p.setAttribute('stroke-dashoffset', off); }); strip.setAttribute('opacity', SP.b > .001 ? 1 : 0); });
  /* jam dinding + truk */
  const CLK = { m: 54 }, TRK = { x: 0, sh: 0, puff: 0 };
  live(t => { HOME.minH.setAttribute('transform', `rotate(${CLK.m * 6})`); HOME.hourH.setAttribute('transform', `rotate(${(4 + CLK.m / 60) * 30})`); HOME.secH.setAttribute('transform', `rotate(${(Math.floor(t) + Math.min(1, (t % 1) / .08)) * 6})`);
    { const ex = -212 + TRK.x, vd = `M-345 212 Q-270 212 ${ex - 10} 110 L${ex + 30} 70`, vo = SP.b > .88 && SP.a < .4 ? 1 : 0; HOME.vstrip.forEach(p => { p.setAttribute('d', vd); p.setAttribute('opacity', vo); }); }
    HOME.truck.setAttribute('transform', `translate(${40 + TRK.x},${150 + Math.sin(t * 40) * TRK.sh})`);
    HOME.puffs.forEach((p, k) => { const u = ((t * .8 + k / 3) % 1); p.setAttribute('cx', -310 + TRK.x - u * 120); p.setAttribute('cy', 140 - u * 60); p.setAttribute('r', 14 + u * 30); p.setAttribute('opacity', TRK.puff * (1 - u) * .9); });
    HOME.motes.forEach(m => { m.el.setAttribute('cx', m.x + Math.sin(t * .4 + m.ph) * 60); m.el.setAttribute('cy', m.y + Math.sin(t * .3 + m.ph * 2) * 40); m.el.setAttribute('opacity', .3 + .4 * Math.sin(t * .8 + m.ph) ** 2); }); });
  const tick = (m, t) => tl.to(CLK, { m, duration: .18, ease: 'back.out(3)' }, t);
  /* HUD: pil + insert polaroid */
  const pill = (t, d, txt, y = 330, fs = 44, fl = null) => { const g = G(HUD, { transform: `translate(540,${y})` }), i = G(g); const tx = TX(i, 0, fs * .35, txt, { 'font-family': MULTI, 'font-weight': 800, 'font-size': fs, fill: '#FFF6C8' });
    let w = tx.getComputedTextLength() + 80 + (fl ? fs * 1.9 : 0); if (w > 1000) { tx.setAttribute('font-size', fs * (1000 - 80 - (fl ? fs * 1.9 : 0)) / tx.getComputedTextLength()); w = 1000; }
    if (fl) { tx.setAttribute('x', fs * .95); flatFlag(i, fl, -w / 2 + 40 + fs * .7, 0, fs * 1.0, HUD_DEFS); }
    i.insertBefore(R(i, -w / 2, -fs, w, fs * 2, '#8E2A22', fs, { stroke: '#FFE14D', 'stroke-width': 6 }), i.firstChild);
    i.style.opacity = 0; tl.fromTo(i, { scale: .3, opacity: 0, svgOrigin: '0 0' }, { scale: 1, opacity: 1, duration: .2, ease: 'back.out(2.4)', immediateRender: false }, t); tl.to(i, { opacity: 0, duration: .2 }, t + d); };
  const insert = (t0, t1, draw, cap = '') => { const g = G(HUD), sc = R(g, 0, 0, W, H, '#140A06', 0, { opacity: 0 }), pos = G(g, { transform: 'translate(540,835) scale(.92)' }), ii = G(pos);
    const cid = uid('pol'); R(N('clipPath', { id: cid }, HUD_DEFS), -445, -575, 890, 1000, '#000');
    R(ii, -470, -590, 960, 1290, '#000', 12, { opacity: .35, transform: 'translate(18,22)' }); R(ii, -480, -610, 960, 1290, '#FFFDF6', 12, { stroke: '#D8CFB8', 'stroke-width': 4 });
    draw(G(G(ii, { 'clip-path': `url(#${cid})` }), { transform: 'translate(0,-75) scale(.7)' }));
    R(ii, -445, -575, 890, 1000, 'none', 0, { stroke: '#D8CFB8', 'stroke-width': 4 });
    const ct_ = TX(ii, 0, 560, cap, { 'font-family': BALOO, 'font-weight': 800, 'font-size': 62, fill: '#1E2340', transform: 'rotate(-1.5)' }); if (ct_.getComputedTextLength() > 860) ct_.setAttribute('font-size', 62 * 860 / ct_.getComputedTextLength());
    [[-380, -600, -28], [380, -600, 28]].forEach(([x, y, r]) => R(ii, x - 90, y - 26, 180, 52, '#FFE9A0', 6, { opacity: .8, transform: `rotate(${r} ${x} ${y})` }));
    ii.style.opacity = 0;
    tl.fromTo(sc, { opacity: 0 }, { opacity: .55, duration: .25, immediateRender: false }, t0); tl.to(sc, { opacity: 0, duration: .15 }, t1);
    tl.fromTo(ii, { y: 380, rotation: -14, opacity: 0, svgOrigin: '0 0' }, { y: 0, rotation: -2.5, opacity: 1, duration: .35, ease: 'back.out(1.6)', immediateRender: false }, t0);
    tl.fromTo(ii, { scale: 1 }, { scale: 1.04, duration: t1 - t0 - .35, ease: 'none', immediateRender: false, svgOrigin: '0 0' }, t0 + .35);
    tl.to(ii, { opacity: 0, y: -60, duration: .18 }, t1); return ii; };
  const FSH = CAST.map(id => [C[id], EL(MAIN.back, 0, 0, 10, 10, '#5A4A32', { opacity: 0 })]);
  live(() => FSH.forEach(([c_, e]) => { const lift = Math.min(1, Math.max(0, -c_.y / 160)), k = 1 - lift * .5; e.setAttribute('cx', c_.x); e.setAttribute('cy', BASE - 4); e.setAttribute('rx', c_.r * 1.05 * k); e.setAttribute('ry', c_.r * .2 * k); e.setAttribute('opacity', .35 * c_.vis * k); }));

  /* ================= KOREOGRAFI (semua dari VO aktual) ================= */
  const cu = (id, z = 2.0) => ({ x: SEAT[id], z, gs: 1640 });
  const SHOT = {}; CAST.forEach(id => SHOT[id] = cu(id));
  Object.assign(SHOT, { SG: { x: SEAT.SG, z: 1.9, gs: 1700 }, WIDE: { x: -50, z: .8, gs: 1540 }, COUNTER: { x: (SEAT.SG + SEAT.TH) / 2, z: 1.4, gs: 1610 }, QUEUE: { x: 205, z: 1.25, gs: 1620 },
    DOOR: { x: HOME.doorX - 250, z: .95, gs: 1450 }, WINDOW: { x: 1850, z: 1.15, gs: 2000 } });
  const BEATS = [['01', 'WIDE', 'angry'], ['02', 'ID', 'smug'], ['03', 'PH', 'happy'], ['04', 'VN', 'smug'], ['05', 'MY', 'proud'], ['06', 'SG', 'open'], ['07', 'TH', 'closed'], ['08', 'COUNTER', 'angry'],
    ['09', 'TH', 'proud'], ['10', 'QUEUE', 'smug'], ['11', 'QUEUE', 'happy'], ['12', 'TH', 'dreamy'], ['13', 'SG', 'scared'], ['15', 'TH', 'closed'], ['16', 'PH', 'smug'], ['17', 'SG', 'open'],
    ['18', 'TH', 'proud'], ['19', 'ID', 'shock'], ['20', 'TH', 'dreamy'], ['21', 'ID', 'open'], ['22', 'TH', 'happy'], ['23', 'SG', 'smug'], ['24', 'TH', 'shock'], ['25', 'ID', 'happy']];
  CAST.forEach(id => { expr(C[id], 'open', 0, .01); faceTo(C[id], id === 'SG' ? .6 : -.6, 0, .01); });
  LINES.forEach(l => { if (!C[l.who]) return; CAST.forEach(id => { if (id === l.who) return; const d = Math.sign(SEAT[l.who] - SEAT[id]) * .7; faceTo(C[id], d, l.start - .1, .3); look(C[id], d, -.1, l.start - .1, .3); }); });
  BEATS.forEach(([k, shot, ex]) => { const who = LN_[k].who, s = S_(k), d_ = E_(k) - s - .25; camTo(s - .2, .24, SHOT[shot], 'power3.inOut'); expr(C[who], ex, s - .12);
    if (d_ > .5) tl.to(CAM, { z: SHOT[shot].z * 1.05, duration: d_, ease: 'none' }, s + .05); });
  // A. jam 16.55: semua buru-buru
  const wallShot = (wx, wy, Z, Y = 860) => { const zf = 1 + (Z - 1) * .85; return { x: wx / .82, z: Z, gs: 960 + (Y - 960 - wy * zf) * Z / zf }; }, CLS = wallShot(150, -1250, 2.4);
  const tLab = (t, txt) => { const g = G(HUD, { transform: 'translate(540,330)' }), i = G(g); TX(i, 0, 42, txt, { 'font-family': 'Lilita One', 'font-size': 120, fill: '#FFE14D', stroke: INK, 'stroke-width': 16, 'stroke-linejoin': 'round', 'paint-order': 'stroke' }); popIn(i, t, .4); tl.to(i, { opacity: 0, duration: .12 }, t + .5); };
  const clockCut = (t0, m) => { camTo(t0, .01, CLS, 'none'); camTo(t0 + .02, .8, wallShot(150, -1250, 2.6), 'none'); tick(m, t0 + .3); tLab(t0 + .3, m < 60 ? '16.' + m : '17.00'); };
  const cutaway = (a, b, shot) => { camTo(a, .01, SHOT[shot], 'none'); camTo(b, .01, SHOT.TH, 'none'); };
  camTo(0, .01, CLS, 'none'); camTo(.02, c.open - .02, wallShot(150, -1250, 2.6), 'none'); tick(55, .5); tLab(.5, '16.55'); camTo(c.open, .45, SHOT.WIDE, 'power3.inOut');
  [[c.clk56, 56], [c.clk57, 57], [c.clk58, 58], [c.clk59, 59], [c.clk60, 60]].forEach(([t, m]) => clockCut(t, m));
  LINES.filter(l => l.who === 'SG').forEach(l => { tl.to(C.SG, { sc: 1.07, duration: .2, ease: 'power2.out' }, l.start - .1); tl.to(C.SG, { sc: 1, duration: .3 }, l.end + .05); });   // Singapura mencondongkan badan ke lubang loket
  // reaksi penonton saat Thailand menulis panjang
  { const T_ = cutTimes();
    { const [a, b] = T_.SG; cutaway(a, b, 'SG'); expr(C.SG, 'sleepy', a, .15); arm(C.SG, 0, { a: 205, len: .62 }, a, .2); tl.to(C.SG, { rot: -5, duration: .3 }, a + .1); tl.to(C.SG, { rot: 0, duration: .2 }, b); arm(C.SG, 0, REST, b, .15); expr(C.SG, 'angry', b, .1); }
    { const [a, b] = T_.ID; cutaway(a, b, 'ID'); expr(C.ID, 'sleepy', a, .2); arm(C.ID, 2, { a: 75, len: 1.15 }, a + .1, .35, 'sine.out'); tl.to(C.ID, { sy: 1.12, sx: .93, duration: .45, ease: 'sine.out' }, a + .1);
      tl.to(C.ID, { sy: 1, sx: 1, duration: .3 }, b - .3); arm(C.ID, 2, REST, b - .3, .25); qmark(SEAT.ID, -560, a + .3, b - a - .4, 'HOAAAM', .5); expr(C.ID, 'open', b, .1); }
    { const [a, b] = T_.QUEUE; cutaway(a, b, 'QUEUE'); look(C.VN, -.8, -1, a, .2); expr(C.VN, 'scared', a + .1, .1); look(C.VN, -.7, -.1, b, .2);
      arm(C.MY, 0, { a: -10, len: .85 }, a, .12); tl.to(C.MY.arm[0], { a: -30, duration: .1, yoyo: true, repeat: 13, ease: 'power1.in' }, a + .12); arm(C.MY, 0, REST, b, .15); expr(C.MY, 'angry', a, .1);
      expr(C.PH, 'scared', a + .15, .1); floaters('M0 -16 Q11 0 0 10 Q-11 0 0 -16Z', '#7FC8FF', SEAT.PH + 90, BASE - 190, a + .3, 4, 90, 1, .9); expr(C.ID, 'sleepy', a, .15);
      ['VN', 'MY', 'PH', 'ID'].forEach(id => expr(C[id], 'open', b, .1)); } }
  { const t = S_('01'); arm(C.SG, 0, { a: 70, len: 1.2 }, t, .15, 'back.out(2)'); tl.to(C.SG.arm[0], { a: 100, duration: .14, yoyo: true, repeat: 3 }, t + .2); arm(C.SG, 0, REST, E_('01'), .2);
    ['TH', 'ID', 'PH', 'VN', 'MY'].forEach((id, k) => { expr(C[id], 'shock', WF('01', 'lima') + k * .05, .06); hop(C[id], WF('01', 'cepat') + k * .05, 24, .24); }); }
  // amplop kilat: diangkat saat baris, dilempar ke loket, dicap
  [['02', 'ID', c.st_id], ['03', 'PH', c.st_ph], ['04', 'VN', c.st_vn], ['05', 'MY', c.st_my]].forEach(([k, id, ts]) => { const P = ENV[id], r = RAD[id];
    tl.set(P, { o: 0, dx: 0, dy: 0, rot: 0, s: .8 }, 0); tl.set(P, { o: 1 }, S_(k) - .05); arm(C[id], 1, { a: 235, len: .75 }, S_(k) - .05, .15, 'back.out(2)');
    tl.to(P, { dx: SEAT.SG + 90 - (SEAT[id] + r * .6), dy: -255 + r * .25, rot: -340, duration: .32, ease: 'power2.in' }, ts - .3); tl.to(P, { o: 0, duration: .05 }, ts + .02); arm(C[id], 1, REST, ts, .2);
    tl.to(C.SG.arm[1], { a: 80, len: 1.0, duration: .1 }, ts - .2); tl.to(C.SG.arm[1], { a: -10, duration: .08, ease: 'power3.in' }, ts - .08); tl.to(C.SG.arm[1], { a: REST.a, len: REST.len, duration: .15 }, ts + .1); });
  pill(WF('04', 'Hà') - .05, E_('04') - WF('04', 'Hà') + .15, 'Hà Nội · 2 suku kata', 330, 44, 'VN');
  // B. Thailand menulis
  { const t = S_('07'); tl.set(pen, { o: 1 }, t); arm(C.TH, 0, { a: -30, len: .55 }, t - .1, .2); for (let k = 0; k < 10; k++) tl.to(C.TH.arm[0], { a: k % 2 ? -24 : -38, duration: .12 }, t + .2 + k * .14); look(C.TH, -.3, .8, t, .2);
    tl.to(SP, { b: .08, duration: E_('07') - c.write, ease: 'none' }, c.write); }
  { const t = S_('08'); tl.to(C.SG, { x: SEAT.SG + 15, rot: 6, duration: .2, ease: 'power2.out' }, t); arm(C.TH, 0, { a: -55, len: .5 }, t - .05, .15); tl.to(C.SG, { x: SEAT.SG, rot: 0, duration: .3 }, E_('08')); arm(C.SG, 1, { a: 20, len: 1.4 }, t, .15, 'back.out(2)'); arm(C.SG, 1, REST, E_('08'), .2); }
  { const t = S_('09'); look(C.TH, 1, 0, t, .15); expr(C.TH, 'smug', t, .1); look(C.TH, -.3, .8, WF('09', 'Amon') - .1, .2); expr(C.TH, 'closed', WF('09', 'Amon') - .1, .1);
    for (let k = 0; k < 18; k++) tl.to(C.TH.arm[0], { a: k % 2 ? -24 : -38, duration: .12 }, WF('09', 'Amon') + k * .14); tl.to(SP, { b: .25, duration: E_('09') - WF('09', 'Amon'), ease: 'none' }, WF('09', 'Amon')); }
  { const t = S_('10'); tl.to(C.ID, { rot: 10, x: SEAT.ID + 30, duration: .2 }, t); tl.to(C.ID, { rot: 0, x: SEAT.ID, duration: .25 }, E_('10')); arm(C.ID, 0, { a: 160, len: .7 }, t, .15); arm(C.ID, 0, REST, E_('10'), .2);
    expr(C.MY, 'happy', S_('11'), .1); tl.to(C.MY, { rot: -4, duration: .1, yoyo: true, repeat: 7 }, S_('11') + .1); expr(C.PH, 'happy', S_('11') + .2, .1); }
  tl.to(SP, { b: .32, duration: E_('11') - S_('10'), ease: 'none' }, S_('10'));   // Thailand terus menulis di luar layar
  { const t = S_('12'); for (let k = 0; k < 16; k++) tl.to(C.TH.arm[0], { a: k % 2 ? -24 : -38, duration: .12 }, t + k * .15); tl.to(SP, { b: .45, duration: E_('12') - t, ease: 'none' }, t); }
  { const t = S_('13'); hop(C.SG, t, 40, .3); arm(C.SG, 2, { a: 120, len: 1.1 }, t, .12); tl.to(C.SG.arm[0], { a: 150, duration: .1, yoyo: true, repeat: 5 }, t + .15); arm(C.SG, 2, REST, E_('13') + .1, .2);
    floaters('M0 -16 Q11 0 0 10 Q-11 0 0 -16Z', '#7FC8FF', SEAT.SG + 110, BASE - 300, t + .2, 3, 100, 1, .8); }
  { const t = c.big; camTo(t - .1, .35, SHOT.WIDE, 'power2.inOut'); tl.to(SP, { b: .62, duration: .45, ease: 'power2.out' }, t); ['ID', 'PH', 'VN', 'MY'].forEach((id, k) => { expr(C[id], 'shock', t + .2 + k * .05, .06); hop(C[id], t + .25 + k * .05, 26, .24); }); }
  { const t = c.door; camTo(t - .05, .3, SHOT.DOOR, 'power2.inOut'); tl.to(HOME.door, { scaleX: .2, transformOrigin: '0% 50%', duration: .25, ease: 'power2.out' }, t); tl.to(SP, { b: .9, duration: .5, ease: 'power1.inOut' }, t + .1); }
  { const t = S_('14'); camTo(t - .15, .3, SHOT.WINDOW, 'power2.inOut'); tl.to(TRK, { puff: 1, sh: 3, duration: .3 }, t - .3); }
  { const t = S_('15'); camTo(t - .15, .01, SHOT.TH, 'none'); for (let k = 0; k < 30; k++) tl.to(C.TH.arm[0], { a: k % 2 ? -24 : -38, duration: .1 }, t + k * .14); tl.to(SP, { b: 1, duration: WF('15', 'Selesai') - t, ease: 'none' }, t);
    const td = WF('15', 'Selesai'); arm(C.TH, 0, { a: 100, len: 1.2 }, td - .05, .15, 'back.out(2)'); hop(C.TH, td, 40, .3); expr(C.TH, 'happy', td - .05, .1); camTo(td + .1, .4, SHOT.WIDE, 'power2.out');
    ['SG', 'ID', 'PH', 'VN', 'MY'].forEach((id, k) => expr(C[id], 'shock', td + .1 + k * .04, .06)); }
  arm(C.TH, 0, REST, S_('16'), .2);
  // C. ngarang? → hitung huruf → rekor dunia
  { const t = S_('16'); arm(C.PH, 2, { a: 205, len: .8 }, t, .15); arm(C.PH, 2, REST, E_('16') + .2, .2); }
  { const t = S_('17'), t1 = WF('17', '168'); const cnt = { n: 0 }, g = G(HUD, { transform: 'translate(540,420)' }), i = G(g);
    R(i, -230, -130, 460, 260, '#24343C', 30, { stroke: '#FFE14D', 'stroke-width': 8 }); R(i, -200, -100, 400, 140, '#BFE8C8', 14, { stroke: INK, 'stroke-width': 5 });
    const nt = TX(i, 170, 10, '0', { 'font-family': 'Lilita One', 'font-size': 120, fill: '#1E2A1E', 'text-anchor': 'end' }); TX(i, 0, 100, 'HURUF', { 'font-family': 'Lilita One', 'font-size': 52, fill: '#FFE14D' });
    popIn(i, t + .05, .4); tl.to(cnt, { n: 168, duration: t1 - t - .1, ease: 'power2.in' }, t + .1); live(() => { nt.textContent = String(Math.round(cnt.n)); });
    tl.to(i, { scale: 1.25, duration: .12, yoyo: true, repeat: 1, svgOrigin: '0 0' }, t1); tl.to(i, { opacity: 0, duration: .2 }, E_('17') + .35); shake(t1, 10, .4); flash(t1, .4, .2);
    arm(C.SG, 1, { a: 40, len: 1.0 }, t, .1); for (let k = 0; k < 10; k++) tl.to(C.SG.arm[1], { a: k % 2 ? 30 : 50, duration: .1 }, t + .1 + k * .12); arm(C.SG, 1, REST, t1, .2); expr(C.SG, 'shock', t1 - .05, .06);
    ['ID', 'PH', 'VN', 'MY'].forEach((id, k) => { expr(C[id], 'shock', t1 + k * .04, .05); hop(C[id], t1 + k * .04, 40, .3); }); }
  insert(c.record - .05, E_('18') + .25, ii => { const o = { stroke: INK, 'stroke-width': 7, 'stroke-linejoin': 'round' };
    R(ii, -600, -1000, 1200, 2000, '#F4E6C4'); R(ii, -540, -940, 1080, 1880, 'none', 20, { stroke: '#B8902E', 'stroke-width': 14 }); R(ii, -510, -910, 1020, 1820, 'none', 14, { stroke: '#B8902E', 'stroke-width': 4 });
    TX(ii, 0, -720, 'REKOR DUNIA', { 'font-family': 'Lilita One', 'font-size': 140, fill: '#8E2A22', stroke: '#FFFFFF', 'stroke-width': 8, 'paint-order': 'stroke' });
    TX(ii, 0, -580, 'NAMA TEMPAT TERPANJANG', { 'font-family': 'Lilita One', 'font-size': 76, fill: '#1F3B78' });
    const nm = G(ii, { transform: 'translate(0,-380)' }); const words = FULL.split(' '); let line = '', lines = []; words.forEach(w => { if ((line + ' ' + w).length > 26) { lines.push(line); line = w; } else line = (line ? line + ' ' : '') + w; }); lines.push(line);
    lines.forEach((l_, k) => TX(nm, 0, k * 62, l_, { 'font-family': BALOO, 'font-weight': 800, 'font-size': 48, fill: '#3A2A1E' }));
    const st = G(G(ii, { transform: 'translate(260,480) rotate(-12)' })); CI(st, 0, 0, 170, '#E8C468', o); CI(st, 0, 0, 140, 'none', { stroke: '#B8902E', 'stroke-width': 8 }); TX(st, 0, 20, '168', { 'font-family': 'Lilita One', 'font-size': 120, fill: '#8E2A22' }); TX(st, 0, 85, 'HURUF', { 'font-family': 'Lilita One', 'font-size': 44, fill: '#8E2A22' });
    tl.fromTo(st, { opacity: 0, scale: 2.4, svgOrigin: '0 0' }, { opacity: 1, scale: 1, duration: .16, ease: 'power3.in', immediateRender: false }, WF('18', 'Nama') - .05); st.style.opacity = 0;
    flatFlag(ii, 'TH', -300, 470, 150, HUD_DEFS); }, 'tercatat di Guinness World Records');
  { const t = S_('19'); hop(C.ID, t, 30, .26); }
  insert(WF('20', 'Kota') - .1, E_('20') + .2, ii => { const o = { stroke: INK, 'stroke-width': 7, 'stroke-linejoin': 'round' };
    R(ii, -600, -1000, 1200, 2000, '#FFF6E6'); TX(ii, 0, -600, 'ARTINYA?', { 'font-family': 'Lilita One', 'font-size': 130, fill: '#8E2A22', stroke: '#FFFFFF', 'stroke-width': 8, 'paint-order': 'stroke' });
    [['Krung Thep', 'Kota Para Malaikat', '#C25BB8', 'para'], ['Mahanakhon', 'Kota Agung', '#2E9BD6', 'agung'], ['Noppharat', 'Sembilan Permata', '#2E9B5A', 'sembilan']].forEach(([a, b, col, pre], k) => {
      const g_ = G(G(ii, { transform: `translate(0,${-330 + k * 320})` })); R(g_, -520, -130, 1040, 260, '#FFFFFF', 30, o); R(g_, -520, -130, 26, 260, col, 0);
      TX(g_, -470, -20, a, { 'font-family': 'Lilita One', 'font-size': 88, fill: col, 'text-anchor': 'start' }); TX(g_, -470, 80, '= ' + b, { 'font-family': BALOO, 'font-weight': 800, 'font-size': 66, fill: INK, 'text-anchor': 'start' });
      popIn(g_, WF('20', pre) - .2, .5); }); }, 'terjemahan bebas dari bahasa Thai');
  insert(WF('22', 'Ada') - .05, E_('22') + .25, ii => { const o = { stroke: INK, 'stroke-width': 8, 'stroke-linejoin': 'round' };
    R(ii, -600, -1000, 1200, 2000, '#2A2440'); for (let k = 0; k < 8; k++) TX(ii, -450 + k * 130, -700 + (k % 3) * 80, '♪', { 'font-size': 90, fill: ['#FFE14D', '#FF8AD8', '#9FE08A'][k % 3], opacity: .7 });
    const ks = G(ii, { transform: 'translate(0,-150) rotate(-4)' }); R(ks, -460, -280, 920, 560, '#E85D4A', 30, o); R(ks, -400, -220, 800, 230, '#FFF6E6', 14, o);
    TX(ks, 0, -140, 'KRUNG THEP MAHA NAKHON', { 'font-family': 'Lilita One', 'font-size': 58, fill: '#8E2A22' }); TX(ks, 0, -60, 'Asanee–Wasan', { 'font-family': BALOO, 'font-weight': 800, 'font-size': 50, fill: INK });
    R(ks, -260, 60, 520, 150, '#3A2A1E', 70, o); [-140, 140].forEach(x => { CI(ks, x, 135, 55, '#FFFFFF', o); CI(ks, x, 135, 18, '#3A2A1E'); });
    const yr = G(G(ii, { transform: 'translate(250,380) rotate(10)' })); R(yr, -170, -80, 340, 160, '#FFE14D', 24, o); TX(yr, 0, 36, '1989', { 'font-family': 'Lilita One', 'font-size': 110, fill: '#8E2A22' }); popIn(yr, WF('22', '1989') - .05, .4); }, 'lagu yang liriknya nama lengkap Bangkok');
  // D. ongkos per huruf → Krung Thep → truk berangkat
  { const t = S_('23'); tl.set(stamp, { o: 1 }, t); arm(C.SG, 0, { a: 30, len: 1.3 }, WF('23', 'Ongkos') - .05, .12); arm(C.SG, 0, REST, E_('23') + .1, .2);
    pill(WF('23', 'huruf') - .05, E_('23') - WF('23', 'huruf') + .6, 'Ongkir: 168 × per huruf = ???', 330, 44); }
  { const t = S_('24'); hop(C.TH, t, 46, .3); tl.set(thEnv, { o: 1, dx: 0, dy: 0, rot: 0, s: .8 }, WF('24', 'aja') - .1); arm(C.TH, 1, { a: 235, len: .75 }, WF('24', 'aja') - .15, .15, 'back.out(2)');
    tl.to(thEnv, { dx: SEAT.SG + 90 - (SEAT.TH + RAD.TH * .6), dy: -255 + RAD.TH * .25, rot: -340, duration: .32, ease: 'power2.in' }, E_('24') + .05); tl.to(thEnv, { o: 0, duration: .05 }, E_('24') + .38); arm(C.TH, 1, REST, E_('24') + .4, .2);
    tl.to(C.SG.arm[1], { a: 80, len: 1.0, duration: .1 }, E_('24') + .2); tl.to(C.SG.arm[1], { a: -10, duration: .08, ease: 'power3.in' }, E_('24') + .32); tl.to(C.SG.arm[1], { a: REST.a, len: REST.len, duration: .15 }, E_('24') + .5); }
  { const t = S_('25'); arm(C.ID, 1, { a: 60, len: 1.2 }, t, .15); arm(C.ID, 1, REST, E_('25'), .2); ['PH', 'VN', 'MY'].forEach((id, k) => { expr(C[id], 'happy', t + .2 + k * .05, .1); hop(C[id], t + .3 + k * .08, 26, .26); }); }
  { const t = c.honk; camTo(t - .1, .3, SHOT.WINDOW, 'power2.inOut'); tl.to(TRK, { sh: 6, duration: .1, yoyo: true, repeat: 3 }, t); pow(HOME.winX - 120, -1310, t, 'TIIN!', '#FFE14D', .7, WALL.g, 54, .8);
    tl.to(TRK, { x: 900, duration: 1.0, ease: 'power2.in' }, c.leave); tl.to(TRK, { puff: 0, duration: .4 }, c.leave + .6); }
  { const L = c.leave; camTo(L + .6, .01, { x: -120, z: 1.15, gs: 1580 }, 'none'); tl.to(SP, { a: 1, duration: .55, ease: 'power2.in' }, L + .6);
    tl.to(C.TH, { x: SEAT.TH + 130, rot: 30, y: -30, duration: .14, ease: 'power3.out' }, L + .62); expr(C.TH, 'shock', L + .6, .06); arm(C.TH, 1, { a: 10, len: 1.3 }, L + .6, .1); arm(C.TH, 0, { a: 130, len: 1.1 }, L + .6, .1);
    tl.to(C.TH, { x: SEAT.TH, rot: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }, L + 1.05); arm(C.TH, 2, REST, L + 1.1, .25);
    ['ID', 'PH', 'VN', 'MY', 'SG'].forEach((id, k) => expr(C[id], 'shock', L + .65 + k * .04, .06)); pow(SEAT.TH + 300, -620, L + .66, 'SRETT!', '#FFE14D', 1.05); }
  tl.to(HOME.door, { scaleX: 1, duration: .3, ease: 'power2.in' }, c.leave + 1.3);
  // kartu fakta, kartu akhir
  tl.to(MOOD, { dim: .45, duration: .4 }, c.card); camTo(c.card + .05, .01, SHOT.WIDE, 'none'); camTo(c.card + .1, 10, { x: -20, z: .7, gs: 1480 }, 'none');
  tl.to('#fade', { opacity: 1, duration: .3, ease: 'power2.in' }, c.end_in - .3); tl.set('#endc', { opacity: 1 }, c.end_in); tl.to('#fade', { opacity: 0, duration: .35 }, c.end_in);
  tl.set(['#scene', '#hud'], { visibility: 'hidden' }, c.end_in + .01);
  tl.to({}, { duration: .01 }, DUR);
  // gerak kamera yang masih berjalan saat gerak berikutnya mulai dipotong di titik itu (tanpa ini tween lama "menarik balik" kamera → frame lompat)
  { const tw = tl.getChildren(false, true, false).filter(t => t.targets()[0] === CAM).sort((a, b) => a.startTime() - b.startTime()), ks = t => ['x', 'z', 'gs'].filter(k => k in t.vars);
    tw.forEach((a, i) => { const ka = ks(a); if (!ka.length) return; for (const b of tw.slice(i + 1)) { if (b.startTime() >= a.endTime() - 1e-4) break;
      if (b.startTime() > a.startTime() + 1e-4 && ks(b).some(k => ka.includes(k))) { a.duration(b.startTime() - a.startTime()); break; } } }); }

  renderWorld = (t) => {
    const shx = CAM.shake * (Math.sin(t * 71) * .6 + Math.sin(t * 127 + 1) * .4), shy = CAM.shake * (Math.sin(t * 83 + 2) * .6 + Math.sin(t * 149) * .4);
    const Z = CAM.z * (1 + Math.sin(t * .31) * .006), CX = CAM.x + Math.sin(t * .47) * 5 + Math.sin(t * .83) * 3, camY = -(CAM.gs - 960) / Z;
    LAYERS.forEach(L => { const zf = L.f === 1 ? Z : 1 + (Z - 1) * L.fz; L.g.setAttribute('transform', `translate(${540 - CX * L.f * zf + shx * L.f},${960 - camY * zf + shy * L.f}) scale(${zf})`); });
    LIVE.forEach(fn => fn(t));
    ORDER.forEach(o => renderChar(o, t));
    dimRect.setAttribute('opacity', Math.min(.9, MOOD.dim * .62)); spotRect.setAttribute('opacity', MOOD.spot);
    renderTeaser(t); };
  buildHUD();
}

const SUBS = [];   // satu kata subtitle saja yang boleh tampil per frame
/* ---------- HUD: judul, subtitle per kata, kartu fakta ---------- */
function buildHUD() {
  const h = HUD, top = G(h), tw = 900, c = CUE;
  R(top, (W - tw) / 2 + 8, 92, tw, 104, '#000', 52, { opacity: .25 }); R(top, (W - tw) / 2, 84, tw, 104, '#C8463A', 52, { stroke: '#FFE14D', 'stroke-width': 8 });
  TX(top, W / 2, 158, 'NAMA KOTA TERPANJANG', { 'font-family': 'Lilita One', 'font-size': 60, fill: '#FFFFFF', stroke: INK, 'stroke-width': 8, 'paint-order': 'stroke', 'letter-spacing': 2 });
  top.style.opacity = 0;
  tl.fromTo(top, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: .35, ease: 'back.out(2)', immediateRender: false }, c.open + .15);
  tl.to(top, { opacity: 0, y: -60, duration: .35, ease: 'power2.in' }, c.open + 3.6);
  const THAI = new Set(FULL.toLowerCase().split(' ').concat(['krung', 'thep'])), norm = w => w.toLowerCase().replace(/[^a-zà-ỹ0-9]/g, '');
  const SUBY = 1610, subG = G(h), IMPACT = new Set(['jakarta', 'manila', 'hà', 'nội', 'kuala', 'lumpur', 'bangkok', 'thailand', 'skripsi', 'muat', 'besar', 'mesin', 'selesai', 'ngarang', 'huruf', 'rekor', 'dunia', 'guinness', 'malaikat', 'lagunya', 'ongkos', 'deh', 'perhatian', 'cepat', 'next', 'selanjutnya']),
    SHAKY = new Set(['selesai', 'huruf', 'deh', 'muat']);
  LINES.forEach(l => l.words.forEach((w, i) => {
    const s = l.start + w.s, next = i < l.words.length - 1 ? Math.min(l.start + l.words[i + 1].s, l.start + w.e + .45) : Math.min(l.end + .3, l.start + w.e + .45);
    const n_ = norm(w.w), thai = THAI.has(n_), pos = G(subG, { transform: `translate(${W / 2},${SUBY})` }), g = G(pos), yel = thai || IMPACT.has(n_) || /^\.*\d/.test(w.w);
    const fs = thai ? 124 : yel ? 132 : 112, tx = TX(g, 0, 0, w.w, { 'font-family': 'Lilita One', 'font-size': fs, fill: thai ? '#FFD0F4' : yel ? '#FFE14D' : '#FFFFFF', stroke: INK, 'stroke-width': 18, 'stroke-linejoin': 'round', 'paint-order': 'stroke', 'dominant-baseline': 'central', filter: 'url(#subsh)' });
    const len = tx.getComputedTextLength(); if (len > 960) tx.setAttribute('font-size', fs * 960 / len);
    g.style.opacity = 0;
    if (yel) tl.fromTo(g, { scale: 1.9, opacity: 0, rotation: -6 }, { scale: 1, opacity: 1, rotation: 0, duration: .16, ease: 'back.out(2.6)', immediateRender: false }, s);
    else tl.fromTo(g, { scale: .55, opacity: 0, y: 14 }, { scale: 1, opacity: 1, y: 0, duration: .13, ease: 'back.out(3)', immediateRender: false }, s);
    if (SHAKY.has(n_)) tl.to(g, { keyframes: { x: [0, -14, 12, -10, 8, 0] }, duration: .35, ease: 'none' }, s + .14);
    tl.set(g, { opacity: 0 }, next); SUBS.push({ g: pos, s, next }); }));
  const L = LN_['26'], WT = pre => L.start + L.words[Math.max(0, L.words.findIndex(w => w.w.startsWith(pre)))].s;
  // kartu fakta (narator)
  const card = G(h, { transform: 'translate(540,880)' }), ci = G(card);
  R(ci, -470, -330, 940, 660, '#3A1E18', 24, { stroke: '#FFE14D', 'stroke-width': 10 }); R(ci, -440, -300, 880, 600, 'none', 14, { stroke: '#FFE14D', 'stroke-width': 3, opacity: .6 }); R(ci, -470, -330, 940, 100, '#C8463A', 24, { stroke: '#FFE14D', 'stroke-width': 10 });
  TX(ci, 0, -258, 'FAKTANYA', { 'font-family': 'Lilita One', 'font-size': 62, fill: '#FFFFFF', stroke: INK, 'stroke-width': 8, 'paint-order': 'stroke' });
  const rows = [['168 huruf', 'nama tempat terpanjang di dunia (Guinness)', 'Guinness'], ['Krung Thep', '"Kota Para Malaikat", sebutan sehari-hari', 'Krung']].map(([a, d, pre], k) => {
    const y = -110 + k * 230, r_ = G(ci); flatFlag(r_, 'TH', -370, y, 80, HUD_DEFS); TX(r_, -285, y - 8, a, { 'text-anchor': 'start', 'font-family': 'Lilita One', 'font-size': 64, fill: '#FFFFFF' });
    const dd = TX(r_, -285, y + 50, d, { 'text-anchor': 'start', 'font-family': MULTI, 'font-weight': 700, 'font-size': 34, fill: '#FFE14D' }); if (dd.getComputedTextLength() > 700) dd.setAttribute('font-size', 34 * 700 / dd.getComputedTextLength());
    if (!k) PA(ci, `M-420 ${y + 110} H420`, null, { stroke: '#6A3A2E', 'stroke-width': 5, 'stroke-dasharray': '16 12' }); r_.style.opacity = .2; return [r_, pre]; });
  const nb = TX(ci, 0, 270, 'Nama resmi berbahasa Inggris sejak 2022: Krung Thep Maha Nakhon (Bangkok)', { 'font-family': MULTI, 'font-weight': 700, 'font-size': 26, fill: '#E8CFC0' }); if (nb.getComputedTextLength() > 860) nb.setAttribute('font-size', 26 * 860 / nb.getComputedTextLength());
  ci.style.opacity = 0;
  tl.fromTo(ci, { scale: .3, opacity: 0, rotation: -8, svgOrigin: '0 0' }, { scale: 1, opacity: 1, rotation: 0, duration: .45, ease: 'back.out(2.2)', immediateRender: false }, c.card);
  rows.forEach(([r_, pre]) => { tl.fromTo(r_, { opacity: .2 }, { opacity: 1, duration: .25, immediateRender: false }, WT(pre) - .05); tl.fromTo(r_, { scale: 1, svgOrigin: '-370 0' }, { keyframes: { scale: [1, 1.05, 1] }, duration: .4, immediateRender: false }, WT(pre)); });
  tl.to(ci, { opacity: 0, duration: .25 }, c.end_in - .3);
  h.appendChild(FLASH); h.appendChild(RADIAL);
  buildEnd(); buildTeaser();
}
let renderTeaser = () => {};
function buildTeaser() {   // hook: kertas alamat super panjang meliuk dari Thailand sampai keluar layar, jam 16.59, semua melongo (frame terakhir = frame pertama)
  const T = $('#teaser'), tdefs = N('defs', {}, T), g = G(T);
  const bg = N('linearGradient', { id: 'tbgk', x1: 0, y1: 0, x2: 0, y2: 1 }, tdefs); [[0, '#FBEBD0'], [.6, '#F2D4A4'], [.61, '#C8463A'], [1, '#A8382E']].forEach(([of, c_]) => N('stop', { offset: of, 'stop-color': c_ }, bg));
  R(g, 0, 0, W, H, 'url(#tbgk)'); const o = { stroke: INK, 'stroke-width': 9, 'stroke-linejoin': 'round' };
  N('feGaussianBlur', { stdDeviation: 8 }, N('filter', { id: 'tglow', x: '-20%', y: '-40%', width: '140%', height: '180%' }, tdefs));
  const tx = (y, t, fs, fill, glow) => { TX(g, 540, y, t, { 'font-family': 'Lilita One', 'font-size': fs, fill: 'none', stroke: glow, 'stroke-width': fs * .2, opacity: .45, filter: 'url(#tglow)' });
    TX(g, 540, y, t, { 'font-family': 'Lilita One', 'font-size': fs, fill, stroke: '#0B0C1E', 'stroke-width': fs * .13, 'stroke-linejoin': 'round', 'paint-order': 'stroke' }); };
  tx(230, 'NAMA KOTA INI', 132, '#FFFFFF', '#FFFFFF'); tx(380, 'GAK MUAT', 132, '#FFE14D', '#E8C468'); tx(530, 'DI AMPLOP!', 132, '#FF6A5A', '#FF6A5A');
  // jam 16.59
  const ck = G(g, { transform: 'translate(930,700)' }); CI(ck, 0, 0, 92, '#FFFFFF', o); CI(ck, 0, 0, 92, 'none', { stroke: '#C8463A', 'stroke-width': 12 }); PA(ck, `M0 0 L${Math.sin(59 / 60 * Math.PI * 2) * 70} ${-Math.cos(59 / 60 * Math.PI * 2) * 70}`, null, { stroke: '#C8463A', 'stroke-width': 7, 'stroke-linecap': 'round' });
  PA(ck, `M0 0 L${Math.sin(4.98 / 12 * Math.PI * 2) * 46} ${-Math.cos(4.98 / 12 * Math.PI * 2) * 46}`, null, { stroke: INK, 'stroke-width': 10, 'stroke-linecap': 'round' }); CI(ck, 0, 0, 9, INK);
  // kertas meliuk
  const sd = 'M300 840 L780 840 Q900 840 900 960 L900 980 Q900 1080 780 1080 L200 1080 Q90 1080 90 1190 Q90 1300 200 1300 L1120 1300';
  PA(g, sd, null, { stroke: INK, 'stroke-width': 74, 'stroke-linejoin': 'round' }); PA(g, sd, null, { stroke: '#FFFDF6', 'stroke-width': 60, 'stroke-linejoin': 'round' });
  const pid = 'tsp'; PA(tdefs, sd, null, { id: pid }); const tt = N('text', { 'font-family': BALOO, 'font-weight': 800, 'font-size': 38, fill: '#1F3B78', dy: 13 }, g), tp = N('textPath', { href: `#${pid}`, startOffset: 20 }, tt); tp.textContent = FULL;
  // Thailand menulis (pulpen) + yang lain melongo
  const P = [['TH', 210, 860, 1.25, 1, 'smug'], ['ID', 230, 1590, 1.3, 1, 'shock'], ['PH', 500, 1650, 1.12, .3, 'shock'], ['VN', 760, 1610, 1.15, -.3, 'shock'], ['MY', 960, 1660, 1.05, -1, 'shock']].map(([id, x, y, s, d, e]) => {
    const p = G(g), b = ballHead(p, id, 0, 0, s, d, tdefs); ACC[id](b, 82, 82);
    if (e === 'shock') { [-1, 1].forEach(sg => EL(b, sg * 30, -14, 25, 29, '#FFFFFF', { stroke: INK, 'stroke-width': 5 })); [-1, 1].forEach(sg => CI(b, sg * 30 + d * 6, -14, 6, INK)); }
    else { [-1, 1].forEach(sg => PA(b, `M${sg * 30 - 22} -22 L${sg * 30 + 22} -22`, null, { stroke: INK, 'stroke-width': 7, 'stroke-linecap': 'round' })); const pn = G(b, { transform: 'translate(95,-5) rotate(30)' }); R(pn, -6, -40, 12, 70, '#1F3B78', 5, { stroke: INK, 'stroke-width': 4 }); PA(pn, 'M-6 30 L0 46 L6 30Z', '#E8C468', { stroke: INK, 'stroke-width': 3 }); }
    return [p, x, y, id]; });
  // VO hook: Singapura "Amplopnya nggak muat!" (gelembung dari kanan, petugas di luar layar)
  const HK = (DATA.hook || [])[0], HL = HK && LN_[HK.id], bub = G(g, { transform: 'translate(640,1450)' }), bi = G(bub); bi.style.opacity = 0;
  PA(bi, 'M-300 -70 H260 Q300 -70 300 -30 V30 Q300 70 260 70 H200 L330 120 L150 70 H-300 Q-340 70 -340 30 V-30 Q-340 -70 -300 -70Z', '#FFFFFF', o);
  TX(bi, -20, 18, 'AMPLOPNYA NGGAK MUAT!', { 'font-family': 'Lilita One', 'font-size': 48, fill: '#C8463A' });
  renderTeaser = t => { const C_ = CUE, op = 0;   // hook pembuka & loop dimatikan (permintaan user)
    T.style.opacity = op; T.style.visibility = op > 0 ? 'visible' : 'hidden'; if (!op) return;
    const u = t >= C_.loop ? t - DUR : t;
    const t0 = HL ? HK.start : 1e9, t1 = HL ? HK.start + HL.dur + .25 : 0, on = t < C_.open && t >= t0 && t < t1;
    bi.style.opacity = on ? 1 : 0; bub.setAttribute('transform', `translate(640,1450) scale(${on ? Math.min(1, .6 + 4 * (t - t0)) : 1})`);
    P.forEach(([p, x, y, id], k) => p.setAttribute('transform', `translate(${x + Math.sin(u * 2.4 + k) * 5},${y + (id === 'TH' ? Math.sin(u * 3) * 4 : -Math.abs(Math.sin(u * 3.2 + k * 1.3)) * 10)}) rotate(${Math.sin(u * 2.6 + k) * 3})`)); }; }
function ballSVG(id) { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '-38 -38 76 76'); s.setAttribute('class', 'flag');
  const cid = uid('rk'), bd = blobD(30, 0, 0, 30); PA(N('clipPath', { id: cid }, s), bd); const g = G(s, { 'clip-path': `url(#${cid})` }); flag(id, g, -36, -30, 72, 60); PA(s, bd, null, { stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }); return s; }
function buildEnd() {
  const ec = $('#endc'); ec.innerHTML = '<h1>PANJANG NAMA<br><span>IBU KOTA ASEAN</span></h1><div class="bar"></div>';
  const rows = [['ID', 'Jakarta', 7], ['PH', 'Manila', 6], ['VN', 'Hà Nội', 5], ['MY', 'Kuala Lumpur', 11], ['TH', 'Bangkok*', 168]];
  const col = document.createElement('div'); col.className = 'col'; ec.appendChild(col);
  rows.forEach(([id, w, n], i) => { const r = document.createElement('div'); r.className = 'row' + (id === 'TH' ? ' id' : ''); r.appendChild(ballSVG(id)); const tx = document.createElement('div'); tx.className = 'tx';
    tx.innerHTML = `<div class="w">${w}</div><div class="track"><div class="fill"></div><span class="num">${n}</span></div>`; r.appendChild(tx); col.appendChild(r);
    const fill = tx.querySelector('.fill'), num = tx.querySelector('.num'), wpx = id === 'TH' ? 1400 : n * 34; if (id === 'TH') { num.style.left = '360px'; num.style.color = '#FFFFFF'; num.style.fontSize = '54px'; num.style.top = '-10px'; num.textContent = '168!'; } else num.style.left = (wpx + 8) + 'px';
    tl.fromTo(r, { opacity: 0, x: i % 2 ? 60 : -60 }, { opacity: 1, x: 0, duration: .32, ease: 'power3.out', immediateRender: false }, CUE.end_in + .3 + i * .1);
    tl.fromTo(fill, { width: 0 }, { width: wpx, duration: id === 'TH' ? 1.2 : .4, ease: id === 'TH' ? 'power2.in' : 'power2.out', immediateRender: false }, CUE.end_in + .45 + i * .1);
    tl.fromTo(num, { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, CUE.end_in + .7 + i * .1 + (id === 'TH' ? .9 : 0)); });
  const f = document.createElement('div'); f.className = 'foot'; f.innerHTML = '*nama seremonial: Krung Thep Mahanakhon … Witsanukam Prasit (168 huruf, Guinness World Records)<br>Sumber: Guinness World Records · lagu Asanee–Wasan (1989) · Office of the Royal Society Thailand (2022)'; ec.appendChild(f);
  tl.fromTo(ec.querySelector('h1'), { scale: .8, opacity: 0 }, { scale: 1, opacity: 1, duration: .4, ease: 'back.out(2)', immediateRender: false }, CUE.end_in + .1);
  tl.fromTo(f, { opacity: 0 }, { opacity: 1, duration: .4, immediateRender: false }, CUE.end_in + 1.4); }

/* ---------- WATERMARK: satu teks kecil, diam per adegan, pindah hanya saat adegan berganti ---------- */
const WM = (() => { const c = CUE, U = 600, B = 1500, S = k => LN_[k].start, E = k => LN_[k].end;
  const WFw = (k, pre, n = 0) => { const l = LN_[k], ix = l.words.map((w, i) => [w.w.toLowerCase().replace(/[^a-z0-9]/g, ''), i]).filter(([w]) => w.startsWith(pre)).map(([, i]) => i); return l.start + l.words[ix[Math.min(n, ix.length - 1)]].s; };
  const L = [[0, 540, 205, 'd'], [c.open, 300, B, 'd']], OV = { '01': [300, B], '08': [780, 330], '10': [780, B], '11': [780, B] }; let s = 0;
  LINES.filter(l => l.who !== 'NR').forEach(l => L.push([l.start - .2, ...(OV[l.id] || [l.who === 'SG' ? 780 : (s++ % 2 ? 300 : 780), U]), 'd']));
  L.push([c.big - .1, 300, B, 'd'], [c.door - .05, 300, B, 'd'], [S('14') - .15, 300, B, 'd'], [WFw('15', 'selesai') + .1, 300, B, 'd'], [c.honk - .1, 780, B, 'd'], [c.card, 540, 1440, 'd'], [c.end_in, 540, 1660, 'd']);
  L.sort((a, b) => a[0] - b[0]);
  const CT = cutTimes(); [[c.record - .05, E('18') + .25], [WFw('20', 'kota') - .1, E('20') + .2], [WFw('22', 'ada') - .05, E('22') + .25],
   ...['clk56', 'clk57', 'clk58', 'clk59', 'clk60'].map(k => [c[k], c[k] + .8]), [...CT.SG, 780, U], [...CT.ID, 780, B], [...CT.QUEUE, 780, B]].sort((p, q) => p[0] - q[0]).forEach(([a, b, x = 540, y = 205]) => {
    const prev = L.filter(x => x[0] <= b + .2).sort((p, q) => q[0] - p[0])[0]; for (let i = L.length - 1; i >= 0; i--) if (L[i][0] > a - .05 && L[i][0] < b + .2) L.splice(i, 1);
    L.push([a, x, y, 'd'], [b + .2, prev[1], prev[2], prev[3]]); });
  L.sort((a, b) => a[0] - b[0]); return L.filter((x, i) => !(i + 1 < L.length && L[i + 1][0] === x[0])); })();
