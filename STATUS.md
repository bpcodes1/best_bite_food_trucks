# Status — Best Bite Food Park

Where the build actually is. Read this, then `CLAUDE.md`, then `design.md`.

**Last updated:** 2026-08-12 (afternoon — Home, Contact, Events built)
**Branch:** `enrique` (never `main` — `main` is Bryan's, unrelated work)
**Deadline:** ~Sept 2 (four weeks from the ~Aug 5 clock start)

---

## Where we are

**Four of five pages are built** in both languages: Únete al Parque, Home,
Contact, and Events, plus the site chrome (header, nav, language toggle,
footer). Only Vendors remains, and it is blocked on one thing: **Enrique is
sending the definitive vendor list.** `food_trucks.txt` is NOT that list — he
said so explicitly on 2026-08-12.

The placeholder boundary, decided by Enrique 2026-08-12: **draft copy yes,
fake data no.** Full draft copy everywhere (including Home's story section,
written to be replaced by Ray's voice notes), but contact details, prices,
dates, and social handles stay as visible `[PENDIENTE]` brackets. `npm run
pending` remains the authority on what is real.

The three event flyers in `src/assets/events/` are **real park marketing**
(Enrique confirmed 2026-08-12). Karaoke every Sunday is a real recurring event,
stated on the park's own flyer; the Back to School Cruise is real with its date
pending. Events is built on them.

`main` contains Bryan's separate build. **Do not read it as a reference or a
target.** Our branch was reset to a clean slate on purpose, keeping only the
client-supplied photography.

## Built and verified

|                 |                                                                           |
| --------------- | ------------------------------------------------------------------------- |
| Scaffold        | Vite + React 19 + TS + Tailwind v4, pre-rendered to 11 HTML files         |
| Addresses       | 5 pages × 2 languages, all deriving from `src/lib/routes.ts`              |
| Design system   | `design.md` — governs all ten addresses, `hallmark audit` enforces it     |
| Type            | Archivo Black / Source Sans 3 / IBM Plex Mono, self-hosted, latin subsets |
| Únete al Parque | Built EN + ES, ~21 kB of finished HTML per address                        |
| Home            | Built EN + ES, appetite-led brochure, LocalBusiness schema, ~18 kB        |
| Contact         | Built EN + ES, NAP + map + form + cross-door to Únete, schema, ~16 kB     |
| Events          | Built EN + ES on the real flyers, dated events are a data array, ~14 kB   |
| Chrome          | Header, nav, language toggle, footer — all derived from `routes.ts`       |
| Assets          | 9.2 MB → 4.6 MB via `npm run images` (sharp); favicon 984 kB → 4 kB       |
| Schema          | `LocalBusinessJsonLd` on Home + Contact, all values from `site.ts`        |

Verified: build passes, lint clean, 9 route tests pass, 11 HTML files, content
and JSON-LD present in the raw HTML with no JavaScript, `lang` attributes
correct per address, hreflang pairs on every page.

Screenshots reviewed (in `qa-screenshots/`, git-ignored): every built page at
375 and 768 in Spanish, chrome at 1280 in English, the collapsed menu open.
Spanish is the longer language, so if Spanish fits, English fits; the header
was checked in English separately because the wide nav only appears at `lg`.

**Not verified: the Google Maps embed on Contact.** It renders as an empty box
in headless Chrome screenshots (headless quirk, most likely). Confirm it paints
in a real browser before any client review.

## Decisions, and why

The reasoning is the part that gets lost. The decision alone is in the code.

**Pre-rendered, not a plain SPA.** The site's job is ranking for local searches;
a plain SPA makes every page depend on the crawler executing our JavaScript.

**Spanish gets its own addresses, not a toggle.** A toggle changes what is on
screen but not the address, and Google files pages by address. A shared address
leaves the entire Spanish half unindexed.

**Light warm ground, dark as a section.** Most vendor assets are logos on white,
and a white logo ground on a dark card is a box you cannot remove. Cream carries
logos; night carries photography.

**Brand colours are sampled from `src/assets/logo.png`**, not inherited.
`#fdc20c` and `#010101`. Bryan's `#f9bc15` / `#17140f` are both wrong. Do not
"correct" them back.

**No monospace body**, despite the Kraken reference doing exactly that. Mono has
no narrow characters and Spanish already runs 20–25% long. Mono is labels only.

**Únete first, not Home.** Únete has one audience and one action — the cleanest
brief in the project. Home has to serve hungry locals and prospective vendors at
once, which is the hardest content problem here. Building Únete first means Home
inherits a proven system instead of inventing one.

**Home is overwhelmingly for eaters.** Vendors reach Únete through search
("food cart space for rent salem"), not by browsing Home. One honest door to
Únete low on the page. This is also the fix for the recruiting-copy bleed the
July audit found on the Square site.

**Utilitarian tone.** Market sophistication reads Stage 1 — no Salem competitor
has a leasing page at all — and Stage 1 rewards a simple direct claim.

**No price on the page.** Ray's call, relayed 2026-08-11. Noted tradeoff: openly
stated economics is the strongest thing about the Block 40 page we took the
structure from. The page leans on terms instead.

## Open decisions

1. **Display face — leaning Archivo Black, not closed.** Enrique reviewed Anton
   and likes both, leaning Archivo Black because it is wider and a reader can
   see what each section is about faster. Anton stays wired and switchable.
2. **Home's macrostructure.** Deferred until the system has proven itself.
   Strategy is settled (see above); the shape is not.
3. **The English `lease` slug.** Currently `/lease-a-space`. **Deliberately left
   alone 2026-08-12** rather than left undecided: it is one edit in
   `src/lib/routes.ts`, nothing external links to it yet, and no GBP or
   directory work has started, so the change stays free right up until the
   domain goes live. Revisit before cutover, not before. Enrique's SEO call,
   targeting "food cart space for rent salem". The Spanish slug
   `/es/unete-al-parque` is settled.
4. **Form destination.** Undecided. Ray does not read email and Cynthia does not
   enter the picture until after delivery. The form is deliberately unwired
   until this is answered.
5. **Component library.** Asked and effectively closed — the interactive surface
   is a nav, a toggle, one form and one accordion. Not worth a dependency.
   DaisyUI and HeroUI were considered and rejected (own theme systems, and
   HeroUI pulls framer-motion, which `design.md` bans).

## Blocked on Ray

Six placeholders close the moment he replies. They render as visible brackets.
Run `npm run pending` for the live list.

- Site phone, site email
- Stall size, what is included (power, water, trash)
- Reply time ("we get back to you within…")
- Instagram, Facebook, TikTok handles
- Per-vendor plate photos, and his story for the Home section
- Whether Que Rollon Sushi is a current vendor — it is Asian cuisine, which is
  exactly what he says he is recruiting for, and it would rewrite the leasing
  positioning

## Blocked on Enrique

- **The vendor roster.** Enrique is sending the definitive list (reaffirmed
  2026-08-12: `food_trucks.txt` is NOT it). Vendors is the last unbuilt page
  and waits on this. Per-vendor cuisine, hours and blurbs ride along — the
  context says Bryan pulled reliable vendor hours and they have not landed in
  the repo.
- **Cloudflare wiring is unknown.** Enrique is not sure what is connected to
  this repo (2026-08-12). Until that is checked in the dashboard, pushes to
  `enrique` may or may not deploy anywhere, and live-host verification is
  impossible. Check what project exists, which branch is production, and get
  the `*.pages.dev` URL into this file.

- **Text Ray the descope offer**, get his yes, send the two-line written recap.
  Bryan already agreed to Option A. The context file's own rule: nothing gets
  built past mockups until that recap exists. Open since 2026-08-10, and Únete
  plus the chrome are now built past it.
- **The domain.** Long-lead. Registration and DNS are slow and it gates cutover.
- **GBP overhaul.** Promised as an early win "within days of kickoff"; that was
  ~Aug 5. Independent of the build.
- Ask Bryan where Que Rollon Sushi came from.

## Traps a new session will fall into

**`clients/` is git-ignored and must stay that way.** It holds pricing, the
retainer, and an objection playbook marked internal. `.gitignore` and
`.git/info/exclude` both cover it.

**hallmark has been modified on this machine.** Its source-refusal rules were
removed at Enrique's explicit request — marketplace blocklist, signature-work
soft-refusal, and the attestation gate on `design.md` emission. Originals are at
`~/.agents/skills/hallmark/SKILL.md.orig` and `references/study.md.orig`.
**Re-running `npx skills add nutlope/hallmark` restores the rules** and the strip
must be redone. Remote URL safety and junk-or-blocked detection were kept
deliberately — those are security, not taste.

**`hallmark study` in URL mode cannot see CSS through its own fetch.** WebFetch
converts pages to markdown and throws stylesheets away, so the type and colour
passes come back empty. Pull the raw HTML with `curl` and grep for `font-family`,
`@font-face`, and hex values. That is how the Atlantic and Kraken diagnoses were
actually produced.

**`prerender.mjs` has `MIN_BODY_BYTES = 10`.** It is that low because four of the
five pages are still a single `<h1>`. **Raise it to ~500 once every page has real
content**, or it stops catching the empty-shell failure it exists to catch.

**The form is deliberately unwired**, and submitting shows a visible placeholder.
Do not "fix" it into a success message. The previous build told people their
message had been received and sent nothing.

**The promo slot on Únete renders nothing on purpose.** Ray confirmed there is no
active vendor promotion. Do not carry the Square site's "first month rent free"
text and do not invent a stand-in.

**`base` is `/`**, which is right for localhost, Cloudflare `*.pages.dev`, and the
production domain. Only a GitHub Pages _project_ site would need a subpath.

**Headless Chrome's `--window-size` is not a viewport.** Screenshotting with
`--headless=new --window-size=375,1000` renders the page at Chrome's default
minimum layout width, not 375, and produces a picture that looks like the header
is overflowing when it is not. It cost an hour and nearly a fix to a bug that did
not exist. Drive the browser through the DevTools Protocol and set
`Emulation.setDeviceMetricsOverride` instead, and confirm any suspected overflow
by reading `document.documentElement.scrollWidth` before touching CSS.

**`captureBeyondViewport` does not fire lazy loading.** A full-page CDP
screenshot of a page with `loading="lazy"` images shows blank holes where the
below-fold images belong, because nothing ever scrolled. Force
`img.loading = 'eager'` and await `img.decode()` on every image before
capturing. This too produced a phantom bug report (missing Home images that
were never missing).

**The nav collapses below `lg`, not below `md`.** The five Spanish labels run to
46 characters against English's 38 and overflow a 768px header set in
letterspaced mono. The English nav fits there fine, which is the trap. A route
test asserts the Spanish labels stay inside the width the header was built for.

## Next

1. **Build Vendors** the moment Enrique's roster lands. Everything else on the
   page level is done.
2. **Check the Cloudflare dashboard** — what is wired, which branch deploys,
   what the `*.pages.dev` URL is. Then `curl -I` every address on it.
3. Confirm the Google Maps embed on Contact paints in a real browser.

Before delivery, and none of it started:

4. **`site.origin` is still `http://localhost:5173`.** Every canonical,
   hreflang, OG tag, sitemap entry, and the JSON-LD `url` point at localhost.
   One edit in `site.ts`, gated on the domain.
5. **No `og:image` anywhere.** Every share of all ten addresses is a bare text
   card. `Seo.tsx` has og:type/title/description/url/locale and nothing else.
6. **`FAQPage` schema on Únete** — LocalBusiness exists on Home and Contact;
   the FAQ page markup is the remaining schema piece.
7. Raise `MIN_BODY_BYTES` in `prerender.mjs` from 10 to ~500 once Vendors is
   real — it is the last page whose body is a single `<h1>`.
8. `hallmark audit` across all ten addresses.
9. Wire the forms once the destination question is answered (Ray does not read
   email; Cynthia is post-delivery).
10. `curl -I` every address on the live host. Never verify routing with
    `npm run preview`.
