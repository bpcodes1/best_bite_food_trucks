# Best Bite Food Park

Client: Ray (also owns Rays Produce, parent of Restogo). Food park in Salem, OR.
Full client context lives OUTSIDE this repo, in
`../best-bite-project/clients/ray-bestbite-context.xml` — moved there 2026-09-11 so
it has version history in `Business web projects` without ever reaching this
repo's GitHub remote. Never copy it back in here. Read it before acting on
anything about the client.

The shared rules in `../CLAUDE.md` apply. This file holds what is true only here.

**Read `STATUS.md` first.** It carries where the build is, what is blocked on
whom, and the traps. This file is the rules; that one is the state.

## What to read at the start of a session, and what not to

**Read two files: this one and `STATUS.md`.** That is the whole opening. Add
`design.md` before designing anything, and the client context file before acting
on a client fact. Nothing else, until the task tells you what else.

**Do not read the whole repo looking for contradictions.** The instinct is
right — the docs have gone stale and caused real mistakes — but reading is the
wrong tool for it. On 2026-08-19 an opening pass read most of `src/` at a cost of
~49,000 tokens, and every contradiction it found would have been found by a grep:
`six of nine` in a comment, `sr-only` holding English on a Spanish page, two
pages claiming different vendor tenure. **Search for the claim; do not read the
files.**

**When you hit a contradiction mid-task, stop and say so.** Do not quietly pick
whichever source looks newer, and do not "fix" the docs to match the code or the
code to match the docs on your own — either can be the wrong one. Enrique would
rather answer a question than review work built on a guess.

`docs/build-log.md` is the archive of why things are the way they are. **It is
not session-opening reading.** Open it when a rule looks wrong and you want the
story before you break it.

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

**The site is live, but not from this branch.** bestbitefoodpark.com has been
live since 2026-08-27 on Cloudflare Pages (project `best-bite-food-trucks`),
built from Bryan's `bryan` branch — a different build from the one this file
describes. **Every push to `bryan` is a production deploy.** A push to `enrique`
never reaches the live site: Cloudflare builds it as a branch preview, and every
`*.best-bite-food-trucks.pages.dev` address 301s to the real domain, so nobody
can see it. Never tell anyone a change on this branch is live. Verify changes
made on `bryan` with `curl` against bestbitefoodpark.com. Live-site state is in
`STATUS.md` § "THE SITE LAUNCHED".

**The GitHub repo is public.** Money, pricing and client notes never go in it,
not even in `STATUS.md`. They live in `ai-fundamentals/core-files/business-state.xml`
and `../best-bite-project/clients/`.

`base` is `/` — only a GitHub Pages _project_ site would need a subpath.

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
- **"Open" means trading. Never use it for a vacant stall.** The park is open,
  a truck is open, a kitchen is open now. An empty space is **free**, or
  **available**, never open. The English copy broke this in five places and
  Enrique read "6/15 · spaces open" as "we have six vendors" on 2026-08-19 —
  and he wrote the roster. The worst instance was Únete's own lede: "9 trucks
  are open at Best Bite right now ... 6 of 15 spaces are open", one word meaning
  both things a clause apart. Spanish mostly escaped it because `abierto` and
  `libre` are different words, which is exactly why a bilingual QA pass that
  only checks layout will not catch this class of bug.
- **State both counts wherever the vacancy number appears.** 9 filled and 6
  free, never the 6 alone. A bare fraction invites being read as a ratio of
  occupancy, and the two numbers only make sense against each other. This is
  **not** a rule that every mention of "9 kitchens" needs the 6 beside it —
  Home's headline and the Vendors lede say nine on its own and are correct.
- **Check the text nobody sees, too.** `sr-only` spans, `aria-label`s and
  `alt` text are copy, and they are the copy a Spanish page is most likely to
  ship in English — three of them did, on Home, until 2026-08-19. Nothing looks
  wrong, because they render to no one with working sight, so a screenshot pass
  in both languages cannot catch them. Grep `sr-only`, `aria-label` and `alt=`
  when checking a page's Spanish. Components hold no language of their own:
  every string a component speaks is passed in by the page, the way
  `EventCard`'s `pastLabel`, `whenLabel` and `whereLabel` are.

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

- **The site has to feel alive, and no animation library.** Those are not in
  tension. What is banned is GSAP, Framer Motion, Lottie and Lenis — roughly
  50KB gzipped that only runs after hydration, on a pre-rendered site whose
  visitors are on Salem cell service. CSS motion is expected, not rationed:
  a dead-looking page sends visitors back to the search results, so appeal and
  ranking optimise together. Full reasoning in `design.md` § Motion. If an
  effect genuinely cannot be built in CSS, reopen that section and make the
  case — do not quietly work around it.
- **Nothing auto-advances without a pause control.** WCAG 2.2.2, and plain
  courtesy to anyone who reads slowly.
- **Nothing that only renders after JavaScript runs.** If a crawler reading the
  raw HTML can't see it, it doesn't count. That is the whole point of
  pre-rendering.
- **Images ship compressed.** Run `npm run images` (sharp, devDependency,
  never shipped) after adding any asset. It is idempotent. `src/assets` is
  ~4.4MB against a ~280KB JS bundle, down from 9.2MB. `logo.png` is never
  touched — the brand colours were sampled from it.
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

**Home is the reference page.** It was rebuilt four times on 2026-08-12 against
Enrique's feedback and it is what the other pages should be brought up to. Read
`STATUS.md` § "What Home looks like now, and why" before designing anything.

**Sunbeam Bagels is a structural reference only** (Enrique, 2026-08-12). Take
layout ideas from it; keep our type, our yellow, our masthead.

## Verification

- `npm run build` must pass before every push, and `dist/` must have 11 HTML files.
- `curl -I` every address against the live host. Never verify routing with
  `npm run preview`.
- Never call a visual change done from code alone. Screenshot at 375 and 768,
  **in both languages.**
- **Crop before you look.** A full-page capture of this site runs 4,000–6,000px
  tall. Viewing one costs a large amount of context and shows nothing legible,
  because it has to be scaled to fit — so you pay for the big picture, learn
  nothing, then crop and pay again. Capture full-page if you like, but `extract`
  the section you are judging before viewing it. The exception is checking
  overall page rhythm, which is the one thing the scaled-down version does show.
- **Screenshot through the DevTools Protocol, not `--window-size`.** Headless
  Chrome's `--window-size` is not a viewport: it renders at Chrome's default
  minimum layout width and produces pictures of bugs that do not exist. Use
  `Emulation.setDeviceMetricsOverride`, force `img.loading = 'eager'` and await
  `decode()` before capturing (`captureBeyondViewport` never fires lazy
  loading), and confirm any suspected overflow by reading
  `document.documentElement.scrollWidth` before touching CSS. Both traps cost a
  round-trip each on 2026-08-12.
- **When feedback is ambiguous, ask which reading is meant.** "The hero gets cut
  off" meant "it should fill the screen"; it was acted on as "it is too tall"
  and cost three rebuilds.
