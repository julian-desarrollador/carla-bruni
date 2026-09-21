"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  TREATMENT_CATEGORIES,
  categoryChipLabel,
  type TreatmentCategory,
} from "@/lib/treatments/catalog";
type Promo = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  category: TreatmentCategory;
  treatmentId: string;
};

const promos: Promo[] = [
  {
    id: "destacado-esencial",
    title: "Freyja · Esencial",
    subtitle: "Low Cost · primer acercamiento consciente",
    details: "60′ · $42.000 · Ideal para mantener la piel sana y equilibrada.",
    category: "Freyja · Low Cost",
    treatmentId: "freyja-esencial",
  },
  {
    id: "destacado-laser",
    title: "Depilación láser · sesión 30′",
    subtitle: "Zonas a definir en consulta",
    details: "Sesión de 30 minutos. Valor por zona según evaluación.",
    category: "Láser",
    treatmentId: "depilacion-laser-30",
  },
  {
    id: "destacado-consulta",
    title: "FREYJA · Consulta, análisis y primera piel",
    subtitle: "El paso antes de cualquier plan",
    details: "90′ · $65.000 · Coach estético y experiencia Primera Piel.",
    category: "Freyja · Premium",
    treatmentId: "freyja-consulta-analisis-primera-piel",
  },
];

export default function PromotionsPage() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("Freyja · Low Cost");

  const filteredPromos = useMemo(
    () => promos.filter((promo) => promo.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="mx-auto w-full max-w-xl px-5 pt-8 pb-28">
        <header className="mb-4 text-center">
          <h1 className="font-heading text-[40px] leading-none font-bold tracking-tight">Destacados</h1>
        </header>

        <p className="mb-5 text-center text-[15px] leading-relaxed text-gray-600">
          No trabajamos con combos armados: cada tratamiento se elige y cotiza según tu piel. Estos son ejemplos para
          reservar rápido; el detalle final lo vemos en consulta.
        </p>

        <section
          className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Filtrar destacados"
        >
          {TREATMENT_CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                  isActive ? "bg-[#B88E2F] text-white" : "border border-gray-200 bg-white text-gray-700"
                }`}
              >
                {categoryChipLabel(category)}
              </button>
            );
          })}
        </section>

        <section className="space-y-3">
          {filteredPromos.length === 0 ? (
            <p className="rounded-[24px] border border-gray-100 bg-[#F5F5F5] px-4 py-6 text-center text-[15px] text-gray-600">
              En esta categoría no hay destacados fijos. Mirá todos los tratamientos o reservá consulta.
            </p>
          ) : (
            filteredPromos.map((promo) => (
              <article
                key={promo.id}
                className="rounded-[24px] border border-gray-100 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
              >
                <p className="text-[11px] tracking-[0.16em] text-[#B88E2F]">DESTACADO</p>
                <h2 className="mt-2 font-heading text-[26px] leading-tight font-bold text-gray-900">{promo.title}</h2>
                <p className="mt-2 text-[15px] text-gray-600">{promo.subtitle}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-gray-700">{promo.details}</p>
                <Link
                  href={`/turnos?treatment=${encodeURIComponent(promo.treatmentId)}`}
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-[#B88E2F] text-[16px] font-semibold text-white shadow-md"
                >
                  Reservar
                </Link>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
