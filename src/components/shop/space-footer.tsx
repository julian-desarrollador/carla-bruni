import Link from "next/link";

export function SpaceFooter() {
  return (
    <footer className="border-t border-[#232420]/12">
      <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-12 text-center">
        <p className="font-heading text-[22px] text-[#181713]">Analiza · Personaliza · Transforma</p>
        <p className="mt-2 text-[11px] tracking-[0.26em] text-[#8C6844] uppercase">Viste tu piel. Siéntete única.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-[#64675f]">
          <Link href="/contacto" className="hover:text-[#181713]">
            Contacto
          </Link>
          <Link href="/#voces" className="hover:text-[#181713]">
            Testimonios
          </Link>
          <Link href="/tips-de-lumi" className="hover:text-[#181713]">
            Tips
          </Link>
          <Link href="/promociones" className="hover:text-[#181713]">
            Destacados
          </Link>
        </div>
        <p className="mt-4 text-[13px] text-[#80857c]">Santiago del Estero 1741, Mar del Plata · piso 2</p>
        <Link href="/mostrador" className="mt-4 inline-block text-[11px] tracking-[0.12em] text-[#8C6844] uppercase">
          Mostrador · vista de Carla
        </Link>
      </div>
    </footer>
  );
}
