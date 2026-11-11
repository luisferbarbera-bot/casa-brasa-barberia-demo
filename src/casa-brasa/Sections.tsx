"use client";
/**
 * Marquee (24b) · Services (03a GlowCard grid) · Ritual (18 features with sticky panel) ·
 * Work gallery (01 tilted-grid cylinder, used as a section) · Team (26-style portrait cards).
 */
import * as React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Clock, Scissors } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import FeaturesWithPanel from "@/components/ui/features-with-panel";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { cn, src } from "@/lib/utils";
import { useCopy } from "./lang";

import silla from "@/assets/img/silla.jpg";
import peine from "@/assets/img/peine.jpg";
import barba from "@/assets/img/barba.jpg";
import navaja from "@/assets/img/navaja.jpg";
import productos from "@/assets/img/productos.jpg";
import g1 from "@/assets/img/g1.jpg";
import g2 from "@/assets/img/g2.jpg";
import g3 from "@/assets/img/g3.jpg";
import g4 from "@/assets/img/g4.jpg";
import g5 from "@/assets/img/g5.jpg";
import g6 from "@/assets/img/g6.jpg";
import g7 from "@/assets/img/g7.jpg";
import g9 from "@/assets/img/g9.jpg";
import bTatuaje from "@/assets/img/b-tatuaje.jpg";
import bSueter from "@/assets/img/b-sueter.jpg";
import bRisa from "@/assets/img/b-risa.jpg";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const BARBER_PHOTOS = [bTatuaje, bSueter, bRisa].map(src);

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  note,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  note?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow flex items-center gap-3 text-primary", align === "center" && "justify-center")}>
        <span aria-hidden className="h-px w-8 bg-current" />
        {eyebrow}
      </p>
      <h2 className="font-wide mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1] font-extrabold tracking-[-0.025em] uppercase">{title}</h2>
      {lede ? <p className={cn("mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground", align === "center" && "mx-auto")}>{lede}</p> : null}
      {note ? (
        <p className={cn("mt-4 inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground")}>{note}</p>
      ) : null}
    </Reveal>
  );
}

/* ── Marquee ─────────────────────────────────────────────── */
export function Marquee() {
  const { t } = useCopy();
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {t.marquee.map((m) => (
        <span key={m} className="flex items-center">
          <span className="px-8 font-serif text-2xl whitespace-nowrap text-hueso/85 italic md:text-3xl">{m}</span>
          <Scissors aria-hidden className="size-4 -rotate-90 text-laton" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="cb-marquee-wrap relative overflow-hidden border-y border-white/8 bg-carbon py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="cb-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ── Services ────────────────────────────────────────────── */
export function Services() {
  const { t } = useCopy();
  const s = t.services;
  return (
    <section id="servicios" className="relative bg-carbon py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(60%_60%_at_80%_0%,rgba(200,146,74,0.12),transparent_70%)]" />
      <div className="gutter relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead eyebrow={s.eyebrow} title={s.title} lede={s.lede} />
          <Reveal delay={0.1}>
            <p className="inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{s.note}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {s.items.map((it, i) => {
            const featured = i === 0;
            return (
              <motion.li
                key={it.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                className={cn(featured && "md:col-span-2 lg:col-span-1 lg:row-span-2", i === s.items.length - 1 && "md:col-span-2 lg:col-span-2")}
              >
                <GlowCard accent="200, 146, 74" className="h-full">
                  <div className={cn("flex h-full flex-col", featured && "lg:justify-between")}>
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        {it.tag ? (
                          <span className="eyebrow rounded-full bg-laton/15 px-3 py-1.5 text-[10px] text-laton-claro">{it.tag}</span>
                        ) : (
                          <span />
                        )}
                        <span className="flex items-center gap-1.5 text-xs text-hueso/55 tabular-nums">
                          <Clock className="size-3.5" aria-hidden />
                          {it.mins} {s.min}
                        </span>
                      </div>
                      <h3 className={cn("font-wide mt-6 font-extrabold tracking-[-0.01em] text-hueso uppercase", featured ? "text-3xl lg:text-4xl" : "text-xl")}>
                        {it.name}
                      </h3>
                      <p className={cn("mt-3 leading-relaxed text-hueso/65", featured ? "text-base lg:text-lg" : "text-sm")}>{it.desc}</p>
                    </div>
                    {featured ? (
                      <div aria-hidden className="relative my-8 hidden h-40 overflow-hidden rounded-2xl lg:block">
                        <img src={src(navaja)} alt="" className="h-full w-full object-cover opacity-80 grayscale-[30%]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141315] to-transparent" />
                      </div>
                    ) : null}
                    <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/8 pt-5">
                      <p className="font-wide text-3xl font-extrabold text-laton-claro tabular-nums">${it.price}</p>
                      <a
                        href="#reserva"
                        data-service={it.id}
                        className="group flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-hueso/80 transition-colors hover:text-hueso focus-visible:outline-2 focus-visible:outline-laton-claro"
                      >
                        {s.book}
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                      </a>
                    </div>
                  </div>
                </GlowCard>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ── Ritual ──────────────────────────────────────────────── */
export function Ritual() {
  const { t } = useCopy();
  const imgs = [silla, peine, barba, navaja, productos].map(src);
  const items = t.ritual.steps.map((s, i) => ({ ...s, content: imgs[i], type: "image" as const, alt: t.ritual.alts[i] }));
  return (
    <div
      id="ritual"
      className="relative bg-carbon-2 [&_h2]:font-wide [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-[-0.025em] [&_li]:ring-0 [&_li[class*=ring-foreground]]:bg-white/[0.04] [&_li[class*=ring-foreground]]:ring-1 [&_li[class*=ring-foreground]]:ring-laton/50 [&_.bg-foreground]:bg-laton [&_.bg-foreground]:text-carbon [&_[data-slot=card]]:rounded-3xl [&_[data-slot=card]]:ring-white/10 [&_li_.text-sm.font-medium]:text-base [&_li_.text-sm.font-medium]:font-semibold"
    >
      <div className="gutter mx-auto max-w-7xl pt-24 md:pt-32">
        <p className="eyebrow flex items-center gap-3 text-laton-claro">
          <span aria-hidden className="h-px w-8 bg-current" />
          {t.ritual.eyebrow}
        </p>
      </div>
      <FeaturesWithPanel key={t.ritual.title} heading={t.ritual.title} items={items} autoAdvance={4200} className="[&_h2]:text-[clamp(2rem,4vw,3.4rem)] [&_h2]:leading-[1] pt-8 pb-24 md:pb-32 [&>div]:max-w-7xl [&>div]:px-[max(20px,env(safe-area-inset-left,0px))]" />
    </div>
  );
}

/* ── Gallery ─────────────────────────────────────────────
 * 12 Container scroll: a dark bezel that straightens from 20° as you scroll. Inside, the work shown
 * as a masonry of whole photos at their own aspect ratio (nothing cropped).
 */
const WORK = [g4, g1, g3, g6, g7, g2, g9, g5];

export function Gallery() {
  const { t } = useCopy();
  return (
    <section id="trabajos" aria-labelledby="trabajos-t" className="relative overflow-hidden bg-carbon">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 h-[600px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(200,146,74,0.10),transparent_70%)]" />
      <ContainerScroll
        frameClassName="h-auto border-[3px] border-[#3a3129] bg-[#141315] md:h-auto md:p-3"
        titleComponent={
          <div className="gutter">
            <p className="eyebrow flex items-center justify-center gap-3 text-laton-claro">
              <span aria-hidden className="h-px w-8 bg-current" />
              {t.gallery.eyebrow}
              <span aria-hidden className="h-px w-8 bg-current" />
            </p>
            <h2 id="trabajos-t" className="font-wide mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] leading-[1] font-extrabold tracking-[-0.025em] text-hueso uppercase">
              {t.gallery.title}
            </h2>
            <p className="mx-auto mt-4 mb-20 max-w-md text-hueso/60 md:mb-24">{t.gallery.lede}</p>
          </div>
        }
      >
        <div className="columns-2 gap-2 p-2 md:columns-4 md:gap-3 md:p-3">
          {WORK.map((m, i) => (
            <img
              key={i}
              src={src(m)}
              alt=""
              loading="lazy"
              className="mb-2 block h-auto w-full break-inside-avoid rounded-xl transition-[filter] duration-500 hover:brightness-110 md:mb-3"
            />
          ))}
        </div>
      </ContainerScroll>
    </section>
  );
}

/* ── Team ────────────────────────────────────────────────── */
export function Team({ onPick }: { onPick: (i: number) => void }) {
  const { t } = useCopy();
  return (
    <section id="barberos" className="relative bg-carbon py-24 md:py-32">
      <div className="gutter mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead eyebrow={t.team.eyebrow} title={t.team.title} />
          <Reveal delay={0.1}>
            <p className="inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{t.team.note}</p>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {t.team.people.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
              className="group relative overflow-hidden rounded-3xl bg-carbon-2 ring-1 ring-white/10"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={BARBER_PHOTOS[i]}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[35%] transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                {/* Photo fades into the card's own surface color */}
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,21,0)_40%,rgba(20,19,21,0.6)_70%,#141315_100%)]" />
                <span className="eyebrow absolute top-4 left-4 rounded-full bg-carbon/70 px-3 py-1.5 text-[10px] text-hueso/80 backdrop-blur">{p.years}</span>
              </div>
              <div className="relative -mt-24 px-6 pb-6">
                <p className="font-serif text-lg text-laton-claro italic">{p.role}</p>
                <h3 className="font-wide mt-1 text-2xl font-extrabold tracking-[-0.01em] text-hueso uppercase">{p.name}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.skills.map((s) => (
                    <li key={s} className="rounded-full border border-white/12 px-3 py-1 text-xs text-hueso/70">
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href="#reserva"
                  onClick={() => onPick(i)}
                  className="mt-6 flex min-h-12 items-center justify-between rounded-2xl border border-white/10 px-4 text-sm font-semibold text-hueso transition-colors hover:border-laton/60 hover:bg-laton/10 focus-visible:outline-2 focus-visible:outline-laton-claro"
                >
                  {t.team.pick} {p.name.split(" ")[0]}
                  <ArrowUpRight className="size-4 text-laton" aria-hidden />
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
