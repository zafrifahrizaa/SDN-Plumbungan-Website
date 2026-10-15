import React from "react";
import Link from "next/link";
import { Jadwal, Hari } from "@/lib/data";

export interface PapanJadwalProps {
  daftarJadwal: (Jadwal & { ekskul_nama: string; ekskul_slug?: string })[];
  ringkas?: boolean;
}

const HARI_SEKOLAH: Hari[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export const PapanJadwal: React.FC<PapanJadwalProps> = ({ daftarJadwal }) => {
  return (
    <div className="w-full">
      {/* Desktop 6 Columns Grid */}
      <div className="hidden lg:grid grid-cols-6 gap-3.5 items-start">
        {HARI_SEKOLAH.map((hari) => {
          const jadwalHari = daftarJadwal.filter((j) => j.hari === hari);

          return (
            <div
              key={hari}
              className="flex flex-col bg-surface rounded-md border border-line shadow-xs overflow-hidden"
            >
              <div className="bg-sage-deep px-3 py-2.5 border-b border-line text-center">
                <span className="font-heading font-bold text-[16px] text-primary-dark tracking-wide">
                  {hari}
                </span>
              </div>

              <div className="p-2.5 flex flex-col gap-2 min-h-[160px]">
                {jadwalHari.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center p-3 text-center">
                    <span className="text-[13px] text-muted italic">
                      Tidak ada kegiatan
                    </span>
                  </div>
                ) : (
                  jadwalHari.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 bg-paper rounded-xs border-l-4 border-marigold shadow-xs text-left"
                    >
                      <span className="block text-[12px] font-bold text-marigold-ink tabular-nums">
                        {item.jam_mulai} - {item.jam_selesai}
                      </span>
                      {item.ekskul_slug ? (
                        <Link
                          href={`/ekstrakurikuler/${item.ekskul_slug}`}
                          className="font-semibold text-[14px] text-ink hover:text-primary-hover hover:underline line-clamp-1 block mt-0.5"
                        >
                          {item.ekskul_nama}
                        </Link>
                      ) : (
                        <span className="font-semibold text-[14px] text-ink line-clamp-1 block mt-0.5">
                          {item.ekskul_nama}
                        </span>
                      )}
                      {item.lokasi && (
                        <span className="block text-[12px] text-muted truncate mt-0.5">
                          {item.lokasi}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile & Tablet: Daftar Per Hari */}
      <div className="lg:hidden flex flex-col gap-3">
        {HARI_SEKOLAH.map((hari) => {
          const jadwalHari = daftarJadwal.filter((j) => j.hari === hari);

          return (
            <div
              key={hari}
              className="bg-surface rounded-md border border-line shadow-xs overflow-hidden"
            >
              <div className="bg-sage px-4 py-3 border-b border-line flex items-center justify-between">
                <span className="font-heading font-bold text-[17px] text-primary-dark">
                  {hari}
                </span>
                <span className="text-[13px] font-semibold text-muted">
                  {jadwalHari.length} Kegiatan
                </span>
              </div>

              <div className="p-3 flex flex-col gap-2">
                {jadwalHari.length === 0 ? (
                  <p className="text-[14px] text-muted italic py-2 px-1">
                    Tidak ada kegiatan ekstrakurikuler pada hari ini.
                  </p>
                ) : (
                  jadwalHari.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-paper rounded-xs border-l-4 border-marigold flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <span className="block text-[13px] font-bold text-marigold-ink tabular-nums">
                          {item.jam_mulai} - {item.jam_selesai} WIB
                        </span>
                        <h4 className="font-semibold text-[15px] text-ink mt-0.5">
                          {item.ekskul_nama}
                        </h4>
                        {item.lokasi && (
                          <span className="text-[13px] text-muted block mt-0.5">
                            Lokasi: {item.lokasi}
                          </span>
                        )}
                      </div>

                      {item.ekskul_slug && (
                        <Link
                          href={`/ekstrakurikuler/${item.ekskul_slug}`}
                          className="min-h-[40px] px-3.5 inline-flex items-center justify-center text-[13px] font-semibold text-primary-hover bg-white border border-primary rounded-pill shrink-0"
                        >
                          Lihat
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
