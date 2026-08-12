import { useState } from 'react'
import { Seo } from '../components/Seo'
import { LocalBusinessJsonLd } from '../components/Schema'
import { Button, Label, Section } from '../components/ui'
import { useLang } from '../lib/useLang'
import { pathFor } from '../lib/routes'
import { fullAddress, hoursRange, pending, site } from '../lib/site'
import heroSign from '../assets/best_bite_sign.jpg'
import karaokeFlyer from '../assets/events/karaoke.webp'
import cruiseFlyer from '../assets/events/back_to_school_cruise.webp'
import schoolFlyer from '../assets/events/cruise_into_the_school_year.png'
import { FanGallery } from '../components/FanGallery'
import { EventCard } from '../components/EventCard'
import fotoTacos from '../assets/tacos.webp'
import fotoBurrito from '../assets/tacos_burrito.webp'
import fotoPupusas from '../assets/pupusas.webp'
import fotoMariscos from '../assets/mariscos.webp'
import fotoCoffee from '../assets/coffee.webp'
import fotoRibs from '../assets/ribs.webp'

/* Home — overwhelmingly for eaters.
 *
 * Macrostructure: appetite-led brochure (design.md § Macrostructure). Rebuilt
 * 2026-08-12 after a hallmark audit found the first pass drifting into named
 * anti-patterns. The rules this file now holds:
 *
 * - THE HERO INTERLOCKS, per the Kraken DNA in design.md § Rhythm: text left,
 *   photo running off the right edge with no margin. Never two stacked
 *   full-width bands — that was the audit's critical finding ("half hero,
 *   half image").
 * - EYEBROWS ARE CAPPED AT TWO on this page: the hero locator and the story
 *   label. Every section carrying a mono eyebrow was the audit's "labelled
 *   lists" tell. Do not add one to a new section without removing one.
 * - SECTION PADDING VARIES on purpose. Equal padding everywhere is the
 *   templated tell design.md § Rhythm names.
 * - The arrow glyph appears on the hero CTA and the door CTA only.
 *
 * Vendors reach the leasing page through search, not by browsing here, so
 * recruiting gets exactly one honest door at the bottom.
 *
 * DRAFT COPY NOTE: the story section is draft copy written from true facts in
 * the client context. It is written to be replaced by Ray's own story when
 * his voice notes arrive. It deliberately names no founding date, no family
 * member, and no other checkable specific.
 */

const open = site.stalls.total - site.stalls.filled

/* The gallery's contents. Captions are dish types, not vendor names: Ray's
   per-vendor plate photos have not arrived, and naming a vendor beside a
   photograph we cannot attribute would be inventing a client fact. Swap in
   vendor names the day the real photos land. */
const dishes = [
  { img: fotoTacos, caption: 'Tacos', wash: 'var(--color-wash-tacos)' },
  {
    img: fotoBurrito,
    caption: { en: 'Burritos', es: 'Burritos' },
    wash: 'var(--color-wash-burrito)',
  },
  { img: fotoPupusas, caption: 'Pupusas', wash: 'var(--color-wash-pupusas)' },
  { img: fotoMariscos, caption: 'Mariscos', wash: 'var(--color-wash-mariscos)' },
  { img: fotoCoffee, caption: { en: 'Coffee', es: 'Café' }, wash: 'var(--color-wash-coffee)' },
  { img: fotoRibs, caption: 'BBQ', wash: 'var(--color-wash-ribs)' },
] as const

/* The three flyers are the park's own marketing, confirmed real by Enrique
   2026-08-12. Dates that a flyer does not state stay bracketed — see the
   Events page, which owns the full list.

   `fit` is per flyer because it depends on the art, not on the layout. See the
   note in EventCard: a flyer fills its square unless something that matters
   sits close enough to an edge to be cropped away.

   The school-year flyer is the exception, and only until Ray's replacement
   arrives. The file we have is not the full poster — Enrique flagged it
   2026-08-12 and there is a scrollbar baked into its right edge, so it is a
   partial screen capture rather than the artwork. Filling the square would
   also cut through the Best Bite mark in its top-left corner. It letterboxes
   until the real file lands; then delete the `fit` and it matches the others. */
const flyers = [
  { key: 'karaoke', img: karaokeFlyer, fit: 'fill' },
  { key: 'cruise', img: cruiseFlyer, fit: 'fill' },
  { key: 'school', img: schoolFlyer, fit: 'whole' },
] as const

const copy = {
  en: {
    title: 'Best Bite Food Park | Food Truck Park in Salem, OR',
    description: `${site.stalls.filled} food trucks on Silverton Rd NE, open every day ${hoursRange()}. Tacos, pupusas, mariscos, coffee and more, with seating and parking. ${fullAddress()}.`,
    eyebrow: 'Food truck park · Salem, OR',
    h1a: `${site.stalls.filled} kitchens.`,
    h1b: 'One lot.',
    lede: 'Tacos, pupusas, mariscos, coffee and more, with seating, parking, and room for the whole family. Noon to eight, every day of the week.',
    cta: 'See the trucks',
    heroAlt: 'The Best Bite Food Park sign on Silverton Rd NE, Salem',
    scroll: 'Scroll',
    foodH: 'Come hungry.',
    foodBody: `${site.stalls.filled} independent kitchens, most of them family businesses, all of them local. One page with every truck and what it serves.`,
    foodCta: 'Meet the vendors',
    gallery: {
      previous: 'Previous dish',
      next: 'Next dish',
      region: 'What people are eating at the park',
    },
    hoursLabel: 'Open every day',
    directions: 'Get directions',
    eventsH: 'Sundays are loud.',
    eventsBody:
      'Karaoke every Sunday, car cruises when school starts, cooking classes when the mood strikes. Free to come, and the kitchens stay open.',
    eventsCta: 'See what is on',
    flyers: {
      karaoke: {
        title: 'Karaoke y música',
        tags: ['Music', 'Family'],
        description:
          'The park invites you every Sunday: family atmosphere, good food, good music. Come sing and dance with us.',
        when: 'Every Sunday',
        where: 'Best Bite Food Park',
        alt: 'Flyer for karaoke Sundays at Best Bite Food Park',
      },
      cruise: {
        title: 'Back to School Cruise',
        tags: ['Cars', 'Sunday'],
        description: 'Meet up, cruise, and cruise back in for dinner at the park.',
        when: pending('Back to School Cruise date'),
        where: 'Lancaster Dr · Best Bite Food Park',
        alt: 'Flyer for the Back to School Cruise at Best Bite Food Park',
      },
      school: {
        title: 'Cruise Into the School Year',
        tags: ['Lowriders', 'Family', 'Community'],
        description: 'Lowriders, food, family, community, all in the lot.',
        when: pending('Cruise Into the School Year date'),
        where: 'Best Bite Food Park',
        alt: 'Flyer for Cruise Into the School Year at Best Bite Food Park',
      },
    },
    storyLabel: 'Our story',
    storyH: 'Family run, Salem grown.',
    storyP1:
      'Best Bite started with a simple idea: give Salem’s independent cooks a lot of their own, and give the neighborhood one place to eat from all of them at once. The kitchens here are small family businesses, and most of them have been with us for more than a year.',
    storyP2:
      'The park is open every day, noon to eight. Bring the kids, take a table, and try a truck you have not tried yet.',
    doorH: 'Got a truck?',
    doorBody: `${open} of ${site.stalls.total} spaces are open, month to month, no long-term lease.`,
    doorCta: 'Lease a space',
  },
  es: {
    title: 'Best Bite Food Park | Parque de Food Trucks en Salem, OR',
    description: `${site.stalls.filled} food trucks en Silverton Rd NE, abierto todos los días ${hoursRange()}. Tacos, pupusas, mariscos, café y más, con asientos y estacionamiento. ${fullAddress()}.`,
    eyebrow: 'Parque de food trucks · Salem, OR',
    h1a: `${site.stalls.filled} cocinas.`,
    h1b: 'Un solo lote.',
    lede: 'Tacos, pupusas, mariscos, café y más, con asientos, estacionamiento y espacio para toda la familia. De doce a ocho, todos los días.',
    cta: 'Conoce los trucks',
    heroAlt: 'El letrero de Best Bite Food Park en Silverton Rd NE, Salem',
    scroll: 'Desliza',
    foodH: 'Ven con hambre.',
    foodBody: `${site.stalls.filled} cocinas independientes, casi todas negocios de familia, todas de aquí. Una página con cada truck y lo que vende.`,
    foodCta: 'Conoce a los vendedores',
    gallery: {
      previous: 'Platillo anterior',
      next: 'Siguiente platillo',
      region: 'Lo que se come en el parque',
    },
    hoursLabel: 'Abierto todos los días',
    directions: 'Cómo llegar',
    eventsH: 'Los domingos suenan.',
    eventsBody:
      'Karaoke todos los domingos, cruceros de autos cuando empieza la escuela, clases de cocina de vez en cuando. La entrada es libre y las cocinas siguen abiertas.',
    eventsCta: 'Mira qué hay',
    flyers: {
      karaoke: {
        title: 'Karaoke y música',
        tags: ['Música', 'Familiar'],
        description:
          'El parque te invita todos los domingos: ambiente familiar, buena comida y buena música. Ven a cantar y bailar con nosotros.',
        when: 'Todos los domingos',
        where: 'Best Bite Food Park',
        alt: 'Volante del karaoke de los domingos en Best Bite Food Park',
      },
      cruise: {
        title: 'Back to School Cruise',
        tags: ['Autos', 'Domingo'],
        description: 'Nos reunimos, damos el crucero y regresamos al parque a cenar.',
        when: pending('fecha del Back to School Cruise'),
        where: 'Lancaster Dr · Best Bite Food Park',
        alt: 'Volante del Back to School Cruise en Best Bite Food Park',
      },
      school: {
        title: 'Cruise Into the School Year',
        tags: ['Lowriders', 'Familia', 'Comunidad'],
        description: 'Lowriders, comida, familia y comunidad, todo en el lote.',
        when: pending('fecha del Cruise Into the School Year'),
        where: 'Best Bite Food Park',
        alt: 'Volante de Cruise Into the School Year en Best Bite Food Park',
      },
    },
    storyLabel: 'Nuestra historia',
    storyH: 'De familia, y de Salem.',
    storyP1:
      'Best Bite empezó con una idea simple: darles a los cocineros independientes de Salem un lote propio, y darle al barrio un solo lugar para comer de todos a la vez. Las cocinas de aquí son negocios de familia, y casi todas llevan más de un año con nosotros.',
    storyP2:
      'El parque abre todos los días de doce a ocho. Trae a los niños, agarra una mesa y prueba un truck que todavía no conoces.',
    doorH: '¿Tienes un truck?',
    doorBody: `${open} de ${site.stalls.total} espacios están libres, mes a mes, sin contrato a largo plazo.`,
    doorCta: 'Pregunta por un espacio',
  },
} as const

export function Home() {
  const lang = useLang()
  const t = copy[lang]
  // The gallery's ground answers the food in front of it. Starts on the first
  // dish's wash so the first paint already matches; the gallery pushes the
  // rest as the reader cycles.
  const [wash, setWash] = useState<string>(dishes[0].wash)

  return (
    <>
      <Seo title={t.title} description={t.description} />
      <LocalBusinessJsonLd />

      {/* FULL-SCREEN HERO. Exactly one viewport tall, minus the masthead, so
          the next section is not visible until the reader scrolls. That is
          the brief, and `--header-h` (src/index.css) is the measured masthead
          height that makes the subtraction exact.

          `svh`, not `vh`: on phones `100vh` counts the browser chrome that
          hides on scroll, so a `vh` hero overshoots the screen on load — the
          exact failure this replaced.

          The photograph is `absolute inset-0`, contributing zero height, per
          design.md § Rhythm. The section's own height rules it entirely.

          Content is corner-anchored — eyebrow top, headline middle, locator
          bottom — so a full screen reads as composed rather than as one large
          empty photo. That is the move the Sunbeam reference makes.

          The drone footage Ray is sourcing drops straight in here: swap the
          <img> for a <video autoplay muted loop playsinline poster={heroSign}>
          and nothing else on the page changes. */}
      <section className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-between overflow-hidden bg-night px-5 py-9 text-paper sm:px-8 sm:py-12">
        <img
          src={heroSign}
          alt={t.heroAlt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%]"
        />
        {/* Scrim, heavier at the left where the type sits, so the sunlit right
            half of the photograph still reads as a bright daytime park. */}
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
          <div className="mt-8">
            <Button to={pathFor('vendors', lang)}>
              {t.cta} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>

        <div className="relative flex flex-wrap items-end justify-between gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.12em] text-paper/75 uppercase">
          <p>
            {site.address.street} · {site.address.city}, {site.address.state}
          </p>
          <p aria-hidden="true">{t.scroll}</p>
        </div>
      </section>

      {/* The hours, at flood footprint, straight off the hero. Yellow against
          the dark photograph is the page's hardest cut, and it puts the one
          fact every visitor needs in the second screen. */}
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
              {t.directions}
            </a>
          </div>
        </div>
      </section>

      {/* Appetite, and the door to the trucks. The ground tints to the active
          dish, which is Enrique's idea and the liveliest thing on the page.
          Light, not dark: this section used to be night, and four dark bands
          in a row made the whole site read brown. See design.md § Ground. */}
      <section
        style={{ backgroundColor: wash }}
        className="px-5 py-16 text-ink transition-colors duration-700 ease-out motion-reduce:transition-none sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl">
            <h2 className="text-3xl leading-[1.02] uppercase sm:text-5xl">{t.foodH}</h2>
            <p className="mt-5 leading-relaxed text-muted">{t.foodBody}</p>
          </div>
          <div className="mt-8 sm:mt-10">
            <FanGallery
              items={dishes.map((d) => ({
                src: d.img,
                label: typeof d.caption === 'string' ? d.caption : d.caption[lang],
                wash: d.wash,
              }))}
              labels={t.gallery}
              onWashChange={setWash}
            />
          </div>
          <div className="mt-10 flex justify-center">
            <Button to={pathFor('vendors', lang)}>{t.foodCta}</Button>
          </div>
        </div>
      </section>

      {/* Events, at flood footprint. Three flyers, not one: Enrique asked for
          a real sneak peek, and all three are the park's own marketing.
          Dashed outlines are the Sunbeam move — a card edge that reads as
          pinned-up paper rather than as a UI panel. */}
      <section className="bg-wash-events px-5 py-16 text-ink sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 max-w-xl">
              <h2 className="text-3xl leading-[1.02] uppercase sm:text-5xl">{t.eventsH}</h2>
              <p className="mt-5 leading-relaxed text-muted">{t.eventsBody}</p>
            </div>
            <div className="shrink-0">
              <Button to={pathFor('events', lang)}>{t.eventsCta}</Button>
            </div>
          </div>

          <ul className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {flyers.map((f) => {
              const e = t.flyers[f.key]
              return (
                <li key={f.key} className="min-w-0">
                  <EventCard
                    image={f.img}
                    imageAlt={e.alt}
                    title={e.title}
                    tags={e.tags}
                    description={e.description}
                    when={e.when}
                    where={e.where}
                    fit={f.fit}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Nuestra Historia, folded into Home per the Aug 10 descope. DRAFT
          copy; Ray's voice notes replace it. */}
      <Section className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <Label>{t.storyLabel}</Label>
          <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.storyH}</h2>
          <p className="mt-5 leading-relaxed text-muted">{t.storyP1}</p>
          <p className="mt-4 leading-relaxed text-muted">{t.storyP2}</p>
        </div>
      </Section>

      {/* The one honest door to Únete. Compact, low, and the only recruiting
          copy on the page. */}
      <Section className="border-t border-rule py-10 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl leading-[1.02] uppercase sm:text-3xl">{t.doorH}</h2>
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
