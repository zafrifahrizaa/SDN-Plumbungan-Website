# Spesifikasi Desain UI

Dokumen ini menggantikan `DESAIN.md` lama. Isi lama berasal dari referensi visual website properti (menu "Real Estect", search bar tiga segmen, "gambar rumah"). Di sini referensi itu diterjemahkan menjadi desain untuk sekolah dasar, dengan palet warna dan bentuk dasar yang sama.

Token (bagian 2) adalah satu-satunya sumber nilai visual. Kode tidak boleh memakai warna, ukuran, atau bayangan di luar token.

## Daftar Isi

1. [Arah desain](#1-arah-desain)
2. [Token](#2-token)
3. [Layout dan responsif](#3-layout-dan-responsif)
4. [Foto, ikon, dan gerak](#4-foto-ikon-dan-gerak)
5. [Komponen](#5-komponen)
6. [Halaman publik](#6-halaman-publik)
7. [Halaman admin](#7-halaman-admin)
8. [State dan teks antarmuka](#8-state-dan-teks-antarmuka)
9. [Aksesibilitas](#9-aksesibilitas)
10. [Daftar periksa anti-template](#10-daftar-periksa-anti-template)
11. [Perubahan dari DESAIN lama](#11-perubahan-dari-desain-lama)

---

## 1. Arah desain

**Konsep: papan pengumuman sekolah yang rapi.** Hangat seperti kertas dan kapur, hijau seperti halaman sekolah, dan penuh foto kegiatan siswa yang asli. Pengguna utamanya orang tua dengan ponsel dan anak SD, jadi hal pertama yang dicapai adalah **kejelasan**: apa saja kegiatannya, kapan, dan bagaimana mendaftar.

Prinsip:

1. **Foto asli di depan.** Kekuatan halaman ini adalah wajah dan kegiatan SDN Plumbungan, bukan ilustrasi atau dekorasi.
2. **Informasi sebelum hiasan.** Hari, jam, kuota, dan tombol daftar selalu terbaca tanpa perlu menebak.
3. **Satu ciri khas, bukan banyak.** Ciri khasnya adalah *label hari* berwarna kuning pada tiap kegiatan (seperti label nama di buku) dan *papan jadwal* mingguan. Selebihnya tenang.
4. **Ramah anak, bukan kekanak-kanakan.** Bentuk membulat dan warna hangat, tetapi teks tetap seperti sekolah yang dipercaya orang tua.
5. **Ponsel dulu.** Dirancang pada layar 360 px, lalu diperluas.

## 2. Token

### 2.1 Warna

Palet hijau dari desain lama dipertahankan. Dua perubahan: teks redup digelapkan karena `#6B7A65` pada `#F2F6EF` hanya mencapai kontras 4,18:1 (di bawah 4,5:1 untuk teks biasa), dan ditambahkan satu warna hangat sebagai aksen.

| Token | Nilai | Dipakai untuk | Kontras |
| --- | --- | --- | --- |
| `--color-primary` | `#4A7A3C` | Tombol utama, aksen aktif | Putih di atasnya 5,07:1 |
| `--color-primary-hover` | `#3F6B32` | Hover tombol, tautan teks | Putih 6,25:1; di atas kertas 5,84:1 |
| `--color-primary-dark` | `#2D4A22` | Judul hijau tua, footer, fokus | Putih 9,93:1 |
| `--color-ink` | `#1A2415` | Teks utama dan judul | Di atas putih 16,07:1 |
| `--color-muted` | `#55634F` | Paragraf sekunder, placeholder, meta | 5,85:1 di sage; 6,39:1 di putih |
| `--color-paper` | `#FBF7EC` | Latar halaman (hangat) | — |
| `--color-sage` | `#F2F6EF` | Latar selang-seling antarbagian | — |
| `--color-sage-deep` | `#DCE8D3` | Chip, hover baris tabel | `primary-dark` di atasnya 7,82:1 |
| `--color-surface` | `#FFFFFF` | Card, navbar, input | — |
| `--color-line` | `#DDE6D5` | Garis tipis pemisah | Dekoratif |
| `--color-marigold` | `#F2B632` | Label hari, penanda kuota | `ink` di atasnya 8,81:1 |
| `--color-marigold-soft` | `#FBF1D2` | Latar badge "menunggu" | `marigold-ink` 6,13:1 |
| `--color-marigold-ink` | `#7A5200` | Teks di atas `marigold-soft` | — |
| `--color-danger` | `#B3361F` | Teks dan ikon galat | 6,06:1 di putih |
| `--color-danger-soft` | `#FDE9D9` | Latar badge "ditolak" dan alert galat | `danger-ink` 6,57:1 |
| `--color-danger-ink` | `#8A3B12` | Teks di atas `danger-soft` | — |

Aturan pemakaian:

- Latar halaman memakai `paper`. Bagian selang-seling memakai `sage`. Card selalu `surface`.
- `marigold` hanya untuk label hari, penanda kuota, dan sorotan kecil. Tidak untuk tombol besar, tidak untuk latar seluruh bagian.
- Tidak ada gradasi sebagai hiasan. Satu-satunya gradasi yang boleh adalah *scrim* gelap di atas foto hero agar teks terbaca (bagian 6.1).
- Tidak ada kode warna per ekskul. Delapan warna berbeda membuat halaman seperti pelangi dan tidak menambah informasi.
- Makna tidak boleh hanya dibawa warna. Status selalu disertai teks.

### 2.2 Tipografi

| Peran | Font | Catatan |
| --- | --- | --- |
| Judul | **Baloo 2** (600, 700) | Membulat dan ramah, tetap tegas |
| Isi, tombol, formulir | **Plus Jakarta Sans** (400, 500, 600, 700) | Mudah dibaca, dirancang di Indonesia |
| Cadangan | `system-ui, sans-serif` | Dipakai saat font belum termuat |

Font di-host sendiri lewat `next/font`. Hanya subset Latin dan bobot yang disebut di atas.

| Tingkat | Ukuran (fluid) | Bobot | Tinggi baris |
| --- | --- | --- | --- |
| H1 hero | `clamp(2.25rem, 1.6rem + 3vw, 3.5rem)` (36–56 px) | 700 | 1,1 |
| H2 bagian | `clamp(1.75rem, 1.4rem + 1.5vw, 2.25rem)` (28–36 px) | 600 | 1,2 |
| H3 card | `1.25rem` (20 px) | 600 | 1,35 |
| Lead | `1.125rem` (18 px) | 400 | 1,6 |
| Isi | `1rem` (16 px) | 400 | 1,65 |
| Label, tombol | `0.9375rem` (15 px) | 600 | 1,2 |
| Kecil | `0.875rem` (14 px) | 400 | 1,5 |

- Ukuran isi tidak pernah di bawah 16 px di ponsel. Input formulir 16 px agar iOS tidak memperbesar layar.
- Teks kecil (14 px) hanya untuk informasi pelengkap, bukan hari, jam, atau galat.
- Angka pada tabel dan jadwal memakai `font-variant-numeric: tabular-nums`.
- Huruf kapital semua hanya untuk label hari yang pendek. Kalimat memakai huruf kapital gaya kalimat biasa.
- Lebar baris paragraf maksimal ±65 karakter.

### 2.3 Spasi, bentuk, bayangan

| Token | Nilai |
| --- | --- |
| `--space-1` … `--space-10` | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 px |
| `--space-section` | 64 px di ponsel, 96 px di desktop |
| `--radius-sm` | 12 px (input, chip persegi) |
| `--radius-md` | 16 px (alert, dialog) |
| `--radius-lg` | 24 px (card, foto hero, foto bagian sambutan) |
| `--radius-pill` | 999 px (tombol, chip, badge) |
| `--radius-circle` | 50% |
| `--shadow-soft` | `0 12px 32px rgba(26, 36, 21, 0.08)` |
| `--shadow-lift` | `0 16px 40px rgba(26, 36, 21, 0.12)` (hover card) |

Bayangan memakai warna `ink`, bukan hitam murni, agar tampak hangat. Card selain berbayang juga memiliki garis `1px solid var(--color-line)`. Desain lama menyebut "tanpa border", tetapi pemisahan hanya dengan bayangan lemah di layar murah sulit terlihat.

### 2.4 Berkas token

```css
/* src/styles/tokens.css — satu-satunya tempat nilai visual didefinisikan */
:root {
  --color-primary: #4A7A3C;
  --color-primary-hover: #3F6B32;
  --color-primary-dark: #2D4A22;
  --color-ink: #1A2415;
  --color-muted: #55634F;
  --color-paper: #FBF7EC;
  --color-sage: #F2F6EF;
  --color-sage-deep: #DCE8D3;
  --color-surface: #FFFFFF;
  --color-line: #DDE6D5;
  --color-marigold: #F2B632;
  --color-marigold-soft: #FBF1D2;
  --color-marigold-ink: #7A5200;
  --color-danger: #B3361F;
  --color-danger-soft: #FDE9D9;
  --color-danger-ink: #8A3B12;

  --font-heading: "Baloo 2", system-ui, sans-serif;
  --font-body: "Plus Jakarta Sans", system-ui, sans-serif;

  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 999px;
  --radius-circle: 50%;

  --shadow-soft: 0 12px 32px rgba(26, 36, 21, 0.08);
  --shadow-lift: 0 16px 40px rgba(26, 36, 21, 0.12);
}
```

Jika memakai Tailwind v4, petakan ke `@theme`; jika v3, ke `theme.extend`. Agen tidak boleh menambah warna di luar daftar ini tanpa memperbarui dokumen ini.

## 3. Layout dan responsif

- Kontainer: lebar maksimal 1200 px, rata tengah, padding samping 20 px (ponsel), 32 px (tablet ke atas).
- Titik henti: ponsel < 768 px, tablet 768–1023 px, desktop ≥ 1024 px. Desain dimulai dari 360 px.
- Teks rata kiri. Rata tengah hanya untuk judul bagian yang berdiri sendiri dan halaman keadaan kosong.
- Jarak antarbagian memakai `--space-section`.

| Elemen | Ponsel | Tablet | Desktop |
| --- | --- | --- | --- |
| Navbar | Logo + hamburger; menu membuka panel layar penuh | Logo + hamburger | Horizontal: logo kiri, tautan tengah, "Cek Status" dan "Daftar Sekarang" kanan |
| Grid card ekskul | 1 kolom | 2 kolom | **4 kolom** |
| Papan jadwal | Daftar per hari (akordeon) | Daftar per hari | Enam kolom Senin–Sabtu |
| Bagian sambutan | Foto di atas, teks di bawah | Sama | Dua kolom 1:1 |
| Formulir | 1 kolom | 1 kolom, lebar maksimal 640 px | Dua kolom: formulir dan panel ringkasan ekskul |

Grid card memakai 4 kolom, bukan 3 seperti desain lama, karena ada 8 ekskul: 4×2 rata, sedangkan 3 kolom menyisakan baris terakhir yang tidak penuh.

Detail ekskul di ponsel memiliki **bilah daftar tetap di bawah layar** berisi sisa kuota dan tombol "Daftar Sekarang", karena tombol itu adalah tujuan utama halaman.

## 4. Foto, ikon, dan gerak

**Foto**
- Hanya foto asli kegiatan SDN Plumbungan. Jangan memakai foto stok, hasil generasi AI, atau gambar dari internet.
- Rasio: hero 16:9 (ponsel 4:5), card 4:3, galeri 4:3. Gunakan `object-fit: cover` dan atur titik fokus agar wajah tidak terpotong.
- Teks alternatif menjelaskan kegiatan ("Siswa kelas 4 berlatih gerakan dasar karate di aula"), bukan "foto karate".
- Jika foto belum ada: blok `sage-deep` dengan huruf awal nama ekskul besar (Baloo 2, `primary-dark`) dan label "Foto menyusul". Jangan mengisi dengan ilustrasi generik.
- Foto yang memperlihatkan wajah siswa hanya dipakai jika izin dari orang tua/wali sudah ada.

**Ikon**
- Lucide, goresan 1,75 px, ukuran 20 px (24 px untuk target sentuh). Warna mengikuti teks.
- Ikon hanya dipakai bila membantu pengenalan (menu, panah, kalender, lokasi, unduh). Tidak ada ikon di dalam lingkaran berwarna sebagai hiasan di atas judul card. Tidak ada emoji sebagai ikon.

**Gerak**
- Hover card: naik 2 px dan berganti ke `--shadow-lift`, 180 ms `ease-out`. Tekan tombol: skala 0,98.
- Skeleton saat memuat boleh berkilau pelan.
- Tidak ada animasi gulir, paralaks, atau elemen yang melayang-layang tanpa tujuan.
- Semua gerakan dimatikan atau dibuat statis saat `prefers-reduced-motion: reduce`.

## 5. Komponen

### 5.1 Tombol

| Varian | Tampilan | Pemakaian |
| --- | --- | --- |
| Utama | Latar `primary`, teks putih, kapsul | Satu aksi utama per tampilan: "Daftar Sekarang", "Kirim Pendaftaran" |
| Sekunder | Latar putih, garis `primary` 1,5 px, teks `primary-hover`, kapsul | "Lihat Detail", aksi pendukung |
| Di atas foto | Garis dan teks putih, latar transparan | Tombol kedua pada hero |
| Bahaya | Latar `danger`, teks putih | "Tolak" (setelah konfirmasi) |

- Tinggi 48 px (ponsel dan desktop), padding horizontal 24–32 px. Admin boleh 40 px pada tabel yang padat, tetapi target sentuh tidak di bawah 40 px.
- Hover `primary-hover`. Fokus: cincin 3 px `primary-dark` dengan jarak 2 px (putih di atas foto gelap). Nonaktif: latar `sage-deep`, teks `muted`, disertai keterangan alasan di dekatnya.
- Status memuat: teks berubah ("Mengirim…") dan tombol tidak dapat ditekan dua kali.

### 5.2 Label hari (ciri khas)

Kapsul kecil berlatar `marigold`, teks `ink` 13 px bobot 700, huruf kapital: **SELASA · 15.30**. Pada card ekskul ditempatkan menumpuk di sudut kiri bawah foto. Jika ekskul punya dua jadwal, tampilkan dua label. Pada halaman jadwal dan detail dipakai lagi dengan bentuk yang sama.

### 5.3 Card ekskul

Urutan dari atas: foto 4:3 (sudut atas `radius-lg`) → label hari menumpuk pada foto → H3 nama → deskripsi maksimal 2 baris → baris meta (pembina; sisa kuota) → dua tombol.

- Nama dan foto menjadi satu tautan ke detail. Tombol **Lihat Detail** (sekunder) dan **Daftar** (utama) berada di bawah dan tidak bersarang di dalam tautan.
- Sisa kuota ditulis sebagai teks: "Sisa 5 dari 20 kursi". Jika ≤ 20% tersisa, teks diberi penanda `marigold-soft`. Jika 0: "Kuota penuh", tombol Daftar nonaktif, tombol Lihat Detail tetap aktif.
- Jika pendaftaran ditutup: tombol Daftar nonaktif dengan keterangan "Pendaftaran ditutup".
- Latar `surface`, `radius-lg`, `--shadow-soft`, garis `--color-line`.

### 5.4 Pita informasi (pengganti search bar)

Panel putih kapsul besar yang menumpuk di batas bawah hero. Isinya tiga sel yang dipisah garis tipis vertikal dan satu tombol di ujung kanan:

`8 ekstrakurikuler │ Pendaftaran dibuka s.d. 31 Juli │ Kegiatan Senin–Sabtu │ [Daftar Sekarang]`

Semua nilai berasal dari database. Pada ponsel, panel menjadi tumpukan vertikal tanpa bentuk kapsul. Search bar dari desain lama dihapus karena hanya ada delapan ekskul; mencari di antara delapan card lebih lambat daripada melihatnya.

### 5.5 Papan jadwal

- Desktop: enam kolom (Senin–Sabtu) sebagai kolom papan. Setiap kegiatan adalah blok kecil berisi jam (angka tabular), nama ekskul, dan lokasi. Kolom kosong tertulis "Tidak ada kegiatan".
- Ponsel: daftar per hari, hari ini terbuka pertama.
- Blok kegiatan berlatar putih dengan garis kiri 4 px `marigold`.

### 5.6 Kolom formulir

- Label **selalu di atas** kolom dan terlihat. Placeholder hanya contoh isian, tidak menggantikan label.
- Tinggi input 48 px, `radius-sm`, garis `1.5px` `muted` pada kondisi normal, `primary-dark` saat fokus, `danger` saat galat.
- Teks bantuan di bawah label (14 px, `muted`). Pesan galat di bawah input dengan ikon dan teks, berwarna `danger`, dan dihubungkan dengan `aria-describedby`.
- Kolom wajib ditandai dengan kata "(wajib)", bukan hanya tanda bintang. Kolom opsional ditandai "(opsional)".
- Persetujuan: kotak centang besar (24 px) dengan teks lengkap yang dapat diklik.

### 5.7 Badge status

Kapsul berisi teks. Warna melengkapi, tidak menggantikan, teks.

| Status | Latar | Teks |
| --- | --- | --- |
| Menunggu Verifikasi | `marigold-soft` | `marigold-ink` |
| Diverifikasi | `sage-deep` | `primary-dark` |
| Diterima | `primary` | putih |
| Ditolak | `danger-soft` | `danger-ink` |

### 5.8 Alert

Kotak `radius-md` dengan ikon, judul pendek, dan satu kalimat penjelasan. Varian: info (`sage`), berhasil (`sage-deep`), peringatan (`marigold-soft`), galat (`danger-soft`). Galat tingkat formulir diberi `role="alert"` dan fokus dipindahkan ke sana.

### 5.9 Navbar dan footer

- Navbar: logo sekolah dan nama "SDN Plumbungan" di kiri. Tautan: **Beranda, Ekstrakurikuler, Jadwal, Galeri, Kritik & Saran**. Kanan: tautan teks **Cek Status** dan tombol utama **Daftar Sekarang**. Tautan aktif ditandai garis bawah 2 px, bukan hanya warna.
- Di atas hero pada Beranda, navbar transparan dengan teks putih di atas scrim. Di halaman lain dan setelah gulir, navbar putih solid. Tidak ada animasi mengecil saat gulir.
- Footer: latar `primary-dark`, teks `sage`. Berisi logo, alamat, nomor WhatsApp bantuan, tautan media sosial, tautan Tentang Sekolah dan Cek Status.

## 6. Halaman publik

### 6.1 Beranda

Urutan bagian dan latar:

1. **Hero** (foto asli kegiatan). Foto penuh dengan sudut bawah `radius-lg` di dalam kontainer. Scrim: gradasi dari `rgba(26,36,21,0.72)` di kiri ke transparan di ±70% (di ponsel dari bawah ke atas). Teks rata kiri: H1 **"Ayo Kembangkan Bakatmu!"**, satu kalimat pengantar ("Delapan kegiatan ekstrakurikuler SDN Plumbungan. Lihat jadwalnya, pilih yang kamu suka, lalu daftar dari rumah."), dua tombol: **Lihat Ekstrakurikuler** (utama) dan **Daftar Sekarang** (di atas foto). Tinggi 520–600 px di desktop, ±480 px di ponsel.
2. **Pita informasi** (5.4), menumpuk di batas hero.
3. **Sambutan** (latar `paper`). Dua kolom: foto kegiatan 4:5 dengan badge bulat `primary-dark` bertuliskan "8 Ekskul" di sudut; kanan H2 "Temukan kegiatan yang kamu suka", teks sambutan dari sekolah (maks 80 kata), tombol **Lihat Semua Ekskul** dan **Cek Status Pendaftaran**.
4. **Pilih ekskul** (latar `sage`). H2 rata tengah, grid 4 kolom card (5.3).
5. **Jadwal pekan ini** (latar `paper`). Papan jadwal (5.5) dan tautan "Lihat jadwal lengkap".
6. **Cara mendaftar** (latar `sage`). Daftar bernomor empat langkah: *Pilih ekskul → Isi formulir → Tunggu verifikasi guru → Cek status dengan nomor pendaftaran.* Nomor ditulis besar dalam Baloo 2 berwarna `primary`, teks di sampingnya. Bukan kartu berikon.
7. **Galeri** (latar `paper`), enam foto terbaru. Disembunyikan bila belum ada foto.
8. **Kritik dan saran**, satu baris ajakan dengan tombol sekunder. Bukan bagian besar.
9. Footer.

### 6.2 Ekstrakurikuler

Judul halaman, baris chip filter hari (Semua, Senin … Sabtu; chip aktif `primary` dengan teks putih), lalu grid card. Jika filter tidak menghasilkan apa-apa: keadaan kosong dengan tombol "Tampilkan semua".

### 6.3 Detail ekstrakurikuler

Foto lebar penuh di atas (galeri kecil bila ada lebih dari satu). Di bawahnya dua kolom (desktop): kiri berisi deskripsi, tujuan, persyaratan, dokumentasi; kanan berisi **panel ringkas** (menempel saat gulir) dengan pembina, jadwal (label hari), lokasi, kuota (teks + bilah tipis), dan tombol **Daftar Sekarang**. Ponsel: panel menjadi blok setelah deskripsi, ditambah bilah tetap di bawah layar (bagian 3).

### 6.4 Jadwal

Papan jadwal (5.5) ditambah tabel di bawahnya untuk pembaca yang lebih suka daftar: Ekskul, Hari, Waktu, Lokasi, Pembina. Tabel punya `caption` dan dapat digulir horizontal di dalam wadahnya pada layar sempit.

### 6.5 Formulir pendaftaran

- Satu halaman, satu kolom, empat kelompok berjudul: **Data siswa, Data orang tua/wali, Pilihan ekskul, Persetujuan**. Tidak ada wizard, karena formulirnya pendek.
- Jika datang dari tombol Daftar pada suatu ekskul, pilihan sudah terisi dan ringkasan ekskul (foto kecil, hari, kuota tersisa) tampil di panel samping.
- Di atas formulir: satu kalimat penjelasan dan pemberitahuan privasi singkat dengan tautan.
- Tombol "Kirim Pendaftaran" berada di akhir. Saat galat, ringkasan galat tampil di atas dengan tautan ke kolom yang bermasalah.

### 6.6 Pendaftaran berhasil

Judul "Pendaftaran Berhasil!", lalu **nomor pendaftaran** dalam kotak besar (Baloo 2, `primary-dark`, mudah ditangkap layar) dengan tombol "Salin nomor". Badge status "Menunggu Verifikasi". Teks: "Simpan nomor ini. Kamu dan orang tua bisa mengecek hasilnya di halaman Cek Status." Dua tombol: **Cek Status** dan **Kembali ke Beranda**.

### 6.7 Cek status

Dua kolom isian (Nomor pendaftaran, NIS/NISN) dan tombol "Cek Status". Hasil: badge status besar, nama ekskul, tanggal, dan catatan admin bila ada. Galat: "Nomor pendaftaran atau NIS/NISN tidak cocok. Periksa kembali, lalu coba lagi."

### 6.8 Kritik dan saran, Galeri, Tentang

- **Kritik dan saran:** formulir pendek satu kolom dengan pilihan kategori berupa chip pilihan tunggal.
- **Galeri:** chip filter per ekskul, grid 4:3 yang konsisten (tanpa masonry), klik membuka dialog dengan foto besar, caption, tanggal, dan ekskul. Foto dimuat malas.
- **Tentang:** satu kolom teks rapi dengan foto sekolah, alamat, peta tautan, kontak.

## 7. Halaman admin

Admin dipakai oleh guru di komputer sekolah dan kadang ponsel. Tampilan lebih padat dan tenang daripada situs publik, tanpa foto hero, tanpa label hari kuning, tetapi memakai token yang sama.

- **Rangka:** sidebar kiri 240 px (latar `primary-dark`, teks `sage`) berisi menu Dashboard, Ekstrakurikuler, Jadwal, Pendaftar, Kritik dan Saran, Galeri, serta nama pengguna dan "Keluar". Di ponsel menjadi bilah atas dengan laci. Latar konten `sage`. Teks isi 15–16 px.
- **Login:** satu card di tengah, latar `sage`, logo sekolah, email, kata sandi (dengan tombol tampilkan), tombol "Masuk". Galat tidak menyebutkan mana yang salah.
- **Dashboard:**
  - Satu baris lima angka tanpa ikon dan tanpa gradasi: Total ekskul, Total pendaftar, **Menunggu verifikasi** (latar `marigold-soft` karena butuh tindakan), Diterima, Ditolak. Angka besar (Baloo 2, tabular), label di bawah.
  - Di bawahnya dua panel: **Perlu diverifikasi** (10 terbaru, tiap baris berisi nama, kelas, ekskul, waktu, tautan "Buka") dan **Keterisian kuota** (satu baris per ekskul: nama, bilah tipis, "12 / 20").
  - Tidak ada grafik dekoratif.
- **Data pendaftar:** bilah penyaring (cari nama/NIS/nomor, pilih status, pilih ekskul), tabel dengan kolom Nomor, Nama, Kelas, Ekskul, Tanggal, Status. Baris 48 px, header menempel, hover `sage-deep`, 20 baris per halaman. Di ponsel setiap baris menjadi card ringkas. Keadaan kosong: "Belum ada pendaftar yang cocok."
- **Detail pendaftar:** kolom kiri memuat seluruh data (dikelompokkan seperti formulir), kolom kanan **panel tindakan** dengan badge status terkini, tombol hanya untuk transisi yang diizinkan (Verifikasi, Terima, Tolak, dst.), dan kolom catatan. **Tolak** membuka dialog konfirmasi dengan kolom catatan opsional. Setelah tindakan, tampilkan alert berhasil dan siapa/kapan perubahan dicatat.
- **Kelola ekskul dan jadwal:** daftar dengan tombol "Tambah", formulir di halaman terpisah (bukan dialog bertingkat). Unggah foto dengan pratinjau, petunjuk ukuran, dan pesan galat yang jelas. Tombol "Hapus" meminta konfirmasi dengan menyebut nama item.
- Semua tombol aksi menyatakan hasilnya ("Simpan perubahan", "Tolak pendaftaran"), bukan "OK".

## 8. State dan teks antarmuka

### 8.1 State wajib untuk setiap komponen dan halaman

| State | Perilaku |
| --- | --- |
| Memuat | Skeleton berukuran sama dengan konten; tombol menampilkan teks proses |
| Kosong | Satu kalimat penjelasan dan satu aksi lanjutan |
| Galat | Pesan jelas, penyebab dalam bahasa biasa, langkah berikutnya; tidak menyalahkan pengguna |
| Berhasil | Konfirmasi tegas dan langkah berikutnya |
| Nonaktif | Terlihat berbeda dan disertai alasan |
| Fokus dan hover | Terlihat jelas dan konsisten |

### 8.2 Gaya bahasa

- Bahasa Indonesia yang ramah dan lugas. Halaman publik menyapa siswa dengan **kamu**; bagian untuk orang tua (formulir, persetujuan, privasi) memakai **Bapak/Ibu**.
- Kalimat pendek. Satu ide per kalimat. Tidak ada kata asing yang tidak perlu ("registrasi" → "pendaftaran", "submit" → "kirim").
- Tanda seru hanya pada slogan dan "Pendaftaran Berhasil!".
- Format tanggal: **15 Oktober 2026**. Waktu: **15.30 WIB**. Hari ditulis lengkap.
- Dilarang: lorem ipsum, testimoni atau angka karangan, frasa kosong seperti "wujudkan potensi tanpa batas". Jika belum ada data, tulis apa adanya atau sembunyikan bagian itu.

### 8.3 Contoh teks

| Konteks | Teks |
| --- | --- |
| Tombol utama | Daftar Sekarang · Kirim Pendaftaran · Cek Status |
| Kuota penuh | Kuota penuh. Kamu masih bisa melihat detail kegiatan ini. |
| Pendaftaran ditutup | Pendaftaran ditutup. Tanyakan ke pembina jika ada pertanyaan. |
| Duplikat | Siswa dengan NIS/NISN ini sudah terdaftar di kegiatan ini. Cek statusnya di halaman Cek Status. |
| WhatsApp tidak valid | Nomor WhatsApp tidak valid. Contoh: 081234567890 |
| Galat server | Pendaftaran belum terkirim. Data kamu belum hilang, coba kirim lagi beberapa saat lagi. |
| Kosong (pendaftar) | Belum ada pendaftar yang cocok dengan pencarian ini. |
| Kosong (galeri) | Foto kegiatan akan segera hadir. |
| Setelah kirim kritik/saran | Terima kasih. Masukanmu sudah kami terima. |

## 9. Aksesibilitas

Target WCAG 2.1 AA.

- Semua teks memenuhi kontras pada tabel bagian 2.1. Jangan menambah kombinasi warna teks baru tanpa menghitung kontrasnya.
- Semua fungsi dapat dipakai dengan keyboard. Urutan fokus mengikuti urutan baca. Cincin fokus selalu terlihat.
- Satu `<h1>` per halaman; heading berurutan; landmark (`header`, `nav`, `main`, `footer`) dipakai benar. Tersedia tautan "Lewati ke konten".
- Kolom formulir memiliki `<label>` terhubung; galat dikaitkan lewat `aria-describedby`.
- Target sentuh minimal 44×44 px (40 px diizinkan hanya pada tabel admin padat).
- Gambar bermakna memiliki teks alternatif; gambar dekoratif memakai `alt=""`.
- Hormati `prefers-reduced-motion` dan perbesar teks hingga 200% tanpa kehilangan konten.

## 10. Daftar periksa anti-template

Desain yang dibuat otomatis cenderung memiliki ciri generik yang cepat dikenali. Sebelum sebuah halaman dianggap selesai, periksa semua poin ini. Jika ada yang gagal, perbaiki; jangan dijadikan pengecualian.

| Hindari | Gantinya |
| --- | --- |
| Gradasi ungu/biru, teks bergradasi, atau lingkaran kabur dekoratif | Warna datar dari token; satu-satunya gradasi adalah scrim hero |
| Kaca buram (glassmorphism), cahaya neon | Permukaan putih solid dengan garis tipis |
| Tiga kartu fitur identik dengan ikon di lingkaran | Daftar bernomor, papan jadwal, atau konten nyata |
| Emoji sebagai ikon atau dekorasi | Lucide secukupnya, atau tanpa ikon |
| Foto stok anak tersenyum, ilustrasi hasil AI | Foto asli kegiatan SDN Plumbungan |
| Hero "Welcome to…" dengan kalimat promosi kosong | Slogan sekolah dan kalimat yang memberi tahu apa yang bisa dilakukan |
| Semua elemen berpusat, semua sudut `rounded-2xl`, semua bayangan `shadow-xl` | Rata kiri, tiga ukuran radius dari token, dua bayangan dari token |
| Angka dan testimoni karangan ("10.000+ siswa") | Angka yang dihitung dari database, atau tidak ditampilkan |
| Dashboard penuh grafik acak dan kartu KPI berikon | Lima angka polos, daftar tindakan, dan bilah kuota |
| Komponen pustaka dengan tema bawaan tak tersentuh | Semua komponen memakai token; jika memakai shadcn/ui, ganti seluruh variabel temanya |
| Animasi masuk di setiap bagian saat gulir | Gerak hanya pada hover, fokus, dan memuat |
| Lorem ipsum dan nama "John Doe" | Data contoh yang masuk akal dan ditandai "contoh" |

Uji cepat: tutup logo dan teks. Jika halaman ini bisa menjadi situs sekolah, kursus, atau perusahaan lain tanpa perubahan berarti, desainnya terlalu generik. Foto, label hari, papan jadwal, dan bahasa sekolah harus tetap menjadikannya SDN Plumbungan.

## 11. Perubahan dari DESAIN lama

| Desain lama (referensi properti) | Sekarang |
| --- | --- |
| Menu "Home, Fuid, Real Estect, Counch" | Beranda, Ekstrakurikuler, Jadwal, Galeri, Kritik & Saran |
| Tombol "Getuch" dan "Compic 1" | "Daftar Sekarang" dan "Cek Status" |
| Ikon pencarian di navbar | Dihapus; hanya ada delapan ekskul |
| Search bar mengambang tiga segmen | Pita informasi mengambang (5.4) |
| Gambar rumah dengan badge | Foto kegiatan dengan badge "8 Ekskul" |
| Judul "10 Whialalgy…" | "Pilih ekskul" |
| Grid card 3 kolom | 4 kolom di desktop (8 kartu = 2 baris rata) |
| Teks redup `#6B7A65` | `#55634F` (kontras memenuhi AA) |
| Latar `#F2F6EF` untuk semua bagian bawah | `paper` untuk halaman, `sage` selang-seling |
| Font Poppins/Nunito/Quicksand (pilih salah satu) | Baloo 2 (judul) + Plus Jakarta Sans (isi) |
| "Tanpa border" | Garis tipis `--color-line` ditambahkan pada card |
| Perkiraan ("estimasi") di banyak nilai | Nilai pasti pada token |
| Halaman lain tidak dirancang | Detail, formulir, berhasil, cek status, admin, state, dan aksesibilitas ditambahkan |
