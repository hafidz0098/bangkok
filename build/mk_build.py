"""Turunkan bangkok/build.py dari absen/build.py: ganti VOICE, SUB, timeline cue, SFX, flow_id."""
R = 'C:/Users/User/Documents/tes-bals/'
s = open(R + 'absen/build.py', encoding='utf-8').read()
def between(a, b, new):
    global s
    i, j = s.index(a), s.index(b)
    s = s[:i] + new + s[j:]
s = s.replace('"""Absen Pakai Nama Asli:', '"""Nama Ibu Kota Terpanjang:')
between("VOICE = {", "HOOK = 2.2", """VOICE = {'SG': ('QuLloIKxiP3i9uFXzfgD', 'Zulsyifah'), 'TH': ('BSiuHWDgVlCBuGpext0k', 'Suara Pria Indonesia NPC'), 'ID': ('R86jddkroI9bJwXFfjsr', 'Saos cocol'),
         'MY': ('qXOoUJU1h7AiwSe4ltRA', 'Zulfa'), 'PH': ('ffTJE9l3Kt2ipEM32UOc', 'Aita'), 'VN': ('2lcxSPWqG78QhJnKPyMX', 'Genesius'), 'NR': ('ZowYWFat3iypr7PwKMPb', 'Vivan')}
""")
between("SUB = {", "L, chosen = {}, {}", """SUB = {'04': 'Hà Nội. Dua suku kata aja.', '06': 'Selanjutnya! Thailand!',
       '07': 'Sebentar ya... Krung Thep Mahanakhon...',
       '09': 'Bangkok itu nama panggilan. Nama lengkapnya... Amon Rattanakosin... Mahinthara Ayuthaya...',
       '12': '...Mahadilok Phop, Noppharat Ratchathani, Burirom...',
       '15': '...Udomratchaniwet Mahasathan, Amon Piman Awatan Sathit, Sakkathattiya Witsanukam Prasit. Selesai!',
       '17': 'Satu, dua, tiga... 168 huruf?!', '22': 'Ada lagunya, lho. Tahun 1989.',
       '24': '...Krung Thep aja deh.', '25': 'Nah gitu! Orang sana juga manggilnya Krung Thep!',
       '26': 'Nama seremonial Bangkok tercatat di Guinness sebagai nama tempat terpanjang di dunia, 168 huruf. Sehari-hari, warga Thailand menyebutnya Krung Thep, Kota Para Malaikat.'}
""")
between("c = {'hook': 0.0, 'open': HOOK}", "order = sorted(", """c = {'hook': 0.0, 'open': HOOK}
# A. jam 16.55: semua menulis alamat cepat-cepat
e = place('01', c['open'] + .45)
e = place('02', e + .2); c['st_id'] = e + .02
e = place('03', e + .1); c['st_ph'] = e + .02
e = place('04', e + .12); c['st_vn'] = e + .02
e = place('05', e + .12); c['st_my'] = e + .02
# B. Thailand mulai menulis nama lengkap
e = place('06', e + .3); e = place('07', e + .15); c['write'] = T['07']['start'] + .5
e = place('08', e + .08); e = place('09', e + .12)
e = place('10', e + .2); e = place('11', e + .12)
e = place('12', e + .2); e = place('13', e + .1); c['big'] = T['13']['end'] + .05
c['door'] = c['big'] + .5; e = place('14', c['door'] + .5)
e = place('15', e + .15); c['done'] = T['15']['end'] - .2
# C. gengsi → hitung huruf → rekor dunia
e = place('16', e + .3); e = place('17', e + .15); e = place('18', e + .15); c['record'] = T['18']['start']
e = place('19', e + .2); e = place('20', e + .12); e = place('21', e + .25); e = place('22', e + .12)
# D. ongkos kirim per huruf → Krung Thep → truk berangkat
e = place('23', e + .3); e = place('24', e + .1); e = place('25', e + .12)
c['honk'] = e + .2; c['leave'] = c['honk'] + .6
c['card'] = c['leave'] + 1.2; e = place('26', c['card'] + .3)
c['end_in'] = e + .4; c['loop'] = c['end_in'] + 2.8; c['end'] = round(c['loop'] + .85, 2)
c = {k: round(float(v), 3) for k, v in c.items()}

""")
between("CR = ", "sfx = [{'t'", """CR = '../enak/sfx/door_creak'; CHAT = '../enak/sfx/party_chatter'
HOOKVO = [{'id': '13', 'start': .45}]   # hook bersuara: Singapura "Amplopnya nggak muat!"
sfx = [(0.0, 'bass_impact', -14), (HOOK - .15, 'whoosh', -16),
       (S('01') - .05, 'impact', -30), (c['st_id'], 'stamp', -24), (c['st_ph'], 'stamp', -24), (c['st_vn'], 'stamp', -24), (c['st_my'], 'stamp', -24),
       (S('06') - .03, 'pop', -28), (W('07', 'Krung') - .05, 'sparkle', -30), (S('08') - .03, 'record_scratch', -32),
       (W('09', 'Amon') - .05, 'whoosh', -32), (W('12', 'Mahadilok') - .05, 'whoosh', -32), (S('13') - .03, 'boing', -28),
       (c['big'] + .05, 'whoosh', -24), (c['door'], CR, -32), (c['door'] + .1, 'whoosh', -22),
       (W('15', 'Selesai') - .05, 'stamp', -22), (W('15', 'Selesai'), 'sparkle', -26),
       (W('17', '168') - .05, 'bass_impact', -20), (c['record'] - .02, 'impact', -22), (c['record'] + .05, 'crowd_gasp', -34),
       (W('20', 'Kota') - .03, 'sparkle', -30), (W('22', '1989') - .05, 'pop', -26),
       (S('23') + .1, 'record_scratch', -30), (S('24') - .03, 'boing', -28), (W('24', 'aja') - .05, 'stamp', -24),
       (c['leave'], 'whoosh', -20), (c['card'], 'whoosh', -13), (c['end_in'], 'whoosh', -13)]
sfx += [(round(T['17']['start'] + .05 + i * .14, 3), 'pop', -32, 1.2 + (i % 3) * .2) for i in range(6)]   # hitung huruf
sfx += [(round(c['end_in'] + .35 + i * .12, 3), 'pop', -18) for i in range(5)]
sfx += [(c['loop'] + .2, 'whoosh', -16)]
""")
s = s.replace("'flow_id': 'Rtw9pwd4veiLIXcsfg5p'", "'flow_id': 'npDs238LkcKR13h09n7c'")
open(R + 'bangkok/build.py', 'w', encoding='utf-8').write(s)
print('ok')
