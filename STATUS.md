# Status — Best Bite Food Park

Where the build actually is. Read this, then `CLAUDE.md`, then `design.md`.

**Last updated:** 2026-08-18 (`npm run shots` built; two Vendors bands added;
silver cart identified; Bryan's branch harvested — 8 of 9 cards now have a truck
photo and the karaoke time is real; Únete brought up to Home's standard; stale
docs corrected)

A word on "shipped" in this file: it means the code is built and committed to
`enrique`. **Nothing has been delivered to Ray and nothing is on the internet.**
**Branch:** `enrique` (never `main` — `main` is Bryan's, unrelated work)
**Deadline:** ~Sept 2 (four weeks from the ~Aug 5 clock start)

---

## START HERE NEXT SESSION

1. **Bring Events up to Home's standard**, then Contact. Únete is done — see
   the scorecard under "What Home looks like now, and why". Work one page at a
   time, and score it against the seven-point checklist before and after.
2. **Decide whether Vendors keeps three dark surfaces.** `src/index.css`
   rations dark to two per page and this one spends three. See Open decisions.
3. **`og:image`.** Every share of all ten addresses is still a bare text card.

Done 2026-08-18, all uncommitted: `npm run shots`, the karaoke band and the
practical band on Vendors, bigger cards via the page measure, the silver cart
identification, Bryan's branch harvested (8 of 9 cards now have a truck photo,
karaoke time and DJ now real), and four stale claims corrected in `README.md`
and `design.md`.

## Where we are

**All five pages are built in both languages.** Home, Vendors, Únete al Parque,
Events, Contact, plus chrome. Vendors was the last one, built 2026-08-16.

Home is the reference for how the site should look, and what that means is
written out under "What Home looks like now, and why". **Únete was brought up to
it 2026-08-18.** Events and Contact still predate the 2026-08-12 changes and are
a generation behind.

## Built and verified

|                 |                                                                                |
| --------------- | ------------------------------------------------------------------------------ |
| Scaffold        | Vite + React 19 + TS + Tailwind v4, pre-rendered to 11 HTML files              |
| Addresses       | 5 pages × 2 languages, all deriving from `src/lib/routes.ts`                   |
| Chrome          | Masthead nav + statement footer, both derived from `routes.ts`                 |
| Home            | Full-screen hero, tinting fan gallery, events grid, story, door                |
| Vendors         | **BUILT** — hero, nine 4:3 cards (8 with a truck photo), karaoke + facts bands |
| QA              | `npm run shots` — every address, 375/768, both languages, overflow as a number |
| Únete al Parque | **BUILT** — photo hero, 6/15 accent band, three steps, FAQ + schema, form      |
| Contact         | NAP, map, form, cross-door to Únete, LocalBusiness schema                      |
| Events          | Built on the three real flyers, dated events in a data array                   |
| Type            | Archivo Black / Source Sans 3 / IBM Plex Mono, self-hosted, latin subsets      |
| Schema          | LocalBusiness on Home + Contact; ItemList of nine vendors; FAQPage on Únete    |
| Tests           | 16, across `routes.test.ts` and `vendors.test.ts`                              |

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

| Photos    | What                                                            |
| --------- | --------------------------------------------------------------- |
| 7974–7978 | **Las Cuatas Lokas** — green trailer                            |
| 7979–7984 | **Las Jarochitas** — red truck under the pergola                |
| 7985–7987 | **Que Rollon Sushi** — the black step van                       |
| 7988–7991 | **The Red Marino** — white trailer                              |
| 7992–7995 | **Syrian House Cuisine** — the silver cart. Cut from the roster |
| 7996–8004 | Blue and white tent, picnic tables — park atmosphere            |
| 8005–8008 | Wooden wagon planter, lot views                                 |
| 8009–8012 | Hand-wash station                                               |
| 8013–8014 | Wide shots of the lot with the tent                             |
| 8015–8031 | **The Best Bite park sign**, many angles, high resolution       |
| 8032–8036 | Restroom trailer                                                |

Que Rollon carries no name badge on the van. It was identified by the phone
number printed on its menu board, (503) 991-8991, matching the number on its
logo in `src/assets/food_trucks/`. Not a guess.

### Already pulled into the repo

Four truck photos, wired into `vendors.ts` and on the page:
`las_cuatas_lokas_truck.webp`, `las_jarochitas_truck.webp`,
`the_red_marino_truck.webp`, `que_rollon_sushi_truck.webp`.

Park photos in `src/assets/park/`. All but one are now placed: `lot_wagon.webp`
is the Únete hero, `seating_tent.webp` is the Únete park section (the karaoke
band took Bryan's better tent shot). **`park_sign.webp` is unused and should
stay that way** until Ray updates his sign — its vendor board still lists Adan's
Grill and El Chilango, both cut from the roster.

### The silver cart is Syrian House Cuisine — resolved 2026-08-18

Not a mystery vendor and not one of the three missing photos. The trailer
carries "SYRIAN HOUSE CUISINE 503-754-8737" on the window frame and the menu
board reads "Authentic Syrian Food": shawarma, gyros, kabab, hummus, baba
ganoush, samosas, dolma, tabouleh, falafel, baklava. Read directly off the
photograph at full resolution, not inferred.

**Syrian House is deliberately off the roster.** `src/lib/vendors.ts` line 6
has said so since 2026-08-12 — Enrique cut Adan's Grill, Syrian House and
La Flauta PDX together. This was never an open question; nobody had read the
name off the board. It is also the "one Mediterranean option" the client
context names as the park's only non-Mexican cuisine.

One thing worth a text to Ray, and it is a roster question rather than a photo
one: the cart was on the lot with its OPEN sign lit on 2026-08-17, five days
after being cut. Either it is still trading and the roster is wrong, or it has
since left. Nine vendors is a number printed on four pages and inside the
structured data, so it has to be right.

### Still missing a photo — one vendor, down from three

**Only Pupusas Chileros.** Nothing in the 63 covers it and nothing on any branch
does either. It has to come from Ray. Its card carries the logo wash panel and
holds its shape, which is exactly what that treatment exists for.

Nieve Casera and Taqueria Romero were closed on 2026-08-18 from Bryan's branch —
see below.

## Bryan's branch, harvested 2026-08-18

`origin/bryan` at `17569a6` ("Update Best Bite Website with New Images") carries
assets `origin/main` does not. **Enrique confirmed Bryan shot these himself**, so
they are ours on the same footing as the 2026-08-17 park visit.

Both truck photos were verified against the vehicles' own signage rather than
against Bryan's filenames, because a filename is a claim and not evidence:

| Taken                              | As                           | Verified by                                                                 |
| ---------------------------------- | ---------------------------- | --------------------------------------------------------------------------- |
| `food_trucks/nieve_casera.jpg`     | `nieve_casera_truck.webp`    | "VillegasIceCream.com" and (503) 953-4667 on the trailer, matching its logo |
| `food_trucks/taqueria_romero.webp` | `taqueria_romero_truck.webp` | "TAQUERIA ROMERO MEXICAN FOOD LLC" on the trailer's side                    |
| `outdoor_seating.jpg`              | `park/outdoor_seating.webp`  | n/a — park atmosphere                                                       |
| `inside_sign.png`                  | `park/inside_sign.webp`      | n/a — staged, unused                                                        |
| `events/karaoke_full.jpg`          | `events/karaoke.webp`        | replaced the cropped copy                                                   |

**Eight of nine cards now carry a truck photograph.**

`taqueria_romero_truck.webp` is **680×510**, below what a 411px card wants on a
2x screen, so it renders slightly soft. Better than no photograph, and on the
list to reshoot when Ray sends the Pupusas Chileros one.

### What the uncropped karaoke flyer was hiding

The copy of the flyer in this repo was a crop, and the crop had removed exactly
the strip carrying **"DE 6PM A 9PM"** and **"MUSICA Y KARAOKE A CARGO DE Dj Mike
G."** Both were `pending()` brackets on Events. Enrique's call 2026-08-18 was to
put the time and the name on the site. Placeholders went 23 → 21.

Two things to watch, both recorded in the header comment of `Events.tsx`:

- **The flyer carries no date.** 6pm–9pm is true as of whenever it was printed
  and nobody has confirmed it since. On the Ray list.
- **Dj Mike G is a real person, not something Ray controls.** If he stops
  working the park the site is wrong about a named individual, which is worse
  than being wrong about a time.

**The flyer had Instagram chrome baked into it** — an avatar circle bottom-left,
a mute button bottom-right, and a partial player strip along the bottom. It was
a screenshot of a story, not the artwork. Trimmed to 1040×1595, which removes
all three and clips only the outer edge of the two microphone illustrations.
Check for this on any future flyer arriving as a screenshot.

**The flyer misspells "disfrutar" as "DIAFRUTAR".** It is Ray's graphic, not our
copy, so it is not ours to fix — but it is now on a page we are delivering, and
he may want to know.

### Two things the photos revealed

**The park sign is out of date.** Its vendor board still lists Adan's Grill and
El Chilango, both cut from the roster. Worth telling Ray; it is his sign, not
our page.

**The sign shots are a stronger hero candidate than what Home currently uses.**
Home's hero is `best_bite_sign.jpg` at 1024×576, the lowest-resolution asset in
the repo. `park_sign.webp` is far better. Not swapped — Home is Enrique's
reference page and nothing changes there without asking.

---

## What Home looks like now, and why

`CLAUDE.md` has told every session to read this section before designing
anything since 2026-08-12. **It did not exist until 2026-08-18.** The rules were
only ever in the header comment of `Home.tsx`, where nobody looking for them
would find them. Written out here because Únete, Events and Contact are being
brought up to this standard and "Home's standard" has to mean something checkable.

Home was rebuilt four times on 2026-08-12 against Enrique's feedback, and a
hallmark audit of the first pass named the anti-patterns. These are the rules
that survived.

**The hero is the only full-screen one on the site.** `100svh` minus
`--header-h`, so nothing below is visible until the reader scrolls. `svh` and
never `vh`: on a phone `100vh` counts browser chrome that hides on scroll, so a
`vh` hero overshoots on load. Every other page gets less — a page that takes the
whole viewport reads as a homepage, and if they all do it none of them does.

**Hero content is corner-anchored**: eyebrow at the top, headline in the middle,
locator at the bottom, with the photograph `absolute inset-0` contributing zero
height. The section's own height rules it. A full screen anchored at three
corners reads as composed; the same screen with one centred block reads as a
large empty photo.

**The hero interlocks rather than stacking.** Type sits left against a scrim
that is heavy on the left and nearly clear on the right, so the sunlit half of
the photograph still reads as a bright daytime park. The audit's critical
finding on the first pass was "half hero, half image" — two stacked full-width
bands. Do not rebuild that.

**Eyebrows are capped at two section kickers, plus the accent band's own
label.** Home's header comment says "capped at two: the hero locator and the
story label" and the page actually renders three — the third is inside the
yellow band, where it is part of the numeral treatment rather than a section
kicker. The comment was never updated; the page is right and the sentence is
incomplete. Recorded here rather than "fixed" on Home, which is approved.

The rule that matters: a mono eyebrow on every section was the audit's "labelled
lists" tell. Adding one means removing one. This is the rule most likely to be
broken by accident, because an eyebrow always looks like an improvement on the
section you happen to be looking at — Únete had accumulated eight.

**Section padding varies on purpose.** Equal padding everywhere is the templated
tell named in design.md § Rhythm. `Section` owns the ground, the measure and the
gutter; every caller passes its own vertical rhythm.

**The arrow glyph appears twice**, on the hero CTA and the door CTA. It marks
the primary path in and the primary path out, and it means nothing if every
button has one.

**Dark is rationed to two surfaces per page**, per `src/index.css`, amended
2026-08-12 after four dark bands in a row made a daytime family park look like a
whisky bar. Home spends both on the hero scrim and the footer. Vendors currently
spends three — see Open decisions.

**Grounds change every section, and the accent floods.** Home runs night hero →
brand-yellow flood carrying the hours as a 6xl numeral → a wash that tints to
whichever dish the gallery is showing → a pale events flood → cream → cream. The
yellow band exists because the accent at flood footprint is design.md's stated
use of it: full-bleed bands, solid buttons, large numerals, never a timid
underline.

**One honest door to the leasing page, at the bottom, and no recruiting copy
anywhere else.** The Square site bled aspirational vendor-recruitment language
into its customer-facing hero and the audit called it out. Every page follows
this: eaters throughout, one door at the end.

### How to tell whether a page has been brought up to it

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

### Únete al Parque — brought up 2026-08-18

Scored 4 of 7 before, 7 of 7 after. What was wrong:

- **Eight mono eyebrows** against the cap. Five removed. The three left mirror
  Home: hero locator, accent band label, and the numbered-steps kicker.
- **A type-only hero** on the page whose job is making a truck owner picture
  their truck in this lot. Now opens on `lot_wagon.webp` — trucks trading on
  both sides, open asphalt between them — scrimmed and corner-anchored.
  **Not `park_sign.webp`**, whose vendor board still lists two cut vendors.
- **Five sections sharing `py-14 sm:py-20`.** Now runs tight after the hero and
  opens toward the ask.
- The park section **gave up its night ground** so the hero could take it; the
  ration is two per page counting the footer.
- One **wash band** breaks the run of cream between the yellow band and the
  footer.
- The "one lot" section was illustrated with **a plate of food that is also the
  Vendors hero**. Now `seating_tent.webp`, which shows the parking and seating
  the paragraph beside it describes.

**The headline had to get shorter, and that was the real lesson.** It was one
sentence that wrapped to four lines in English and five in Spanish, and in a
corner-anchored hero the headline grows into the space the eyebrow and locator
are anchored in — at 1280 the three blocks collided. Split to two lines like
Home's. A corner-anchored hero constrains the copy, not just the layout, and
that applies to Events and Contact next.

`gap-y-10` on the hero is load-bearing for the same reason: `justify-between`
alone lets anchored blocks butt together when a Spanish string runs long.

**`FAQPage` schema is now on the page**, which closes item 3 of the delivery
list. `FaqJsonLd` filters out any answer still holding a `pending()` bracket —
two of six are. A visible `[PENDIENTE — stall size]` is honest because a reader
can see it is a gap; the same string inside JSON-LD is a machine-readable claim
that this is Best Bite's official answer, and it can surface as a rich result.
Verified: 4 questions in the markup, zero `PENDIENTE`.

## Open decisions

1. **Is Syrian House Cuisine still on the lot, and does the roster hold at
   nine?** The silver cart is identified (see the photos section) and it is
   already off the roster by Enrique's 2026-08-12 call, but it was trading on
   2026-08-17. A text to Ray settles it. Nine is printed on four pages and in
   the structured data.
2. **Whether to delete `src/assets/in_person_images.zip`.** It is git-ignored so
   it is harmless, but it is 219 MB sitting in the working tree. Enrique has not
   said.
3. **The English `lease` slug.** Currently `/lease-a-space`. Roof's framework
   says put the target keyword in the URL of a new page and never change it once
   the page has authority — so this is now time-boxed to before cutover, not
   before delivery. Target is "food cart space for rent salem".
4. **Display face — leaning Archivo Black, not closed.** Anton stays wired:
   `document.documentElement.dataset.display = 'anton'`.
5. **Vendors spends three dark surfaces and the system allows two.**
   `src/index.css` rations dark to the hero scrim and the footer, amended
   2026-08-12 after four dark bands in a row made a daytime family park look
   like a whisky bar. Vendors adds the Únete door on `ground="night"`, which is
   a third. Not changed unilaterally — the door was built and approved that way,
   and `hallmark audit` will flag it as critical against design.md, so it wants
   a decision either way. The two bands added 2026-08-18 are both light because
   of this.
6. **Whether the karaoke band's photograph is the right one.**
   `seating_tent.webp` shows the tent and tables from across the lot, with
   traffic cones in the foreground. It is honest and it is ours. `lot_wagon.webp`
   is the alternative.
7. **Form destination.** Undecided, so both forms are deliberately unwired and
   show a visible placeholder on submit.
8. **The story section on Home.** Deliberately plain, most likely to be replaced
   wholesale when Ray's voice notes arrive.

## Vendors: the three agreed changes, built 2026-08-18

Approved by Enrique 2026-08-16, all three now in.

**The karaoke band** sits between the roster and the facts band, on paper, with
`park/outdoor_seating.webp` beside it — Bryan's shot from inside the tent
looking down the tables, which replaced the one taken from across the lot with
traffic cones in the foreground. It links to Events and now carries
"6:00pm - 9:00pm · Every Sunday", read off the park's own flyer.

**The practical band** is the yellow flood. Hours as the large numeral, then
address, parking and seating as mono spec rows, then a link to Contact for the
map. Accent at flood footprint is design.md § Ground's stated use of the yellow,
and it was the only way to give the band weight without a third dark surface.

**Bigger cards come from the page measure alone.** `measure="wide"` takes Vendors
from 1152 to 1280, so a card goes 368px → 411px.

The media box went 4:3 → 4:5 the same day and **came straight back to 4:3**.
Every truck was photographed side-on in landscape, so a portrait box cuts about
a third of the vehicle off at both ends and Las Jarochitas lost part of its own
signage. Enrique compared 4:5, 1:1, 4:3 and 3:2 rendered at real card width and
chose 4:3 — nearly the whole truck without the dead asphalt 3:2 brings in.

**Do not make that box taller again to reclaim card height.** The constraint is
the source photography and it does not change until every truck is reshot
portrait. This is written into `VendorCard.tsx` as well.

One structural note: **`measure` is per page, not per section.** `Section` takes
it as a prop and Vendors passes `wide` on all four. Mixing measures on one page
misaligns one heading's left edge against the next at wide viewports. Home is
deliberately untouched at the default — it is the approved reference page.

## Facts taken from photographs, not from a document

**On-site parking and covered picnic tables now print on Vendors.** Neither is
in the client context file. Both were read off Enrique's own photographs of the
lot, 2026-08-17 (IMG_7996–8014): a paved lot with marked bays, and picnic tables
under the striped tent.

That is stronger evidence than a document, but it is still our reading of a
photograph rather than something Ray said, so it is logged here rather than left
buried in the page. **Nothing about cost is claimed** — "free parking" would be
an invention and is not on the page.

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

### The script shipped with a bug in it, fixed the same day

**It captured at 4x while labelling everything 2x.** `deviceScaleFactor` on
`Emulation.setDeviceMetricsOverride` and `scale` on the clip passed to
`Page.captureScreenshot` **multiply**. Both were 2, so a 375px viewport wrote a
1500px-wide file. Four times the bytes for no extra detail, and every "the file
is 2x the tested width" statement was wrong.

It went unnoticed for hours because **a 4x screenshot looks perfect** — it is
just a sharp screenshot. It only surfaced when a crop taken at the documented
750px showed the right half of the page missing, which read as a layout bug on
Únete that did not exist. That is the "when a number surprises you, suspect the
instrument" rule from `../CLAUDE.md` catching a third tool in a week.

The fix is one place: `deviceScaleFactor: SCALE`, clip `scale: 1`. **The script
now asserts its own output** — it reads the PNG's width out of the file header
after every capture and throws if it does not equal the tested width times the
density. A measuring tool that cannot be trusted about its own units makes every
measurement drawn from it worthless, and this one had already produced one false
finding.

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
run `npm run pending` (21 at last count).

- Site phone, site email — **launch blockers**, not nice-to-haves. Shepard
  counts contact information as a positive signal, and visible `[PENDIENTE]`
  brackets on a public page are a trust defect.
- Instagram, Facebook, TikTok handles — these are `sameAs` entity
  disambiguation, not decoration.
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
- **Is Syrian House Cuisine still on the lot?** It was trading on 2026-08-17,
  five days after being cut from the roster. Nine is printed on four pages and
  inside the structured data.

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

## Still to do before delivery

1. `site.origin` is still `http://localhost:5173`.
2. **No `og:image` anywhere.** Every share of all ten addresses is a bare text
   card. `park_sign.webp` is now a candidate.
3. ~~`FAQPage` schema on Únete~~ — done 2026-08-18.
4. Bring **Events and Contact** up to Home's standard. Únete is done.
5. Wire the forms once the destination is decided.
6. `hallmark audit` across all ten addresses.
7. Confirm the Contact map paints in a real browser — it renders empty in
   headless screenshots, almost certainly a headless quirk.
