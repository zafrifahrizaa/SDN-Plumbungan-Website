# Website Ekstrakurikuler SDN Plumbungan

> **"Ayo Kembangkan Bakatmu!"**

Website untuk memusatkan informasi kegiatan ekstrakurikuler SDN Plumbungan dan menerima pendaftaran secara online. Siswa dan orang tua dapat melihat kegiatan, jadwal, dan persyaratan, lalu mendaftar dari ponsel. Guru mengelola ekskul, jadwal, dan pendaftar lewat halaman admin.

**Status:** tahap perencanaan selesai, kode belum dimulai. Versi produk: MVP 1.0.

## Ekstrakurikuler

Banjar · Karate · Lukis · Pramuka · Tari · Teater · Voli · Tahfidz

## Yang dibangun pada MVP 1.0

- Beranda, daftar ekskul, detail ekskul, dan jadwal.
- Formulir pendaftaran dengan validasi, pengecekan duplikat, dan pengecekan kuota.
- Halaman berhasil (nomor pendaftaran) dan cek status.
- Dashboard admin: lihat pendaftar, verifikasi, terima, tolak.
- Kelola ekskul dan jadwal.

Setelah MVP: kritik dan saran, tentang sekolah, galeri, ekspor Excel, notifikasi WhatsApp. Rincian ada di PRD.

## Dokumentasi

Setiap hal punya **satu** tempat. Hindari menyalin isi antar dokumen.

| Dokumen | Isi |
| --- | --- |
| [`docs/PRD.md`](docs/PRD.md) | Kebutuhan produk, fitur, aturan bisnis, validasi, kebutuhan fungsional dan non-fungsional, pertanyaan terbuka |
| [`docs/DESAIN.md`](docs/DESAIN.md) | Arah desain, token, komponen, halaman, state, aksesibilitas |
| [`docs/TEKNIS.md`](docs/TEKNIS.md) | Stack, arsitektur, skema database, RLS, keamanan, deploy, pengujian |
| [`docs/RENCANA-BUILD.md`](docs/RENCANA-BUILD.md) | Fase pembangunan dengan kriteria selesai |
| [`AGENTS.md`](AGENTS.md) | Aturan untuk agen AI (Antigravity dan sejenisnya) |

Bila dokumen saling bertentangan, urutan yang berlaku: PRD → TEKNIS → DESAIN → RENCANA-BUILD.

## Stack

Next.js (App Router) + TypeScript · Tailwind CSS · Supabase (PostgreSQL, Auth, Storage) · Zod + React Hook Form · Vitest + Playwright · Vercel. Alasan dan alternatifnya ada di [`docs/TEKNIS.md`](docs/TEKNIS.md).

## Struktur repositori

```
.
├── AGENTS.md
├── README.md
├── docs/                     PRD, DESAIN, TEKNIS, RENCANA-BUILD
├── .agents/
│   ├── skills/               panduan UI yang dimuat agen saat mengerjakan tampilan
│   └── workflows/            perintah /kerjakan-fase dan /cek-kualitas
├── src/                      (dibuat di Fase 0)
├── supabase/                 migrasi dan seed (dibuat di Fase 1)
└── tests/
```

## Mengerjakan proyek dengan Antigravity

1. Buka folder repositori ini sebagai workspace di Antigravity. Agen otomatis membaca `AGENTS.md`.
2. Jalankan perintah `/kerjakan-fase 0`. Agen membaca dokumen, merencanakan, mengerjakan, memverifikasi, lalu berhenti untuk ditinjau.
3. Tinjau hasilnya. Jika sesuai, lanjut `/kerjakan-fase 1`, dan seterusnya sampai Fase 8.
4. Sebelum menutup fase, jalankan `/cek-kualitas`.

Daftar fase dan kriteria selesai ada di [`docs/RENCANA-BUILD.md`](docs/RENCANA-BUILD.md).

## Prasyarat

- Node.js versi LTS.
- Akun GitHub, Supabase, dan Vercel.
- Supabase CLI (untuk migrasi).

## Menjalankan proyek

1. Salin berkas lingkungan:
   ```bash
   cp .env.example .env.local
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) pada peramban.

4. Perintah pemeriksaan kualitas:
   - **Lint**: `npm run lint`
   - **Typecheck**: `npm run typecheck`
   - **Tes Unit**: `npm run test`
   - **Build Produksi**: `npm run build`

## Konten dari sekolah

Pengembangan membutuhkan data asli dari sekolah (pembina, jadwal, kuota, foto asli, logo). Daftarnya ada di [PRD Lampiran 19](docs/PRD.md#19-lampiran-data-yang-dibutuhkan-dari-sekolah). Selama data belum ada, data contoh dipakai dan ditandai "contoh".

## Lisensi

Belum ditentukan. Tetapkan bersama pihak sekolah sebelum repositori dipublikasikan, terutama karena aset (logo dan foto) milik sekolah.
