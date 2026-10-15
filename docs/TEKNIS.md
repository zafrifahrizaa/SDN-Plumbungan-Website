# Dokumen Teknis

Dokumen ini menetapkan stack, arsitektur, skema database, dan aturan keamanan. Kebutuhan produk ada di [`PRD.md`](./PRD.md); tampilan di [`DESAIN.md`](./DESAIN.md). Jika dokumen ini bertentangan dengan PRD, PRD menang. Catat pertentangan itu dan perbaiki dokumennya.

## 1. Keputusan stack

| Bagian | Pilihan | Alasan |
| --- | --- | --- |
| Framework | **Next.js** (App Router) + **TypeScript** (strict) | Satu codebase untuk halaman publik dan admin; rendering server cepat di ponsel |
| Styling | **Tailwind CSS** | Token di `DESAIN.md` dipetakan langsung ke konfigurasi tema |
| Database, auth, storage | **Supabase** (PostgreSQL) | Auth admin, Row Level Security, dan penyimpanan foto sudah tersedia |
| Validasi | **Zod** + **React Hook Form** | Satu skema Zod dipakai klien dan server |
| Ikon | **Lucide** | Seragam, ringan |
| Font | Baloo 2 + Plus Jakarta Sans lewat `next/font` | Self-host, tanpa permintaan ke pihak ketiga |
| Pengujian | **Vitest** (logika) + **Playwright** (alur utama) | Lihat bagian 9 |
| Hosting | **Vercel** + Supabase wilayah **Singapura** | Latensi terdekat ke Indonesia |

Gunakan versi stabil terbaru saat inisialisasi dan baca dokumentasi resminya; jangan menulis API dari ingatan. Menambah dependensi di luar tabel ini perlu persetujuan pemilik proyek.

**Alternatif** bila sekolah memakai hosting cPanel: Laravel + MySQL + Filament. Keputusan ini diambil di Fase 0 dan tidak diubah di tengah jalan.

## 2. Arsitektur

- **Baca data publik** (ekskul, jadwal, galeri): Server Components memanggil Supabase dengan peran `anon`; hasil di-cache dan di-revalidate saat admin mengubah data.
- **Tulis data publik** (pendaftaran, kritik saran, cek status): Server Action atau Route Handler. Server memvalidasi dengan Zod, lalu memanggil fungsi database. Klien tidak pernah menulis langsung ke tabel.
- **Admin**: sesi Supabase Auth lewat cookie. Middleware memblokir `/admin/*` tanpa sesi, **dan** setiap Server Action admin memeriksa ulang sesi dan role. Middleware saja tidak cukup.
- **Dua klien Supabase**: klien sesi (untuk pengguna login) dan klien *service role* (hanya di modul server, berkas diberi `import "server-only"`). Kunci service role tidak boleh ada di variabel berawalan `NEXT_PUBLIC_`.

### Struktur folder target

```
src/
  app/
    (publik)/            beranda, ekstrakurikuler, jadwal, daftar, cek-status, ...
    admin/               login, dashboard, pendaftar, ekstrakurikuler, jadwal, ...
  components/
    ui/                  Button, Chip, Badge, Field, Alert, ...
    ekskul/ jadwal/ pendaftaran/ admin/
  lib/
    supabase/            server.ts, admin.ts, middleware helper
    validasi/            skema Zod (pendaftaran, kritik-saran, cek-status, ...)
    aturan/              logika murni: status, nomor, normalisasi WA (mudah diuji)
  styles/tokens.css      token dari DESAIN.md
supabase/
  migrations/            skema SQL berurutan
  seed.sql               8 ekskul contoh (ditandai contoh)
tests/
  unit/  e2e/
docs/
```

## 3. Skema database

Nama tabel dan kolom memakai Bahasa Indonesia mengikuti PRD. Semua tabel memakai `id` (uuid) dan `created_at` (timestamptz). Gunakan tipe `enum` Postgres atau `check` constraint untuk nilai tetap.

### `profil` (admin)

Kata sandi dikelola Supabase Auth (`auth.users`), jadi **tidak ada kolom password** di tabel ini. Hal ini menggantikan tabel `users` di draf awal dan tetap memenuhi syarat "kata sandi disimpan sebagai hash".

| Kolom | Catatan |
| --- | --- |
| `id` | FK ke `auth.users.id` |
| `nama` | wajib |
| `role` | `admin` atau `guru`. MVP: keduanya berhak penuh; kolom disiapkan untuk pembatasan nanti |

### `ekstrakurikuler`

| Kolom | Catatan |
| --- | --- |
| `nama` | wajib |
| `slug` | unik, huruf kecil, untuk URL |
| `deskripsi` | maks 2 kalimat untuk card |
| `tujuan` | teks panjang |
| `pembina` | wajib |
| `lokasi` | wajib |
| `kuota` | integer ≥ 0 |
| `kelas_min`, `kelas_maks` | integer 1–6, opsional, `kelas_min ≤ kelas_maks` |
| `persyaratan` | teks |
| `foto_path` | path di Storage, opsional |
| `aktif` | boolean, default true |
| `pendaftaran_dibuka` | boolean, default true |

### `jadwal`

| Kolom | Catatan |
| --- | --- |
| `ekskul_id` | FK ke `ekstrakurikuler`, `on delete cascade` |
| `hari` | enum Senin–Minggu |
| `jam_mulai`, `jam_selesai` | `time`; `jam_selesai > jam_mulai` |
| `lokasi` | opsional; jika kosong pakai lokasi ekskul |

### `pendaftaran`

| Kolom | Catatan |
| --- | --- |
| `nomor` | unik; format `EKS-<tahun>-<urut 4 digit>` |
| `tahun_ajaran` | teks, mis. `2026/2027` |
| `nama_siswa`, `nis`, `kelas`, `jenis_kelamin`, `tanggal_lahir` | sesuai PRD bagian 8 |
| `nama_wali`, `no_wa`, `email` | `no_wa` disimpan format `62…`; `email` opsional |
| `ekskul_id` | FK ke `ekstrakurikuler`, `on delete restrict` |
| `alasan` | opsional, maks 300 |
| `persetujuan` | boolean, harus true |
| `persetujuan_at` | timestamptz |
| `status` | enum: `menunggu_verifikasi`, `diverifikasi`, `diterima`, `ditolak`; default `menunggu_verifikasi` |
| `catatan_admin` | opsional; tampil di cek status |
| `diubah_oleh`, `diubah_pada` | FK ke `profil`, timestamptz |

**Constraint penting:**
- Unique parsial pada `(nis, ekskul_id, tahun_ajaran)` **where `status <> 'ditolak'`**. Ini menegakkan BR-02 di level database.
- Urutan nomor per tahun memakai tabel penghitung (`nomor_urut(tahun, terakhir)`) yang dikunci di dalam transaksi, atau sequence per tahun. Jangan memakai `max()+1` tanpa kunci.
- Indeks pada `status`, `ekskul_id`, `nis`, dan `nomor`.

### `kritik_saran`

`nama`, `kelas`, `kategori` (enum: ekstrakurikuler, jadwal, website, fasilitas, lainnya), `pesan`, `kontak` (opsional), `dibaca` (boolean).

### `galeri`

`ekskul_id` (FK), `foto_path`, `caption`, `tanggal_kegiatan`.

### `pengaturan`

Pasangan `kunci` (unik) dan `nilai` (jsonb): `tahun_ajaran_aktif`, `pendaftaran_buka_sampai`, `kontak_wa`, `alamat`, `media_sosial`, `teks_sambutan`.

## 4. Fungsi pendaftaran atomik

Seluruh proses pendaftaran dijalankan oleh **satu fungsi database** (misalnya `daftar_ekskul`) yang dipanggil server dengan hasil terstruktur (sukses atau kode galat). Langkahnya, dalam satu transaksi:

1. Kunci baris ekskul (`select … for update`).
2. Pastikan ekskul aktif dan `pendaftaran_dibuka`. Jika tidak → galat `DITUTUP`.
3. Cek batas kelas (BR-04). Jika di luar → `KELAS_TIDAK_SESUAI`.
4. Cek pendaftaran aktif yang sama (BR-02). Jika ada → `DUPLIKAT`.
5. Hitung terisi (BR-03). Jika terisi ≥ kuota → `KUOTA_PENUH`.
6. Buat nomor (BR-01) dan sisipkan baris dengan status `menunggu_verifikasi`.
7. Kembalikan `nomor` dan `status`.

Perubahan status oleh admin juga lewat fungsi yang menegakkan tabel transisi (PRD bagian 9) dan, saat keluar dari `ditolak`, mengecek ulang kuota dengan kunci yang sama.

Unit test menutup semua cabang galat, plus tes pendaftar bersamaan untuk memastikan kuota tidak terlewati.

## 5. Row Level Security

Aktifkan RLS pada **semua** tabel sejak migrasi pertama.

| Tabel | `anon` (publik) | Admin/guru login |
| --- | --- | --- |
| `ekstrakurikuler` | baca baris `aktif = true` | baca/tulis semua |
| `jadwal` | baca jadwal ekskul aktif | baca/tulis |
| `galeri` | baca | baca/tulis |
| `pengaturan` | baca kunci publik saja | baca/tulis |
| `pendaftaran` | **tidak ada akses langsung** | baca; ubah status lewat fungsi |
| `kritik_saran` | **tidak ada akses langsung** (tulis lewat server) | baca |
| `profil` | tidak ada | baca profil sendiri |

Halaman cek status dilayani server dengan klien service role dan hanya mengembalikan kolom aman: nomor, nama ekskul, status, catatan. Tidak mengembalikan data wali.

**Storage:** bucket foto ekskul/galeri boleh dibaca publik; unggah, ubah, dan hapus hanya admin. Batasi tipe (`jpeg`, `png`, `webp`) dan ukuran (maks 2 MB setelah dikecilkan).

## 6. Keamanan operasional

- **Spam:** kolom honeypot tersembunyi dan pembatasan laju per IP (di-hash, tidak disimpan mentah) untuk `/daftar`, `/cek-status`, `/kritik-saran`. Tambahkan CAPTCHA ramah privasi hanya jika spam terbukti terjadi.
- **Cek status:** pesan galat sama untuk nomor salah maupun NIS salah; batasi percobaan.
- **Header:** pasang header keamanan standar dan Content-Security-Policy yang sesuai dengan font self-host.
- **Log:** jangan mencatat nama, NIS, WhatsApp, atau isi formulir.
- **Rahasia:** `.env.local` tidak di-commit; sediakan `.env.example` tanpa nilai. Nama variabel Supabase mengikuti dokumentasi terbaru (kunci publik/anon dan kunci rahasia/service role).
- **Admin:** kata sandi kuat, pertimbangkan 2FA, tidak ada akun bawaan yang tersisa saat produksi.

## 7. Performa

- `next/image` dengan `sizes` yang benar; hero maks ±200 KB, foto card ±60 KB.
- Halaman publik di-cache dan di-revalidate saat admin menyimpan perubahan.
- Hindari JavaScript klien yang tidak perlu; komponen interaktif dibuat kecil (form, filter, menu).
- Font: hanya bobot yang dipakai, subset Latin.

## 8. Deploy dan operasional

- Vercel terhubung ke GitHub; setiap push ke cabang utama men-deploy ke produksi, dan setiap pull request mendapat pratinjau.
- Dua proyek Supabase dianjurkan: pengembangan dan produksi. Migrasi dijalankan lewat Supabase CLI.
- **Periksa saat setup** (kebijakan bisa berubah): (a) apakah paket gratis Supabase menjeda proyek yang tidak aktif, (b) apakah paket gratis menyediakan backup harian, (c) apakah syarat paket gratis Vercel mengizinkan penggunaan oleh sekolah. Jika ada yang bermasalah, pilih paket berbayar atau jadwalkan ekspor data berkala.
- Backup: ekspor berkala data `pendaftaran` dan simpan di tempat aman milik sekolah.
- Domain: awalnya subdomain gratis; pindah ke domain sekolah bila tersedia.

## 9. Strategi pengujian

| Jenis | Cakupan |
| --- | --- |
| Unit (Vitest) | Skema Zod; normalisasi nomor WhatsApp; format nomor pendaftaran; tabel transisi status |
| Integrasi | Fungsi `daftar_ekskul`: sukses, duplikat, kuota penuh, kelas tidak sesuai, ditutup, pendaftar bersamaan |
| E2E (Playwright) | Daftar sukses → cek status; daftar ganda ditolak; kuota penuh ditolak; admin login → verifikasi → terima; `/admin` tanpa login diarahkan ke login |
| Manual | Ponsel Android sungguhan, layar 360 px, koneksi lambat, pembaca layar dasar, Lighthouse |
