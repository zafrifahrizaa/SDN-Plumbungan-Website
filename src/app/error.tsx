"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log galat internal secara aman tanpa mencatat data pribadi
    console.error("Terjadi kendala pada sistem:", error.digest || error.message);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-5 py-12">
      <div className="max-w-md w-full bg-surface p-8 rounded-lg border border-line shadow-soft text-center flex flex-col items-center">
        <div className="w-14 h-14 rounded-circle bg-danger-soft text-danger flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="font-heading font-semibold text-2xl text-ink">
          Terjadi Sedikit Kendala
        </h1>
        <p className="text-[15px] text-muted leading-relaxed mt-2 mb-6">
          Sistem sedang memproses permintaanmu tetapi mengalami kendala sementara. Data kamu aman, silakan coba beberapa saat lagi.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button onClick={() => reset()} variant="primary">
            Coba Lagi
          </Button>
          <Link
            href="/"
            className="min-h-[48px] px-6 inline-flex items-center justify-center font-body font-semibold text-[15px] rounded-pill bg-surface text-primary-hover border-[1.5px] border-primary hover:bg-sage"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
