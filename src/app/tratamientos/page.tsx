"use client";

import { CircleDot, Gem, ScanLine, Sparkles, Zap } from "lucide-react";
import { useMemo, useState } from "react";

import { SpaceFooter } from "@/components/shop/space-footer";
import { SALON_TREATMENTS, TREATMENT_CATEGORIES, type TreatmentCategory } from "@/lib/treatments/catalog";

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

const WHATSAPP_HREF = "https://wa.me/5492236164271";

function CategoryIcon({ category }: { category: TreatmentCategory }) {
  const cls = "h-7 w-7 text-[#8C6844]";
  if (category === "Freyja · Low Cost") return <Sparkles className={cls} strokeWidth={1.9} />;
  if (category === "Freyja · Premium") return <Gem className={cls} strokeWidth={1.9} />;
  if (category === "Alta energía") return <Zap className={cls} strokeWidth={1.9} />;
  if (category === "Corporal") return <ScanLine className={cls} strokeWidth={1.9} />;
  return <CircleDot className={cls} strokeWidth={1.9} />;
}

export default function TreatmentsPage() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("Freyja · Low Cost");

  const filteredServices = useMemo(
    () => SALON_TREATMENTS.filter((service) => service.category === activeCategory),
    [activeCategory],
  );

  const intro = CATEGORY_INTROS[activeCategory];

  return (
    <div className="bg-white text-[#181713]">
      <main className="mx-auto w-full max-w-[1160px] px-5 py-10">
        <p className="text-center text-[11px] tracking-[0.2em] text-[#8C6844] uppercase">Servicios de cabina</p>
        <h1 className="mt-2 text-center font-heading text-[38px] leading-tight">Tratamientos</h1>
        <p className="mx-auto mt-3 max-w-[1160px] text-center text-[14px] leading-relaxed text-[#64675f]">
          Espacio Freyja · Carla Bruni, dermocosmiatra. Valores y tiempos orientativos; la indicación final es siempre
          personalizada.
        </p>

        <section className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
          {TREATMENT_CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] ${
                  isActive ? "bg-[#8C6844] text-white" : "border border-[#2324201f] bg-[#f7f6f1] text-[#64675f]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </section>

        {intro ? <p className="mt-4 text-[14px] leading-relaxed text-[#64675f]">{intro}</p> : null}

        <section className="mt-5 space-y-3">
          {filteredServices.map((service) => (
            <article key={service.id} className="rounded-[24px] border border-[#2324201f] bg-[#f7f6f1] px-5 py-5">
              <div className="flex items-center gap-3">
                <CategoryIcon category={service.category} />
                <p className="text-[11px] tracking-[0.14em] text-[#8C6844] uppercase">{service.category}</p>
              </div>
              <h2 className="mt-3 font-heading text-[26px] leading-tight">{service.name}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#181713]">{service.description}</p>
              <p className="mt-2 text-[13px] tracking-[0.04em] text-[#64675f]">{service.subtitle}</p>
            </article>
          ))}
        </section>

        <p className="mt-6 text-center text-[13px] leading-relaxed text-[#64675f]">
          Regla Freyja: la tecnología no se vende. Se indica.
        </p>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-4 flex h-12 max-w-sm items-center justify-center rounded-full border border-[#8C6844] text-[14px] text-[#8C6844]"
        >
          Coordinar por WhatsApp
        </a>
      </main>
      <SpaceFooter />
    </div>
  );
}
