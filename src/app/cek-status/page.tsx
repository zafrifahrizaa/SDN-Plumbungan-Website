import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CekStatusForm } from "./CekStatusForm";

export const metadata: Metadata = {
  title: "Cek Status Pendaftaran | SDN Plumbungan",
  description:
    "Pantau status verifikasi dan pengumuman penerimaan pendaftaran ekstrakurikuler SDN Plumbungan menggunakan nomor pendaftaran dan NIS.",
};

export default function CekStatusPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main id="konten-utama" className="flex-1 max-w-[760px] w-full mx-auto px-5 md:px-8 py-10 md:py-16 text-left">
        <div className="mb-8">
          <span className="text-primary font-bold text-[14px] tracking-wide uppercase">
            Pantau Pendaftaran
          </span>
          <h1 className="font-heading font-semibold text-[30px] sm:text-[38px] text-ink leading-tight mt-1 mb-2">
            Cek Status Pendaftaran
          </h1>
          <p className="text-[16px] text-muted">
            Masukkan nomor pendaftaran yang didapat saat mendaftar beserta NIS/NISN siswa untuk melihat status terkini dan catatan dari pembina.
          </p>
        </div>

        <CekStatusForm />
      </main>

      <Footer />
    </div>
  );
}
