import React from "react";
import { Metadata } from "next";
import { ekstrakurikulerRepo } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DaftarEkskulClient } from "./DaftarEkskulClient";

export const metadata: Metadata = {
  title: "Daftar Ekstrakurikuler | SDN Plumbungan",
  description:
    "Pilihan delapan kegiatan ekstrakurikuler SDN Plumbungan. Saring berdasarkan hari dan lihat ketersediaan kuota siswa.",
};

export default async function EkstrakurikulerPage() {
  const daftarEkskul = await ekstrakurikulerRepo.getAllAktif();

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main id="konten-utama" className="flex-1 max-w-[1200px] w-full mx-auto px-5 md:px-8 py-10 md:py-14">
        {/* Header Halaman */}
        <div className="mb-8 text-left">
          <span className="text-primary font-bold text-[14px] tracking-wide uppercase">
            Pilihan Siswa
          </span>
          <h1 className="font-heading font-semibold text-[30px] sm:text-[38px] text-ink leading-tight mt-1 mb-2">
            Ekstrakurikuler SDN Plumbungan
          </h1>
          <p className="text-[16px] text-muted max-w-2xl">
            Pilih kegiatan yang diminati untuk melihat informasi jadwal latihan, pembina, persyaratan seragam, dan mendaftar secara langsung.
          </p>
        </div>

        {/* Komponen Filter & Grid */}
        <DaftarEkskulClient daftarEkskul={daftarEkskul} />
      </main>

      <Footer />
    </div>
  );
}
