import React from "react";
import { StatusPendaftaran } from "@/lib/aturan";

export interface BadgeStatusProps {
  status: StatusPendaftaran;
  className?: string;
  size?: "sm" | "md";
}

const KONFIGURASI_STATUS: Record<
  StatusPendaftaran,
  { label: string; bgClass: string; textClass: string }
> = {
  menunggu_verifikasi: {
    label: "Menunggu Verifikasi",
    bgClass: "bg-marigold-soft",
    textClass: "text-marigold-ink",
  },
  diverifikasi: {
    label: "Diverifikasi",
    bgClass: "bg-sage-deep",
    textClass: "text-primary-dark",
  },
  diterima: {
    label: "Diterima",
    bgClass: "bg-primary",
    textClass: "text-white",
  },
  ditolak: {
    label: "Ditolak",
    bgClass: "bg-danger-soft",
    textClass: "text-danger-ink",
  },
};

export const BadgeStatus: React.FC<BadgeStatusProps> = ({
  status,
  className = "",
  size = "md",
}) => {
  const config = KONFIGURASI_STATUS[status] ?? {
    label: status,
    bgClass: "bg-sage-deep",
    textClass: "text-ink",
  };

  const sizeClass =
    size === "sm"
      ? "px-2.5 py-0.5 text-[12px] font-semibold"
      : "px-3.5 py-1 text-[13px] font-bold";

  return (
    <span
      className={`inline-flex items-center rounded-pill ${sizeClass} ${config.bgClass} ${config.textClass} ${className}`}
    >
      {config.label}
    </span>
  );
};
