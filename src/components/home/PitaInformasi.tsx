import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, Clock } from "lucide-react";

export interface PitaInformasiProps {
  totalEkskul: number;
  batasPendaftaran: string;
  hariKegiatan: string;
}

export const PitaInformasi: React.FC<PitaInformasiProps> = ({
  totalEkskul,
  batasPendaftaran,
  hariKegiatan,
}) => {
  return (
    <div className="w-full max-w-[1080px] mx-auto bg-surface border border-line shadow-soft rounded-lg md:rounded-pill p-3 md:p-3.5 -mt-10 md:-mt-12 relative z-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
        {/* Sel 1: Jumlah Ekskul */}
        <div className="flex items-center gap-3 px-4 py-1.5 w-full md:w-auto">
          <div className="w-9 h-9 rounded-circle bg-sage-deep text-primary-dark flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-[17px] text-ink leading-tight tabular-nums">
              {totalEkskul} Kegiatan
            </span>
            <span className="text-[13px] text-muted -mt-0.5">
              Pilihan Bakat Siswa
            </span>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-line" aria-hidden="true" />

        {/* Sel 2: Batas Pendaftaran */}
        <div className="flex items-center gap-3 px-4 py-1.5 w-full md:w-auto">
          <div className="w-9 h-9 rounded-circle bg-marigold-soft text-marigold-ink flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-[15px] text-ink leading-tight">
              Pendaftaran Dibuka
            </span>
            <span className="text-[13px] text-muted -mt-0.5">
              s.d. {batasPendaftaran}
            </span>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-line" aria-hidden="true" />

        {/* Sel 3: Hari Kegiatan */}
        <div className="flex items-center gap-3 px-4 py-1.5 w-full md:w-auto">
          <div className="w-9 h-9 rounded-circle bg-sage text-primary-dark flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-[15px] text-ink leading-tight">
              Hari Latihan
            </span>
            <span className="text-[13px] text-muted -mt-0.5">
              {hariKegiatan}
            </span>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="w-full md:w-auto px-2">
          <Link
            href="/daftar"
            className="w-full md:w-auto min-h-[48px] px-7 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-primary text-white hover:bg-primary-hover shadow-soft active:scale-[0.98] transition-all text-center"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};
