import type { Metadata } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ekstrakurikuler SDN Plumbungan | Ayo Kembangkan Bakatmu!",
  description:
    "Website informasi dan pendaftaran ekstrakurikuler SDN Plumbungan. Temukan kegiatan yang kamu suka, cek jadwal, dan daftar dari rumah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${baloo.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col font-body bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
