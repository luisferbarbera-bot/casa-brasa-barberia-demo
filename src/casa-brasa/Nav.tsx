"use client";
/**
 * Sticky header (catalog 24a): transparent over the hero, blurred carbon after 8px of scroll, a brass
 * pill slides between links on hover/focus (motion layoutId). ES/EN segmented toggle. Mobile: disclosure.
 */
import * as React from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopy } from "./lang";
import type { Lang } from "./copy";

export function BrasaMark({ className }: { className?: string }) {
  // An ember inside a brass ring: the "brasa" of the name.
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 7c1.5 4 5.5 6 5.5 11a5.5 5.5 0 0 1-11 0c0-2.4 1.2-3.9 2.4-5 .2 1.8 1 2.8 2.1 3.3C14.6 13 15 10 16 7Z" fill="currentColor" />
    </svg>
  );
}

function LangToggle() {
  const { lang, setLang, t } = useCopy();
  return (
    <div role="radiogroup" aria-label={t.langLabel} className="relative flex rounded-full border border-white/12 bg-white/[0.04] p-1">
      {(["es", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={lang === l}
          onClick={() => setLang(l)}
          className="relative z-10 flex h-9 min-w-11 items-center justify-center rounded-full px-3 text-xs font-bold tracking-[0.14em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laton-claro"
        >
          {lang === l && (
            <motion.span layoutId="lang-pill" className="absolute inset-0 -z-10 rounded-full bg-laton" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
          )}
          <span className={lang === l ? "text-carbon" : "text-hueso/70"}>{l}</span>
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const { t } = useCopy();
  const [scrolled, setScrolled] = React.useState(false);
  const [hover, setHover] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  const links = [
    { href: "#servicios", label: t.nav.services },
    { href: "#ritual", label: t.nav.ritual },
    { href: "#barberos", label: t.nav.team },
    { href: "#trabajos", label: t.nav.gallery },
    { href: "#club", label: t.nav.club },
    { href: "#visita", label: t.nav.visit },
  ];

  return (
    <header
      className={cn(
        "sticky z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-white/8 bg-carbon/95 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
      )}
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="gutter mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 md:h-[72px]">
        <a href="#inicio" className="flex min-h-12 items-center gap-2.5 text-hueso focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laton-claro">
          <BrasaMark className="size-7 text-laton" />
          <span className="font-wide text-[15px] font-extrabold tracking-[0.18em] uppercase">
            Casa <span className="text-laton-claro">Brasa</span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block" onMouseLeave={() => setHover(null)}>
          <ul className="flex items-center">
            {links.map((l) => (
              <li key={l.href} className="relative">
                {hover === l.href && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <a
                  href={l.href}
                  onMouseEnter={() => setHover(l.href)}
                  onFocus={() => setHover(l.href)}
                  className="relative flex h-11 items-center px-4 text-sm font-medium text-hueso/75 transition-colors hover:text-hueso focus-visible:text-hueso focus-visible:outline-none"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LangToggle />
          <a
            href="#reserva"
            className="hidden h-11 items-center rounded-full bg-laton px-5 text-sm font-bold text-carbon transition-[background-color,transform] duration-200 hover:bg-laton-claro active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laton-claro md:flex"
          >
            {t.nav.book}
          </a>
          <button
            ref={btnRef}
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label="Menú"
            onClick={() => setOpen((o) => !o)}
            className="flex size-12 items-center justify-center rounded-full text-hueso focus-visible:outline-2 focus-visible:outline-laton-claro lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      <div id="menu-movil" hidden={!open} className="gutter border-t border-white/8 pb-6 lg:hidden">
        <ul className="flex flex-col pt-2">
          {[...links, { href: "#reserva", label: t.nav.book }].map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-white/6 text-lg font-medium text-hueso">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
