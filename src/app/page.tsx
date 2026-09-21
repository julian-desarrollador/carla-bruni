"use client";

import { BrandLogo } from "@/components/brand-logo";
import { HomeTestimonials } from "@/components/home-testimonials";
import { HOME_HERO_IMAGE_URL } from "@/lib/home-hero-image";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

let hasShownHomeSplash = false;

const SPLASH_MAX_MS = 900;
const SPLASH_MIN_VISIBLE_MS = 360;
const SPLASH_AFTER_LOAD_MS = 90;

const secondaryCtaClass =
  "flex h-[52px] items-center justify-center rounded-full border border-gray-200 bg-white/88 px-6 text-[15px] font-medium tracking-[0.14em] text-gray-900 shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur-[8px]";

function SplashScreen({ onLogoReady }: { onLogoReady: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex min-h-screen flex-col items-center justify-center bg-white text-gray-900">
      <div className="flex w-full max-w-md flex-col items-center px-6">
        <div className="mb-8 text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <BrandLogo
              size="splash"
              fetchPriority="high"
              decoding="sync"
              onLoad={onLogoReady}
              onError={onLogoReady}
            />
            <div className="text-center font-heading">
              <span className="block text-2xl font-medium leading-tight tracking-[0.06em]">By Carla Bruni</span>
              <span className="mt-1.5 block text-base font-medium tracking-[0.14em] text-gray-600">
                Dermocosmiatra
              </span>
            </div>
            <div className="text-xs tracking-[0.22em] text-[#B88E2F]">Espacio Freyja</div>
          </div>
        </div>

        <p className="max-w-xs text-center text-sm leading-relaxed text-gray-600">
          Cuidado facial y corporal con criterio profesional, en tonos serenos y tecnología indicada — no vendida.
        </p>
      </div>
    </div>
  );
}

function HomeContent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900">
      <div className="fixed top-0 right-0 left-0 z-0 h-[100svh] md:hidden">
        <Image
          src={HOME_HERO_IMAGE_URL}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover object-[center_35%] max-md:opacity-[0.55]"
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none fixed top-0 right-0 left-0 z-10 h-[100svh] md:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.78) 0%, rgba(250,247,240,0.7) 28%, rgba(255,255,255,0.62) 52%, rgba(250,247,240,0.74) 78%, rgba(255,255,255,0.88) 100%)",
        }}
      />

      <div
        aria-hidden
        className="fixed top-0 right-0 left-0 z-0 hidden h-[100svh] bg-white md:block"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 110% 65% at 50% -10%, rgba(184,142,47,0.12), transparent 48%), linear-gradient(to bottom, #fffaf2 0%, #ffffff 42%, #f5f5f5 100%)",
        }}
      />

      <main className="relative z-20 mx-auto min-h-screen w-full max-w-xl px-5 pt-14 pb-28 md:pt-20">
        <header className="flex justify-center">
          <div className="inline-flex max-w-full flex-col items-center gap-2.5 text-center">
            <BrandLogo size="header" />
            <div className="text-center font-heading text-gray-900">
              <span className="block text-[22px] font-medium leading-tight tracking-[0.06em]">By Carla Bruni</span>
              <span className="mt-0.5 block text-[15px] font-medium tracking-[0.14em] text-gray-600">
                Dermocosmiatra
              </span>
            </div>
            <div className="text-[11px] tracking-[0.22em] text-[#B88E2F]">Espacio Freyja</div>
          </div>
        </header>

        <div className="mt-12 space-y-4 md:mt-14">
          <section className="pb-1">
            <h1 className="sr-only">By Carla Bruni · Espacio Freyja</h1>
            <div className="mx-auto flex w-[84%] flex-col gap-3">
              <Link
                href="/turnos"
                className="flex h-[52px] items-center justify-center rounded-full bg-[#B88E2F] px-6 text-[16px] font-semibold tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(184,142,47,0.28)]"
              >
                Reservar turno
              </Link>
              <Link href="/tratamientos" className={secondaryCtaClass}>
                Tratamientos
              </Link>
              <Link href="/promociones" className={secondaryCtaClass}>
                Promociones
              </Link>
            </div>
          </section>

          <section className="mx-auto w-[84%] space-y-3">
            <Link href="/contacto" className={`${secondaryCtaClass} w-full`}>
              Contacto
            </Link>
          </section>

          <HomeTestimonials />

          <section className="mx-auto w-[84%]">
            <div className="mb-3 text-[10px] tracking-[0.24em] text-gray-500">PROMOCION DESTACADA DEL MES</div>
            <div className="rounded-[28px] border border-gray-100 bg-white/92 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-[8px]">
              <div className="text-[10px] tracking-[0.24em] text-[#B88E2F]">DESTACADO</div>
              <h2 className="mt-2 font-heading text-lg leading-tight text-gray-900">
                Consulta, análisis y primera piel
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
                Primer encuentro con diagnóstico, coach estético y experiencia Primera Piel (90′).
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <Link
                  href="/turnos?treatment=freyja-consulta-analisis-primera-piel"
                  className="flex h-10 items-center justify-center rounded-full bg-[#B88E2F] px-5 text-[12px] font-semibold tracking-[0.14em] text-white"
                >
                  Reservar ahora
                </Link>
                <span className="text-[10px] tracking-[0.08em] text-gray-500">Cupos limitados</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(!hasShownHomeSplash);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissedRef = useRef(false);
  const openedAtRef = useRef(0);

  const dismissSplash = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    if (maxTimerRef.current !== null) {
      clearTimeout(maxTimerRef.current);
      maxTimerRef.current = null;
    }
    hasShownHomeSplash = true;
    setShowSplash(false);
  }, []);

  useLayoutEffect(() => {
    if (hasShownHomeSplash || !showSplash) return;
    openedAtRef.current = Date.now();
  }, [showSplash]);

  useEffect(() => {
    if (hasShownHomeSplash) {
      setShowSplash(false);
      return;
    }
    if (!showSplash) return;
    maxTimerRef.current = setTimeout(dismissSplash, SPLASH_MAX_MS);
    return () => {
      if (maxTimerRef.current !== null) {
        clearTimeout(maxTimerRef.current);
        maxTimerRef.current = null;
      }
    };
  }, [showSplash, dismissSplash]);

  const handleSplashLogoReady = useCallback(() => {
    const elapsed = Date.now() - openedAtRef.current;
    const wait = Math.max(SPLASH_AFTER_LOAD_MS, SPLASH_MIN_VISIBLE_MS - elapsed);
    window.setTimeout(dismissSplash, wait);
  }, [dismissSplash]);

  if (showSplash) {
    return <SplashScreen onLogoReady={handleSplashLogoReady} />;
  }

  return <HomeContent />;
}
