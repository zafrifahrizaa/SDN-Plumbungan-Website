import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />
      <main
        id="konten-utama"
        className="flex-1 flex items-center justify-center px-5 py-16"
      >
        <div className="max-w-md w-full text-center flex flex-col items-center">
          <span className="font-heading font-bold text-6xl text-primary-dark">
            404
          </span>
          <h1 className="font-heading font-semibold text-2xl text-ink mt-3">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-[16px] text-muted leading-relaxed mt-2 mb-8">
            Halaman yang kamu tuju tidak ditemukan atau alamat tautannya telah berpindah. Periksa kembali alamat URL atau kembali ke halaman utama.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <Link
              href="/"
              className="min-h-[48px] px-6 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-primary text-white hover:bg-primary-hover shadow-soft"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/ekstrakurikuler"
              className="min-h-[48px] px-6 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-surface text-primary-hover border-[1.5px] border-primary hover:bg-sage"
            >
              Pilihan Ekstrakurikuler
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
