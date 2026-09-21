"use client";

import { usePathname } from "next/navigation";

import { BookingLightBottomNav } from "@/components/booking/booking-light-bottom-nav";

/** Nav clara en la app pública; oculta en el panel. */
export function PublicBottomNavGate() {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/panel-turnos")) {
    return null;
  }
  return <BookingLightBottomNav />;
}
