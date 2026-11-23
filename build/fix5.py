P = 'C:/Users/User/Documents/tes-bals/bangkok/src/scene_bangkok.js'
s = open(P, encoding='utf-8').read()
R = [("expr(C.SG, 'closed', a, .1); arm(C.SG, 0, { a: 118, len: .95 }, a, .15); tl.to(C.SG.arm[0], { a: 140, duration: .16, yoyo: true, repeat: 5, ease: 'sine.inOut' }, a + .15);",
      "expr(C.SG, 'sleepy', a, .15); arm(C.SG, 0, { a: 205, len: .62 }, a, .2); tl.to(C.SG, { rot: -5, duration: .3 }, a + .1); tl.to(C.SG, { rot: 0, duration: .2 }, b);"),
     ("camTo(L + .6, .01, SHOT.WIDE, 'none');", "camTo(L + .6, .01, { x: -120, z: 1.15, gs: 1580 }, 'none');"),
     ("tl.to(C.TH, { x: SEAT.TH + 90, rot: 24, duration: .14, ease: 'power3.out' }, L + .62);", "tl.to(C.TH, { x: SEAT.TH + 130, rot: 30, y: -30, duration: .14, ease: 'power3.out' }, L + .62);"),
     ("tl.to(C.TH, { x: SEAT.TH, rot: 0, duration: .6, ease: 'elastic.out(1,.4)' }, L + 1.05);", "tl.to(C.TH, { x: SEAT.TH, rot: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }, L + 1.05);"),
     ("pow(SEAT.TH + 230, -640, L + .66, 'SRETT!', '#FFE14D', .75);", "pow(SEAT.TH + 300, -620, L + .66, 'SRETT!', '#FFE14D', 1.05);")]
for a, b in R:
    assert s.count(a) == 1, a[:60]; s = s.replace(a, b)
open(P, 'w', encoding='utf-8').write(s); print('ok')
