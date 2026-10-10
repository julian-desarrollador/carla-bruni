import { Instagram, MapPin } from "lucide-react";
import Link from "next/link";

import { SpaceFooter } from "@/components/shop/space-footer";

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M12 3.1c-4.9 0-8.9 3.9-8.9 8.8 0 1.6.4 3.1 1.3 4.4L3 21l4.9-1.3c1.3.7 2.7 1.1 4.1 1.1 4.9 0 8.9-3.9 8.9-8.8C20.9 7 16.9 3.1 12 3.1zm0 15.7c-1.3 0-2.5-.3-3.6-.9l-.3-.2-2.9.8.8-2.8-.2-.3c-.8-1.1-1.2-2.4-1.2-3.8C4.6 8 7.9 4.8 12 4.8s7.4 3.2 7.4 7.2-3.3 7.2-7.4 7.2zm4-5.2c-.2-.1-1.1-.6-1.2-.6-.2-.1-.3-.1-.5.1-.1.2-.6.7-.7.8-.1.1-.3.2-.5.1-.2-.1-.8-.3-1.5-.9-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.4.1-.1.1-.2.2-.4.1-.1 0-.3 0-.4 0-.1-.5-1.2-.7-1.6-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.1.9 2.3.1.2 1.6 2.4 3.8 3.3.5.2.9.3 1.2.4.5.2 1 .2 1.3.1.4-.1 1.1-.4 1.3-.9.2-.5.2-1 .2-1.1-.1-.1-.2-.2-.4-.3z"
      />
    </svg>
  );
}

const WHATSAPP_PHONE_E164 = "5492236164271";
const WHATSAPP_DISPLAY = "223-6164271";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_PHONE_E164}`;
const INSTAGRAM_HREF = "https://www.instagram.com/freyja.skinbarstudio/";
const MAPS_HREF = "https://maps.app.goo.gl/QHSzQD7idPPTGKNp9";
const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.0110040597237!2d-57.54634909999999!3d-38.0002038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dd00052cf08f%3A0xa348da825832e30a!2sEspacio%20Freyja%20%E2%80%93%20by%20Carla%20Bruni!5e0!3m2!1ses!2sar!4v1778698252936!5m2!1ses!2sar";

const contactItems = [
  {
    label: "Dirección",
    description: "Santiago del Estero 1741, Mar del Plata · piso 2",
    icon: MapPin,
    href: MAPS_HREF,
  },
  {
    label: "WhatsApp",
    description: WHATSAPP_DISPLAY,
    icon: WhatsappIcon,
    href: WHATSAPP_HREF,
  },
  {
    label: "Instagram",
    description: "@freyja.skinbarstudio · DM",
    icon: Instagram,
    href: INSTAGRAM_HREF,
  },
];

export default function ContactoPage() {
  return (
    <div className="bg-white text-[#181713]">
      <main className="mx-auto w-full max-w-[1160px] px-5 py-10">
        <p className="text-center text-[11px] tracking-[0.2em] text-[#8C6844] uppercase">El local</p>
        <h1 className="mt-2 text-center font-heading text-[38px] leading-tight">Contacto</h1>

        <section className="mt-6 overflow-hidden rounded-[24px] border border-[#2324201f] bg-[#f7f6f1]">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-b border-[#2324201f] px-4 py-4 last:border-b-0"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dedcd2] text-[#8C6844]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium">{item.label}</span>
                    <span className="mt-0.5 block text-[13px] text-[#64675f]">{item.description}</span>
                  </span>
                </span>
                <span className="text-[#8C6844]">›</span>
              </Link>
            );
          })}
        </section>

        <section className="mt-4 rounded-[24px] border border-[#2324201f] bg-[#f7f6f1] p-4">
          <p className="text-[12px] tracking-[0.18em] text-[#8C6844] uppercase">Ubicación en mapa</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#64675f]">
            Espacio Freyja · Santiago del Estero 1741, Mar del Plata (piso 2).
          </p>
          <div className="relative mt-3 w-full overflow-hidden rounded-2xl border border-[#2324201f] pb-[75%]">
            <iframe
              src={MAPS_EMBED_SRC}
              title="Ubicación Espacio Freyja – by Carla Bruni, Mar del Plata"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <Link
            href={MAPS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex h-11 w-full items-center justify-center rounded-full border border-[#8C6844] text-[13px] tracking-[0.06em] text-[#8C6844]"
          >
            Abrir en Google Maps
          </Link>
        </section>
      </main>
      <SpaceFooter />
    </div>
  );
}
