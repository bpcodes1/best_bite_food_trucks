# Status — Best Bite Food Park

Where the build actually is. Read this, then `CLAUDE.md`, then `design.md`.

**Last updated:** 2026-08-17 (Vendors built and shipped; 63 in-person photos landed)
**Branch:** `enrique` (never `main` — `main` is Bryan's, unrelated work)
**Deadline:** ~Sept 2 (four weeks from the ~Aug 5 clock start)

---

## START HERE NEXT SESSION

1. **Answer the open question below about the silver cart**, then finish placing
   the in-person photos. Everything is staged and the path is written out.
2. **Build `npm run shots`.** Agreed with Enrique 2026-08-17 and not yet done.
   See "The QA script" below — it exists five times as throwaway code and needs
   to exist once as a committed script.
3. **Add the new sections to Vendors.** Enrique approved two: a practical strip
   and a karaoke teaser. See "Vendors: agreed next changes".

## Where we are

**All five pages are built in both languages.** Home, Vendors, Únete al Parque,
Events, Contact, plus chrome. Vendors shipped 2026-08-16 and was the last one.

Home is the reference for how the site should look. Únete, Events and Contact
still predate the 2026-08-12 design changes and are a generation behind.

## Built and verified

|                 |                                                                           |
| --------------- | ------------------------------------------------------------------------- |
| Scaffold        | Vite + React 19 + TS + Tailwind v4, pre-rendered to 11 HTML files         |
| Addresses       | 5 pages × 2 languages, all deriving from `src/lib/routes.ts`              |
| Chrome          | Masthead nav + statement footer, both derived from `routes.ts`            |
| Home            | Full-screen hero, tinting fan gallery, events grid, story, door           |
| Vendors         | **BUILT** — hero, nine cards, open/closed badge, scroll reveal, door      |
| Únete al Parque | Built EN + ES. Design predates the 2026-08-12 rules                       |
| Contact         | NAP, map, form, cross-door to Únete, LocalBusiness schema                 |
| Events          | Built on the three real flyers, dated events in a data array              |
| Type            | Archivo Black / Source Sans 3 / IBM Plex Mono, self-hosted, latin subsets |
| Schema          | LocalBusiness on Home + Contact; ItemList of nine vendors on Vendors      |
| Tests           | 16, across `routes.test.ts` and `vendors.test.ts`                         |

Verified 2026-08-16: build passes, lint clean, 16 tests, 11 HTML files, all nine
vendors present in the raw HTML with JavaScript off, no horizontal overflow at
375 or 768 in either language. Screenshots in `qa-screenshots/vendors/`.

**Nothing has ever been deployed.** Every "verified" line means verified
locally. No live host exists to check against. (Bryan's separate build IS live —
see "Bryan's build is live" below.)

---

## The in-person photos — 63 landed 2026-08-17

Enrique shot the park. The zip is at `src/assets/in_person_images.zip`, **219 MB,
now git-ignored** along with all `.heic`. The repo is not the archive: convert
what you need into `src/assets` and leave the originals out.

They are 24-megapixel iPhone HEIC. **sharp cannot read them** — libheif rejects
them with "Security limit exceeded" because of the pixel count. Use macOS `sips`
to convert, then sharp to resize and compress:

```
sips -s format jpeg -Z 2000 IMG_XXXX.HEIC --out staged.jpg
# then sharp().rotate().resize(1400).webp({quality:72})
```

`.rotate()` is not optional — a lot of these carry EXIF orientation and come out
sideways without it.

### What is in them, identified from contact sheets

| Photos    | What                                                       |
| --------- | ---------------------------------------------------------- |
| 7974–7978 | **Las Cuatas Lokas** — green trailer                       |
| 7979–7984 | **Las Jarochitas** — red truck under the pergola           |
| 7985–7987 | **Que Rollon Sushi** — the black step van                  |
| 7988–7991 | **The Red Marino** — white trailer                         |
| 7992–7995 | **UNIDENTIFIED silver serving cart** — open question below |
| 7996–8004 | Blue and white tent, picnic tables — park atmosphere       |
| 8005–8008 | Wooden wagon planter, lot views                            |
| 8009–8012 | Hand-wash station                                          |
| 8013–8014 | Wide shots of the lot with the tent                        |
| 8015–8031 | **The Best Bite park sign**, many angles, high resolution  |
| 8032–8036 | Restroom trailer                                           |

Que Rollon carries no name badge on the van. It was identified by the phone
number printed on its menu board, (503) 991-8991, matching the number on its
logo in `src/assets/food_trucks/`. Not a guess.

### Already pulled into the repo

Four truck photos, wired into `vendors.ts` and live on the page:
`las_cuatas_lokas_truck.webp`, `las_jarochitas_truck.webp`,
`the_red_marino_truck.webp`, `que_rollon_sushi_truck.webp`.

Three park photos staged for the sections that do not exist yet, in
`src/assets/park/`: `seating_tent.webp`, `lot_wagon.webp`, `park_sign.webp`.

**Six of nine vendors now have a truck photograph.** Café Chula and El Patrón
came from Bryan earlier; the four above are new.

### Still missing a photo

Pupusas Chileros, Nieve Casera, Taqueria Romero — unless the silver cart is one
of them.

### Two things the photos revealed

**The park sign is out of date.** Its vendor board still lists Adan's Grill and
El Chilango, both cut from the roster. Worth telling Ray; it is his sign, not
our page.

**The sign shots are a stronger hero candidate than what Home currently uses.**
Home's hero is `best_bite_sign.jpg` at 1024×576, the lowest-resolution asset in
the repo. `park_sign.webp` is far better. Not swapped — Home is Enrique's
reference page and nothing changes there without asking.

---

## Open decisions

1. **What is the silver cart in photos 7992–7995?** Blocks finishing the photo
   pass. It is a small aluminium serving cart with photo menus and an OPEN sign.
   Could be Pupusas Chileros, Nieve Casera or Taqueria Romero.
2. **Whether to delete `src/assets/in_person_images.zip`.** It is git-ignored so
   it is harmless, but it is 219 MB sitting in the working tree. Enrique has not
   said.
3. **The English `lease` slug.** Currently `/lease-a-space`. Roof's framework
   says put the target keyword in the URL of a new page and never change it once
   the page has authority — so this is now time-boxed to before cutover, not
   before delivery. Target is "food cart space for rent salem".
4. **Display face — leaning Archivo Black, not closed.** Anton stays wired:
   `document.documentElement.dataset.display = 'anton'`.
5. **Form destination.** Undecided, so both forms are deliberately unwired and
   show a visible placeholder on submit.
6. **The story section on Home.** Deliberately plain, most likely to be replaced
   wholesale when Ray's voice notes arrive.

## Vendors: agreed next changes

Enrique approved these 2026-08-16, none built yet:

- **A practical strip** — address, hours, parking, seating in one dense band.
  Contact owns this too, but making someone leave the page to find out where the
  park is fails Laja's reduce-the-user's-work test.
- **A karaoke-every-Sunday teaser** linking to Events. A reason to come that is
  not food, and already true.
- **Bigger cards.** Three options, in order of impact per effort: widen the
  container from 1152 to ~1280 (one number, cards go 355px → ~400px); change the
  card image from 4:3 to 4:5 so the photograph gets taller without touching the
  grid; or drop to two columns at desktop. Recommendation was aspect + container,
  keeping three columns.

`src/assets/park/seating_tent.webp` and `lot_wagon.webp` exist for the practical
strip and any atmosphere section.

## How Vendors is built, and why

Shape settled on a **throwaway prototype first**, not in production code — on a
bilingual pre-rendered site every rejected attempt otherwise costs both
languages, ten generated files, tests and four screenshots. Two card treatments
went to Enrique and he picked the photo-led one.

**The name always sits inside the media area**, photograph or not. A card
without one gets a wash panel carrying its logo and the name holds the same
position, so nothing moves when a photograph arrives. An earlier pass dropped
the name below the box when there was no photo; a grid whose titles jump
position reads as broken.

**The hero is NOT full screen.** It is `100svh − header − 6rem`, so the top of
the roster shows on landing. design.md reserves the whole viewport for Home
because every page taking it makes every page feel like a homepage, and Enrique
agreed when it was put to him. The peek is also what tells a reader there is
more below.

**The open/closed badge cannot be pre-rendered.** Baking it into a static file
would publish a page confidently claiming "open now" for however many days sit
between a build and a reader. It renders after mount, in Salem time rather than
the visitor's, and loses nothing without JavaScript because the full hours are
printed as text in the HTML. This is why `vendors.ts` holds hours twice —
the vendor's own sentence and machine-comparable ranges. Tests pin them together.

**The reveal is time-based, not scroll-linked.** The first version used CSS
`animation-timeline: view()`, which ties the animation to scroll position, so a
fast flick on a phone finished it in one frame and Enrique correctly reported
seeing nothing. It now matches the reference: triggers once on entry, plays on a
timer. `src/lib/useReveal.ts`, an IntersectionObserver and a class name, not a
library. The hiding rule only exists once JavaScript adds `.js-reveal`, so the
page can never render blank.

**Open is a filled brand-yellow chip, closed is a muted outline.** Not green and
red — that would be two new brand colours, and this reads better anyway.

**What is deliberately NOT on the page**, because each looks like an omission:
no ratings or review counts (three Google reviews total, none per vendor), no
prices (Ray's call), no promotions (Ray confirmed none), no ordering links (no
vendor URL exists in the repo), no cuisine filter (seven of nine are Mexican, so
a cuisine browse would turn the gap Ray is closing into the page's navigation).

## The design references, for the swipe file

Two, both supplied by Enrique 2026-08-16. **The repo previously recorded zero
URLs for any design source** — Sunbeam Bagels, Kado and an events grid are named
in design.md with no link and cannot be recovered.

**Foogra** — Restaurants Directory & Listings Template by Ansonika, ThemeForest
item 25074949. `https://themeforest.net/item/foogra-restaurants-directory-listings-template/25074949`

- Card structure came from `http://www.ansonika.com/foogra/grid-listing-filterscol-full-width.html`
- The scroll reveal came from `http://www.ansonika.com/foogra/demo.html` — the
  template's showcase index. **Its listing pages have no reveal at all.**
  Different pages, one thing taken from each.
- Their reveal: WOW.js + Animate.css `fadeInUp`, 0.5s, `data-wow-delay` stepped
  0.2/0.4/0.6s. Middle-then-right-then-left is our specification, not theirs.
- Taken: name inside the picture over a bottom-anchored scrim; a chip in the
  image corner; read order of identity-in-picture then facts-below.
- Not taken: ratings, review counts, price tiers, discount ribbons, Poppins,
  Bootstrap, three icon fonts, their spacing scale.

**Dribbble** — "Restaurant Directory and Listing Website UI Design",
`https://dribbble.com/shots/27159242-Restaurant-Directory-and-Listing-Website-UI-Design`

- Contributed exactly one thing: open/closed as a first-class card element.
- Not taken: the purple, green/red status, star ratings, price tiers,
  featured/popular/new flags, free delivery, save hearts, reservations, the
  browse-by-cuisine grid.

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

### The head-to-head, already done

A scorecard comparing both builds against Roof, Shepard, Slawski and Laja is
published at `https://claude.ai/code/artifact/252e684c-3c03-4eae-a150-377246fad1f9`.
Verdict: the pre-rendered build leads, because **our gaps are edits and
Bryan's are architecture.** Measured: his site ships 21 bytes of text to a
crawler without JavaScript against our 767–2,563; one title across six pages; no
canonicals, hreflang or schema; 10.1s to first paint on throttled mobile against
our 2.7s; 420px of sideways scroll at a 375px viewport.

Three findings went against our build and two are still open: the leasing CTA
sits at 84% down Home against Bryan's 10%, and Home pulls 1.1 MB on first load.
The third, a keywordless H1, applies to both.

**The finding that reframes everything:** searching both target queries shows
Google ranking _aggregators_, not individual food park sites. FoodParks.io,
Yelp, Travel Salem. The Yard's own site appears in neither. So the highest-
leverage search work is off the website — the Business Profile overhaul and the
FoodParks.io listing, both already in the proposal.

## The QA script — agreed, not built

Enrique approved building `npm run shots` on 2026-08-17.

The problem it solves: the browser-driving code for screenshots has been written
from scratch five times in one session, and got it wrong twice — once producing
mojibake because the page lacked a charset, once measuring at 980px instead of
375 because it lacked a viewport meta, which made a "no overflow" reading
worthless. It should exist once, correctly, and be run on demand.

It is **not** scheduled and does not run on its own. `qa-screenshots/` is already
git-ignored so nothing accumulates.

Requirements, all learned the hard way and all in `CLAUDE.md`:

- Drive Chrome through the DevTools Protocol with
  `Emulation.setDeviceMetricsOverride`. `--window-size` is not a viewport.
- Force `img.loading = 'eager'` and await `decode()` before capturing;
  `captureBeyondViewport` never fires lazy loading.
- Await `document.fonts.ready`.
- Neutralise the reveal before capturing, or cards photograph mid-transition and
  look faded. Set `transition: none` and remove `.js-reveal`; a fixed wait is
  not enough.
- Read `document.documentElement.scrollWidth` and report overflow as a number.
- Every page, 375 and 768, both languages.

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

Placeholders render as visible brackets; run `npm run pending` (23 at last count).

- Site phone, site email — **launch blockers**, not nice-to-haves. Shepard
  counts contact information as a positive signal, and visible `[PENDIENTE]`
  brackets on a public page are a trust defect.
- Instagram, Facebook, TikTok handles — these are `sameAs` entity
  disambiguation, not decoration.
- Stall size, what is included, reply time
- Truck photos for **Pupusas Chileros, Nieve Casera, Taqueria Romero**. Ask for
  them in one session with three rules: shoot straight on, whole truck in frame,
  all in one go so the light matches. Leave room around the truck for cropping.
- His story for the Home section
- Drone video — last to arrive, drops into the hero as a `<video>`
- **Whether the Asian-cuisine recruiting line still stands.** Que Rollon Sushi
  is on the roster and now has a photograph, but Únete still tells prospective
  vendors the park is "especially looking for Asian food".

## Blocked on Enrique

- **The silver cart identification.** See Open decisions.
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

## Still to do before delivery

1. `site.origin` is still `http://localhost:5173`.
2. **No `og:image` anywhere.** Every share of all ten addresses is a bare text
   card. `park_sign.webp` is now a candidate.
3. `FAQPage` schema on Únete. Laja values an FAQ at +18% traffic.
4. Bring Únete, Events and Contact up to Home's standard.
5. Wire the forms once the destination is decided.
6. `hallmark audit` across all ten addresses.
7. Confirm the Contact map paints in a real browser — it renders empty in
   headless screenshots, almost certainly a headless quirk.
