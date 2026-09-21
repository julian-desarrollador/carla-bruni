"use client";

import { useEffect } from "react";

/** El layout raíz es oscuro; en /turnos el viewport tiene que quedar blanco (también en overscroll). */
export function BookingLightPageBackground() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.background;
    const prevBody = body.style.background;
    html.style.background = "#ffffff";
    body.style.background = "#ffffff";
    return () => {
      html.style.background = prevHtml;
      body.style.background = prevBody;
    };
  }, []);

  return null;
}
