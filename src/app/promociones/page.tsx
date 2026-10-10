"use client";

import { CircleDot, Gem, ScanLine, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { SpaceFooter } from "@/components/shop/space-footer";
import { TREATMENT_CATEGORIES, type TreatmentCategory } from "@/lib/treatments/catalog";

type Promo = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  category: TreatmentCategory;
};

/** Destacados informativos (sin packs ni combos armados). */
const promos: Promo[] = [
  {
    id: "destacado-esencial",
    title: "Freyja · Esencial",
    subtitle: "Low Cost · primer acercamiento consciente",
    details: "60′ · $42.000 · Ideal para mantener la piel sana y equilibrada.",
    category: "Freyja · Low Cost",
  },
  {
    id: "destacado-laser",
    title: "Depilación láser · sesión 30′",
    subtitle: "Zonas a definir en consulta",
    details: "Sesión de 30 minutos. Valor por zona según evaluación.",
    category: "Láser",
  },
  {
    id: "destacado-consulta",
    title: "FREYJA · Consulta, análisis y primera piel",
    subtitle: "El paso antes de cualquier plan",
    details: "90′ · $65.000 · Coach estético y experiencia Primera Piel.",
    category: "Freyja · Premium",
  },
];

function CategoryIcon({ category }: { category: TreatmentCategory }) {
  const cls = "h-8 w-8 text-[#8C6844]";
  if (category === "Freyja · Low Cost") return <Sparkles className={cls} strokeWidth={1.9} />;
  if (category === "Freyja · Premium") return <Gem className={cls} strokeWidth={1.9} />;
  if (category === "Alta energía") return <Zap className={cls} strokeWidth={1.9} />;
  if (category === "Corporal") return <ScanLine className={cls} strokeWidth={1.9} />;
  return <CircleDot className={cls} strokeWidth={1.9} />;
}

export default function PromotionsPage() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("Freyja · Low Cost");

  const filteredPromos = useMemo(
    () => promos.filter((promo) => promo.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="bg-white text-[#181713]">
      <main className="mx-auto w-full max-w-[1160px] px-5 py-10">
        <p className="text-center text-[11px] tracking-[0.2em] text-[#8C6844] uppercase">Del mostrador</p>
        <h1 className="mt-2 text-center font-heading text-[38px] leading-tight">Destacados</h1>
        <p className="mx-auto mt-3 max-w-[1160px] text-center text-[14px] leading-relaxed text-[#64675f]">
          No trabajamos con combos armados: cada tratamiento se elige y cotiza según tu piel. Estos son ejemplos para
          reservar rápido; el detalle final lo vemos en consulta.
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

        <section className="mt-5 space-y-3">
          {filteredPromos.length === 0 ? (
            <p className="rounded-[24px] border border-[#2324201f] bg-[#f7f6f1] px-4 py-6 text-center text-[14px] text-[#64675f]">
              En esta categoría no hay destacados fijos. Mirá todos los tratamientos o reservá consulta.
            </p>
          ) : (
            filteredPromos.map((promo) => (
              <article key={promo.id} className="rounded-[24px] border border-[#2324201f] bg-[#f7f6f1] px-5 py-5">
                <div className="flex items-center gap-3">
                  <CategoryIcon category={promo.category} />
                  <span className="text-[11px] tracking-[0.14em] text-[#8C6844] uppercase">Destacado</span>
                </div>
                <h2 className="mt-3 font-heading text-[26px] leading-tight">{promo.title}</h2>
                <p className="mt-2 text-[14px] text-[#64675f]">{promo.subtitle}</p>
                <p className="mt-1 text-[15px] leading-relaxed">{promo.details}</p>
                <Link href="/tratamientos" className="mt-4 inline-flex text-[14px] text-[#8C6844] underline-offset-4 hover:underline">
                  Ver en servicios
                </Link>
              </article>
            ))
          )}
        </section>
      </main>
      <SpaceFooter />
    </div>
  );
}
