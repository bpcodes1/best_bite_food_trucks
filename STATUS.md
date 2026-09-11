# Status — Best Bite Food Park

Where the build actually is. Read this, then `CLAUDE.md`. Read `design.md` before
designing anything, and `docs/build-log.md` only when you need to know **why**
something is the way it is.

**This file is deliberately short.** It was 67 KB on 2026-08-19 and every session
paid ~17,000 tokens to read it before doing any work. The reasoning behind every
past decision moved to `docs/build-log.md`; what stayed here is the state a new
session needs before it can act. **Keep it that way** — when a section stops
describing what is true now and starts describing how it got that way, move it.

**Last updated:** 2026-09-11.
**Branch:** `enrique` (never `main` — `main` is Bryan's, unrelated work).
**Deadline:** passed and irrelevant. The project is DELIVERED AND PAID.

A word on "shipped" in this file: it means built and committed to `enrique`.
**Nothing on this branch has been delivered to Ray and nothing on it is on the
internet.** The live site is Bryan's build — see the session below.

---

## SESSION 2026-09-07 → 09-09 — paid in full, and Spanish now exists to Google

**NEXT TASK is business-side: Ray's October billing, due ~09-25.** The amounts,
the customer record, and the watch item that decides whether it is easy all live
in `ai-fundamentals/core-files/business-state.xml`, loop "Best Bite / Ray".

**This repo is public on GitHub, so money never goes in this file.** No totals,
no invoices, no customer ids, no other client's deal. Four commits carrying all
of that were caught unpushed on 2026-09-11 and rewritten before they reached
the remote.

### What shipped to the LIVE SITE this session (all on `bryan`, all verified)

Every push to `bryan` is a production deploy. Three landed:

- **Gas removed from the leasing copy**, four strings across both languages.
  Cynthia confirmed there is no gas line. The page had been claiming gas was
  hooked up and included while the same paragraph told prospects "the only thing
  you bring is propane" — it contradicted itself and a prospect could have
  leased on the strength of it.
- **Spanish got its own addresses.** PR #1, the repo's first ever. Six pages now
  answer at twelve; English addresses did not move.
- **Syrian House Cuisine's split shift**, plus the shape change that allows one.

### The bilingual defect, which is the thing worth understanding

The delivered site served six addresses, every one declaring `lang="en"`, with
Spanish held in browser memory by a toggle that never changed the URL. **Google
files pages by address, so there was no Spanish page for it to rank.** Bilingual
was a named part of what Ray bought and the search half of it did not exist.

Nobody caught it because **nothing looks wrong**. Both languages rendered, the
copy was good, every screenshot passed, Ray and Cynthia approved it in the
meeting. What was missing was an address, and an address is not a thing anyone
looks at.

**The cause was not Bryan.** The rule against toggles was written out, with its
full reasoning, in `CLAUDE.md` on THIS branch. `origin/bryan` carries no
`CLAUDE.md`, no `STATUS.md`, no `docs/`. He had never seen it, and a toggle is a
reasonable thing to build if nobody tells you otherwise. **A standard that lives
only in the branch that did not ship is not a standard.** Logged as a
transferable rule in `../docs/build-chain.md` § 6.

### Fixed in the same push, each verified against the live host first

- The food-trucks meta description **advertised boba**. There is no boba vendor;
  the only one is commented out of `trucks.ts` because it never opened. A false
  claim on an indexed page.
- **Canonicals had no trailing slash.** Cloudflare 308s `/events` to `/events/`,
  so every crawl paid a wasted hop. Twelve correct URLs now.
- **`public/_redirects` held the SPA splat.** It was doing nothing, since static
  files take precedence, but it is documented to 308-loop on pre-rendered sites
  and six nested paths had just been added under it.
- **`404.html` was a redirect stub.** The status code was already correct, but a
  person following a dead link was thrown to the homepage with no explanation.
  Now a real page with site chrome, marked `noindex`.
- **Eight strings were English on Spanish pages** in the layer nobody sees: two
  nav landmarks, two gallery arrows, four event photo descriptions. Found only
  by grepping. The Spanish test now looks the nav up by its Spanish landmark
  name, so a regression fails the suite instead of shipping quietly.

### Why `hoursByDay` changed shape

Cynthia gave Syrian House Cuisine's real hours: 11am–2pm **and** 5pm–9pm, a
lunch service and a dinner service with the truck shut between. The field held
one `[opens, closes]` pair per day and **there was no correct value to put in
it.** Flattening to 11am–9pm tells someone the kitchen is serving at 3pm; leaving
11am–2pm is what shipped, and it reported them closed right through dinner, the
busier half of their day. Each day now holds a LIST of windows. The decision
moved to `src/lib/hours.ts` as a pure `isOpenAt()` with five tests on it,
including the exact regression. Test count went 9 → 14.

### Decisions made, with the reasoning

- **`/es/food-trucks` keeps the English term.** Enrique proposed
  `/es/camion-de-comida`; DataForSEO overruled it. Oregon, Spanish-language
  searchers: "food trucks salem oregon" 880/mo, "camiones de comida salem" no
  measurable volume. The site's own Spanish nav already said "Food Trucks". **Do
  not "fix" this later.**
- **The `/join-the-park` slug is NOT worth changing.** It was flagged as a
  half-optimised money page, its title chasing "Lease a Food Cart Space in
  Salem" while its address said a brand phrase. The data killed it: every Salem
  vendor-side term returns no measurable volume. **That page is a conversion
  page, not a search page** — vendors arrive from the Google profile, from
  driving past, from Ray. Where the volume actually is: "food truck park" 3,600
  and "food cart pod" 1,600 statewide, July running roughly double January.
- **Ray's language recorded for the first time**: Spanish, tú register,
  Enrique's own regional dialect for texts; usted for formal documents. The
  "correspond in ENGLISH" note belongs to **Cynthia's** block and had been
  misread as Ray's.

### Corrections made to these files, so they are not re-made

- **The `pages.dev` twin is RETIRED**, done 2026-09-07, verified 09-09 on the
  homepage and deep paths. This file's old `[OPEN]` line was stale and got
  repeated back to Enrique as outstanding. Do not reopen it without curling a
  deep path.
- **Ray's email habit was overstated.** The context file said "emails he will
  most likely not see." He monitors email; it is just easy for him to miss
  something, so a text should point at anything important. The rule is BOTH, not
  either.
- **Keyword Planner on a dormant Ads account gives RANGES, not exact numbers.**
  Enrique was told it was a free substitute for DataForSEO. It is not, for
  choosing between similar terms.

### Still outstanding on the live site

- `RecentEventGallery` is hardcoded and still shows the back-to-school cruise.
  Waiting on Lowrider Cruise In photos from Cynthia. **The 2026-09-06 Cafecito
  never happened — rained out.**
- The broken GitHub Pages build and the Square site are still up.
- Cloudflare Email Obfuscation stays on. Enrique's call.

---

## SESSION 2026-09-06 — what moved, and the one next task

**[DONE 2026-09-08 — this was the next task and it is no longer. The current one
is at the top of this file.]** Text Ray to arrange collecting the balance and
set up October billing. The text went 09-07 and the balance was collected in
person 09-08. **October billing is the only part still outstanding**, tracked in
`business-state.xml`.

Everything below in this section is new today. Read it before anything else,
because the site changed twice and both changes are live.

**Ray and Cynthia approved the site on 2026-09-03.** First real client approval
on this project. The retainer is month to month; its rate lives in
`business-state.xml`, not here.

**Two pushes to `origin/bryan`, both live and verified on bestbitefoodpark.com.**
Enrique's call to stop waiting for Bryan and do it himself. Work happened on a
new branch, `enrique-on-bryan`, in a git worktree at
`../Best_bite_bryan_build`, so this branch was never touched.

- **`b22d474`** — the leasing page contradicted Ray's real terms in fifteen
  places. It offered a six-month contract in the promo banner while promising
  month-to-month and "nothing to sign" in the heading, CTA, FAQ, form
  reassurance and the join-page meta description. A prospect could read "no
  commitment", call, and be handed a six-month contract. Now states the real
  terms in both languages: six-month commitment, $750/mo for the first three,
  $1,000/mo for the last three. Space corrected from 25 ft WIDE to 25 ft IN
  LENGTH. Used oil disposal added. Live music removed sitewide, since Cynthia
  confirmed karaoke and the Sunday DJ have ended. Home meta description had
  hardcoded 12pm-8pm hours and now reads 9am-8pm. Recruiting copy widened from
  "especially Asian food" to anything adding variety. Promotion framing dropped
  entirely, including a "Limited-time promotion" eyebrow that rendered outside
  the active/inactive branch and so showed regardless.
- **`88064f7`** — live open/closed badge on the vendor cards, ported from this
  branch's `OpenStatus.tsx`. Adan's Grill photo replaced, 382x286 to 1200x900.

**Hours are now held twice on `origin/bryan`.** `hours` is the sentence; a new
`hoursByDay` is machine-readable ranges the badge computes from. Every range was
derived from that branch's own strings, then verified by rendering them back
into English and diffing against each truck's sentence. All ten matched.
Pupusas Chileros deliberately has none: no truck yet, so the badge says "Hours
pending".

**Facts settled at the meeting.** Fifteen total spaces, not fourteen. Eleven
vendors, and NINE IS A DEAD NUMBER that still appears in `src/lib/vendors.ts` on
this branch and in `docs/build-log.md`. La Flauta PDX and El Chilango are both
out. Reply time 24-48 hours. Cynthia answers every form inquiry. Pupusas
Chileros has no truck yet, which is why its card carries the logo and no hours,
and that card is correct as it stands.

**Client comms.** Cynthia emailed 2026-09-06 (one-line record in
`../best-bite-project/clients/ray-bestbite-context.xml`, emails_to_cynthia).
Ray's retainer package emailed the same day
(`../best-bite-project/clients/ray-retainer-email-2026-09-03.md`), which doubles as the written scope
recap. Ray already knew about the descope from a verbal on 2026-08-19, so the
recap is a formality rather than news.

## READ THIS FIRST: this branch was not the one delivered

**Bryan's build is what Ray got.** Ray and Cynthia approved it on 2026-09-03,
and it is live at bestbitefoodpark.com. Everything below describes a practice
build, not the deliverable — read every to-do list in this file with that in
front of it.

**This branch is no longer a fallback.** It was kept presentable from 2026-08-25
in case Ray turned Bryan's build down at presentation. He approved it instead,
so that reason is gone. Nothing here ships unless that is decided fresh, with
Ray, and then § "Deploying THIS branch" below is the order.

**What it is now: Enrique's practice reps and material for `swipe/`.** That is a
legitimate reason to work on this branch and does not need re-justifying each
session.

**Do not delete it.** It is where the live build's improvements have come from
(the open/closed badge was ported from `OpenStatus.tsx` here), and it carries the
project's only `CLAUDE.md`, `STATUS.md` and `docs/`. `origin/bryan` has none.

## Where this branch stands

**Everything is committed and pushed (2026-09-11).** Read the current hash from
`git status`, not from this file; a hash written here is stale on the next
commit. All five pages pass the seven-point
checklist below. `dist/` has 11 HTML files, 16 tests pass, lint clean,
`npm run shots` reports no overflow in either language.

Three jobs left on this branch, all of them ours rather than the client's. **None
is urgent any more** — they were sized against a delivery date this branch no
longer owns:

1. **`og:image`.** Every share of all ten addresses is a bare text card.
   `events/cruise_lowriders.webp` is the candidate — lowriders in the lot, a
   person in frame, and the only asset that looks like something happening.
   `park/entrance_sign.webp` is the fallback, already cropped clean of the
   out-of-date vendor board. **Never `park_sign.webp`.**
2. **`hallmark audit` across all ten addresses.** Nothing has been audited since
   the pages were rebuilt, and the audit is what catches drift from `design.md`.
3. **Wire the two forms**, once Enrique settles where they send.

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

**Nothing from this branch has ever been deployed.** Every "verified" line here
means verified locally, because this build has no live host. The live site at
bestbitefoodpark.com is Bryan's build; see "THE SITE LAUNCHED" below.

---

## Assets — what is missing and what must never ship

**One vendor still has no truck photograph: Pupusas Chileros.** Nothing in the
63-photo set covers it and nothing on any branch does either. It has to come
from Ray. Its card carries the logo wash panel and holds its shape, which is
exactly what that treatment exists for. Eight of nine cards have a photograph.

### Provenance of the four event photographs is UNVERIFIED

`cruise_lowriders`, `easter_egg_hunt`, `hall_christmas` and `loteria` all came
off `origin/bryan` on 2026-08-19 and are all on the Events page now. **Nobody has
confirmed who shot them.** They are 1320px on the long edge, which is Instagram's
export width, so the likeliest story is that Bryan downloaded them from the
park's own account rather than taking them himself. The three park photographs
beside them in the grid are different: `wagon_planter` is a 4284×5712 iPhone
original and the two tent shots came out of Enrique's own 2026-08-17 set.

This matters because the 2026-08-18 harvest was verified deliberately — Enrique
confirmed Bryan shot those, and each truck was matched against its own signage
rather than against a filename, on the rule that **a filename is a claim and not
evidence.** The same check was not run here.

It is very likely fine: they are Ray's own marketing either way, and the site is
Ray's. But "very likely fine" is what the rule exists to stop. **Ask Enrique
whether Bryan shot these or pulled them**, and if pulled, that is one more reason
to ask Ray for originals — the downloads are compressed and one of them needed a
caption cropped off.

### Three assets are now orphaned, and one of them by today's work

Nothing imports `best_bite_inside.jpeg`, `events/cruise_into_the_school_year.png`
or `events/back_to_school_cruise_full.webp`. Vite only bundles what is imported,
so none of them ship — they are repo weight, not page weight.

**The last one was orphaned by the Events rebuild on 2026-08-19.** It was kept as
a deliberate second copy of a flyer Home already had, because Home's `focus`
value is tuned to a nearly-square crop and this one is portrait. The lineup now
uses the cruise _photograph_ instead of the flyer, so that reasoning is void.
Recorded here so nobody reinstates it from `docs/build-log.md`, where the old
justification still stands unqualified.

### Never publish these

- **`park/park_sign.webp`** — the uncropped park sign. Its vendor board lists
  Adan's Grill, El Chilango, Syrian House and "J JS Boba", none on the roster,
  and omits three that are. Publishing it puts a wrong vendor list on the site
  inside a photograph, where nobody would think to check.

### The four on `origin/bryan` were downgraded 2026-09-03

They are **live on the production events page** and were previously listed here
as never-publish. That was overstated. They are client-supplied assets, Enrique
confirmed 2026-09-03, and a client sending an asset is a point in its favour that
the earlier note ignored. Re-graded:

- **`giveaway`** — a Louis Vuitton box. Previously called "another company's
  trademark on Ray's commercial page." **That was wrong**, or at least far
  stronger than the evidence. If the park ran that giveaway, a photo of the prize
  is ordinary marketing and the trademark risk is negligible; nobody is passing
  off or selling LV goods. The only real objection was always editorial — it says
  nothing about a food park. **Taste call, not a defect. Ray's to make.**
- **`mycelium`** — a flyer reading "Mycelium Meeting, 2/23 6:00-8:00pm", no Best
  Bite branding on it. **This is an open QUESTION, not a finding: did the park
  host that meeting?** If Ray rented the hall to a mushroom group, it is a
  legitimate past event and there is no issue at all. If it merely landed in the
  photo pile, the page is claiming an event the park did not host. One question to
  Ray settles it. Do not assert either way.
- **`easter2`, `loteria2`** — the same events already listed, in the versions with
  promo text burned in, so Easter and Lotería each appear twice on the page.
  Untidy, not broken. Editorial.
- **`jarochitas`** — the one with a residual real issue, and it is small: the
  TikTok watermark and `@lasjarochitas1` point visitors from the park's page at a
  vendor's own account.

**The general rule this corrects:** a past event sitting in a section labelled
"Past Events" is that section working correctly, not a defect. Content freshness
is the client's side of the retainer. What stays ours is code that reads the clock
wrong — see the events-page findings under the live-defect section.

`park/park_sign.webp` above is **unaffected** and still never publishes. Its
objection is a verifiable factual error inside the photograph, not taste.

## The seven-point checklist every page is scored against

Home is the reference and this is what "Home's standard" means, checkably. The
reasoning behind each item is in `docs/build-log.md`.

**Score it by looking, not by reading the source.** Run `npm run shots -- <page>`
and check the rendered page against these, in both languages:

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

## THE SITE LAUNCHED. bestbitefoodpark.com is live.

**Recorded 2026-08-31.** Bryan bought the domain and cut Best Bite over to
Cloudflare Pages on 2026-08-27 (`6b8a661` "Prepare for CloudFlare Pages"). It is
serving the real production site now. Verified 2026-08-31: all five routes return
200 (one 308 to the trailing slash, then 200), assets resolve, canonicals and the
sitemap point at the real domain.

**Neither Ray nor Cynthia knows it is live** (Enrique, 2026-08-31). Nothing has
been presented and nothing has been delivered. The Google Business Profile has
not been touched, so nothing points at the new site yet.

Every earlier line in this repo saying "nothing is deployed" and "no Cloudflare
project exists" is superseded. **The shared rule now applies here: every push to
`bryan` is a production deploy.** It was not true on this project before; it is
now.

### Four properties describe Best Bite right now

1. **`bestbitefoodpark.com`** — the real site. Correct.
2. **`best-bite-food-trucks.pages.dev`** — the Cloudflare twin. **Retired
   2026-09-07**: it and every branch-preview subdomain 301 to the real domain,
   deep paths included (re-verified 2026-09-11).
3. **`bpcodes1.github.io/best_bite_food_trucks/`** — **BROKEN AND PUBLIC.**
   `base` changed to `/` for Cloudflare, so on the subpath its CSS and JS both
   return 404. The HTML still serves, unstyled. It still auto-deploys on every
   push to `bryan`. Anyone holding the old link sees a broken site. This is not
   an SEO problem, it is a live broken page.
4. **`bestbitefoodpark.square.site`** — still up, still says six vendors with
   contradictory hours.

Retiring 3 and 4 is still open. Slawski penalises
inconsistent entity information and one of them is simply broken.

## The old GitHub Pages history

Was live at `https://bpcodes1.github.io/best_bite_food_trucks/`, public and
indexable. Verified 2026-08-25 against `origin/bryan` `e702008`: all six URLs in
its sitemap return 200, and `robots.txt` says `Allow: /`.

**Two GitHub Actions workflows publish to that one address**, and they race.
`origin/main`'s `deploy.yml` fires on a push to `main`; `origin/bryan`'s fires on
a push to `bryan`. Same destination, so **whoever pushed last is what the public
sees** — not whoever pushed first. Bryan's is showing today only because he
pushed this morning and nothing has touched `main` in two weeks.

**The live danger: if `enrique` is ever merged into `main`, `main`'s workflow
fires and replaces Bryan's live site with ours, at the wrong base path, broken.**
This build expects to sit at a domain root; Bryan's is built for the
`/best_bite_food_trucks/` subpath. Deleting `main`'s workflow would close this
permanently — proposed 2026-08-25, **not done**, and it is a change on a branch
that is not ours.

At launch, three properties will describe Best Bite differently — the Square site
with six vendors and contradictory hours, Bryan's with twelve including three who
left, and ours with nine. Slawski penalises inconsistent entity information, so
retiring the other two belongs on the launch checklist.

### What is still wrong on the live production site — updated 2026-09-06

Verified against the rendered live pages, not the source.

- **`public/_redirects` carries `/* /index.html 200`** on a pre-rendered site.
  The documented 308-loop **did not fire** — all five routes were traced and each
  is a single 308 to the trailing slash then 200. It is not breaking anything
  today. It still should not be there.
- **`public/404.html` meta-refreshes to `/`.** A real 404 silently becomes the
  homepage. That is a soft-404, and broken links never surface as broken.
- **Sitemap URLs have no trailing slash**, so every crawled URL takes a 308 hop
  it does not need.
- **`RecentEventGallery.tsx` is fully hardcoded** — poster, four photos and
  their labels written into the component, no date logic. It still shows the
  back-to-school cruise and cannot self-update. Waiting on photos from the
  2026-09-05 Lowrider Cruise In or the 2026-09-06 Cafecito. Worth making it read
  from the events data later so it follows dates the way the calendar does.
- **Cloudflare Email Obfuscation** rewrites the footer address to
  `[email protected]`. Smaller than first reported: the JSON-LD carries the real
  address in the clear, so Google gets it. Costs only the mailto link for
  visitors without JavaScript. Toggle lives in Scrape Shield. Enrique's call was
  to LEAVE IT ON, since the spam protection is worth more.

**The events calendar month is NOT a bug to chase.** `const today = new Date()`
sits at module scope in `Events.tsx`, so the month gets frozen into the static
HTML at build time and drifts until the next deploy. A real visitor always saw
the correct month, because that line re-runs in the browser. Only crawlers and
the pre-JavaScript paint see the stale one. Fixing it properly trades a stale
month for a visible flash. Leave it.

**Cleared 2026-09-06:** park hours now 9am-8pm live and in the schema, and
`totalSlots: 15` is confirmed correct by Ray and Cynthia rather than assumed.

Cleared since the 2026-08-23 report: the fake phone, the invented email, the
malformed hours table, per-page titles, `sitemap.xml`, `robots.txt`, crawlable
deep pages, and the TikTok link. **The Facebook link was verified by Enrique
2026-08-31 — it lands on the correct page** despite having no username.

### Enrique now pushes to Bryan's branch too — use the worktree

**`../Best_bite_bryan_build` is a git worktree of this repo, cut from
`origin/bryan`.** Its local branch name changes per task (`enrique-on-bryan` on
09-06, `syrian-house-split-hours` from 09-09); what matters is that it pushes
with `git push origin HEAD:bryan`. Created 2026-09-06 so Enrique
could fix the live site without waiting for Bryan and without touching this
branch. It has its own `node_modules`; do not run `npm ci` again unless
something breaks.

Working there means: edit, `npm run build`, look at it, then
`git push origin HEAD:bryan`, which deploys to bestbitefoodpark.com within
about thirty seconds. **Fetch and confirm a fast-forward before every push** —
Bryan pushes to that branch too. Both pushes so far were clean fast-forwards.

**Bryan has not been told his branch moved.** He pushed five times on
2026-09-03 and will not expect it. Both commits carry their reasoning in the
body so a pull explains itself, but he still needs a message.

### Bryan's QA report is retired

`QA-REPORT-bryan.md` audited `origin/bryan` at `4e6776c` on 2026-08-23 and was
deleted 2026-09-11, never having reached GitHub. It was about thirty commits
stale and most of its findings are cleared above. Its one lead-costing item, two
lead forms sending to unverified inboxes, is **closed**: both forms deliver to
Cynthia, who runs them, and they have been tested (Enrique, 2026-09-11). If a
current verdict is wanted, run a fresh audit against the live `bryan` tip and
name the commit; do not resurrect the old report.

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

## Blocked on the client — and the channel changed on 2026-08-25

**Cynthia is now the point of contact, during the build, by email.** Ray hired
her to run the business side of Best Bite and gave Enrique her details on the
2026-08-19 call. Ray knows we are going to her. This **supersedes** the client
context file, which recorded her as post-delivery only with the instruction
"don't chase it during build" — that line is now wrong and the file needs
updating.

Routing, per Enrique 2026-08-25:

- **Everything below goes to Cynthia, by email.** Including items that look like
  owner decisions — she may simply know, and if she does not, she reports back to
  Ray herself.
- **Ray still gets texted directly for the few that genuinely need him**, kept as
  a short separate list rather than buried in the email. His own rule stands:
  text, not email — he will most likely not read email.

Everything here was previously scoped as one text message to Ray. Placeholders
render as visible brackets;
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

- ~~**Which build gets the domain, and therefore which host.**~~ **Settled.**
  Bryan's build has bestbitefoodpark.com, on Cloudflare Pages, since 2026-08-27.
- ~~**Create the Cloudflare Pages project.**~~ **Exists**: `best-bite-food-trucks`,
  production branch `bryan`.
- ~~**Text Ray the descope offer**~~ **Done.** Told on the 08-19 call, the full
  picture in person 09-03, in writing in the 09-06 retainer email.
- ~~**The domain.**~~ **Bought and live.** This branch's `site.origin` stays
  `localhost` because this build is not deployed.
- **GBP overhaul.** Promised "within days of kickoff", ~Aug 5. Two independent
  frameworks make this the highest-leverage search work on the account, above
  anything on the site itself.

## Deploying THIS branch: not planned — kept in case it ever is

**The Cloudflare Pages project exists and serves Bryan's build** (project
`best-bite-food-trucks`, production branch `bryan`). A push to `enrique` already
triggers a Cloudflare branch-preview build, but its address redirects to the
live domain, so it is invisible. If this build ever replaces Bryan's, that is a
change to the existing project, not a new one, and the traps below still apply.

**Do these in order. Steps 1 and 4 are the traps.**

1. **Point `site.origin` at `https://bestbitefoodpark.com` before any production
   build of this branch.** It is `http://localhost:5173` today, so deploying now
   would publish ten pages whose canonical, hreflang, OG and JSON-LD all point
   at localhost.
2. **Control crawling at the Cloudflare account level, never in `public/`.** An
   `X-Robots-Tag: noindex` in `public/_headers` ships with the build and would
   de-index the real site.
3. Confirm the existing project's build settings: `npm run build`, output `dist`.
4. **Switching the production branch from `bryan` to `enrique` IS the cutover.**
   The next build replaces the live site. Only with Ray's yes.
5. Set environment variables for **both** Production and Preview.
6. After the first deploy, confirm 11 HTML files and `curl -I` all ten addresses
   on the live host. Never verify routing with `npm run preview`.
7. The `pages.dev` redirect already exists. Retire the Square site and Bryan's
   GitHub Pages build if they are still up.

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

## Still to do on this branch

Not a delivery checklist: Ray approved Bryan's build on 2026-09-03. This is what
is unfinished on the practice build. Items 1 and 2 only matter if it ever goes
somewhere public.

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

## Proposed but not built: `npm run audit`

**Does not exist. It is an idea, not a tool.** Raised 2026-08-20 and left
undecided; roughly an hour of work. A script at `scripts/audit.mjs` beside
`pending`, `images` and `shots`, catching the classes of defect this project
keeps producing:

- **Copy written but never rendered.** `practicalH` sat in both languages on
  Vendors and reached no page; the mono kicker above it had been carrying the
  headline's job. Needs real parsing of each page's `copy` object, not a grep —
  a grep prototype flagged nine things and most were the data arrays, not copy.
- **English inside a Spanish page.** Hardcoded strings in `sr-only`,
  `aria-label` and `alt`. Home shipped two of them six times over.
- **Orphaned assets.** A grep prototype found three and got it exactly right, so
  this part is cheap.
- **The checklist counts per page** — eyebrows, arrows, dark surfaces — as a
  printed report and never a pass/fail. 2026-08-19 established that the arrow
  rule needs judgement: three glyphs on Vendors was correct and three on Contact
  was not, and no counter can tell those apart.
