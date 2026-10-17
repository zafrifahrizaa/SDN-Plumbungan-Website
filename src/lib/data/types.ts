import { StatusPendaftaran } from "../aturan";
export type { StatusPendaftaran };

export type Hari =
  | "Senin"
  | "Selasa"
  | "Rabu"
  | "Kamis"
  | "Jumat"
  | "Sabtu"
  | "Minggu";

export interface Ekstrakurikuler {
  id: string;
  nama: string;
  slug: string;
  deskripsi: string;
  tujuan: string;
  pembina: string;
  lokasi: string;
  kuota: number;
  kelas_min: number | null;
  kelas_maks: number | null;
  persyaratan: string;
  foto_path: string | null;
  aktif: boolean;
  pendaftaran_dibuka: boolean;
  created_at: string;
}

export interface Jadwal {
  id: string;
  ekskul_id: string;
  hari: Hari;
  jam_mulai: string;
  jam_selesai: string;
  lokasi: string | null;
  created_at: string;
}

export interface Pendaftaran {
  id: string;
  nomor: string;
  tahun_ajaran: string;
  nama_siswa: string;
  nis: string;
  kelas: number;
  jenis_kelamin: "L" | "P";
  tanggal_lahir: string;
  nama_wali: string;
  no_wa: string;
  email: string | null;
  ekskul_id: string;
  alasan: string | null;
  persetujuan: boolean;
  persetujuan_at: string;
  status: StatusPendaftaran;
  catatan_admin: string | null;
  diubah_oleh: string | null;
  diubah_pada: string | null;
  created_at: string;
}

export type KategoriKritikSaran =
  | "ekstrakurikuler"
  | "jadwal"
  | "website"
  | "fasilitas"
  | "lainnya";

export interface KritikSaran {
  id: string;
  nama: string;
  kelas: number;
  kategori: KategoriKritikSaran;
  pesan: string;
  kontak: string | null;
  dibaca: boolean;
  created_at: string;
}

export interface Galeri {
  id: string;
  ekskul_id: string | null;
  foto_path: string;
  caption: string;
  tanggal_kegiatan: string;
  created_at: string;
}

export interface Pengaturan {
  kunci: string;
  nilai: unknown;
}

export interface EkstrakurikulerDenganJadwal extends Ekstrakurikuler {
  jadwal: Jadwal[];
  kuota_terisi: number;
  sisa_kuota: number;
}

export type HasilPendaftaran =
  | { sukses: true; data: Pendaftaran }
  | {
      sukses: false;
      kode: "DITUTUP" | "KELAS_TIDAK_SESUAI" | "DUPLIKAT" | "KUOTA_PENUH" | "TIDAK_DITEMUKAN" | "SISTEM_ERROR";
      pesan: string;
    };

export interface PendaftaranInput {
  ekskul_id: string;
  nama_siswa: string;
  nis: string;
  kelas: number;
  jenis_kelamin: "L" | "P";
  tanggal_lahir: string;
  nama_wali: string;
  no_wa: string;
  email?: string | null;
  alasan?: string | null;
  persetujuan: boolean;
}

// Interface Repository per Entitas
export interface IEkstrakurikulerRepository {
  getAllAktif(): Promise<EkstrakurikulerDenganJadwal[]>;
  getAllAdmin(): Promise<EkstrakurikulerDenganJadwal[]>;
  getBySlug(slug: string): Promise<EkstrakurikulerDenganJadwal | null>;
  getById(id: string): Promise<EkstrakurikulerDenganJadwal | null>;
  create(data: Omit<Ekstrakurikuler, "id" | "created_at">): Promise<Ekstrakurikuler>;
  update(id: string, data: Partial<Ekstrakurikuler>): Promise<Ekstrakurikuler>;
  delete(id: string): Promise<void>;
}

export interface IJadwalRepository {
  getAll(): Promise<(Jadwal & { ekskul_nama: string })[]>;
  getByEkskulId(ekskulId: string): Promise<Jadwal[]>;
  create(data: Omit<Jadwal, "id" | "created_at">): Promise<Jadwal>;
  update(id: string, data: Partial<Jadwal>): Promise<Jadwal>;
  delete(id: string): Promise<void>;
}

export interface IPendaftaranRepository {
  daftar(input: PendaftaranInput): Promise<HasilPendaftaran>;
  cekStatus(nomor: string, nis: string): Promise<Pendaftaran | null>;
  getAll(filter?: {
    status?: StatusPendaftaran;
    ekskul_id?: string;
    pencarian?: string;
  }): Promise<(Pendaftaran & { ekskul_nama: string })[]>;
  getById(id: string): Promise<(Pendaftaran & { ekskul_nama: string }) | null>;
  ubahStatus(
    id: string,
    statusBaru: StatusPendaftaran,
    catatanAdmin?: string | null,
    adminId?: string
  ): Promise<{ sukses: boolean; pesan?: string; data?: Pendaftaran }>;
  getRingkasanDashboard(): Promise<{
    totalEkskul: number;
    totalPendaftar: number;
    menungguVerifikasi: number;
    diterima: number;
    ditolak: number;
    perluDiverifikasi: (Pendaftaran & { ekskul_nama: string })[];
    keterisianKuota: { ekskul_id: string; nama: string; terisi: number; total: number }[];
  }>;
}

export interface IKritikSaranRepository {
  kirim(data: Omit<KritikSaran, "id" | "created_at" | "dibaca">): Promise<KritikSaran>;
  getAll(): Promise<KritikSaran[]>;
  tandaiDibaca(id: string): Promise<void>;
}

export interface IGaleriRepository {
  getAll(): Promise<(Galeri & { ekskul_nama?: string })[]>;
  getByEkskulId(ekskulId: string): Promise<Galeri[]>;
  create(data: Omit<Galeri, "id" | "created_at">): Promise<Galeri>;
  delete(id: string): Promise<void>;
}

export interface IPengaturanRepository {
  get<T = unknown>(kunci: string): Promise<T | null>;
  set(kunci: string, nilai: unknown): Promise<void>;
}
