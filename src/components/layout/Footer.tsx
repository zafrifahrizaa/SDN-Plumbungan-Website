import React from "react";
import Link from "next/link";
import { MessageCircle, MapPin, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-sage border-t border-line/20 mt-auto">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Kolom 1: Profil Sekolah */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-circle bg-white text-primary-dark font-heading font-bold text-lg flex items-center justify-center">
                SD
              </div>
              <span className="font-heading font-bold text-xl text-white">
                SDN Plumbungan
              </span>
            </div>
            <p className="text-[14px] text-sage/90 leading-relaxed mt-2">
              Website resmi informasi dan pendaftaran kegiatan ekstrakurikuler SDN Plumbungan. Wadah berekspresi, melatih bakat, dan membangun karakter siswa.
            </p>
            <div className="flex items-start gap-2.5 text-[14px] text-sage/80 mt-2">
              <MapPin className="w-4 h-4 shrink-0 mt-1 text-marigold" aria-hidden="true" />
              <span>Plumbungan, Kec. Karangmalang, Kabupaten Sragen, Jawa Tengah 57291</span>
            </div>
          </div>

          {/* Kolom 2: Tautan Pintas */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-semibold text-[17px] text-white">
              Tautan Halaman
            </h4>
            <ul className="flex flex-col gap-2.5 text-[14px]">
              <li>
                <Link
                  href="/ekstrakurikuler"
                  className="hover:text-white transition-colors focus:underline inline-block py-1"
                >
                  Pilihan Ekstrakurikuler
                </Link>
              </li>
              <li>
                <Link
                  href="/jadwal"
                  className="hover:text-white transition-colors focus:underline inline-block py-1"
                >
                  Jadwal Kegiatan Pekanan
                </Link>
              </li>
              <li>
                <Link
                  href="/cek-status"
                  className="hover:text-white transition-colors focus:underline inline-block py-1"
                >
                  Cek Status Pendaftaran Siswa
                </Link>
              </li>
              <li>
                <Link
                  href="/kritik-saran"
                  className="hover:text-white transition-colors focus:underline inline-block py-1"
                >
                  Kirim Kritik & Saran
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="hover:text-white transition-colors focus:underline inline-block py-1"
                >
                  Tentang SDN Plumbungan
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-sage/60 hover:text-white transition-colors focus:underline inline-block py-1 text-[13px]"
                >
                  Halaman Khusus Guru (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak & Bantuan */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-semibold text-[17px] text-white">
              Bantuan & Pertanyaan
            </h4>
            <p className="text-[14px] text-sage/90 leading-relaxed">
              Jika Bapak/Ibu mengalami kesulitan saat mendaftarkan putra-putri, hubungi layanan bantuan sekolah melalui WhatsApp:
            </p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20SDN%20Plumbungan,%20saya%20ingin%20bertanya%20tentang%20ekstrakurikuler"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 mt-2 rounded-sm bg-primary hover:bg-primary-hover text-white font-semibold text-[14px] inline-flex items-center gap-2.5 w-fit transition-colors shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle className="w-4 h-4 text-marigold" aria-hidden="true" />
              <span>Hubungi WA Sekolah</span>
              <ExternalLink className="w-3.5 h-3.5 text-sage/70" aria-hidden="true" />
            </a>
            <p className="text-[12px] text-sage/70 mt-3">
              Data yang dikumpulkan semata-mata digunakan untuk keperluan administrasi ekstrakurikuler sekolah dan dilindungi kerahasiaannya.
            </p>
          </div>
        </div>

        <div className="border-t border-line/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[13px] text-sage/70 gap-3">
          <p>© 2026 SDN Plumbungan. Hak cipta dilindungi.</p>
          <p className="italic">&ldquo;Ayo Kembangkan Bakatmu!&rdquo;</p>
        </div>
      </div>
    </footer>
  );
};
