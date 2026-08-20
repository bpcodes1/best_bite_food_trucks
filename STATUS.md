# Status — Best Bite Food Park

Where the build actually is. Read this, then `CLAUDE.md`. Read `design.md` before
designing anything, and `docs/build-log.md` only when you need to know **why**
something is the way it is.

**This file is deliberately short.** It was 67 KB on 2026-08-19 and every session
paid ~17,000 tokens to read it before doing any work. The reasoning behind every
past decision moved to `docs/build-log.md`; what stayed here is the state a new
session needs before it can act. **Keep it that way** — when a section stops
describing what is true now and starts describing how it got that way, move it.

**Last updated:** 2026-08-20.
**Branch:** `enrique` (never `main` — `main` is Bryan's, unrelated work).
**Deadline:** ~Sept 2 (four weeks from the ~Aug 5 clock start).

A word on "shipped" in this file: it means built and committed to `enrique`.
**Nothing has been delivered to Ray and nothing is on the internet.**

---

## START HERE NEXT SESSION

Everything through 2026-08-19 is committed and pushed to `enrique`. Working tree
clean. All five pages pass the seven-point checklist below.

Three jobs left that are ours rather than Ray's or Enrique's:

1. **`og:image`.** Every share of all ten addresses is a bare text card.
   `events/cruise_lowriders.webp` is the candidate — lowriders in the lot, a
   person in frame, and the only asset that looks like something happening.
   `park/entrance_sign.webp` is the fallback, already cropped clean of the
   out-of-date vendor board. **Never `park_sign.webp`.**
2. **`hallmark audit` across all ten addresses.** Nothing has been audited since
   the pages were rebuilt, and the audit is what catches drift from `design.md`.
3. **Wire the two forms**, once Enrique settles where they send.

**Bryan is actively working on his branch.** `origin/bryan` was `04441ac` on
2026-08-19 — re-check before harvesting. If `enrique` is ever merged into `main`
its workflow publishes our build at the wrong base path, broken.

## Where we are

**All five pages are built in both languages.** Home, Vendors, Únete al Parque,
Events, Contact, plus chrome. Vendors was the last one, built 2026-08-16.

Home is the reference for how the site should look. What that means is the
seven-point checklist below; why it means that is in `docs/build-log.md`
§ "What Home looks like now, and why". Únete and Events were brought up to it
2026-08-18, Contact and Vendors on 2026-08-19. All five pass it.

## Built and verified

|                 |                                                                                |
| --------------- | ------------------------------------------------------------------------------ |
| Scaffold        | Vite + React 19 + TS + Tailwind v4, pre-rendered to 11 HTML files              |
| Addresses       | 5 pages × 2 languages, all deriving from `src/lib/routes.ts`                   |
| Chrome          | Masthead nav + statement footer, both derived from `routes.ts`                 |
| Home            | Full-screen hero, hours flood, tinting fan gallery, flyers, story, 6/15 door   |
| Vendors         | **BUILT** — hero, nine 4:3 cards (8 with a truck photo), karaoke + facts bands |
| QA              | `npm run shots` — every address, 375/768, both languages, overflow as a number |
| Únete al Parque | **BUILT** — photo hero, 6/15 accent band, three steps, FAQ + schema, form      |
| Contact         | **BUILT** — sign hero, address at flood + directions, map, form, cross-door    |
| Events          | **BUILT** — hall hero, karaoke flood + Event schema, lineup, photo grid, door  |
| Type            | Archivo Black / Source Sans 3 / IBM Plex Mono, self-hosted, latin subsets      |
| Schema          | LocalBusiness, ItemList of nine vendors, FAQPage on Únete, Event on Events     |
| Tests           | 16, across `routes.test.ts` and `vendors.test.ts`                              |

Verified 2026-08-19, after every change: build passes, lint clean, 16
tests, 11 HTML files, and `npm run shots` reports no overflow, no broken images,
a `<title>` on every page and a correct `<html lang>` across all twenty
screenshots (ten addresses × 375 and 768). Screenshots land flat in
`qa-screenshots/`, which is git-ignored and regenerated on demand.

**Nothing has ever been deployed.** Every "verified" line means verified
locally. No live host exists to check against. (Bryan's separate build IS live —
see "Bryan's build is live" below.)

---

## Assets — what is missing and what must never ship

**One vendor still has no truck photograph: Pupusas Chileros.** Nothing in the
63-photo set covers it and nothing on any branch does either. It has to come
from Ray. Its card carries the logo wash panel and holds its shape, which is
exactly what that treatment exists for. Eight of nine cards have a photograph.

### Never publish these

- **`park/park_sign.webp`** — the uncropped park sign. Its vendor board lists
  Adan's Grill, El Chilango, Syrian House and "J JS Boba", none on the roster,
  and omits three that are. Publishing it puts a wrong vendor list on the site
  inside a photograph, where nobody would think to check.

Four more on `origin/bryan`:

- **`giveaway.jpg`** — a Louis Vuitton box. Another company's trademark on Ray's
  commercial page, and it says nothing about a food park.
- **`mycelium.jpg`** — a flyer for somebody else's meeting, dated 2/23.
- **`easter2.jpg`, `loteria2.jpg`** — the same events with promo text burned in.
  The clean Easter original exists, which is why the captioned one is not needed
  and is good evidence clean versions of the others exist too. Worth asking.
- **`jarochitas.jpg`** — carries a TikTok watermark and `@lasjarochitas1`, and
  it is a vendor's own content rather than the park's.

## The seven-point checklist every page is scored against

Home is the reference and this is what "Home's standard" means, checkably. The
reasoning behind each item is in `docs/build-log.md`.

Not by reading the code. Run `npm run shots -- <page>` and check the page
against these, in both languages:

1. Does the hero take less than a full screen, and does the next section peek?
   The formula is `100svh − var(--header-h) − 6rem`, the same on every page but
   Home. Home alone takes `100svh − var(--header-h)`.
2. Are there at most two section-kicker eyebrows, plus the accent band's?
3. Does the ground change at least three times down the page?
4. Is there one accent-flood band carrying a real fact at large size?
5. Are there at most two dark surfaces, counting the footer?
6. Do arrows appear on at most two buttons?
7. Is the vertical padding different between at least two sections?

## Open decisions

1. **Does the roster hold at nine?** Two independent signals say maybe not.
   Syrian House was trading on 2026-08-17, five days after being cut. And the
   park's own sign lists **Adan's Grill, El Chilango, Syrian House and "J JS
   Boba"** — four businesses not on the roster — while omitting Las Cuatas
   Lokas, Nieve Casera and Que Rollon Sushi, which are on it. Either the sign is
   stale or the roster is. Nine is printed on four pages and inside the
   structured data, so it has to be right. One text to Ray settles it.
2. **Whether to delete `src/assets/in_person_images.zip`.** It is git-ignored so
   it is harmless, but it is 219 MB sitting in the working tree. Enrique has not
   said.
3. **The English `lease` slug.** Currently `/lease-a-space`. Roof's framework
   says put the target keyword in the URL of a new page and never change it once
   the page has authority — so this is now time-boxed to before cutover, not
   before delivery. Target is "food cart space for rent salem".
4. **Display face — leaning Archivo Black, not closed.** Anton stays wired:
   `document.documentElement.dataset.display = 'anton'`.
5. ~~**Vendors spends three dark surfaces and the system allows two.**~~
   **Resolved 2026-08-19.** Enrique's call: the Únete door came off
   `ground="night"` and onto cream over a hairline, which is how Events and
   Contact already close. Vendors is back to two, the ration in `src/index.css`,
   and every interior page now ends the same way. The two bands added
   2026-08-18 were already light for the same reason.
6. **Form destination.** Undecided, so both forms are deliberately unwired and
   show a visible placeholder on submit.
7. **The story section on Home.** Deliberately plain, most likely to be replaced
   wholesale when Ray's voice notes arrive.
8. **Whether the boxing gym stays in Contact's hero.** The park sign shares its
   pole with Lunas Boxing next door, and its panel sits below Best Bite's in the
   photograph. That is the real sign at the real address; cropping it out
   entirely means cutting "FOOD PARK". Flagged rather than quietly removed.

## Bryan's build is live, and ours is not

`main` auto-deploys to `https://bpcodes1.github.io/best_bite_food_trucks/` on
every push, and it is public and indexable. The repo docs previously said
"nothing is deployed"; Enrique's call 2026-08-12 was to leave it alone, since
his build is not deployed and Bryan's being live is fine.

Two things to remember. If `enrique` is ever merged into `main`, that workflow
fires and publishes our build at the wrong base path, broken. And at launch,
three properties will describe Best Bite differently — the Square site with six
vendors and contradictory hours, Bryan's with twelve including three who left,
and ours with nine. Slawski penalises inconsistent entity information, so
retiring the other two belongs on the launch checklist.

## The QA script — built 2026-08-18

`npm run shots`, at `scripts/shots.mjs`. Every requirement from the 2026-08-17
agreement is in it, each one commented with the round-trip it cost.

**No new dependency.** Node 24 ships a global `WebSocket`, so the DevTools
Protocol client is about forty lines at the top of the file, and Chrome is
already on the machine. No puppeteer, no 300MB browser download.

```
npm run shots                 every address, 375 and 768, both languages
npm run shots -- vendors      one route key
npm run shots -- vendors 1280 that route, at 1280 as well
npm run shots -- es 375       Spanish only, phone only
npm run shots -- --fold       also capture the first screen alone
```

Positional arguments are order-free: numbers are widths, `en`/`es` filter
language, anything else matches a route key.

What it does beyond taking pictures:

- **Refuses to run against a stale `dist/`.** If anything in `src/` is newer
  than the build, it exits rather than photograph the previous build. This is
  the same failure as verifying a deploy against the old build. `--stale-ok`
  overrides.
- **Reports overflow as a number**, and names the widest offending element with
  its class list, so a fix has somewhere to start.
- **Fails the process** on overflow, a broken image, a missing `<title>`, or a
  wrong `<html lang>`. Exit 0 means all four are clean.
- **Rewrites `qa-screenshots/README.txt` every run**, so it can never describe
  an older set.
- Route list is imported from `dist-ssr/entry-server.js`, exactly as
  `prerender.mjs` does, so it photographs the addresses that were generated
  rather than the ones the source says should exist. `ROUTES` and `LANGS` were
  added to that file's exports for this.

**It is not a routing check and says so in its own header.** It serves `dist/`
from a static server it starts itself, so every address answering proves nothing
about Cloudflare Pages. `curl -I` against the live host, and nowhere else.

The reveal is neutralised two ways: reduced motion is emulated through the
protocol, which makes `useReveal` bail before it ever adds `.js-reveal`, and an
`!important` override is injected on top of that. `opacity`, `transform`,
`translate`, `scale` and `rotate` are all pinned, because Tailwind v4 emits the
last three as their own properties.

Not scheduled, does not run on its own, and `qa-screenshots/` is git-ignored.

Baseline 2026-08-18: 20 screenshots, ten addresses at 375 and 768, no overflow,
no broken images, every page titled, every `<html lang>` correct.

## Capabilities now available, that were not before

**Google Drive works.** The connector is authenticated as
`enriquexshipping@gmail.com`. Enrique shared `best_bite > in_person_images` from
`contact@be-techplus.com`. `search_files` works; `list_recent_files` and
`sharedWithMe = true` return "not implemented". Search by `owner = '...'` or
`parentId = '...'` instead. Folder ids: `best_bite` is
`1NThkdnHon7rdG3hJegA36seGlWd9Q9Ls`, `in_person_images` is
`1QUxBd-GJ3pIZ51JMjOU2DM5Lbagx775S`.

Do **not** use the connector to bulk-download photos — it returns base64 through
the conversation and 60 files at 3 MB each is impractical. It is right for
documents and one-off files. For camera rolls, have Enrique drop a zip.

**Gmail and Calendar** are connected but unauthorised. They need enabling in his
claude.ai connector settings.

**Scheduled recurring jobs** — Enrique wants uptime monitoring across his live
sites, naming RHC and The Forge alongside Best Bite. Set up per site once each
is live. Must hit the live domain and assert a marker only the current build
contains; checking for something the old build already had has produced a false
pass here before.

## Blocked on Ray

Everything here is one text message. Placeholders render as visible brackets;
run `npm run pending` (25 at last count — it went up from 15 on 2026-08-19 when
the events lineup gave five undated events somewhere to show, in two languages).

- **Dates for five events**, and this is now the top ask. The lineup on Events
  is a list of dates and **only the cruise has ever been dated.** Easter,
  Christmas, the lotería night, the pupusa class and the coffee workshop all
  render a bracket. The Easter flyer prints "April 5th" with no year, so even
  that one needs him. Ask which year each ran, or just the years.
- **Anything coming up in the next two months.** The lineup holds upcoming
  events and currently shows none, which is the one thing the page cannot fake.
- **Photographs from the cruise on 16 August**, and from any Sunday karaoke
  night. What we have shows a real place with almost nobody in it; the client
  context flags exactly that as the fault on his current site.

- Site phone, site email — **launch blockers**, not nice-to-haves. Shepard
  counts contact information as a positive signal, and visible `[PENDIENTE]`
  brackets on a public page are a trust defect.
- ~~Instagram, Facebook~~ — supplied by Enrique 2026-08-19 and wired, including
  into `sameAs`. **TikTok is still missing**, and the client context says the
  account exists (it is in the Square site's footer), so it is worth asking for
  by name rather than assuming there is none.
- **Tell Ray his Facebook page has no username.** Its address is the numeric
  `/p/...-61584137473837/` form Facebook serves until an owner sets a vanity
  URL. It is harder to find, it cannot be spoken aloud, and it reads as
  unfinished. Setting one is thirty seconds in his page settings, and it changes
  the URL — so the value in `site.ts` has to be updated the day he does it.
- Stall size, what is included, reply time
- A truck photo for **Pupusas Chileros** — the last one missing. Three rules:
  shoot straight on, whole truck in frame, leave room around it for cropping.
  Worth asking for a **replacement Taqueria Romero** in the same message, since
  Bryan's is 680×510 and renders soft.
- **Confirm karaoke is still 6pm–9pm**, and that naming Dj Mike G on the site is
  fine by him. Both are now printed on Events and on Vendors.
- His story for the Home section
- Drone video — last to arrive, drops into the hero as a `<video>`
- **Whether the Asian-cuisine recruiting line still stands.** Que Rollon Sushi
  is on the roster and now has a photograph, but Únete still tells prospective
  vendors the park is "especially looking for Asian food".
- **Confirm parking and seating**, which now print on Vendors and were read off
  photographs rather than stated by him. See "Facts taken from photographs".
- **Does the roster hold at nine?** Syrian House was trading on 2026-08-17,
  five days after being cut. Separately, **his own park sign lists four
  businesses that are not on the roster** — Adan's Grill, El Chilango, Syrian
  House and "J JS Boba" — and omits three that are. Worth telling him regardless
  of the answer: the sign is advertising kitchens that are not there.

## Blocked on Enrique

- **Create the Cloudflare Pages project.** Nothing exists yet — see the section
  below for the order and the two traps.
- **Text Ray the descope offer**, get his yes, send the two-line written recap.
  Bryan already agreed to Option A. Open since 2026-08-10.
- **The domain.** Gates `site.origin`, every canonical, and cutover.
- **GBP overhaul.** Promised "within days of kickoff", ~Aug 5. Two independent
  frameworks make this the highest-leverage search work on the account, above
  anything on the site itself.

## Deployment: nothing exists yet

**Do these in order. Steps 1 and 2 are the traps.**

1. **Point `site.origin` at the `*.pages.dev` URL before the first deploy.** It
   is `http://localhost:5173` today, so a deploy now would publish ten pages
   whose canonical, hreflang, OG and JSON-LD all point at localhost.
2. **Block crawling at the Cloudflare account level, not in `public/`.** An
   `X-Robots-Tag: noindex` in `public/_headers` ships with the build and would
   de-index the real site on launch day.
3. Create the Pages project, connect `bpcodes1/best_bite_food_trucks`, build
   `npm run build`, output `dist`.
4. **Set the production branch to `enrique`.** Defaulting to `main` publishes
   Bryan's build.
5. Set environment variables for **both** Production and Preview.
6. After the first deploy, confirm 11 HTML files and `curl -I` all ten addresses
   on the live host. Never verify routing with `npm run preview`.
7. At cutover, add an account-level redirect from `<project>.pages.dev` to the
   real domain, and retire the Square site and Bryan's GitHub Pages build.

## Traps a new session will fall into

**HEIC breaks sharp.** libheif rejects 24-megapixel iPhone photos with "Security
limit exceeded". Route through macOS `sips` first, and always `.rotate()`.

**A scroll-linked reveal is not the same as a triggered one.** Tying animation
to scroll position means a fast flick completes it in one frame. This was built
wrong once already.

**Screenshots taken mid-transition look like design defects.** Neutralise the
reveal before capturing.

**A prototype served as a raw file needs its own `charset` and `viewport` meta.**
Without them you get mojibake and a 980px layout, and any width measurement is a
lie. Cost two round-trips.

**"Cut off" meant "should fill the screen", not "is too tall".** When feedback is
ambiguous, ask. It costs one message; guessing cost a day.

**Tailwind v4 emits `translate` and `scale`, not `transform`.** A
`transition-[transform,opacity]` animates a property that never changes.

**`--header-h` in `src/index.css` is measured, not guessed.** 80px on phones,
131px from `sm`. Re-measure if the masthead padding changes.

**`site.hours` stays 24-hour** for `openingHoursSpecification`. `hoursRange()`
derives the display string.

**`clients/` is git-ignored and must stay that way.**

**hallmark has been modified on this machine.** Source-refusal rules removed at
Enrique's request. Originals at `~/.agents/skills/hallmark/*.orig`. Re-running
`npx skills add nutlope/hallmark` restores them.

**`hallmark study` in URL mode cannot see CSS.** WebFetch drops stylesheets.
`curl` the raw HTML and the stylesheet separately.

**Both forms are deliberately unwired.** Do not "fix" the placeholder into a
success message.

**The promo slot on Únete renders nothing on purpose.**

### Added 2026-08-18 and 2026-08-19

**`park/park_sign.webp` must never be published.** It is the uncropped park sign
and its vendor board lists Adan's Grill, El Chilango, Syrian House and "J JS
Boba" — none on the roster — while omitting three that are. Use
`park/entrance_sign.webp`, which is cropped above the board.

**"Open" means trading. An empty stall is "free".** The English copy had one
word doing both jobs in five places and it cost a real misreading. The rule is
in `CLAUDE.md`; the story is in `docs/build-log.md`.

**A bilingual QA pass that checks layout will not catch a word doing two jobs
in one language.** Spanish escaped the "open" collision because `abierto` and
`libre` are different words. Layout parity is not copy parity.

**Nor will it catch copy that renders to nobody.** Home's event cards shipped
`sr-only` "When" and "Where" in English on the Spanish page, three times each,
from the day they were built until 2026-08-19. A screenshot cannot show it and a
sighted reader cannot see it. `EventCard` now takes `whenLabel`/`whereLabel` the
way it already took `pastLabel`. **Grep `sr-only`, `aria-label` and `alt=` when
checking a page's Spanish.** Rule added to `CLAUDE.md`.

**Two pages made different claims about the same nine trucks.** Home's story
said most had been there over a year; Únete's lede said every one of them had.
Settled on "most" in both, 2026-08-19, Enrique's call. The client context
supports the year in general terms but not vendor by vendor, and the stronger
sentence sat on the page a truck owner reads to decide whether to trust us.
**When two pages state the same fact differently, the weaker claim wins unless
someone has actually counted.**

**`npm run pending` is a grep over source.** A code comment that quotes the
placeholder helper by name registers as an unfilled placeholder that renders
nowhere. Do not name it in prose. The check is dumb on purpose.

**A hero crop's aspect ratio matters more than how much subject is in it.** The
hero is portrait at 375 and landscape at 1280, so a wide source survives one and
fails the other. Contact's took three attempts. Ladder the crop and look at it at
BOTH widths.

**A status overlay goes wherever it is not covering the client's brand.** The
past-event chip sits top right because both cruise flyers carry the Best Bite
mark top left.

**`npm run shots` does not wait for remote iframes.** Contact's map photographs
as an empty rectangle for that reason and not because it is broken — Enrique
confirmed it paints in a real browser on 2026-08-19. **Do not "fix" the map**,
and do not report the empty box as a defect.

**Home is still the approved reference page and changes there need asking.**
Three sessions' worth of work has now touched it — the leasing door, the flyer
dates, the copy — each time on Enrique's explicit say-so. Keep that pattern.

## Still to do before delivery

1. `site.origin` is still `http://localhost:5173`.
2. **No `og:image` anywhere.** Every share of all ten addresses is a bare text
   card. Use **`park/entrance_sign.webp`**, which is already cropped clean.
   **Never `park_sign.webp`** — that is the uncropped sign and its vendor board
   is wrong.
3. ~~`FAQPage` schema on Únete~~ — done 2026-08-18.
4. ~~Bring the three pages up to Home's standard~~ — done 2026-08-19.
5. **Home's own pass**: Instagram story chrome baked into its school-year event
   flyer. The dates were fixed 2026-08-19; this is what is left.
6. Wire the forms once the destination is decided.
7. `hallmark audit` across all ten addresses.
8. ~~Confirm the Contact map paints in a real browser~~ — confirmed by Enrique
   2026-08-19. It paints. The empty box in screenshots is `npm run shots` not
   waiting for remote iframes, not a site bug.
