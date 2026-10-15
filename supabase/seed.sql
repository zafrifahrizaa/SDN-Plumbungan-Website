-- ==============================================================================
-- SEED DATA CONTOH EKSKUL SDN PLUMBUNGAN
-- CATATAN: Semua data di bawah ditandai "[contoh]" sesuai PRD Lampiran 19
-- ==============================================================================

-- 1. Pengaturan Awal
INSERT INTO public.pengaturan (kunci, nilai) VALUES
('tahun_ajaran_aktif', '"2026/2027"'::jsonb),
('pendaftaran_buka_sampai', '"31 Juli 2026"'::jsonb),
('kontak_wa', '"6281234567890"'::jsonb),
('alamat', '"Plumbungan, Kec. Karangmalang, Kabupaten Sragen, Jawa Tengah 57291"'::jsonb),
('teks_sambutan', '"Selamat datang di website ekstrakurikuler SDN Plumbungan. Wadah bagi putra-putri untuk mengeksplorasi bakat, membina karakter, dan meraih prestasi bersama para pembina berpengalaman."'::jsonb)
ON CONFLICT (kunci) DO NOTHING;

-- 2. Delapan Ekstrakurikuler Contoh
INSERT INTO public.ekstrakurikuler (id, nama, slug, deskripsi, tujuan, pembina, lokasi, kuota, kelas_min, kelas_maks, persyaratan, aktif, pendaftaran_dibuka)
VALUES
('a0000000-0000-0000-0000-000000000001', 'Banjar (Rebana) [contoh]', 'banjar', 'Kegiatan seni musik rebana dan shalawat untuk mengasah kepekaan nada serta kebersamaan islami (data contoh).', 'Mengembangkan apresiasi seni musik tradisional islami, melatih kekompakan vokal dan tabuhan rebana, serta membangun kecintaan pada budaya religi (data contoh).', 'Ustadz H. Ahmad S.Pd.I [contoh]', 'Musholla SDN Plumbungan', 25, 3, 6, 'Membawa seragam busana muslim sekolah dan bersungguh-sungguh mengikuti latihan rutin.', true, true),
('a0000000-0000-0000-0000-000000000002', 'Karate [contoh]', 'karate', 'Seni bela diri karate untuk melatih disiplin fisik, ketahanan mental, rasa percaya diri, dan sportivitas (data contoh).', 'Membentuk karakter disiplin tinggi, ketangkasan fisik, pembelaan diri yang bertanggung jawab, serta persiapan turnamen antar-sekolah (data contoh).', 'Sensei Bambang Tri S.Pd [contoh]', 'Aula Utama SDN Plumbungan', 30, 2, 6, 'Mengenakan seragam karate (gi) lengkap dan mendapat persetujuan tertulis dari orang tua/wali.', true, true),
('a0000000-0000-0000-0000-000000000003', 'Lukis & Mewarnai [contoh]', 'lukis', 'Wadah ekspresi imajinasi dan kreativitas rupa melalui eksplorasi warna dan berbagai teknik menggambar (data contoh).', 'Mengasah kepekaan estetika, ketelitian motorik halus anak, dan keberanian mengekspresikan gagasan visual (data contoh).', 'Ibu Ratna Dewi S.Sn [contoh]', 'Ruang Kesenian', 20, 1, 6, 'Membawa buku gambar A3 dan perlengkapan pewarna (crayon/cat air) pribadi.', true, true),
('a0000000-0000-0000-0000-000000000004', 'Pramuka Inti [contoh]', 'pramuka', 'Pendidikan kepanduan untuk menumbuhkan kemandirian, kepemimpinan, kepedulian lingkungan, dan jiwa gotong royong (data contoh).', 'Menanamkan nilai Dasa Darma Pramuka, keterampilan tali-temali, sandi, baris-berbaris, dan kesiapan berkemah (data contoh).', 'Kak Eko Wahyudi S.Pd [contoh]', 'Halaman SDN Plumbungan', 40, 3, 6, 'Mengenakan seragam Pramuka lengkap dengan atribut kacu dan tanda pengenal.', true, true),
('a0000000-0000-0000-0000-000000000005', 'Tari Tradisional [contoh]', 'tari', 'Mengenal dan melestarikan kekayaan tarian daerah Jawa Tengah dengan gerakan luwes dan penuh makna (data contoh).', 'Melestarikan warisan budaya lokal, melatih kelenturan tubuh, rasa ritme gerak, dan kesiapan tampil di acara sekolah (data contoh).', 'Ibu Siti Rahmawati S.Pd [contoh]', 'Ruang Kesenian', 20, 1, 6, 'Mengenakan pakaian olahraga/kaos latihan yang nyaman dan selendang tari.', true, true),
('a0000000-0000-0000-0000-000000000006', 'Teater & Seni Peran [contoh]', 'teater', 'Sarana belajar olah vokal, ekspresi wajah, improvisasi peran, dan keberanian tampil di depan publik (data contoh).', 'Membangun rasa percaya diri, artikulasi berbicara yang baik, kerja sama tim drama, dan apresiasi sastra (data contoh).', 'Bapak Danang Prasetyo S.Pd [contoh]', 'Panggung Terbuka Sekolah', 20, 3, 6, 'Memiliki minat dalam seni pertunjukan dan komitmen mengikuti latihan naskah.', true, true),
('a0000000-0000-0000-0000-000000000007', 'Bola Voli Mini [contoh]', 'voli', 'Olahraga bola voli ramah anak untuk melatih kebugaran jasmani, ketangkasan passing, dan semangat kerja sama tim (data contoh).', 'Mengembangkan keterampilan dasar bola voli, daya tahan kardiovaskular, dan sportivitas bertanding (data contoh).', 'Bapak Agus Supriyanto S.Pd.Jas [contoh]', 'Lapangan Olahraga SDN Plumbungan', 24, 4, 6, 'Mengenakan pakaian olahraga sekolah dan sepatu olahraga bertali yang aman.', true, true),
('a0000000-0000-0000-0000-000000000008', 'Tahfidz Al-Qur''an [contoh]', 'tahfidz', 'Bimbingan hafalan Al-Qur''an Juz 30 dengan tartil, perbaikan tajwid, dan adab penghafal Qur''an (data contoh).', 'Membimbing siswa menyelesaikan hafalan surat-surat pendek dengan makhraj yang benar dan kecintaan pada Al-Qur''an (data contoh).', 'Ustadzah Nurul Hidayah S.Th.I [contoh]', 'Ruang Perpustakaan / Musholla', 25, 1, 6, 'Membawa mushaf Al-Qur''an pribadi dan buku mutaba''ah hafalan.', true, true)
ON CONFLICT (slug) DO NOTHING;

-- 3. Jadwal Contoh
INSERT INTO public.jadwal (ekskul_id, hari, jam_mulai, jam_selesai, lokasi) VALUES
('a0000000-0000-0000-0000-000000000001', 'Selasa', '15:30', '17:00', 'Musholla Sekolah'),
('a0000000-0000-0000-0000-000000000002', 'Rabu', '15:00', '16:45', 'Aula Utama'),
('a0000000-0000-0000-0000-000000000002', 'Sabtu', '07:30', '09:30', 'Halaman Sekolah'),
('a0000000-0000-0000-0000-000000000003', 'Kamis', '15:00', '16:30', 'Ruang Kesenian'),
('a0000000-0000-0000-0000-000000000004', 'Jumat', '14:30', '16:30', 'Lapangan Upacara'),
('a0000000-0000-0000-0000-000000000005', 'Senin', '15:00', '16:30', 'Ruang Kesenian'),
('a0000000-0000-0000-0000-000000000006', 'Kamis', '15:30', '17:00', 'Panggung Terbuka'),
('a0000000-0000-0000-0000-000000000007', 'Sabtu', '15:30', '17:15', 'Lapangan Olahraga'),
('a0000000-0000-0000-0000-000000000008', 'Rabu', '15:30', '16:45', 'Musholla')
ON CONFLICT DO NOTHING;
