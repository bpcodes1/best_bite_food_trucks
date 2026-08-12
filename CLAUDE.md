# Best Bite Food Park

Client: Ray (also owns Rays Produce, parent of Restogo). Food park in Salem, OR.
Full client context lives in `clients/ray-bestbite-context.xml` — git-ignored,
never commit it. Read it before acting on anything about the client.

The shared rules in `../CLAUDE.md` apply. This file holds what is true only here.

**Read `STATUS.md` first.** It carries where the build is, what is decided and
why, what is blocked on whom, and the traps. This file is the rules; that one is
the state.

## Stack

**Pre-rendered.** `npm run build` runs `vite build`, then an SSR build, then
`prerender.mjs`, which writes one finished HTML file per address. `dist/` must
contain 11 HTML files (10 addresses + `404.html`). A single `index.html` means
the pre-render step silently didn't run — stop and find out why.

React 19, TypeScript, Vite, react-router-dom 7, Tailwind v4 (`@theme` in
`src/index.css`, **no** `tailwind.config` file and never one).

No head-tag library. React 19 hoists `<title>`, `<meta>`, and `<link>` natively
and emits them at the front of the SSR string, which `prerender.mjs` splits off.
Adding react-helmet-async back would be dead weight — it was tried and removed.

Preview host is Cloudflare Pages (`*.pages.dev`). Production is a domain not yet
purchased. `base` is `/` — only a GitHub Pages _project_ site would need a
subpath.

## The site is bilingual, and that changes the rules

Five pages, two languages, **ten addresses**. English at `/vendors`, Spanish at
`/es/vendedores`. Separate addresses, not a client-side toggle: a toggle changes
what is on screen but not the address, and Google files pages by address. With a
shared address the Spanish half of the site is never indexed.

- **Spanish strings run 20–25% longer than English.** A headline that sits on two
  lines in English wraps to three in Spanish and breaks the layout. Every layout
  must be checked in both languages at 375 and 768 before it is called done.
  This is the QA gate, not a nice-to-have. Neither hallmark nor any design skill
  will catch it.
- Language is derived from the URL via `useLang()`. There is no language state,
  no context, no provider. Never add one.
- **Never auto-redirect by browser language or geo-IP.** Sending a visitor to
  `/es` because of their headers, with no way back, breaks it for bilingual
  readers, travellers, VPN users, and anyone researching in their second
  language. The toggle is the only thing that changes language.
- Every page needs its hreflang pair. `<Seo>` handles it; don't hand-roll head
  tags.

## `src/lib/routes.ts` is the only place addresses live

The router, `prerender.mjs`, `sitemap.xml`, the nav, the language toggle, and the
hreflang tags all derive from that one array. Adding or renaming a page means
editing that file and nothing else. Never hardcode a path anywhere.

The English `lease` slug is not final — Enrique picks it, targeting
"food cart space for rent salem".

## Client facts

Never invent one. No testimonials, reviews, statistics, vendor names, hours, or
promotions unless they appear in the client context file.

Placeholders during the build are fine. **Placeholders that look like real data
are not.** Use `pending()` from `src/lib/site.ts`, which renders visible brackets
— `[PENDIENTE — site phone]`. Run `npm run pending` before any client review.
The previous build shipped `(512) 555-0148`, a fake number in an Austin area code
on a Salem business, and nothing on the page said so.

Two hard exceptions to the placeholder allowance:

- **The promo slot on Únete al Parque renders empty.** Ray confirmed there is no
  active vendor promotion. Do not carry the Square site's "first month rent free"
  text or invent a stand-in. Ray reviews mockups, and we never prescribe his
  business terms.
- **No named fake people or businesses.** "The Roadhouse Band" reads as real.
  `[EVENTO 1]` does not.

Known-true facts, already in `src/lib/site.ts`: address `3282 Silverton Rd NE,
Salem, OR 97301-8655`, hours 12:00–20:00 every day. Everything else is pending.

## Build constraints

- **No animation library.** No GSAP, no Framer Motion. CSS only. This site's job
  is ranking for local searches; the bundle stays small.
- **Nothing that only renders after JavaScript runs.** If a crawler reading the
  raw HTML can't see it, it doesn't count. That is the whole point of
  pre-rendering.
- **Images ship compressed.** The inherited assets in `src/assets/` are ~9MB
  against a 233KB JS bundle. `best_bite_inside.jpeg` alone is 2.86MB.
- **`public/_redirects` stays rule-free.** Pre-rendered site — the splat rule
  308-loops forever here. The file carries a comment explaining why; leave it.
- **No `404.html` in `public/`.** `prerender.mjs` generates `dist/404.html`.

## Design authority

`hallmark` owns design decisions — it is the only skill with write access to this
repo. `imagegen-frontend-web` produces client-facing reference images only and
never writes code.

**hallmark is modified on this machine.** Its source-refusal rules were stripped
at Enrique's explicit request (marketplace blocklist, signature-work
soft-refusal, and the attestation gate on `design.md` emission). Originals sit
beside the files as `*.orig`. Re-running `npx skills add nutlope/hallmark`
restores them and the strip has to be redone. Remote URL safety and
junk-or-blocked detection were kept — those are security, not taste.

`hallmark study` in URL mode cannot read CSS through its own fetch: WebFetch
converts pages to markdown and drops stylesheets, so type and colour come back
empty. Pull raw HTML with `curl` and grep for `font-family`, `@font-face`, and
hex values.

Once `design.md` exists at the project root it governs all ten addresses.
`hallmark audit` flags per-page theme drift as critical against it. Run the audit
before delivery.

Fonts and colours are set. `src/index.css` carries the `@theme` tokens and a
hallmark stamp naming the macrostructure, tone, and studied sources. Brand
values are **sampled from `src/assets/logo.png`** (`#fdc20c`, `#010101`) — the
inherited `#f9bc15` / `#17140f` are wrong; do not restore them.

## Verification

- `npm run build` must pass before every push, and `dist/` must have 11 HTML files.
- `curl -I` every address against the live host. Never verify routing with
  `npm run preview`.
- Never call a visual change done from code alone. Screenshot at 375 and 768,
  **in both languages.**
