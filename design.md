# Best Bite Food Park — design system

The locked system for all ten addresses. Every page defers to this file.
`hallmark audit` flags per-page drift from it as critical.

Amend it deliberately. Do not work around it on one page.

## Provenance

Extracted 2026-08-11 via `hallmark study`.

| Source                                  | Mode  | What we took                                                                                                                                                     | What we rejected                                 |
| --------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| theatlantic.com                         | URL   | Card system at scale (48 articles, 69 h3, still scannable), type-carried hierarchy, one saturated accent on near-neutral paper, zero hover-scale in 108KB of CSS | Eight font families. News-index density.         |
| krakenindustries.co                     | Image | Three-step flow, form philosophy, accent at flood footprint, varied section rhythm, rail-as-progress                                                             | Dark ground. Wizard pattern. Configurator logic. |
| block40foodhall.com/kiosk-opportunities | URL   | Leasing page information architecture, economics stated openly                                                                                                   | Everything visual — it is a GoDaddy template.    |

Neither visual source is a food business. That is deliberate. Every food park
site audited (The Yard on Divi, Gather, Rose City, Block 40 on GoDaddy) is a
template site. Pulling taste from the category guarantees looking like the
category.

## Ground and palette

**Light warm ground, not dark.** Three reasons, in order of strength:

1. **Most vendor assets are logos on white grounds.** A white logo ground
   dropped onto a dark card is a glaring box that cannot be removed. On warm
   off-white those grounds nearly disappear.
2. **The park photography is bright and high-key** — sun, blue sky, warm
   redwood, food shot in daylight. It belongs on a warm light ground. Kraken's
   dark ground works because its photography is intimate and studio-lit; ours
   is the opposite kind of good.
3. The park is a daytime family venue, open 12:00 to 20:00.

The structure is The Atlantic's, with Ray's brand in the accent slot:

| Role         | Value                     | Notes                                              |
| ------------ | ------------------------- | -------------------------------------------------- |
| Paper        | `#faf7f1` warm off-white  | Warm, not the cool `#f7f7f7` The Atlantic uses     |
| Ink          | `#1c1a17` warm near-black | Text. A typographic softening, not a brand value   |
| Brand yellow | `#fdc20c`                 | **Sampled from `src/assets/logo.png`**             |
| Brand black  | `#010101`                 | **Sampled from the logo.** Used by the mark itself |

The previous build shipped `#f9bc15` and `#17140f`. Both are wrong — the real
mark is brighter and more saturated, and its black is effectively pure. Do not
"correct" these back.

**Yellow is not a compromise.** It is already one of the warmest, most
appetite-forward colours available. Brand continuity and appetite appeal point
the same way here. Only the ground was ever in question.

**Accent at flood footprint**, per Kraken: full-bleed bands, solid buttons,
large numerals. Not a timid 3% underline. Inverted onto light instead of dark.

Do not introduce a third brand colour. Do not use blue anywhere near food
imagery.

## Typography

Three families is the ceiling and we use all three. Roles and faces are both
settled — see Chosen, below.

| Role    | Carries                                        | Locked role                                     |
| ------- | ---------------------------------------------- | ----------------------------------------------- |
| Display | Headlines, numerals, band statements, wordmark | Heavy — weight and presence, per Kraken         |
| Body    | All running copy, both languages               | Humanist or neutral sans, wide language support |
| Label   | Eyebrows, chips, specs, prices, microcopy      | Monospace, uppercase, letterspaced              |

**Monospace body is banned here**, despite Kraken doing exactly that. Monospace
has no narrow characters, and Spanish runs 20–25% longer than English before you
add that penalty. Kraken gets away with it on short English strings. We would
not. Mono survives as the label role only.

Banned outright for display: Inter, Roboto, Open Sans, Poppins, Lato, system
defaults. That is hallmark's gate 1 and it is also what the previous build
shipped.

Italic headers are banned. Emphasis comes from weight, accent colour, or a drawn
underline.

**Chosen 2026-08-11:**

| Role    | Face              | Why                                                                                                                                                         |
| ------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display | **Archivo Black** | Omnibus-Type, Buenos Aires — drawn with Latin American Spanish as a first consideration. Authority without personality that competes with the vendor logos. |
| Body    | **Source Sans 3** | Humanist, wide Latin coverage, variable, comfortable at length.                                                                                             |
| Label   | **IBM Plex Mono** | Warmer than JetBrains Mono. Hours, prices, cuisine tags, microcopy.                                                                                         |

**Anton** is the switchable runner-up and the decision is **leaning, not
closed**. Enrique reviewed both 2026-08-11 and leans Archivo Black: it is the
wider face, so a reader takes in what each section is about, and what the CTA
is, in a single glance. Anton stays wired.

```
document.documentElement.dataset.display = 'anton'   // switch
delete document.documentElement.dataset.display      // back
```

Anton is single-weight and very condensed — check Spanish diacritics at large
sizes before committing to it.

Self-hosted via fontsource, latin subsets only. No Google Fonts request.

## Rhythm

From Kraken, and it is the pass only a screenshot could give us.

**Section padding varies deliberately.** Generous hero, compressing into tight
multi-column blocks, compressed accent band, dense gallery. Equal padding across
every section is the templated tell.

**Long heading, short body.** Declarative, not explanatory.

**Left-biased with asymmetric spans.** Not centred. Full-bleed edges are allowed
and encouraged — Kraken's hero image runs off the right edge with no margin.

Deliberate voids are part of the composition, not wasted space. **A void is
composed only if something placed it there.** Space produced by one column
being taller than another is an accident wearing the same clothes. See the
hero rule below.

**The type sets the height. The photograph fills what is left.** This is the
rule two Home heroes were rejected for breaking, and it is not negotiable.

- An in-flow `<img>` reports its own aspect ratio and drives the row it sits
  in. Put the photograph in a `relative` cell with `absolute inset-0 h-full
w-full object-cover` so it contributes **zero** height, and let the text
  column's padding and content set the row.
- Percentage heights (`h-1/2`, `h-full`) on an image inside an auto-height
  parent silently do nothing — the browser falls back to the intrinsic ratio.
  That single mistake produced a 1044px hero against a 900px fold and a 387px
  void above the headline. Measure `getBoundingClientRect().height`; never
  assume the rule applied.
- **Home's hero is exactly one screen: `calc(100svh - var(--header-h))`.**
  Enrique's call, 2026-08-12, after two rejected passes. The next section must
  NOT be visible on landing. `--header-h` in `src/index.css` is the measured
  masthead height (80px phone, 131px from `sm`); re-measure it if the masthead
  padding ever changes.

  Use `svh`, never `vh`. On phones `100vh` counts browser chrome that hides on
  scroll, so a `vh` hero overshoots the screen on load.

  This is a full-height hero but **not** the banned full-viewport centred
  hero. The banned pattern is full height _plus_ everything centred _plus_ one
  sentence _plus_ one lonely CTA. Ours is left-biased and corner-anchored —
  eyebrow at the top, headline and CTA at the middle-left, locator and scroll
  cue along the bottom — so a whole screen reads as composed. That distinction
  is the whole difference, and the Sunbeam Bagels reference makes the same
  move.

  Interior pages do not take full-height heroes. They open at their content's
  own height; only Home earns the whole screen.

- One photograph in a hero, not a stack. Two stacked images double the height
  and turn an interlock back into slabs, which is the "half hero, half image"
  complaint by another route.

**Mono eyebrows are capped at two per page** (added 2026-08-12, from the
hallmark audit of Home). The label role exists for data — chips, specs, hours,
form labels — not as a section-head tic. A page where every section opens with
an uppercase mono kicker reads as "a list of labelled lists", which is a named
AI tell. Keep an eyebrow only where it does work the heading cannot: a locator
("Food truck park · Salem, OR") or a scanning label ("Nuestra historia").
Únete, Events, and Contact predate this rule and still violate it — they get
the same pass Home got.

**The arrow glyph (→) appears on at most two CTAs per page** — the primary
action and the door. An arrow on every button is a tic, not an affordance.

**Dark is a section, never the ground — and it is now rationed.** Amended
2026-08-12: Enrique's read was that the site leaned too brown and black, and he
was right. Four dark bands in a row (hero scrim, food, events, footer) made a
daytime family park look like a whisky bar.

The current allowance is **two dark surfaces on a page**: the hero's scrimmed
photograph and the footer. Everything between them is light. Food photography
reads perfectly well on a warm light ground — the Sunbeam reference does
exactly that — so the old "dark carries the food" rule no longer earns its
keep.

- **Cream sections carry the vendor logos.** Most arrive on white grounds, and
  white-on-dark is a box that cannot be removed.
- **The hero and the footer may be dark.** Nothing else, without a reason
  written down here.

**Washes** — light section grounds, added 2026-08-12 with the tinting gallery.
Tokens live in `src/index.css` as `--color-wash-*`.

- A wash is a **ground only**. Never type, never a button, never a rule or an
  accent. Brand yellow and brand black stay the only two brand values, so the
  no-third-brand-colour rule below still holds exactly as written.
- Every wash is high-lightness, low-chroma — a soft tint of the photograph in
  front of it, not a saturated block. Ink must stay readable on all of them.
- The gallery's ground cross-fades to the active dish's wash. That is Enrique's
  idea and it is the liveliest thing on Home. **He asked for the vendor's
  brand colour**, and that is where this lands the day Ray's per-vendor plate
  photos arrive — only two of six photographs can be attributed to a vendor
  today, and guessing the rest would be inventing a client fact. The swap is a
  data change in `dishes`, not a rebuild.

That reconciliation came from the Kado reference (Dribbble, 2026-08-11) and it
is the only thing taken from it. Its pastel gradient sections break the
no-third-colour rule, and its testimonials are placeholder text repeated three
times under one invented name.

## Components

**Cards** — The Atlantic's system. Must stay scannable at twelve vendor cards
and legible at one. Hierarchy from type weight and scale, never from borders and
shadows stacked up. Images are supporting, never load-bearing.

**The real card problem is the vendor logos, not the photography.** Most files
in `src/assets/food_trucks/` are logos on white grounds in unrelated styles —
Las Jarochitas is red-and-green folk cartoon with drop shadows, Pupusas Chileros
is hot-pink-and-cyan illustration with script lettering. Twelve of those in one
grid reads as a flea market unless the container does the work:

- **Identical containment for every logo.** Same box, same padding, same neutral
  tile behind it. The container is consistent even when the contents are not.
- **Never bleed a logo to the card edge.** That works for photographs and
  destroys a logo. Bleed is for park and food photography only.
- The logo is a small identifying mark. Type carries the card.

**Chips** — outlined, not filled. Kraken uses them for specs (`3-6 CARDS`,
`SADDLE-STITCHED`). Ours carry cuisine type and hours.

**Selected state** — accent left-rule plus a barely-there background lift. Not a
filled row.

**Buttons** — name the action and its outcome. Kraken says
"CHOOSE MRKI — PICK LEATHERS", never "Next". Ours say what happens next in the
reader's language.

**Forms** — the Kraken philosophy, and it is the single most transferable thing
we extracted:

- **Three or four fields maximum.** Kraken asks name, contact, notes. The Food
  Hall Co. asks eleven things including financials and references, and it reads
  like an application to a bank.
- **"Email or Instagram handle" as one field.** Food truck operators live on
  Instagram; the park's Instagram is the active channel at ~1k followers against
  113 on Facebook. Ray himself does not read email.
- **An escape hatch under the button** to a channel the reader already uses.
- **Expectation-setting microcopy**: no payment, no commitment, and when they
  will hear back.

## Motion

**The site has to feel alive. That is not in tension with ranking — it is part
of it.** Enrique's argument, 2026-08-12, and it is correct: Google reads how
people behave when they land, so a page that looks dead sends them back to the
results and the ranking follows them down. Appeal and ranking optimise
together. Build motion; do not ration it out of caution.

**What is banned is the animation _library_, not the animation.** No GSAP, no
Framer Motion, no Lottie, no Lenis. The earlier wording here said "CSS only"
and read as "no motion", which is not what it meant.

The case for the ban is arithmetic, not taste. Framer Motion is roughly 50 kB
gzipped on top of a 251 kB bundle, and it only runs once JavaScript has loaded
and hydrated — on a pre-rendered site whose visitors are mostly on phones on
Salem cell service, that is load time spent on something CSS does for free.
Everything wanted from the Sunbeam reference is CSS: keyframed rotation,
transform-based fans and collages, gradient-border glows, and native
scroll-driven animation via `animation-timeline` with an `@supports` fallback.

**If an effect genuinely cannot be built in CSS, reopen this section and make
the case for a library.** Do not quietly work around the rule, and do not
quietly break it.

Craft rules, unchanged:

- Animate `transform` and `opacity` only — both GPU-composited. Never
  `transition: all`, never `width`/`height`/`top`/`left`.
- Three named easings. No bounce or elastic on UI state.
- Honour `prefers-reduced-motion`.
- **No hover-scale on cards.** The Atlantic ships zero instances across 108 kB
  of CSS. If a publication at that scale does not need it, neither do we.
- **Nothing auto-advances without a control.** Carousels, rotating showcases,
  and slideshows that move on their own must be pausable — WCAG 2.2.2, and it
  is also plain courtesy to anyone who reads slowly. The Sunbeam showcase
  autoplays with no pause and would fail an audit; ours are reader-driven,
  which sidesteps the requirement rather than patching it.
- **Motion is not the main lever.** Most of why a reference site feels alive is
  that every section is a different shape, and that its photography is good.
  Reach for structure and better assets before reaching for animation.

## Macrostructure per page

Pages share the system. They do not share a shape.

| Page            | Family                    | Why                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Únete al Parque | Narrative Workflow        | One audience, one action. Block 40's IA, Kraken's close.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Home            | **Appetite-led brochure** | Chosen 2026-08-12, after Únete proved the system. Overwhelmingly for eaters: full-screen scrimmed hero, hours at flood footprint in brand yellow, the tinting fan gallery on a light wash, events on a pale yellow flood, the story folded in on cream (descope Option A), and exactly one honest door to Únete at the bottom — the fix for the recruiting-copy bleed the audit found on the Square site. The food section was a dark band until 2026-08-12; it is light now, and the two dark surfaces are the hero scrim and the footer. |
| Vendors         | Catalogue / Index-First   | The Atlantic's card system. Card count is data, not structure. Roster comes from Enrique.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Events          | Index-First               | Built 2026-08-12: the recurring event at flood footprint (karaoke Sundays is real, from the park's own flyer), dated events as a data array, past programming as the honest stand-in for the calendar the park does not have yet. The Yard's live calendar stays the bar.                                                                                                                                                                                                                                                                  |
| Contact         | Long Document             | Short page. NAP, hours, map, the same short form, plus a cross-door routing truck owners to Únete before they write.                                                                                                                                                                                                                                                                                                                                                                                                                       |

## Bilingual constraints

Neither reference is bilingual, and both of the most likely bilingual references
we checked turned out to be English-only. This section is ours, not extracted.

- **Every layout must survive Spanish strings 20–25% longer.** Checked at 375
  and 768, in both languages, before any page is called done. This is the QA
  gate.
- Headlines are the first thing to break. Test the longest Spanish string, not
  the English one.
- The language toggle switches address, never just the words on screen.
- Never auto-redirect by browser language or geo-IP.

## Open decisions

1. **A site holding many third-party logos in one grid** without looking like a
   sponsor wall. This is the Vendors page problem, and it is the last unbuilt
   page. The containment rules in § Components are the working answer; a studied
   reference would still strengthen it.

Resolved and folded into the tables above: Únete's tone (utilitarian, built),
Home's macrostructure (appetite-led brochure, 2026-08-12), the component
library question (closed — the interactive surface is a nav, a toggle, two
forms and one accordion; not worth a dependency).
