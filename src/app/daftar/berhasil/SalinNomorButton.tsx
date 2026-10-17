"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export const SalinNomorButton: React.FC<{ nomor: string }> = ({ nomor }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(nomor);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="min-h-[44px] px-5 py-2 inline-flex items-center gap-2 rounded-pill bg-surface border-[1.5px] border-primary text-primary-hover font-semibold text-[14px] hover:bg-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark transition-all active:scale-95"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-primary" />
          <span>Nomor Tersalin!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Salin Nomor</span>
        </>
      )}
    </button>
  );
};
