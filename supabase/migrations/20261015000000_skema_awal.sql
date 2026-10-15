-- ==============================================================================
-- CATATAN PENTING:
-- File migrasi ini disiapkan pada Fase 0 (Fondasi) sesuai TEKNIS.md Bagian 3-5.
-- STATUS: BELUM PERNAH DIJALANKAN ke database Supabase sungguhan.
-- Akan dieksekusi pada Fase 1 ketika kredensial Supabase terisi.
-- ==============================================================================

-- 1. Ekstensi
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabel Profil Admin
CREATE TABLE IF NOT EXISTS public.profil (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nama TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'guru')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Tabel Ekstrakurikuler
CREATE TABLE IF NOT EXISTS public.ekstrakurikuler (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    deskripsi TEXT NOT NULL,
    tujuan TEXT NOT NULL,
    pembina TEXT NOT NULL,
    lokasi TEXT NOT NULL,
    kuota INTEGER NOT NULL CHECK (kuota >= 0),
    kelas_min INTEGER CHECK (kelas_min BETWEEN 1 AND 6),
    kelas_maks INTEGER CHECK (kelas_maks BETWEEN 1 AND 6),
    persyaratan TEXT NOT NULL,
    foto_path TEXT,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    pendaftaran_dibuka BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_batas_kelas CHECK (kelas_min IS NULL OR kelas_maks IS NULL OR kelas_min <= kelas_maks)
);

-- 4. Tabel Jadwal
CREATE TABLE IF NOT EXISTS public.jadwal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ekskul_id UUID NOT NULL REFERENCES public.ekstrakurikuler(id) ON DELETE CASCADE,
    hari TEXT NOT NULL CHECK (hari IN ('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')),
    jam_mulai TIME NOT NULL,
    jam_selesai TIME NOT NULL,
    lokasi TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_jam CHECK (jam_selesai > jam_mulai)
);

-- 5. Tabel Nomor Urut Pendaftaran Per Tahun (Untuk BR-01 Atomik)
CREATE TABLE IF NOT EXISTS public.nomor_urut (
    tahun INTEGER PRIMARY KEY,
    terakhir INTEGER NOT NULL DEFAULT 0
);

-- 6. Tabel Pendaftaran
CREATE TABLE IF NOT EXISTS public.pendaftaran (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nomor TEXT NOT NULL UNIQUE,
    tahun_ajaran TEXT NOT NULL,
    nama_siswa TEXT NOT NULL,
    nis TEXT NOT NULL,
    kelas INTEGER NOT NULL CHECK (kelas BETWEEN 1 AND 6),
    jenis_kelamin TEXT NOT NULL CHECK (jenis_kelamin IN ('L', 'P')),
    tanggal_lahir DATE NOT NULL,
    nama_wali TEXT NOT NULL,
    no_wa TEXT NOT NULL,
    email TEXT,
    ekskul_id UUID NOT NULL REFERENCES public.ekstrakurikuler(id) ON DELETE RESTRICT,
    alasan TEXT CHECK (alasan IS NULL OR length(alasan) <= 300),
    persetujuan BOOLEAN NOT NULL CHECK (persetujuan = TRUE),
    persetujuan_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'menunggu_verifikasi' CHECK (status IN ('menunggu_verifikasi', 'diverifikasi', 'diterima', 'ditolak')),
    catatan_admin TEXT,
    diubah_oleh UUID REFERENCES public.profil(id),
    diubah_pada TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indeks Penting
CREATE INDEX IF NOT EXISTS idx_pendaftaran_status ON public.pendaftaran(status);
CREATE INDEX IF NOT EXISTS idx_pendaftaran_ekskul_id ON public.pendaftaran(ekskul_id);
CREATE INDEX IF NOT EXISTS idx_pendaftaran_nis ON public.pendaftaran(nis);
CREATE INDEX IF NOT EXISTS idx_pendaftaran_nomor ON public.pendaftaran(nomor);

-- BR-02 Penegakan Duplikat di Level Database:
-- Unique partial index: NIS, ekskul_id, tahun_ajaran unik SELAMA status <> 'ditolak'
CREATE UNIQUE INDEX IF NOT EXISTS idx_pendaftaran_unik_aktif
ON public.pendaftaran (nis, ekskul_id, tahun_ajaran)
WHERE status <> 'ditolak';

-- 7. Tabel Kritik & Saran
CREATE TABLE IF NOT EXISTS public.kritik_saran (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama TEXT NOT NULL,
    kelas INTEGER NOT NULL CHECK (kelas BETWEEN 1 AND 6),
    kategori TEXT NOT NULL CHECK (kategori IN ('ekstrakurikuler', 'jadwal', 'website', 'fasilitas', 'lainnya')),
    pesan TEXT NOT NULL,
    kontak TEXT,
    dibaca BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Tabel Galeri
CREATE TABLE IF NOT EXISTS public.galeri (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ekskul_id UUID REFERENCES public.ekstrakurikuler(id) ON DELETE SET NULL,
    foto_path TEXT NOT NULL,
    caption TEXT NOT NULL,
    tanggal_kegiatan DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Tabel Pengaturan
CREATE TABLE IF NOT EXISTS public.pengaturan (
    kunci TEXT PRIMARY KEY,
    nilai JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- FUNGSI DATABASE ATOMIK (TEKNIS.md Bagian 4)
-- ==============================================================================

-- Fungsi Pendaftaran Atomik (daftar_ekskul)
CREATE OR REPLACE FUNCTION public.daftar_ekskul(
    p_ekskul_id UUID,
    p_nama_siswa TEXT,
    p_nis TEXT,
    p_kelas INTEGER,
    p_jenis_kelamin TEXT,
    p_tanggal_lahir DATE,
    p_nama_wali TEXT,
    p_no_wa TEXT,
    p_email TEXT DEFAULT NULL,
    p_alasan TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_ekskul RECORD;
    v_tahun_ajaran TEXT;
    v_tahun_now INTEGER;
    v_urut INTEGER;
    v_nomor TEXT;
    v_terisi INTEGER;
    v_pendaftaran_id UUID;
    v_baru RECORD;
BEGIN
    -- 1. Kunci baris ekskul untuk mencegah balapan kuota
    SELECT * INTO v_ekskul
    FROM public.ekstrakurikuler
    WHERE id = p_ekskul_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('sukses', false, 'kode', 'TIDAK_DITEMUKAN', 'pesan', 'Ekstrakurikuler tidak ditemukan.');
    END IF;

    -- 2. Pastikan aktif dan dibuka (BR-05)
    IF NOT (v_ekskul.aktif AND v_ekskul.pendaftaran_dibuka) THEN
        RETURN jsonb_build_object('sukses', false, 'kode', 'DITUTUP', 'pesan', 'Pendaftaran untuk kegiatan ini sedang ditutup.');
    END IF;

    -- 3. Batas kelas (BR-04)
    IF (v_ekskul.kelas_min IS NOT NULL AND p_kelas < v_ekskul.kelas_min) OR
       (v_ekskul.kelas_maks IS NOT NULL AND p_kelas > v_ekskul.kelas_maks) THEN
        RETURN jsonb_build_object('sukses', false, 'kode', 'KELAS_TIDAK_SESUAI', 'pesan', 'Kelas siswa tidak memenuhi persyaratan kegiatan ini.');
    END IF;

    -- Ambil tahun ajaran aktif dari pengaturan
    SELECT COALESCE(nilai->>'tahun_ajaran_aktif', '2026/2027') INTO v_tahun_ajaran
    FROM public.pengaturan
    WHERE kunci = 'tahun_ajaran_aktif';

    IF v_tahun_ajaran IS NULL THEN
        v_tahun_ajaran := '2026/2027';
    END IF;

    -- 4. Cek duplikat aktif (BR-02)
    IF EXISTS (
        SELECT 1 FROM public.pendaftaran
        WHERE nis = p_nis
          AND ekskul_id = p_ekskul_id
          AND tahun_ajaran = v_tahun_ajaran
          AND status <> 'ditolak'
    ) THEN
        RETURN jsonb_build_object('sukses', false, 'kode', 'DUPLIKAT', 'pesan', 'Siswa dengan NIS ini sudah terdaftar pada kegiatan ini.');
    END IF;

    -- 5. Hitung kuota terisi (BR-03)
    SELECT COUNT(*) INTO v_terisi
    FROM public.pendaftaran
    WHERE ekskul_id = p_ekskul_id
      AND status IN ('menunggu_verifikasi', 'diverifikasi', 'diterima');

    IF v_terisi >= v_ekskul.kuota THEN
        RETURN jsonb_build_object('sukses', false, 'kode', 'KUOTA_PENUH', 'pesan', 'Kuota pendaftaran untuk kegiatan ini sudah penuh.');
    END IF;

    -- 6. Generate nomor urut transaksi atomik (BR-01)
    v_tahun_now := EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER;

    INSERT INTO public.nomor_urut (tahun, terakhir)
    VALUES (v_tahun_now, 1)
    ON CONFLICT (tahun)
    DO UPDATE SET terakhir = public.nomor_urut.terakhir + 1
    RETURNING terakhir INTO v_urut;

    v_nomor := 'EKS-' || v_tahun_now::TEXT || '-' || LPAD(v_urut::TEXT, 4, '0');

    -- 7. Sisipkan pendaftaran
    INSERT INTO public.pendaftaran (
        nomor,
        tahun_ajaran,
        nama_siswa,
        nis,
        kelas,
        jenis_kelamin,
        tanggal_lahir,
        nama_wali,
        no_wa,
        email,
        ekskul_id,
        alasan,
        persetujuan,
        persetujuan_at,
        status
    ) VALUES (
        v_nomor,
        v_tahun_ajaran,
        p_nama_siswa,
        p_nis,
        p_kelas,
        p_jenis_kelamin,
        p_tanggal_lahir,
        p_nama_wali,
        p_no_wa,
        p_email,
        p_ekskul_id,
        p_alasan,
        TRUE,
        NOW(),
        'menunggu_verifikasi'
    ) RETURNING id INTO v_pendaftaran_id;

    RETURN jsonb_build_object(
        'sukses', true,
        'nomor', v_nomor,
        'status', 'menunggu_verifikasi',
        'pendaftaran_id', v_pendaftaran_id
    );
END;
$$;

-- Fungsi Transisi Status Atomik (ubah_status_pendaftaran)
CREATE OR REPLACE FUNCTION public.ubah_status_pendaftaran(
    p_pendaftaran_id UUID,
    p_status_baru TEXT,
    p_catatan_admin TEXT DEFAULT NULL,
    p_admin_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_pend RECORD;
    v_ekskul RECORD;
    v_terisi INTEGER;
    v_valid_transisi BOOLEAN := FALSE;
BEGIN
    SELECT * INTO v_pend
    FROM public.pendaftaran
    WHERE id = p_pendaftaran_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('sukses', false, 'pesan', 'Pendaftaran tidak ditemukan.');
    END IF;

    -- Validasi aturan transisi (PRD bagian 9)
    IF v_pend.status = 'menunggu_verifikasi' AND p_status_baru IN ('diverifikasi', 'ditolak') THEN
        v_valid_transisi := TRUE;
    ELSIF v_pend.status = 'diverifikasi' AND p_status_baru IN ('diterima', 'ditolak', 'menunggu_verifikasi') THEN
        v_valid_transisi := TRUE;
    ELSIF v_pend.status = 'diterima' AND p_status_baru = 'diverifikasi' THEN
        v_valid_transisi := TRUE;
    ELSIF v_pend.status = 'ditolak' AND p_status_baru = 'diverifikasi' THEN
        v_valid_transisi := TRUE;
    END IF;

    IF NOT v_valid_transisi THEN
        RETURN jsonb_build_object('sukses', false, 'pesan', 'Transisi status tidak diizinkan.');
    END IF;

    -- Jika keluar dari status ditolak, periksa ulang kuota
    IF v_pend.status = 'ditolak' AND p_status_baru <> 'ditolak' THEN
        SELECT * INTO v_ekskul
        FROM public.ekstrakurikuler
        WHERE id = v_pend.ekskul_id
        FOR UPDATE;

        SELECT COUNT(*) INTO v_terisi
        FROM public.pendaftaran
        WHERE ekskul_id = v_pend.ekskul_id
          AND id <> v_pend.id
          AND status IN ('menunggu_verifikasi', 'diverifikasi', 'diterima');

        IF v_terisi >= v_ekskul.kuota THEN
            RETURN jsonb_build_object('sukses', false, 'pesan', 'Kuota pendaftaran sudah penuh.');
        END IF;
    END IF;

    -- Update status
    UPDATE public.pendaftaran
    SET status = p_status_baru,
        catatan_admin = COALESCE(p_catatan_admin, catatan_admin),
        diubah_oleh = p_admin_id,
        diubah_pada = NOW()
    WHERE id = p_pendaftaran_id;

    RETURN jsonb_build_object('sukses', true, 'status', p_status_baru);
END;
$$;

-- ==============================================================================
-- ROW LEVEL SECURITY (TEKNIS.md Bagian 5)
-- ==============================================================================

ALTER TABLE public.profil ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ekstrakurikuler ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jadwal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nomor_urut ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pendaftaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kritik_saran ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengaturan ENABLE ROW LEVEL SECURITY;

-- 1. ekstrakurikuler: anon hanya bisa baca baris aktif = true; admin/guru baca/tulis semua
CREATE POLICY "Publik dapat membaca ekskul aktif"
ON public.ekstrakurikuler FOR SELECT
TO anon, authenticated
USING (aktif = TRUE OR auth.role() = 'authenticated');

CREATE POLICY "Admin dapat mengelola ekskul"
ON public.ekstrakurikuler FOR ALL
TO authenticated
USING (TRUE)
WITH CHECK (TRUE);

-- 2. jadwal: anon hanya membaca jadwal ekskul aktif; admin baca/tulis semua
CREATE POLICY "Publik dapat membaca jadwal ekskul aktif"
ON public.jadwal FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.ekstrakurikuler e
        WHERE e.id = jadwal.ekskul_id AND (e.aktif = TRUE OR auth.role() = 'authenticated')
    )
);

CREATE POLICY "Admin dapat mengelola jadwal"
ON public.jadwal FOR ALL
TO authenticated
USING (TRUE)
WITH CHECK (TRUE);

-- 3. galeri: publik bisa membaca galeri
CREATE POLICY "Publik dapat membaca galeri"
ON public.galeri FOR SELECT
TO anon, authenticated
USING (TRUE);

CREATE POLICY "Admin dapat mengelola galeri"
ON public.galeri FOR ALL
TO authenticated
USING (TRUE)
WITH CHECK (TRUE);

-- 4. pengaturan: publik bisa membaca pengaturan umum
CREATE POLICY "Publik dapat membaca pengaturan"
ON public.pengaturan FOR SELECT
TO anon, authenticated
USING (TRUE);

CREATE POLICY "Admin dapat mengelola pengaturan"
ON public.pengaturan FOR ALL
TO authenticated
USING (TRUE)
WITH CHECK (TRUE);

-- 5. pendaftaran: anon TIDAK ADA AKSES LANGSUNG. Admin login bisa baca.
-- Mutasi publik lewat fungsi database bertipe SECURITY DEFINER
CREATE POLICY "Admin dapat membaca pendaftaran"
ON public.pendaftaran FOR SELECT
TO authenticated
USING (TRUE);

CREATE POLICY "Admin dapat mengubah pendaftaran"
ON public.pendaftaran FOR UPDATE
TO authenticated
USING (TRUE)
WITH CHECK (TRUE);

-- 6. kritik_saran: anon TIDAK ADA AKSES BACA LANGSUNG. Admin dapat membaca.
CREATE POLICY "Admin dapat membaca kritik dan saran"
ON public.kritik_saran FOR SELECT
TO authenticated
USING (TRUE);

CREATE POLICY "Publik dapat mengirim kritik saran"
ON public.kritik_saran FOR INSERT
TO anon, authenticated
WITH CHECK (TRUE);

-- 7. profil: admin baca profil sendiri
CREATE POLICY "Admin dapat membaca profil sendiri"
ON public.profil FOR SELECT
TO authenticated
USING (auth.uid() = id);
