"use server";

import { z } from "zod";
import { kritikSaranRepo, KategoriKritikSaran } from "@/lib/data";

const KritikSaranSchema = z.object({
  nama: z.string().min(2, "Nama wajib diisi minimal 2 karakter.").max(100),
  kelas: z.coerce.number().min(1).max(6),
  kategori: z.enum(["ekstrakurikuler", "jadwal", "website", "fasilitas", "lainnya"]),
  pesan: z.string().min(5, "Pesan wajib diisi minimal 5 karakter.").max(1000),
  kontak: z.string().max(50).optional().nullable(),
});

export async function kirimKritikSaranAction(formData: FormData) {
  try {
    const rawData = {
      nama: formData.get("nama"),
      kelas: formData.get("kelas"),
      kategori: formData.get("kategori") as KategoriKritikSaran,
      pesan: formData.get("pesan"),
      kontak: formData.get("kontak") ? String(formData.get("kontak")).trim() : null,
    };

    const parsed = KritikSaranSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        sukses: false,
        pesan: parsed.error.issues[0]?.message || "Format data belum sesuai.",
      };
    }

    await kritikSaranRepo.kirim({
      nama: parsed.data.nama,
      kelas: parsed.data.kelas,
      kategori: parsed.data.kategori,
      pesan: parsed.data.pesan,
      kontak: parsed.data.kontak ?? null,
    });

    return { sukses: true };
  } catch {
    return {
      sukses: false,
      pesan: "Terjadi kendala pada server saat menyimpan masukan. Silakan coba lagi.",
    };
  }
}
