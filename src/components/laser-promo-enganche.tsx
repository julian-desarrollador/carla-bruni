"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FLYER_SRC = "/flyer.jpeg";

const WHATSAPP_LASER =
  "https://wa.me/5492236164271?text=" +
  encodeURIComponent("Hola, te escribo de Carla Bruni · Espacio Freyja. Consulto por depilación láser.");

const toggleBtnClass =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-[#B88E2F]/40 hover:text-[#B88E2F]";

export function LaserPromoEnganche() {
  const [showTextBlock, setShowTextBlock] = useState(true);

  return (
    <section
      className="mb-4 overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      aria-labelledby={showTextBlock ? "laser-enganche-title" : undefined}
      aria-label={!showTextBlock ? "Promo láser depilación definitiva" : undefined}
    >
      {showTextBlock ? (
        <div className="flex items-start justify-between gap-3 px-4 pt-3 pb-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#B88E2F]">PROMO LÁSER</p>
            <h2 id="laser-enganche-title" className="mt-1.5 font-heading text-[32px] leading-none text-[#B88E2F]">
              $17.500
            </h2>
            <p className="mt-2 text-[15px] leading-snug font-semibold text-gray-900">Cavado completo + tira</p>
          </div>
          <button
            type="button"
            onClick={() => setShowTextBlock(false)}
            aria-pressed={true}
            aria-label="Ocultar texto de precio y descripción"
            className={`${toggleBtnClass} -translate-y-1`}
          >
            <EyeOff className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      ) : null}

      <div className="relative w-full bg-[#F5F5F5]">
        {!showTextBlock ? (
          <button
            type="button"
            onClick={() => setShowTextBlock(true)}
            aria-pressed={false}
            aria-label="Mostrar texto de precio y descripción"
            className={`${toggleBtnClass} absolute top-3 right-3 z-10`}
          >
            <Eye className="h-4 w-4" strokeWidth={2} />
          </button>
        ) : null}
        <Image
          src={FLYER_SRC}
          alt="Depilación láser · Carla Bruni · Espacio Freyja"
          width={900}
          height={1350}
          className="block h-auto w-full"
          sizes="(max-width: 448px) 100vw, 448px"
          priority
        />
      </div>

      <div className="flex flex-col gap-2 p-4 pt-3">
        <Link
          href="/turnos?treatment=depilacion-laser-30"
          className="flex h-10 w-full items-center justify-center rounded-full bg-[#B88E2F] text-[14px] font-semibold text-white shadow-md"
        >
          Reservar turno
        </Link>
        <a
          href={WHATSAPP_LASER}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-full items-center justify-center rounded-full border border-gray-200 bg-white text-[13px] font-medium text-gray-700 transition hover:border-[#B88E2F]/35"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </section>
  );
}
