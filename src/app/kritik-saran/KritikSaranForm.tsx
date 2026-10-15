"use client";

import React, { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { KategoriKritikSaran } from "@/lib/data";
import { kirimKritikSaranAction } from "./actions";

const KATEGORI_LIST: Array<{ key: KategoriKritikSaran; label: string }> = [
  { key: "ekstrakurikuler", label: "Ekstrakurikuler" },
  { key: "jadwal", label: "Jadwal" },
  { key: "website", label: "Website" },
  { key: "fasilitas", label: "Fasilitas" },
  { key: "lainnya", label: "Lainnya" },
];

export const KritikSaranForm: React.FC = () => {
  const [kategori, setKategori] = useState<KategoriKritikSaran>("ekstrakurikuler");
  const [pesanSukses, setPesanSukses] = useState(false);
  const [pesanGalat, setPesanGalat] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPesanGalat(null);

    const formData = new FormData(e.currentTarget);
    formData.set("kategori", kategori);

    const res = await kirimKritikSaranAction(formData);
    setIsSubmitting(false);

    if (res.sukses) {
      setPesanSukses(true);
    } else {
      setPesanGalat(res.pesan || "Terjadi kendala saat mengirim masukan.");
    }
  };

  if (pesanSukses) {
    return (
      <div className="bg-surface rounded-lg border border-line p-8 text-center flex flex-col items-center">
        <Alert variant="sukses" title="Terima kasih!" className="w-full text-left mb-6">
          Masukan dan saranmu sudah kami terima. Kami akan menggunakannya untuk terus meningkatkan kualitas kegiatan di SDN Plumbungan.
        </Alert>
        <Button onClick={() => setPesanSukses(false)} variant="secondary">
          Kirim Masukan Lain
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface rounded-lg border border-line shadow-soft p-6 sm:p-8 flex flex-col gap-6 text-left"
    >
      {pesanGalat && (
        <Alert variant="galat" title="Gagal Mengirim">
          {pesanGalat}
        </Alert>
      )}

      {/* Nama Pengirim */}
      <Field
        label="Nama Lengkap"
        name="nama"
        placeholder="Contoh: Budi Santoso / Ibu Siti"
        required
      />

      {/* Kelas Siswa */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="input-kelas" className="text-[15px] font-semibold text-ink flex items-center justify-between">
          <span>Kelas Siswa</span>
          <span className="text-[13px] font-normal text-muted">(wajib)</span>
        </label>
        <select
          id="input-kelas"
          name="kelas"
          required
          defaultValue="4"
          className="min-h-[48px] px-4 py-2 text-[16px] rounded-sm bg-surface text-ink border-[1.5px] border-line focus:outline-none focus:border-primary-dark"
        >
          <option value="1">Kelas 1</option>
          <option value="2">Kelas 2</option>
          <option value="3">Kelas 3</option>
          <option value="4">Kelas 4</option>
          <option value="5">Kelas 5</option>
          <option value="6">Kelas 6</option>
        </select>
      </div>

      {/* Pilihan Kategori Berupa Chip Tunggal */}
      <div className="flex flex-col gap-2">
        <label className="text-[15px] font-semibold text-ink flex items-center justify-between">
          <span>Kategori Masukan</span>
          <span className="text-[13px] font-normal text-muted">(pilih satu)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {KATEGORI_LIST.map((item) => {
            const isSelected = kategori === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setKategori(item.key)}
                className={`min-h-[40px] px-4 py-1.5 rounded-pill text-[14px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                  isSelected
                    ? "bg-primary text-white shadow-soft"
                    : "bg-sage text-ink hover:bg-sage-deep border border-line/60"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Isi Pesan */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="input-pesan" className="text-[15px] font-semibold text-ink flex items-center justify-between">
          <span>Isi Kritik atau Saran</span>
          <span className="text-[13px] font-normal text-muted">(wajib)</span>
        </label>
        <textarea
          id="input-pesan"
          name="pesan"
          required
          rows={4}
          placeholder="Tuliskan masukan atau pertanyaanmu dengan santun..."
          className="px-4 py-3 text-[16px] rounded-sm bg-surface text-ink border-[1.5px] border-line focus:outline-none focus:border-primary-dark resize-y"
        />
      </div>

      {/* Kontak (Opsional) */}
      <Field
        label="Nomor WhatsApp / Kontak"
        name="kontak"
        placeholder="Contoh: 081234567890 (opsional jika ingin dihubungi)"
        helperText="Opsional. Diisi jika Bapak/Ibu ingin dihubungi oleh pihak sekolah terkait masukan ini."
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          loadingText="Mengirim Masukan..."
          className="w-full sm:w-auto"
        >
          Kirim Kritik & Saran
        </Button>
      </div>
    </form>
  );
};
