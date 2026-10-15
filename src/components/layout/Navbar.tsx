"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/ekstrakurikuler", label: "Ekstrakurikuler" },
    { href: "/jadwal", label: "Jadwal" },
    { href: "/galeri", label: "Galeri" },
    { href: "/kritik-saran", label: "Kritik & Saran" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Skip to Content for WCAG 2.1 AA */}
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-dark focus:text-white focus:rounded-sm focus:outline-none"
      >
        Lewati ke konten utama
      </a>

      <header className="sticky top-0 z-40 w-full bg-surface border-b border-line shadow-xs">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
          {/* Logo & Identitas Sekolah */}
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded-sm"
          >
            <div className="w-10 h-10 rounded-circle bg-primary flex items-center justify-center text-white font-heading font-bold text-lg shadow-xs">
              SD
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-[18px] text-ink leading-tight">
                SDN Plumbungan
              </span>
              <span className="text-[12px] text-muted -mt-0.5">
                Website Ekstrakurikuler
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors py-2 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark ${
                    active
                      ? "text-primary-dark font-semibold border-b-2 border-primary"
                      : "text-ink hover:text-primary-hover"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/cek-status"
              className="text-[15px] font-semibold text-primary-hover hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark py-2 px-1"
            >
              Cek Status
            </Link>
            <Link
              href="/daftar"
              className="min-h-[44px] px-6 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-primary text-white hover:bg-primary-hover shadow-soft focus:outline-none focus-visible:ring-3 focus-visible:ring-primary-dark transition-all duration-150 active:scale-[0.98]"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={menuOpen}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-sm text-ink hover:bg-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Fullscreen Panel */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-surface z-50 flex flex-col px-6 py-6 border-t border-line overflow-y-auto">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`min-h-[48px] flex items-center px-4 rounded-sm text-[17px] font-medium ${
                      active
                        ? "bg-sage-deep text-primary-dark font-bold"
                        : "text-ink hover:bg-sage"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-line flex flex-col gap-3">
              <Link
                href="/cek-status"
                onClick={() => setMenuOpen(false)}
                className="min-h-[48px] flex items-center justify-center rounded-pill border-[1.5px] border-primary text-primary-hover font-semibold text-[16px] text-center"
              >
                Cek Status Pendaftaran
              </Link>
              <Link
                href="/daftar"
                onClick={() => setMenuOpen(false)}
                className="min-h-[48px] flex items-center justify-center rounded-pill bg-primary text-white font-semibold text-[16px] text-center shadow-soft"
              >
                Daftar Sekarang
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
