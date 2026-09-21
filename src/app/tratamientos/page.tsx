"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  SALON_TREATMENTS,
  TREATMENT_CATEGORIES,
  categoryChipLabel,
  type TreatmentCategory,
} from "@/lib/treatments/catalog";

const CATEGORY_INTROS: Partial<Record<TreatmentCategory, string>> = {
  "Freyja · Low Cost":
    "En Espacio Freyja el cuidado de la piel es posible para todas. Freyja Low Cost son tratamientos simples, conscientes y bien indicados, con la misma mirada profesional del espacio: no se trata de hacer menos, sino de hacer lo justo. No reemplazan sesiones avanzadas ni planes integrales.",
  "Freyja · Premium":
    "Sesiones de mayor profundidad cuando la piel necesita estímulo específico, regeneración o trabajo más intenso. Todos los Premium se realizan previo diagnóstico. No se indican por moda: se eligen cuando la piel lo necesita.",
  "Alta energía":
    "Tecnologías que trabajan en planos profundos; siempre indicadas por diagnóstico y pueden integrar planes de cuidado facial o corporal.",
  Corporal: "Tratamientos corporales orientados a definición, drenaje y calidad del tejido, según indicación profesional.",
  Láser:
    "Depilación láser definitiva en sesiones de 15′ o 30′ según zona; valor y plan según evaluación en consulta.",
};

export default function TreatmentsPage() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("Freyja · Low Cost");

  const filteredServices = useMemo(
    () => SALON_TREATMENTS.filter((service) => service.category === activeCategory),
    [activeCategory],
  );

  const intro = CATEGORY_INTROS[activeCategory];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="mx-auto w-full max-w-xl px-5 pt-8 pb-28">
        <header className="mb-5 text-center">
          <h1 className="font-heading text-[40px] leading-none font-bold tracking-tight">Tratamientos</h1>
        </header>

        <p className="mb-5 text-center text-[15px] leading-relaxed text-gray-600">
          Espacio Freyja · Carla Bruni, dermocosmiatra. Valores y tiempos orientativos; la indicación final es siempre
          personalizada.
        </p>

        <section
          className="sticky top-0 z-10 -mx-5 mb-4 bg-white px-5 py-2"
          role="tablist"
          aria-label="Filtrar por categoría"
        >
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
          </div>
        </section>

        {intro ? <p className="mb-5 text-[15px] leading-relaxed text-gray-600">{intro}</p> : null}

        <section className="space-y-3">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="rounded-[24px] border border-gray-100 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <h2 className="font-heading text-[26px] leading-tight font-bold text-gray-900">{service.name}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-700">{service.description}</p>
              <p className="mt-2 text-[14px] font-medium text-[#B88E2F]">{service.subtitle}</p>
              <Link
                href={`/turnos?treatment=${encodeURIComponent(service.id)}`}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-[#B88E2F] text-[16px] font-semibold text-white shadow-md transition active:scale-[0.98]"
              >
                Reservar
              </Link>
            </article>
          ))}
        </section>

        <p className="mt-8 text-center text-[13px] leading-relaxed text-gray-500">
          Regla Freyja: la tecnología no se vende. Se indica.
        </p>
      </main>
    </div>
  );
}
