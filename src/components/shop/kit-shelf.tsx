"use client";

import { useState } from "react";

import { ProductPhoto } from "@/components/shop/product-photo";
import { useShop } from "@/components/shop/shop-provider";
import { formatArs, kitItem, relatedForKit, SAMPLE_NOTE, type SkinKit } from "@/lib/shop/skin-kits";

export function KitShelf({ kit }: { kit: SkinKit }) {
  const { addItem } = useShop();
  const [notice, setNotice] = useState<string | null>(null);
  const full = kitItem(kit);
  const related = relatedForKit(kit);

  function add(id: string, name: string) {
    addItem(id);
    setNotice(`${name} quedó en el carrito.`);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12">
      <p className="text-[11px] tracking-[0.2em] text-[#8C6844] uppercase">{kit.name}</p>
      <h1 className="mt-2 font-heading text-[38px] leading-tight text-[#181713]">{kit.kitName}</h1>
      <p className="mt-2 text-[16px] text-[#8C6844]">{kit.tagline}</p>
      <ul className="mt-4 space-y-1 text-[15px] text-[#181713]">
        {kit.checks.map((check) => (
          <li key={check}>✓ {check}</li>
        ))}
      </ul>
      <p className="mt-3 text-[14px] leading-relaxed text-[#64675f]">Necesita: {kit.needs}</p>

      <ProductPhoto id={full.id} className="mt-6 aspect-[4/5] w-full rounded-[24px] object-cover" />
      <p className="mt-6 rounded-2xl border border-[#2324201f] bg-[#f7f6f1] px-4 py-3 text-[13px] leading-relaxed text-[#64675f]">
        {SAMPLE_NOTE}
      </p>

      <button
        type="button"
        onClick={() => add(full.id, full.name)}
        className="mt-5 flex w-full flex-col items-center rounded-[24px] bg-[#8C6844] px-5 py-5 text-white"
      >
        <span className="text-[12px] tracking-[0.16em] uppercase">Kit completo</span>
        <span className="mt-1 font-heading text-[28px]">{full.name}</span>
        <span className="mt-1 text-[15px]">{formatArs(full.price)} · muestra</span>
      </button>

      <h2 className="mt-8 font-heading text-[26px] text-[#181713]">Por unidad</h2>
      <ul className="mt-3 space-y-3">
        {kit.units.map((unit) => (
          <li key={unit.id} className="flex gap-4 rounded-[22px] border border-[#2324201f] bg-[#f7f6f1] px-4 py-4">
            <ProductPhoto id={unit.id} className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
            <p className="font-heading text-[22px] text-[#181713]">{unit.name}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#64675f]">{unit.detail}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-[14px] text-[#8C6844]">{formatArs(unit.price)}</p>
              <button
                type="button"
                onClick={() => add(unit.id, unit.name)}
                className="rounded-full border border-[#8C6844] px-4 py-2 text-[13px] text-[#8C6844]"
              >
                Sumar al carrito
              </button>
            </div>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 font-heading text-[26px] text-[#181713]">También en el mostrador</h2>
      <ul className="mt-3 space-y-3">
        {related.map((item) => (
          <li key={item.id} className="flex gap-4 rounded-[22px] border border-[#2324201f] bg-[#f6f4ee] px-4 py-4">
            <ProductPhoto id={item.id} className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
            <p className="font-heading text-[22px] text-[#181713]">{item.name}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#64675f]">{item.detail}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-[14px] text-[#8C6844]">{formatArs(item.price)}</p>
              <button
                type="button"
                onClick={() => add(item.id, item.name)}
                className="rounded-full border border-[#8C6844] px-4 py-2 text-[13px] text-[#8C6844]"
              >
                Sumar al carrito
              </button>
            </div>
            </div>
          </li>
        ))}
      </ul>

      {notice ? <p className="mt-5 text-center text-[14px] text-[#8C6844]">{notice}</p> : null}
    </div>
  );
}
