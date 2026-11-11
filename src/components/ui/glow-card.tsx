"use client";
/**
 * GlowCard (from 03 tech-stack-bento): a card whose border glow, inner spotlight and
 * faint grid follow the pointer (touch too). Wrap ANY card grid with it: pricing,
 * services, features, team. Pass `accent` as an "r, g, b" string for brand colors.
 */
import { useState } from "react";
import type { MouseEvent, ReactNode, TouchEvent } from "react";

const cx = (...p: Array<string | false | null | undefined>) => p.filter(Boolean).join(" ");
const GRID_IMAGE =
  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)";
const ACCENTS = { indigo: "129, 140, 248", cyan: "34, 211, 238", emerald: "52, 211, 153", fuchsia: "232, 121, 249", amber: "251, 191, 36" } as const;
type Accent = keyof typeof ACCENTS;

export function GlowCard({
  accent,
  className = "",
  children,
}: {
  accent: Accent | (string & {});
  className?: string;
  children: ReactNode;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const rgb = ACCENTS[accent as Accent] ?? accent;

  // Cursor position, measured from the card's top-left corner
  const moveTo = (clientX: number, clientY: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    setPos({ x: clientX - rect.left, y: clientY - rect.top });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => moveTo(e.clientX, e.clientY, e.currentTarget);

  // Touch screens have no hover, so a finger dragging across the card lights it up too
  const handleTouch = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      moveTo(touch.clientX, touch.clientY, e.currentTarget);
      setActive(true);
    }
  };

  const gridMask = `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, black, transparent 75%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(false);
      }}
      className={cx("relative rounded-3xl", className)}
    >
      {/* Edge layer 1: dim border */}
      <div aria-hidden="true" className="absolute inset-0 rounded-3xl bg-white/10" />

      {/* Edge layer 2: bright border that follows the cursor */}
      <div
        aria-hidden="true"
        className={cx("absolute inset-0 rounded-3xl transition-opacity duration-500", active ? "opacity-100" : "opacity-0")}
        style={{
          background: `radial-gradient(240px circle at ${pos.x}px ${pos.y}px, rgba(${rgb}, 0.95), transparent 70%)`,
        }}
      />

      {/* Card face: spotlight and grid live inside it */}
      <div aria-hidden="true" className="absolute inset-px overflow-hidden rounded-[23px] bg-[#141315]">
        <div
          className={cx("absolute inset-0 transition-opacity duration-500", active ? "opacity-100" : "opacity-0")}
          style={{
            background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, rgba(${rgb}, 0.14), transparent 65%)`,
          }}
        />
        <div
          className={cx("absolute inset-0 transition-opacity duration-500", active ? "opacity-100" : "opacity-0")}
          style={{
            backgroundImage: GRID_IMAGE,
            backgroundSize: "26px 26px",
            maskImage: gridMask,
            WebkitMaskImage: gridMask,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">{children}</div>
    </div>
  );
}
