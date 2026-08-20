# Status — Best Bite Food Park

Where the build actually is. Read this, then `CLAUDE.md`, then `design.md`.

**Last updated:** 2026-08-19. All five pages pass the seven-point checklist in
"What Home looks like now, and why", Vendors included — it was scored for the
first time on 2026-08-19 and brought up the same day. See START HERE.

Two sessions are recorded here. **2026-08-18:** `npm run shots` built, two bands
added to Vendors, the silver cart identified, Bryan's branch harvested (8 of 9
cards have a truck photo, the karaoke time is real), Únete and Events brought up
to standard. **2026-08-19:** Contact brought up, Home's leasing door rebuilt,
Home's event flyers dated and marked past, the "open"/"free" copy collision
fixed sitewide, then in the afternoon — Instagram and Facebook wired including
`sameAs`, Vendors scored against the checklist for the first time and brought
up, the two pages that disagreed about vendor tenure settled on the weaker
claim, three English screen-reader labels removed from the Spanish pages, and
**Events rebuilt against a reference Enrique supplied**, with the first four
photographs of actual events the project has ever had.

A word on "shipped" in this file: it means the code is built and committed to
`enrique`. **Nothing has been delivered to Ray and nothing is on the internet.**
**Branch:** `enrique` (never `main` — `main` is Bryan's, unrelated work)
**Deadline:** ~Sept 2 (four weeks from the ~Aug 5 clock start)

---

## START HERE NEXT SESSION

**All five pages now pass the seven-point checklist — and this time it was
checked rather than assumed.** This section claimed "all five" on 2026-08-18
while Vendors had never been scored at all. It was built 2026-08-16, two days
before the checklist was written down, and the three pages brought up afterwards
were Únete, Events and Contact. Nobody went back to it. Scored on 2026-08-19 it
failed three, and all three were settled with Enrique the same day:

| Check                          | Was                                                  | Now                                         |
| ------------------------------ | ---------------------------------------------------- | ------------------------------------------- |
| 5 · dark surfaces incl. footer | **3** — hero scrim, Únete door on `night`, footer    | **2** — the door is cream over a hairline   |
| 6 · arrow glyphs               | **3** — karaoke link, practical link, door button    | **3 — kept, deliberately.** See below       |
| 2 · section-kicker eyebrows    | **3** — hero locator, "Every Sunday", "Own a truck?" | **3 — kept.** The real defect was elsewhere |

**The arrows stay at three, and the rule is the thing that was wrong, not the
page.** design.md caps the glyph at two CTAs because an arrow on everything
stops marking the primary path. Contact genuinely broke that: its three sat on
three buttons of identical weight. Vendors' three are two underlined text links
and one solid button, which do not compete the same way, and Enrique's read
2026-08-19 was that nothing about it reads wrong. He is right. **Count CTAs of
comparable weight, not glyphs** — a future audit that greps for `→` and reports
a number is measuring the wrong thing.

**The eyebrow count was a symptom and the diagnosis was wrong.** The practical
band's kicker was not a surplus label. `practicalH` — "Where it is, and when." —
had been written in both languages and **never rendered**, so a mono kicker was
standing in for a missing headline. Restored 2026-08-19, above the grid rather
than inside the left column, because it names both halves.

**And the band had the void design.md § Rhythm warns about.** `sm:items-start`
on a grid whose left column is three short lines and whose right column is three
rows plus a link dumped the whole height difference into one hole of empty
yellow at the bottom left — about 200px at 768, still ~140px at 1280. Enrique
read it as a tablet-only problem; it was not, it was just smallest where he
looked. Fixed with `sm:items-center`, which splits the space above and below.

A width-conditional heading was considered and rejected. **Never show or hide
copy by breakpoint on this site.** Google crawls mobile-first, so a heading that
appears only from `sm` up is a heading the crawler never reads, on the section
that carries the address. Nothing else here changes what it says by width — the
nav collapses, but every link stays in the HTML at every width — so the one
exception would read as a bug to the next session and get undone.

Everything else left is content from Ray, hosting from Enrique, or one of the
three jobs below.

1. **`og:image`.** Every share of all ten addresses is a bare text card — no
   picture when Ray or a vendor posts a link. `park/entrance_sign.webp` is the
   candidate: it is already cropped clean of the out-of-date vendor board.
   **`events/cruise_lowriders.webp` is now the better one** — lowriders in the
   lot, a person in frame, and the only asset on the site that looks like
   something happening rather than somewhere existing.
2. **`hallmark audit` across all ten addresses.** Nothing has been audited since
   the three pages were rebuilt, and the audit is what catches drift from
   design.md.
3. **Wire the two forms**, once Enrique settles where they should send. Both are
   deliberately unwired and show a visible placeholder on submit.

**Everything through 2026-08-19 is committed and pushed to `enrique`.** Working
tree clean. Nothing is deployed and no host exists.

**Bryan's branch moved on 2026-08-19** and this file's harvest notes point at the
old commit. `origin/bryan` is now `04441ac`, two commits past the `17569a6`
recorded below: "Update the events page" and one touching `deploy.yml` and the
join page. He is actively working over there. Re-check before harvesting again,
and remember `main` auto-deploys.

## Where we are

**All five pages are built in both languages.** Home, Vendors, Únete al Parque,
Events, Contact, plus chrome. Vendors was the last one, built 2026-08-16.

Home is the reference for how the site should look, and what that means is
written out under "What Home looks like now, and why". **Únete was brought up to
it 2026-08-18, Events with it, Contact on 2026-08-19, and Vendors the same
day** — Vendors predated the checklist and had never been scored. All five pass
it now.

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

Verified 2026-08-19, after every change below: build passes, lint clean, 16
tests, 11 HTML files, and `npm run shots` reports no overflow, no broken images,
a `<title>` on every page and a correct `<html lang>` across all twenty
screenshots (ten addresses × 375 and 768). Screenshots land flat in
`qa-screenshots/`, which is git-ignored and regenerated on demand.

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

Park photos in `src/assets/park/`, and every one is now placed except the banned
file:

| File                   | Where                                                  |
| ---------------------- | ------------------------------------------------------ |
| `lot_wagon.webp`       | Únete hero                                             |
| `seating_tent.webp`    | Únete "one lot" section                                |
| `outdoor_seating.webp` | Vendors karaoke band (Bryan's, better than mine)       |
| `inside_sign.webp`     | Events hero                                            |
| `entrance_sign.webp`   | Contact hero — a 2800×1950 crop above the vendor board |
| `park_sign.webp`       | **BANNED. Never publish.** See below.                  |

**`park_sign.webp` is the uncropped sign and must stay unused.** Its vendor
board lists Adan's Grill, El Chilango, Syrian House and "J JS Boba" — none on
the roster — and omits Las Cuatas Lokas, Nieve Casera and Que Rollon Sushi,
which are on it. Publishing it puts a wrong vendor list on the site inside a
photograph, where nobody would think to check.

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

## Bryan's branch, harvested again 2026-08-19 — sixteen event files, we had two

`origin/bryan` moved to `04441ac`, two commits past the `17569a6` recorded
below. Enrique's read was that it held more than we had taken, and it did:
`src/assets/events/` there carries **sixteen files** and the 2026-08-18 harvest
had looked at two of them.

**This page had claimed we had zero photographs of an event. That was wrong**,
and it was wrong because nobody had listed the directory.

| Taken            | As                             | What it is                                                           |
| ---------------- | ------------------------------ | -------------------------------------------------------------------- |
| `low_riders.jpg` | `events/cruise_lowriders.webp` | The cruise in the lot — '57 Bel Air, a Harley, a person in frame     |
| `easter.jpg`     | `events/easter_egg_hunt.webp`  | A few hundred plastic eggs across the asphalt, trucks behind         |
| `christmas.jpg`  | `events/hall_christmas.webp`   | The hall lit up, the Best Bite sign in red, a decorated tree         |
| `loteria.jpg`    | `events/loteria.webp`          | A lotería game mid-play, hands on the table. **Cropped** — see below |
| `decoration.jpg` | `park/wagon_planter.webp`      | The wagon planter, side on. Bryan's iPhone original, unused till now |

**`loteria.webp` is cropped to remove a burned-in reel caption** ("LEMONADE AND
MUCH MORE") that ran across its lower third — the same Instagram-chrome defect
trimmed off the karaoke flyer. Worth the crop rather than the omission: it is
the only photograph we hold of people actually doing something here.

**Also pulled, from the 2026-08-17 set rather than Bryan's:**
`park/tent_wide.webp` (IMG_8013) and `park/tent_tables.webp` (IMG_7999),
because every existing photo in `src/assets/park/` is already a hero or a band
on another address and a grid that reuses them makes the site repeat itself.

### Four files on that branch that must not be published

- **`giveaway.jpg`** — a Louis Vuitton box. Another company's trademark on Ray's
  commercial page, and it says nothing about a food park.
- **`mycelium.jpg`** — a flyer for somebody else's meeting, dated 2/23.
- **`easter2.jpg`, `loteria2.jpg`** — the same events with promo text burned in.
  The clean Easter original exists, which is why the captioned one is not needed
  and is good evidence clean versions of the others exist too. Worth asking.
- **`jarochitas.jpg`** — carries a TikTok watermark and `@lasjarochitas1`, and
  it is a vendor's own content rather than the park's.

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

**Home's hero is still the lowest-resolution asset in the repo.**
`best_bite_sign.jpg` at 1024×576. The sign shots are far better and one of them
became Contact's hero on 2026-08-19 as `park/entrance_sign.webp`.

This note used to say `park_sign.webp` should replace Home's hero. **It should
not** — that file is the uncropped sign carrying the out-of-date vendor board.
If Home's hero is ever swapped, it needs its own crop above the board, the way
Contact's was done. Either way it is a change to the approved reference page and
wants asking first.

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

### Events — rebuilt again 2026-08-19, against a reference Enrique supplied

The 2026-08-18 pass below fixed the page's structure. This one changed what it
is for. Enrique found an Alibi Bar & Lounge events page on Dribbble and picked
out the parts that applied; both are filed in the swipe library as
`alibi-events-lineup` and `alibi-social-grid`.

**"Coming up" and "Already done here" were two sections splitting one calendar,
and one of them was always empty.** They are now a single lineup: one full-width
row per event, thumbnail hard left, status chip hard right, wide empty gutter
between. Finished events recede rather than getting filed somewhere else.
Adding an event is one entry; retiring it is one word.

**The reference greys two of four rows and never says why**, so a visitor
guesses between sold out, cancelled and finished. Ours prints the word, in the
vendor open/closed language rather than a second one invented for the page.

**The photo grid is new and it is the point.** Seven cells, one at 2x2 in
columns two and three so its mass sits just left of centre. Four are events and
three are the place. Until 2026-08-19 this page had no photograph of anything
happening — every event asset in the repo was a flyer, which proves we have
flyers.

**Not taken from the reference:** "Book Now" on every row; the reservation form,
which we are specifically forbidden from implying until the hall permit lands;
and the two-image "private events" pair, which needs a heading and a paragraph
per event when for Easter and Christmas we have a photograph and nothing else.
The last of those goes in when Ray sends two events worth writing about.

**The grid is not headed "Follow our activity"** the way the reference is.
Theirs implies the grid is the live feed. Ours is seven pictures we chose.

#### Approved from a throwaway prototype, and the prototype earned its keep

Built at `/proto/events`, English only, wired straight into `AppRoutes` behind
`import.meta.env.DEV` rather than into `src/lib/routes.ts` — a prototype added
to that array would be pre-rendered to a real file and listed in the sitemap.
Deleted after approval.

**Two defects surfaced in the prototype that would otherwise have shipped**, and
both were violations of rules written down earlier the same day. The grid's big
cell went first in the array, which puts it hard left; the swipe entry says the
one column of offset is the whole trick. And the image was left in flow, so the
portrait cruise photograph drove its two rows to 1180px against 340px squares
and tore a hole down the right of the section — which is exactly what
design.md § Rhythm says an in-flow `<img>` does. Fixing it took 320px off the
page height.

#### Placeholders went 15 → 25, and that is not a regression

Ten of the new brackets are event dates, five events across two languages. Those
gaps already existed; the page simply had no place to show them. **Only the
cruise has ever been dated.** Each bracket names its own event, so
`npm run pending` now produces a list Ray can answer line by line.

### Events — brought up 2026-08-18

Scored 5 of 7 before, 7 of 7 after, plus two things the checklist does not cover.

- **Five mono eyebrows** against three. Únete had eight, this had five: the
  habit was systemic, not one page's slip. All three section kickers gone. Two
  headings were rewritten to stand alone, because a heading that only parses
  under its eyebrow is not a heading.
- **A type-only hero**, the same defect Únete had. Now the indoor hall
  (`inside_sign.webp`) — the lit Best Bite sign, barrel tables, low light. The
  only asset in the repo that looks like a place where something happens after
  dark, and already dark so the scrim works with it. The "Coming up" section
  gave up its night ground in exchange, keeping the ration at two.
- **No structured data at all** — the only address on the site with none. The
  karaoke night is now an `Event`. See `KaraokeEventJsonLd` for why it carries
  no `startDate`: computing the next Sunday at build time freezes a date into a
  static file, which is the trap the open/closed badge exists to avoid.
  `eventSchedule` is schema.org's own answer for something that repeats.
- **No button anywhere.** Not a checklist item, but every other page ends on a
  door and this one ended on a bracketed Instagram handle. The door goes to
  Vendors: events bring people to the lot, the kitchens are why they stay.

**Events has no placeholders left.** 21 → 19.

#### The page was advertising an event that had already happened

`DATED_EVENTS` held the Back to School Cruise under "Coming up" with
`pending('cruise date')`. Two flyers describe that afternoon: the cruise flyer
gives the route and times, and "Cruise Into the School Year" gives the date —
**Sunday 16 August 2026**, two days before this was found. Enrique confirmed
2026-08-18 that they are one event. So the page was wrong twice: it called a
finished event upcoming, and bracketed a date that was printed on a flyer
already in the repo.

The array is now **two arrays**, `UPCOMING_EVENTS` and `PAST_EVENTS`, and which
one an event sits in is a human decision made when it is added. **Not a date
comparison** — on a pre-rendered site `new Date()` is frozen at the last build,
so an event would sit under "Coming up" for every day between its date passing
and the next deploy. A briefly-wrong badge is a nuisance; a wrong calendar is
the thing the page is for.

The finished cruise keeps its flyer and its full card, in the past section,
rendered by the same `EventRow` an upcoming one uses. Two reasons: Ray can see
exactly how a dated event looks without one being scheduled, and a park that
visibly ran a lowrider cruise is better proof than a sentence claiming it runs
events.

**"Coming up" has a written empty state**, because empty is its normal state —
the park runs a handful of events a year. Hiding the section makes the page look
like it has no calendar; a bare heading over nothing looks broken.

#### One defect still left on Home

**The dates were fixed on 2026-08-19** — see "Home's event flyers" below. Both
cruise cards now carry their real times and a past marker.

**What remains is the Instagram chrome.** Home's copy of the school-year flyer
(`events/Cruise-school-year.jpeg`) has an avatar circle, a mute button and the
story player strip baked into it, the same defect trimmed off the karaoke flyer.
Enrique's call 2026-08-19 was to leave it for now. Fixing it means re-cropping
the asset, which invalidates the hand-tuned `focus: 19` in `Home.tsx` — a value
derived by rendering the crop rather than by reasoning about it, so it has to be
re-derived the same way. The cleanest fix is asking Ray for the original artwork
rather than a screenshot of a story.

`back_to_school_cruise_full.webp` is a **second copy** of a flyer the repo
already has, and that is deliberate: Home's `focus` value is tuned to the nearly
square crop, and the full flyer is portrait, so sharing one asset would silently
reframe Home.

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

### "Open" meant two opposite things, 2026-08-19

Enrique read the leasing bands' `6/15` as "we have six vendors" and asked for it
to be changed to 9. **The number was right and the change would have made the
site lie** — `filled: 9` are trading, `open = 15 - 9 = 6` are empty and rentable,
and telling truck owners nine spaces are free contradicts both the Vendors page
and the client context's "6 empty stalls = the core profitability gap."

**But he found a real defect.** He wrote the roster, has been in this project for
days, and still misread it. A truck owner glancing at it has no chance.

The cause: **the English copy used "open" for both trading and vacant**, and the
vacant sense sat directly under the numeral.

| String                             | "Open" meant |
| ---------------------------------- | ------------ |
| `Open every day` (Home hours band) | trading      |
| `OPEN NOW` (vendor cards)          | trading      |
| `Spaces open` (Home door)          | **vacant**   |
| `Open now` (Únete band)            | **vacant**   |

The worst was Únete's own lede: _"9 trucks are open at Best Bite right now … 6 of
15 spaces are open"_ — one word carrying both meanings a clause apart.

Fixed in seven places. **"Open" now only ever means trading**; vacancy is
"free". Both counts are now stated wherever either appears, because a bare
fraction invites being read as a ratio of occupancy — Home's door says "9
kitchens are already here" beside the 6/15, and Únete's band says "6 of 15
spaces are free, with 9 kitchens already trading." Nine trading is also the
strongest thing we can tell a prospective vendor: it is proof of traffic.

**Spanish mostly escaped it** because `abierto` and `libre` are different words.
One instance had crossed over — Únete's meta description said "espacios están
abiertos" — and it is fixed. The lesson is in `CLAUDE.md`: a bilingual QA pass
that checks layout in both languages will not catch a word doing two jobs in one
of them.

### Home's event flyers, dated 2026-08-19

Home showed the Back to School Cruise with a bracketed date and Cruise Into the
School Year dated 16 August 2026, both sitting beside the recurring karaoke with
nothing saying either had finished. The date had passed three days earlier.

**The two cruise flyers are one afternoon, and they cover different halves of
it** — the drive (Burger King on Lancaster, 1pm–3pm) and the arrival (the lot,
3pm–6pm). Enrique's call 2026-08-19 was to keep all three cards and mark the
finished ones, rather than collapse to two. Giving each cruise card its own real
time off its own artwork is what makes two cards for one day read as two parts
rather than as the park double-counting an event.

`EventCard` gained `past` + `pastLabel`. The marker borrows the vendor
open/closed language rather than inventing a second one: a live thing is a
filled brand chip, a finished thing recedes into a muted outline. Not red, not
struck through, and **not dimmed artwork** — a greyed-out flyer reads as a
broken image. It sits top **right**, where the vendor chip sits top left,
because both cruise flyers carry the Best Bite mark in their top-left corner and
the chip landed square on the client's own logo.

Home now holds no bracketed dates. 19 → 17.

**`npm run pending` is a grep over source, so a comment that quotes the
placeholder helper by name registers as an unfilled placeholder.** One did, and
the count read 18 when it was 17. Do not name the helper in prose; the check is
deliberately dumb and that is what makes it reliable.

`EventCard`'s header claimed it was shared with the Events page. It never was —
Events has always rendered its own row layout. Corrected.

### Contact — brought up 2026-08-19

**The last of the three, and the furthest behind: 5 of 7 failed**, against
Únete's 3 and Events' 2.

- **Four cream sections in a row**, then the footer. One ground change on the
  whole page, at the very end. Now night → accent → cream → wash → cream →
  footer.
- **No accent band at all** — the only address on the site with no yellow on it,
  on the page whose entire job is a street address. The address now takes the
  flood with the directions CTA in it. That is the page's primary action and it
  had been a button two thirds of the way down a cream column.
- **Four mono eyebrows** against two. Únete had eight, Events five, this four.
  All three section kickers gone.
- **Three arrow glyphs**, on directions, submit and the cross-door. The glyph
  marks the primary path in and the primary path out; three made it decoration.
  Submit lost its arrow.
- **A type-only hero**, same as the other two.
- The cross-door gave up its night ground so the hero could take it.

#### The hero crop took three attempts, and the lesson is the aspect ratio

Contact needed a photograph and every park asset was already spoken for. The
sign is the obvious subject — Contact is the "find us" page and the sign is what
a visitor looks for from the road — but **all seventeen sign photographs include
the vendor board, and it is staler than recorded**: it lists
Adan's Grill, El Chilango, **Syrian House and "J JS Boba"**, none of which are
on the roster, and omits Las Cuatas Lokas, Nieve Casera and Que Rollon Sushi,
which are. Publishing it would put a wrong vendor list on the site inside a
photograph, where nobody would think to check it.

`src/assets/park/entrance_sign.webp` is a **2800×1950 crop of IMG_8022**, top
left, which stops above the board.

The two failed attempts are worth not repeating:

1. A **45%-height strip** cleared the board but put the neighbouring gym's
   boxing gloves more prominently in frame than the client's own mark.
2. A **28%-height strip** fixed that and was clean at 1280 — but it was 4.76:1,
   and on a phone `object-cover` cropped it to unreadable letterforms. The sign
   became abstract yellow shapes.

**Aspect ratio was the variable that mattered, not how much sign was in the
source.** The hero is portrait at 375 and landscape at 1280, so a wide source
survives one and not the other. A roughly 1.44:1 crop with the subject near the
centre survives both. Ladder the crop and look at it **at both widths**.

**The sign is shared with a boxing gym next door** and its panel is visible
below Best Bite's. That is the real sign at the real address; cropping it out
entirely means cutting "FOOD PARK". Flagged rather than quietly removed —
Enrique's call if it should go.

#### The map — confirmed working 2026-08-19

**Enrique checked it in a real browser and it paints.** This had been an open
question since 2026-08-12.

It photographs as an empty rectangle because **`npm run shots` waits for images
and fonts, not for a remote iframe** — the embed loads from google.com and is
not complete when the capture fires. Not a site bug, and not worth teaching the
script to wait on third-party frames. **Expect the empty box in every screenshot
and do not "fix" the map.**

### Home's leasing door, rebuilt 2026-08-19

Enrique's read was that "Got a truck?" disappeared into the story section above
it. Correct, and worse than blending — it was demoted on three axes at once:

|         | Story section            | The door                                                      |
| ------- | ------------------------ | ------------------------------------------------------------- |
| Ground  | cream                    | cream, separated by a 1px hairline                            |
| Heading | `text-3xl / sm:text-4xl` | `text-2xl / sm:text-3xl`, one step **smaller**                |
| Button  | —                        | the only `outline` on a page where every other CTA is `solid` |

The most commercially important block on Home was the quietest thing on it, on a
site whose client-context goal #1 is filling six empty stalls.

**The fix was already written in design.md § Ground** and this section simply
was not following it: "accent at flood footprint — full-bleed bands, solid
buttons, large numerals. Not a timid 3% underline." It now takes the yellow
flood with `6/15` as a 7xl numeral, matching the treatment Únete already gives
that exact fact, so a truck owner meets the same number styled the same way on
both pages.

`Button` gained an `invert` skin — brand black on brand yellow, the logo's own
pairing — because the default solid button is yellow and would have vanished on
the band. Recorded in design.md § Components. **Accent grounds only.**

**Not moved higher, and the audit finding it answers is framed wrong.** STATUS
has carried "the leasing CTA sits at 84% down Home against Bryan's 10%" as an
open finding, which reads it as a discovery problem. It is not: "Lease a Space"
is a top-level nav item at 0% scroll depth on every address. The door's job is
converting someone who read the whole page, which argues for loud rather than
early — and design.md gives Home one door at the bottom precisely to stop
recruiting copy bleeding into the eater experience, the fault the audit found on
the Square site. **Treat that finding as answered.**

Second accent band on the page, alongside the hours. They sit roughly 4,000px
apart on a phone, carry different numbers for different audiences, and bookend
it. The unit sits _below_ this numeral where the hours band puts its label
_above_, so the two do not read as one band repeated.

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

Three findings went against our build. **One is now answered and one is still
open.** The leasing CTA at 84% down Home was answered 2026-08-19: it is not a
discovery problem, because "Lease a Space" is a top-level nav item at 0% scroll
depth on every address, so the block's job is conversion — see "Home's leasing
door". Still open: Home pulls 1.1 MB on first load. The third, a keywordless H1,
applies to both builds.

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
word doing both jobs in five places and it cost a real misreading. See the
section above, and the rule in `CLAUDE.md`.

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
