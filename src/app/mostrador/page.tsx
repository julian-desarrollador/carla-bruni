import { SpaceFooter } from "@/components/shop/space-footer";

const CLIENTS = [
  {
    name: "Marina López",
    skin: "Piel mixta",
    last: "18 de septiembre · Freyja · Aqua",
    next: "Control en 4 semanas",
    buys: "Kit Piel Mixta (muestra)",
  },
  {
    name: "Lucía Fernández",
    skin: "Piel sensible",
    last: "2 de octubre · Freyja · Balance free",
    next: "Domingo 8 de noviembre · Ogham Playa Grande",
    buys: "Sérum de muestra",
  },
  {
    name: "Paula Díaz",
    skin: "Piel madura",
    last: "25 de agosto · Bioestimulación Hifu 12Dmax",
    next: "Seguimiento en noviembre",
    buys: "Kit Piel Madura (muestra)",
  },
];

export default function MostradorPage() {
  return (
    <>
    <div className="mx-auto w-full max-w-3xl px-5 py-12">
      <p className="text-[11px] tracking-[0.2em] text-[#8C6844] uppercase">Prototipo</p>
      <h1 className="mt-2 font-heading text-[38px] leading-tight text-[#181713]">Mostrador</h1>
      <p className="mt-3 rounded-2xl border border-[#2324201f] bg-[#f7f6f1] px-4 py-3 text-[14px] leading-relaxed text-[#64675f]">
        Vista de Carla, con tres clientas de ejemplo. No usa el ingreso del panel ni la agenda.
      </p>
      <ul className="mt-6 space-y-3">
        {CLIENTS.map((client) => (
          <li key={client.name} className="rounded-[24px] border border-[#2324201f] bg-[#f7f6f1] px-5 py-5">
            <h2 className="font-heading text-[26px] text-[#181713]">{client.name}</h2>
            <p className="mt-2 text-[15px] text-[#8C6844]">{client.skin}</p>
            <p className="mt-2 text-[14px] text-[#181713]">Última sesión: {client.last}</p>
            <p className="mt-1 text-[14px] text-[#181713]">Próxima: {client.next}</p>
            <p className="mt-1 text-[14px] text-[#181713]">Compras: {client.buys}</p>
          </li>
        ))}
      </ul>
    </div>
    <SpaceFooter />
    </>
  );
}
