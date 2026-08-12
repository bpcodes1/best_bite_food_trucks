import { Seo } from '../components/Seo'
import { LocalBusinessJsonLd } from '../components/Schema'
import { Button, Label, Section } from '../components/ui'
import { useLang } from '../lib/useLang'
import { pathFor } from '../lib/routes'
import { fullAddress, hoursRange, site } from '../lib/site'
import parkPhoto from '../assets/best_bite_outdoor.webp'
import karaokeFlyer from '../assets/events/karaoke.webp'
import fotoTacos from '../assets/tacos.webp'
import fotoPupusas from '../assets/pupusas.png'
import fotoMariscos from '../assets/mariscos.webp'
import fotoCoffee from '../assets/coffee.webp'
import fotoRibs from '../assets/ribs.webp'

/* Home — overwhelmingly for eaters.
 *
 * Macrostructure: appetite-led brochure, chosen 2026-08-12 after Únete proved
 * the system (design.md § Macrostructure). Vendors reach the leasing page
 * through search, not by browsing here, so recruiting gets exactly one honest
 * door at the bottom — which is also the fix for the recruiting-copy bleed the
 * July audit found on the Square site.
 *
 * Section rhythm: generous cream hero, full-bleed photo, dark appetite band,
 * yellow hours flood, cream vendor teaser, dark events teaser, cream story,
 * bordered door. Dark carries photography, cream carries type — design.md.
 *
 * DRAFT COPY NOTE: the story section is draft copy written from true facts in
 * the client context (family-run, vendors stay 1+ year, month-to-month
 * philosophy). It is written to be replaced by Ray's own story when his voice
 * notes arrive. It deliberately names no founding date, no family member, and
 * no other checkable specific.
 */

const open = site.stalls.total - site.stalls.filled

const dishes = [
  { img: fotoTacos, caption: 'Tacos' },
  { img: fotoPupusas, caption: 'Pupusas' },
  { img: fotoMariscos, caption: 'Mariscos' },
  { img: fotoCoffee, caption: { en: 'Coffee', es: 'Café' } },
  { img: fotoRibs, caption: 'BBQ' },
] as const

const copy = {
  en: {
    title: 'Best Bite Food Park | Food Truck Park in Salem, OR',
    description: `${site.stalls.filled} food trucks on Silverton Rd NE, open every day ${hoursRange()}. Tacos, pupusas, mariscos, coffee and more, with seating and parking. ${fullAddress()}.`,
    eyebrow: 'Food truck park · Salem, OR',
    h1: `${site.stalls.filled} kitchens. One lot.`,
    lede: 'Tacos, pupusas, mariscos, coffee and more, with seating, parking, and room for the whole family. Noon to eight, every day of the week.',
    cta: 'See the trucks',
    heroAlt: 'Food trucks and tables at Best Bite Food Park',
    foodLabel: 'What is cooking',
    foodH: 'Come hungry.',
    hoursLabel: 'Open every day',
    directions: 'Get directions',
    vendorsLabel: 'The trucks',
    vendorsH: 'Who is cooking.',
    vendorsBody: `${site.stalls.filled} independent kitchens, most of them family businesses, all of them local. One page with every truck and what it serves.`,
    vendorsCta: 'Meet the vendors',
    eventsLabel: 'Events',
    eventsH: 'Sundays are loud.',
    eventsBody:
      'Karaoke every Sunday, car cruises when school starts, cooking classes when the mood strikes. Free to come, and the kitchens stay open.',
    eventsCta: 'See what is on',
    eventsAlt: 'Flyer for karaoke Sundays at Best Bite Food Park',
    storyLabel: 'Our story',
    storyH: 'Family run, Salem grown.',
    storyP1:
      'Best Bite started with a simple idea: give Salem’s independent cooks a lot of their own, and give the neighborhood one place to eat from all of them at once. The kitchens here are small family businesses, and most of them have been with us for more than a year.',
    storyP2:
      'The park is open every day, noon to eight. Bring the kids, take a table, and try a truck you have not tried yet.',
    doorLabel: 'For truck owners',
    doorH: 'Got a truck?',
    doorBody: `${open} of ${site.stalls.total} spaces are open, month to month, no long-term lease.`,
    doorCta: 'Lease a space',
  },
  es: {
    title: 'Best Bite Food Park | Parque de Food Trucks en Salem, OR',
    description: `${site.stalls.filled} food trucks en Silverton Rd NE, abierto todos los días ${hoursRange()}. Tacos, pupusas, mariscos, café y más, con asientos y estacionamiento. ${fullAddress()}.`,
    eyebrow: 'Parque de food trucks · Salem, OR',
    h1: `${site.stalls.filled} cocinas. Un solo lote.`,
    lede: 'Tacos, pupusas, mariscos, café y más, con asientos, estacionamiento y espacio para toda la familia. De doce a ocho, todos los días.',
    cta: 'Conoce los trucks',
    heroAlt: 'Food trucks y mesas en Best Bite Food Park',
    foodLabel: 'Qué se cocina',
    foodH: 'Ven con hambre.',
    hoursLabel: 'Abierto todos los días',
    directions: 'Cómo llegar',
    vendorsLabel: 'Los trucks',
    vendorsH: 'Quiénes cocinan.',
    vendorsBody: `${site.stalls.filled} cocinas independientes, casi todas negocios de familia, todas de aquí. Una página con cada truck y lo que vende.`,
    vendorsCta: 'Conoce a los vendedores',
    eventsLabel: 'Eventos',
    eventsH: 'Los domingos suenan.',
    eventsBody:
      'Karaoke todos los domingos, cruceros de autos cuando empieza la escuela, clases de cocina de vez en cuando. La entrada es libre y las cocinas siguen abiertas.',
    eventsCta: 'Mira qué hay',
    eventsAlt: 'Volante del karaoke de los domingos en Best Bite Food Park',
    storyLabel: 'Nuestra historia',
    storyH: 'De familia, y de Salem.',
    storyP1:
      'Best Bite empezó con una idea simple: darles a los cocineros independientes de Salem un lote propio, y darle al barrio un solo lugar para comer de todos a la vez. Las cocinas de aquí son negocios de familia, y casi todas llevan más de un año con nosotros.',
    storyP2:
      'El parque abre todos los días de doce a ocho. Trae a los niños, agarra una mesa y prueba un truck que todavía no conoces.',
    doorLabel: 'Para dueños de trucks',
    doorH: '¿Tienes un truck?',
    doorBody: `${open} de ${site.stalls.total} espacios están libres, mes a mes, sin contrato a largo plazo.`,
    doorCta: 'Pregunta por un espacio',
  },
} as const

export function Home() {
  const lang = useLang()
  const t = copy[lang]

  return (
    <>
      <Seo title={t.title} description={t.description} />
      <LocalBusinessJsonLd />

      {/* Generous hero, then the photo bleeds edge to edge below it. */}
      <Section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-3xl">
          <Label>{t.eyebrow}</Label>
          <h1 className="mt-5 text-[2.6rem] leading-[0.95] uppercase sm:text-6xl lg:text-7xl">
            {t.h1}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.lede}</p>
          <div className="mt-9">
            <Button to={pathFor('vendors', lang)}>
              {t.cta} <span aria-hidden="true">→</span>
            </Button>
            <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
              {hoursRange()} · {site.address.street}
            </p>
          </div>
        </div>
      </Section>

      {/* Full-bleed, no gutter. The first thing after the claim is the proof. */}
      <img
        src={parkPhoto}
        alt={t.heroAlt}
        fetchPriority="high"
        className="max-h-[30rem] w-full object-cover"
      />

      {/* Dark carries the food photography. Horizontal scroll at phone width. */}
      <Section ground="night" className="py-14 sm:py-20">
        <Label tone="night">{t.foodLabel}</Label>
        <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.foodH}</h2>
        <div className="-mx-5 mt-10 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
          {dishes.map((d) => {
            const caption = typeof d.caption === 'string' ? d.caption : d.caption[lang]
            return (
              <figure key={caption} className="w-52 shrink-0 snap-start sm:w-60">
                <img
                  src={d.img}
                  alt={caption}
                  loading="lazy"
                  decoding="async"
                  className="h-40 w-full object-cover sm:h-44"
                />
                <figcaption className="mt-2.5 font-mono text-[11px] tracking-[0.12em] text-night-muted uppercase">
                  {caption}
                </figcaption>
              </figure>
            )
          })}
        </div>
      </Section>

      {/* The hours, at flood footprint. The one fact every visitor needs. */}
      <section className="bg-brand-yellow px-5 py-10 text-brand-black sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <div className="min-w-0">
            <Label tone="accent">{t.hoursLabel}</Label>
            <p className="mt-2 font-display text-4xl leading-none sm:text-6xl">{hoursRange()}</p>
          </div>
          <div className="min-w-0 sm:text-right">
            <p className="text-lg leading-snug font-medium">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state}
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress())}`}
              className="mt-2 inline-block font-mono text-[11px] tracking-[0.12em] uppercase underline decoration-2 underline-offset-4 hover:no-underline"
            >
              {t.directions} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Vendor teaser. Names live on the Vendors page; this stays roster-proof. */}
      <Section className="py-14 sm:py-20">
        <div className="max-w-2xl">
          <Label>{t.vendorsLabel}</Label>
          <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.vendorsH}</h2>
          <p className="mt-5 leading-relaxed text-muted">{t.vendorsBody}</p>
          <div className="mt-8">
            <Button to={pathFor('vendors', lang)} variant="outline">
              {t.vendorsCta} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </Section>

      {/* Events teaser. The flyer is real park marketing, not decoration. */}
      <Section ground="night" className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
          <div className="min-w-0">
            <Label tone="night">{t.eventsLabel}</Label>
            <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.eventsH}</h2>
            <p className="mt-5 max-w-md leading-relaxed text-night-muted">{t.eventsBody}</p>
            <div className="mt-8">
              <Button to={pathFor('events', lang)}>
                {t.eventsCta} <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
          <img
            src={karaokeFlyer}
            alt={t.eventsAlt}
            loading="lazy"
            decoding="async"
            className="w-full max-w-md justify-self-center object-cover lg:justify-self-end"
          />
        </div>
      </Section>

      {/* Nuestra Historia, folded into Home per the Aug 10 descope. DRAFT copy;
          Ray's voice notes replace it. See the note at the top of this file. */}
      <Section className="py-14 sm:py-20">
        <div className="max-w-2xl">
          <Label>{t.storyLabel}</Label>
          <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.storyH}</h2>
          <p className="mt-5 leading-relaxed text-muted">{t.storyP1}</p>
          <p className="mt-4 leading-relaxed text-muted">{t.storyP2}</p>
        </div>
      </Section>

      {/* The one honest door to Únete. Compact, low, and the only recruiting
          copy on the page. */}
      <Section className="border-t border-rule py-12 sm:py-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <Label>{t.doorLabel}</Label>
            <h2 className="mt-3 text-2xl leading-[1.02] uppercase sm:text-3xl">{t.doorH}</h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted">{t.doorBody}</p>
          </div>
          <div className="shrink-0">
            <Button to={pathFor('lease', lang)} variant="outline">
              {t.doorCta} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
