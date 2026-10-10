"use client";

import { Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BRAND_LOGO_SRC } from "@/components/brand-logo";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { SmoothSectionLink, useSmoothHashOnArrival } from "@/components/shop/smooth-section-link";
import { useShop } from "@/components/shop/shop-provider";

const links = [
  { href: "/#pared", label: "Kits" },
  { href: "/tratamientos", label: "Servicios" },
  { href: "/#ferias", label: "Ferias" },
  { href: "/cuenta", label: "Tu piel" },
  { href: "/#faq", label: "FAQ" },
] as const;

const linkClass =
  "rounded-[10px] border border-transparent px-1.5 py-2.5 text-[16px] font-semibold whitespace-nowrap text-[#181713] hover:border-[#181713]/18 hover:bg-[#f7f7f5] min-[1200px]:px-3";

function isAgendaPath(pathname: string) {
  return (
    pathname.startsWith("/panel-turnos") ||
    pathname.startsWith("/turnos") ||
    pathname.startsWith("/perfil")
  );
}

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  if (isAgendaPath(pathname)) return children;

  return (
    <>
      <SpaceNav />
      <div className="pt-[72px] min-[921px]:pt-[86px]">{children}</div>
    </>
  );
}

function CartToast({ toast }: { toast: { text: string; id: number } | null }) {
  const [shown, setShown] = useState<{ text: string; id: number } | null>(null);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (toast) {
      setShown(toast);
      setPhase("in");
      return;
    }
    setPhase("out");
  }, [toast]);

  useEffect(() => {
    if (phase !== "out" || !shown) return;
    const timer = window.setTimeout(() => setShown(null), 320);
    return () => window.clearTimeout(timer);
  }, [phase, shown]);

  if (!shown) return null;

  return (
    <div
      key={shown.id}
      role="status"
      className={`freyja-toast pointer-events-none absolute top-[calc(100%+10px)] right-0 z-20 flex w-max max-w-[min(18rem,calc(100vw-36px))] items-center gap-2.5 overflow-hidden rounded-2xl border border-[#e4e4e0] bg-white py-2.5 pr-3.5 pl-2.5 shadow-[0_16px_40px_rgba(24,23,19,0.12)] ${
        phase === "out" ? "is-leaving" : ""
      }`}
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget || phase !== "out") return;
        setShown(null);
      }}
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8C6844] text-white">
        <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-bold tracking-[0.16em] text-[#8C6844] uppercase">En el carrito</span>
        <span className="mt-0.5 block truncate font-heading text-[18px] leading-none text-[#181713]">{shown.text}</span>
      </span>
      <span className="freyja-toast-time absolute inset-x-0 bottom-0 h-0.5 bg-[#D0B888]" aria-hidden />
    </div>
  );
}

function SpaceNav() {
  const pathname = usePathname() ?? "";
  const { count, toast, openCart, closeCart } = useShop();
  useSmoothHashOnArrival("pared");
  const [open, setOpen] = useState(false);
  const [badgeKey, setBadgeKey] = useState(0);
  const badgeCount = useRef<number | null>(null);

  useEffect(() => {
    if (badgeCount.current === null || badgeCount.current === count) {
      badgeCount.current = count;
      return;
    }
    badgeCount.current = count;
    setBadgeKey((value) => value + 1);
  }, [count]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const narrow = window.matchMedia("(max-width: 920px)");
    if (!narrow.matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[999] border-b border-[#e4e4e0] ${
        open
          ? "flex h-dvh flex-col bg-white min-[921px]:h-auto min-[921px]:bg-white/90 min-[921px]:backdrop-blur-[14px]"
          : "bg-white/90 backdrop-blur-[14px]"
      }`}
    >
      <div className="mx-auto flex min-h-[72px] w-[min(1160px,calc(100%-36px))] items-center justify-between gap-3 min-[921px]:min-h-[86px]">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#232420]/12 min-[921px]:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => {
              closeCart();
              setOpen((value) => !value);
            }}
          >
            <span className="relative block h-3 w-[18px]" aria-hidden>
              <span className="absolute inset-x-0 top-0 h-0.5 rounded bg-[#1a1a18] shadow-[0_5px_0_#1a1a18]" />
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-[#1a1a18]" />
            </span>
          </button>
          <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label="Espacio Freyja">
            <img src={BRAND_LOGO_SRC} alt="" className="h-[58px] w-auto object-contain min-[921px]:h-[72px]" />
            <span className="flex min-w-0 flex-col items-center justify-center text-center leading-tight">
              <span className="block text-[11px] font-bold tracking-[0.1em] whitespace-nowrap text-[#181713] uppercase">
                Espacio Freyja
              </span>
              <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.08em] whitespace-nowrap text-[#64675f] uppercase">
                Carla Bruni
              </span>
            </span>
          </Link>
        </div>

        <nav aria-label="Navegación principal" className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 min-[921px]:flex min-[1200px]:gap-1.5">
          <Link href="/" className={linkClass}>
            Inicio
          </Link>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <SmoothSectionLink
            href="/#pared"
            className="hidden items-center rounded-full bg-[#8C6844] px-3.5 py-2.5 text-[11px] font-bold tracking-[0.08em] text-white uppercase min-[921px]:inline-flex"
          >
            Armar mi kit
          </SmoothSectionLink>
          <div className="relative">
            <CartToast toast={toast} />
            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#232420]/12"
              aria-label={count > 0 ? `Carrito, ${count}` : "Carrito"}
              onClick={() => {
                setOpen(false);
                openCart();
              }}
            >
              <ShoppingBag className="h-5 w-5 text-[#181713]" aria-hidden />
              {count > 0 ? (
                <span
                  key={badgeKey}
                  className={`absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[#8C6844] px-1 text-[10px] font-bold text-white ${
                    badgeKey > 0 ? "freyja-cart-count" : ""
                  }`}
                >
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div id="menu-movil" className="flex min-h-0 flex-1 items-center overflow-y-auto border-t border-[#e4e4e0] bg-white min-[921px]:hidden">
          <div className="mx-auto flex w-full flex-col items-center px-6 py-6 text-center">
            <Link href="/" className="w-full rounded-xl px-2 py-3.5 text-center text-[22px] text-[#181713]" onClick={() => setOpen(false)}>
              Inicio
            </Link>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-full rounded-xl px-2 py-3.5 text-center text-[22px] text-[#181713]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <SmoothSectionLink
              href="/#pared"
              className="w-full rounded-xl px-2 py-3.5 text-center text-[22px] text-[#181713]"
              onClick={() => setOpen(false)}
            >
              Armar mi kit
            </SmoothSectionLink>
            <Link
              href="/carrito"
              className="w-full rounded-xl px-2 py-3.5 text-center text-[22px] text-[#181713]"
              onClick={() => setOpen(false)}
            >
              Carrito{count > 0 ? ` · ${count}` : ""}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
    <CartDrawer />
    </>
  );
}
