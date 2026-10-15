# AGENTS.md — Website Ekstrakurikuler SDN Plumbungan

Website informasi dan pendaftaran ekstrakurikuler untuk sebuah sekolah dasar. Pengguna: siswa SD, orang tua (kebanyakan lewat ponsel Android), dan guru. Data yang ditangani adalah **data pribadi anak**; perlakukan dengan hati-hati.

## Baca dulu (urutan berlaku jika bertentangan)

1. `docs/PRD.md`: apa yang dibangun, aturan bisnis (BR-xx), validasi, FR-xx.
2. `docs/TEKNIS.md`: stack, skema, RLS, keamanan.
3. `docs/DESAIN.md`: token, komponen, halaman, daftar periksa anti-template.
4. `docs/RENCANA-BUILD.md`: fase dan kriteria selesai.

Jangan membaca ulang semuanya di setiap tugas; baca bagian yang relevan. Jika menemukan pertentangan antar dokumen atau kebutuhan yang kurang jelas, **berhenti dan tanyakan**, jangan menebak. Jika sebuah keputusan harus berubah, perbarui dokumennya dalam perubahan yang sama.

## Stack (sudah diputuskan)

Next.js App Router + TypeScript strict · Tailwind CSS · Supabase (Postgres, Auth, Storage) · Zod + React Hook Form · Lucide · Vitest + Playwright · Vercel.

- Pakai versi stabil terbaru dan **baca dokumentasi resminya** sebelum memakai API (Next.js, Supabase, Tailwind berubah cepat). Jangan menulis dari ingatan.
- Jangan menambah dependensi di luar daftar ini tanpa izin.

## Perintah

> Diisi pada Fase 0 setelah proyek diinisialisasi. Perintah yang dicatat di sini harus sudah terbukti berjalan.

- Instal: `TBD`
- Dev: `TBD`
- Lint: `TBD` · Typecheck: `TBD` · Tes: `TBD` · Build: `TBD`

## Cara bekerja

- Kerjakan **satu fase** dari `docs/RENCANA-BUILD.md` per sesi. Jangan lompat fase atau memulai fitur fase berikutnya.
- Untuk tugas yang lebih dari beberapa berkas, tulis rencana singkat dulu, lalu kerjakan.
- Setelah selesai: jalankan lint, typecheck, tes, dan build. Centang item fase hanya jika kriterianya benar-benar terpenuhi dan terverifikasi. Laporkan apa yang berubah, apa yang diuji, dan apa yang belum.
- Perubahan kecil dan terfokus. Jangan merombak berkas yang tidak berkaitan.
- Jangan menyatakan "selesai" untuk sesuatu yang belum dijalankan.

## Aturan wajib

**Keamanan dan privasi**
- Kunci service role / rahasia hanya di modul server (`import "server-only"`), tidak pernah di variabel `NEXT_PUBLIC_*`, klien, atau repo. `.env.local` tidak di-commit.
- RLS aktif di semua tabel sejak migrasi pertama. `anon` tidak boleh membaca `pendaftaran` atau `kritik_saran`.
- Semua mutasi lewat Server Action atau Route Handler dengan validasi Zod **di server**. Validasi klien hanya kenyamanan.
- Proteksi admin diperiksa di middleware **dan** di setiap action admin.
- Jangan mencatat nama, NIS, WhatsApp, atau isi formulir ke log, analitik, atau pesan galat.
- Pendaftaran (kuota, duplikat, nomor) lewat fungsi database atomik; jangan cek-lalu-sisipkan di kode aplikasi.
- Jangan membuat akun, kata sandi, atau data pribadi palsu yang tampak asli. Data contoh ditandai "contoh".

**Kode**
- TypeScript strict; tanpa `any` kecuali dijelaskan.
- Istilah domain memakai Bahasa Indonesia sesuai PRD (`pendaftaran`, `ekstrakurikuler`, `jadwal`); istilah teknis umum memakai Inggris. Teks antarmuka Bahasa Indonesia. Komentar seperlunya.
- Logika bisnis murni (status, nomor, normalisasi WhatsApp) diletakkan di `src/lib/aturan/` agar mudah diuji.
- Setiap aturan bisnis (BR-xx) dan transisi status punya tes.
- Jangan menyembunyikan galat dengan `try/catch` kosong.

**Tampilan**
- Semua nilai visual dari `src/styles/tokens.css` (turunan `docs/DESAIN.md` bagian 2). **Tidak ada warna, ukuran font, radius, atau bayangan hardcode.**
- Setiap komponen punya state: memuat, kosong, galat, nonaktif, fokus, hover.
- Aksesibilitas WCAG 2.1 AA: label terhubung, kontras sesuai tabel token, keyboard, teks alternatif, target sentuh ≥ 44 px, hormati `prefers-reduced-motion`.
- Desain dimulai dari 360 px.
- **Hindari tampilan template generik.** Patuhi daftar periksa di `docs/DESAIN.md` bagian 10: tanpa gradasi dekoratif, glassmorphism, emoji sebagai ikon, kartu fitur berikon identik, foto stok atau ilustrasi AI, angka atau testimoni karangan, lorem ipsum, dan tema bawaan pustaka komponen yang tidak diubah.
- Jangan menambah fitur, halaman, atau elemen dekoratif yang tidak ada di PRD/DESAIN.

**Konten**
- Jangan mengarang data sekolah (pembina, jadwal, kuota, alamat, statistik). Pakai data contoh yang ditandai "contoh" sampai sekolah memberi data asli.
- Foto hanya foto asli sekolah dan hanya jika izin ada. Jangan mengambil gambar dari internet.

## Konvensi git

- Cabang per fase: `fase-N-nama-singkat`. Commit kecil dengan pesan Bahasa Indonesia yang menyebut FR/BR bila relevan (contoh: `Tambah cek kuota atomik pada pendaftaran (FR-06, BR-03)`).
- Jangan mem-force-push atau menghapus riwayat.

## Perintah khusus (workflow)

- `/kerjakan-fase N`: mengerjakan fase N dari rencana, lalu berhenti untuk ditinjau.
- `/cek-kualitas`: menjalankan pemeriksaan lint/tipe/tes/build, aksesibilitas, keamanan, dan anti-template.

Skill `desain-ui-ekskul` dimuat saat mengerjakan tampilan.
