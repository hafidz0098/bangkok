# Musik kantor pos sore: groove santai + detak jam (hi-hat) yang makin rapat seiring jam 16.55 → 17.00, pizzicato "menulis", stab panik amplop, string tegang saat kertas keluar pintu & truk dipanaskan,
# hentakan "Selesai!", hening lalu riser hitung huruf → BOOM 168, fanfare rekor dunia, lonceng mimpi "kota para malaikat", groove kaset 1989, womp ongkir, klakson + perayaan, hangat di kartu, bed hook untuk loop.
S_ = {l['id']: l for l in LINES}
def W_(k, pre):
    l = S_[k]; return l['start'] + next((w['s'] for w in l['words'] if w['w'].lower().lstrip('.¡¿,!?" ').startswith(pre.lower())), l['words'][0]['s'])
st = lambda k: S_[k]['start']; en = lambda k: S_[k]['end']
def upright(m, d=.5, g=.5):
    t = tt(d); f = mf(m); return (np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t * 7)) * np.exp(-t * 4.5) * np.minimum(1, t / .012) * g
def pizzline(t0, t1, bpm, notes, g=.3):
    b = 60 / bpm; t = t0; k = 0
    while t < t1 - .05: put(music, pizz(notes[k % len(notes)], .2), t, g); t += b; k += 1
def chime(t0, m=84, g=.35, pan=.2): putp(bell(m, 1.0) * 1.2, t0, g, pan)
def womp(t0, ms=(58, 57, 56, 53), d=.34, g=.16):
    for k, m in enumerate(ms): put(music, brass([m], d * (2.2 if k == len(ms) - 1 else 1), .03, 1300, g), t0 + k * d)
def stab(t0, ms=(48, 55, 60, 64), g=.22): put(music, brass(list(ms), .6, .02, 2800, g), t0); put(music, cymbal(1.2, .14), t0); put(music, kick(.5), t0, .5)
def hook_bed(t0, d):
    put(music, pad([45, 52, 57], d, .09), t0); tq = tt(d); put(music, hp(rng.standard_normal(len(tq)), 2500) * (tq / d) ** 2 * .07, t0)
    for i in range(int(d / .5) + 1): put(music, kick(.3), t0 + i * .5, .3 if i % 2 else .18)
    for k, m in enumerate([76, 79, 84]): putp(bell(m, .8), t0 + .25 + k * .45, .15, (k - 1) * .5)
def silence(t0, t1, f=.08):
    a, b = int(t0 * SR), int(t1 * SR); n = int(f * SR)
    for buf in (music, musL, musR): buf[a:a + n] *= np.linspace(1, 0, n); buf[a + n:b] = 0; buf[b:b + n] *= np.linspace(0, 1, n)
def ticks(t0, t1, every, g=.5):   # detak jam
    t = t0; k = 0
    while t < t1: putp(hat(.04, .3) * (1.4 if k % 2 == 0 else .9), t, g, .35 if k % 2 else -.35); t += every; k += 1
hook_bed(0.0, C['open'])
# A. buru-buru: groove + detak jam
festive(C['open'] + .1, st('06'), 108, ['C', 'Am', 'F', 'G'], .45); ticks(C['open'] + .1, st('06'), .5, .4)
for k in ('st_id', 'st_ph', 'st_vn', 'st_my'): chime(C[k], 88, .2)
# B. Thailand menulis: pizzicato tenang, detak makin rapat
pizzline(st('07'), en('12'), 96, [60, 62, 64, 67, 64, 62], .22); ticks(st('07'), C['big'], .42, .45)
put(music, strings([45, 52, 57], en('09') - st('08'), .04), st('08'))
stab(st('13') - .02, (50, 57, 62, 65), .2); ticks(C['big'], W_('15', 'Selesai'), .3, .5)
put(music, strings([40, 47, 52, 55], W_('15', 'Selesai') - C['big'], .05), C['big']); pizzline(C['door'], W_('15', 'Selesai'), 140, [45, 48, 52, 51, 50, 48, 47, 48], .26)
stab(W_('15', 'Selesai') - .02, (48, 55, 60, 64), .26); festive(W_('15', 'Selesai') + .1, st('17') - .05, 116, ['C', 'F', 'G', 'C'], .55)
# C. hitung huruf: riser → BOOM 168 → rekor dunia
t1 = W_('17', '168'); silence(st('17') - .05, t1 - .02); n_ = int((t1 - st('17')) * SR); put(music, hp(rng.standard_normal(n_), 1500) * np.linspace(0, 1, n_) ** 2 * .07, st('17'))
for k in range(int((t1 - st('17')) / .14)): put(music, pizz(55 + k, .15), st('17') + k * .14, .25)
stab(t1 - .02, (43, 50, 55, 59), .3); put(music, brass([60, 64, 67], .5, .02, 2600, .16), C['record']); put(music, brass([65, 69, 72], .9, .02, 2600, .16), C['record'] + .4)
put(music, strings([53, 57, 60, 65], en('20') - st('19'), .05), st('19'))
for k, pre in enumerate(['para', 'agung', 'sembilan']): chime(W_('20', pre), [79, 83, 86][k], .26, (k - 1) * .4)
festive(W_('22', 'Ada'), en('22') + .1, 120, ['C', 'Am', 'F', 'G'], .7, bells=True)
# D. ongkir per huruf → Krung Thep aja → klakson, truk berangkat
silence(st('23') - .05, en('23')); womp(W_('23', 'huruf') + .1, (58, 57, 56, 53), .2, .11)
put(music, upright(45, .3, .45), st('24')); stab(W_('24', 'aja') - .02, (52, 59, 64, 67), .2)
festive(st('25'), C['card'], 124, ['C', 'F', 'G', 'C'], .85, bells=True); stab(C['honk'] - .02, (48, 55, 60, 64), .22)
t = C['card']; put(music, strings([53, 57, 60, 65], C['end_in'] - t, .06), t); festive(t + .3, C['end_in'], 96, ['F', 'C', 'Dm', 'G'], .4)
festive(C['end_in'] + .1, C['loop'] + .1, 112, ['C', 'Am', 'F', 'G'], .85, bells=True)
fe0, fe1 = int(C['loop'] * SR), int((C['loop'] + .5) * SR)
for buf in (music, musL, musR): buf[fe0:fe1] *= np.linspace(1, 0, fe1 - fe0); buf[fe1:] = 0
