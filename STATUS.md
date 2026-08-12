# Status — Best Bite Food Park

Where the build actually is. Read this, then `CLAUDE.md`, then `design.md`.

**Last updated:** 2026-08-12 (end of session — Home rebuilt four times)
**Branch:** `enrique` (never `main` — `main` is Bryan's, unrelated work)
**Deadline:** ~Sept 2 (four weeks from the ~Aug 5 clock start)

---

## Where we are

**Four of five pages are built** in both languages: Home, Únete al Parque,
Contact, and Events, plus the site chrome. **Vendors is the only unbuilt page**
and it is no longer blocked — the roster is settled and all nine vendors have
images in the repo.

Home went through four rejected passes today and is the reference for how the
rest of the site should now look. The other three pages work but predate the
masthead, the washes, and the eyebrow cap — they are a design generation
behind.

### START HERE NEXT SESSION

1. **Build Vendors.** Everything it needs is in the repo. This is the only
   unbuilt page and the last thing between us and a complete site.
2. **Bring Únete, Events and Contact up to Home's standard** — the eyebrow cap,
   the lighter grounds, the new card voice.

Home is **done for now**. Enrique's last outstanding item on it — the event
flyers being cropped — was fixed 2026-08-12: they render `object-contain` in a
square mat so no poster ever loses its words. Ask before redesigning any part
of Home; do not act on your own read of it. Three of the four rejected hero
passes came from doing exactly that.

## Built and verified

|                 |                                                                           |
| --------------- | ------------------------------------------------------------------------- |
| Scaffold        | Vite + React 19 + TS + Tailwind v4, pre-rendered to 11 HTML files         |
| Addresses       | 5 pages × 2 languages, all deriving from `src/lib/routes.ts`              |
| Chrome          | Masthead nav + statement footer, both derived from `routes.ts`            |
| Home            | Full-screen hero, tinting fan gallery, events grid, story, door           |
| Únete al Parque | Built EN + ES. Design predates the 2026-08-12 rules                       |
| Contact         | NAP, map, form, cross-door to Únete, LocalBusiness schema                 |
| Events          | Built on the three real flyers, dated events in a data array              |
| Vendors         | **NOT BUILT** — still a single `<h1>`                                     |
| Type            | Archivo Black / Source Sans 3 / IBM Plex Mono, self-hosted, latin subsets |
| Assets          | 9.2 MB → 4.4 MB via `npm run images` (sharp, devDependency)               |
| Schema          | `LocalBusinessJsonLd` on Home + Contact, values from `site.ts`            |

Verified: build passes, lint clean, 9 route tests, 11 HTML files, content and
JSON-LD present in the raw HTML with no JavaScript, `lang` correct per address,
hreflang pairs on every page, no horizontal overflow at 375 in Spanish.

Screenshots in `qa-screenshots/` (git-ignored), refreshed at the end of the
session: Home at 375/768 ES and 1540 EN, Únete and Contact at 768 ES.

**Nothing has ever been deployed.** Every "verified" line above means verified
locally. No live host exists to check against.

**Not verified: the Google Maps embed on Contact.** It renders as an empty box
in headless screenshots. Almost certainly a headless quirk — confirm in a real
browser before any client review.

## Decisions, and why

The reasoning is the part that gets lost. The decision alone is in the code.

**Pre-rendered, not a plain SPA.** The site's job is ranking for local searches;
a plain SPA makes every page depend on the crawler executing our JavaScript.

**Spanish gets its own addresses, not a toggle.** A toggle changes what is on
screen but not the address, and Google files pages by address. A shared address
leaves the entire Spanish half unindexed.

**Brand colours are sampled from `src/assets/logo.png`**, not inherited.
`#fdc20c` and `#010101`. Bryan's `#f9bc15` / `#17140f` are both wrong. Do not
"correct" them back.

**No monospace body**, despite both the Kraken and Sunbeam references doing
exactly that. Mono has no narrow characters and Spanish already runs 20–25%
long. Mono is labels only.

**Únete first, not Home.** Únete had one audience and one action. Home has to
serve hungry locals and prospective vendors at once, which is the hardest
content problem here.

**Home is overwhelmingly for eaters.** Vendors reach Únete through search, not
by browsing Home. One honest door to Únete low on the page. This is also the
fix for the recruiting-copy bleed the July audit found on the Square site.

**No price on the page.** Ray's call, relayed 2026-08-11.

**Dark is rationed to two surfaces per page** (hero scrim + footer), amended
2026-08-12. Four dark bands made a daytime family park look like a whisky bar.
The old "dark carries the food photography" rule is retired.

**Motion is required, animation libraries are not.** Amended 2026-08-12 after
Enrique pushed back, correctly. A dead-looking page sends visitors back to the
search results, so appeal and ranking optimise together rather than trading
off. What is banned is GSAP / Framer Motion / Lottie / Lenis — roughly 50 kB
gzipped that only runs after hydration, on a pre-rendered site whose visitors
are on Salem cell service. Everything wanted from the Sunbeam reference is CSS.
**If an effect genuinely cannot be built in CSS, reopen design.md § Motion and
make the case. Do not quietly work around it.**

**Sunbeam Bagels is a structural reference only.** Enrique's call: take the
layout ideas, keep our type, our yellow, our masthead. Their retro serif would
mean redoing Únete; their monospace-everywhere would fight Spanish.

## Open decisions

1. **The remaining Home changes.** Unspecified. Ask Enrique. See START HERE.
2. **Display face — leaning Archivo Black, not closed.** Anton stays wired and
   switchable: `document.documentElement.dataset.display = 'anton'`.
3. **The English `lease` slug.** Currently `/lease-a-space`. Deliberately left
   alone — one edit in `routes.ts`, nothing external links to it yet, so the
   change stays free until the domain goes live. Revisit before cutover.
4. **Form destination.** Undecided, so both forms are deliberately unwired and
   show a visible placeholder on submit. Ray does not read email; Cynthia does
   not enter the picture until after delivery.
5. **The story section on Home.** Deliberately left plain. It is the most
   likely thing to be replaced wholesale when Ray's voice notes arrive, so
   designing it now is probably wasted work. Enrique has not overruled this.

## Blocked on Ray

Nothing new as of 2026-08-12. Placeholders render as visible brackets; run
`npm run pending` for the live list (25 at the end of this session).

- Site phone, site email
- Instagram, Facebook, TikTok handles
- Stall size, what is included (power, water, trash), reply time
- **Per-vendor plate photos** — the single highest-value thing he can send.
  They unlock real vendor attribution on the gallery washes, and the
  photography is the ceiling on how good this site can look.
- His story for the Home section (voice note or text)
- Drone video — last to arrive, possibly post-delivery. It drops into the
  hero as a `<video>` with the same classes and nothing else changes.
- **Whether the Asian-cuisine recruiting line still stands.** Que Rollon Sushi
  is on the confirmed roster, and Únete currently tells prospective vendors the
  park is "especially looking for Asian food" because the lineup is "mostly
  Mexican". Still true at 7 of 9, but he said it when he had none.

## Blocked on Enrique

- **Create the Cloudflare Pages project.** Nothing exists yet — see the section
  below for the order and the two traps. Until it exists, Ray cannot look at
  the site on his own phone, which the approve-before-build flow depends on.
- **Text Ray the descope offer**, get his yes, send the two-line written recap.
  Bryan already agreed to Option A. Open since 2026-08-10, and the whole site
  is now built past it.
- **The domain.** Long-lead, and it gates `site.origin`, every canonical, and
  cutover.
- **GBP overhaul.** Promised as an early win "within days of kickoff"; that was
  ~Aug 5. Independent of the build.
- Better hero photography. `best_bite_sign.jpg` is 1024×576, the lowest-
  resolution asset in the repo, and it upscales ~3× on a retina screen.
  Enrique chose it as the best of a weak set and said so.

## The vendor roster — RESOLVED 2026-08-12

Enrique's definitive list, in `food_trucks.txt`. Nine vendors, all with images
in `src/assets/food_trucks/`: Pupusas Chileros, Cafe Chula, Las Jarochitas,
Las Cuatas Lokas, Nieve Casera, Taqueria Romero, The Red Marino, Que Rollon
Sushi, El Patron Tortilleria.

`el_chilango.jpg` was deleted per his instruction. Adan's Grill, Syrian House
and La Flauta PDX are out. Per-vendor cuisine, hours and blurbs are still
missing (the context says Bryan pulled hours; they are not in the repo).

## Deployment: nothing exists yet

Enrique checked the dashboard 2026-08-12 — **there is no Cloudflare project for
Best Bite.** Pushing to `enrique` moves code to GitHub and stops there. The
shared rule in `../CLAUDE.md` that every push is a production deploy is not
true here yet, so do not claim a change is live and do not try to `curl` a
host that does not exist.

Setting it up is worth doing before the domain arrives, because Ray cannot
review a site that only runs on Enrique's laptop, and approve-before-build is
the promise in the offer.

**Do these in order. Steps 1 and 2 are the traps.**

1. **Point `site.origin` at the `*.pages.dev` URL before the first deploy.**
   It is `http://localhost:5173` today, so a deploy right now would publish ten
   pages whose canonical, hreflang, OG and JSON-LD URLs all point at
   `localhost`. One edit in `src/lib/site.ts`; swap it again at domain cutover.
2. **Block crawling at the Cloudflare account level, not in `public/`.** The
   preview will carry visible `[PENDIENTE]` brackets and draft copy, and it
   must not be indexed. An `X-Robots-Tag: noindex` in `public/_headers` ships
   with the build and would de-index the real site on launch day — that is a
   named rule in `../CLAUDE.md` and it has burned a project before.
3. Create the Pages project, connect it to `bpcodes1/best_bite_food_trucks`,
   build command `npm run build`, output directory `dist`.
4. **Set the production branch to `enrique`.** If it defaults to `main` the
   published site is Bryan's unrelated build and none of our work appears.
5. Set any environment variables for **both** Production and Preview. Setting
   only one is a silent failure.
6. After the first deploy, confirm `dist/` produced 11 HTML files and then
   `curl -I` all ten addresses on the live host. Never verify routing with
   `npm run preview`.
7. At domain cutover, add an account-level redirect from `<project>.pages.dev`
   to the real domain. The `pages.dev` URL never goes away on its own and will
   otherwise sit there as an indexable duplicate of the whole site, forever.

## Traps a new session will fall into

**"Cut off" meant "should fill the screen", not "is too tall".** Three of
Home's four rejected hero passes came from me acting on my reading of a
complaint instead of asking which he meant. When feedback is ambiguous, ask.
It costs one message; guessing cost a day.

**Tailwind v4 emits `translate` and `scale`, not `transform`.**
`-translate-x-*` compiles to `translate: var(--tw-translate-x) ...` and
`scale-*` to the `scale` property. A `transition-[transform,opacity]` therefore
animates a property that never changes, and the element jumps while only the
fade runs. Use `transition-[translate,scale,opacity]`. This cost a whole
round-trip on the gallery.

**Headless Chrome's `--window-size` is not a viewport.** It renders at Chrome's
default minimum layout width, producing screenshots that look like the header
overflows when it does not. Drive the browser through the DevTools Protocol
with `Emulation.setDeviceMetricsOverride`, and confirm any suspected overflow
by reading `document.documentElement.scrollWidth` before touching CSS.

**`captureBeyondViewport` does not fire lazy loading.** Full-page CDP
screenshots show blank holes where below-fold `loading="lazy"` images belong.
Force `img.loading = 'eager'` and await `img.decode()` before capturing. This
produced a phantom "missing images" report.

**`--header-h` in `src/index.css` is measured, not guessed.** 80px on phones,
131px from `sm` up. Home's hero is `calc(100svh - var(--header-h))`. If the
masthead's padding changes, re-measure
`document.querySelector('header').getBoundingClientRect().height` or the hero
will overshoot or undershoot the fold.

**`site.hours` stays 24-hour.** Schema.org's `openingHoursSpecification`
requires it. `hoursRange()` derives the twelve-hour display string, so the page
reads `12:00pm - 8:00pm` while the JSON-LD reads `12:00`/`20:00`. Do not
"simplify" by storing the display string.

**`clients/` is git-ignored and must stay that way.** Pricing, the retainer,
and an objection playbook marked internal.

**hallmark has been modified on this machine.** Source-refusal rules removed at
Enrique's explicit request. Originals at `~/.agents/skills/hallmark/*.orig`.
Re-running `npx skills add nutlope/hallmark` restores them and the strip must
be redone.

**`hallmark study` in URL mode cannot see CSS.** WebFetch converts pages to
markdown and drops stylesheets. Pull raw HTML with `curl`, find the stylesheet
`href`, and `curl` that too — that is how the Sunbeam type and palette were
read. Image mode is the only mode that can judge rhythm.

**`prerender.mjs` has `MIN_BODY_BYTES = 10`.** Raise it to ~500 once Vendors is
built — it is the last page whose body is a single `<h1>`, and at 10 the check
cannot catch the empty-shell failure it exists for.

**Both forms are deliberately unwired.** Submitting shows a visible
placeholder. Do not "fix" it into a success message; the previous build told
people their message had been received and sent nothing.

**The promo slot on Únete renders nothing on purpose.** Ray confirmed there is
no active vendor promotion.

## What Home looks like now, and why

Section order, and each one a different shape and ground:

1. **Hero** — full-bleed sign photo with a left-heavy scrim, exactly
   `100svh - var(--header-h)`. Corner-anchored: eyebrow top, headline and CTA
   middle-left, address and scroll cue bottom. This is a full-height hero but
   **not** the banned full-viewport _centred_ hero — the distinction is
   left-bias and corner detail, and it is why Sunbeam's reads as designed.
2. **Hours** — brand yellow at flood footprint.
3. **Gallery** — the fanned stack, ground cross-fading to the active dish's
   wash. Adapted from `origin/bryan:src/components/FanGallery.tsx`, rebuilt on
   our tokens with a live caption, arrow keys, and no autoplay.
4. **Events** — pale yellow flood, three real flyers as `EventCard`s.
5. **Story** — cream, deliberately plain. Draft copy.
6. **Door to Únete** — the only recruiting copy on the page.
7. **Footer** — night, statement close.

**Washes** (`--color-wash-*` in `src/index.css`) are grounds only — never type,
buttons, rules or accents — so design.md's no-third-brand-colour rule still
holds. The gallery washes are keyed to the **dish**; Enrique asked for the
**vendor's** colour, and that is a data change in `dishes` the day Ray's plate
photos make attribution possible. Only two of six photos are attributable
today, and guessing the rest would be inventing a client fact.

## Next

1. **Ask Enrique what the remaining Home changes are**, then do them.
2. **Build Vendors.** Roster settled, nine images present. `EventCard` is the
   closest existing pattern — same shape, cuisine tags instead of event tags.
   Apply the eyebrow cap and the wash rules from day one.
3. **Bring Únete, Events and Contact up to Home's standard** — the eyebrow
   pass, the lighter grounds, and the new card voice.
4. **Check the Cloudflare dashboard**, then `curl -I` every address on the live
   host. Never verify routing with `npm run preview`.
5. Confirm the Contact map paints in a real browser.

Before delivery, none of it started:

6. **`site.origin` is still `http://localhost:5173`.** Every canonical,
   hreflang, OG tag, sitemap entry and the JSON-LD `url` point at localhost.
   One edit in `site.ts`, gated on the domain.
7. **No `og:image` anywhere.** Every share of all ten addresses is a bare text
   card.
8. **`FAQPage` schema on Únete.** LocalBusiness exists on Home and Contact.
9. Raise `MIN_BODY_BYTES` to ~500 once Vendors is real.
10. `hallmark audit` across all ten addresses.
11. Wire the forms once the destination is decided.
