# PRD: Website Informasi dan Pendaftaran Ekstrakurikuler SDN Plumbungan

> **"Ayo Kembangkan Bakatmu!"**

| | |
| --- | --- |
| Produk | Website Informasi dan Pendaftaran Ekstrakurikuler SDN Plumbungan |
| Platform | Website (responsif, mobile-first) |
| Pengguna | Siswa, orang tua/wali, guru/pembina, admin sekolah |
| Versi produk | MVP 1.0 |
| Versi dokumen | 1.1 (Oktober 2026) |
| Dokumen terkait | [`DESAIN.md`](./DESAIN.md), [`TEKNIS.md`](./TEKNIS.md), [`RENCANA-BUILD.md`](./RENCANA-BUILD.md) |

## Daftar Isi

1. [Ringkasan](#1-ringkasan)
2. [Masalah dan tujuan](#2-masalah-dan-tujuan)
3. [Pengguna](#3-pengguna)
4. [Ekstrakurikuler](#4-ekstrakurikuler)
5. [Struktur situs](#5-struktur-situs)
6. [Fitur](#6-fitur)
7. [Aturan bisnis](#7-aturan-bisnis)
8. [Validasi formulir pendaftaran](#8-validasi-formulir-pendaftaran)
9. [Status pendaftaran](#9-status-pendaftaran)
10. [Alur pengguna](#10-alur-pengguna)
11. [Kebutuhan fungsional](#11-kebutuhan-fungsional)
12. [Kebutuhan non-fungsional](#12-kebutuhan-non-fungsional)
13. [Entitas data](#13-entitas-data)
14. [Ruang lingkup](#14-ruang-lingkup)
15. [Metrik keberhasilan](#15-metrik-keberhasilan)
16. [Definition of Done](#16-definition-of-done)
17. [Risiko](#17-risiko)
18. [Pertanyaan terbuka untuk sekolah](#18-pertanyaan-terbuka-untuk-sekolah)
19. [Lampiran: data yang dibutuhkan dari sekolah](#19-lampiran-data-yang-dibutuhkan-dari-sekolah)

---

## Riwayat revisi (v1.0 → v1.1)

Perubahan dari draf awal, supaya mudah dilacak:

- Daftar yang sebelumnya menjadi paragraf lepas dirapikan menjadi poin-poin.
- **Prioritas diselaraskan dengan MVP.** FR-10 dan FR-11 (kelola ekskul dan jadwal) naik dari P1 ke P0, karena MVP dan Definition of Done mewajibkannya.
- **Ditambah:** halaman cek status (FR-15), halaman Tentang Sekolah (FR-16), dan login admin (FR-17). Draf awal tidak punya cara bagi orang tua untuk melihat hasil verifikasi, dan tidak punya FR untuk autentikasi admin.
- **Ditambah:** aturan bisnis, validasi per kolom, tabel transisi status, kebutuhan privasi data anak, aksesibilitas, risiko, dan pertanyaan terbuka.
- Metrik keberhasilan dibuat terukur.
- Kolom data yang tertulis di formulir tetapi hilang dari tabel (jenis kelamin, tanggal lahir, email, persetujuan) dilengkapi. Skema lengkap ada di `TEKNIS.md`.
- Warna utama tidak lagi "menyesuaikan identitas sekolah"; nilainya ditetapkan di `DESAIN.md`.

---

## 1. Ringkasan

Website ini memusatkan informasi kegiatan ekstrakurikuler SDN Plumbungan dan menyediakan pendaftaran online. Siswa atau orang tua dapat melihat jenis kegiatan, jadwal, pembina, lokasi, kuota, dan persyaratan, lalu mendaftar langsung dari ponsel. Pihak sekolah memakai halaman admin untuk mengelola data ekskul, jadwal, pendaftar, kritik dan saran, serta dokumentasi kegiatan.

Alur utama:

`Informasi ekskul → Detail → Jadwal → Pendaftaran online → Verifikasi admin → Cek status`

## 2. Masalah dan tujuan

### Masalah

- Informasi ekskul tersebar di pengumuman, poster, dan penyampaian lisan guru, sehingga siswa dan orang tua sulit melihat semua pilihan.
- Jadwal dan detail kegiatan belum terpusat.
- Pendaftaran manual membuat pendataan kurang terstruktur dan memakan waktu.
- Sekolah belum punya cara yang rapi untuk mengelola data peserta.

### Tujuan

- Menyediakan informasi lengkap dan terpusat tentang ekskul SDN Plumbungan.
- Memudahkan siswa dan orang tua memilih kegiatan.
- Mempermudah pendaftaran dan membuatnya lebih terstruktur.
- Membantu sekolah mengelola peserta dan status pendaftaran.
- Menyediakan jadwal dan dokumentasi kegiatan dalam satu tempat.

### Bukan tujuan (MVP 1.0)

- Pembayaran atau iuran.
- Absensi dan penilaian peserta.
- Akun login untuk siswa atau orang tua.
- Notifikasi otomatis (WhatsApp/email). Orang tua mengecek status lewat halaman cek status.
- Aplikasi mobile native.

## 3. Pengguna

| Pengguna | Kebutuhan |
| --- | --- |
| **Siswa** | Melihat daftar dan detail ekskul, jadwal, pembina, lokasi; mendaftar. |
| **Orang tua/wali** | Melihat informasi, jadwal, persyaratan; membantu pendaftaran; memberi persetujuan; memantau status. |
| **Admin/guru** | Mengelola ekskul, jadwal, pendaftar, status, kritik dan saran, galeri. |

Orang tua kemungkinan besar mengakses lewat ponsel Android dengan sinyal yang tidak selalu bagus. Hal ini menjadi dasar keputusan desain dan performa.

## 4. Ekstrakurikuler

Delapan kegiatan: **Banjar, Karate, Lukis, Pramuka, Tari, Teater, Voli, Tahfidz.**

Setiap kegiatan punya halaman dengan deskripsi, tujuan, pembina, jadwal, lokasi, kuota, persyaratan, dan dokumentasi. Isi per kegiatan disediakan sekolah (lihat [Lampiran](#19-lampiran-data-yang-dibutuhkan-dari-sekolah)).

## 5. Struktur situs

| Halaman | Rute | Akses | Prioritas |
| --- | --- | --- | --- |
| Beranda | `/` | Publik | P0 |
| Daftar ekstrakurikuler | `/ekstrakurikuler` | Publik | P0 |
| Detail ekstrakurikuler | `/ekstrakurikuler/[slug]` | Publik | P0 |
| Jadwal | `/jadwal` | Publik | P0 |
| Formulir pendaftaran | `/daftar` | Publik | P0 |
| Pendaftaran berhasil | `/daftar/berhasil` | Publik | P0 |
| Cek status | `/cek-status` | Publik | P0 |
| Kritik dan saran | `/kritik-saran` | Publik | P1 |
| Galeri | `/galeri` | Publik | P2 |
| Tentang sekolah | `/tentang` | Publik | P1 |
| Login admin | `/admin/login` | Publik | P0 |
| Dashboard admin | `/admin` | Admin | P0 |
| Data pendaftar (daftar dan detail) | `/admin/pendaftar` | Admin | P0 |
| Kelola ekstrakurikuler | `/admin/ekstrakurikuler` | Admin | P0 |
| Kelola jadwal | `/admin/jadwal` | Admin | P0 |
| Kritik dan saran (admin) | `/admin/kritik-saran` | Admin | P1 |
| Kelola galeri | `/admin/galeri` | Admin | P2 |

## 6. Fitur

### 6.1 Beranda

- Logo dan nama sekolah.
- Hero dengan slogan "Ayo Kembangkan Bakatmu!" dan dua tombol: "Lihat Ekstrakurikuler" dan "Daftar Sekarang".
- Pita informasi: jumlah ekskul, status/batas pendaftaran, hari kegiatan (dihitung dari data, bukan ditulis manual).
- Daftar ekskul dalam bentuk card.
- Ringkasan jadwal per hari.
- Panduan singkat cara mendaftar.
- Galeri kegiatan (disembunyikan jika belum ada foto).
- Ajakan mengirim kritik dan saran.
- Informasi media sosial sekolah di footer.

### 6.2 Daftar ekstrakurikuler

Card per ekskul berisi foto, nama, deskripsi singkat, hari/jam kegiatan, sisa kuota, tombol **Lihat Detail** dan **Daftar**. Pengunjung dapat menyaring berdasarkan hari.

### 6.3 Detail ekstrakurikuler

Nama, foto kegiatan, deskripsi, tujuan, pembina, jadwal, lokasi, kuota dan sisa kuota, persyaratan (termasuk batas kelas bila ada), dokumentasi, tombol **Daftar Sekarang**.

### 6.4 Jadwal

| Informasi | Keterangan |
| --- | --- |
| Nama ekstrakurikuler | Nama kegiatan |
| Hari | Hari pelaksanaan |
| Waktu | Mulai dan selesai |
| Lokasi | Tempat kegiatan |
| Pembina | Guru/pembina |

Satu ekskul boleh punya lebih dari satu jadwal (misalnya dua hari seminggu). Admin mengubah jadwal lewat dashboard.

### 6.5 Tentang sekolah

Halaman statis berisi profil singkat SDN Plumbungan, alamat, kontak, dan tautan media sosial. Isi disediakan sekolah.

### 6.6 Pendaftaran online

Alur: `Pilih ekskul → Daftar → Isi formulir → Validasi → Submit → Pendaftaran berhasil → Menunggu verifikasi → Diterima atau Ditolak`

**Data siswa:** nama lengkap, NIS/NISN, kelas, jenis kelamin, tanggal lahir.
**Data orang tua/wali:** nama, nomor WhatsApp, email (opsional).
**Data ekskul:** pilihan kegiatan, alasan mengikuti (opsional).
**Persetujuan:** orang tua/wali menyetujui pendaftaran.

Setelah berhasil, sistem menampilkan "Pendaftaran Berhasil!", **nomor pendaftaran**, dan **status**. Halaman ini juga mengingatkan orang tua untuk menyimpan nomor tersebut.

### 6.7 Cek status pendaftaran

Pengunjung memasukkan nomor pendaftaran dan NIS/NISN untuk melihat status terkini dan catatan dari admin (misalnya alasan penolakan). Pesan galat tidak menyebutkan kolom mana yang salah.

### 6.8 Kritik dan saran

Kolom: nama, kelas, kategori, isi, kontak (opsional). Kategori: Ekstrakurikuler, Jadwal, Website, Fasilitas, Lainnya.

### 6.9 Galeri

Foto kegiatan dengan nama ekskul, tanggal, dan caption. Admin dapat menambah, mengubah, menghapus, dan mengelompokkan foto per ekskul. Foto yang memperlihatkan wajah siswa hanya diunggah jika sekolah sudah memiliki izin dari orang tua/wali.

### 6.10 Dashboard admin

Ringkasan: total ekskul, total pendaftar, menunggu verifikasi, diterima, ditolak. Ditambah daftar pendaftar yang perlu diverifikasi dan keterisian kuota per ekskul.

| Menu | Fungsi |
| --- | --- |
| Dashboard | Ringkasan data |
| Kelola Ekstrakurikuler | Tambah, ubah, hapus, unggah foto, ubah kuota, buka/tutup pendaftaran |
| Kelola Jadwal | Tambah, ubah, hapus jadwal |
| Data Pendaftar | Lihat, cari, saring, lihat detail, verifikasi, terima, tolak |
| Kritik dan Saran | Baca masukan pengguna |
| Galeri | Kelola dokumentasi |

## 7. Aturan bisnis

| ID | Aturan |
| --- | --- |
| BR-01 | Nomor pendaftaran berformat `EKS-<tahun>-<urut 4 digit>` (contoh `EKS-2026-0001`), unik, dan dibuat oleh server. |
| BR-02 | Satu NIS/NISN tidak boleh memiliki dua pendaftaran aktif pada ekskul yang sama di tahun ajaran yang sama. Pendaftaran berstatus **Ditolak** tidak dihitung aktif, sehingga siswa boleh mendaftar ulang. |
| BR-03 | Kuota terisi = jumlah pendaftaran berstatus Menunggu Verifikasi, Diverifikasi, atau Diterima. Jika terisi ≥ kuota, pendaftaran baru ditolak dengan pesan jelas. Pengecekan dan penyimpanan terjadi dalam satu langkah atomik supaya aman dari pendaftar bersamaan. |
| BR-04 | Ekskul dapat memiliki batas kelas minimal/maksimal. Pendaftaran di luar batas ditolak sistem. |
| BR-05 | Ekskul yang tidak aktif tidak tampil. Ekskul aktif dengan pendaftaran ditutup tetap tampil, tetapi tombol Daftar nonaktif dengan keterangan. |
| BR-06 | Setiap pendaftaran mencatat tahun ajaran aktif. Tahun ajaran diatur admin. |
| BR-07 | Setiap perubahan status mencatat siapa yang mengubah dan kapan. |
| BR-08 | Data pendaftar tidak dapat dihapus lewat antarmuka di MVP. Pergantian tahun ajaran ditangani dengan arsip. |
| BR-09 | Jumlah ekskul per siswa **tidak dibatasi sistem** di MVP (lihat pertanyaan terbuka Q-02). |

## 8. Validasi formulir pendaftaran

Validasi dilakukan di klien (untuk kenyamanan) **dan** di server (yang menentukan).

| Kolom | Aturan | Contoh pesan galat |
| --- | --- | --- |
| Nama siswa | Wajib; 3–100 karakter; huruf, spasi, titik, apostrof, tanda hubung | "Nama lengkap siswa wajib diisi." |
| NIS/NISN | Wajib; hanya angka; 4–10 digit | "NIS/NISN hanya boleh berisi angka." |
| Kelas | Wajib; 1–6 | "Pilih kelas siswa." |
| Jenis kelamin | Wajib; L atau P | "Pilih jenis kelamin." |
| Tanggal lahir | Wajib; tanggal lampau; usia 5–15 tahun | "Tanggal lahir tidak valid." |
| Nama orang tua/wali | Wajib; 3–100 karakter | "Nama orang tua/wali wajib diisi." |
| Nomor WhatsApp | Wajib; format Indonesia (`08…`, `62…`, `+62…`); disimpan dalam format `62…` | "Nomor WhatsApp tidak valid. Contoh: 081234567890" |
| Email | Opsional; format email valid | "Format email belum benar." |
| Ekstrakurikuler | Wajib; aktif; pendaftaran dibuka; kelas sesuai | "Pilih ekstrakurikuler." |
| Alasan | Opsional; maksimal 300 karakter | "Alasan maksimal 300 karakter." |
| Persetujuan | Wajib dicentang | "Persetujuan orang tua/wali diperlukan untuk mendaftar." |

Galat bisnis dari server: duplikat (BR-02), kuota penuh (BR-03), kelas tidak sesuai (BR-04), pendaftaran ditutup (BR-05). Semuanya ditampilkan dengan bahasa yang jelas dan tanpa menyalahkan pengguna.

## 9. Status pendaftaran

Status: **Menunggu Verifikasi**, **Diverifikasi**, **Diterima**, **Ditolak**.

Alur normal: `Menunggu Verifikasi → Diverifikasi → Diterima atau Ditolak`

| Dari | Ke yang diizinkan |
| --- | --- |
| Menunggu Verifikasi | Diverifikasi, Ditolak |
| Diverifikasi | Diterima, Ditolak, Menunggu Verifikasi |
| Diterima | Diverifikasi |
| Ditolak | Diverifikasi |

Transisi mundur disediakan agar admin bisa memperbaiki salah klik. Memindahkan pendaftaran keluar dari **Ditolak** mengecek ulang kuota (BR-03). Admin dapat menambahkan catatan yang tampil di halaman cek status.

## 10. Alur pengguna

**Siswa/orang tua:**
`Beranda → Ekstrakurikuler → Pilih ekskul → Lihat detail → Daftar → Isi formulir → Submit → Pendaftaran berhasil (catat nomor) → Cek status`

**Admin:**
`Login → Dashboard → Data pendaftar → Detail pendaftar → Verifikasi → Terima atau Tolak → Status diperbarui`

## 11. Kebutuhan fungsional

Legenda prioritas: **P0** wajib MVP 1.0 · **P1** rilis 1.1, segera setelah MVP · **P2** setelahnya.

| ID | Kebutuhan | Prioritas | Kriteria penerimaan singkat |
| --- | --- | --- | --- |
| FR-01 | Menampilkan daftar ekskul | P0 | 8 ekskul aktif tampil dengan foto, nama, jadwal, sisa kuota |
| FR-02 | Menampilkan detail ekskul | P0 | Semua kolom pada 6.3 tampil; slug tidak ditemukan menampilkan halaman 404 |
| FR-03 | Menampilkan jadwal | P0 | Jadwal per hari tampil dan sesuai data admin |
| FR-04 | Pendaftaran online | P0 | Pendaftaran valid menghasilkan nomor dan status |
| FR-05 | Validasi data pendaftaran | P0 | Semua aturan pada bagian 8 ditegakkan di server |
| FR-06 | Menyimpan pendaftaran ke database | P0 | Data tersimpan; kuota dan duplikat aman terhadap pendaftar bersamaan |
| FR-07 | Admin melihat data pendaftar | P0 | Tabel dengan pencarian (nama, NIS, nomor), filter status dan ekskul, halaman detail |
| FR-08 | Admin memverifikasi pendaftaran | P0 | Status berubah ke Diverifikasi, tercatat siapa dan kapan |
| FR-09 | Admin mengubah status | P0 | Hanya transisi yang diizinkan pada bagian 9 |
| FR-10 | Admin mengelola ekskul | P0 | Tambah, ubah, hapus/nonaktifkan, unggah foto, ubah kuota |
| FR-11 | Admin mengelola jadwal | P0 | Tambah, ubah, hapus; perubahan langsung tampil di situs publik |
| FR-12 | Kritik dan saran | P1 | Form terkirim dan terbaca di admin |
| FR-13 | Menampilkan galeri | P2 | Foto tampil dengan ekskul, tanggal, caption |
| FR-14 | Admin mengelola galeri | P2 | Tambah, ubah, hapus, kelompokkan per ekskul |
| FR-15 | Cek status pendaftaran | P0 | Nomor + NIS yang cocok menampilkan status; yang tidak cocok menampilkan galat umum |
| FR-16 | Halaman Tentang Sekolah | P1 | Konten dari sekolah tampil |
| FR-17 | Login dan proteksi admin | P0 | Rute `/admin/*` tidak dapat dibuka tanpa login |

## 12. Kebutuhan non-fungsional

**Performa**
- Halaman publik terasa cepat di ponsel Android kelas menengah dengan koneksi 4G.
- Gambar dioptimalkan (format modern, ukuran sesuai layar, lazy loading).
- Target awal: Lighthouse mobile Performance ≥ 80 pada Beranda dan Daftar Ekskul.

**Responsif**
- Berfungsi di smartphone, tablet, laptop, dan desktop. Dirancang mobile-first.

**Keamanan**
- Admin wajib login; halaman admin dilindungi otorisasi di sisi server.
- Kata sandi disimpan dalam bentuk hash oleh penyedia autentikasi, tidak pernah dalam teks biasa.
- Data pendaftar tidak dapat dibaca publik.
- Semua input divalidasi di server; keluaran di-escape untuk mencegah XSS.
- Formulir publik dilindungi dari spam (honeypot dan pembatasan laju). Rinciannya di `TEKNIS.md`.
- Kunci rahasia tidak masuk repositori atau kode klien.

**Privasi data anak**
- Data yang dikumpulkan dibatasi pada yang dibutuhkan untuk pendaftaran. Email dan alasan bersifat opsional.
- Formulir memuat pemberitahuan singkat: data apa yang dikumpulkan, untuk apa, siapa yang dapat melihat, dan berapa lama disimpan.
- Persetujuan orang tua/wali dicatat bersama waktu persetujuan.
- Data siswa tidak tampil di halaman publik dan tidak masuk log aplikasi.
- Tidak memakai pelacak pihak ketiga pada halaman publik.
- UU Pelindungan Data Pribadi mengatur pemrosesan data anak. Pihak sekolah sebaiknya memastikan kebijakan retensi dan izin foto sebelum peluncuran.

**Aksesibilitas**
- Target WCAG 2.1 level AA: kontras teks, navigasi keyboard, label formulir yang terhubung, teks alternatif gambar, target sentuh minimal 44 px, menghormati pengaturan "kurangi gerakan".

**Kompatibilitas**
- Dua versi terakhir Chrome, Edge, Firefox, Safari; Chrome Android dan Samsung Internet; iOS Safari 15 ke atas.

## 13. Entitas data

Ringkasan tingkat bisnis. Tipe data, constraint, dan relasi ada di [`TEKNIS.md`](./TEKNIS.md).

| Entitas | Data utama |
| --- | --- |
| Profil pengguna admin | nama, email, role (kata sandi dikelola penyedia autentikasi) |
| Ekstrakurikuler | nama, slug, deskripsi, tujuan, pembina, lokasi, kuota, batas kelas, persyaratan, foto, aktif, pendaftaran dibuka |
| Jadwal | ekskul, hari, jam mulai, jam selesai, lokasi |
| Pendaftaran | nomor, tahun ajaran, data siswa (nama, NIS/NISN, kelas, jenis kelamin, tanggal lahir), data wali (nama, WhatsApp, email), ekskul, alasan, persetujuan dan waktunya, status, catatan admin, pengubah terakhir, waktu |
| Kritik dan saran | nama, kelas, kategori, pesan, kontak, tanggal |
| Galeri | ekskul, foto, caption, tanggal kegiatan |
| Pengaturan | tahun ajaran aktif, batas pendaftaran, kontak, alamat, media sosial |

## 14. Ruang lingkup

**MVP 1.0 (wajib):**
- Beranda, daftar ekskul, detail ekskul, jadwal.
- Formulir pendaftaran dengan validasi, pengecekan duplikat dan kuota, penyimpanan data.
- Halaman berhasil dan cek status.
- Login admin, dashboard, data pendaftar, verifikasi, terima/tolak.
- Kelola ekskul dan kelola jadwal.

**Rilis 1.1:** kritik dan saran, tentang sekolah.
**Rilis 1.2:** galeri dan kelola galeri.
**Setelahnya:** ekspor Excel, notifikasi WhatsApp, konfirmasi email, QR Code pendaftaran, statistik pendaftar, impor daftar siswa untuk memvalidasi NIS.

## 15. Metrik keberhasilan

Target awal; sesuaikan bersama sekolah.

- Minimal 4 dari 5 orang tua/guru uji dapat menyelesaikan pendaftaran tanpa dipandu dalam waktu ≤ 5 menit.
- Admin dapat memverifikasi dan menerima satu pendaftaran dalam ≤ 1 menit setelah membuka detailnya.
- Nol pendaftaran ganda dan nol pendaftaran melebihi kuota, termasuk pada uji pendaftar bersamaan.
- Halaman publik dapat dipakai di layar 360 px tanpa gulir horizontal.
- Seluruh pendaftaran periode pertama tercatat di sistem, bukan di kertas.

## 16. Definition of Done

- Delapan ekskul aktif beserta informasi dan jadwal yang benar dari sekolah.
- Siswa dapat mendaftar; validasi, duplikat, kuota, dan kelas berfungsi di server.
- Nomor pendaftaran dan status tampil; cek status berfungsi.
- Admin dapat login, melihat pendaftar, menerima/menolak, serta mengelola ekskul dan jadwal.
- Rute admin tidak dapat diakses tanpa login; data pendaftar tidak dapat dibaca publik.
- Berfungsi di smartphone dan desktop; lolos pemeriksaan aksesibilitas dasar.
- Tidak ada bug kritis; uji coba pengguna (UAT) dengan guru dan orang tua selesai.
- Panduan singkat untuk admin tersedia dan akun admin sekolah sudah dibuat.

## 17. Risiko

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Konten dari sekolah terlambat | Desain dan uji tidak realistis | Mulai pengumpulan konten sejak awal; pakai data contoh yang jelas bertanda "contoh" selama pengembangan |
| Pendaftar palsu mengisi kuota | Siswa asli tidak kebagian | Honeypot, pembatasan laju, verifikasi admin, opsi impor daftar siswa (P2) |
| Orang tua kehilangan nomor pendaftaran | Tidak bisa cek status | Halaman berhasil menonjolkan nomor dan menyarankan tangkapan layar; guru dapat mencari lewat NIS |
| Foto siswa tanpa izin | Masalah privasi | Aturan izin foto sebelum unggah (6.9) |
| Admin tidak terbiasa memakai sistem | Data tidak terkelola | UI admin sederhana, panduan singkat, pelatihan 30 menit |
| Hosting gratis menghentikan proyek karena tidak aktif | Situs mati saat dibutuhkan | Periksa kebijakan paket saat setup; siapkan penjadwalan aktivitas atau paket berbayar (lihat `TEKNIS.md`) |

## 18. Pertanyaan terbuka untuk sekolah

| ID | Pertanyaan | Default sementara |
| --- | --- | --- |
| Q-01 | Apakah "Banjar" berarti **Banjari** (rebana/shalawat)? Penulisan resmi apa yang dipakai? | Ditulis "Banjar" sesuai draf |
| Q-02 | Apakah siswa boleh mengikuti lebih dari satu ekskul? Jika dibatasi, berapa? | Tidak dibatasi sistem |
| Q-03 | Apakah ada batas kelas untuk tiap ekskul (misalnya Pramuka mulai kelas 3)? | Tidak ada batas |
| Q-04 | Format NIS di sekolah: berapa digit? Apakah orang tua hafal NIS/NISN anaknya? | Angka 4–10 digit |
| Q-05 | Kapan periode pendaftaran dibuka dan ditutup? | Admin mengatur manual |
| Q-06 | Siapa admin yang ditunjuk, dan berapa akun yang dibutuhkan? | Satu atau dua akun |
| Q-07 | Apakah sekolah punya izin foto dari orang tua? Bagaimana kebijakannya? | Foto wajah hanya jika izin ada |
| Q-08 | Berapa lama data pendaftar disimpan, dan apa yang dilakukan saat tahun ajaran berganti? | Diarsipkan per tahun ajaran |
| Q-09 | Domain apa yang akan dipakai? Apakah sekolah sudah punya domain `sch.id`? | Subdomain gratis sementara |
| Q-10 | Siapa yang menjawab pertanyaan orang tua yang kesulitan mendaftar (nomor kontak bantuan)? | Nomor WhatsApp sekolah di footer |

## 19. Lampiran: data yang dibutuhkan dari sekolah

Untuk **setiap** dari 8 ekskul:

- Nama resmi dan deskripsi singkat (maksimal 2 kalimat) serta tujuan kegiatan.
- Nama pembina.
- Hari, jam mulai, jam selesai, lokasi (bisa lebih dari satu jadwal).
- Kuota peserta dan batas kelas bila ada.
- Persyaratan (perlengkapan, seragam, izin orang tua).
- 1–3 foto asli kegiatan, landscape, resolusi minimal 1600 px sisi panjang, dengan izin penggunaan.

Untuk sekolah:

- Logo resmi (SVG atau PNG resolusi tinggi), nama dan alamat lengkap.
- Nomor WhatsApp bantuan dan akun media sosial.
- Teks sambutan singkat (maksimal 80 kata) dan profil singkat untuk halaman Tentang.
- Tahun ajaran aktif dan tanggal pendaftaran.
- Nama dan email admin.
