import Link from "next/link";

import { FairSigns } from "@/components/shop/fair-signs";
import { SpaceFooter } from "@/components/shop/space-footer";

export default function EventosPage() {
  return (
    <div className="bg-white py-10">
      <FairSigns />
      <section className="mx-auto mt-8 w-full max-w-[1160px] px-5">
        <article className="rounded-[24px] border border-[#2324201f] bg-[#f7f6f1] px-5 py-5">
          <h2 className="font-heading text-[26px] text-[#181713]">Qué se hace en la feria</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-[#181713]">
            <li>Dermoconsultoría con Carla.</li>
            <li>Productos del mostrador, para ver y llevar.</li>
            <li>Analizador facial 3D Baumann: 16 tipos de piel, diagnóstico preciso.</li>
          </ul>
          <p className="mt-4 text-[14px] leading-relaxed text-[#64675f]">
            En el local, la pared muestra 8 kits para comprar. El analizador distingue los 16.
          </p>
          <Link href="/piel" className="mt-5 inline-flex text-[14px] text-[#8C6844] underline-offset-4 hover:underline">
            Ver los kits
          </Link>
        </article>
      </section>
      <SpaceFooter />
    </div>
  );
}
