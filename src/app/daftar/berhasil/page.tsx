import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BadgeStatus } from "@/components/ui/BadgeStatus";
import { SalinNomorButton } from "./SalinNomorButton";
import { CheckCircle2, Camera } from "lucide-react";
import { StatusPendaftaran } from "@/lib/aturan";

export const metadata: Metadata = {
  title: "Pendaftaran Berhasil! | SDN Plumbungan",
  description:
    "Bukti pengiriman pendaftaran ekstrakurikuler SDN Plumbungan. Simpan nomor pendaftaran untuk mengecek status verifikasi.",
};

export default async function PendaftaranBerhasilPage({
  searchParams,
}: {
  searchParams: Promise<{ nomor?: string; nama?: string; status?: string }>;
}) {
  const { nomor, nama, status } = await searchParams;
  const noPendaftaran = nomor || "EKS-2026-0001";
  const namaSiswa = nama || "Siswa";
  const statusPendaftaran = (status as StatusPendaftaran) || "menunggu_verifikasi";

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main id="konten-utama" className="flex-1 max-w-[640px] w-full mx-auto px-5 md:px-8 py-12 md:py-16 text-center flex flex-col items-center">
        {/* Ikon Berhasil */}
        <div className="w-16 h-16 rounded-circle bg-sage-deep text-primary flex items-center justify-center mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h1 className="font-heading font-bold text-[32px] sm:text-[40px] text-ink leading-tight">
          Pendaftaran Berhasil!
        </h1>

        <p className="text-[16px] text-muted mt-2 mb-8 max-w-md">
          Terima kasih, data pendaftaran untuk <strong className="text-ink">{namaSiswa}</strong> telah tersimpan di sistem ekstrakurikuler SDN Plumbungan.
        </p>

        {/* Kotak Besar Nomor Pendaftaran (DESAIN.md 6.6) */}
        <div className="w-full bg-surface rounded-lg border-2 border-line p-8 shadow-soft flex flex-col items-center mb-8">
          <span className="text-[14px] font-semibold text-muted uppercase tracking-wider mb-2">
            Nomor Pendaftaran Kamu
          </span>

          <span className="font-heading font-bold text-[32px] sm:text-[42px] text-primary-dark tracking-wider select-all tabular-nums py-1">
            {noPendaftaran}
          </span>

          <div className="mt-3 flex items-center gap-3">
            <BadgeStatus status={statusPendaftaran} size="md" />
            <SalinNomorButton nomor={noPendaftaran} />
          </div>

          {/* Anjuran Tangkap Layar */}
          <div className="mt-6 pt-5 border-t border-line/60 w-full flex items-center justify-center gap-2 text-[14px] text-muted">
            <Camera className="w-4 h-4 text-primary" />
            <span>Disarankan untuk melakukan tangkapan layar (screenshot) halaman ini.</span>
          </div>
        </div>

        <p className="text-[15px] text-muted leading-relaxed mb-8">
          Simpan nomor pendaftaran di atas dengan baik. Bapak/Ibu atau siswa dapat memantau hasil verifikasi dan pengumuman penerimaan melalui halaman Cek Status.
        </p>

        {/* Dua Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link
            href="/cek-status"
            className="min-h-[48px] px-8 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-primary text-white hover:bg-primary-hover shadow-soft"
          >
            Cek Status Pendaftaran
          </Link>
          <Link
            href="/"
            className="min-h-[48px] px-8 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-surface text-primary-hover border-[1.5px] border-primary hover:bg-sage"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
