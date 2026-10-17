"use server";

import { pendaftaranRepo, ekstrakurikulerRepo, StatusPendaftaran } from "@/lib/data";

export interface HasilCekStatus {
  nomor: string;
  nama_siswa: string;
  ekskul_nama: string;
  status: StatusPendaftaran;
  catatan_admin: string | null;
  tanggal_daftar: string;
}

export type ActionCekStatusResult =
  | { sukses: true; data: HasilCekStatus }
  | { sukses: false; pesan: string };

export async function periksaStatusAction(
  prevState: unknown,
  formData: FormData
): Promise<ActionCekStatusResult> {
  const nomor = formData.get("nomor")?.toString().trim() ?? "";
  const nis = formData.get("nis")?.toString().trim() ?? "";

  if (!nomor || !nis) {
    return {
      sukses: false,
      pesan: "Nomor pendaftaran dan NIS/NISN wajib diisi.",
    };
  }

  try {
    const data = await pendaftaranRepo.cekStatus(nomor, nis);
    if (!data) {
      // Galat umum sesuai PRD 6.7 dan DESAIN 6.7 tanpa membocorkan kolom mana yang salah
      return {
        sukses: false,
        pesan: "Nomor pendaftaran atau NIS/NISN tidak cocok. Periksa kembali, lalu coba lagi.",
      };
    }

    const ekskul = await ekstrakurikulerRepo.getById(data.ekskul_id);

    return {
      sukses: true,
      data: {
        nomor: data.nomor,
        nama_siswa: data.nama_siswa,
        ekskul_nama: ekskul ? ekskul.nama : "Ekstrakurikuler",
        status: data.status,
        catatan_admin: data.catatan_admin,
        tanggal_daftar: data.created_at,
      },
    };
  } catch {
    return {
      sukses: false,
      pesan: "Terjadi kendala saat memeriksa status. Silakan coba kembali beberapa saat lagi.",
    };
  }
}
