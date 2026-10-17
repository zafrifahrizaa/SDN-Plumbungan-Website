"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EkstrakurikulerDenganJadwal } from "@/lib/data";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { prosesPendaftaranAction, ActionDaftarResult } from "./actions";
import { ShieldCheck, Info } from "lucide-react";

export interface FormulirPendaftaranProps {
  daftarEkskul: EkstrakurikulerDenganJadwal[];
  initialSlug?: string;
}

const initialState: ActionDaftarResult = {
  sukses: false,
  pesan: "",
};

export const FormulirPendaftaran: React.FC<FormulirPendaftaranProps> = ({
  daftarEkskul,
  initialSlug,
}) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    prosesPendaftaranAction,
    initialState
  );

  const selectedInitialEkskul = daftarEkskul.find((e) => e.slug === initialSlug);
  const defaultEkskulId = selectedInitialEkskul ? selectedInitialEkskul.id : "";

  useEffect(() => {
    if (state.sukses) {
      const params = new URLSearchParams({
        nomor: state.nomor,
        nama: state.nama_siswa,
        status: state.status,
      });
      router.push(`/daftar/berhasil?${params.toString()}`);
    }
  }, [state, router]);

  const errors = !state.sukses ? state.errors : undefined;

  return (
    <form
      action={formAction}
      className="bg-surface rounded-lg border border-line shadow-soft p-6 sm:p-10 flex flex-col gap-10 text-left"
    >
      {/* Honeypot Anti-Spam Hidden Input */}
      <div
        className="opacity-0 absolute top-0 left-0 h-0 w-0 -z-50 pointer-events-none"
        aria-hidden="true"
      >
        <label htmlFor="website_url_hp">Website URL</label>
        <input
          type="text"
          id="website_url_hp"
          name="website_url_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Ringkasan Galat Server */}
      {!state.sukses && state.pesan && (
        <Alert variant="galat" title="Perhatian" id="form-error-summary">
          {state.pesan}
        </Alert>
      )}

      {/* =========================================================================
          KELOMPOK 1: DATA SISWA
      ========================================================================== */}
      <section className="flex flex-col gap-5">
        <div className="pb-3 border-b border-line">
          <h2 className="font-heading font-semibold text-[20px] text-primary-dark">
            1. Data Siswa
          </h2>
          <p className="text-[14px] text-muted">
            Masukkan data identitas siswa sesuai dengan data yang tercatat di sekolah.
          </p>
        </div>

        <Field
          label="Nama Lengkap Siswa"
          name="nama_siswa"
          required
          placeholder="Contoh: Muhammad Rizky Pratama"
          error={errors?.nama_siswa}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="NIS / NISN Siswa"
            name="nis"
            required
            placeholder="Contoh: 123456"
            helperText="Angka 4–10 digit."
            error={errors?.nis}
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="kelas" className="text-[15px] font-semibold text-ink flex items-center justify-between">
              <span>Kelas Siswa</span>
              <span className="text-[13px] font-normal text-muted">(wajib)</span>
            </label>
            <select
              id="kelas"
              name="kelas"
              required
              defaultValue="3"
              className="min-h-[48px] px-4 py-2 text-[16px] rounded-sm bg-surface text-ink border-[1.5px] border-line focus:outline-none focus:border-primary-dark"
            >
              {[1, 2, 3, 4, 5, 6].map((k) => (
                <option key={k} value={k}>
                  Kelas {k}
                </option>
              ))}
            </select>
            {errors?.kelas && (
              <span className="text-[13px] text-danger font-medium mt-0.5">
                {errors.kelas}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="jenis_kelamin" className="text-[15px] font-semibold text-ink flex items-center justify-between">
              <span>Jenis Kelamin</span>
              <span className="text-[13px] font-normal text-muted">(wajib)</span>
            </label>
            <select
              id="jenis_kelamin"
              name="jenis_kelamin"
              required
              defaultValue="L"
              className="min-h-[48px] px-4 py-2 text-[16px] rounded-sm bg-surface text-ink border-[1.5px] border-line focus:outline-none focus:border-primary-dark"
            >
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <Field
            label="Tanggal Lahir Siswa"
            name="tanggal_lahir"
            type="date"
            required
            error={errors?.tanggal_lahir}
          />
        </div>
      </section>

      {/* =========================================================================
          KELOMPOK 2: DATA ORANG TUA / WALI
      ========================================================================== */}
      <section className="flex flex-col gap-5">
        <div className="pb-3 border-b border-line">
          <h2 className="font-heading font-semibold text-[20px] text-primary-dark">
            2. Data Orang Tua / Wali
          </h2>
          <p className="text-[14px] text-muted">
            Digunakan oleh guru/pembina untuk konfirmasi kegiatan dan situasi mendesak.
          </p>
        </div>

        <Field
          label="Nama Orang Tua / Wali"
          name="nama_wali"
          required
          placeholder="Contoh: Gunawan Wibisono"
          error={errors?.nama_wali}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Nomor WhatsApp Aktif"
            name="no_wa"
            required
            type="tel"
            placeholder="Contoh: 081234567890"
            helperText="Format nomor Indonesia (08... / 62...)"
            error={errors?.no_wa}
          />

          <Field
            label="Alamat Email"
            name="email"
            type="email"
            placeholder="Contoh: orangtua@gmail.com (opsional)"
            error={errors?.email}
          />
        </div>
      </section>

      {/* =========================================================================
          KELOMPOK 3: PILIHAN EKSTRAKURIKULER
      ========================================================================== */}
      <section className="flex flex-col gap-5">
        <div className="pb-3 border-b border-line">
          <h2 className="font-heading font-semibold text-[20px] text-primary-dark">
            3. Pilihan Ekstrakurikuler
          </h2>
          <p className="text-[14px] text-muted">
            Pilih salah satu kegiatan ekstrakurikuler yang ingin diikuti oleh siswa.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ekskul_id" className="text-[15px] font-semibold text-ink flex items-center justify-between">
            <span>Pilihan Kegiatan</span>
            <span className="text-[13px] font-normal text-muted">(wajib)</span>
          </label>
          <select
            id="ekskul_id"
            name="ekskul_id"
            required
            defaultValue={defaultEkskulId}
            className="min-h-[48px] px-4 py-2 text-[16px] rounded-sm bg-surface text-ink border-[1.5px] border-line focus:outline-none focus:border-primary-dark"
          >
            <option value="" disabled>
              -- Pilih salah satu ekstrakurikuler --
            </option>
            {daftarEkskul.map((e) => (
              <option
                key={e.id}
                value={e.id}
                disabled={!e.pendaftaran_dibuka || e.sisa_kuota <= 0}
              >
                {e.nama}{" "}
                {!e.pendaftaran_dibuka
                  ? "(Pendaftaran Ditutup)"
                  : e.sisa_kuota <= 0
                  ? "(Kuota Penuh)"
                  : `(Sisa ${e.sisa_kuota} kursi)`}
              </option>
            ))}
          </select>
          {errors?.ekskul_id && (
            <span className="text-[13px] text-danger font-medium mt-0.5">
              {errors.ekskul_id}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="alasan" className="text-[15px] font-semibold text-ink flex items-center justify-between">
            <span>Alasan Mengikuti Kegiatan</span>
            <span className="text-[13px] font-normal text-muted">(opsional)</span>
          </label>
          <textarea
            id="alasan"
            name="alasan"
            rows={3}
            maxLength={300}
            placeholder="Ceritakan minat atau motivasi siswa mengikuti kegiatan ini..."
            className="px-4 py-3 text-[16px] rounded-sm bg-surface text-ink border-[1.5px] border-line focus:outline-none focus:border-primary-dark resize-y"
          />
          <span className="text-[13px] text-muted">Maksimal 300 karakter.</span>
        </div>
      </section>

      {/* =========================================================================
          KELOMPOK 4: PERSETUJUAN ORANG TUA & PRIVASI
      ========================================================================== */}
      <section className="flex flex-col gap-5 pt-2 border-t border-line">
        <div className="p-4 rounded-md bg-sage border border-line flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div className="text-[13px] text-muted leading-relaxed">
            <strong className="text-ink font-semibold block mb-0.5">
              Pemberitahuan Pelindungan Data Pribadi:
            </strong>
            Data siswa dan kontak orang tua yang dikumpulkan semata-mata digunakan untuk kepentingan administrasi kegiatan ekstrakurikuler SDN Plumbungan, tidak akan dipublikasikan secara umum, dan dijaga kerahasiaannya.
          </div>
        </div>

        <div className="flex items-start gap-3.5 mt-2">
          <input
            type="checkbox"
            id="persetujuan"
            name="persetujuan"
            value="true"
            required
            className="w-6 h-6 mt-0.5 rounded-xs border-2 border-line text-primary focus:ring-primary-dark shrink-0 cursor-pointer"
          />
          <label
            htmlFor="persetujuan"
            className="text-[15px] text-ink leading-relaxed select-none cursor-pointer"
          >
            Saya selaku orang tua/wali murid memberikan persetujuan kepada anak saya untuk mengikuti kegiatan ekstrakurikuler yang dipilih serta mematuhi peraturan yang berlaku di SDN Plumbungan.
          </label>
        </div>
        {errors?.persetujuan && (
          <span className="text-[13px] text-danger font-medium -mt-2">
            {errors.persetujuan}
          </span>
        )}
      </section>

      {/* Tombol Kirim */}
      <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[14px] text-muted">
          <Info className="w-4 h-4 shrink-0" />
          <span>Pastikan seluruh isian sudah diperiksa kembali.</span>
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={isPending}
          loadingText="Mengirim Pendaftaran..."
          className="w-full sm:w-auto"
        >
          Kirim Pendaftaran Sekarang
        </Button>
      </div>
    </form>
  );
};
