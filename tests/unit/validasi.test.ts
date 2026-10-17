import { describe, it, expect } from "vitest";
import { PendaftaranFormSchema } from "@/lib/validasi/pendaftaran";

describe("Validasi Formulir Pendaftaran (PRD Bagian 8)", () => {
  const dataValid = {
    nama_siswa: "Ahmad Fauzi",
    nis: "123456",
    kelas: 4,
    jenis_kelamin: "L" as const,
    tanggal_lahir: "2016-05-12",
    nama_wali: "Bapak Gunawan",
    no_wa: "081234567890",
    email: "wali@example.com",
    ekskul_id: "ekskul-banjar-1",
    alasan: "Ingin belajar alat musik rebana",
    persetujuan: true,
    website_url_hp: "",
  };

  it("menerima data yang lengkap dan valid", () => {
    const res = PendaftaranFormSchema.safeParse(dataValid);
    expect(res.success).toBe(true);
  });

  it("menolak jika nama siswa kurang dari 3 karakter", () => {
    const res = PendaftaranFormSchema.safeParse({ ...dataValid, nama_siswa: "Ab" });
    expect(res.success).toBe(false);
  });

  it("menolak jika NIS mengandung huruf", () => {
    const res = PendaftaranFormSchema.safeParse({ ...dataValid, nis: "1234A" });
    expect(res.success).toBe(false);
  });

  it("menolak jika NIS kurang dari 4 digit atau lebih dari 10 digit", () => {
    expect(PendaftaranFormSchema.safeParse({ ...dataValid, nis: "123" }).success).toBe(false);
    expect(PendaftaranFormSchema.safeParse({ ...dataValid, nis: "12345678901" }).success).toBe(false);
  });

  it("menolak jika kelas di luar rentang 1-6", () => {
    expect(PendaftaranFormSchema.safeParse({ ...dataValid, kelas: 0 }).success).toBe(false);
    expect(PendaftaranFormSchema.safeParse({ ...dataValid, kelas: 7 }).success).toBe(false);
  });

  it("menolak jika nomor WhatsApp tidak valid", () => {
    expect(PendaftaranFormSchema.safeParse({ ...dataValid, no_wa: "1234" }).success).toBe(false);
    expect(PendaftaranFormSchema.safeParse({ ...dataValid, no_wa: "abc" }).success).toBe(false);
  });

  it("menerima nomor WhatsApp berformat +62 atau 62", () => {
    expect(PendaftaranFormSchema.safeParse({ ...dataValid, no_wa: "+6281234567890" }).success).toBe(true);
    expect(PendaftaranFormSchema.safeParse({ ...dataValid, no_wa: "6281234567890" }).success).toBe(true);
  });

  it("menolak jika persetujuan orang tua tidak dicentang", () => {
    const res = PendaftaranFormSchema.safeParse({ ...dataValid, persetujuan: false });
    expect(res.success).toBe(false);
  });

  it("menolak bot jika honeypot terisi", () => {
    const res = PendaftaranFormSchema.safeParse({ ...dataValid, website_url_hp: "spam-bot" });
    expect(res.success).toBe(false);
  });
});
