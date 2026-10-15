---
name: desain-ui-ekskul
description: Gunakan saat membuat atau mengubah tampilan (halaman, komponen, gaya, teks antarmuka) untuk website ekstrakurikuler SDN Plumbungan. Memastikan UI memakai token proyek, memenuhi aksesibilitas, dan tidak tampak seperti template generik.
---

# Desain UI: Ekskul SDN Plumbungan

Sumber kebenaran: `docs/DESAIN.md`. Skill ini hanya ringkasan kerja; jika berbeda, `docs/DESAIN.md` yang berlaku.

## Sebelum menulis UI

1. Baca bagian `docs/DESAIN.md` yang relevan: token (2), komponen (5), halaman publik (6) atau admin (7), state dan teks (8).
2. Cek apakah komponen yang dibutuhkan sudah ada di `src/components/ui/`. Pakai ulang, jangan membuat duplikat.
3. Mulai dari layar 360 px.

## Aturan keras

- Nilai visual hanya dari token (`src/styles/tokens.css`). Tanpa heksadesimal, `px` bebas untuk radius/bayangan, atau font lain.
- Font: Baloo 2 untuk judul, Plus Jakarta Sans untuk isi.
- Radius: 12 / 16 / 24 / pill. Bayangan: `soft` dan `lift` saja.
- Ciri khas: label hari kuning (`marigold`) dan papan jadwal. Kuning tidak dipakai untuk tombol besar atau latar bagian.
- Tombol utama hanya satu per tampilan. Tombol 48 px, kapsul.
- Label formulir selalu di atas dan terlihat; galat di bawah input dengan teks dan ikon.
- Status selalu disertai teks, tidak hanya warna.
- Semua data tampil dari database. Jangan menulis angka, nama, atau jadwal langsung di JSX.

## Daftar periksa sebelum selesai

Tolak dan perbaiki bila ada satu saja yang terjadi:

- [ ] Gradasi dekoratif, teks bergradasi, glassmorphism, efek neon.
- [ ] Emoji sebagai ikon; ikon di lingkaran berwarna di atas judul card.
- [ ] Tiga kartu fitur identik; semua elemen berpusat; semua sudut dan bayangan sama besar.
- [ ] Foto stok, ilustrasi AI, atau gambar dari internet.
- [ ] Lorem ipsum, testimoni atau statistik karangan, kalimat promosi kosong.
- [ ] Animasi masuk saat gulir atau paralaks.
- [ ] Komponen pustaka dengan tema bawaan yang tidak diganti token.
- [ ] Teks di bawah 16 px untuk informasi penting di ponsel.
- [ ] Target sentuh < 44 px (kecuali tabel admin padat).
- [ ] Ada state memuat, kosong, galat, nonaktif, fokus untuk komponen ini.
- [ ] Gulir horizontal pada lebar 360 px.

## Verifikasi

Jalankan aplikasi dan periksa halaman pada lebar 360, 768, dan 1280 px. Periksa navigasi keyboard dan fokus. Laporkan apa yang sudah dilihat dan apa yang belum dapat diperiksa.
