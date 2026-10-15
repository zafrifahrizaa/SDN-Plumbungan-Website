import {
  IEkstrakurikulerRepository,
  IJadwalRepository,
  IPendaftaranRepository,
  IKritikSaranRepository,
  IGaleriRepository,
  IPengaturanRepository,
} from "./types";
import {
  mockEkstrakurikulerRepo,
  mockJadwalRepo,
  mockPendaftaranRepo,
  mockKritikSaranRepo,
  mockGaleriRepo,
  mockPengaturanRepo,
} from "./mock";

/**
 * Titik Konfigurasi Tunggal Sumber Data (Single Source of Truth)
 * Pilihan: 'mock' (lapisan memori sementara) atau 'supabase' (database Postgres asli)
 */
export type DataSourceType = "mock" | "supabase";

export const CURRENT_DATA_SOURCE: DataSourceType =
  (process.env.DATA_SOURCE as DataSourceType) || "mock";

// Repositori aktif. Pada Fase 1, implementasi Supabase akan diintegrasikan di sini.
export const ekstrakurikulerRepo: IEkstrakurikulerRepository = mockEkstrakurikulerRepo;
export const jadwalRepo: IJadwalRepository = mockJadwalRepo;
export const pendaftaranRepo: IPendaftaranRepository = mockPendaftaranRepo;
export const kritikSaranRepo: IKritikSaranRepository = mockKritikSaranRepo;
export const galeriRepo: IGaleriRepository = mockGaleriRepo;
export const pengaturanRepo: IPengaturanRepository = mockPengaturanRepo;

export * from "./types";
