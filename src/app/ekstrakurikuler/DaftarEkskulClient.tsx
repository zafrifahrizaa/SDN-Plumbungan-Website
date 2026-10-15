"use client";

import React, { useState } from "react";
import { EkstrakurikulerDenganJadwal, Hari } from "@/lib/data";
import { CardEkskul } from "@/components/ekskul/CardEkskul";
import { Button } from "@/components/ui/Button";

export interface DaftarEkskulClientProps {
  daftarEkskul: EkstrakurikulerDenganJadwal[];
}

const DAFTAR_HARI: Array<{ key: string; label: string }> = [
  { key: "semua", label: "Semua Hari" },
  { key: "Senin", label: "Senin" },
  { key: "Selasa", label: "Selasa" },
  { key: "Rabu", label: "Rabu" },
  { key: "Kamis", label: "Kamis" },
  { key: "Jumat", label: "Jumat" },
  { key: "Sabtu", label: "Sabtu" },
];

export const DaftarEkskulClient: React.FC<DaftarEkskulClientProps> = ({
  daftarEkskul,
}) => {
  const [filterHari, setFilterHari] = useState<string>("semua");

  const filteredEkskul = daftarEkskul.filter((ekskul) => {
    if (filterHari === "semua") return true;
    return ekskul.jadwal.some((j) => j.hari === (filterHari as Hari));
  });

  return (
    <div className="w-full">
      {/* Baris Chip Filter Hari */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar">
        {DAFTAR_HARI.map((item) => {
          const isActive = filterHari === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilterHari(item.key)}
              className={`min-h-[44px] px-5 py-2 rounded-pill text-[14px] font-semibold transition-all duration-150 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                isActive
                  ? "bg-primary text-white shadow-soft"
                  : "bg-surface text-ink hover:bg-sage border border-line"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Grid Card Ekskul */}
      {filteredEkskul.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 items-stretch">
          {filteredEkskul.map((ekskul) => (
            <CardEkskul key={ekskul.id} ekskul={ekskul} />
          ))}
        </div>
      ) : (
        /* Keadaan Kosong (Empty State) */
        <div className="bg-surface rounded-lg border border-line p-10 text-center flex flex-col items-center justify-center my-8 shadow-xs">
          <p className="text-[17px] font-semibold text-ink mb-1">
            Belum ada kegiatan di hari {filterHari}
          </p>
          <p className="text-[15px] text-muted max-w-md mb-6">
            Tidak ada jadwal latihan ekstrakurikuler yang berlangsung pada hari ini.
          </p>
          <Button onClick={() => setFilterHari("semua")} variant="primary">
            Tampilkan Semua Kegiatan
          </Button>
        </div>
      )}
    </div>
  );
};
