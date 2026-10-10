"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ComponentProps, type MouseEvent } from "react";

const HEADER_GAP = 12;
let scrollTimer = 0;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector("header");
  const offset = (header?.getBoundingClientRect().height ?? 0) + HEADER_GAP;
  const top = Math.max(0, window.scrollY + el.getBoundingClientRect().top - offset);
  window.clearTimeout(scrollTimer);
  if (reducedMotion() || Math.abs(top - window.scrollY) < 2) {
    window.scrollTo(0, top);
    return;
  }
  const start = window.scrollY;
  const distance = top - start;
  const duration = Math.min(1000, Math.max(560, Math.abs(distance) * 0.42));
  const started = performance.now();
  const step = () => {
    const progress = Math.min(1, (performance.now() - started) / duration);
    const eased = 1 - (1 - progress) ** 3;
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) scrollTimer = window.setTimeout(step, 16);
  };
  scrollTimer = window.setTimeout(step, 16);
}

function hashId(href: ComponentProps<typeof Link>["href"]) {
  if (typeof href !== "string") return "";
  const mark = href.indexOf("#");
  return mark >= 0 ? href.slice(mark + 1) : "";
}

function hashPath(href: ComponentProps<typeof Link>["href"]) {
  if (typeof href !== "string") return "/";
  const path = href.split("#")[0];
  return path === "" ? "" : path;
}

export function SmoothSectionLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname() ?? "/";
  const id = hashId(href);
  const path = hashPath(href);

  return (
    <Link
      {...props}
      href={href}
      scroll={false}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        if (event.defaultPrevented || !id) return;
        const samePage = path === "" || path === pathname || (path === "/" && pathname === "/");
        if (!samePage) return;
        event.preventDefault();
        window.history.pushState(null, "", `${pathname}#${id}`);
        window.setTimeout(() => scrollToSection(id), 40);
      }}
    />
  );
}

export function useSmoothHashOnArrival(id: string) {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash !== `#${id}`) return;
    const timer = window.setTimeout(() => scrollToSection(id), 40);
    return () => window.clearTimeout(timer);
  }, [pathname, id]);
}
