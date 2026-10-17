import { z } from "zod";
import { normalisasiNomorWhatsApp } from "../aturan";

export const PendaftaranFormSchema = z.object({
  // Data Siswa
  nama_siswa: z
    .string()
    .min(3, "Nama lengkap siswa wajib diisi minimal 3 karakter.")
    .max(100, "Nama lengkap siswa maksimal 100 karakter.")
    .regex(
      /^[a-zA-Z\s\.\'\-]+$/,
      "Nama hanya boleh berisi huruf, spasi, titik, apostrof, atau tanda hubung."
    ),
  nis: z
    .string()
    .min(4, "NIS/NISN minimal 4 digit.")
    .max(10, "NIS/NISN maksimal 10 digit.")
    .regex(/^\d+$/, "NIS/NISN hanya boleh berisi angka."),
  kelas: z.coerce
    .number()
    .min(1, "Pilih kelas siswa.")
    .max(6, "Kelas siswa maksimal kelas 6."),
  jenis_kelamin: z.enum(["L", "P"], {
    message: "Pilih jenis kelamin siswa (Laki-laki atau Perempuan).",
  }),
  tanggal_lahir: z
    .string()
    .min(1, "Tanggal lahir siswa wajib diisi.")
    .refine((val) => {
      const tgl = new Date(val);
      if (isNaN(tgl.getTime())) return false;
      const sekarang = new Date();
      if (tgl >= sekarang) return false;

      // Hitung perkiraan umur (usia anak SD umumnya 5–15 tahun)
      const umur = sekarang.getFullYear() - tgl.getFullYear();
      return umur >= 5 && umur <= 15;
    }, "Tanggal lahir tidak valid. Usia siswa SD berkisar antara 5 hingga 15 tahun."),

  // Data Wali
  nama_wali: z
    .string()
    .min(3, "Nama orang tua/wali wajib diisi minimal 3 karakter.")
    .max(100, "Nama orang tua/wali maksimal 100 karakter."),
  no_wa: z
    .string()
    .min(10, "Nomor WhatsApp tidak valid. Contoh: 081234567890")
    .max(16, "Nomor WhatsApp maksimal 16 karakter.")
    .refine((val) => {
      try {
        normalisasiNomorWhatsApp(val);
        return true;
      } catch {
        return false;
      }
    }, "Nomor WhatsApp tidak valid. Contoh: 081234567890"),
  email: z
    .string()
    .max(100)
    .optional()
    .nullable()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      return z.string().email().safeParse(val).success;
    }, "Format email belum benar."),

  // Data Ekskul
  ekskul_id: z.string().min(1, "Pilih kegiatan ekstrakurikuler yang diminati."),
  alasan: z
    .string()
    .max(300, "Alasan maksimal 300 karakter.")
    .optional()
    .nullable(),

  // Persetujuan Orang Tua
  persetujuan: z.literal(true, {
    message: "Persetujuan orang tua/wali diperlukan untuk mendaftar.",
  }),

  // Honeypot (harus kosong)
  website_url_hp: z.string().max(0, "Terdeteksi aktivitas spam otomatis.").optional(),
});

export type PendaftaranFormData = z.infer<typeof PendaftaranFormSchema>;
