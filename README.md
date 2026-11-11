# Casa Brasa — Barbería de autor (demo)

Premium, bilingual (ES/EN) one-page website for a **fictional** barbershop, built by Lumo HQ as a portfolio demo.
Prices, team, reviews, phone and address are examples and are labeled as such on screen.

- Stack: **Next.js 15 (App Router, static export) · React 19 · Tailwind CSS v4 · motion · GSAP · lucide-react**
- No backend, no environment variables, no API keys.
- Output: a fully static site (`out/`) that runs on Vercel, Netlify or any static host.

## Requirements

- Node.js 20 (see `.nvmrc`; 18.18+ works)
- npm 10+

## Install and run

```bash
npm ci            # or: npm install
npm run dev       # http://localhost:3124
```

## Build

```bash
npm run typecheck # TypeScript check
npm run build     # static site in ./out
npx serve out     # optional: preview the static build locally
```

Optional single-file version (everything inlined in one HTML, used for private share links):

```bash
npm run build:artifact   # writes dist/casa-brasa.html
```

## Deploy

**Vercel**: import the repository. Framework preset "Next.js" is detected; no settings or env vars needed.

**Netlify**: import the repository. `netlify.toml` already sets `npm run build` and publish dir `out`.

**Any static host** (Cloudflare Pages, GitHub Pages, S3…): run `npm run build` and upload `out/`.

## Where to change things

| What | File |
|---|---|
| All texts, ES and EN (services, prices, team, FAQ…) | `src/casa-brasa/copy.ts` |
| Colors, fonts, design tokens | `src/styles.css` (`@theme` and `:root`) |
| Hero (living gradient, rotating word, tilting portrait) | `src/casa-brasa/Hero.tsx` |
| Nav + ES/EN toggle | `src/casa-brasa/Nav.tsx` |
| Marquee, Services, Ritual, Work gallery, Team | `src/casa-brasa/Sections.tsx` |
| Club pricing, Reviews, Booking, Visit + FAQ, Footer | `src/casa-brasa/Sections2.tsx` |
| Section order | `src/casa-brasa/CasaBrasa.tsx` |
| Photos | `src/assets/img/` (see `CREDITS.md`) |
| Reusable UI pieces | `src/components/ui/` |

To turn it into a real client site: replace the copy in `copy.ts`, swap photos in `src/assets/img/`,
remove the demo bar (`DemoBar` in `CasaBrasa.tsx`) and connect the booking widget to a real booking service.

More detail: [`docs/TECHNICAL.md`](docs/TECHNICAL.md).

## Credits

Concept, design and development: Lumo HQ. Photos: Unsplash (see [`CREDITS.md`](CREDITS.md)).
Casa Brasa is a fictional business.
