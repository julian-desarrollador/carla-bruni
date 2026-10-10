"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import { ProductPhoto } from "@/components/shop/product-photo";
import { useShop } from "@/components/shop/shop-provider";
import { formatArs, kitItem, relatedForKit, SAMPLE_NOTE, SKIN_KITS, type ShopItem } from "@/lib/shop/skin-kits";

function ProductMark({ id, title, caption }: { id: string; title: string; caption: string }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#f4f4f2]">
      <ProductPhoto id={id} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#f6f4ee] via-[#f6f4ee]/85 to-transparent p-5 pt-16">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[#8C6844] uppercase">{caption}</p>
        <p className="mt-1 font-heading text-[26px] leading-tight text-[#181713]">{title}</p>
      </div>
    </div>
  );
}

function AddButton({
  children,
  onClick,
  primary = false,
}: {
  children: ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        primary
          ? "inline-flex items-center justify-center rounded-full bg-[#8C6844] px-5 py-3 text-[13px] font-bold tracking-[0.08em] text-white uppercase transition hover:-translate-y-px"
          : "inline-flex items-center justify-center rounded-full border border-[#181713]/18 bg-white px-4 py-2.5 text-[12px] font-bold tracking-[0.08em] text-[#181713] uppercase transition hover:bg-[#f7f7f5]"
      }
    >
      {children}
    </button>
  );
}

export function Storefront() {
  const { addItem } = useShop();
  const [skinId, setSkinId] = useState(SKIN_KITS[0]?.id ?? "grasa");
  const kit = SKIN_KITS.find((item) => item.id === skinId) ?? SKIN_KITS[0];

  if (!kit) return null;

  function add(item: ShopItem) {
    addItem(item.id);
  }

  const full = kitItem(kit);
  const related = relatedForKit(kit);

  return (
    <section id="pared" className="border-t border-[#e4e4e0] bg-white">
      <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-16 min-[921px]:py-20">
        <div>
          <p className="text-[12px] font-bold tracking-[0.22em] text-[#8C6844] uppercase">Tienda</p>
          <h2 className="mt-2 font-heading text-[clamp(36px,5vw,56px)] leading-[0.95] text-[#181713]">
            El ritual, en el carrito
          </h2>
          <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-[#3c4038]">
            Elegí el tipo de piel. Llevá el kit completo o cada paso, y sumá lo que entra en el ritual. {SAMPLE_NOTE}
          </p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Tipo de piel">
          {SKIN_KITS.map((item) => {
            const active = item.id === kit.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSkinId(item.id)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-[14px] font-semibold whitespace-nowrap ${
                  active ? "bg-[#8C6844] text-white" : "border border-[#e4e4e0] bg-[#f7f7f5] text-[#181713]"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid items-start gap-8 min-[921px]:grid-cols-[0.9fr_1.1fr]">
          <ProductMark id={full.id} title={kit.kitName} caption={kit.name} />
          <div>
            <p className="text-[13px] font-semibold tracking-[0.16em] text-[#8C6844] uppercase">{kit.tagline}</p>
            <h3 className="mt-2 font-heading text-[clamp(32px,4vw,48px)] leading-tight text-[#181713]">{full.name}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#3c4038]">Necesita: {kit.needs}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {kit.checks.map((check) => (
                <li key={check} className="rounded-full bg-[#f4f4f2] px-3 py-1.5 text-[13px] text-[#181713]">
                  {check}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-heading text-[40px] leading-none text-[#181713]">{formatArs(full.price)}</p>
            <p className="mt-1 text-[13px] text-[#64675f]">Precio de muestra · kit completo, tres pasos</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AddButton primary onClick={() => add(full)}>
                Agregar kit
              </AddButton>
              <Link
                href={`/piel/${kit.id}`}
                className="inline-flex items-center rounded-full border border-[#181713]/18 px-5 py-3 text-[13px] font-bold tracking-[0.08em] text-[#181713] uppercase"
              >
                Ver ficha
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-heading text-[32px] text-[#181713]">Por unidad</h3>
          <p className="mt-1 text-[15px] text-[#3c4038]">Los tres pasos, si preferís armarlo vos.</p>
          <ul className="mt-5 grid gap-4 min-[721px]:grid-cols-3">
            {kit.units.map((unit) => (
              <li key={unit.id} className="flex flex-col rounded-[22px] border border-[#e4e4e0] bg-white p-4">
                <ProductPhoto id={unit.id} className="mb-4 aspect-square w-full rounded-[16px] object-cover" />
                <p className="font-heading text-[24px] leading-tight text-[#181713]">{unit.name}</p>
                <p className="mt-1 flex-1 text-[13px] leading-relaxed text-[#64675f]">{unit.detail}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-[16px] font-semibold text-[#181713]">{formatArs(unit.price)}</p>
                  <AddButton onClick={() => add(unit)}>Sumar</AddButton>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="font-heading text-[32px] text-[#181713]">Para sumar al ritual</h3>
          <p className="mt-1 text-[15px] text-[#3c4038]">Un accesorio o un producto que entra con este tipo de piel.</p>
          <ul className="mt-5 grid gap-4 min-[721px]:grid-cols-2">
            {related.map((item) => (
              <li key={item.id} className="flex items-center gap-4 rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] p-4">
                <ProductPhoto id={item.id} className="h-20 w-20 shrink-0 rounded-[14px] object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-[24px] leading-tight text-[#181713]">{item.name}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#64675f]">{item.detail}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-[16px] font-semibold">{formatArs(item.price)}</p>
                    <AddButton onClick={() => add(item)}>Sumar</AddButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
