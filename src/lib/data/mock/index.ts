import {
  Ekstrakurikuler,
  Jadwal,
  Pendaftaran,
  KritikSaran,
  Galeri,
  IEkstrakurikulerRepository,
  IJadwalRepository,
  IPendaftaranRepository,
  IKritikSaranRepository,
  IGaleriRepository,
  IPengaturanRepository,
  EkstrakurikulerDenganJadwal,
  HasilPendaftaran,
  PendaftaranInput,
} from "../types";
import {
  DATA_CONTOH_EKSKUL,
  DATA_CONTOH_JADWAL,
  DATA_CONTOH_PENGATURAN,
} from "./data-contoh";
import {
  formatNomorPendaftaran,
  cekDuplikatPendaftaran,
  hitungKuotaTerisi,
  cekKuotaTersedia,
  cekBatasKelas,
  cekPendaftaranDibuka,
  validasiTransisiStatus,
  normalisasiNomorWhatsApp,
  StatusPendaftaran,
} from "../../aturan";

class InMemoriDatabase {
  ekskul: Ekstrakurikuler[] = JSON.parse(JSON.stringify(DATA_CONTOH_EKSKUL));
  jadwal: Jadwal[] = JSON.parse(JSON.stringify(DATA_CONTOH_JADWAL));
  pendaftaran: Pendaftaran[] = [];
  kritikSaran: KritikSaran[] = [];
  galeri: Galeri[] = [];
  pengaturan: Record<string, unknown> = JSON.parse(JSON.stringify(DATA_CONTOH_PENGATURAN));
  nomorUrutTerakhir = 0;

  reset() {
    this.ekskul = JSON.parse(JSON.stringify(DATA_CONTOH_EKSKUL));
    this.jadwal = JSON.parse(JSON.stringify(DATA_CONTOH_JADWAL));
    this.pendaftaran = [];
    this.kritikSaran = [];
    this.galeri = [];
    this.pengaturan = JSON.parse(JSON.stringify(DATA_CONTOH_PENGATURAN));
    this.nomorUrutTerakhir = 0;
  }
}

// Singleton state in-memory during runtime
const db = new InMemoriDatabase();

export class MockEkstrakurikulerRepository implements IEkstrakurikulerRepository {
  async getAllAktif(): Promise<EkstrakurikulerDenganJadwal[]> {
    const aktif = db.ekskul.filter((e) => e.aktif);
    return aktif.map((e) => {
      const jadwals = db.jadwal.filter((j) => j.ekskul_id === e.id);
      const pendaftarEkskul = db.pendaftaran.filter((p) => p.ekskul_id === e.id);
      const terisi = hitungKuotaTerisi(pendaftarEkskul);
      return {
        ...e,
        jadwal: jadwals,
        kuota_terisi: terisi,
        sisa_kuota: Math.max(0, e.kuota - terisi),
      };
    });
  }

  async getAllAdmin(): Promise<EkstrakurikulerDenganJadwal[]> {
    return db.ekskul.map((e) => {
      const jadwals = db.jadwal.filter((j) => j.ekskul_id === e.id);
      const pendaftarEkskul = db.pendaftaran.filter((p) => p.ekskul_id === e.id);
      const terisi = hitungKuotaTerisi(pendaftarEkskul);
      return {
        ...e,
        jadwal: jadwals,
        kuota_terisi: terisi,
        sisa_kuota: Math.max(0, e.kuota - terisi),
      };
    });
  }

  async getBySlug(slug: string): Promise<EkstrakurikulerDenganJadwal | null> {
    const e = db.ekskul.find((item) => item.slug === slug);
    if (!e) return null;
    const jadwals = db.jadwal.filter((j) => j.ekskul_id === e.id);
    const pendaftarEkskul = db.pendaftaran.filter((p) => p.ekskul_id === e.id);
    const terisi = hitungKuotaTerisi(pendaftarEkskul);
    return {
      ...e,
      jadwal: jadwals,
      kuota_terisi: terisi,
      sisa_kuota: Math.max(0, e.kuota - terisi),
    };
  }

  async getById(id: string): Promise<EkstrakurikulerDenganJadwal | null> {
    const e = db.ekskul.find((item) => item.id === id);
    if (!e) return null;
    const jadwals = db.jadwal.filter((j) => j.ekskul_id === e.id);
    const pendaftarEkskul = db.pendaftaran.filter((p) => p.ekskul_id === e.id);
    const terisi = hitungKuotaTerisi(pendaftarEkskul);
    return {
      ...e,
      jadwal: jadwals,
      kuota_terisi: terisi,
      sisa_kuota: Math.max(0, e.kuota - terisi),
    };
  }

  async create(data: Omit<Ekstrakurikuler, "id" | "created_at">): Promise<Ekstrakurikuler> {
    const baru: Ekstrakurikuler = {
      ...data,
      id: `ekskul-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    db.ekskul.push(baru);
    return baru;
  }

  async update(id: string, data: Partial<Ekstrakurikuler>): Promise<Ekstrakurikuler> {
    const idx = db.ekskul.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error("Ekstrakurikuler tidak ditemukan.");
    db.ekskul[idx] = { ...db.ekskul[idx], ...data };
    return db.ekskul[idx];
  }

  async delete(id: string): Promise<void> {
    const idx = db.ekskul.findIndex((e) => e.id === id);
    if (idx !== -1) {
      db.ekskul.splice(idx, 1);
      db.jadwal = db.jadwal.filter((j) => j.ekskul_id !== id);
    }
  }
}

export class MockJadwalRepository implements IJadwalRepository {
  async getAll(): Promise<(Jadwal & { ekskul_nama: string })[]> {
    return db.jadwal.map((j) => {
      const ekskul = db.ekskul.find((e) => e.id === j.ekskul_id);
      return {
        ...j,
        ekskul_nama: ekskul ? ekskul.nama : "Tidak diketahui",
      };
    });
  }

  async getByEkskulId(ekskulId: string): Promise<Jadwal[]> {
    return db.jadwal.filter((j) => j.ekskul_id === ekskulId);
  }

  async create(data: Omit<Jadwal, "id" | "created_at">): Promise<Jadwal> {
    const baru: Jadwal = {
      ...data,
      id: `jadwal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString(),
    };
    db.jadwal.push(baru);
    return baru;
  }

  async update(id: string, data: Partial<Jadwal>): Promise<Jadwal> {
    const idx = db.jadwal.findIndex((j) => j.id === id);
    if (idx === -1) throw new Error("Jadwal tidak ditemukan.");
    db.jadwal[idx] = { ...db.jadwal[idx], ...data };
    return db.jadwal[idx];
  }

  async delete(id: string): Promise<void> {
    const idx = db.jadwal.findIndex((j) => j.id === id);
    if (idx !== -1) {
      db.jadwal.splice(idx, 1);
    }
  }
}

export class MockPendaftaranRepository implements IPendaftaranRepository {
  async daftar(input: PendaftaranInput): Promise<HasilPendaftaran> {
    const ekskul = db.ekskul.find((e) => e.id === input.ekskul_id);
    if (!ekskul) {
      return {
        sukses: false,
        kode: "TIDAK_DITEMUKAN",
        pesan: "Kegiatan ekstrakurikuler tidak ditemukan.",
      };
    }

    // BR-05: Cek apakah aktif dan pendaftaran dibuka
    if (!cekPendaftaranDibuka(ekskul)) {
      return {
        sukses: false,
        kode: "DITUTUP",
        pesan: "Pendaftaran untuk kegiatan ini sedang ditutup.",
      };
    }

    // BR-04: Cek batas kelas
    if (!cekBatasKelas(input.kelas, ekskul.kelas_min, ekskul.kelas_maks)) {
      return {
        sukses: false,
        kode: "KELAS_TIDAK_SESUAI",
        pesan: `Kegiatan ini hanya dibuka untuk kelas ${ekskul.kelas_min ?? 1} sampai ${
          ekskul.kelas_maks ?? 6
        }.`,
      };
    }

    const tahunAjaran =
      typeof db.pengaturan.tahun_ajaran_aktif === "string"
        ? db.pengaturan.tahun_ajaran_aktif
        : "2026/2027";

    // BR-02: Cek pendaftaran aktif duplikat
    const isDuplikat = cekDuplikatPendaftaran(db.pendaftaran, {
      nis: input.nis,
      ekskul_id: input.ekskul_id,
      tahun_ajaran: tahunAjaran,
    });
    if (isDuplikat) {
      return {
        sukses: false,
        kode: "DUPLIKAT",
        pesan: "Siswa dengan NIS ini sudah terdaftar di kegiatan ini pada tahun ajaran yang sama.",
      };
    }

    // BR-03: Cek kuota terisi
    const pendaftarEkskul = db.pendaftaran.filter((p) => p.ekskul_id === input.ekskul_id);
    const terisi = hitungKuotaTerisi(pendaftarEkskul);
    if (!cekKuotaTersedia(ekskul.kuota, terisi)) {
      return {
        sukses: false,
        kode: "KUOTA_PENUH",
        pesan: "Mohon maaf, kuota peserta untuk kegiatan ini sudah penuh.",
      };
    }

    // BR-01: Generate nomor urut atomik
    db.nomorUrutTerakhir += 1;
    const tahunSekarang = new Date().getFullYear();
    const nomorPendaftaran = formatNomorPendaftaran(tahunSekarang, db.nomorUrutTerakhir);

    let noWaBersih = input.no_wa;
    try {
      noWaBersih = normalisasiNomorWhatsApp(input.no_wa);
    } catch {
      // jika belum lolos normalisasi
    }

    const baru: Pendaftaran = {
      id: `pend-${Date.now()}-${db.nomorUrutTerakhir}`,
      nomor: nomorPendaftaran,
      tahun_ajaran: tahunAjaran,
      nama_siswa: input.nama_siswa.trim(),
      nis: input.nis.trim(),
      kelas: input.kelas,
      jenis_kelamin: input.jenis_kelamin,
      tanggal_lahir: input.tanggal_lahir,
      nama_wali: input.nama_wali.trim(),
      no_wa: noWaBersih,
      email: input.email ? input.email.trim() : null,
      ekskul_id: input.ekskul_id,
      alasan: input.alasan ? input.alasan.trim() : null,
      persetujuan: true,
      persetujuan_at: new Date().toISOString(),
      status: "menunggu_verifikasi",
      catatan_admin: null,
      diubah_oleh: null,
      diubah_pada: null,
      created_at: new Date().toISOString(),
    };

    db.pendaftaran.push(baru);
    return {
      sukses: true,
      data: baru,
    };
  }

  async cekStatus(nomor: string, nis: string): Promise<Pendaftaran | null> {
    const normalizedNomor = nomor.trim().toUpperCase();
    const normalizedNis = nis.trim();
    const p = db.pendaftaran.find(
      (item) => item.nomor === normalizedNomor && item.nis === normalizedNis
    );
    return p ? { ...p } : null;
  }

  async getAll(filter?: {
    status?: StatusPendaftaran;
    ekskul_id?: string;
    pencarian?: string;
  }): Promise<(Pendaftaran & { ekskul_nama: string })[]> {
    let list = db.pendaftaran;

    if (filter?.status) {
      list = list.filter((p) => p.status === filter.status);
    }
    if (filter?.ekskul_id) {
      list = list.filter((p) => p.ekskul_id === filter.ekskul_id);
    }
    if (filter?.pencarian) {
      const q = filter.pencarian.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.nama_siswa.toLowerCase().includes(q) ||
          p.nis.toLowerCase().includes(q) ||
          p.nomor.toLowerCase().includes(q)
      );
    }

    return list.map((p) => {
      const ekskul = db.ekskul.find((e) => e.id === p.ekskul_id);
      return {
        ...p,
        ekskul_nama: ekskul ? ekskul.nama : "Tidak diketahui",
      };
    });
  }

  async getById(id: string): Promise<(Pendaftaran & { ekskul_nama: string }) | null> {
    const p = db.pendaftaran.find((item) => item.id === id);
    if (!p) return null;
    const ekskul = db.ekskul.find((e) => e.id === p.ekskul_id);
    return {
      ...p,
      ekskul_nama: ekskul ? ekskul.nama : "Tidak diketahui",
    };
  }

  async ubahStatus(
    id: string,
    statusBaru: StatusPendaftaran,
    catatanAdmin?: string | null,
    adminId?: string
  ): Promise<{ sukses: boolean; pesan?: string; data?: Pendaftaran }> {
    const p = db.pendaftaran.find((item) => item.id === id);
    if (!p) {
      return { sukses: false, pesan: "Pendaftaran tidak ditemukan." };
    }

    // Validasi aturan transisi status (PRD bagian 9)
    if (!validasiTransisiStatus(p.status, statusBaru)) {
      return {
        sukses: false,
        pesan: `Perubahan status dari '${p.status}' ke '${statusBaru}' tidak diizinkan.`,
      };
    }

    // Jika memindahkan keluar dari 'ditolak', cek ulang kuota (BR-03 & PRD 9)
    if (p.status === "ditolak" && statusBaru !== "ditolak") {
      const ekskul = db.ekskul.find((e) => e.id === p.ekskul_id);
      if (ekskul) {
        const pendaftarEkskul = db.pendaftaran.filter(
          (item) => item.ekskul_id === p.ekskul_id && item.id !== p.id
        );
        const terisi = hitungKuotaTerisi(pendaftarEkskul);
        if (!cekKuotaTersedia(ekskul.kuota, terisi)) {
          return {
            sukses: false,
            pesan: "Tidak dapat mengubah status: kuota peserta kegiatan ini sudah penuh.",
          };
        }
      }
    }

    p.status = statusBaru;
    if (catatanAdmin !== undefined) {
      p.catatan_admin = catatanAdmin;
    }
    p.diubah_oleh = adminId ?? "admin-contoh";
    p.diubah_pada = new Date().toISOString();

    return { sukses: true, data: { ...p } };
  }

  async getRingkasanDashboard(): Promise<{
    totalEkskul: number;
    totalPendaftar: number;
    menungguVerifikasi: number;
    diterima: number;
    ditolak: number;
    perluDiverifikasi: (Pendaftaran & { ekskul_nama: string })[];
    keterisianKuota: { ekskul_id: string; nama: string; terisi: number; total: number }[];
  }> {
    const totalEkskul = db.ekskul.filter((e) => e.aktif).length;
    const totalPendaftar = db.pendaftaran.length;
    const menungguVerifikasi = db.pendaftaran.filter(
      (p) => p.status === "menunggu_verifikasi"
    ).length;
    const diterima = db.pendaftaran.filter((p) => p.status === "diterima").length;
    const ditolak = db.pendaftaran.filter((p) => p.status === "ditolak").length;

    const perluDiverifikasi = db.pendaftaran
      .filter((p) => p.status === "menunggu_verifikasi")
      .slice(0, 10)
      .map((p) => {
        const ekskul = db.ekskul.find((e) => e.id === p.ekskul_id);
        return {
          ...p,
          ekskul_nama: ekskul ? ekskul.nama : "Tidak diketahui",
        };
      });

    const keterisianKuota = db.ekskul
      .filter((e) => e.aktif)
      .map((e) => {
        const pendaftarEkskul = db.pendaftaran.filter((p) => p.ekskul_id === e.id);
        const terisi = hitungKuotaTerisi(pendaftarEkskul);
        return {
          ekskul_id: e.id,
          nama: e.nama,
          terisi,
          total: e.kuota,
        };
      });

    return {
      totalEkskul,
      totalPendaftar,
      menungguVerifikasi,
      diterima,
      ditolak,
      perluDiverifikasi,
      keterisianKuota,
    };
  }
}

export class MockKritikSaranRepository implements IKritikSaranRepository {
  async kirim(data: Omit<KritikSaran, "id" | "created_at" | "dibaca">): Promise<KritikSaran> {
    const baru: KritikSaran = {
      ...data,
      id: `saran-${Date.now()}`,
      dibaca: false,
      created_at: new Date().toISOString(),
    };
    db.kritikSaran.unshift(baru);
    return baru;
  }

  async getAll(): Promise<KritikSaran[]> {
    return [...db.kritikSaran];
  }

  async tandaiDibaca(id: string): Promise<void> {
    const s = db.kritikSaran.find((item) => item.id === id);
    if (s) {
      s.dibaca = true;
    }
  }
}

export class MockGaleriRepository implements IGaleriRepository {
  async getAll(): Promise<(Galeri & { ekskul_nama?: string })[]> {
    return db.galeri.map((g) => {
      const ekskul = db.ekskul.find((e) => e.id === g.ekskul_id);
      return {
        ...g,
        ekskul_nama: ekskul ? ekskul.nama : undefined,
      };
    });
  }

  async getByEkskulId(ekskulId: string): Promise<Galeri[]> {
    return db.galeri.filter((g) => g.ekskul_id === ekskulId);
  }

  async create(data: Omit<Galeri, "id" | "created_at">): Promise<Galeri> {
    const baru: Galeri = {
      ...data,
      id: `galeri-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    db.galeri.unshift(baru);
    return baru;
  }

  async delete(id: string): Promise<void> {
    const idx = db.galeri.findIndex((g) => g.id === id);
    if (idx !== -1) {
      db.galeri.splice(idx, 1);
    }
  }
}

export class MockPengaturanRepository implements IPengaturanRepository {
  async get<T = unknown>(kunci: string): Promise<T | null> {
    const val = db.pengaturan[kunci];
    return (val as T) ?? null;
  }

  async set(kunci: string, nilai: unknown): Promise<void> {
    db.pengaturan[kunci] = nilai;
  }
}

export const mockEkstrakurikulerRepo = new MockEkstrakurikulerRepository();
export const mockJadwalRepo = new MockJadwalRepository();
export const mockPendaftaranRepo = new MockPendaftaranRepository();
export const mockKritikSaranRepo = new MockKritikSaranRepository();
export const mockGaleriRepo = new MockGaleriRepository();
export const mockPengaturanRepo = new MockPengaturanRepository();
export const mockDb = db;
