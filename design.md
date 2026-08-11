# Best Bite Food Park — design system

The locked system for all ten addresses. Every page defers to this file.
`hallmark audit` flags per-page drift from it as critical.

Amend it deliberately. Do not work around it on one page.

## Provenance

Extracted 2026-08-11 via `hallmark study`.

| Source | Mode | What we took | What we rejected |
| --- | --- | --- | --- |
| theatlantic.com | URL | Card system at scale (48 articles, 69 h3, still scannable), type-carried hierarchy, one saturated accent on near-neutral paper, zero hover-scale in 108KB of CSS | Eight font families. News-index density. |
| krakenindustries.co | Image | Three-step flow, form philosophy, accent at flood footprint, varied section rhythm, rail-as-progress | Dark ground. Wizard pattern. Configurator logic. |
| block40foodhall.com/kiosk-opportunities | URL | Leasing page information architecture, economics stated openly | Everything visual — it is a GoDaddy template. |

Neither visual source is a food business. That is deliberate. Every food park
site audited (The Yard on Divi, Gather, Rose City, Block 40 on GoDaddy) is a
template site. Pulling taste from the category guarantees looking like the
category.

## Ground and palette

**Light warm ground, not dark.** Kraken's dark ground works because its
photography is intimate, high-contrast, and professionally lit. Ours is twelve
phone photos of trucks in a parking lot, plus park shots the client audit calls
"dark, empty, undersells." A dark ground amplifies that weakness. The park is
also a daytime family venue, open 12:00 to 20:00.

The structure is The Atlantic's, with Ray's brand in the accent slot:

| Role | Value | Notes |
| --- | --- | --- |
| Paper | Warm off-white — **pending exact value** | Warm, not the cool `#f7f7f7` The Atlantic uses |
| Ink | `#17140f` near-black | From the logo |
| Accent | `#f9bc15` brand yellow | From the logo |
| Muted | Warm greys derived from ink | For secondary text, hairlines |

**Yellow is not a compromise.** It is already one of the warmest, most
appetite-forward colours available. Brand continuity and appetite appeal point
the same way here. Only the ground was ever in question.

**Accent at flood footprint**, per Kraken: full-bleed bands, solid buttons,
large numerals. Not a timid 3% underline. Inverted onto light instead of dark.

Do not introduce a third brand colour. Do not use blue anywhere near food
imagery.

## Typography

Three families is the ceiling and we use all three. Roles are locked; the exact
faces are the one open decision.

| Role | Carries | Locked role |
| --- | --- | --- |
| Display | Headlines, numerals, band statements, wordmark | Heavy — weight and presence, per Kraken |
| Body | All running copy, both languages | Humanist or neutral sans, wide language support |
| Label | Eyebrows, chips, specs, prices, microcopy | Monospace, uppercase, letterspaced |

**Monospace body is banned here**, despite Kraken doing exactly that. Monospace
has no narrow characters, and Spanish runs 20–25% longer than English before you
add that penalty. Kraken gets away with it on short English strings. We would
not. Mono survives as the label role only.

Banned outright for display: Inter, Roboto, Open Sans, Poppins, Lato, system
defaults. That is hallmark's gate 1 and it is also what the previous build
shipped.

Italic headers are banned. Emphasis comes from weight, accent colour, or a drawn
underline.

**Pending: the two candidate pairings.** Per our own rules a runner-up display
face ships switchable in dev, so the client meeting is a comparison and not a
description. Neither is chosen yet — see Open decisions.

## Rhythm

From Kraken, and it is the pass only a screenshot could give us.

**Section padding varies deliberately.** Generous hero, compressing into tight
multi-column blocks, compressed accent band, dense gallery. Equal padding across
every section is the templated tell.

**Long heading, short body.** Declarative, not explanatory.

**Left-biased with asymmetric spans.** Not centred. Full-bleed edges are allowed
and encouraged — Kraken's hero image runs off the right edge with no margin.

Deliberate voids are part of the composition, not wasted space.

## Components

**Cards** — The Atlantic's system. Must stay scannable at twelve vendor cards
and legible at one. Hierarchy from type weight and scale, never from borders and
shadows stacked up. Images are supporting, never load-bearing.

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

| Page | Family | Why |
| --- | --- | --- |
| Únete al Parque | Narrative Workflow | One audience, one action. Block 40's IA, Kraken's close. |
| Home | **Open** | Two audiences at once. The hardest page. Decide after Únete. |
| Vendors | Catalogue / Index-First | The Atlantic's card system, twelve items |
| Events | Index-First | Chronological. The Yard maintains theirs through Nov 2026 — that is the bar. |
| Contact | Long Document | Short page. NAP, hours, map, the same short form. |

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

1. **The type pairing.** Two candidates, a recommendation, and a switchable
   runner-up. Blocks the first build.
2. **The exact paper value.** Warm off-white, value pending, chosen against the
   real vendor photography rather than in the abstract.
3. **Home's macrostructure.** Deliberately deferred until Únete is built and the
   system has proven itself on one page.
4. **A warm-light-ground reference with photography of a physical place.** The
   one genuine gap in the provenance above.
