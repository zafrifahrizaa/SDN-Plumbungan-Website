"use client";

import React, { useActionState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { BadgeStatus } from "@/components/ui/BadgeStatus";
import { periksaStatusAction, ActionCekStatusResult } from "./actions";
import { Search, Calendar, User, BookOpen, MessageSquare } from "lucide-react";

const initialState: ActionCekStatusResult = {
  sukses: false,
  pesan: "",
};

export const CekStatusForm: React.FC = () => {
  const [state, formAction, isPending] = useActionState(
    periksaStatusAction,
    initialState
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Formulir Cek Status */}
      <form
        action={formAction}
        className="bg-surface rounded-lg border border-line shadow-soft p-6 sm:p-8 flex flex-col gap-5 text-left"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Nomor Pendaftaran"
            name="nomor"
            placeholder="Contoh: EKS-2026-0001"
            helperText="Sesuai bukti pendaftaran yang didapat."
            required
          />

          <Field
            label="NIS / NISN Siswa"
            name="nis"
            placeholder="Contoh: 123456"
            helperText="Nomor induk siswa yang didaftarkan."
            required
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isPending}
            loadingText="Memeriksa..."
            className="w-full sm:w-auto"
          >
            <Search className="w-4 h-4 mr-2" />
            <span>Periksa Status Pendaftaran</span>
          </Button>
        </div>
      </form>

      {/* Pesan Galat Umum (Jika Gagal) */}
      {!state.sukses && state.pesan && (
        <Alert variant="galat" title="Data Tidak Ditemukan">
          {state.pesan}
        </Alert>
      )}

      {/* Hasil Status Pendaftaran (Jika Ditemukan) */}
      {state.sukses && state.data && (
        <div className="bg-surface rounded-lg border-2 border-line shadow-soft p-6 sm:p-8 text-left flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-3">
            <div>
              <span className="text-[13px] text-muted block uppercase tracking-wider">
                Hasil Pencarian
              </span>
              <h2 className="font-heading font-bold text-2xl text-ink mt-0.5">
                {state.data.nomor}
              </h2>
            </div>
            <div>
              <BadgeStatus status={state.data.status} size="md" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px]">
            <div className="flex items-center gap-3 p-3 rounded-sm bg-sage/60">
              <User className="w-5 h-5 text-primary shrink-0" />
              <div>
                <span className="text-[12px] text-muted block">Nama Siswa</span>
                <span className="font-semibold text-ink">{state.data.nama_siswa}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-sm bg-sage/60">
              <BookOpen className="w-5 h-5 text-primary shrink-0" />
              <div>
                <span className="text-[12px] text-muted block">Ekstrakurikuler</span>
                <span className="font-semibold text-ink">{state.data.ekskul_nama}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-sm bg-sage/60">
              <Calendar className="w-5 h-5 text-primary shrink-0" />
              <div>
                <span className="text-[12px] text-muted block">Tanggal Pendaftaran</span>
                <span className="font-semibold text-ink">
                  {new Date(state.data.tanggal_daftar).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Catatan Admin Bila Ada (PRD Bagian 9 & DESAIN 6.7) */}
          {state.data.catatan_admin ? (
            <div className="p-4 rounded-sm bg-marigold-soft border border-marigold/30 text-[14px] flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-marigold-ink shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-marigold-ink block mb-0.5">
                  Catatan dari Pembina / Admin:
                </strong>
                <p className="text-ink">{state.data.catatan_admin}</p>
              </div>
            </div>
          ) : (
            <p className="text-[14px] text-muted italic">
              {state.data.status === "menunggu_verifikasi"
                ? "Berkas pendaftaran sedang dalam antrean verifikasi oleh guru pembina."
                : state.data.status === "diterima"
                ? "Selamat! Siswa telah diterima pada kegiatan ekstrakurikuler ini."
                : "Tidak ada catatan khusus dari pembina."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
