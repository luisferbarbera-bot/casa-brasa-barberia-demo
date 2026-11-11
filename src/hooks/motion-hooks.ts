"use client";
/**
 * Motion hooks collected from the 3D training pieces (01–03). Copy what you need.
 * All respect prefers-reduced-motion and show the final state.
 */
import { useEffect, useRef, useState } from "react";

/** True when the user asked the OS for less motion. Live-updates. (from 02 web3-bento) */
export function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const u = () => setR(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);
  return r;
}

/** True once the element scrolls into view (fires once). Play entrances where people look. (LumoBento) */
export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/** Counts 0 → target once `run` is true (ease-out quart). (02 / LumoBento) */
export function useCountUp(target: number, run: boolean, reduced: boolean, duration = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (reduced) return setV(target);
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / duration));
      setV(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, reduced, duration]);
  return v;
}

/**
 * Tweens from the CURRENT value to each new target (live numbers that keep changing). (03)
 * Fix kept: clamp t to [0,1]; rAF timestamps can precede `start` and overshoot wildly.
 */
export function useAnimatedNumber(target: number, duration = 700) {
  const [value, setValue] = useState(target);
  const current = useRef(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current.current = target; setValue(target); return;
    }
    const from = current.current;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / duration, 0), 1);
      current.current = from + (target - from) * (1 - Math.pow(1 - t, 3));
      setValue(current.current);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

/** Smooth SVG path through points (cubic, mid-x control points). Charts. (02, 03) */
export function smoothPath(pts: ReadonlyArray<readonly [number, number]>) {
  return pts.map(([x, y], i) => {
    if (i === 0) return `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    const [px, py] = pts[i - 1];
    const m = (px + x) / 2;
    return `C ${m.toFixed(1)} ${py.toFixed(1)}, ${m.toFixed(1)} ${y.toFixed(1)}, ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

/** Shared easings. */
export const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";       // entrances, charts
export const EASE_SPRING = "cubic-bezier(0.34, 1.3, 0.64, 1)";  // card swaps, playful pops
