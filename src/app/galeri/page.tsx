import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { galeriRepo } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Images } from "lucide-react";

export const metadata: Metadata = {
  title: "Galeri Kegiatan | SDN Plumbungan",
  description:
    "Dokumentasi foto kegiatan ekstrakurikuler siswa SDN Plumbungan.",
};

export default async function GaleriPage() {
  const fotoGaleri = await galeriRepo.getAll();

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main id="konten-utama" className="flex-1 max-w-[1200px] w-full mx-auto px-5 md:px-8 py-10 md:py-16 text-left">
        <div className="mb-8">
          <span className="text-primary font-bold text-[14px] tracking-wide uppercase">
            Dokumentasi
          </span>
          <h1 className="font-heading font-semibold text-[30px] sm:text-[38px] text-ink leading-tight mt-1 mb-2">
            Galeri Kegiatan Siswa
          </h1>
          <p className="text-[16px] text-muted max-w-2xl">
            Momen keceriaan dan latihan rutin ekstrakurikuler siswa-siswi SDN Plumbungan.
          </p>
        </div>

        {fotoGaleri.length === 0 ? (
          <div className="bg-surface rounded-lg border border-line p-12 text-center flex flex-col items-center justify-center my-8 shadow-xs">
            <div className="w-16 h-16 rounded-circle bg-sage-deep text-primary-dark flex items-center justify-center mb-4">
              <Images className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-semibold text-[20px] text-ink mb-1">
              Foto kegiatan akan segera hadir
            </h2>
            <p className="text-[15px] text-muted max-w-md mb-6">
              Dokumentasi foto resmi kegiatan ekstrakurikuler sedang disiapkan bersama pihak sekolah.
            </p>
            <Link
              href="/ekstrakurikuler"
              className="min-h-[44px] px-6 inline-flex items-center justify-center font-body font-semibold text-[14px] rounded-pill bg-primary text-white hover:bg-primary-hover shadow-soft"
            >
              Lihat Pilihan Ekstrakurikuler
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Foto list mapping when photos exist */}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
