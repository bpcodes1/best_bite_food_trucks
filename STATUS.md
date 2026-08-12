# Status — Best Bite Food Park

Where the build actually is. Read this, then `CLAUDE.md`, then `design.md`.

**Last updated:** 2026-08-11
**Branch:** `enrique` (never `main` — `main` is Bryan's, unrelated work)
**Deadline:** ~Sept 2 (four weeks from the ~Aug 5 clock start)

---

## Where we are

The scaffold is done and one of five pages is built. Únete al Parque (the
leasing page) is complete in both languages, pre-rendered, and verified in the
browser at 375 and desktop. Four pages remain: Home, Vendors, Events, Contact.

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
| Únete al Parque | Built EN + ES, ~13.5 kB of finished HTML per address                      |

Verified: build passes, lint clean, 7 route tests pass, content present in the
HTML with no JavaScript, `lang` attributes correct per address, hreflang pairs
on every page. Screenshots reviewed at 375 and desktop in Spanish.

**Not verified:** 375 from the steps down through the form, and 768 at any
point. English was skipped deliberately — Spanish is the longer language, so if
Spanish fits, English fits.

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
3. **The English `lease` slug.** Currently `/lease-a-space`. Still pending as of
   2026-08-11. Enrique's SEO call, targeting "food cart space for rent salem",
   and he wants an on-page SEO framework applied to the choice rather than
   guessing — Kyle Roof was floated. Change it in `src/lib/routes.ts` and it
   changes everywhere. The Spanish slug `/es/unete-al-parque` is settled.
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

- **Text Ray the descope offer**, get his yes, send the two-line written recap.
  Bryan already agreed to Option A. The context file's own rule: nothing gets
  built past mockups until that recap exists. Open since 2026-08-10.
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

## Next

1. Screenshots of 375 from the steps down through the form, and 768.
2. Build Home, Vendors, Events, Contact against `design.md`.
3. Compress `src/assets/` — roughly 9 MB against a 233 kB JS bundle.
4. `hallmark audit` across all ten addresses before delivery.
5. `curl -I` every address on the live host. Never verify routing with
   `npm run preview`.
