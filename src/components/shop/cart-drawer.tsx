"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";

import { ProductPhoto } from "@/components/shop/product-photo";
import { useShop } from "@/components/shop/shop-provider";
import { findShopItem, formatArs } from "@/lib/shop/skin-kits";

export function CartDrawer() {
  const { lines, count, cartOpen, closeCart, setQty, removeItem } = useShop();
  const resolved = useMemo(
    () =>
      lines.flatMap((line) => {
        const item = findShopItem(line.id);
        return item ? [{ ...line, item }] : [];
      }),
    [lines],
  );
  const total = resolved.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  useEffect(() => {
    if (!cartOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, closeCart]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100]">
      <button type="button" className="absolute inset-0 bg-[#181713]/40" aria-label="Cerrar carrito" onClick={closeCart} />
      <aside className="absolute inset-y-0 right-0 flex h-dvh w-[min(420px,100%)] flex-col overflow-hidden bg-white shadow-[-12px_0_40px_rgba(24,23,19,0.12)]">
        <div className="flex items-center justify-between border-b border-[#e4e4e0] px-5 py-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#8C6844] uppercase">Carrito</p>
            <p className="font-heading text-[28px] leading-tight text-[#181713]">
              {count === 0 ? "Vacío" : `${count} ${count === 1 ? "pieza" : "piezas"}`}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full border border-[#e4e4e0] px-3 py-2 text-[12px] font-bold tracking-[0.08em] uppercase"
          >
            Cerrar
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {resolved.length === 0 ? (
            <p className="text-[15px] leading-relaxed text-[#3c4038]">Todavía no hay nada. Elegí un kit o un paso.</p>
          ) : (
            <ul className="space-y-4">
              {resolved.map((line) => (
                <li key={line.id} className="border-b border-[#e4e4e0] pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <ProductPhoto id={line.id} className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
                      <div className="min-w-0">
                        <p className="font-heading text-[22px] leading-tight text-[#181713]">{line.item.name}</p>
                        <p className="mt-1 text-[14px] text-[#3c4038]">{formatArs(line.item.price)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Quitar ${line.item.name}`}
                      onClick={() => removeItem(line.id)}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#64675f] transition hover:bg-[#f7f6f1] hover:text-[#181713]"
                    >
                      <Trash2 className="h-[18px] w-[18px]" aria-hidden />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Bajar cantidad"
                      onClick={() => setQty(line.id, line.qty - 1)}
                      className="h-9 w-9 rounded-full border border-[#e4e4e0] text-[18px]"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-[15px] font-semibold">{line.qty}</span>
                    <button
                      type="button"
                      aria-label="Subir cantidad"
                      onClick={() => setQty(line.id, line.qty + 1)}
                      className="h-9 w-9 rounded-full border border-[#e4e4e0] text-[18px]"
                    >
                      +
                    </button>
                    <span className="ml-auto text-[15px] font-semibold">{formatArs(line.item.price * line.qty)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-[#e4e4e0] px-5 py-5">
          <div className="flex items-baseline justify-between">
            <p className="text-[13px] tracking-[0.12em] text-[#64675f] uppercase">Total de muestra</p>
            <p className="font-heading text-[32px] leading-none">{formatArs(total)}</p>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-[#64675f]">No hay pago. El carrito queda en este navegador.</p>
          <Link
            href="/carrito"
            onClick={closeCart}
            className="mt-4 flex items-center justify-center rounded-full bg-[#8C6844] px-5 py-3.5 text-[13px] font-bold tracking-[0.08em] text-white uppercase"
          >
            Ver el carrito
          </Link>
        </div>
      </aside>
    </div>
  );
}
