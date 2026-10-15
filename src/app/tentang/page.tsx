import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Award, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Sekolah | SDN Plumbungan",
  description:
    "Profil singkat SDN Plumbungan, visi misi, komitmen pembinaan bakat, dan informasi kontak resmi sekolah.",
};

export default function TentangPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main id="konten-utama" className="flex-1 max-w-[900px] w-full mx-auto px-5 md:px-8 py-10 md:py-16 text-left">
        <span className="text-primary font-bold text-[14px] tracking-wide uppercase">
          Profil Sekolah
        </span>
        <h1 className="font-heading font-semibold text-[32px] sm:text-[40px] text-ink leading-tight mt-1 mb-6">
          Tentang SDN Plumbungan
        </h1>

        <div className="bg-surface rounded-lg border border-line shadow-soft p-6 sm:p-10 flex flex-col gap-8">
          <div>
            <h2 className="font-heading font-semibold text-[22px] text-primary-dark mb-3">
              Mendidik Karakter & Mengembangkan Potensi Anak
            </h2>
            <p className="text-[16px] text-muted leading-relaxed font-body">
              SDN Plumbungan berlokasi di Kecamatan Karangmalang, Kabupaten Sragen, Jawa Tengah. Sekolah kami berkomitmen memberikan pendidikan dasar yang berkualitas, menanamkan nilai-nilai keagamaan dan budi pekerti luhur, serta membuka ruang seluas-luasnya bagi peserta didik untuk mengembangkan bakat dan minat mereka melalui kegiatan ekstrakurikuler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-line">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-[16px] text-ink">Prestasi & Pembinaan</h3>
                <p className="text-[14px] text-muted leading-relaxed mt-1">
                  Bimbingan rutin oleh guru dan pembina berdedikasi tinggi di bidang seni, olahraga, dan kepanduan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-[16px] text-ink">Lingkungan Belajar Nyaman</h3>
                <p className="text-[14px] text-muted leading-relaxed mt-1">
                  Fasilitas musholla, aula, ruang kesenian, dan lapangan olahraga yang aman untuk anak-anak sekolah dasar.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-line">
            <h3 className="font-heading font-semibold text-[19px] text-ink mb-4">
              Informasi Kontak & Lokasi
            </h3>
            <div className="flex flex-col gap-3 text-[15px] text-muted">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Plumbungan, Kec. Karangmalang, Kabupaten Sragen, Jawa Tengah 57291</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>WhatsApp Bantuan: 0812-3456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>sdnplumbungan@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center sm:text-left">
            <Link
              href="/ekstrakurikuler"
              className="min-h-[48px] px-8 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-primary text-white hover:bg-primary-hover shadow-soft"
            >
              Lihat Kegiatan Ekstrakurikuler
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
