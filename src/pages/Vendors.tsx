import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Button, Label, Section } from '../components/ui'
import { VendorCard } from '../components/VendorCard'
import { VendorListJsonLd } from '../components/Schema'
import { useLang } from '../lib/useLang'
import { useReveal } from '../lib/useReveal'
import { pathFor } from '../lib/routes'
import { fullAddress, hoursRange, site } from '../lib/site'
import { VENDORS } from '../lib/vendors'
import heroLot from '../assets/best_bite_outdoor.webp'
// Bryan's, from `origin/bryan` 2026-08-18. Replaced `park/seating_tent.webp`,
// which was shot from across the lot with traffic cones in the foreground.
// This one is taken from inside the tent, looking down the tables — the same
// place karaoke happens, which is what the band is about.
import seatingTent from '../assets/park/outdoor_seating.webp'

/* Vendors — the catalogue, and the page that answers "is it worth the drive".
 *
 * WHO THIS IS FOR. Eaters, not prospective vendors. Enrique settled that
 * 2026-08-12 and the client context agrees: park visitors decide whether to
 * visit THE PARK rather than which stall, and cuisine variety at a glance is
 * the pitch. Recruiting lives on Únete. There is one honest door to it at the
 * bottom, because a truck owner will read this page whether we design for them
 * or not, and this is where they actually are.
 *
 * THE HERO IS NOT FULL SCREEN, unlike Home's. It is a screen minus the
 * masthead minus a deliberate peek, so the top of the roster shows on landing.
 * design.md § Rhythm reserves the whole viewport for Home on the grounds that
 * every page taking it makes every page feel like a homepage, and Enrique
 * agreed when it was put to him. The peek is also what tells a reader there is
 * something below, which is the entire reason the hero exists on a page whose
 * job is to show nine kitchens.
 *
 * WHAT IS NOT ON THIS PAGE, and why, because each one looks like an omission:
 * no ratings or review counts (Best Bite has three Google reviews in total and
 * none per vendor — inventing them is the fabricated-proof line), no prices
 * (Ray's call), no promotions (Ray confirmed none are running), no ordering
 * links (no vendor URL exists anywhere in the repo, and the old Square site's
 * dead order buttons are precisely what we are replacing), and no cuisine
 * filter (seven of nine are Mexican, so a cuisine browse would turn the gap
 * Ray is trying to close into the page's navigation).
 *
 * A NOTE ON THE HOURS. They are each vendor's own and routinely fall outside
 * the park's 12:00–20:00 — Café Chula opens at 7am. The line under the roster
 * states whose hours are whose, without which the page reads as contradicting
 * itself, which is the exact fault the Square site had.
 *
 * TWO SECTIONS ADDED 2026-08-18, both approved by Enrique 2026-08-16.
 *
 * The KARAOKE band is a reason to come that is not food, and it is already
 * true — the park's own flyer says every Sunday, and Events is built on it.
 * The time came off that flyer on 2026-08-18 and is stated here as well as on
 * Events. It is repeated rather than linked to because this is the page a
 * reader is on when they decide whether to drive over, and it is one short
 * line. See `Events.tsx` for the two caveats that come with it: the flyer
 * carries no date, and Dj Mike G is a real person rather than something Ray
 * controls.
 *
 * The PRACTICAL band answers "where is it and when", which Contact also owns.
 * Duplicating it is the point: sending a reader to another page to find out
 * where the park is fails Laja's reduce-the-user's-work test, and this is the
 * page they are on when they decide whether to drive over. NAP still comes
 * from `site.ts` and is not retyped, so the two pages cannot drift.
 *
 * WHERE PARKING AND SEATING COME FROM. Neither is in the client context file.
 * Both are read off Enrique's own photographs of the lot, 2026-08-17
 * (IMG_7996–8014): a paved on-site lot with marked bays, and picnic tables
 * under the striped tent. That is stronger evidence than a document, but it is
 * still an inference from a photograph rather than something Ray stated, so it
 * is flagged in STATUS.md for him to confirm. Nothing about cost is claimed —
 * "free parking" would be an invention and is not on the page.
 *
 * BOTH BANDS ARE LIGHT ON PURPOSE. `src/index.css` rations dark to two surfaces
 * per page and this page already spends both, on the hero scrim and the footer,
 * before the Únete door takes a third. Adding a night band here would make four.
 */

const copy = {
  en: {
    title: `Food Trucks at Best Bite Food Park | ${site.stalls.filled} Kitchens in Salem, OR`,
    description: `${site.stalls.filled} independent food trucks on one lot in Salem: pupusas, mariscos, tacos, sushi, coffee and paletas. See who is open today at ${site.address.street}.`,
    eyebrow: `Food truck park · ${site.address.city}, ${site.address.state}`,
    h1a: `${site.stalls.filled} kitchens.`,
    h1b: 'One lot.',
    lede: 'Pupusas, mariscos, tacos, sushi, coffee and paletas, all within a few steps of each other.',
    heroAlt: 'Food on a picnic table with food trucks behind it at Best Bite Food Park',
    scroll: 'Scroll',
    rosterH: 'Everyone on the lot.',
    rosterBody:
      'Nine independent kitchens, most of them family businesses. Take a lap before you decide.',
    parkLine: `The park is open every day ${hoursRange()}. Each kitchen keeps its own hours.`,
    karaokeLabel: 'Every Sunday',
    karaokeH: 'Karaoke runs on Sundays.',
    karaokeBody:
      'Music, families, and the kitchens open right through it. Free to come, and a reason to be here that is not lunch.',
    karaokeTime: '6:00pm - 9:00pm · Every Sunday',
    karaokeCta: 'See what else is on',
    karaokeAlt: 'Rows of picnic tables under the striped tent at Best Bite Food Park',
    practicalLabel: 'Before you drive over',
    practicalH: 'Where it is, and when.',
    practicalEvery: 'Open every day',
    practicalRows: [
      ['Address', fullAddress()],
      ['Parking', 'On-site lot'],
      ['Seating', 'Covered picnic tables'],
    ] as const,
    practicalCta: 'Map and directions',
    doorLabel: 'Own a truck?',
    doorH: 'There is room for you here.',
    doorBody: 'Month to month, no long contract, and the lot already has the traffic.',
    doorCta: 'See what a space costs',
  },
  es: {
    title: `Food Trucks en Best Bite Food Park | ${site.stalls.filled} Cocinas en Salem, OR`,
    description: `${site.stalls.filled} food trucks independientes en un solo lote en Salem: pupusas, mariscos, tacos, sushi, café y paletas. Mira quién está abierto hoy en ${site.address.street}.`,
    eyebrow: `Parque de food trucks · ${site.address.city}, ${site.address.state}`,
    h1a: `${site.stalls.filled} cocinas.`,
    h1b: 'Un solo lote.',
    lede: 'Pupusas, mariscos, tacos, sushi, café y paletas, todo a unos pasos.',
    heroAlt: 'Comida en una mesa con food trucks al fondo en Best Bite Food Park',
    scroll: 'Baja',
    rosterH: 'Todos en el lote.',
    rosterBody:
      'Nueve cocinas independientes, la mayoría negocios familiares. Da una vuelta antes de decidir.',
    parkLine: `El parque abre todos los días ${hoursRange()}. Cada cocina tiene su propio horario.`,
    karaokeLabel: 'Todos los domingos',
    karaokeH: 'Los domingos hay karaoke.',
    karaokeBody:
      'Música, familias, y las cocinas abiertas mientras dura. Entrada libre, y una razón para venir que no es el almuerzo.',
    karaokeTime: '6:00pm - 9:00pm · Todos los domingos',
    karaokeCta: 'Ver qué más hay',
    karaokeAlt: 'Filas de mesas de picnic bajo la carpa en Best Bite Food Park',
    practicalLabel: 'Antes de venir',
    practicalH: 'Dónde queda, y cuándo.',
    practicalEvery: 'Abierto todos los días',
    practicalRows: [
      ['Dirección', fullAddress()],
      ['Estacionamiento', 'Lote propio'],
      ['Asientos', 'Mesas de picnic bajo carpa'],
    ] as const,
    practicalCta: 'Mapa y cómo llegar',
    doorLabel: '¿Tienes un truck?',
    doorH: 'Aquí hay lugar para ti.',
    doorBody: 'Mes a mes, sin contrato largo, y el lote ya tiene movimiento.',
    doorCta: 'Ver cuánto cuesta un espacio',
  },
} as const

export function Vendors() {
  const lang = useLang()
  const t = copy[lang]
  useReveal()

  return (
    <>
      <Seo title={t.title} description={t.description} />
      <VendorListJsonLd />

      {/* One screen minus the masthead minus the peek. `svh`, never `vh`: on
          phones `100vh` counts browser chrome that hides on scroll. */}
      <section className="relative flex min-h-[calc(100svh-var(--header-h)-6rem)] flex-col justify-between overflow-hidden bg-night px-5 py-9 text-paper sm:px-8 sm:py-12">
        <img
          src={heroLot}
          alt={t.heroAlt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[55%_60%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/70 to-night/25"
        />

        <div className="relative">
          <Label tone="night">{t.eyebrow}</Label>
        </div>

        <div className="relative max-w-3xl">
          <h1 className="text-[2.6rem] leading-[0.95] uppercase sm:text-6xl lg:text-7xl">
            {t.h1a}
            <br />
            {t.h1b}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-paper/80">{t.lede}</p>
        </div>

        <p className="relative font-mono text-[10px] tracking-[0.16em] text-paper/60 uppercase">
          {t.scroll}
        </p>
      </section>

      <Section measure="wide" className="pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.rosterH}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t.rosterBody}</p>
        </div>

        {/* `reveal-row` is what the nth-child stagger in index.css keys off, so
            the cascade runs middle, right, left across each row of three. */}
        <div className="reveal-row mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {VENDORS.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} lang={lang} />
          ))}
        </div>

        <p className="mt-12 border-t border-rule pt-5 font-mono text-[11px] tracking-[0.06em] text-muted uppercase">
          {t.parkLine}
        </p>
      </Section>

      {/* A reason to come that is not food, and already true. Photograph rather
          than a flyer: the flyer lives on Events, and repeating it here would
          make this a preview of that page instead of an invitation. */}
      <Section measure="wide" className="border-t border-rule py-12 sm:py-16">
        <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-12">
          <img
            src={seatingTent}
            alt={t.karaokeAlt}
            loading="lazy"
            decoding="async"
            width={1600}
            height={1200}
            className="reveal aspect-[4/3] w-full object-cover"
          />
          <div className="reveal min-w-0">
            <Label>{t.karaokeLabel}</Label>
            <h2 className="mt-3 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.karaokeH}</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{t.karaokeBody}</p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.12em] uppercase">
              {t.karaokeTime}
            </p>
            <p className="mt-6">
              <Link
                to={pathFor('events', lang)}
                className="inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-xs tracking-[0.12em] uppercase hover:border-brand-yellow hover:text-muted"
              >
                {t.karaokeCta} <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* Accent at flood footprint, per design.md § Ground. The hours are the
          large numeral because that is the fact someone standing in a car park
          at 8:15pm actually needs. */}
      {/* THE HEADING WAS WRITTEN AND NEVER RENDERED. `practicalH` sat unused in
          both languages until 2026-08-19, so the band ran with a mono kicker
          standing in for a headline. Restored on Enrique's call, and put above
          the grid rather than inside the left column: it names both halves —
          "where it is" is the address rows, "and when" is the hours — so
          heading only the left one would be wrong. The kicker moved up with it,
          because an eyebrow labels the section, not one column of it.

          IT IS DELIBERATELY SMALLER THAN THE HOURS. On every other accent band
          the heading is the loudest thing; here the numeral is, because the
          fact someone standing in the car park at 8:15pm needs is the closing
          time, not the name of the section. */}
      <Section measure="wide" ground="accent" className="py-12 sm:py-14">
        <Label tone="accent">{t.practicalLabel}</Label>
        <h2 className="mt-3 text-2xl leading-[1.02] uppercase sm:text-3xl">{t.practicalH}</h2>

        {/* `items-center`, not `items-start`. The left column is three short
            lines and the right is three rows plus a link, so pinning both to
            the top dumped every pixel of the difference into one hole of empty
            yellow at the bottom left — about 200px at 768 and still ~140px at
            1280. design.md § Rhythm names that exact shape: "space produced by
            one column being taller than another is an accident wearing the same
            clothes". Centring splits it above and below, so it reads as the
            band breathing rather than as something missing. Width-independent,
            which is what a layout fix has to be. */}
        <div className="mt-8 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-14">
          <div className="min-w-0">
            {/* DISPLAY FACE, added 2026-08-19 on Enrique's read that this band
                looked thin next to Home's. He was right, and it was a straight
                drift rather than a preference: every other accent band on the
                site sets its large fact in Archivo Black, and this one was the
                only one that did not. The reason it slipped is worth knowing —
                `src/index.css` puts the display face on h1/h2/h3 automatically,
                and this is a <p>, so it silently fell back to the body face.
                Any large numeral that is not a heading has to ask for the class.

                THE SIZE STILL DOES NOT MATCH HOME'S, and it cannot. Home sets
                the same string at sm:text-6xl, but Home's hours can wrap and
                sit in a full-width column. This one is `whitespace-nowrap` in
                an `auto` grid column beside the spec rows, and Archivo Black is
                a wide face: at 60px the string alone is wider than a 640px
                viewport. Sizes here were raised as far as `npm run shots`
                reports zero overflow at 375 and 768 in both languages, which is
                measured, not chosen. */}
            <p className="font-display text-3xl leading-none whitespace-nowrap uppercase sm:text-4xl">
              {hoursRange()}
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.12em] uppercase">
              {t.practicalEvery}
            </p>
          </div>

          <dl className="min-w-0">
            {t.practicalRows.map(([term, value]) => (
              <div
                key={term}
                className="flex flex-col gap-0.5 border-t border-brand-black/20 py-3 sm:flex-row sm:gap-6 sm:py-2.5"
              >
                <dt className="font-mono text-[11px] tracking-[0.12em] uppercase sm:w-40 sm:shrink-0">
                  {term}
                </dt>
                <dd className="min-w-0 leading-snug">{value}</dd>
              </div>
            ))}
            <p className="mt-5">
              <Link
                to={pathFor('contact', lang)}
                className="inline-flex items-center gap-2 border-b border-brand-black pb-1 font-mono text-xs tracking-[0.12em] uppercase hover:opacity-70"
              >
                {t.practicalCta} <span aria-hidden="true">→</span>
              </Link>
            </p>
          </dl>
        </div>
      </Section>

      {/* The one door to Únete. Small on purpose: this page is for eaters, and
          a truck owner who got here is already looking.

          CREAM, NOT NIGHT, since 2026-08-19. It was the third dark surface on a
          page the system rations to two, which made Vendors the only address
          spending three, and Enrique confirmed it reads wrong sitting directly
          above the footer — two dark blocks separated by nothing but a page
          edge. Events and Contact both close on exactly this shape, cream over
          a hairline, so the site now ends the same way on every interior page.

          The button stays solid rather than following those two to `outline`.
          The ground was the defect; the button was not. Home's leasing door was
          rebuilt in July for being the quietest thing on its page, and quieting
          this one down in the same week would repeat that mistake on the page a
          truck owner is most likely to be reading. */}
      <Section measure="wide" className="border-t border-rule py-12 sm:py-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <Label>{t.doorLabel}</Label>
            <h2 className="mt-3 text-2xl leading-[1.02] uppercase sm:text-3xl">{t.doorH}</h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted">{t.doorBody}</p>
          </div>
          <div className="shrink-0">
            <Button to={pathFor('lease', lang)}>
              {t.doorCta} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
