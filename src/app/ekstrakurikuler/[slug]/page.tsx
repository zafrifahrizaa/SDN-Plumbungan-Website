import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ekstrakurikulerRepo } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChipHari } from "@/components/ui/ChipHari";
import { User, MapPin, Calendar, Users, Award, ShieldAlert } from "lucide-react";

interface DetailEkskulProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const ekskuls = await ekstrakurikulerRepo.getAllAktif();
  return ekskuls.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: DetailEkskulProps): Promise<Metadata> {
  const { slug } = await params;
  const ekskul = await ekstrakurikulerRepo.getBySlug(slug);

  if (!ekskul) {
    return {
      title: "Kegiatan Tidak Ditemukan | SDN Plumbungan",
    };
  }

  return {
    title: `${ekskul.nama} | Ekstrakurikuler SDN Plumbungan`,
    description: ekskul.deskripsi,
  };
}

export default async function DetailEkskulPage({ params }: DetailEkskulProps) {
  const { slug } = await params;
  const ekskul = await ekstrakurikulerRepo.getBySlug(slug);

  if (!ekskul) {
    notFound();
  }

  const isPendaftaranTutup = !ekskul.pendaftaran_dibuka;
  const isKuotaPenuh = ekskul.sisa_kuota <= 0;
  const persentaseTerisi =
    ekskul.kuota > 0
      ? Math.min(100, Math.round((ekskul.kuota_terisi / ekskul.kuota) * 100))
      : 0;

  return (
    <div className="min-h-screen flex flex-col bg-paper pb-20 lg:pb-0">
      <Navbar />

      <main id="konten-utama" className="flex-1 max-w-[1200px] w-full mx-auto px-5 md:px-8 py-8 md:py-12">
        {/* Breadcrumb navigasi */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-[14px] text-muted">
            <li>
              <Link href="/" className="hover:text-primary-hover focus:underline">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/ekstrakurikuler"
                className="hover:text-primary-hover focus:underline"
              >
                Ekstrakurikuler
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-ink truncate max-w-[200px]" aria-current="page">
              {ekskul.nama}
            </li>
          </ol>
        </nav>

        {/* Hero Banner Foto Kegiatan */}
        <div className="relative aspect-16/9 md:aspect-21/9 w-full rounded-lg overflow-hidden bg-sage-deep border border-line shadow-soft mb-8">
          {ekskul.foto_path ? (
            <Image
              src={ekskul.foto_path}
              alt={`Foto kegiatan ${ekskul.nama}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-sage-deep text-primary-dark">
              <span className="font-heading font-bold text-6xl md:text-8xl">
                {ekskul.nama.charAt(0)}
              </span>
              <span className="text-[15px] font-medium text-muted mt-2">
                Foto dokumentasi kegiatan menyusul
              </span>
            </div>
          )}

          {/* Label Hari Menumpuk */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10">
            {ekskul.jadwal.map((j) => (
              <ChipHari key={j.id} hari={j.hari} jam={j.jam_mulai} />
            ))}
          </div>
        </div>

        {/* Konten Utama 2 Kolom (Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Kolom Kiri (2/3): Rincian Kegiatan */}
          <div className="lg:col-span-2 flex flex-col gap-8 text-left">
            <div>
              <h1 className="font-heading font-bold text-[30px] sm:text-[38px] text-ink leading-tight">
                {ekskul.nama}
              </h1>
              <p className="text-[17px] text-muted leading-relaxed font-body mt-3">
                {ekskul.deskripsi}
              </p>
            </div>

            {/* Tujuan Kegiatan */}
            <div className="bg-surface rounded-lg p-6 border border-line shadow-xs">
              <div className="flex items-center gap-2.5 mb-3 text-primary-dark">
                <Award className="w-5 h-5 text-primary" aria-hidden="true" />
                <h2 className="font-heading font-semibold text-[20px] text-ink">
                  Tujuan & Manfaat Kegiatan
                </h2>
              </div>
              <p className="text-[15px] text-muted leading-relaxed">
                {ekskul.tujuan}
              </p>
            </div>

            {/* Persyaratan & Batas Kelas */}
            <div className="bg-surface rounded-lg p-6 border border-line shadow-xs">
              <div className="flex items-center gap-2.5 mb-3 text-primary-dark">
                <ShieldAlert className="w-5 h-5 text-marigold-ink" aria-hidden="true" />
                <h2 className="font-heading font-semibold text-[20px] text-ink">
                  Persyaratan & Ketentuan
                </h2>
              </div>

              <div className="flex flex-col gap-3 text-[15px] text-muted">
                <div>
                  <strong className="text-ink font-semibold">Batas Kelas:</strong>{" "}
                  {ekskul.kelas_min && ekskul.kelas_maks
                    ? `Dikhususkan untuk siswa kelas ${ekskul.kelas_min} sampai kelas ${ekskul.kelas_maks}.`
                    : "Terbuka untuk seluruh siswa (Kelas 1–6)."}
                </div>
                <div>
                  <strong className="text-ink font-semibold">Perlengkapan / Aturan:</strong>{" "}
                  {ekskul.persyaratan}
                </div>
              </div>
            </div>

            {/* Jadwal Latihan */}
            <div className="bg-surface rounded-lg p-6 border border-line shadow-xs">
              <div className="flex items-center gap-2.5 mb-4 text-primary-dark">
                <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                <h2 className="font-heading font-semibold text-[20px] text-ink">
                  Jadwal & Lokasi Pelaksanaan
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {ekskul.jadwal.map((j) => (
                  <div
                    key={j.id}
                    className="p-3 bg-paper rounded-sm border-l-4 border-marigold flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-[15px] text-ink block">
                        Hari {j.hari}
                      </span>
                      <span className="text-[14px] text-muted block mt-0.5">
                        Pukul {j.jam_mulai} - {j.jam_selesai} WIB
                      </span>
                    </div>
                    <span className="text-[13px] font-medium text-primary-dark bg-sage px-3 py-1 rounded-sm">
                      {j.lokasi || ekskul.lokasi}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan (1/3): Panel Ringkas (Sticky Desktop) */}
          <aside className="lg:sticky lg:top-28 bg-surface rounded-lg p-6 border border-line shadow-soft flex flex-col gap-5 text-left">
            <h3 className="font-heading font-semibold text-[19px] text-ink pb-3 border-b border-line">
              Informasi Pendaftaran
            </h3>

            {/* Pembina */}
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <span className="text-[13px] text-muted block">Pembina Kegiatan</span>
                <span className="font-semibold text-[15px] text-ink">
                  {ekskul.pembina}
                </span>
              </div>
            </div>

            {/* Lokasi */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <span className="text-[13px] text-muted block">Tempat Latihan</span>
                <span className="font-semibold text-[15px] text-ink">
                  {ekskul.lokasi}
                </span>
              </div>
            </div>

            {/* Ketersediaan Kuota */}
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
              <div className="w-full">
                <span className="text-[13px] text-muted block">Ketersediaan Kuota</span>
                <span className="font-bold text-[16px] text-ink block mt-0.5">
                  {isKuotaPenuh
                    ? "Kuota Penuh"
                    : `Sisa ${ekskul.sisa_kuota} dari ${ekskul.kuota} Kursi`}
                </span>

                {/* Progress bar tipis kuota */}
                <div
                  className="w-full h-2 bg-line rounded-pill overflow-hidden mt-2"
                  role="progressbar"
                  aria-valuenow={persentaseTerisi}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full ${
                      isKuotaPenuh
                        ? "bg-danger"
                        : persentaseTerisi >= 80
                        ? "bg-marigold"
                        : "bg-primary"
                    }`}
                    style={{ width: `${persentaseTerisi}%` }}
                  />
                </div>
                <span className="text-[12px] text-muted mt-1 block">
                  {ekskul.kuota_terisi} peserta terdaftar ({persentaseTerisi}%)
                </span>
              </div>
            </div>

            {/* Tombol Aksi Panel Desktop */}
            <div className="pt-3 border-t border-line mt-2">
              {isPendaftaranTutup ? (
                <div className="flex flex-col gap-2">
                  <button
                    disabled
                    className="w-full min-h-[48px] px-6 rounded-pill bg-sage-deep text-muted font-semibold text-[15px] cursor-not-allowed"
                  >
                    Pendaftaran Ditutup
                  </button>
                  <p className="text-[13px] text-muted text-center">
                    Hubungi pembina kegiatan untuk informasi lebih lanjut.
                  </p>
                </div>
              ) : isKuotaPenuh ? (
                <div className="flex flex-col gap-2">
                  <button
                    disabled
                    className="w-full min-h-[48px] px-6 rounded-pill bg-sage-deep text-muted font-semibold text-[15px] cursor-not-allowed"
                  >
                    Kuota Penuh
                  </button>
                  <p className="text-[13px] text-muted text-center">
                    Kamu masih bisa memilih ekstrakurikuler lain yang masih membuka kuota.
                  </p>
                </div>
              ) : (
                <Link
                  href={`/daftar?ekskul=${ekskul.slug}`}
                  className="w-full min-h-[48px] px-6 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-primary text-white hover:bg-primary-hover shadow-soft text-center"
                >
                  Daftar Kegiatan Ini
                </Link>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* BILAH DAFTAR TETAP DI BAWAH LAYAR PADA PONSEL (DESAIN.md 3 & 6.3) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-surface border-t border-line p-3 px-5 z-30 shadow-lift flex items-center justify-between gap-4">
        <div className="flex flex-col text-left">
          <span className="text-[12px] text-muted">Ketersediaan</span>
          <span
            className={`font-bold text-[14px] ${
              isKuotaPenuh ? "text-danger" : "text-primary-dark"
            }`}
          >
            {isKuotaPenuh ? "Penuh" : `Sisa ${ekskul.sisa_kuota} kursi`}
          </span>
        </div>

        {isPendaftaranTutup ? (
          <button
            disabled
            className="min-h-[44px] px-5 rounded-pill bg-sage-deep text-muted font-semibold text-[14px] cursor-not-allowed"
          >
            Ditutup
          </button>
        ) : isKuotaPenuh ? (
          <button
            disabled
            className="min-h-[44px] px-5 rounded-pill bg-sage-deep text-muted font-semibold text-[14px] cursor-not-allowed"
          >
            Penuh
          </button>
        ) : (
          <Link
            href={`/daftar?ekskul=${ekskul.slug}`}
            className="min-h-[44px] px-6 inline-flex items-center justify-center rounded-pill bg-primary text-white font-semibold text-[14px] shadow-soft"
          >
            Daftar Sekarang
          </Link>
        )}
      </div>

      <Footer />
    </div>
  );
}
