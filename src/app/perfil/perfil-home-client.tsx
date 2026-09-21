"use client";

import { CalendarDays, Clock3, Percent, UserCog } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { isLikelyWhatsappNumber } from "@/lib/booking/salon-availability";
import { event as gaEvent, GA_EVENT_CUSTOMER_SESSION_START } from "@/lib/gtag";
import { usePerfilSession } from "@/components/perfil/perfil-session-provider";

export function PerfilHomeClient() {
  const { me, welcomeName, logout, onLoginSuccess } = usePerfilSession();

  const [phoneInput, setPhoneInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!isLikelyWhatsappNumber(phoneInput)) {
      setError("Ingresá un WhatsApp válido (10 a 15 dígitos).");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/me/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ phone: phoneInput.trim(), source: "perfil" }),
      });
      const raw = await res.text();
      let data: { error?: string } = {};
      if (raw) {
        try {
          data = JSON.parse(raw) as { error?: string };
        } catch {
          setError(
            `El servidor respondió de forma inesperada (${res.status}). Si usás el sitio publicado, revisá que las variables de entorno estén cargadas y redeployá.`,
          );
          return;
        }
      }
      if (!res.ok) {
        setError(data.error ?? "No se pudo iniciar sesión.");
        return;
      }
      gaEvent(GA_EVENT_CUSTOMER_SESSION_START, { login_source: "perfil" });
      setPhoneInput("");
      await onLoginSuccess();
    } catch {
      setError("Sin conexión. Probá de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    try {
      await logout();
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-xl px-5 pt-8 pb-28">
      <header className="mb-5 text-center">
        <h1 className="font-heading text-[40px] leading-none font-bold tracking-tight">Perfil</h1>
        {me === "authed" ? (
          <div className="mt-3 space-y-1.5">
            <p className="text-[17px] leading-snug font-medium text-gray-800">
              {welcomeName ? (
                <>
                  Hola, <span className="text-[#B88E2F]">{welcomeName}</span>
                </>
              ) : (
                <span>Bienvenido/a</span>
              )}
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleLogout()}
              className="cursor-pointer text-[12px] text-gray-500 underline-offset-2 hover:underline disabled:opacity-50"
            >
              Cerrar sesión
            </button>
          </div>
        ) : me === "guest" ? (
          <p className="mt-2 text-[14px] text-gray-500">Iniciá sesión con tu WhatsApp para ver tus turnos.</p>
        ) : (
          <p className="mt-2 text-[14px] text-gray-400">Comprobando sesión…</p>
        )}
      </header>

      {me === "guest" ? (
        <section
          id="acceso"
          className="mb-4 rounded-[24px] border border-gray-100 bg-white px-4 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        >
          <p className="text-[11px] tracking-[0.14em] text-gray-500">Acceso</p>
          <form onSubmit={(e) => void handleLogin(e)} className="mt-3 space-y-3">
            <div>
              <label htmlFor="perfil-phone" className="text-[12px] text-gray-500">
                Mismo WhatsApp que usás al reservar
              </label>
              <input
                id="perfil-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+54 9 11 …"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-[15px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#B88E2F]/50"
              />
            </div>
            {error ? (
              <p role="alert" className="text-[12px] text-red-600">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={busy}
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-[#B88E2F] text-[15px] font-semibold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "…" : "Ver mis datos"}
            </button>
          </form>
        </section>
      ) : null}

      <section className="rounded-[24px] border border-gray-100 bg-white px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="divide-y divide-gray-100">
          <Link href="/perfil/mis-turnos" className="flex cursor-pointer items-center justify-between px-1 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-[#F5F5F5]">
                <CalendarDays className="h-4 w-4 text-[#B88E2F]" strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-[15px] font-medium text-gray-900">Mis turnos</p>
                <p className="mt-0.5 text-[12px] text-gray-500">Próximos y pasados</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">›</span>
          </Link>
          <Link
            href="/perfil/historial-tratamientos"
            className="flex cursor-pointer items-center justify-between px-1 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-[#F5F5F5]">
                <Clock3 className="h-4 w-4 text-[#B88E2F]" strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-[15px] font-medium text-gray-900">Historial de tratamientos</p>
                <p className="mt-0.5 text-[12px] text-gray-500">Sesiones realizadas</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">›</span>
          </Link>
          <Link href="/promociones" className="flex cursor-pointer items-center justify-between px-1 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-[#F5F5F5]">
                <Percent className="h-4 w-4 text-[#B88E2F]" strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-[15px] font-medium text-gray-900">Promociones</p>
                <p className="mt-0.5 text-[12px] text-gray-500">Beneficios para vos</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">›</span>
          </Link>
          <div className="flex items-center justify-between px-1 py-3 opacity-45">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-[#F5F5F5]">
                <UserCog className="h-4 w-4 text-gray-500" strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-[15px] font-medium text-gray-900">Datos personales</p>
                <p className="mt-0.5 text-[12px] text-gray-500">Próximamente</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">›</span>
          </div>
        </div>
      </section>

      {me === "guest" ? (
        <section className="mt-4 rounded-[24px] border border-gray-100 bg-[#F5F5F5] px-4 py-3">
          <p className="text-[12px] tracking-[0.18em] text-[#B88E2F] uppercase">Tip</p>
          <p className="mt-1.5 text-[14px] text-gray-700">
            Usá el mismo número de WhatsApp que al reservar en la web o en el salón. Nadie más puede ver tus turnos sin
            ese número.
          </p>
        </section>
      ) : null}
    </main>
  );
}
