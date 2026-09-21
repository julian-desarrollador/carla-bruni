"use client";

import { Instagram, MapPin } from "lucide-react";
import Link from "next/link";

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

type ContactItem = {
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: string;
};

const WHATSAPP_PHONE_E164 = "5492236164271";
const WHATSAPP_DISPLAY = "223-6164271";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_PHONE_E164}`;
const INSTAGRAM_HREF = "https://www.instagram.com/freyja.skinbarstudio/";
const MAPS_HREF = "https://maps.app.goo.gl/QHSzQD7idPPTGKNp9";
const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.0110040597237!2d-57.54634909999999!3d-38.0002038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dd00052cf08f%3A0xa348da825832e30a!2sEspacio%20Freyja%20%E2%80%93%20by%20Carla%20Bruni!5e0!3m2!1ses!2sar!4v1778698252936!5m2!1ses!2sar";

const contactItems: ContactItem[] = [
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
    <div className="min-h-screen bg-white text-gray-900">
      <main className="mx-auto w-full max-w-xl px-5 pt-8 pb-28">
        <header className="mb-6 text-center">
          <h1 className="font-heading text-[40px] leading-none font-bold tracking-tight">Contacto</h1>
        </header>

        <section className="mb-4 rounded-[24px] border border-gray-100 bg-white px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="divide-y divide-gray-100">
            {contactItems.map((item) => {
              const Icon = item.icon;

              const content = (
                <div className="flex items-center justify-between px-1 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-[#F5F5F5]">
                      <Icon
                        className={`text-[#B88E2F] ${item.label === "WhatsApp" ? "h-5 w-5" : "h-4.5 w-4.5"}`}
                        strokeWidth={1.7}
                      />
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-gray-900">{item.label}</p>
                      <p className="mt-0.5 text-[13px] text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">›</span>
                </div>
              );

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </Link>
                );
              }

              return <div key={item.label}>{content}</div>;
            })}
          </div>
        </section>

        <section className="rounded-[24px] border border-gray-100 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <p className="text-[12px] tracking-[0.18em] text-[#B88E2F] uppercase">Ubicación en mapa</p>
          <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
            Espacio Freyja · Santiago del Estero 1741, Mar del Plata (piso 2).
          </p>
          <div className="relative mt-3 w-full overflow-hidden rounded-xl border border-gray-200 pb-[75%]">
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
            className="mt-3 flex h-12 w-full items-center justify-center rounded-full bg-[#B88E2F] text-[15px] font-semibold text-white shadow-md"
          >
            Abrir en Google Maps
          </Link>
        </section>
      </main>
    </div>
  );
}
