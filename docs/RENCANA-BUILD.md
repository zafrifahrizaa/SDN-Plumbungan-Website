# Rencana Pembangunan

Rencana ini dibaca agen (Antigravity) dan manusia. Kerjakan **satu fase sekali jalan**, centang kotaknya setelah semua kriteria selesai, lalu berhenti untuk ditinjau. Jangan lompat fase.

Rujukan: [`PRD.md`](./PRD.md) · [`DESAIN.md`](./DESAIN.md) · [`TEKNIS.md`](./TEKNIS.md)

## Paralel sejak hari pertama: konten dari sekolah

Pengumpulan data pada [PRD Lampiran 19](./PRD.md#19-lampiran-data-yang-dibutuhkan-dari-sekolah) berjalan selama fase pengembangan. Selama data asli belum ada, `seed.sql` memakai data contoh yang **diberi tanda "contoh"** pada nama atau deskripsinya, supaya tidak ikut terbit tanpa sengaja.

---

## Fase 0: Fondasi

- [x] Inisialisasi Next.js + TypeScript strict + Tailwind; ESLint dan Prettier aktif.
- [x] Pasang token dari `DESAIN.md` bagian 2 ke `src/styles/tokens.css` dan tema Tailwind. Tidak ada warna heksadesimal di luar berkas ini.
- [x] Font Baloo 2 dan Plus Jakarta Sans lewat `next/font`.
- [x] Skrip `lint`, `typecheck`, `test`, `build` berjalan hijau.
- [x] `.env.example` dan `.gitignore` benar; tidak ada rahasia di repo.
- [x] Perbarui bagian "Menjalankan proyek" di `README.md` dengan perintah yang benar-benar berjalan, dan bagian "Perintah" di `AGENTS.md`.

**Selesai bila:** halaman kosong dengan token dan font tampil benar, semua skrip hijau.

## Fase 1: Database dan data awal

- [ ] Migrasi skema sesuai `TEKNIS.md` bagian 3, termasuk constraint dan indeks.
- [ ] RLS aktif di semua tabel dengan kebijakan sesuai bagian 5.
- [ ] Fungsi `daftar_ekskul` dan fungsi ubah status (bagian 4).
- [ ] `seed.sql`: 8 ekskul dan jadwal contoh, `pengaturan` awal.
- [ ] Tes integrasi fungsi database (semua cabang galat + pendaftar bersamaan).

**Selesai bila:** semua tes fungsi lolos; pengguna `anon` terbukti tidak dapat membaca `pendaftaran`.

## Fase 2: Komponen dasar dan layout

- [x] Komponen `Button`, `Chip` hari, `Badge` status, `Field`, `Alert`, `Card` ekskul, `Navbar`, `Footer` sesuai `DESAIN.md` bagian 5, lengkap dengan state hover, fokus, nonaktif, dan galat.
- [x] Navbar responsif dengan menu hamburger.
- [x] Halaman 404 dan halaman galat.

**Selesai bila:** semua komponen tampil benar di 360 px dan 1280 px; navigasi keyboard berfungsi. (FR: dasar untuk FR-01–03)

## Fase 3: Halaman informasi

- [x] Beranda dari data sungguhan (FR-01).
- [x] `/ekstrakurikuler` dengan filter hari (FR-01).
- [x] `/ekstrakurikuler/[slug]` (FR-02).
- [x] `/jadwal` (FR-03).

**Selesai bila:** semua halaman membaca dari database; kuota sisa benar; Lighthouse mobile Performance ≥ 80 pada Beranda.

## Fase 4: Pendaftaran

- [ ] `/daftar` dengan validasi klien dan server (FR-04, FR-05).
- [ ] Penyimpanan lewat `daftar_ekskul` (FR-06); semua galat bisnis ditampilkan dengan pesan dari PRD bagian 8.
- [ ] `/daftar/berhasil` dengan nomor dan status.
- [ ] `/cek-status` (FR-15).
- [ ] Honeypot dan pembatasan laju.

**Selesai bila:** tes E2E daftar sukses, duplikat, dan kuota penuh lolos.

## Fase 5: Admin inti

- [ ] Login admin dan proteksi rute di middleware **dan** di setiap action (FR-17).
- [ ] Dashboard dengan lima angka, daftar perlu verifikasi, dan keterisian kuota (FR-07).
- [ ] Tabel pendaftar dengan cari dan filter; halaman detail (FR-07).
- [ ] Verifikasi, terima, tolak dengan catatan (FR-08, FR-09).

**Selesai bila:** E2E admin login → verifikasi → terima lolos; `/admin` tanpa login diarahkan ke login.

## Fase 6: Kelola data

- [ ] Kelola ekskul dengan unggah foto dan buka/tutup pendaftaran (FR-10).
- [ ] Kelola jadwal (FR-11).
- [ ] Revalidasi cache halaman publik setelah perubahan.

**Selesai bila:** perubahan admin langsung terlihat di situs publik.

## Fase 7: Penguatan dan uji (akhir MVP 1.0)

- [ ] Audit aksesibilitas (kontras, keyboard, label, teks alternatif).
- [ ] Uji ponsel sungguhan dan koneksi lambat.
- [ ] Tinjau keamanan: RLS, header, log tanpa data pribadi, tidak ada kunci rahasia di klien.
- [ ] Ganti data contoh dengan data asli sekolah.
- [ ] UAT dengan 2–3 guru dan 2–3 orang tua tanpa dipandu.
- [ ] Panduan admin satu halaman.

**Selesai bila:** semua poin PRD bagian 16 terpenuhi.

## Fase 8: Peluncuran

- [ ] Deploy produksi; domain; akun admin sekolah dibuat, akun contoh dihapus.
- [ ] Periksa kebijakan hosting (TEKNIS bagian 8) dan atur backup.
- [ ] Umumkan lewat grup WhatsApp, poster dengan QR code, dan media sosial sekolah.

## Rilis 1.1 dan 1.2

- [ ] Kritik dan saran, publik dan admin (FR-12).
- [ ] Tentang sekolah (FR-16).
- [ ] Galeri publik dan kelola galeri (FR-13, FR-14).
- [ ] Ekspor Excel dan statistik bila diminta sekolah.
