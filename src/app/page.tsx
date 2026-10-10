import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { EventCountdown } from "@/components/shop/event-countdown";
import { ProductPhoto } from "@/components/shop/product-photo";
import { SmoothSectionLink } from "@/components/shop/smooth-section-link";
import { SpaceFooter } from "@/components/shop/space-footer";
import { Storefront } from "@/components/shop/storefront";
import { HOME_TESTIMONIALS } from "@/lib/home-testimonials-data";
import { FAIR_EVENTS, SAMPLE_NOTE, SKIN_KITS } from "@/lib/shop/skin-kits";
import { TREATMENT_CATEGORIES } from "@/lib/treatments/catalog";

const WHATSAPP_HREF = "https://wa.me/5492236164271";
const INSTAGRAM_HREF = "https://www.instagram.com/freyja.skinbarstudio/";
const MAPS_HREF = "https://maps.app.goo.gl/QHSzQD7idPPTGKNp9";
const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.0110040597237!2d-57.54634909999999!3d-38.0002038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dd00052cf08f%3A0xa348da825832e30a!2sEspacio%20Freyja%20%E2%80%93%20by%20Carla%20Bruni!5e0!3m2!1ses!2sar!4v1778698252936!5m2!1ses!2sar";

const SERVICE_BLURBS: Record<(typeof TREATMENT_CATEGORIES)[number], string> = {
  "Freyja · Low Cost":
    "Tratamientos simples, conscientes y bien indicados. No se trata de hacer menos, sino de hacer lo justo.",
  "Freyja · Premium":
    "Sesiones de mayor profundidad, siempre previo diagnóstico. No se indican por moda: se eligen cuando la piel lo necesita.",
  "Alta energía":
    "Tecnologías en planos profundos, indicadas por diagnóstico. Pueden integrar un plan facial o corporal.",
  Corporal: "Definición, drenaje y calidad del tejido, según indicación profesional.",
  Láser: "Depilación láser en sesiones de 15′ o 30′. El valor y el plan se definen en consulta.",
};

const FAQS = [
  {
    q: "Los frascos y los precios son el catálogo real?",
    a: "No. Es una vista de muestra: limpieza, sérum y crema, para recorrer la pared y el carrito. El catálogo de Carla se carga después.",
  },
  {
    q: "Puedo llevar el kit completo o una sola unidad?",
    a: "Las dos. En cada tipo de piel está el kit y, debajo, cada paso por separado. Más abajo hay un accesorio o un producto para sumar.",
  },
  {
    q: "Dónde está Carla en noviembre?",
    a: "Domingo 8 en Ogham Playa Grande y domingo 15 en Ogham Güemes, Olavarría. Lleva dermoconsultoría, productos y el analizador facial 3D Baumann.",
  },
  {
    q: "La ficha Tu piel guarda mis datos en un servidor?",
    a: "No. El alta, el carrito y lo que anotes quedan solo en este navegador. No hay pago ni Mercado Pago.",
  },
];

function SectionTitle({ id, title, aside }: { id?: string; title: string; aside?: ReactNode }) {
  return (
    <div id={id} className="mb-6 flex items-end justify-between gap-4">
      <h2 className="text-[14px] font-bold tracking-[0.26em] text-[#64675f] uppercase">{title}</h2>
      {aside}
    </div>
  );
}

export default function HomePage() {
  const voices = HOME_TESTIMONIALS.filter((item) => item.quote?.trim()).slice(0, 6);

  return (
    <div className="text-[#181713]">
      <div className="bg-white min-[921px]:grid min-[921px]:h-[calc(100dvh-86px)] min-[921px]:grid-cols-2">
        <div className="relative min-[921px]:h-full min-[921px]:overflow-hidden">
          <Image
            src="/boceto.jpeg"
            alt="Boceto del local de Freyja, con la pared de kits por tipo de piel"
            width={853}
            height={1280}
            priority
            className="h-auto w-full object-cover min-[921px]:absolute min-[921px]:inset-0 min-[921px]:h-full min-[921px]:w-full"
            sizes="(min-width: 921px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 text-center min-[921px]:bg-[#f6f4ee] min-[921px]:px-14">
          <p className="text-[clamp(36px,6vw,64px)] leading-[1.02] font-extrabold tracking-[0.08em] text-[#181713] uppercase min-[921px]:tracking-[0.1em]">
            Tu piel
            <br />
            tu equilibrio
          </p>
          <span className="mx-auto mt-4 block h-px w-12 bg-[#8C6844]" />
          <p className="mt-4 text-[12px] font-semibold tracking-[0.18em] text-[#3c4038] uppercase min-[921px]:text-[15px] min-[921px]:tracking-[0.22em]">
            Analiza · Personaliza · Transforma
          </p>
          <SmoothSectionLink
            href="#pared"
            className="mt-6 inline-flex rounded-full bg-[#8C6844] px-7 py-3.5 text-[12px] font-bold tracking-[0.12em] text-white uppercase transition hover:-translate-y-px"
          >
            Armar mi kit
          </SmoothSectionLink>
        </div>
      </div>

      <div className="bg-[#8C6844] px-2 py-2.5 min-[521px]:px-4 min-[521px]:py-4">
        <div className="mx-auto flex max-w-[1160px] flex-nowrap items-center justify-center gap-1 min-[521px]:gap-3">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" aria-hidden />
          <span className="shrink-0 text-[8px] font-bold tracking-[0.04em] whitespace-nowrap text-white uppercase min-[921px]:text-[16px] min-[921px]:tracking-[0.18em]">
            Domingo 8 de noviembre
          </span>
          <span className="shrink-0 text-[10px] text-white/50 min-[921px]:text-[16px]">·</span>
          <span className="shrink-0 text-[8px] font-medium tracking-[0.02em] whitespace-nowrap text-white/80 uppercase min-[921px]:text-[15px] min-[921px]:tracking-[0.16em]">
            Ogham Playa Grande
          </span>
          <span className="shrink-0 text-[10px] text-white/40 min-[921px]:text-[16px]">|</span>
          <EventCountdown />
        </div>
      </div>

      <header className="mx-auto grid w-[min(1160px,calc(100%-36px))] items-stretch gap-8 bg-white py-16 min-[921px]:grid-cols-[1.25fr_0.75fr] min-[921px]:py-24">
        <div>
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e4e4e0] bg-[#f7f7f5] px-3.5 py-2 text-[13px] text-[#3c4038]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#8C6844]" aria-hidden />
            <span className="truncate">Domingo 8 de noviembre · Ogham Playa Grande</span>
          </p>
          <h1 className="mt-5 max-w-[12ch] font-heading text-[clamp(48px,7vw,84px)] leading-[0.92] font-semibold tracking-[-0.03em]">
            Analiza.
            <br />
            Personaliza.
            <br />
            Transforma.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.75] text-[#3c4038]">
            El analizador facial 3D Baumann distingue 16 tipos. En la pared hay 8 kits, completos o por unidad.{" "}
            <b className="font-semibold text-[#181713]">Espacio Freyja, por Carla Bruni.</b>
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#8C6844] px-5 py-3.5 text-[13px] font-bold tracking-[0.08em] text-white uppercase transition hover:-translate-y-px"
            >
              Escribirle a Carla
            </a>
            <a
              href="#pared"
              className="inline-flex rounded-full border border-[#181713]/18 bg-white px-5 py-3.5 text-[13px] font-bold tracking-[0.08em] text-[#181713] uppercase transition hover:-translate-y-px hover:bg-[#f7f7f5]"
            >
              Ver los kits
            </a>
            <a
              href="#ferias"
              className="inline-flex rounded-full border border-[#181713]/18 bg-white px-5 py-3.5 text-[13px] font-bold tracking-[0.08em] text-[#181713] uppercase transition hover:-translate-y-px hover:bg-[#f7f7f5]"
            >
              Ver ferias
            </a>
          </div>
        </div>
        <aside className="flex flex-col rounded-[28px] border border-[#e4e4e0] bg-[#f7f7f5] p-6">
          <p className="font-heading text-[clamp(30px,2.8vw,40px)] leading-tight">16 tipos. 8 kits.</p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3c4038]">
            El analizador facial 3D Baumann distingue 16 tipos. En la pared se eligen estos 8 kits, completos o por
            unidad.
          </p>
          <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
            <div className="rounded-[18px] border border-[#e4e4e0] bg-white p-3">
              <p className="text-[11px] tracking-[0.16em] text-[#3c4038] uppercase">Enfoque</p>
              <p className="mt-1.5 text-[15px] font-semibold">Diagnóstico Baumann</p>
            </div>
            <div className="rounded-[18px] border border-[#e4e4e0] bg-white p-3">
              <p className="text-[11px] tracking-[0.16em] text-[#3c4038] uppercase">Kits</p>
              <p className="mt-1.5 text-[15px] font-semibold">Kit o por unidad</p>
            </div>
          </div>
        </aside>
      </header>

      <Storefront />

      <section className="border-t border-[#232420]/12">
        <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-14">
          <SectionTitle title="Visión y objetivos" />
          <div className="grid gap-3.5 min-[721px]:grid-cols-2">
            <article className="rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] p-5 shadow-[0_12px_32px_rgba(48,45,37,0.08)]">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#64675f] uppercase">Visión</p>
              <p className="mt-3 text-[14px] leading-[1.75] text-[#64675f]">
                Que entrar a la web se sienta como cruzar la puerta del local: la misma pared, los mismos ocho
                protocolos, el mismo analizador.
              </p>
              <p className="mt-5 text-[11px] font-semibold tracking-[0.16em] text-[#64675f] uppercase">Manifiesto</p>
              <p className="mt-3 text-[14px] leading-[1.75] text-[#64675f]">
                Belleza inteligente. Piel saludable. Cuidado inteligente, resultados reales. Protocolos Baumann: 16
                tipos de piel, un cuidado a medida.
              </p>
            </article>
            <article className="rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] p-5 shadow-[0_12px_32px_rgba(48,45,37,0.08)]">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#64675f] uppercase">Objetivos</p>
              <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-[#64675f]">
                <li>Recorrer la pared y armar el kit, completo o por unidad.</li>
                <li>Sumar un accesorio o un producto que entre en el ritual.</li>
                <li>Llegar a las dos ferias de noviembre con hora y lugar claros.</li>
              </ul>
              <div className="mt-4 grid gap-3 min-[521px]:grid-cols-2">
                <div className="rounded-[16px] border border-[#e4e4e0] bg-white p-3.5">
                  <p className="text-[11px] tracking-[0.16em] text-[#64675f] uppercase">Lema</p>
                  <p className="mt-1.5 font-semibold">Tu piel, tu equilibrio</p>
                </div>
                <div className="rounded-[16px] border border-[#e4e4e0] bg-white p-3.5">
                  <p className="text-[11px] tracking-[0.16em] text-[#64675f] uppercase">Método</p>
                  <p className="mt-1.5 font-semibold">Analiza, personaliza, transforma</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-[#232420]/12">
        <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-14">
          <SectionTitle title="Diferenciales" />
          <div className="grid gap-3.5 min-[721px]:grid-cols-2 min-[1020px]:grid-cols-4">
            {[
              ["Analizador", "Facial 3D Baumann. Dieciséis tipos, diagnóstico preciso."],
              ["Kits", "Ocho protocolos en la pared. El kit entero o cada paso."],
              ["Cabina", "Low Cost, Premium, alta energía, corporal y láser. Se indica, no se vende por moda."],
              ["Ferias", "Dos domingos en Ogham: consultoría, productos y analizador."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] p-5">
                <div className="mb-3 h-9 w-9 rounded-[14px] border border-[#232420]/8 bg-gradient-to-br from-[#8C6844]/25 to-[#E4D3BE]/40" />
                <h3 className="text-[12px] font-bold tracking-[0.16em] uppercase">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#64675f]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#232420]/12">
        <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-14">
          <SectionTitle title="Kits" />
          <p className="mb-5 max-w-[68ch] text-[14px] leading-relaxed text-[#64675f]">
            Ocho kits, como en el mueble. El analizador distingue 16 tipos; en la pared se compran estos protocolos.{" "}
            {SAMPLE_NOTE}
          </p>
          <div className="grid gap-3.5 min-[721px]:grid-cols-2">
            {SKIN_KITS.map((kit) => (
              <Link
                key={kit.id}
                href={`/piel/${kit.id}`}
                className="overflow-hidden rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] shadow-[0_12px_32px_rgba(48,45,37,0.06)]"
              >
                <ProductPhoto id={`kit-${kit.id}`} className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-[#8C6844] uppercase">{kit.name}</p>
                <h3 className="mt-1 font-heading text-[28px] leading-tight">{kit.kitName}</h3>
                <p className="mt-1 text-[15px] text-[#8C6844]">{kit.tagline}</p>
                <ul className="mt-3 space-y-1 text-[14px]">
                  {kit.checks.map((check) => (
                    <li key={check}>✓ {check}</li>
                  ))}
                </ul>
                <p className="mt-3 text-[13px] leading-relaxed text-[#64675f]">Necesita: {kit.needs}</p>
                <span className="mt-4 inline-flex rounded-full bg-[#dedcd2] px-4 py-2 text-[12px] font-bold tracking-[0.08em] text-[#8C6844] uppercase">
                  Ver el estante
                </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="voces" className="border-t border-[#232420]/12">
        <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-14">
          <SectionTitle title="Voces" />
          <div className="grid gap-3.5 min-[721px]:grid-cols-2">
            {voices.map((voice) => (
              <article key={voice.name} className="rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] p-5">
                <div className="flex items-center gap-3">
                  {voice.imageSrc ? (
                    <Image
                      src={voice.imageSrc}
                      alt=""
                      width={52}
                      height={52}
                      className="h-[52px] w-[52px] rounded-full object-cover"
                    />
                  ) : null}
                  <p className="text-[12px] font-semibold tracking-[0.1em] text-[#8C6844] uppercase">{voice.name}</p>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-[#181713]">“{voice.quote?.trim()}”</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-br from-[#8C6844] to-[#6B4E32] py-12 text-[#f0ede6]">
        <div className="mx-auto grid w-[min(1160px,calc(100%-36px))] grid-cols-2 gap-6 min-[721px]:grid-cols-4">
          {[
            ["8", "Kits en la pared"],
            ["16", "Tipos que distingue el analizador"],
            ["2", "Ferias en noviembre"],
            ["1", "Espacio en Mar del Plata"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="font-heading text-[clamp(40px,5vw,64px)] leading-none">{value}</p>
              <p className="mt-2 text-[11px] font-semibold tracking-[0.16em] text-[#E4D3BE]/80 uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <section id="ferias" className="border-t border-[#232420]/12">
        <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-14">
          <SectionTitle
            title="Ferias"
            aside={
              <Link href="/eventos" className="text-[12px] font-bold tracking-[0.08em] text-[#64675f] uppercase">
                Ver detalle
              </Link>
            }
          />
          <div className="grid gap-3.5 min-[721px]:grid-cols-2">
            {FAIR_EVENTS.map((event) => (
              <article key={event.id} className="rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] p-6">
                <p className="text-[12px] font-bold tracking-[0.14em] text-[#8C6844] uppercase">{event.dateLabel}</p>
                <h3 className="mt-2 font-heading text-[32px] leading-tight">{event.place}</h3>
                <p className="mt-1 text-[14px] text-[#64675f]">{event.area}</p>
                <p className="mt-3 text-[15px] leading-relaxed">{event.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="espacio" className="border-t border-[#232420]/12">
        <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-14">
          <SectionTitle title="El espacio" />
          <div className="grid items-stretch gap-6 min-[721px]:grid-cols-2">
            <div className="relative min-h-[280px] overflow-hidden rounded-[20px]">
              <Image src="/boceto.jpeg" alt="Boceto del local" fill className="object-cover object-top" sizes="(min-width:721px) 50vw, 100vw" />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#8C6844] uppercase">Mar del Plata</p>
              <h3 className="font-heading text-[clamp(26px,3vw,36px)] leading-tight">Santiago del Estero 1741, piso 2</h3>
              <p className="text-[14px] leading-relaxed text-[#64675f]">
                Espacio Freyja · by Carla Bruni. El mismo mostrador de la pared, ahora para recorrerlo desde acá.
              </p>
              <div className="relative mt-1 w-full overflow-hidden rounded-[16px] border border-[#232420]/10 pb-[56%]">
                <iframe
                  src={MAPS_EMBED_SRC}
                  title="Ubicación Espacio Freyja – by Carla Bruni, Mar del Plata"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold text-[#8C6844]">
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="border-t border-[#232420]/12">
        <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-14">
          <SectionTitle
            title="Servicios de cabina"
            aside={
              <Link href="/tratamientos" className="text-[12px] font-bold tracking-[0.08em] text-[#64675f] uppercase">
                Ver todos
              </Link>
            }
          />
          <div className="grid gap-3.5 min-[721px]:grid-cols-2">
            {TREATMENT_CATEGORIES.map((category) => (
              <article key={category} className="rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] p-5">
                <h3 className="font-heading text-[26px] leading-tight">{category}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#64675f]">{SERVICE_BLURBS[category]}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-center text-[13px] text-[#64675f]">Regla Freyja: la tecnología no se vende. Se indica.</p>
        </div>
      </section>

      <section id="faq" className="border-t border-[#232420]/12">
        <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-14">
          <SectionTitle title="FAQ" />
          <div className="space-y-2.5">
            {FAQS.map((item) => (
              <details key={item.q} className="rounded-[18px] border border-[#e4e4e0] bg-[#f7f7f5] px-4 py-3">
                <summary className="cursor-pointer text-[15px] font-semibold">{item.q}</summary>
                <p className="mt-2 text-[14px] leading-relaxed text-[#64675f]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="border-t border-[#232420]/12">
        <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-14">
          <SectionTitle title="Contacto" />
          <div className="grid gap-3 min-[721px]:grid-cols-3">
            <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] p-5">
              <p className="text-[11px] font-bold tracking-[0.16em] text-[#64675f] uppercase">Dirección</p>
              <p className="mt-2 text-[16px]">Santiago del Estero 1741, Mar del Plata · piso 2</p>
            </a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] p-5">
              <p className="text-[11px] font-bold tracking-[0.16em] text-[#64675f] uppercase">WhatsApp</p>
              <p className="mt-2 text-[16px]">223-6164271</p>
            </a>
            <a href={INSTAGRAM_HREF} target="_blank" rel="noopener noreferrer" className="rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] p-5">
              <p className="text-[11px] font-bold tracking-[0.16em] text-[#64675f] uppercase">Instagram</p>
              <p className="mt-2 text-[16px]">@freyja.skinbarstudio</p>
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-[#232420]/12">
        <div className="mx-auto w-[min(1160px,calc(100%-36px))] py-14">
          <SectionTitle title="Tu piel" />
          <article className="rounded-[22px] border border-[#e4e4e0] bg-[#f7f7f5] p-6 min-[721px]:flex min-[721px]:items-center min-[721px]:justify-between min-[721px]:gap-8">
            <div>
              <h3 className="font-heading text-[32px] leading-tight">Una ficha en este navegador</h3>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[#64675f]">
                Tipo de piel, última vez en cabina, próxima indicada y lo que sumes desde el carrito. Es una muestra:
                no entra a la agenda ni pide datos al servidor.
              </p>
            </div>
            <Link
              href="/cuenta"
              className="mt-5 inline-flex shrink-0 rounded-full bg-[#8C6844] px-5 py-3 text-[12px] font-bold tracking-[0.08em] text-white uppercase min-[721px]:mt-0"
            >
              Abrir mi ficha
            </Link>
          </article>
        </div>
      </section>

      <SpaceFooter />
    </div>
  );
}
