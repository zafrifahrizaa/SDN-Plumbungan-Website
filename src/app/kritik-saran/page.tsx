import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { KritikSaranForm } from "./KritikSaranForm";

export const metadata: Metadata = {
  title: "Kritik & Saran | SDN Plumbungan",
  description:
    "Sampaikan masukan, kritik membangun, atau saran untuk kemajuan ekstrakurikuler SDN Plumbungan.",
};

export default function KritikSaranPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main id="konten-utama" className="flex-1 max-w-[720px] w-full mx-auto px-5 md:px-8 py-10 md:py-16 text-left">
        <div className="mb-8">
          <span className="text-primary font-bold text-[14px] tracking-wide uppercase">
            Kotak Masukan
          </span>
          <h1 className="font-heading font-semibold text-[30px] sm:text-[38px] text-ink leading-tight mt-1 mb-2">
            Kritik & Saran
          </h1>
          <p className="text-[16px] text-muted">
            Kami terbuka menerima kritik dan saran demi kemajuan kegiatan dan pelayanan ekstrakurikuler di SDN Plumbungan.
          </p>
        </div>

        <KritikSaranForm />
      </main>

      <Footer />
    </div>
  );
}
