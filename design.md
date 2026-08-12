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

Deliberate voids are part of the composition, not wasted space.

**Dark is a section, never the ground.** Alternate warm-cream sections with
near-black ones rather than choosing one for the whole page. The rule for which
goes where is not arbitrary:

- **Cream sections carry the vendor logos.** Most arrive on white grounds, and
  white-on-dark is a box that cannot be removed.
- **Dark sections carry the food and park photography.** Warm plated food and
  golden-hour park shots gain contrast and appetite against near-black.

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

**No animation library.** No GSAP, Framer Motion, Lottie, Lenis. CSS only. This
site's job is ranking for local searches and the bundle stays small.

**No hover-scale on cards.** The Atlantic ships zero instances across 108KB of
CSS. If a publication at that scale does not need it, neither do we.

No `transition: all`. Animate `transform` and `opacity` only. Three named
easings. Honour `prefers-reduced-motion`.

## Macrostructure per page

Pages share the system. They do not share a shape.

| Page            | Family                    | Why                                                                                                                                                                                                                                                                                                                                                            |
| --------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Únete al Parque | Narrative Workflow        | One audience, one action. Block 40's IA, Kraken's close.                                                                                                                                                                                                                                                                                                       |
| Home            | **Appetite-led brochure** | Chosen 2026-08-12, after Únete proved the system. Overwhelmingly for eaters: generous hero, full-bleed park photo, dark food band, hours at flood footprint, vendor and events teasers, the story folded in (descope Option A), and exactly one honest door to Únete at the bottom — the fix for the recruiting-copy bleed the audit found on the Square site. |
| Vendors         | Catalogue / Index-First   | The Atlantic's card system. Card count is data, not structure. Roster comes from Enrique.                                                                                                                                                                                                                                                                      |
| Events          | Index-First               | Built 2026-08-12: the recurring event at flood footprint (karaoke Sundays is real, from the park's own flyer), dated events as a data array, past programming as the honest stand-in for the calendar the park does not have yet. The Yard's live calendar stays the bar.                                                                                      |
| Contact         | Long Document             | Short page. NAP, hours, map, the same short form, plus a cross-door routing truck owners to Únete before they write.                                                                                                                                                                                                                                           |

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
