"use client";

import { FormEvent, useState } from "react";

import { useShop } from "@/components/shop/shop-provider";
import { SpaceFooter } from "@/components/shop/space-footer";
import { findSkinKit, SKIN_KITS } from "@/lib/shop/skin-kits";

const CABIN_EXAMPLE = {
  last: "12 de septiembre · Freyja · Esencial",
  next: "En 30 a 45 días, según cómo responda la piel.",
};

export default function CuentaPage() {
  const { ready, account, openAccount, closeAccount } = useShop();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skinId, setSkinId] = useState(SKIN_KITS[0]?.id ?? "mixta");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Escribí tu nombre.");
      return;
    }
    if (!email.includes("@")) {
      setError("El correo tiene que incluir @.");
      return;
    }
    setError(null);
    openAccount({ name, email, skinId });
  }

  if (!ready) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <p className="text-[14px] text-[#64675f]">Abriendo tu ficha…</p>
      </div>
    );
  }

  if (!account) {
    return (
      <>
      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <p className="text-[11px] tracking-[0.2em] text-[#8C6844] uppercase">Cuenta de muestra</p>
        <h1 className="mt-2 font-heading text-[38px] leading-tight text-[#181713]">Tu piel</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#64675f]">
          El alta queda solo en este navegador. No entra a la agenda ni pide datos al servidor.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-[13px] text-[#64675f]">Nombre</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 h-12 w-full rounded-2xl border border-[#2324201f] bg-[#f7f6f1] px-4 text-[#181713] outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[13px] text-[#64675f]">Correo</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 h-12 w-full rounded-2xl border border-[#2324201f] bg-[#f7f6f1] px-4 text-[#181713] outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[13px] text-[#64675f]">Tipo de piel de la pared</span>
            <select
              value={skinId}
              onChange={(event) => setSkinId(event.target.value)}
              className="mt-1 h-12 w-full rounded-2xl border border-[#2324201f] bg-[#f7f6f1] px-4 text-[#181713] outline-none"
            >
              {SKIN_KITS.map((kit) => (
                <option key={kit.id} value={kit.id}>
                  {kit.name}
                </option>
              ))}
            </select>
          </label>
          {error ? <p className="text-[14px] text-[#8C6844]">{error}</p> : null}
          <button type="submit" className="flex h-12 w-full items-center justify-center rounded-full bg-[#8C6844] text-[14px] font-medium text-white">
            Entrar a mi ficha
          </button>
        </form>
      </div>
      <SpaceFooter />
    </>
    );
  }

  const kit = findSkinKit(account.skinId);

  return (
    <>
    <div className="mx-auto w-full max-w-3xl px-5 py-12">
      <p className="text-[11px] tracking-[0.2em] text-[#8C6844] uppercase">Tu piel</p>
      <h1 className="mt-2 font-heading text-[38px] leading-tight text-[#181713]">{account.name}</h1>
      <p className="mt-1 text-[14px] text-[#64675f]">{account.email}</p>

      <article className="mt-6 rounded-[24px] border border-[#2324201f] bg-[#f7f6f1] px-5 py-5">
        <p className="text-[12px] tracking-[0.14em] text-[#8C6844] uppercase">Ficha de muestra</p>
        <p className="mt-3 text-[15px] text-[#181713]">Tipo de piel: {kit?.name ?? "Sin tipo"}</p>
        <p className="mt-2 text-[15px] text-[#181713]">Última vez en cabina: {CABIN_EXAMPLE.last}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-[#181713]">Próxima indicada: {CABIN_EXAMPLE.next}</p>
        <p className="mt-3 text-[12px] leading-relaxed text-[#64675f]">
          La línea de cabina es un ejemplo para ver la idea. No sale de la agenda real.
        </p>
      </article>

      <section className="mt-6">
        <h2 className="font-heading text-[26px] text-[#181713]">Kits en esta ficha</h2>
        {account.purchases.length === 0 ? (
          <p className="mt-2 text-[14px] leading-relaxed text-[#64675f]">
            Todavía no sumaste nada desde el carrito. El botón “Sumar a mi piel” deja el registro acá.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {account.purchases.map((purchase, index) => (
              <li key={`${purchase.id}-${purchase.at}-${index}`} className="rounded-2xl border border-[#2324201f] bg-[#f7f6f1] px-4 py-3 text-[14px] text-[#181713]">
                {purchase.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      <button type="button" onClick={closeAccount} className="mt-8 text-[13px] text-[#64675f] underline">
        Cerrar esta ficha en el navegador
      </button>
    </div>
    <SpaceFooter />
    </>
  );
}
