"use client";

import { CalendarDays, Home as HomeIcon, Percent, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Inicio", Icon: HomeIcon, match: (p: string) => p === "/" },
  { href: "/tratamientos", label: "Tratamientos", Icon: Sparkles, match: (p: string) => p.startsWith("/tratamientos") },
  { href: "/turnos", label: "Turnos", Icon: CalendarDays, match: (p: string) => p.startsWith("/turnos") },
  { href: "/promociones", label: "Promos", Icon: Percent, match: (p: string) => p.startsWith("/promociones") },
  { href: "/perfil", label: "Perfil", Icon: User, match: (p: string) => p.startsWith("/perfil") },
] as const;

export function BookingLightBottomNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200/90 bg-white pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex h-16 max-w-xl items-center justify-between px-4">
        {nav.map(({ href, label, Icon, match }) => {
          const active = match(pathname);
          return (
            <Link key={href} href={href} className="flex flex-1 flex-col items-center justify-center">
              <span
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2.5 py-1.5 transition-colors ${
                  active ? "bg-[#B88E2F]/12" : ""
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${active ? "text-[#B88E2F]" : "text-gray-500"}`}
                  strokeWidth={active ? 2.2 : 1.75}
                />
                <span
                  className={`text-[9px] tracking-[0.12em] ${
                    active ? "font-semibold text-[#996515]" : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
