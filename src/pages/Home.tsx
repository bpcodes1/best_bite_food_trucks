import { useState } from 'react'
import { Seo } from '../components/Seo'
import { LocalBusinessJsonLd } from '../components/Schema'
import { Button, Label, Section } from '../components/ui'
import { useLang } from '../lib/useLang'
import { pathFor } from '../lib/routes'
import { fullAddress, hoursRange, site } from '../lib/site'
import heroSign from '../assets/best_bite_sign.jpg'
import karaokeFlyer from '../assets/events/karaoke.webp'
import cruiseFlyer from '../assets/events/back_to_school_cruise.webp'
import schoolFlyer from '../assets/events/Cruise-school-year.jpeg'
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
 * - EYEBROWS ARE CAPPED AT TWO SECTION KICKERS: the hero locator and the story
 *   label. Every section carrying a mono eyebrow was the audit's "labelled
 *   lists" tell. Do not add one to a new section without removing one.
 *   The two accent bands each carry a mono line naming their numeral — "open
 *   every day" above the hours, "spaces free" below the 6/15. Those are units
 *   on numbers, not section kickers, and they do not count against the two.
 *   The rule exists to stop every section wearing a label; it is not a ban on
 *   saying what a number is.
 * - SECTION PADDING VARIES on purpose. Equal padding everywhere is the
 *   templated tell design.md § Rhythm names.
 * - The arrow glyph appears on the hero CTA and the door CTA only.
 *
 * ONE HONEST DOOR TO ÚNETE, AT THE BOTTOM, and no recruiting copy anywhere
 * else. That placement is deliberate and stays: the audit found the Square site
 * bleeding aspirational vendor-recruitment language into its customer-facing
 * hero, and this page is overwhelmingly for eaters.
 *
 * This comment used to justify the placement with "vendors reach the leasing
 * page through search, not by browsing here." That is not true yet and will not
 * be for months — the head-to-head found Google ranking aggregators rather than
 * individual food park sites for both target queries, so Únete does not rank.
 * The real reason the placement holds is simpler: "Lease a Space" is a
 * top-level nav item at 0% scroll depth on every address, so a truck owner has
 * a one-click path from the moment they land. This block's job is therefore
 * conversion, not discovery — which is an argument for making it loud, not for
 * moving it up.
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
   2026-08-12. As of 2026-08-19 every date here is read off the artwork and
   this page holds no bracketed dates at all — see the note on the cruise entry
   below for where the last one had been hiding. Events owns the full list.

   `past` marks a finished event. Two of the three are past, because the cruise
   ran on 16 August 2026 and both cruise flyers are that same afternoon. They
   keep their cards rather than being removed: Enrique's call 2026-08-19, and
   the flyers are good proof the park actually programmes things. What they must
   not do is read as upcoming.

   `fit` and `focus` are per flyer because they depend on the art, not on the
   layout. See the note in EventCard: a flyer fills its square unless something
   that matters sits close enough to an edge to be cropped away.

   The school-year poster is the one that needed a `focus`. Enrique supplied
   the real artwork 2026-08-12, replacing a partial screen capture that had a
   scrollbar baked into its edge. The real one is 1290x1661 — taller than it is
   wide — so it can slide 371px inside its square, and where it stops decides
   what survives. Centred (50) cuts at y=186 and slices the Best Bite mark in
   half. Hard to the top (0) keeps the mark but halves the date bubble. 19 is
   a 70px nudge, the largest that still clears the mark, and it lands with the
   logo, the headline, the tagline, the date and the 3PM-6PM pill all whole.
   Checked by rendering the crop, not by reasoning about it. */
const flyers = [
  { key: 'karaoke', img: karaokeFlyer, fit: 'fill', focus: 50, past: false },
  { key: 'cruise', img: cruiseFlyer, fit: 'fill', focus: 50, past: true },
  { key: 'school', img: schoolFlyer, fit: 'fill', focus: 19, past: true },
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
      /* THE TWO CRUISE FLYERS ARE ONE AFTERNOON, and they cover different
         halves of it. This one is the drive: meet at the Burger King on
         Lancaster, cruise the strip 1pm to 3pm. The school-year poster below is
         the arrival, 3pm to 6pm in the lot. Confirmed by Enrique 2026-08-19.

         Its date was a placeholder bracket until then, and it never needed to
         be — the date was printed on the other flyer all along. (Do not quote
         the placeholder helper by name in a comment: `npm run pending` is a
         grep over source, and a comment mentioning it registers as an unfilled
         placeholder that renders nowhere. That cost a confused count once.)
         Both now carry the real times off their own artwork, which is what
         makes two cards for one day read as two parts rather than as the park
         double-counting an event. */
      cruise: {
        title: 'Back to School Cruise',
        tags: ['Cars', 'Sunday'],
        description: 'Lowriders met at the Burger King on Lancaster Drive and cruised the strip.',
        when: 'Sunday, August 16, 2026, 1:00pm - 3:00pm',
        where: 'Lancaster Dr · Salem',
        alt: 'Flyer for the Back to School Cruise at Best Bite Food Park',
      },
      school: {
        title: 'Cruise Into the School Year',
        tags: ['Lowriders', 'Family', 'Community'],
        description: 'Lowriders, food, family and community, all in the lot.',
        /* Date, time and address are printed on the poster Enrique supplied
           2026-08-12. Read off the artwork, not inferred. Time is formatted
           the way `hoursRange()` formats the park's own hours, so the two
           never read as coming from different sites. */
        when: 'Sunday, August 16, 2026, 3:00pm - 6:00pm',
        where: 'Best Bite Food Park',
        alt: 'Flyer for Cruise Into the School Year at Best Bite Food Park',
      },
    },
    pastLabel: 'Past',
    storyLabel: 'Our story',
    storyH: 'Family run, Salem grown.',
    storyP1:
      'Best Bite started with a simple idea: give Salem’s independent cooks a lot of their own, and give the neighborhood one place to eat from all of them at once. The kitchens here are small family businesses, and most of them have been with us for more than a year.',
    storyP2:
      'The park is open every day, noon to eight. Bring the kids, take a table, and try a truck you have not tried yet.',
    doorH: 'Got a truck?',
    /* The count moved out of this sentence and into the numeral beside it, so
       repeating the fraction here would say the same thing twice in one band.

       What replaced it is the OTHER number. Enrique read "6/15" as "we have six
       vendors" on 2026-08-19, and he has been living in this project for days —
       a truck owner glancing at it has no chance. A fraction invites being read
       as a ratio of occupancy, so the band now states both counts in words and
       leaves nothing to infer. Nine kitchens already trading is also the
       strongest thing we can tell a prospective vendor: it is proof of traffic. */
    doorUnit: 'Spaces free',
    doorBody: `${site.stalls.filled} kitchens are already here. Month to month, no long-term lease.`,
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
        description:
          'Los lowriders se reunieron en el Burger King de Lancaster Drive y dieron el crucero.',
        when: 'Domingo 16 de agosto de 2026, 1:00pm - 3:00pm',
        where: 'Lancaster Dr · Salem',
        alt: 'Volante del Back to School Cruise en Best Bite Food Park',
      },
      school: {
        title: 'Cruise Into the School Year',
        tags: ['Lowriders', 'Familia', 'Comunidad'],
        description: 'Lowriders, comida, familia y comunidad, todo en el lote.',
        when: 'Domingo 16 de agosto de 2026, 3:00pm - 6:00pm',
        where: 'Best Bite Food Park',
        alt: 'Volante de Cruise Into the School Year en Best Bite Food Park',
      },
    },
    pastLabel: 'Ya pasó',
    storyLabel: 'Nuestra historia',
    storyH: 'De familia, y de Salem.',
    storyP1:
      'Best Bite empezó con una idea simple: darles a los cocineros independientes de Salem un lote propio, y darle al barrio un solo lugar para comer de todos a la vez. Las cocinas de aquí son negocios de familia, y casi todas llevan más de un año con nosotros.',
    storyP2:
      'El parque abre todos los días de doce a ocho. Trae a los niños, agarra una mesa y prueba un truck que todavía no conoces.',
    doorH: '¿Tienes un truck?',
    doorUnit: 'Espacios libres',
    doorBody: `${site.stalls.filled} cocinas ya están aquí. Mes a mes, sin contrato a largo plazo.`,
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
                    focus={f.focus}
                    past={f.past}
                    pastLabel={t.pastLabel}
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

      {/* The one honest door to Únete, and the only recruiting copy on the page.
          Rebuilt 2026-08-19 on Enrique's read that it disappeared into the story
          section above it. He was right, and it was worse than blending: the
          section was demoted on three axes at once. Same cream ground as the
          story with a 1px hairline between them; a heading one step SMALLER
          than the story's; and the only outline button on a page where every
          other CTA is solid. The most commercially important block on Home was
          the quietest thing on it.

          The fix is design.md § Ground, which this section was simply not
          following: "accent at flood footprint — full-bleed bands, solid
          buttons, large numerals. Not a timid 3% underline." Únete already
          renders exactly this fact exactly this way, so a truck owner now meets
          the same number in the same treatment on both pages.

          NOT MOVED HIGHER, deliberately. The audit's open finding reads this as
          a discovery problem because the CTA sits at 84% down the page. It is
          not: "Lease a Space" is a top-level nav item at 0% scroll depth on
          every address, so a truck owner has a one-click path from the moment
          they land. This block's job is converting someone who read the whole
          page, which argues for making it persuasive rather than early — and
          design.md gives Home one door at the bottom precisely to stop
          recruiting copy bleeding into the eater experience, which is the fault
          the audit found on the Square site.

          SECOND ACCENT BAND ON THE PAGE, alongside the hours. They sit roughly
          4,000px apart on a phone, carry different numbers for different
          audiences, and bookend the page. The unit sits BELOW this numeral
          where the hours band puts its label above, so the two do not read as
          the same band repeated.

          The "spaces free" line is a unit on a numeral, not a section eyebrow,
          and does not count against the cap of two — see STATUS.md § "What Home
          looks like now, and why". The rule exists to stop every section
          carrying a mono kicker; it is not a ban on labelling a number. */}
      <section className="bg-brand-yellow px-5 py-12 text-brand-black sm:px-8 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <div className="shrink-0">
              <p className="font-display text-6xl leading-none sm:text-7xl">
                {open}
                <span className="text-3xl sm:text-4xl">/{site.stalls.total}</span>
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.14em] uppercase">{t.doorUnit}</p>
            </div>
            <div className="min-w-0">
              <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.doorH}</h2>
              <p className="mt-2 max-w-md text-lg leading-snug font-medium">{t.doorBody}</p>
            </div>
          </div>
          <div className="shrink-0">
            <Button to={pathFor('lease', lang)} variant="invert">
              {t.doorCta} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
