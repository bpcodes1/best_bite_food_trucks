# QA Report — Bryan's build (`origin/bryan` @ `4e6776c`)

Run 1 — 2026-08-23 — DO NOT SHIP — 5 blockers · 7 high · 6 medium · 8 missing

Reviewed: `origin/bryan` @ `4e6776c`, in a detached worktree. Deployed build
verified identical (live asset hashes `index-BIFbEhpD.js` / `index-Vsdqyjbl.css`
match the local build of this commit). Live host:
`https://bpcodes1.github.io/best_bite_food_trucks/` — PUBLIC and crawlable now.

This report is in two parts, per the run's brief:

- **Part A — defects on the build's own terms.** The architecture (English-first
  SPA with a language toggle, GitHub Pages, subpath base) is treated as correct
  by design. Everything here is wrong regardless of architecture.
- **Part B — spec gaps against the agreed brief and shop rules.** Divergence
  from the sold scope and the project/shared CLAUDE.md rules. Not bugs in his
  build; decisions that need reconciling before either build ships.

---

## Short version

The site is live on a public URL right now with a fake phone number, an invented
email on an unpurchased domain, wrong opening hours on every page, and a rent
promotion Ray explicitly said does not exist. Both lead forms send to unknown
inboxes nobody has verified. The likeliest angry call: a lease prospect walks in
holding "first 15 days free," or a customer finds the park "closed" on a Monday
when it was open. Do not link anyone to this URL until the blockers clear.

---

## Action board

| Group | Items |
| --- | --- |
| **Code session** | B1 fake phone · B2 fake email · B3 wrong hours · B4 invented promo · H2 impossible counts · H3 overflow · H4 image weight · H5 social links · M1–M5 · P1–P3 |
| **Dashboard** | Verify both Web3Forms keys' recipient inboxes · GitHub Pages visibility decision (site is indexable today — noindex or take down until real data) |
| **Ask the client (via Enrique/Bryan)** | Current roster (9? 12? 13? — is La Flauta PDX gone; are JJ's Boba / Las Cuatas Lokas / Nieve Casera / Que Rollon real and current) · real date for the Back to School Cruise · whether "host your event" inquiries are permitted before the hall permit lands · pet policy before "Pet Friendly" ships · TikTok handle |
| **Field work** | none |
| **Manual test** | MT1–MT5 below |

---

# PART A — Defects on the build's own terms

### VERDICT: DO NOT SHIP

### BLOCKERS

- **B1 — Fake phone number, live, dialable.** [src/data/parkInfo.ts:26] — Every
  page's footer and the contact page show (512) 555-0148 as a working call
  link; it is a fictional number in an Austin area code, not the park's.
  — `parkInfo.phone` renders via `tel:` in `Footer.tsx:47` and
  `Contact.tsx` — verified in live rendered text at 375 on every page.
  — Fix: no real site phone exists yet (context file: pending); render a
  visible placeholder or omit the line.
- **B2 — Invented email on a domain nobody owns.** [src/data/parkInfo.ts:27] —
  hello@bestbitefoodpark.com is a made-up address; bestbitefoodpark.com is not
  purchased. Mail to it bounces, and if anyone else registers the domain,
  messages go to a stranger. — `mailto:` in footer + contact, verified live.
  — Fix: same as B1; site email is a pending client asset.
- **B3 — Opening hours are wrong on every page.** [src/data/parkInfo.ts:11-19]
  — The site says closed Monday, 11am–9pm Tue–Thu, 11am–10pm Fri–Sat; the
  park's confirmed hours are 12pm–8pm every day. A Monday visitor is told the
  park is shut; an evening visitor arrives to a dark lot. The "open now"
  status logic computes from the same wrong table. — Context file
  (`address_and_hours`, confirmed Aug 2026) vs live footer text: "Mon Closed /
  Tue–Thu 11am–9pm / Fri–Sat 11am–10pm / Sun 12pm–8pm". — Fix: one edit to
  `weeklyHours`: `{ open: '12:00', close: '20:00' }` all seven days.
- **B4 — A rent promotion the owner says does not exist.** [src/data/promo.ts:10-17]
  — "Sign a lease this month and get your first 15 days of rent free" renders
  live, both languages, on the leasing page. Ray stated on 2026-07-31 there is
  NO active vendor promotion and we never prescribe his business terms. A
  prospect can walk in holding this offer. — Live page text confirmed;
  context file `post_close_notes` is explicit and build-critical. — Fix:
  `active: false`.
- **B5 — Both lead forms send to unverified inboxes.** [src/components/join/LeaseInquiryForm.tsx:10,
  src/pages/Contact.tsx:11] — Two different Web3Forms keys; the recipient inbox
  of each is whatever email created the key — unknown, unverified, and per the
  context file no site email exists. Leads for the site's #1 job (filling
  stalls) may be landing in a personal inbox or nowhere. — Form logic itself is
  sound (honeypot, success and error states, disabled-while-submitting);
  recipient unverifiable from code. — Clears only via MT1/MT2.

### HIGH

- **H1 — The whole site is live and indexable with all of the above on it.**
  — GitHub Pages serves this publicly today; no robots.txt (curl: 404), no
  noindex. Google can index a homepage carrying fake NAP data that will later
  fight the real GBP signal. — Fix: dashboard decision — noindex/visibility
  until real data lands (account-level, not `public/`, per shop rule).
- **H2 — Three different truck counts, two on the same page.**
  [src/i18n/translations.ts:167,267 · src/data/trucks.ts · src/data/parkInfo.ts:34-36]
  — Copy says "12 food trucks are already open … 6 of 15 spaces are open"
  (12+6>15), the trust bar says 12, the Food Trucks page renders 13 cards, and
  the context file records 9 active vendors. At most one of these is true.
  — Live join-page and home text + card count. — Fix: derive every count from
  one source after Ray confirms the roster (see Ask-the-client).
- **H3 — The homepage scrolls sideways on phones.** [src/components/FanGallery.tsx:73]
  — The fanned food-photo stack extends past the viewport with no clipping
  wrapper, so the page pans horizontally at 375 and 768 and the layout shifts.
  — `document.documentElement.scrollWidth > clientWidth` true at 375 and 768
  (root has no overflow-x rule, so the check is valid); per-element scan
  isolates the two offset cards; live screenshot `fan-375.png`. — Fix:
  `overflow-x: hidden` (or `clip`) on the gallery's own wrapper section.
- **H4 — The leasing page downloads ~50MB of images; every page is
  multi-megabyte.** [src/assets/*, 21 files 2.5–6.8MB] — Full-scroll totals
  measured live at 375: home 19.5MB, food-trucks 23MB, events 31.3MB,
  join-the-park 49.5MB. Images ship at camera-original size (6.8MB
  `decoration.jpg`, five `park_view*.jpg` at ~5MB). Most are `loading="lazy"`,
  so the first paint survives — but any visitor who scrolls pays the full
  bill, on a site whose audience is on phones. The subpage hero
  (`best_bite_inside.jpeg`, 2.7MB) is eager on all four subpages.
  — Network bytes recorded per page via CDP; dist totals 114MB. — Fix: run
  every asset through a compression step (sharp; target <300KB per his own
  context.txt rule); the webp files already in the repo (36–192KB) prove the
  pipeline exists for some assets and was skipped for these.
- **H5 — Two of three social links don't point at the park's accounts.**
  [src/data/parkInfo.ts:30-31] — The Facebook link uses a vanity URL the page
  does not have (confirmed 2026-08-19: the real page has no username, only the
  numeric `/p/` URL); the TikTok handle is invented — the park's handle is
  unknown. Instagram is correct. — Context file `session_deltas` vs code; live
  curl inconclusive (both platforms return 200 for missing profiles). — Fix:
  real FB URL from the context file; remove TikTok until the handle is known.
- **H6 — "Steady foot traffic" sells the park's weakest fact.**
  [src/i18n/translations.ts:281,483] — The leasing page tells prospects there is
  "steady foot and car traffic every day of the week"; the context file records
  low foot traffic as a core problem Ray is trying to fix. A prospect who
  visits on a quiet Tuesday was promised otherwise. — UNSOURCED CLAIM, on the
  money page. — Fix: sell what is sourced (corner location, daily hours,
  events) and cut the traffic claim.
- **H7 — Unsourced facts in the homepage trust bar.**
  [src/i18n/translations.ts:168-170] — "Family & Pet Friendly" (no pet policy
  anywhere in the context file) and "Monthly Live Music" (karaoke is weekly per
  the events data; no monthly commitment sourced). Both are the kind of claim
  visitors act on. — Fix: confirm with Ray or drop to sourced lines.

### MEDIUM

- **M1 — A placeholder date renders as a real scheduled event.**
  [src/data/events.ts:54-55] — "Sunday Back to School Cruise — Aug 30" is
  commented `Placeholder date — real date to follow` but renders
  indistinguishable from a real booking, live, on the homepage teaser and
  events page. Undeclared placeholder, publicly reachable. — Fix: real date
  from Ray, or render it visibly unconfirmed.
- **M2 — The events page lists week-old events as "Scheduled".**
  [src/data/events.ts:30,42 · src/pages/Events.tsx] — Both Aug 16 events still
  sit under "Scheduled" with no dates shown (only "SUN"), a week after they
  happened. Karaoke is genuinely recurring; "Cruise Into The School Year" is
  simply past. — Live events-page text, 2026-08-23. — Fix: filter past
  one-offs the way the homepage teaser already does; model recurring events
  as recurring.
- **M3 — Six of thirteen truck cards say "Hours coming soon" on a live site.**
  [src/data/trucks.ts:99-165] — Honest placeholders, but publicly reachable and
  written down nowhere (no launch checklist exists — see MISSING). — Escalated
  one level per the undeclared-placeholder rule.
- **M4 — The Spanish experience drops to English at the edges.**
  [src/components/Header.tsx:75 · src/pages/NotFound.tsx:6] — The menu button
  ("Menu"/"Close") and the entire 404 page ("Page not found…") are hardcoded
  English while the rest of the UI is Spanish. — Verified live in ES mode.
  — Fix: move both into `translations.ts`.
- **M5 — The availability marquee auto-scrolls with no pause control.**
  [src/index.css:14-29 · src/components/join/AvailabilitySection.tsx:34] —
  22s infinite scroll; it honors reduced-motion, which helps, but WCAG 2.2.2
  wants a user-facing pause for moving content over 5s. — Fix: pause on
  hover/focus plus a control, or make it static.
- **M6 — NAP drift: ZIP truncated.** [src/data/parkInfo.ts:24] — Site prints
  "97301"; the context file's exact string is "97301-8655". One source file is
  the right pattern (points for that), but the string should match the GBP
  exactly. — Fix: add the +4.

### POLISH

- **P1 — Tap targets 36px.** Mobile nav links measure 36px tall against the
  ~44px guideline. Verified via rendered rects.
- **P2 — Featured trucks "rotate every month"** [translations, home teaser] — a
  standing maintenance promise on a site with no CMS; someone must actually do
  it monthly.
- **P3 — `title` tooltip strings on form fields are English-only** (e.g.
  "Enter a valid email address") — browser validation hints will mix languages
  in ES mode.

### What passed (evidence-backed)

- Deployed build = reviewed commit (asset hashes match). Tests 3/3, lint clean,
  `tsc` build clean. Route parity: 5 declared routes all render live; invented
  path serves the 404 shell. Mobile nav opens, covers, closes after selection
  (verified by driving it). Language toggle works and persists; `<html lang>`
  updates. Forms have honeypot, success AND error states, submit-disabled
  state. No raw internal `<a href>`; router `Link`/`NavLink` throughout. No
  absolute local paths. Single h1 per page. The rafgraph 404 redirect
  correctly restores deep links for human visitors (verified in-browser:
  `/join-the-park` → status 200 content rendered after redirect).

---

## MISSING (Phase 4 — against the agreed scope and context file)

- MISSING — Privacy policy — both forms collect name/email/phone — owner needed, or BLOCKER at launch
- MISSING — Launch checklist / deferred-items list — nothing records what "coming soon" items are waiting on whom — HIGH per skill
- MISSING — Per-page titles, meta descriptions, canonicals, OG tags — every
  page is "Best Bite Food Park" with description "Best Bite Food Park";
  rendered head dumped, not grepped — part of the sold SEO baseline
- MISSING — sitemap.xml and robots.txt — neither exists in repo or live
- MISSING — LocalBusiness schema — absent (better than invented, but sold in the GBP/SEO component)
- MISSING — La Flauta PDX — in the context file's roster and Bryan's own
  food_trucks.txt, absent from the site — confirm departed or restore
- MISSING — Production domain — site lives on the GitHub Pages subpath;
  `base` is hardcoded to it; og:url bakes the pages.dev-equivalent URL in
- MISSING — Crawlable deep pages — all four subpages return HTTP 404 to
  crawlers (platform behavior of the SPA+404-hack on GitHub Pages; fine for
  humans, invisible to Google). The leasing page — the one sold as a search
  landing page for "food cart space for rent salem" — cannot rank from a URL
  that 404s. Needs an architecture decision, not a patch.

## REVENUE PATHS

- Lease inquiry form — **BLOCKING**: recipient inbox unknown (MT1 clears it)
- Contact form — **BLOCKING**: recipient inbox unknown, different key (MT2)
- tel: link — **BLOCKING**: dials a fictional number (B1; no real number exists yet)
- mailto: link — **BLOCKING**: invented address (B2)
- Primary CTA per page ("Ask about a space" → form section) — anchors correctly, verified live; lands on a blocked form

## MANUAL TESTS

1. **MT1 — Submit the lease form live.** Fill it on
   `/join-the-park`, submit. PASS = success message renders AND the email
   arrives at an inbox Ray/Enrique control. Also identifies where key
   `3520713f-…` actually delivers.
2. **MT2 — Submit the contact form live.** Same, key `3ff547eb-…`.
3. **MT3 — Facebook link.** Open the footer Facebook link logged out. PASS =
   lands on the park's page (expected FAIL: page has no vanity username; real
   URL is the numeric /p/ form in the context file).
4. **MT4 — TikTok link.** Open logged out. PASS = the park's account, not a
   stranger's or a dead profile.
5. **MT5 — Web3Forms dashboard.** Confirm both keys' notification email +
   spam-filter state; confirm no third key exists from earlier commits.

---

# PART B — Spec gaps against the agreed brief and shop rules

Not defects in his build. Divergence between what this build is and what was
sold / what the shop rules require. Needs a reconciliation decision, not a fix
inside this architecture.

1. **Rendering: SPA vs pre-rendered.** The sold scope leans on search (leasing
   landing page, GBP, bilingual SEO). This build is a plain SPA whose deep
   pages 404 to crawlers and whose no-JS render is 0 characters (measured).
   The shop standard for this project is pre-rendered HTML per route.
2. **Bilingual: toggle vs URLs.** Spanish exists and is complete (good), but as
   client-side state — one URL serves both languages, so Google files only one.
   Project rule: separate `/es/…` addresses, hreflang pairs, no
   browser-language auto-detection (this build auto-picks Spanish from
   `navigator.language` at first visit [src/i18n/LanguageContext.tsx:35]).
3. **Host: GitHub Pages vs Cloudflare Pages.** Subpath base `'/best_bite_food_trucks/'`
   hardcoded in vite.config.ts; a domain cutover is a config change plus a
   redeploy, and the Pages URL stays live unless handled (shop launch-checklist
   item on Cloudflare; equivalent needed here).
4. **Terminology: "open" for vacant stalls.** "6 of 15 spaces are open" /
   "How many spaces are open?" — project rule reserves "open" for trading;
   vacant stalls are "available"/"free". The join-page lede has trucks "open"
   and spaces "open" a clause apart — the exact ambiguity documented on
   2026-08-19 (Spanish escapes it: "abiertos"/"libres").
5. **Em dashes in site copy** — shared shop rule bans them; present in both
   languages (e.g. translations.ts:276 "…a month, not a year — that's…").
6. **Both-counts rule** — where the vacancy number appears, state both ("9
   filled and 6 free"), never a bare fraction; the marquee and accent band
   print "6/15" alone.
7. **Event hosting invitation vs the hall permit.** "Want to Hold an Event at
   Best Bite?" invites private-event inquiries (birthdays, fundraisers) while
   the hall-rental permit is still ungranted per the context file. If this
   covers indoor/hall events it crosses "don't advertise unpermitted rentals."
   Needs Ray/Enrique's read — logged in Ask-the-client.
8. **Design system.** This build predates/parallels `design.md` (different
   type: Inter-only; different structure). Per the run's brief, no hallmark
   audit was run and no drift findings are filed — noted only so nobody
   expects these pages to pass one.

---

## EVIDENCE LOG

- **Phase 0**: rendering mode = plain SPA — three signals agree (`tsc -b &&
  vite build`; no prerender script; dist emits 2 HTML files: index + 404).
  Client context file read in full (`clients/ray-bestbite-context.xml`).
  Scope = Option A, 5 bilingual pages (context `price_renegotiation`).
  Launch checklist: none in repo ("To Do List.txt" covers other projects).
  Deployed=reviewed: live HTML references `assets/index-BIFbEhpD.js` +
  `index-Vsdqyjbl.css`, byte-identical names to the local build of 4e6776c;
  `git status` clean in worktree.
- **Phase 1**: `checks.sh` run from worktree root with the live domain.
  Findings read from output: 2 HTML in dist; 20 images >300KB in dist (top:
  6.8MB); no `_redirects` (n/a on GH Pages); `public/404.html` present =
  correct here (rafgraph redirect, inspected); placeholders in trucks.ts (6×
  "coming soon"); no sitemap → live-route loop empty, so routes curled by
  hand: `/` 200; `/food-trucks` `/events` `/join-the-park` `/contact` all 404
  (served as the redirect shell — humans fine, crawlers 404); invented path
  404 ✓; robots.txt 404. Tests 3/3 pass, `eslint .` clean.
- **Phase 2**: puppeteer-core driving system Chrome via CDP,
  `setViewport` (device metrics), images forced eager + decode() awaited,
  fullPage captures at 375/768/1440 for all 5 routes (15 shots + section
  crops in scratchpad `p2/shots/`). Root scrollWidth>clientWidth TRUE at
  375+768 on `/` only; per-element scan (clipping ancestors excluded) →
  FanGallery cards. Network bytes/page recorded (49.5MB join). Mobile nav
  driven: opens, 5 links, closes on selection. Toggle driven: h1 switches,
  `documentElement.lang`→es, localStorage persists. JS disabled → body text
  length 0. Deep link `/join-the-park` → restored, content rendered.
- **Phase 3**: every rendered business fact diffed against the context file.
  Wrong: hours, phone, email, facebook, tiktok, promo, truck count, foot
  traffic, pet-friendly, monthly-music. Right: address street/city (ZIP
  truncated), Instagram, "most of them for more than a year" (matches the
  supported claim exactly), month-to-month terms, "especially looking for
  Asian food". Rendered head dumped via CDP (not grepped): title/meta static
  site-wide, no canonical, no ld+json.
- **Phase 4**: worked from context file + Option A scope, not from the site.
  Gaps listed above.
- **Phase 5**: five tests defined; none executed (form submissions and
  logged-out social checks need a human/inbox).
- **Phase 6**: compounds rolled into B-series and H1/H4 severity calls:
  fake-NAP × live-indexable (B1/B2/B3×H1), promo × money page (B4), forms ×
  no site email (B5), weight × mobile audience (H4), 404 deep links × SEO
  scope (Part B.1 + MISSING).

*Generated 2026-08-23 against `origin/bryan` @ `4e6776c`. Report lives in the
QA worktree only — nothing committed to any branch.*
