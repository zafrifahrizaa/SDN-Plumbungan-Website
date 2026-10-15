---
description: Kerjakan satu fase dari docs/RENCANA-BUILD.md, verifikasi, lalu berhenti untuk ditinjau. Pemakaian: /kerjakan-fase N
---

Kerjakan Fase **N** (nomor diberikan pengguna setelah perintah; jika tidak ada, tanyakan).

1. Baca `AGENTS.md`, lalu bagian Fase N di `docs/RENCANA-BUILD.md`. Baca hanya bagian `docs/PRD.md`, `docs/TEKNIS.md`, dan `docs/DESAIN.md` yang dirujuk fase itu.
2. Pastikan fase sebelumnya sudah dicentang semua. Jika belum, hentikan dan laporkan.
3. Tulis rencana singkat: berkas yang akan dibuat/diubah, urutan, dan hal yang belum jelas. Jika ada pertanyaan yang memblokir, tanyakan sekarang dan berhenti.
4. Buat cabang `fase-N-<nama-singkat>`.
5. Kerjakan item fase satu per satu. Setelah tiap bagian bermakna: jalankan lint, typecheck, dan tes terkait; perbaiki sebelum lanjut. Commit kecil.
6. Untuk pekerjaan tampilan, muat skill `desain-ui-ekskul` dan jalankan aplikasi untuk memeriksa pada lebar 360 dan 1280 px.
7. Verifikasi setiap kriteria "Selesai bila" dengan menjalankannya, bukan membayangkannya.
8. Centang item di `docs/RENCANA-BUILD.md` hanya yang benar-benar selesai dan terverifikasi. Jika Fase 0, perbarui bagian Perintah di `AGENTS.md` dan bagian Menjalankan proyek di `README.md`.
9. **Berhenti.** Laporkan: apa yang dibuat, apa yang diuji dan hasilnya, apa yang belum atau meragukan, keputusan yang diambil, dan pertanyaan untuk pemilik proyek. Jangan memulai fase berikutnya.
