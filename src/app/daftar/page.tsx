import React, { Suspense } from "react";
import { Metadata } from "next";
import { ekstrakurikulerRepo } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FormulirPendaftaran } from "./FormulirPendaftaran";

export const metadata: Metadata = {
  title: "Formulir Pendaftaran Ekstrakurikuler | SDN Plumbungan",
  description:
    "Formulir online pendaftaran kegiatan ekstrakurikuler SDN Plumbungan. Lengkapi data siswa dan kontak orang tua dengan mudah dan aman.",
};

async function DaftarContent({
  searchParams,
}: {
  searchParams: Promise<{ ekskul?: string }>;
}) {
  const { ekskul } = await searchParams;
  const daftarEkskul = await ekstrakurikulerRepo.getAllAktif();

  return (
    <FormulirPendaftaran
      daftarEkskul={daftarEkskul}
      initialSlug={ekskul}
    />
  );
}

export default function DaftarPage({
  searchParams,
}: {
  searchParams: Promise<{ ekskul?: string }>;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main id="konten-utama" className="flex-1 max-w-[800px] w-full mx-auto px-5 md:px-8 py-10 md:py-16 text-left">
        <div className="mb-8">
          <span className="text-primary font-bold text-[14px] tracking-wide uppercase">
            Pendaftaran Baru
          </span>
          <h1 className="font-heading font-semibold text-[30px] sm:text-[38px] text-ink leading-tight mt-1 mb-2">
            Pendaftaran Ekstrakurikuler
          </h1>
          <p className="text-[16px] text-muted">
            Silakan lengkapi formulir pendaftaran di bawah ini bersama orang tua atau wali murid.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="bg-surface rounded-lg border border-line p-10 text-center text-muted">
              Memuat formulir pendaftaran...
            </div>
          }
        >
          <DaftarContent searchParams={searchParams} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
