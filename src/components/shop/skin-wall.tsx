import Link from "next/link";

import { ProductPhoto } from "@/components/shop/product-photo";
import { SKIN_KITS, type SkinKit } from "@/lib/shop/skin-kits";

export function SkinWall({ compact = false }: { compact?: boolean }) {
  return (
    <section id="pared" className="mx-auto w-full max-w-[1160px] px-5" aria-labelledby="pared-title">
      <p className="text-center text-[11px] tracking-[0.22em] text-[#8C6844] uppercase">Kits</p>
      <h2 id="pared-title" className="mt-2 text-center font-heading text-[34px] leading-tight text-[#181713]">
        Tu piel, tu equilibrio
      </h2>
      <p className="mx-auto mt-3 max-w-[1160px] text-center text-[15px] leading-relaxed text-[#64675f]">
        Ocho kits, como en el mueble. El analizador facial Baumann distingue 16 tipos; en la pared se eligen estos
        protocolos.
      </p>
      <div className="mt-6 space-y-3">
        {SKIN_KITS.map((kit) => (
          <SkinPlaque key={kit.id} kit={kit} compact={compact} />
        ))}
      </div>
    </section>
  );
}

function SkinPlaque({ kit, compact }: { kit: SkinKit; compact: boolean }) {
  return (
    <Link
      href={`/piel/${kit.id}`}
      className="block overflow-hidden rounded-[24px] border border-[#2324201f] bg-[#f7f6f1] shadow-[0_8px_24px_rgba(58,50,44,0.05)]"
    >
      <ProductPhoto id={`kit-${kit.id}`} className="aspect-[4/3] w-full object-cover" />
      <div className="px-5 py-5">
      <p className="text-[11px] tracking-[0.16em] text-[#8C6844] uppercase">{kit.name}</p>
      <h3 className="mt-1 font-heading text-[28px] leading-tight text-[#181713]">{kit.kitName}</h3>
      <p className="mt-1 text-[15px] text-[#8C6844]">{kit.tagline}</p>
      {compact ? null : (
        <ul className="mt-3 space-y-1 text-[14px] text-[#181713]">
          {kit.checks.map((check) => (
            <li key={check}>✓ {check}</li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-[13px] leading-relaxed text-[#64675f]">Necesita: {kit.needs}</p>
      <div className="mt-4 rounded-2xl bg-[#dedcd2] px-3 py-3 text-center text-[13px] tracking-[0.12em] text-[#8C6844] uppercase">
        Ver el estante
      </div>
      </div>
    </Link>
  );
}
