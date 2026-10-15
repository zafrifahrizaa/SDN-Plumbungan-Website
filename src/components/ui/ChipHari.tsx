import React from "react";

export interface ChipHariProps {
  hari: string;
  jam?: string;
  className?: string;
}

export const ChipHari: React.FC<ChipHariProps> = ({ hari, jam, className = "" }) => {
  const text = jam ? `${hari.toUpperCase()} · ${jam}` : hari.toUpperCase();

  return (
    <span
      className={`inline-flex items-center px-3 py-1 bg-marigold text-ink text-[13px] font-bold tracking-wide rounded-pill shadow-xs select-none tabular-nums ${className}`}
    >
      {text}
    </span>
  );
};
