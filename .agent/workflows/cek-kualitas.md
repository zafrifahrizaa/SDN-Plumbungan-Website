---
description: Pemeriksaan kualitas sebelum menutup fase atau meluncurkan: lint, tipe, tes, build, aksesibilitas, keamanan, dan anti-template.
---

Jalankan pemeriksaan berikut dan laporkan hasilnya apa adanya. Jangan memperbaiki apa pun tanpa melaporkannya dulu; jangan menyembunyikan kegagalan.

1. **Otomatis:** lint, typecheck, tes unit dan integrasi, build produksi. Jalankan tes E2E bila sudah ada.
2. **Keamanan:**
   - Cari kunci rahasia di kode klien, variabel `NEXT_PUBLIC_*`, dan riwayat berkas yang akan di-commit.
   - Pastikan semua tabel memiliki RLS dan `anon` tidak dapat membaca `pendaftaran` maupun `kritik_saran`.
   - Buka `/admin` dan setiap sub-rute tanpa login: harus diarahkan ke login. Periksa bahwa setiap Server Action admin memeriksa sesi dan role.
   - Cari `console.log` atau log lain yang memuat data pribadi.
3. **Pendaftaran:** uji nyata duplikat, kuota penuh, kelas di luar batas, pendaftaran ditutup, dan dua pendaftaran bersamaan untuk kuota terakhir.
4. **Tampilan:** periksa halaman yang berubah pada 360, 768, 1280 px. Cari nilai warna/ukuran hardcode di luar `tokens.css`. Jalankan Lighthouse (mobile) untuk Performance dan Accessibility pada Beranda dan Daftar Ekskul.
5. **Anti-template:** tinjau halaman terhadap `docs/DESAIN.md` bagian 10 dan sebutkan setiap pelanggaran.
6. **Konten:** pastikan tidak ada lorem ipsum, data contoh yang belum ditandai, atau data karangan yang tampak asli.

Akhiri dengan tabel: pemeriksaan, hasil (lulus/gagal/tidak dapat diperiksa), dan catatan. Untuk yang "tidak dapat diperiksa", jelaskan alasannya.
