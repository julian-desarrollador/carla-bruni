"use client";

import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { panelCard, panelInput, panelPage, panelPrimaryBtn } from "@/components/panel/panel-ui";

export function PanelLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/panel-turnos/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "No se pudo ingresar.");
        return;
      }
      router.refresh();
    } catch {
      setError("Error de red. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`${panelPage} flex flex-col items-center justify-center px-4 pt-8 pb-20`}>
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B88E2F] shadow-md">
          <Sparkles className="h-7 w-7 text-white" strokeWidth={2} />
        </div>
        <h1 className="font-heading text-[28px] font-bold text-[#B88E2F]">Panel de turnos</h1>
        <p className="max-w-xs text-[14px] text-gray-600">
          Ingresá la contraseña para ver la agenda de Carla Bruni · Espacio Freyja.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`w-full max-w-sm ${panelCard} p-6`}>
        <label htmlFor="panel-password" className="text-[11px] tracking-[0.12em] text-gray-500">
          Contraseña
        </label>
        <input
          id="panel-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={panelInput}
        />
        {error ? (
          <p role="alert" className="mt-3 text-center text-[13px] text-red-600">
            {error}
          </p>
        ) : null}
        <button type="submit" disabled={loading || !password} className={`mt-5 ${panelPrimaryBtn}`}>
          {loading ? "Ingresando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
