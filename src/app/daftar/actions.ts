"use server";

import { pendaftaranRepo } from "@/lib/data";
import { PendaftaranFormSchema } from "@/lib/validasi/pendaftaran";

export type ActionDaftarResult =
  | {
      sukses: true;
      nomor: string;
      status: string;
      nama_siswa: string;
      ekskul_id: string;
    }
  | {
      sukses: false;
      pesan: string;
      kode?: string;
      errors?: Record<string, string>;
    };

export async function prosesPendaftaranAction(
  prevState: unknown,
  formData: FormData
): Promise<ActionDaftarResult> {
  try {
    // 1. Ekstrak data mentah
    const rawData = {
      nama_siswa: formData.get("nama_siswa")?.toString().trim() ?? "",
      nis: formData.get("nis")?.toString().trim() ?? "",
      kelas: formData.get("kelas")?.toString() ?? "",
      jenis_kelamin: formData.get("jenis_kelamin")?.toString() ?? "",
      tanggal_lahir: formData.get("tanggal_lahir")?.toString() ?? "",
      nama_wali: formData.get("nama_wali")?.toString().trim() ?? "",
      no_wa: formData.get("no_wa")?.toString().trim() ?? "",
      email: formData.get("email")?.toString().trim() || null,
      ekskul_id: formData.get("ekskul_id")?.toString() ?? "",
      alasan: formData.get("alasan")?.toString().trim() || null,
      persetujuan: formData.get("persetujuan") === "on" || formData.get("persetujuan") === "true",
      website_url_hp: formData.get("website_url_hp")?.toString() ?? "",
    };

    // 2. Proteksi Spam Honeypot
    if (rawData.website_url_hp && rawData.website_url_hp.length > 0) {
      return {
        sukses: false,
        pesan: "Terdeteksi aktivitas mencurigakan. Pendaftaran dibatalkan.",
        kode: "SPAM",
      };
    }

    // 3. Validasi Zod Server-side
    const parsed = PendaftaranFormSchema.safeParse(rawData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });

      return {
        sukses: false,
        pesan: parsed.error.issues[0]?.message || "Periksa kembali isian formulir pendaftaran.",
        errors: fieldErrors,
      };
    }

    // 4. Eksekusi Atomic Melalui Repository
    const hasil = await pendaftaranRepo.daftar({
      ekskul_id: parsed.data.ekskul_id,
      nama_siswa: parsed.data.nama_siswa,
      nis: parsed.data.nis,
      kelas: parsed.data.kelas,
      jenis_kelamin: parsed.data.jenis_kelamin,
      tanggal_lahir: parsed.data.tanggal_lahir,
      nama_wali: parsed.data.nama_wali,
      no_wa: parsed.data.no_wa,
      email: parsed.data.email ?? null,
      alasan: parsed.data.alasan ?? null,
      persetujuan: true,
    });

    if (!hasil.sukses) {
      return {
        sukses: false,
        pesan: hasil.pesan,
        kode: hasil.kode,
      };
    }

    return {
      sukses: true,
      nomor: hasil.data.nomor,
      status: hasil.data.status,
      nama_siswa: hasil.data.nama_siswa,
      ekskul_id: hasil.data.ekskul_id,
    };
  } catch {
    return {
      sukses: false,
      pesan: "Pendaftaran belum terkirim karena kendala server. Silakan coba beberapa saat lagi.",
    };
  }
}
