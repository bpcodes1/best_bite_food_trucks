import { Seo } from '../components/Seo'
import { Button, Label, Section } from '../components/ui'
import { VendorCard } from '../components/VendorCard'
import { VendorListJsonLd } from '../components/Schema'
import { useLang } from '../lib/useLang'
import { useReveal } from '../lib/useReveal'
import { pathFor } from '../lib/routes'
import { hoursRange, site } from '../lib/site'
import { VENDORS } from '../lib/vendors'
import heroLot from '../assets/best_bite_outdoor.webp'

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

      <Section className="pt-14 pb-16 sm:pt-20 sm:pb-20">
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

      {/* The one door to Únete. Small on purpose: this page is for eaters, and
          a truck owner who got here is already looking. */}
      <Section ground="night" className="py-12 sm:py-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <Label tone="night">{t.doorLabel}</Label>
            <h2 className="mt-3 text-2xl leading-[1.02] uppercase sm:text-3xl">{t.doorH}</h2>
            <p className="mt-3 max-w-md leading-relaxed text-night-muted">{t.doorBody}</p>
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
