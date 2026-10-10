import { FAIR_EVENTS } from "@/lib/shop/skin-kits";

export function FairSigns() {
  return (
    <section className="mx-auto w-full max-w-[1160px] px-5" aria-labelledby="ferias-title">
      <p className="text-center text-[11px] tracking-[0.22em] text-[#8C6844] uppercase">Cartel del mostrador</p>
      <h2 id="ferias-title" className="mt-2 text-center font-heading text-[32px] leading-tight text-[#181713]">
        Dos domingos en Ogham
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {FAIR_EVENTS.map((event) => (
          <article
            key={event.id}
            className="rounded-[24px] border border-[#2324201f] bg-[#f7f6f1] px-5 py-5 shadow-[0_10px_30px_rgba(58,50,44,0.06)]"
          >
            <p className="text-[12px] tracking-[0.14em] text-[#8C6844] uppercase">{event.dateLabel}</p>
            <h3 className="mt-2 font-heading text-[26px] leading-tight text-[#181713]">{event.place}</h3>
            <p className="mt-1 text-[14px] text-[#64675f]">{event.area}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#181713]">{event.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
