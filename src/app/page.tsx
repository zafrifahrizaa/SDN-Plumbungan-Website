import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquareHeart } from "lucide-react";
import { ekstrakurikulerRepo, jadwalRepo, pengaturanRepo } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CardEkskul } from "@/components/ekskul/CardEkskul";
import { PitaInformasi } from "@/components/home/PitaInformasi";
import { PapanJadwal } from "@/components/jadwal/PapanJadwal";

export default async function BerandaPage() {
  const [daftarEkskul, semuaJadwal, batasPendaftaranRaw, teksSambutanRaw] = await Promise.all([
    ekstrakurikulerRepo.getAllAktif(),
    jadwalRepo.getAll(),
    pengaturanRepo.get<string>("pendaftaran_buka_sampai"),
    pengaturanRepo.get<string>("teks_sambutan"),
  ]);

  const batasPendaftaran = batasPendaftaranRaw ?? "31 Juli 2026";
  const teksSambutan =
    teksSambutanRaw ??
    "Selamat datang di website ekstrakurikuler SDN Plumbungan. Wadah bagi siswa untuk mengembangkan bakat, memupuk percaya diri, dan meraih prestasi bersama para pembina berpengalaman.";

  // Hitung rentang hari dari jadwal aktif
  const hariUnik = Array.from(new Set(semuaJadwal.map((j) => j.hari)));
  const labelHari = hariUnik.length > 0 ? "Senin–Sabtu" : "Setiap Pekan";

  // Siapkan data jadwal dengan slug ekskul untuk tautan
  const jadwalDenganSlug = semuaJadwal.map((j) => {
    const ekskul = daftarEkskul.find((e) => e.id === j.ekskul_id);
    return {
      ...j,
      ekskul_slug: ekskul?.slug,
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main id="konten-utama" className="flex-1">
        {/* =========================================================================
            1. HERO SECTION
        ========================================================================== */}
        <section className="relative px-5 md:px-8 pt-4 pb-12">
          <div className="max-w-[1200px] mx-auto rounded-lg overflow-hidden relative min-h-[460px] md:min-h-[520px] flex items-center bg-primary-dark shadow-soft">
            {/* Scrim Background */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#1A2415]/95 via-[#1A2415]/75 to-transparent z-10"
              aria-hidden="true"
            />
            {/* Foto Hero Asli / Placeholder Tegas */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{
                backgroundColor: "var(--color-primary-dark)",
              }}
              aria-hidden="true"
            />

            {/* Konten Hero */}
            <div className="relative z-20 max-w-2xl px-6 sm:px-10 py-16 text-left">
              <span className="inline-block px-3.5 py-1 rounded-pill bg-marigold text-ink text-[13px] font-bold tracking-wide uppercase mb-4">
                Pendaftaran Terbuka
              </span>

              <h1 className="font-heading font-bold text-[34px] sm:text-[44px] md:text-[52px] text-white leading-[1.1] tracking-tight">
                Ayo Kembangkan Bakatmu!
              </h1>

              <p className="mt-4 text-[16px] sm:text-[18px] text-sage/95 leading-relaxed font-body max-w-xl">
                Delapan pilihan kegiatan ekstrakurikuler SDN Plumbungan. Lihat jadwal latihannya, pilih yang kamu sukai, lalu daftar langsung secara online dari rumah.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#pilih-ekskul"
                  className="min-h-[48px] px-8 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-primary text-white hover:bg-primary-hover shadow-soft active:scale-[0.98] transition-all text-center"
                >
                  Lihat Ekstrakurikuler
                </a>
                <Link
                  href="/daftar"
                  className="min-h-[48px] px-8 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-transparent text-white border-[1.5px] border-white hover:bg-white/10 active:scale-[0.98] transition-all text-center"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>

          {/* 2. PITA INFORMASI (Menumpuk di Batas Hero) */}
          <PitaInformasi
            totalEkskul={daftarEkskul.length}
            batasPendaftaran={batasPendaftaran}
            hariKegiatan={labelHari}
          />
        </section>

        {/* =========================================================================
            3. SAMBUTAN SEKOLAH (Latar Paper)
        ========================================================================== */}
        <section className="py-14 md:py-20 px-5 md:px-8">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Kolom Kiri: Foto / Visual Asli */}
            <div className="relative aspect-4/5 w-full max-w-[420px] mx-auto rounded-lg overflow-hidden bg-sage-deep border border-line shadow-soft flex items-center justify-center">
              <div className="text-center p-8">
                <span className="font-heading font-bold text-7xl text-primary-dark block mb-2">
                  SDN
                </span>
                <span className="font-semibold text-lg text-ink block">
                  Plumbungan
                </span>
                <span className="text-[14px] text-muted block mt-1">
                  Mendidik dengan Hati, Meraih Prestasi
                </span>
              </div>

              {/* Badge bulat 8 Ekskul di sudut */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-circle bg-primary-dark text-white flex flex-col items-center justify-center shadow-soft">
                <span className="font-heading font-bold text-2xl leading-none">
                  8
                </span>
                <span className="text-[11px] font-medium tracking-wide uppercase mt-0.5">
                  Ekskul
                </span>
              </div>
            </div>

            {/* Kolom Kanan: Teks Sambutan */}
            <div className="flex flex-col text-left">
              <span className="text-primary font-bold text-[14px] tracking-wide uppercase">
                Sambutan Sekolah
              </span>
              <h2 className="font-heading font-semibold text-[26px] sm:text-[32px] text-ink leading-tight mt-1 mb-4">
                Temukan kegiatan yang kamu suka
              </h2>
              <p className="text-[16px] text-muted leading-relaxed font-body">
                {teksSambutan}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/ekstrakurikuler"
                  className="min-h-[44px] px-6 inline-flex items-center justify-center font-body font-semibold text-[14px] rounded-pill bg-primary text-white hover:bg-primary-hover shadow-soft"
                >
                  Lihat Semua Ekskul
                </Link>
                <Link
                  href="/cek-status"
                  className="min-h-[44px] px-6 inline-flex items-center justify-center font-body font-semibold text-[14px] rounded-pill bg-surface text-primary-hover border-[1.5px] border-primary hover:bg-sage"
                >
                  Cek Status Pendaftaran
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. PILIH EKSKUL (Latar Sage, Grid 4 Kolom)
        ========================================================================== */}
        <section id="pilih-ekskul" className="py-16 md:py-24 bg-sage px-5 md:px-8 border-y border-line">
          <div className="max-w-[1200px] mx-auto text-center">
            <span className="text-primary font-bold text-[14px] tracking-wide uppercase">
              Pilihan Bakat
            </span>
            <h2 className="font-heading font-semibold text-[28px] sm:text-[34px] text-ink mt-1 mb-3">
              Pilihan Ekstrakurikuler
            </h2>
            <p className="text-muted text-[16px] max-w-xl mx-auto mb-12">
              Tersedia delapan pilihan kegiatan untuk mengasah keterampilan, fisik, seni, dan akhlak mulia siswa.
            </p>

            {/* Grid 4 Kolom Desktop, 2 Tablet, 1 Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {daftarEkskul.map((ekskul) => (
                <CardEkskul key={ekskul.id} ekskul={ekskul} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/ekstrakurikuler"
                className="inline-flex items-center gap-2 text-primary-dark font-semibold text-[16px] hover:text-primary-hover focus:outline-none focus:underline"
              >
                <span>Lihat rincian lengkap & filter hari</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. JADWAL PEKANAN (Latar Paper)
        ========================================================================== */}
        <section className="py-16 md:py-24 px-5 md:px-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
              <div>
                <span className="text-primary font-bold text-[14px] tracking-wide uppercase">
                  Agenda Sekolah
                </span>
                <h2 className="font-heading font-semibold text-[26px] sm:text-[32px] text-ink mt-1">
                  Jadwal Pekan Ini
                </h2>
                <p className="text-muted text-[15px] mt-1">
                  Kegiatan dilaksanakan rutin setiap pekan sesuai jadwal masing-masing.
                </p>
              </div>

              <Link
                href="/jadwal"
                className="text-[15px] font-semibold text-primary-hover hover:underline inline-flex items-center gap-1.5 shrink-0"
              >
                <span>Lihat jadwal lengkap & pembina</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Papan Jadwal 6 Kolom */}
            <PapanJadwal daftarJadwal={jadwalDenganSlug} />
          </div>
        </section>

        {/* =========================================================================
            6. CARA MENDAFTAR (Latar Sage, Daftar Bernomor)
        ========================================================================== */}
        <section className="py-16 md:py-24 bg-sage px-5 md:px-8 border-t border-line">
          <div className="max-w-[1200px] mx-auto">
            <div className="max-w-2xl text-left mb-12">
              <span className="text-primary font-bold text-[14px] tracking-wide uppercase">
                Panduan Pendaftaran
              </span>
              <h2 className="font-heading font-semibold text-[26px] sm:text-[32px] text-ink mt-1 mb-2">
                Empat Langkah Mudah Mendaftar
              </h2>
              <p className="text-muted text-[15px]">
                Orang tua/wali dan siswa dapat menyelesaikan proses pendaftaran dalam waktu singkat langsung dari ponsel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  no: "1",
                  judul: "Pilih Kegiatan",
                  deskripsi:
                    "Pilih ekstrakurikuler yang kamu minati dan periksa persyaratan kelas serta sisa kuota yang tersedia.",
                },
                {
                  no: "2",
                  judul: "Isi Formulir",
                  deskripsi:
                    "Lengkapi data siswa dan nomor WhatsApp orang tua/wali dengan benar pada formulir pendaftaran.",
                },
                {
                  no: "3",
                  judul: "Simpan Nomor",
                  deskripsi:
                    "Setelah formulir terkirim, catat atau tangkap layar nomor pendaftaran (contoh: EKS-2026-0001).",
                },
                {
                  no: "4",
                  judul: "Cek Status",
                  deskripsi:
                    "Gunakan nomor pendaftaran dan NIS untuk memantau hasil verifikasi berkas oleh pembina sekolah.",
                },
              ].map((langkah) => (
                <div
                  key={langkah.no}
                  className="bg-surface rounded-lg p-6 border border-line shadow-xs flex flex-col text-left"
                >
                  <span className="font-heading font-bold text-5xl text-primary leading-none mb-4">
                    {langkah.no}
                  </span>
                  <h3 className="font-heading font-semibold text-[19px] text-ink mb-2">
                    {langkah.judul}
                  </h3>
                  <p className="text-[14px] text-muted leading-relaxed">
                    {langkah.deskripsi}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/daftar"
                className="min-h-[48px] px-8 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-primary text-white hover:bg-primary-hover shadow-soft"
              >
                Mulai Pendaftaran Sekarang
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. AJAKAN KRITIK DAN SARAN (Banner Ringkas)
        ========================================================================== */}
        <section className="py-12 px-5 md:px-8 bg-paper">
          <div className="max-w-[1200px] mx-auto rounded-lg bg-sage-deep/60 border border-primary/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-circle bg-primary text-white flex items-center justify-center shrink-0">
                <MessageSquareHeart className="w-6 h-6 text-marigold" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[20px] text-primary-dark">
                  Punya Saran untuk Kegiatan Sekolah?
                </h3>
                <p className="text-[14px] text-muted leading-relaxed mt-0.5">
                  Masukan dari siswa dan orang tua sangat berharga demi kemajuan program ekstrakurikuler SDN Plumbungan.
                </p>
              </div>
            </div>

            <Link
              href="/kritik-saran"
              className="min-h-[44px] px-6 inline-flex items-center justify-center font-body font-semibold text-[14px] rounded-pill bg-surface text-primary-hover border-[1.5px] border-primary hover:bg-sage shrink-0 text-center"
            >
              Kirim Masukan
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
