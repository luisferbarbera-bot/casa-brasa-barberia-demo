"use client";
/**
 * Hero, composed from catalog pieces:
 * 14 Velaris living gradient (brass smoke palette) · 13 cursor spotlight · 19 rotating word ·
 * 06a liquid glass buttons · portrait in a glass frame that tilts toward the pointer (CSS 3D).
 * The tilt has a job: the photo is the proof of craft, and the depth pulls the eye to it.
 */
import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import Velaris from "@/components/ui/velaris";
import { Spotlight } from "@/components/ui/spotlight";
import { LiquidButton, LiquidDefs } from "@/components/ui/liquid-button";
import { src } from "@/lib/utils";
import heroImg from "@/assets/img/hero.jpg";
import { useCopy } from "./lang";

const SMOKE = { bg: "#0b0b0c", colors: ["#e2b97a", "#c8924a", "#3b2814", "#141315"] };

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = React.useState(0);
  const [run, setRun] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    setI(0);
  }, [words]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let on = true;
    const sync = () => setRun(on && !document.hidden && !mq.matches);
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  React.useEffect(() => {
    if (!run) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % words.length), 2400);
    return () => window.clearTimeout(id);
  }, [i, run, words.length]);

  return (
    <span ref={ref} aria-hidden className="relative block h-[1.08em] overflow-hidden">
      {words.map((w, n) => (
        <motion.span
          key={w}
          className="absolute left-0 top-0 font-serif font-normal italic tracking-normal text-laton-claro"
          initial={false}
          animate={n === i ? { y: "0%", opacity: 1 } : { y: n < i ? "-110%" : "110%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

function TiltPortrait() {
  const { t } = useCopy();
  const ref = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 18 });
  const sy = useSpring(my, { stiffness: 140, damping: 18 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["10%", "90%"]);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, rgba(255,236,200,0.18), transparent 60%)`);
  const chipX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const chipY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
    const section = el.closest("section") ?? el;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5)));
      my.set(Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5)));
    };
    const leave = () => {
      mx.set(0);
      my.set(0);
    };
    section.addEventListener("pointermove", move as EventListener);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointermove", move as EventListener);
      section.removeEventListener("pointerleave", leave);
    };
  }, [mx, my]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[460px] [perspective:1100px]">
      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="relative">
        {/* Glass frame */}
        <div className="relative rounded-[28px] border border-white/15 bg-white/[0.04] p-2.5 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
            <img src={src(heroImg)} alt={t.hero.photoAlt} className="h-full w-full scale-[1.06] object-cover object-[50%_35%]" fetchPriority="high" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0)_45%,rgba(11,11,12,0.75)_100%)]" />
            <motion.div aria-hidden className="absolute inset-0 mix-blend-screen" style={{ background: glare }} />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
              <p className="font-serif text-2xl leading-none text-hueso italic">{t.marquee[1]}</p>
              <p className="eyebrow text-[10px] text-hueso/70">N.º 01</p>
            </div>
          </div>
        </div>
        {/* Floating chip, lifted off the frame in Z */}
        <motion.div
          style={{ x: chipX, y: chipY, translateZ: 60 }}
          className="absolute -left-3 top-8 rounded-2xl border border-white/15 bg-carbon/70 px-4 py-3 shadow-2xl backdrop-blur-xl sm:-left-10"
        >
          <p className="eyebrow text-[10px] text-hueso/60">{t.hero.chipTitle}</p>
          <p className="mt-1 flex items-center gap-2 text-base font-bold text-hueso tabular-nums">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-laton opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-laton" />
            </span>
            {t.hero.chipValue}
          </p>
          <p className="text-[11px] text-hueso/45">{t.hero.chipNote}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { t } = useCopy();
  return (
    <section id="inicio" aria-label={t.hero.sentence} className="relative -mt-16 md:-mt-[72px]">
      <LiquidDefs />
      <Velaris bg={SMOKE.bg} colors={SMOKE.colors} speed={0.8} grain={0.45} height="auto" className="min-h-[100svh]">
        <Spotlight size={520} className="z-0" color="from-[#E2B97A]/30 via-[#C8924A]/12 to-transparent" />
        {/* Darken the left so the headline always reads over the moving smoke */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,12,0.82)_0%,rgba(11,11,12,0.45)_48%,rgba(11,11,12,0.15)_100%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-carbon" />

        <div className="gutter relative z-10 mx-auto grid max-w-7xl items-center gap-14 pt-32 pb-24 md:pt-40 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-32">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow flex items-center gap-3 text-laton-claro"
            >
              <span aria-hidden className="h-px w-10 bg-laton" />
              {t.hero.eyebrow}
            </motion.p>

            <h1 className="font-wide mt-7 text-[clamp(2.6rem,7.2vw,6.4rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-hueso uppercase">
              <span className="sr-only">{t.hero.sentence}</span>
              <motion.span
                aria-hidden
                className="block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.hero.prefix}
              </motion.span>
              <motion.span
                aria-hidden
                className="block normal-case text-[1.12em] [font-stretch:100%]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <RotatingWord words={t.hero.words} />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[34rem] text-lg leading-relaxed text-hueso/80 md:text-xl"
            >
              {t.hero.lede}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col gap-3 sm:flex-row [&_.lq-btn.amber]:bg-[linear-gradient(165deg,rgba(241,211,162,.96),rgba(200,146,74,.94)_55%,rgba(226,185,122,.96))] [&_.lq-btn.amber]:text-carbon [&_.lq-btn:focus-visible]:outline-laton-claro"
            >
              <LiquidButton href="#reserva" tone="amber">
                {t.hero.primary}
                <ArrowRight className="size-4" aria-hidden />
              </LiquidButton>
              <LiquidButton href="#servicios">{t.hero.secondary}</LiquidButton>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
            >
              {t.hero.facts.map((f) => (
                <div key={f.k} className="bg-carbon/70 px-4 py-3 backdrop-blur">
                  <dt className="text-[11px] tracking-[0.14em] text-hueso/55 uppercase">{f.k}</dt>
                  <dd className="mt-1 text-sm font-bold text-hueso tabular-nums">{f.v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltPortrait />
          </motion.div>
        </div>
      </Velaris>
    </section>
  );
}
