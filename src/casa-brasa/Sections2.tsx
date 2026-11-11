"use client";
/**
 * Club (23 pricing with timeline reveal, bone band) · Reviews · Booking (invented in catalog language:
 * live summary card over a Velaris band) · Visit + 25 FAQ · 27 curtain footer.
 */
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Copy, MapPin, Phone, Quote, Sparkles, Undo2 } from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import FAQAccordion from "@/components/ui/faq-accordion";
import { CinematicFooter } from "@/components/ui/motion-footer";
import Velaris from "@/components/ui/velaris";
import { cn, src } from "@/lib/utils";
import interior from "@/assets/img/interior.jpg";
import { useCopy } from "./lang";
import type { ServiceId } from "./copy";
import { BARBER_PHOTOS, EASE, Reveal, SectionHead } from "./Sections";

/* ── Club ────────────────────────────────────────────────── */
export function Club() {
  const { t } = useCopy();
  const c = t.club;
  const [yearly, setYearly] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);
  return (
    <section id="club" ref={ref} className="band-hueso relative py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(200,146,74,0.18),transparent_70%)]" />
      <div className="gutter relative mx-auto max-w-6xl">
        <TimelineContent timelineRef={ref} animationNum={0}>
          <SectionHead eyebrow={c.eyebrow} title={c.title} lede={c.lede} align="center" />
        </TimelineContent>

        <TimelineContent timelineRef={ref} animationNum={1} className="mt-10 flex flex-col items-center gap-3">
          <div role="radiogroup" aria-label={`${c.monthly} / ${c.yearly}`} className="relative flex rounded-full bg-[#141315] p-1.5">
            {[false, true].map((y) => (
              <button
                key={String(y)}
                type="button"
                role="radio"
                aria-checked={yearly === y}
                onClick={() => setYearly(y)}
                className="relative z-10 flex h-11 items-center gap-2 rounded-full px-6 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a5a1f]"
              >
                {yearly === y && <motion.span layoutId="club-pill" className="absolute inset-0 -z-10 rounded-full bg-laton" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className={yearly === y ? "text-carbon" : "text-hueso/75"}>{y ? c.yearly : c.monthly}</span>
                {y ? <span className={cn("rounded-full px-2 py-0.5 text-[11px]", yearly ? "bg-carbon/15 text-carbon" : "bg-laton/20 text-laton-claro")}>{c.save}</span> : null}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{c.note}</p>
        </TimelineContent>

        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
          {c.plans.map((p, i) => {
            const popular = i === 1;
            const price = p.yearly && yearly ? Math.round(p.price * 0.85) : p.price;
            return (
              <TimelineContent
                key={p.name}
                timelineRef={ref}
                animationNum={2 + i}
                className={cn(
                  "relative flex flex-col rounded-[28px] p-7 md:p-8",
                  popular ? "bg-[#141315] text-hueso shadow-[0_30px_80px_-30px_rgba(20,19,21,0.7)] md:-my-4 md:py-12" : "border border-border bg-card",
                )}
              >
                {popular ? (
                  <span className="eyebrow absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-laton px-4 py-1.5 text-[10px] whitespace-nowrap text-carbon">
                    <Sparkles className="size-3" aria-hidden />
                    {c.popular}
                  </span>
                ) : null}
                <h3 className={cn("font-wide text-xl font-extrabold uppercase", popular ? "text-laton-claro" : "text-foreground")}>{p.name}</h3>
                <p className={cn("mt-2 text-sm", popular ? "text-hueso/65" : "text-muted-foreground")}>{p.desc}</p>
                <p className="mt-7 flex items-baseline gap-1.5">
                  <span className="font-wide text-5xl font-extrabold tabular-nums">${price}</span>
                  <span className={cn("text-sm", popular ? "text-hueso/60" : "text-muted-foreground")}>{p.yearly ? c.per : c.perVisit}</span>
                </p>
                <p className={cn("mt-1 h-5 text-xs", popular ? "text-hueso/50" : "text-muted-foreground")}>{p.yearly && yearly ? c.billedYear : ""}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {p.perks.map((k) => (
                    <li key={k} className="flex items-start gap-3 text-sm">
                      <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full", popular ? "bg-laton text-carbon" : "bg-[#141315] text-hueso")}>
                        <Check className="size-3" aria-hidden />
                      </span>
                      {k}
                    </li>
                  ))}
                </ul>
                <a
                  href="#reserva"
                  className={cn(
                    "mt-8 flex min-h-12 items-center justify-center gap-2 rounded-full text-sm font-bold transition-[background-color,transform] duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2",
                    popular ? "bg-laton text-carbon hover:bg-laton-claro focus-visible:outline-laton-claro" : "bg-[#141315] text-hueso hover:bg-[#2a2729] focus-visible:outline-[#8a5a1f]",
                  )}
                >
                  {c.cta} {p.name}
                </a>
              </TimelineContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Reviews ─────────────────────────────────────────────── */
export function Reviews() {
  const { t } = useCopy();
  return (
    <section className="band-hueso relative border-t border-border pb-24 md:pb-32">
      <div className="gutter mx-auto max-w-6xl pt-20">
        <SectionHead eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {t.reviews.items.map((r, i) => (
            <motion.li
              key={r.detail}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="flex flex-col rounded-[28px] border border-border bg-card p-7"
            >
              <Quote className="size-7 text-[#8a5a1f]" aria-hidden />
              <blockquote className="mt-5 flex-1 font-serif text-[1.35rem] leading-snug text-foreground">{r.quote}</blockquote>
              <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                <span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-[#141315] font-bold text-laton-claro">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{r.name}</span>
                  <span className="block text-xs text-muted-foreground">{r.detail}</span>
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">{t.reviews.note}</p>
      </div>
    </section>
  );
}

/* ── Booking ─────────────────────────────────────────────── */
const SLOTS = ["9:00", "10:00", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30"];

/** Deterministic "taken" pattern so the demo looks lived-in without random flicker. */
function isTaken(day: number, slot: number, barber: number) {
  return (day * 7 + slot * 3 + barber * 5) % 5 === 0 || (day === 0 && slot < 3);
}

function to12h(s: string) {
  const [h, m] = s.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

function Chip({ on, disabled, taken, onClick, children, className }: { on: boolean; disabled?: boolean; taken?: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative min-h-12 rounded-2xl border px-4 text-left text-sm transition-[background-color,border-color,color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laton-claro active:scale-[0.98]",
        on ? "border-laton bg-laton/15 text-hueso" : "border-white/10 bg-white/[0.03] text-hueso/80 hover:border-white/25 hover:bg-white/[0.06]",
        disabled && "cursor-not-allowed border-white/5 bg-transparent text-hueso/25",
        taken && "line-through hover:border-white/5 hover:bg-transparent active:scale-100",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Booking({ barber, setBarber }: { barber: number; setBarber: (n: number) => void }) {
  const { t, lang } = useCopy();
  const b = t.booking;
  const [service, setService] = React.useState<ServiceId>("autor");
  const [day, setDay] = React.useState<number | null>(null);
  const [slot, setSlot] = React.useState<number | null>(null);
  const [done, setDone] = React.useState(false);

  // "Reservar" links on service cards preselect that service.
  React.useEffect(() => {
    const on = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-service]");
      if (a?.dataset.service) {
        setService(a.dataset.service as ServiceId);
        setDone(false);
      }
    };
    document.addEventListener("click", on);
    return () => document.removeEventListener("click", on);
  }, []);

  const days = React.useMemo(() => {
    const out: { label: string; num: string; idx: number }[] = [];
    const d = new Date();
    for (let i = 0; out.length < 6 && i < 10; i++) {
      const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
      if (x.getDay() === 0) continue; // closed Sundays
      out.push({
        idx: i,
        label: x.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { weekday: "short" }).replace(".", ""),
        num: String(x.getDate()),
      });
    }
    return out;
  }, [lang]);

  const svc = t.services.items.find((s) => s.id === service)!;
  const ready = day !== null && slot !== null;
  const dayObj = days.find((d) => d.idx === day);
  const timeLabel = slot !== null ? (lang === "es" ? SLOTS[slot] : to12h(SLOTS[slot])) : "—";
  const barberName = barber < 0 ? b.anyBarber : t.team.people[barber].name;

  return (
    <section id="reserva" aria-labelledby="reserva-t" className="relative">
      <Velaris bg="#0b0b0c" colors={["#c8924a", "#8a5a1f", "#2a1d10", "#141315"]} speed={0.6} grain={0.35} height="auto">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-carbon/55" />
        <div className="gutter relative mx-auto grid max-w-7xl gap-10 py-24 md:py-32 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div>
            <p className="eyebrow flex items-center gap-3 text-laton-claro">
              <span aria-hidden className="h-px w-8 bg-current" />
              {b.eyebrow}
            </p>
            <h2 id="reserva-t" className="font-wide mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1] font-extrabold tracking-[-0.025em] text-hueso uppercase">
              {b.title}
            </h2>
            <p className="mt-5 max-w-lg text-lg text-hueso/70">{b.lede}</p>

            <div className="mt-10 flex flex-col gap-8">
              <fieldset>
                <legend className="eyebrow mb-3 text-[11px] text-hueso/55">1 · {b.steps.service}</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {t.services.items.map((s) => (
                    <Chip key={s.id} on={service === s.id} onClick={() => { setService(s.id); setDone(false); }} className="py-2.5">
                      <span className="block font-semibold">{s.name}</span>
                      <span className="block text-xs text-hueso/50 tabular-nums">${s.price} · {s.mins} {t.services.min}</span>
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="eyebrow mb-3 text-[11px] text-hueso/55">2 · {b.steps.barber}</legend>
                <div className="flex flex-wrap gap-2">
                  <Chip on={barber < 0} onClick={() => { setBarber(-1); setDone(false); }}>{b.anyBarber}</Chip>
                  {t.team.people.map((p, i) => (
                    <Chip key={p.name} on={barber === i} onClick={() => { setBarber(i); setSlot(null); setDone(false); }} className="flex items-center gap-2.5 pl-1.5">
                      <img src={BARBER_PHOTOS[i]} alt="" className="size-9 rounded-xl object-cover" />
                      {p.name.split(" ")[0]}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="eyebrow mb-3 text-[11px] text-hueso/55">3 · {b.steps.day}</legend>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {days.map((d) => (
                    <Chip key={d.idx} on={day === d.idx} onClick={() => { setDay(d.idx); setSlot(null); setDone(false); }} className="py-2 text-center">
                      <span className="block text-xs text-hueso/55 capitalize">{d.label}</span>
                      <span className="font-wide block text-xl font-extrabold tabular-nums">{d.num}</span>
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <fieldset disabled={day === null} className="transition-opacity disabled:opacity-40">
                <legend className="eyebrow mb-3 text-[11px] text-hueso/55">
                  4 · {b.steps.time} <span className="ml-2 normal-case tracking-normal text-hueso/40">({b.note})</span>
                </legend>
                <div className="grid grid-cols-4 gap-2">
                  {SLOTS.map((s, i) => {
                    const taken = day !== null && isTaken(day, i, Math.max(0, barber));
                    return (
                      <Chip key={s} on={slot === i} disabled={day === null || taken} taken={taken} onClick={() => { setSlot(i); setDone(false); }} className="text-center tabular-nums">
                        {lang === "es" ? s : to12h(s)}
                        {taken ? <span className="sr-only"> {b.taken}</span> : null}
                      </Chip>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Live summary: a ticket that fills as you choose */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-carbon/75 p-7 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <div aria-hidden className="brass-line absolute inset-x-0 top-0 h-px" />
              <AnimatePresence mode="wait" initial={false}>
                {!done ? (
                  <motion.div key="sum" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: EASE }}>
                    <p className="eyebrow text-[11px] text-laton-claro">{b.summary}</p>
                    <motion.p key={svc.id} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="font-wide mt-3 text-2xl font-extrabold text-hueso uppercase">
                      {svc.name}
                    </motion.p>
                    <dl className="mt-6 divide-y divide-white/8 text-sm">
                      {[
                        [b.steps.barber, barberName],
                        [b.steps.day, dayObj ? `${dayObj.label} ${dayObj.num}` : "—"],
                        [b.steps.time, timeLabel],
                        [b.duration, `${svc.mins} ${t.services.min}`],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between py-3">
                          <dt className="text-hueso/55">{k}</dt>
                          <dd className={cn("font-semibold text-hueso tabular-nums", k === b.steps.day && "capitalize")}>{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-4 flex items-baseline justify-between border-t border-white/12 pt-5">
                      <span className="text-hueso/60">{b.total}</span>
                      <motion.span key={svc.price} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-wide text-4xl font-extrabold text-laton-claro tabular-nums">
                        ${svc.price}
                      </motion.span>
                    </div>
                    <button
                      type="button"
                      disabled={!ready}
                      onClick={() => setDone(true)}
                      className="mt-7 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-laton text-base font-bold text-carbon transition-[background-color,transform,opacity] duration-200 hover:bg-laton-claro active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laton-claro disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-laton"
                    >
                      {b.confirm}
                      <ArrowRight className="size-4" aria-hidden />
                    </button>
                    {!ready ? <p className="mt-3 text-center text-xs text-hueso/50">{b.pickAll}</p> : null}
                  </motion.div>
                ) : (
                  <motion.div key="done" role="status" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="py-4 text-center">
                    <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-laton text-carbon">
                      <Check className="size-8" aria-hidden />
                    </span>
                    <p className="font-wide mt-6 text-xl font-extrabold text-hueso uppercase">{b.doneTitle}</p>
                    <p className="mt-3 text-sm text-hueso/70">
                      {svc.name} · {barberName} · {dayObj ? `${dayObj.label} ${dayObj.num}` : ""} · {timeLabel}
                    </p>
                    <p className="mt-4 rounded-xl bg-white/[0.05] px-4 py-3 text-xs text-hueso/60">{b.doneBody}</p>
                    <button
                      type="button"
                      onClick={() => { setDone(false); setSlot(null); }}
                      className="mx-auto mt-6 flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-hueso hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-laton-claro"
                    >
                      <Undo2 className="size-4" aria-hidden />
                      {b.again}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Velaris>
    </section>
  );
}

/* ── Visit + FAQ ─────────────────────────────────────────── */
export function Visit() {
  const { t } = useCopy();
  const v = t.visit;
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(v.phone);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const el = document.getElementById("cb-phone");
      if (el) window.getSelection()?.selectAllChildren(el);
    }
  };
  return (
    <>
      <section id="visita" className="relative bg-carbon py-24 md:py-32">
        <div className="gutter mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative overflow-hidden rounded-[28px] ring-1 ring-white/10">
            <img src={src(interior)} alt={v.photoAlt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-carbon/70 px-4 py-2 text-sm text-hueso backdrop-blur">
              <MapPin className="size-4 text-laton" aria-hidden />
              {v.address}
            </p>
          </Reveal>
          <div>
            <SectionHead eyebrow={v.eyebrow} title={v.title} />
            <Reveal delay={0.1} className="mt-10">
              <h3 className="eyebrow text-[11px] text-hueso/55">{v.hoursTitle}</h3>
              <dl className="mt-3 divide-y divide-white/8 border-y border-white/8">
                {v.hours.map((h) => (
                  <div key={h.d} className="flex items-center justify-between py-4">
                    <dt className="text-hueso/80">{h.d}</dt>
                    <dd className={cn("font-semibold tabular-nums", h.h.match(/\d/) ? "text-hueso" : "text-hueso/40")}>{h.h}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 text-hueso/80">
                  <Phone className="size-4 text-laton" aria-hidden />
                  <span className="sr-only">{v.phoneLabel}: </span>
                  <span id="cb-phone" className="font-semibold tabular-nums select-all">{v.phone}</span>
                  <span className="text-xs text-hueso/45">({v.phoneLabel.toLowerCase()})</span>
                </span>
                <button
                  type="button"
                  onClick={copy}
                  className="flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-semibold text-hueso hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-laton-claro"
                >
                  {copied ? <Check className="size-4 text-laton" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                  <span aria-live="polite">{copied ? v.copied : v.copy}</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <div className="band-hueso [&_h2]:font-wide [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-[-0.025em] [&_summary]:text-lg">
        <FAQAccordion key={t.faq.title} title={t.faq.title} description={t.faq.description} data={t.faq.items} contact={null} layout="split" className="py-24 md:py-32 [&>div]:px-[max(20px,env(safe-area-inset-left,0px))]" />
      </div>
    </>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
export function Footer() {
  const { t } = useCopy();
  const f = t.footer;
  return (
    <div className="[&_.cf-giant]:font-wide [&_h2]:font-wide [&_h2]:uppercase">
      <CinematicFooter
        key={f.heading}
        giantText={f.giant}
        heading={f.heading}
        marquee={f.marquee}
        accent={["#c8924a", "#8a5a1f"]}
        primaryLinks={[{ label: f.book, href: "#reserva", icon: <ArrowRight /> }]}
        links={[
          { label: t.nav.services, href: "#servicios" },
          { label: t.nav.team, href: "#barberos" },
          { label: t.nav.club, href: "#club" },
          { label: t.nav.visit, href: "#visita" },
        ]}
        copyright={f.copyright}
        credit={f.credit}
        backToTopLabel={f.top}
      />
    </div>
  );
}
