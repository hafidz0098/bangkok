# Produksi & QC: "Nama Ibu Kota Terpanjang di Dunia"

**Status (2026-11-08):**
- Animasi selesai, QC snapshot + watermark + subtitle sudah dicek.
- **Sudah dirender (2026-11-08):** `output/nama_kota_terpanjang.mp4`, 98,83 dtk, 1080×1920, 30 fps, H.264 + AAC, −14,5 LUFS, true peak −1,5 dBTP, 38,9 MB. Frame MP4 dicek di 0,5/16/37/47/82,7/96 dtk.
- Durasi 98,83 dtk, 1080×1920, 30 fps (setelah Revisi 2).
- **Tanpa hook pembuka** (permintaan user, 2026-11-08): video langsung mulai di kantor pos dan berakhir di kartu akhir, tanpa loop ke hook.

## Pipeline
```bash
cd bangkok && PYTHONUTF8=1 python make_bangkok.py   # kerupuk/index.src.html + src/room_bangkok.js + src/scene_bangkok.js → index.src.html; mix.py dari src/mix_bangkok.py
PYTHONUTF8=1 python build.py && PYTHONUTF8=1 python mix.py && PYTHONUTF8=1 python build_html.py
PYTHONUTF8=1 python check_subs.py                   # 174 unit, 0 bermasalah
cd ../tools && node snap_bangkok.mjs ../bangkok/build/qcN 0 5 ... && PYTHONUTF8=1 python sheet.py ../bangkok/build/qcN
node snap_wm_bangkok.mjs ../bangkok/build/wmN ...   # QC watermark
node cam_check.mjs <path>/bangkok/index.html        # tumpang-tindih tween kamera: bersih
node render_bangkok.mjs                             # → bangkok/output/nama_kota_terpanjang.mp4 (background)
```
- `build.py` diturunkan dari `absen/build.py` lewat `build/mk_build.py`.
- Waktu kata subtitle diambil dari `align_words.py` (Whisper lokal) dan disimpan di `vo/align.json`.

## Latar & karakter
**Kantor pos, sore hari:**
- Dinding: krem dengan lambris merah pos dan papan "KANTOR POS". Ada rak paket di balik loket dan poster prangko.
- Jam dinding besar, jarum menitnya berdetak dari 16.55 ke 17.00 di beat-beat cerita. Di bawahnya papan "TRUK POS TERAKHIR 17.00".
- Jendela jalan dengan truk pos merah. Truknya memanaskan mesin (asap), membunyikan klakson, lalu berangkat.
- Loket kaca "LOKET 1" dengan timbangan, meja tulis panjang, pintu kaca kanan (terbuka ke jalan), dan kotak pos merah.
- Kardus paket buram di latar depan, sinar matahari sore.

| Kode | Kursi x | r | Aksesori / properti |
|---|---|---|---|
| SG (petugas, segitiga) | −640 (panggung, y0 −40) | 100 | topi petugas pos, kacamata, cap pos |
| TH | −350 | 104 | anggrek ungu, pulpen, amplop "KRUNG THEP" |
| ID | −120 | 112 | peci, amplop "JAKARTA" |
| PH | 100 | 100 | salakot, amplop "MANILA" |
| VN | 310 | 100 | nón lá, amplop "HÀ NỘI" |
| MY | 520 | 102 | songkok, amplop "KUALA LUMPUR" |

**Kertas alamat Thailand:**
- Berupa path SVG: dari meja Thailand turun ke lantai, menyusuri lantai, lalu masuk pintu.
- Nama lengkap (RTGS) ditulis di kertas memakai `textPath` + mask, terbuka mengikuti stroke-dasharray.
- Panjangnya tumbuh di baris 07 → 09 → (10–11) → 12 → amplop besar → pintu → 15 (penuh).
- Di baris 24 kertas "ditarik" keluar pintu.

## Timeline (VO aktual)
**0–2,2 dtk: hook**
- Kertas berisi nama lengkap meliuk di layar, Thailand memegang pulpen, jam 16.59, yang lain melongo.
- Teks "NAMA KOTA INI GAK MUAT DI AMPLOP!".
- VO hook baris 13: "Amplopnya nggak muat!" dalam gelembung.

**2,65 dtk: buru-buru (jam 16.55)**
- Baris 01 (shot lebar), lalu 02–05. Tiap negara mengangkat amplop, melemparnya ke loket, dan Singapura mengecapnya.
- Pil "Hà Nội · 2 suku kata".

**16,5 dtk: Thailand menulis**
- Baris 06 (jam 16.56), 07 (mulai menulis), 08 (Singapura memotong, two-shot loket), 09.
- Baris 10–11 di shot antrean: Indonesia berbisik, Malaysia cekikikan, jam terlihat.
- Baris 12 (jam 16.57), 13 (Singapura panik).
- Amplop besar (shot lebar), lalu pintu terbuka (16.58) dan kertas keluar.
- Baris 14 di shot jendela: truk memanaskan mesin.
- Baris 15 sampai "Selesai!" (16.59), shot lebar, semua kaget.

**47,5 dtk: gengsi dan rekor**
- Baris 16: Filipina bersedekap.
- Baris 17: HUD kalkulator menghitung 0 → 168, BOOM, guncang, flash.
- Insert "REKOR DUNIA" berisi nama lengkap dan cap "168 HURUF", dengan keterangan "tercatat di Guinness World Records" (tanpa logo).
- Insert "ARTINYA?":
  - Krung Thep = Kota Para Malaikat
  - Mahanakhon = Kota Agung
  - Noppharat = Sembilan Permata
- Insert kaset "KRUNG THEP MAHA NAKHON · Asanee–Wasan · 1989".

**69,7 dtk: penutup**
- Baris 23: pil "Ongkir: 168 × per huruf = ???".
- Baris 24: kertas panjang ditarik keluar, amplop "KRUNG THEP" dicap.
- Baris 25.
- Klakson "TIIN!" (17.00), truk berangkat.
- Kartu FAKTANYA (narator) dengan baris tambahan: nama resmi berbahasa Inggris sejak 2022.

**90,2 dtk: kartu akhir**
- "PANJANG NAMA IBU KOTA ASEAN": Jakarta 7, Manila 6, Hà Nội 5, Kuala Lumpur 11.
- Batang Bangkok* tumbuh sampai menembus tepi kartu, dengan label "168!".
- Footnote sumber, lalu crossfade ke hook.

## Watermark
- Teks `Youtube : @semenitilmu`, satu per adegan.
- Posisi per jenis shot:
  - close-up: lambris (y 600);
  - shot lebar / antrean / pintu / jendela: lantai (y 1500);
  - two-shot loket: (780, 330);
  - insert: (540, 205);
  - kartu fakta: (540, 1440);
  - kartu akhir: (540, 1660);
  - hook: (760, 1200), di celah antar lipatan kertas.
- Dicek dengan `?wmqc=1` di 23 titik. Baris 01 dipindah ke lantai supaya tidak menimpa jam.

## Audio
- Selisih level VO terhadap musik: 18–41 dB. Selisih VO terhadap SFX (>500 Hz): ≥27 dB.
- Musik sintesis (`src/mix_bangkok.py`):
  - groove sore + detak jam (hi-hat) yang makin rapat;
  - pizzicato "menulis", stab panik, string tegang saat kertas keluar pintu;
  - hening lalu riser hitung huruf → BOOM 168, fanfare rekor;
  - lonceng "artinya", groove kaset;
  - womp ongkir, klakson + perayaan;
  - bed hook untuk loop.

## Catatan verifikasi
- Pengucapan nama Thai oleh voice berbahasa Indonesia sudah dicek Whisper (mendekati), tapi belum oleh penutur asli.
- Baris 06: TTS mengucapkan "Selanjutnya" (bukan "Next"), dan subtitle mengikuti suara.
- Baris 16: Whisper tidak menangkap "Halah", jadi perlu dicek telinga.
- Lelucon "ongkos kirim per huruf" adalah fiksi.

## Revisi 1 (2026-11-08): hook pembuka dihapus
- `build.py`: `HOOK = 0`, `HOOKVO = []`. Semua cue bergeser −2,2 dtk.
- `scene_bangkok.js`: teaser dimatikan (`op = 0`), flash pembuka dihapus, dan watermark posisi loop dihapus.
- Kartu akhir tampil sampai akhir video.
- Frame 0 sekarang shot lebar kantor pos dengan jam 16.55.
- Subtitle 174 unit, 0 bermasalah. `cam_check` bersih.

## Revisi 2 (2026-11-08): perbaikan 1–9
1. **Cold open jam** (0–1,2 dtk): close-up jam dinding 16.54 → TIK → 16.55 (label kuning), papan "TRUK POS TERAKHIR 17.00" ikut terlihat. Kamera mundur ke shot lebar saat Singapura berteriak. Jam punya jarum detik baru yang berdetak tiap detik.
2. **Potongan jam** 1 dtk di 16.56 / 16.57 / 16.58 / 16.59 / 17.00 (cue `clk56`–`clk60` di `build.py`). Musik dihening dan diisi bunyi TIK sintesis (`tik()` di `src/mix_bangkok.py`).
3. **Reaksi penonton** saat Thailand menulis panjang (`cutTimes()` di scene):
   - baris 09: Singapura bosan, menopang dagu;
   - baris 12: Indonesia menguap, peregangan, "HOAAAM";
   - baris 15 (shot antrean): Vietnam melirik jam, Malaysia mengetuk meja, Filipina berkeringat.
4. **Kertas sampai truk**:
   - path kertas masuk ambang pintu;
   - di jendela, kertas (`HOME.vstrip`) terlihat masuk ke pintu belakang truk.
5. **Truk menyeret kertas**: saat berangkat, kertas memanjang mengikuti truk. Lalu potong ke shot Thailand: kertas tertarik habis, Thailand terseret sambil miring, muncul "SRETT!", lalu memantul balik. Kertas tidak lagi ditarik di baris 24. Kartu fakta mundur +1 dtk.
6. **Kertas**: lebar 60 → 84, tulisan 30 → 44 px.
7. **Amplop**: dipegang di depan perut (lengan a 235, skala 0,8), tidak lagi di samping kepala.
8. **Properti meja**:
   - di atas meja: tumpukan amplop, bantalan cap, gelas pulpen, kardus kecil, lem;
   - papan di depan meja ("TULIS ALAMAT SINGKAT!", "1 AMPLOP = 1 ALAMAT") dihapus atas permintaan user.
9. **Kaca loket**:
   - opacity 0,3, dengan lubang bicara melengkung (r 145); cincin logam dihapus (membingungkan), kacamata Singapura diperbesar (ER×1,2, jarak lensa +6);
   - Singapura membesar 1,07× (condong) di tiap barisnya.

**Perbaikan tambahan:**
- Pulpen Thailand tidak lagi menyentuh mata Singapura. Lengan menulis diperpendek (a −30, len 0,55), dan di baris 08 lengan turun sementara Singapura hanya condong +15.
- Watermark:
  - pembuka (540, 205);
  - potongan jam (540, 205);
  - reaksi SG (780, 600), ID (780, 1500), antrean (780, 1500);
  - klakson/seretan (780, 1500), supaya tidak menimpa kertas.

**QC:** subtitle 174 unit, 0 bermasalah. `cam_check` bersih. Snapshot `build/qc5`–`qc9` dan watermark `build/wm7`–`wm8` sudah dicek. Mix: selisih VO terhadap SFX ≥ 27 dB.
