import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EkstrakurikulerDenganJadwal } from "@/lib/data";
import { ChipHari } from "@/components/ui/ChipHari";

export interface CardEkskulProps {
  ekskul: EkstrakurikulerDenganJadwal;
}

export const CardEkskul: React.FC<CardEkskulProps> = ({ ekskul }) => {
  const isPendaftaranTutup = !ekskul.pendaftaran_dibuka;
  const isKuotaPenuh = ekskul.sisa_kuota <= 0;
  const persentaseSisa = ekskul.kuota > 0 ? (ekskul.sisa_kuota / ekskul.kuota) * 100 : 0;
  const kuotaKritis = ekskul.sisa_kuota > 0 && persentaseSisa <= 20;

  // Jadwal pertama untuk label hari
  const jadwalUtama = ekskul.jadwal[0];

  return (
    <div className="flex flex-col bg-surface rounded-lg border border-line shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all duration-180 overflow-hidden text-left h-full">
      {/* 1. Bagian Foto & Label Hari */}
      <Link
        href={`/ekstrakurikuler/${ekskul.slug}`}
        className="relative aspect-4/3 w-full bg-sage-deep block overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary-dark"
      >
        {ekskul.foto_path ? (
          <Image
            src={ekskul.foto_path}
            alt={`Foto kegiatan ${ekskul.nama}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-sage-deep text-primary-dark">
            <span className="font-heading font-bold text-5xl">
              {ekskul.nama.charAt(0)}
            </span>
            <span className="text-[13px] font-medium text-muted mt-1">
              Foto menyusul
            </span>
          </div>
        )}

        {/* Label Hari menumpuk di kiri bawah foto */}
        {jadwalUtama && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
            <ChipHari hari={jadwalUtama.hari} jam={jadwalUtama.jam_mulai} />
          </div>
        )}
      </Link>

      {/* 2. Isi Card */}
      <div className="flex flex-col flex-1 p-5">
        <Link
          href={`/ekstrakurikuler/${ekskul.slug}`}
          className="hover:text-primary-hover focus:outline-none focus:underline"
        >
          <h3 className="font-heading font-semibold text-[20px] leading-tight text-ink">
            {ekskul.nama}
          </h3>
        </Link>

        <p className="text-[15px] text-muted leading-relaxed line-clamp-2 mt-2 mb-4">
          {ekskul.deskripsi}
        </p>

        {/* Baris Meta: Pembina & Sisa Kuota */}
        <div className="mt-auto pt-3 border-t border-line/60 flex flex-col gap-1 text-[14px]">
          <div className="flex items-center justify-between text-muted">
            <span>Pembina:</span>
            <span className="font-medium text-ink truncate max-w-[170px]">
              {ekskul.pembina}
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <span className="text-muted">Ketersediaan:</span>
            {isKuotaPenuh ? (
              <span className="font-bold text-danger text-[13px]">
                Kuota penuh
              </span>
            ) : (
              <span
                className={`font-semibold text-[13px] px-2 py-0.5 rounded-sm tabular-nums ${
                  kuotaKritis
                    ? "bg-marigold-soft text-marigold-ink"
                    : "text-primary-dark"
                }`}
              >
                Sisa {ekskul.sisa_kuota} dari {ekskul.kuota} kursi
              </span>
            )}
          </div>
        </div>

        {/* 3. Dua Tombol Aksi */}
        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <Link
            href={`/ekstrakurikuler/${ekskul.slug}`}
            className="min-h-[44px] px-3 inline-flex items-center justify-center font-body font-semibold text-[14px] rounded-pill bg-surface text-primary-hover border-[1.5px] border-primary hover:bg-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark text-center"
          >
            Lihat Detail
          </Link>

          {isPendaftaranTutup ? (
            <button
              disabled
              title="Pendaftaran ditutup"
              className="min-h-[44px] px-3 inline-flex items-center justify-center font-body font-semibold text-[13px] rounded-pill bg-sage-deep text-muted cursor-not-allowed text-center"
            >
              Ditutup
            </button>
          ) : isKuotaPenuh ? (
            <button
              disabled
              title="Kuota penuh"
              className="min-h-[44px] px-3 inline-flex items-center justify-center font-body font-semibold text-[13px] rounded-pill bg-sage-deep text-muted cursor-not-allowed text-center"
            >
              Penuh
            </button>
          ) : (
            <Link
              href={`/daftar?ekskul=${ekskul.slug}`}
              className="min-h-[44px] px-3 inline-flex items-center justify-center font-body font-semibold text-[14px] rounded-pill bg-primary text-white hover:bg-primary-hover shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark text-center"
            >
              Daftar
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
