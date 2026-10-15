import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { jadwalRepo, ekstrakurikulerRepo } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PapanJadwal } from "@/components/jadwal/PapanJadwal";

export const metadata: Metadata = {
  title: "Jadwal Ekstrakurikuler | SDN Plumbungan",
  description:
    "Jadwal lengkap latihan kegiatan ekstrakurikuler SDN Plumbungan per hari, waktu pelaksanaan, dan lokasi aula/lapangan sekolah.",
};

export default async function JadwalPage() {
  const [semuaJadwal, semuaEkskul] = await Promise.all([
    jadwalRepo.getAll(),
    ekstrakurikulerRepo.getAllAktif(),
  ]);

  // Siapkan data dengan pembina dan slug
  const jadwalLengkap = semuaJadwal.map((j) => {
    const ekskul = semuaEkskul.find((e) => e.id === j.ekskul_id);
    return {
      ...j,
      ekskul_nama: ekskul ? ekskul.nama : j.ekskul_nama,
      ekskul_slug: ekskul?.slug,
      pembina: ekskul ? ekskul.pembina : "-",
      lokasi_final: j.lokasi || ekskul?.lokasi || "Sekolah",
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main id="konten-utama" className="flex-1 max-w-[1200px] w-full mx-auto px-5 md:px-8 py-10 md:py-14">
        {/* Header Halaman */}
        <div className="mb-10 text-left">
          <span className="text-primary font-bold text-[14px] tracking-wide uppercase">
            Agenda Kegiatan
          </span>
          <h1 className="font-heading font-semibold text-[30px] sm:text-[38px] text-ink leading-tight mt-1 mb-2">
            Jadwal Ekstrakurikuler
          </h1>
          <p className="text-[16px] text-muted max-w-2xl">
            Latihan diadakan rutin setiap pekan di lingkungan SDN Plumbungan. Pastikan siswa hadir tepat waktu sesuai lokasi masing-masing.
          </p>
        </div>

        {/* 1. Papan Jadwal Mingguan */}
        <div className="mb-14">
          <h2 className="font-heading font-semibold text-[22px] text-ink mb-4 text-left">
            Papan Jadwal Pekanan
          </h2>
          <PapanJadwal daftarJadwal={jadwalLengkap} />
        </div>

        {/* 2. Tabel Daftar Terperinci (DESAIN.md 6.4) */}
        <div className="bg-surface rounded-lg border border-line shadow-soft p-6 text-left">
          <h2 className="font-heading font-semibold text-[22px] text-ink mb-2">
            Daftar Lengkap Kegiatan & Pembina
          </h2>
          <p className="text-[14px] text-muted mb-6">
            Daftar terperinci nama kegiatan, hari pelaksanaan, rentang jam latihan, lokasi, dan guru pembina.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <caption className="sr-only">
                Daftar jadwal latihan ekstrakurikuler SDN Plumbungan
              </caption>
              <thead>
                <tr className="border-b-2 border-line bg-sage-deep/50 text-[14px] font-bold text-primary-dark">
                  <th scope="col" className="py-3 px-4">
                    Ekstrakurikuler
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Hari
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Waktu Latihan
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Tempat
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Pembina
                  </th>
                  <th scope="col" className="py-3 px-4 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60 text-[14px] text-ink">
                {jadwalLengkap.map((row) => (
                  <tr key={row.id} className="hover:bg-sage/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-ink">
                      {row.ekskul_nama}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-primary-dark">
                      {row.hari}
                    </td>
                    <td className="py-3.5 px-4 tabular-nums text-muted">
                      {row.jam_mulai} - {row.jam_selesai} WIB
                    </td>
                    <td className="py-3.5 px-4 text-muted">
                      {row.lokasi_final}
                    </td>
                    <td className="py-3.5 px-4 text-ink">
                      {row.pembina}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.ekskul_slug && (
                        <Link
                          href={`/ekstrakurikuler/${row.ekskul_slug}`}
                          className="min-h-[36px] px-3.5 py-1 text-[13px] font-semibold text-primary-hover hover:bg-sage border border-primary/40 rounded-pill inline-flex items-center justify-center transition-colors"
                        >
                          Rincian
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
