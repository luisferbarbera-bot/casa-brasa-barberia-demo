# Casa Brasa — technical notes

## Architecture

```
src/
  app/                 Next.js App Router entry (layout loads fonts + styles, page renders <CasaBrasa/>)
  main.tsx             Vite entry: same page via createRoot (single-file build only)
  styles.css           Tailwind v4 + design tokens (colors, fonts, utilities)
  casa-brasa/          The page: copy (ES/EN), language context, sections
  components/ui/       Reusable visual pieces
  lib/utils.ts         cn() and src() (image import → URL for both Next and Vite)
  assets/img/          Photos (bundled, so the page has no external image requests)
scripts/postbuild-artifact.mjs   Moves <title> to the top of the single-file build
```

The whole page is a client component tree. There is no server code, so `output: "export"` produces a
plain static site.

## Design system

- **Palette** (`src/styles.css`): carbón `#0B0B0C`, carbón-2 `#141315`, latón `#C8924A`,
  latón claro `#E2B97A`, hueso `#EDE6DA`, humo `#9A9286`. One accent only (latón).
- **Bands**: dark carbon sections alternate with bone (`.band-hueso`) sections. `.band-hueso` re-defines
  the same CSS tokens (`--background`, `--foreground`, `--muted-foreground`…) so shared components
  (FAQ, pricing) adapt without props.
- **Type**: Archivo at width 118 (`font-wide` utility), weight 800, uppercase for headings; Instrument
  Serif italic for accents (rotating hero word, roles, quotes, marquee); Archivo normal width for body.
- **Utilities**: `gutter` (safe-area-aware side padding), `font-wide`, `eyebrow`.

## Sections and pieces

| Section | Piece | Notes |
|---|---|---|
| Hero | `Velaris` WebGL gradient + `Spotlight` + rotating word + `LiquidButton` + tilt portrait | Gradient pauses off-screen / hidden tab; reduced motion = still frame. Portrait tilts toward the pointer (motion springs), fine pointers only. |
| Nav | sticky header, motion `layoutId` hover pill, ES/EN radiogroup | Language stored in `localStorage` (wrapped in try/catch). |
| Marquee | CSS loop, duplicated row `aria-hidden` | Pauses on hover, off under reduced motion. |
| Services | `GlowCard` grid | Cursor-following border glow; "Reservar" links preselect the service in the booking widget (`data-service`). |
| Ritual | `FeaturesWithPanel` | Real buttons, arrow-key navigation, sticky photo panel, auto-advance until first interaction. |
| Work | `ContainerScroll` + CSS-columns masonry | Frame straightens from 20° on scroll. Photos keep their own aspect ratio (no crop). |
| Team | portrait cards | Photo fades into the card surface; "Book with X" preselects the barber. |
| Club | `TimelineContent` pricing, monthly/yearly toggle | Yearly = −15%, computed in the component. |
| Reviews | quote cards | Labeled as examples. |
| Booking | custom widget over a second `Velaris` | Service → barber → day (next 6 open days, Sundays closed) → time. Deterministic "taken" slots. Live summary ticket; confirming shows a demo confirmation and sends nothing. |
| Visit + FAQ | hours table, copy-phone button, `FAQAccordion` (native `<details name>`) | FAQ emits FAQPage JSON-LD. |
| Footer | `CinematicFooter` | Curtain reveal (clip-path + fixed), GSAP ScrollTrigger scrub, magnetic pills. |

## Accessibility and motion rules

- Touch targets ≥ 44–48px, visible focus rings in latón, icons are SVG (lucide).
- Every animation respects `prefers-reduced-motion` (final state shown).
- Rotating headline: screen readers get one static sentence (`sr-only`), animated words are `aria-hidden`.
- Entrance easing `cubic-bezier(0.22,1,0.36,1)`, staggers 60–90ms.

## Two builds

- `npm run build` → Next.js static export in `out/` (deploy this).
- `npm run build:artifact` → Vite + `vite-plugin-singlefile` → one self-contained HTML (`dist/casa-brasa.html`)
  with JS, CSS and photos inlined. Used for private share links where external images are blocked.
  Components avoid `next/*` imports so both builds share the same code; `src()` handles the different
  image import shapes (Next returns `{ src }`, Vite returns a string).

## Known limits

- Booking is a front-end demo; wire it to a real provider (Square, Calendly, Cal.com, etc.) for production.
- Phone/address are placeholders.
- No ESLint config is included; `npm run typecheck` + `npm run build` are the checks.
