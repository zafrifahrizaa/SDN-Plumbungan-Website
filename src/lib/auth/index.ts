import { cookies } from "next/headers";
import { cekKonfigurasiAuthTiruan } from "../aturan";

export interface AdminUser {
  id: string;
  email: string;
  nama: string;
  role: "admin" | "guru";
}

const COOKIE_NAME = "admin_session";

export function isAuthTiruan(): boolean {
  return cekKonfigurasiAuthTiruan({
    NODE_ENV: process.env.NODE_ENV,
    AUTH_TIRUAN: process.env.AUTH_TIRUAN,
  });
}

/**
 * Verifikasi login admin.
 * Mode tiruan HANYA aktif jika AUTH_TIRUAN=true (dan bukan NODE_ENV=production).
 */
export async function loginAdmin(
  email: string,
  kataSandi: string
): Promise<{ sukses: boolean; pesan?: string; user?: AdminUser }> {
  // Pastikan keamanan lingkungan produksi ditegakkan
  const authTiruan = isAuthTiruan();

  if (authTiruan) {
    // Kredensial khusus lingkungan pengujian/mock lokal
    if (
      email.toLowerCase().trim() === "admin@sdnplumbungan.sch.id" &&
      kataSandi === "plumbungan2026!"
    ) {
      const user: AdminUser = {
        id: "admin-mock-1",
        email: "admin@sdnplumbungan.sch.id",
        nama: "Admin SDN Plumbungan [contoh]",
        role: "admin",
      };

      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 jam
      });

      return { sukses: true, user };
    }

    return {
      sukses: false,
      pesan: "Email atau kata sandi tidak cocok. Silakan coba lagi.",
    };
  }

  // Jika Supabase Auth mode (di Fase 1)
  return {
    sukses: false,
    pesan: "Autentikasi Supabase belum dikonfigurasi pada lingkungan ini.",
  };
}

export async function getSesiAdmin(): Promise<AdminUser | null> {
  // Cegah jalan jika env salah di produksi
  isAuthTiruan();

  const cookieStore = await cookies();
  const rawCookie = cookieStore.get(COOKIE_NAME)?.value;
  if (!rawCookie) return null;

  try {
    const user = JSON.parse(rawCookie) as AdminUser;
    if (user && user.id && user.role) {
      return user;
    }
    return null;
  } catch {
    return null;
  }
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
