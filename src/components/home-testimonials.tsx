"use client";

import { HOME_TESTIMONIALS } from "@/lib/home-testimonials-data";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

export type { HomeTestimonial } from "@/lib/home-testimonials-data";

const arrowBtnClass =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-[#B88E2F]/45 hover:text-[#B88E2F]";

function avatarLetterFromName(name: string): string {
  const m = name.trim().match(/\p{L}/u);
  return m ? m[0]!.toUpperCase() : "?";
}

function FiveStars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`.trim()} role="img" aria-label="Calificación: 5 de 5 estrellas">
      {Array.from({ length: 5 }, (_, k) => (
        <Star key={k} className="h-3.5 w-3.5 fill-[#B88E2F] text-[#B88E2F]" strokeWidth={0} aria-hidden />
      ))}
    </div>
  );
}

export function HomeTestimonials() {
  const n = HOME_TESTIMONIALS.length;
  const [i, setI] = useState(0);

  const prev = useCallback(() => {
    setI((j) => (j - 1 + n) % n);
  }, [n]);

  const next = useCallback(() => {
    setI((j) => (j + 1) % n);
  }, [n]);

  const t = useMemo(() => HOME_TESTIMONIALS[i]!, [i]);
  const showNav = n > 1;

  return (
    <section className="mx-auto w-[84%]" aria-labelledby="home-testimonios-title">
      <div className="mb-3 flex items-end justify-between gap-2">
        <h2
          id="home-testimonios-title"
          className="text-[10px] font-medium tracking-[0.24em] text-gray-500 uppercase"
        >
          Testimonios
        </h2>
        {showNav ? (
          <p className="text-[10px] tabular-nums tracking-[0.08em] text-gray-400">
            {i + 1} / {n}
          </p>
        ) : null}
      </div>

      <div className="flex items-stretch gap-1.5 sm:gap-2">
        {showNav ? (
          <button type="button" className={`${arrowBtnClass} self-center`} aria-label="Testimonio anterior" onClick={prev}>
            <ChevronLeft className="h-5 w-5" strokeWidth={1.8} aria-hidden />
          </button>
        ) : null}

        <article
          className="min-w-0 flex-1 rounded-[28px] border border-gray-100 bg-white/92 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-[8px]"
          aria-live="polite"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-[#F5F5F5]">
                {t.imageSrc ? (
                  <Image
                    key={t.imageSrc}
                    src={t.imageSrc}
                    alt={`${t.name}, clienta`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <span className="font-heading text-[1.35rem] font-medium tracking-wide text-[#B88E2F]" aria-hidden>
                    {avatarLetterFromName(t.name)}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[12px] font-medium leading-tight tracking-[0.1em] text-[#B88E2F]">{t.name}</p>
                <FiveStars className="mt-1.5 justify-start" />
              </div>
            </div>
            {t.quote?.trim() ? (
              <blockquote className="w-full text-left text-[13px] leading-relaxed text-gray-700">
                <p className="whitespace-pre-line text-gray-800">&ldquo;{t.quote.trim()}&rdquo;</p>
              </blockquote>
            ) : null}
          </div>
        </article>

        {showNav ? (
          <button type="button" className={`${arrowBtnClass} self-center`} aria-label="Testimonio siguiente" onClick={next}>
            <ChevronRight className="h-5 w-5" strokeWidth={1.8} aria-hidden />
          </button>
        ) : null}
      </div>
    </section>
  );
}
