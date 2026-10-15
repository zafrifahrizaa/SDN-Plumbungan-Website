/**
 * Aturan Bisnis Murni (Domain Logic)
 * Sesuai PRD.md Bagian 7-9 dan TEKNIS.md Bagian 4.
 */

export type StatusPendaftaran =
  | "menunggu_verifikasi"
  | "diverifikasi"
  | "diterima"
  | "ditolak";

export const STATUS_AKTIF_KUOTA: readonly StatusPendaftaran[] = [
  "menunggu_verifikasi",
  "diverifikasi",
  "diterima",
] as const;

/**
 * BR-01: Format nomor pendaftaran EKS-<tahun>-<urut 4 digit>
 */
export function formatNomorPendaftaran(tahun: number, nomorUrut: number): string {
  if (nomorUrut < 1 || nomorUrut > 9999) {
    throw new Error("Nomor urut pendaftaran harus antara 1 dan 9999.");
  }
  const padded = nomorUrut.toString().padStart(4, "0");
  return `EKS-${tahun}-${padded}`;
}

export function parseNomorPendaftaran(nomor: string): { tahun: number; urut: number } | null {
  const match = /^EKS-(\d{4})-(\d{4})$/.exec(nomor);
  if (!match) return null;
  return {
    tahun: parseInt(match[1], 10),
    urut: parseInt(match[2], 10),
  };
}

/**
 * BR-02: Cek apakah NIS sudah memiliki pendaftaran aktif di ekskul yang sama pada tahun ajaran yang sama.
 * Status 'ditolak' TIDAK dihitung sebagai pendaftaran aktif.
 */
export function cekDuplikatPendaftaran(
  pendaftaranList: Array<{ nis: string; ekskul_id: string; tahun_ajaran: string; status: StatusPendaftaran }>,
  pendaftaranBaru: { nis: string; ekskul_id: string; tahun_ajaran: string }
): boolean {
  return pendaftaranList.some(
    (p) =>
      p.nis === pendaftaranBaru.nis &&
      p.ekskul_id === pendaftaranBaru.ekskul_id &&
      p.tahun_ajaran === pendaftaranBaru.tahun_ajaran &&
      p.status !== "ditolak"
  );
}

/**
 * BR-03: Hitung kuota terisi dan cek ketersediaan.
 * Kuota terisi = jumlah pendaftaran berstatus menunggu_verifikasi, diverifikasi, atau diterima.
 */
export function hitungKuotaTerisi(pendaftaranList: Array<{ status: StatusPendaftaran }>): number {
  return pendaftaranList.filter((p) => STATUS_AKTIF_KUOTA.includes(p.status)).length;
}

export function cekKuotaTersedia(kuotaMaks: number, kuotaTerisi: number): boolean {
  return kuotaTerisi < kuotaMaks;
}

/**
 * BR-04: Validasi batas kelas siswa.
 */
export function cekBatasKelas(
  kelasSiswa: number,
  kelasMin?: number | null,
  kelasMaks?: number | null
): boolean {
  if (kelasSiswa < 1 || kelasSiswa > 6) {
    return false;
  }
  if (kelasMin != null && kelasSiswa < kelasMin) {
    return false;
  }
  if (kelasMaks != null && kelasSiswa > kelasMaks) {
    return false;
  }
  return true;
}

/**
 * BR-05: Cek apakah ekskul dibuka untuk pendaftaran.
 */
export function cekPendaftaranDibuka(ekskul: { aktif: boolean; pendaftaran_dibuka: boolean }): boolean {
  return ekskul.aktif && ekskul.pendaftaran_dibuka;
}

/**
 * Tabel Transisi Status (PRD Bagian 9):
 * - menunggu_verifikasi -> diverifikasi, ditolak
 * - diverifikasi -> diterima, ditolak, menunggu_verifikasi
 * - diterima -> diverifikasi
 * - ditolak -> diverifikasi
 */
const TRANSISI_STATUS_VALID: Record<StatusPendaftaran, readonly StatusPendaftaran[]> = {
  menunggu_verifikasi: ["diverifikasi", "ditolak"],
  diverifikasi: ["diterima", "ditolak", "menunggu_verifikasi"],
  diterima: ["diverifikasi"],
  ditolak: ["diverifikasi"],
};

export function validasiTransisiStatus(
  dari: StatusPendaftaran,
  ke: StatusPendaftaran
): boolean {
  if (dari === ke) return false;
  const targetValid = TRANSISI_STATUS_VALID[dari];
  return targetValid ? targetValid.includes(ke) : false;
}

/**
 * Normalisasi nomor WhatsApp ke format '62...'
 * Menerima: 08..., +62..., 62...
 */
export function normalisasiNomorWhatsApp(nomor: string): string {
  const cleaned = nomor.replace(/[\s\-\(\)\.]/g, "");
  if (!/^\+?\d+$/.test(cleaned)) {
    throw new Error("Nomor WhatsApp hanya boleh berisi angka.");
  }

  let formatted = cleaned;
  if (formatted.startsWith("+")) {
    formatted = formatted.slice(1);
  }

  if (formatted.startsWith("0")) {
    formatted = "62" + formatted.slice(1);
  }

  if (!formatted.startsWith("62")) {
    throw new Error("Nomor WhatsApp harus berformat nomor telepon Indonesia.");
  }

  // Panjang nomor setelah awalan 62 umumnya 10–13 digit (mis. 6281234567890 = 13 digit)
  if (formatted.length < 11 || formatted.length > 15) {
    throw new Error("Panjang nomor WhatsApp tidak valid (contoh: 081234567890).");
  }

  return formatted;
}

/**
 * Pengaman Auth Tiruan (Aturan Pengguna #4):
 * Login admin tiruan hanya boleh aktif jika env AUTH_TIRUAN=true (default false).
 * Jika NODE_ENV=production dan AUTH_TIRUAN=true, aplikasi HARUS gagal start dengan pesan jelas.
 */
export function cekKonfigurasiAuthTiruan(env: {
  NODE_ENV?: string;
  AUTH_TIRUAN?: string;
}): boolean {
  const isProd = env.NODE_ENV === "production";
  const isAuthTiruan = env.AUTH_TIRUAN === "true";

  if (isProd && isAuthTiruan) {
    throw new Error(
      "KRITIKAL: AUTH_TIRUAN tidak boleh diaktifkan pada lingkungan produksi (NODE_ENV=production). Aplikasi menolak untuk berjalan demi keamanan data sekolah."
    );
  }

  return isAuthTiruan;
}
