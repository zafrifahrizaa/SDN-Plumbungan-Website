import { describe, it, expect } from "vitest";
import {
  formatNomorPendaftaran,
  parseNomorPendaftaran,
  cekDuplikatPendaftaran,
  hitungKuotaTerisi,
  cekKuotaTersedia,
  cekBatasKelas,
  cekPendaftaranDibuka,
  validasiTransisiStatus,
  normalisasiNomorWhatsApp,
  cekKonfigurasiAuthTiruan,
  StatusPendaftaran,
} from "@/lib/aturan";

describe("Aturan Bisnis Pendaftaran", () => {
  describe("BR-01: Format Nomor Pendaftaran", () => {
    it("memformat nomor pendaftaran dengan 4 digit padding", () => {
      expect(formatNomorPendaftaran(2026, 1)).toBe("EKS-2026-0001");
      expect(formatNomorPendaftaran(2026, 42)).toBe("EKS-2026-0042");
      expect(formatNomorPendaftaran(2026, 9999)).toBe("EKS-2026-9999");
    });

    it("menolak nomor urut kurang dari 1 atau lebih dari 9999", () => {
      expect(() => formatNomorPendaftaran(2026, 0)).toThrow();
      expect(() => formatNomorPendaftaran(2026, 10000)).toThrow();
    });

    it("mem-parse nomor pendaftaran yang valid", () => {
      expect(parseNomorPendaftaran("EKS-2026-0007")).toEqual({ tahun: 2026, urut: 7 });
      expect(parseNomorPendaftaran("INVALID-NO")).toBeNull();
    });
  });

  describe("BR-02: Pencegahan Duplikasi Pendaftaran", () => {
    const listEksisting: Array<{
      nis: string;
      ekskul_id: string;
      tahun_ajaran: string;
      status: StatusPendaftaran;
    }> = [
      { nis: "1234", ekskul_id: "ekskul-1", tahun_ajaran: "2026/2027", status: "menunggu_verifikasi" },
      { nis: "5678", ekskul_id: "ekskul-1", tahun_ajaran: "2026/2027", status: "ditolak" },
    ];

    it("menolak NIS yang sudah terdaftar aktif di ekskul dan tahun yang sama", () => {
      const duplikat = cekDuplikatPendaftaran(listEksisting, {
        nis: "1234",
        ekskul_id: "ekskul-1",
        tahun_ajaran: "2026/2027",
      });
      expect(duplikat).toBe(true);
    });

    it("mengizinkan pendaftaran baru jika status sebelumnya ditolak", () => {
      const bolehDaftar = cekDuplikatPendaftaran(listEksisting, {
        nis: "5678",
        ekskul_id: "ekskul-1",
        tahun_ajaran: "2026/2027",
      });
      expect(bolehDaftar).toBe(false);
    });

    it("mengizinkan pendaftaran di ekskul berbeda", () => {
      const bolehDaftar = cekDuplikatPendaftaran(listEksisting, {
        nis: "1234",
        ekskul_id: "ekskul-2",
        tahun_ajaran: "2026/2027",
      });
      expect(bolehDaftar).toBe(false);
    });
  });

  describe("BR-03: Kuota Pendaftaran", () => {
    it("menghitung kuota hanya dari status aktif (menunggu, diverifikasi, diterima)", () => {
      const list: Array<{ status: StatusPendaftaran }> = [
        { status: "menunggu_verifikasi" },
        { status: "diverifikasi" },
        { status: "diterima" },
        { status: "ditolak" },
      ];
      expect(hitungKuotaTerisi(list)).toBe(3);
    });

    it("mengecek ketersediaan kuota dengan tepat", () => {
      expect(cekKuotaTersedia(20, 19)).toBe(true);
      expect(cekKuotaTersedia(20, 20)).toBe(false);
      expect(cekKuotaTersedia(20, 21)).toBe(false);
    });
  });

  describe("BR-04: Batas Kelas", () => {
    it("mengizinkan siswa dalam rentang kelas", () => {
      expect(cekBatasKelas(3, 3, 6)).toBe(true);
      expect(cekBatasKelas(5, 3, 6)).toBe(true);
      expect(cekBatasKelas(6, 3, 6)).toBe(true);
    });

    it("menolak siswa di luar rentang kelas", () => {
      expect(cekBatasKelas(2, 3, 6)).toBe(false);
      expect(cekBatasKelas(0, 1, 6)).toBe(false);
      expect(cekBatasKelas(7, 1, 6)).toBe(false);
    });

    it("mengizinkan semua kelas jika tidak ada batasan", () => {
      expect(cekBatasKelas(1, null, null)).toBe(true);
      expect(cekBatasKelas(6, undefined, undefined)).toBe(true);
    });
  });

  describe("BR-05: Ekskul Aktif dan Pendaftaran Dibuka", () => {
    it("mengembalikan true hanya jika aktif dan pendaftaran dibuka", () => {
      expect(cekPendaftaranDibuka({ aktif: true, pendaftaran_dibuka: true })).toBe(true);
      expect(cekPendaftaranDibuka({ aktif: true, pendaftaran_dibuka: false })).toBe(false);
      expect(cekPendaftaranDibuka({ aktif: false, pendaftaran_dibuka: true })).toBe(false);
      expect(cekPendaftaranDibuka({ aktif: false, pendaftaran_dibuka: false })).toBe(false);
    });
  });

  describe("Tabel Transisi Status Pendaftaran (PRD Bagian 9)", () => {
    it("mengizinkan transisi valid", () => {
      expect(validasiTransisiStatus("menunggu_verifikasi", "diverifikasi")).toBe(true);
      expect(validasiTransisiStatus("menunggu_verifikasi", "ditolak")).toBe(true);
      expect(validasiTransisiStatus("diverifikasi", "diterima")).toBe(true);
      expect(validasiTransisiStatus("diverifikasi", "ditolak")).toBe(true);
      expect(validasiTransisiStatus("diverifikasi", "menunggu_verifikasi")).toBe(true);
      expect(validasiTransisiStatus("diterima", "diverifikasi")).toBe(true);
      expect(validasiTransisiStatus("ditolak", "diverifikasi")).toBe(true);
    });

    it("menolak transisi tidak valid", () => {
      expect(validasiTransisiStatus("menunggu_verifikasi", "diterima")).toBe(false);
      expect(validasiTransisiStatus("diterima", "ditolak")).toBe(false);
      expect(validasiTransisiStatus("ditolak", "diterima")).toBe(false);
      expect(validasiTransisiStatus("menunggu_verifikasi", "menunggu_verifikasi")).toBe(false);
    });
  });

  describe("Normalisasi Nomor WhatsApp", () => {
    it("menormalisasi awalan 08 menjadi 628", () => {
      expect(normalisasiNomorWhatsApp("081234567890")).toBe("6281234567890");
    });

    it("menormalisasi awalan +62 menjadi 62", () => {
      expect(normalisasiNomorWhatsApp("+6281234567890")).toBe("6281234567890");
    });

    it("menerima awalan 62 yang sudah benar", () => {
      expect(normalisasiNomorWhatsApp("6281234567890")).toBe("6281234567890");
    });

    it("membersihkan spasi, strip, dan tanda kurung", () => {
      expect(normalisasiNomorWhatsApp("0812-3456-7890")).toBe("6281234567890");
      expect(normalisasiNomorWhatsApp("(0812) 3456 7890")).toBe("6281234567890");
    });

    it("menolak nomor tidak valid", () => {
      expect(() => normalisasiNomorWhatsApp("abc123456")).toThrow();
      expect(() => normalisasiNomorWhatsApp("1234")).toThrow();
    });
  });

  describe("Pengaman Auth Tiruan (Keamanan Produksi)", () => {
    it("GAGAL start bila NODE_ENV=production dan AUTH_TIRUAN=true", () => {
      expect(() =>
        cekKonfigurasiAuthTiruan({
          NODE_ENV: "production",
          AUTH_TIRUAN: "true",
        })
      ).toThrowError(/KRITIKAL/);
    });

    it("mengizinkan AUTH_TIRUAN=true di development", () => {
      expect(
        cekKonfigurasiAuthTiruan({
          NODE_ENV: "development",
          AUTH_TIRUAN: "true",
        })
      ).toBe(true);
    });

    it("mengembalikan false secara default saat AUTH_TIRUAN tidak diaktifkan", () => {
      expect(cekKonfigurasiAuthTiruan({})).toBe(false);
      expect(cekKonfigurasiAuthTiruan({ AUTH_TIRUAN: "false" })).toBe(false);
    });
  });
});
