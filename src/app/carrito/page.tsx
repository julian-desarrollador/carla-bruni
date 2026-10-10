"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ProductPhoto } from "@/components/shop/product-photo";
import { useShop } from "@/components/shop/shop-provider";
import { SpaceFooter } from "@/components/shop/space-footer";
import { findShopItem, formatArs, SAMPLE_NOTE } from "@/lib/shop/skin-kits";

export default function CarritoPage() {
  const { ready, lines, setQty, removeItem, clearCart, account, saveCartToSkin } = useShop();
  const [saved, setSaved] = useState(false);

  const resolved = lines.flatMap((line) => {
    const item = findShopItem(line.id);
    return item ? [{ ...line, item }] : [];
  });
  const total = resolved.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  return (
    <>
    <div className="mx-auto w-full max-w-3xl px-5 py-12">
      <p className="text-[11px] tracking-[0.2em] text-[#8C6844] uppercase">Carrito</p>
      <h1 className="mt-2 font-heading text-[38px] text-[#181713]">Lo que llevás</h1>
      <p className="mt-3 text-[14px] leading-relaxed text-[#64675f]">{SAMPLE_NOTE}</p>
      <p className="mt-2 text-[14px] leading-relaxed text-[#64675f]">
        Este carrito vive en este navegador. No hay pago ni Mercado Pago.
      </p>

      {!ready ? (
        <p className="mt-8 text-center text-[14px] text-[#64675f]">Abriendo el carrito…</p>
      ) : resolved.length === 0 ? (
        <div className="mt-8 rounded-[24px] border border-[#2324201f] bg-[#f7f6f1] px-5 py-8 text-center">
          <p className="font-heading text-[24px] text-[#181713]">El carrito está vacío</p>
          <Link href="/piel" className="mt-4 inline-flex text-[14px] text-[#8C6844] underline-offset-4 hover:underline">
            Volver a la pared
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-6 space-y-3">
            {resolved.map((line) => (
              <li key={line.id} className="flex gap-4 rounded-[22px] border border-[#2324201f] bg-[#f7f6f1] px-4 py-4">
                <ProductPhoto id={line.id} className="h-20 w-20 shrink-0 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                <p className="font-heading text-[22px] leading-tight text-[#181713]">{line.item.name}</p>
                <p className="mt-1 text-[13px] text-[#64675f]">{line.item.detail}</p>
                <p className="mt-2 text-[14px] text-[#8C6844]">{formatArs(line.item.price)}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Restar uno"
                      onClick={() => setQty(line.id, line.qty - 1)}
                      className="h-9 w-9 rounded-full border border-[#2324201f] text-[18px] text-[#181713]"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-[15px]">{line.qty}</span>
                    <button
                      type="button"
                      aria-label="Sumar uno"
                      onClick={() => setQty(line.id, line.qty + 1)}
                      className="h-9 w-9 rounded-full border border-[#2324201f] text-[18px] text-[#181713]"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label={`Quitar ${line.item.name}`}
                    onClick={() => removeItem(line.id)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#64675f] transition hover:bg-white hover:text-[#181713]"
                  >
                    <Trash2 className="h-[18px] w-[18px]" aria-hidden />
                  </button>
                </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-right font-heading text-[28px] text-[#181713]">{formatArs(total)}</p>
          <p className="text-right text-[12px] tracking-[0.12em] text-[#8C6844] uppercase">Total de muestra</p>
          <div className="mt-5 flex flex-col gap-3">
            {account ? (
              <button
                type="button"
                onClick={() => {
                  const ok = saveCartToSkin();
                  setSaved(ok);
                }}
                className="flex h-12 items-center justify-center rounded-full bg-[#8C6844] text-[14px] font-medium text-white"
              >
                Sumar a mi piel
              </button>
            ) : (
              <Link
                href="/cuenta"
                className="flex h-12 items-center justify-center rounded-full bg-[#8C6844] text-[14px] font-medium text-white"
              >
                Abrí tu piel para guardar esto
              </Link>
            )}
            <button type="button" onClick={clearCart} className="text-[13px] text-[#64675f] underline">
              Vaciar carrito
            </button>
          </div>
        </>
      )}
      {saved ? (
        <p className="mt-4 text-center text-[14px] text-[#8C6844]">
          Quedó anotado en tu ficha de este navegador. No se cobró nada.
        </p>
      ) : null}
    </div>
    <SpaceFooter />
    </>
  );
}
