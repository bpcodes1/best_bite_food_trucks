# Best Bite Food Park

Bilingual (EN/ES) site for Best Bite Food Park, Salem OR. Five pages, ten
addresses, pre-rendered to static HTML.

Build rules and client constraints live in [CLAUDE.md](CLAUDE.md). Read that
before changing anything.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Script            | What it does                                                 |
| ----------------- | ------------------------------------------------------------ |
| `npm run dev`     | Dev server with HMR. Serves an empty shell, not pre-rendered |
| `npm run build`   | Type-check, client build, SSR build, then pre-render         |
| `npm run preview` | Serve `dist/` locally                                        |
| `npm run test`    | Route-integrity tests                                        |
| `npm run pending` | List every placeholder still unfilled                        |
| `npm run images`  | Recompress `src/assets` in place (sharp). Safe to re-run     |
| `npm run lint`    | ESLint                                                       |
| `npm run format`  | Prettier                                                     |

## How the build works

`npm run build` runs four steps. The last one is the one that matters:

1. `tsc -b` — type-check
2. `vite build` — browser bundle into `dist/`
3. `vite build --ssr` — server bundle into `dist-ssr/`
4. `node prerender.mjs` — renders every address to a finished HTML file

`dist/` ends up with **11 HTML files**: ten addresses plus `404.html`. If you
only see `index.html`, step 4 didn't run and the site will ship as an empty
shell to anything that doesn't execute JavaScript.

`sitemap.xml` is generated in step 4 from the same route array, so it cannot
fall out of sync.

## Addresses

Five pages, each at two addresses. English and Spanish are separate URLs, not a
client-side toggle, so both can be indexed.

| Page          | English          | Spanish               |
| ------------- | ---------------- | --------------------- |
| Home          | `/`              | `/es`                 |
| Vendors       | `/vendors`       | `/es/vendedores`      |
| Events        | `/events`        | `/es/eventos`         |
| Lease a Space | `/lease-a-space` | `/es/unete-al-parque` |
| Contact       | `/contact`       | `/es/contacto`        |

All of it comes from `src/lib/routes.ts`. Adding or renaming a page means
editing that file and nothing else — the router, pre-render list, sitemap, nav,
language toggle, and hreflang tags all derive from it.

## Project structure

```
prerender.mjs          build step 4 — writes one HTML file per address
scripts/
  check-pending.mjs    lists every unfilled placeholder
  compress-images.mjs  recompresses src/assets in place
src/
  entry-server.tsx     SSR entry, used only at build time
  main.tsx             browser entry, hydrates pre-rendered markup
  AppRoutes.tsx        route tree + chrome, generated from lib/routes.ts
  components/
    SiteHeader.tsx     masthead: brand row + sticky nav row + toggle
    SiteFooter.tsx     statement close, NAP, every page link
    Seo.tsx            per-page title, description, canonical, hreflang, OG
    Schema.tsx         LocalBusiness JSON-LD, all values from lib/site.ts
    FanGallery.tsx     the fanned image stack on Home
    EventCard.tsx      one event: photo, title, tags, when, where
    ui.tsx             Section, Label, Chip, Button, form field skins
  lib/routes.ts        every address on the site, plus its nav label
  lib/site.ts          name, address, hours, phone — the one NAP source
  lib/useLang.ts       reads language off the URL
  pages/               one component per page, rendered at two addresses
  assets/              client photography, compressed (~4.4MB)
```

## Current state

See [STATUS.md](STATUS.md) for where the build actually is, and
[design.md](design.md) for the design system every page defers to.

In short: four of five pages are built in both languages — Home, Únete al
Parque, Contact and Events — plus the masthead and footer. **Vendors is the
only page still a single heading.**

Home is the reference for how the rest of the site should look; the other three
predate the 2026-08-12 design changes and are a generation behind.

Anything Ray has not confirmed renders as visible brackets on the page. Run
`npm run pending` for the list.
