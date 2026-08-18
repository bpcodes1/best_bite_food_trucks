import { useState } from 'react'
import type { FormEvent } from 'react'
import { Seo } from '../components/Seo'
import { FaqJsonLd } from '../components/Schema'
import { Button, Chip, Label, Section, field } from '../components/ui'
import { useLang } from '../lib/useLang'
import { hoursRange, pending, site } from '../lib/site'
/* Was `best_bite_outdoor.webp`, a plate of food on a table. It illustrated a
   section headed "One lot, open every day" whose copy is about parking,
   seating and room to pull in — and it is also the Vendors hero, so the page
   was repeating another page's photograph to say something it did not say.
   `seating_tent.webp` shows the parking, the seating and the room, which is
   the paragraph beside it. Freed up when the karaoke band took Bryan's
   better tent shot. */
import parkPhoto from '../assets/park/seating_tent.webp'
import heroLot from '../assets/park/lot_wagon.webp'

/* Únete al Parque — the money page.
 *
 * Macrostructure: Narrative Workflow (design.md).
 * IA from Block 40: place, offer, economics, objections, ask.
 * Close from Kraken: numbered steps, four fields, an escape hatch, and
 * microcopy that answers "what am I committing to" and "when do I hear back".
 *
 * Every factual claim here traces to clients/ray-bestbite-context.xml or to
 * src/lib/site.ts. Anything Ray has not confirmed renders as visible brackets.
 *
 * BROUGHT UP TO HOME'S STANDARD 2026-08-18. It was built before the 2026-08-12
 * rebuild and was a generation behind. Measured against the checklist in
 * STATUS.md § "What Home looks like now, and why", it failed three of seven:
 *
 * EIGHT MONO EYEBROWS against a cap of two. That is precisely the "labelled
 * lists" tell the hallmark audit named on Home's first pass, and it is the
 * easiest rule to break by accident because an eyebrow always looks like an
 * improvement on the section you are looking at. Five were removed. The three
 * left mirror Home exactly: the hero locator, the accent band's own label, and
 * one section kicker (the numbered steps, where a kicker earns its place
 * because the sequence is the point). Everywhere else the h2 already says what
 * the section is, and the eyebrow above it was saying it a second time in a
 * smaller font.
 *
 * A TYPE-ONLY HERO on a page whose whole job is to make a truck owner picture
 * their truck in this lot. It now opens on the lot itself, scrimmed, with the
 * content corner-anchored the way Home's is. `lot_wagon.webp`, unused until
 * now: trucks trading on both sides and open asphalt between them, which is
 * the argument the page is making. NOT `park_sign.webp`, whose vendor board
 * still lists Adan's Grill and El Chilango, both cut from the roster — that
 * photograph cannot be published anywhere until Ray updates his sign.
 *
 * FIVE SECTIONS SHARING py-14 sm:py-20. Equal padding everywhere is the
 * templated tell in design.md § Rhythm. The rhythm now runs tight after the
 * hero and opens up toward the ask.
 *
 * The hero is a screen minus the masthead minus a 6rem peek, matching Vendors.
 * The rule across the site is now one line: Home takes the whole viewport,
 * every other page takes the viewport minus that peek, so the next section
 * always shows and no page but Home reads as a homepage.
 *
 * DARK STAYS AT TWO SURFACES. The hero took the night ground, so the park
 * section gave it up and is now cream. Counting the footer that is two, which
 * is the ration in src/index.css. Adding the hero without moving the park
 * section would have made three.
 */

const open = site.stalls.total - site.stalls.filled

const copy = {
  en: {
    title: 'Lease a Food Cart Space in Salem, OR | Best Bite Food Park',
    description: `${open} of ${site.stalls.total} spaces are open at Best Bite Food Park on Silverton Rd NE. Month to month, no long-term lease. Ask about a space.`,
    eyebrow: `Lease a space · Salem, OR`,
    /* Two lines, split like Home's. It was "Park here month to month. Leave any
       time." as one string, which wrapped to four lines in English and five in
       Spanish. A corner-anchored hero cannot carry that: the headline grows
       into the space the eyebrow and the locator are anchored in, and at 1280
       the three blocks collided. The verb was doing no work that the eyebrow
       and lede were not already doing. */
    h1a: 'Month to month.',
    h1b: 'Leave any time.',
    lede: `${site.stalls.filled} trucks are open at Best Bite right now, and every one of them has been here more than a year. ${open} of ${site.stalls.total} spaces are open.`,
    cta: 'Ask about a space',
    ctaMicro: '4 questions · 2 minutes · no commitment',
    heroAlt: 'The lot at Best Bite Food Park, with food trucks open on both sides',
    bandLabel: 'Open now',
    bandBody: `${open} of ${site.stalls.total} spaces are available. We are especially looking for Asian food.`,
    placeH: 'One lot, open every day.',
    placeBody:
      'Silverton Rd NE, with parking, seating and room to pull in. Open seven days a week.',
    placeAlt: 'Covered seating and open parking at Best Bite Food Park',
    hours: 'Hours',
    address: 'Address',
    includedH: 'What comes with a space.',
    rentH: 'How the rent works.',
    rentBody:
      'There is no long-term lease. If the spot does not work for you, it costs you a month, not a year. That is the whole difference.',
    stepsLabel: 'How it works',
    stepsH: 'Three steps.',
    steps: [
      { n: '01', h: 'Tell us about your truck', b: 'What you serve and when you want to start.' },
      { n: '02', h: 'We reply', b: 'We confirm what is open and what the rent is.' },
      { n: '03', h: 'You come see it', b: 'Walk the lot before you decide anything.' },
    ],
    faqH: 'Before you ask.',
    faq: [
      {
        q: 'Do I have to sign a long-term lease?',
        a: 'No. Rent is month to month.',
      },
      {
        q: 'What kind of food are you looking for?',
        a: 'Anything that is not already here. We are especially looking for Asian food, since the lineup is mostly Mexican right now.',
      },
      {
        q: 'How many spaces are open?',
        a: `${open} of ${site.stalls.total}.`,
      },
      {
        q: 'What does it cost?',
        a: 'Ask through the form below and we will give you the rent for the space that is open.',
      },
      { q: 'How big is a space?', a: pending('stall size') },
      { q: 'Is power and water included?', a: pending('utilities') },
    ],
    /* Was "Four questions." with an "Ask about a space" eyebrow above it. The
       eyebrow was one of the five cut on 2026-08-18, and the heading has to
       carry what the section is on its own. It now repeats the hero CTA's
       wording exactly, which is deliberate: a button that says "Ask about a
       space" landing on a heading that says the same thing confirms the reader
       arrived where they meant to. The four-questions signal is not lost —
       `ctaMicro` states it beside the button that sends people here. */
    formH: 'Ask about a space.',
    nameL: 'Your name',
    contactL: 'Email or Instagram handle',
    foodL: 'What do you serve?',
    notesL: 'Anything else',
    notesPh: 'When you want to start, size of your truck, questions',
    submit: 'Send',
    reassure: `No commitment, and nothing to sign. We reply within ${pending('reply time')}.`,
    escape: 'Or message us on Instagram',
    includedPending: pending('what is included'),
  },
  es: {
    title: 'Renta de Espacio para Food Truck en Salem, OR | Best Bite Food Park',
    description: `${open} de ${site.stalls.total} espacios están abiertos en Best Bite Food Park en Silverton Rd NE. Mes a mes, sin contrato a largo plazo.`,
    eyebrow: `Renta de espacio · Salem, OR`,
    h1a: 'Mes a mes.',
    h1b: 'Te vas cuando quieras.',
    lede: `${site.stalls.filled} trucks están abiertos en Best Bite ahora mismo, y todos llevan más de un año aquí. ${open} de ${site.stalls.total} espacios están libres.`,
    cta: 'Pregunta por un espacio',
    ctaMicro: '4 preguntas · 2 minutos · sin compromiso',
    heroAlt: 'El lote de Best Bite Food Park, con food trucks abiertos a los dos lados',
    bandLabel: 'Disponible ahora',
    bandBody: `${open} de ${site.stalls.total} espacios están disponibles. Buscamos especialmente comida asiática.`,
    placeH: 'Un solo lote, abierto todos los días.',
    placeBody:
      'Silverton Rd NE, con estacionamiento, asientos y lugar para entrar. Abierto los siete días.',
    placeAlt: 'Asientos bajo carpa y estacionamiento abierto en Best Bite Food Park',
    hours: 'Horario',
    address: 'Dirección',
    includedH: 'Qué incluye un espacio.',
    rentH: 'Cómo funciona la renta.',
    rentBody:
      'No hay contrato a largo plazo. Si el lugar no te funciona, te cuesta un mes y no un año. Esa es toda la diferencia.',
    stepsLabel: 'Cómo funciona',
    stepsH: 'Tres pasos.',
    steps: [
      {
        n: '01',
        h: 'Cuéntanos de tu truck',
        b: 'Qué vendes y cuándo quieres empezar.',
      },
      { n: '02', h: 'Te respondemos', b: 'Confirmamos qué hay disponible y cuánto es la renta.' },
      { n: '03', h: 'Vienes a verlo', b: 'Recorre el lote antes de decidir nada.' },
    ],
    faqH: 'Antes de preguntar.',
    faq: [
      {
        q: '¿Tengo que firmar un contrato a largo plazo?',
        a: 'No. La renta es mes a mes.',
      },
      {
        q: '¿Qué tipo de comida buscan?',
        a: 'Lo que todavía no está aquí. Buscamos especialmente comida asiática, porque ahora la mayoría es mexicana.',
      },
      {
        q: '¿Cuántos espacios hay disponibles?',
        a: `${open} de ${site.stalls.total}.`,
      },
      {
        q: '¿Cuánto cuesta?',
        a: 'Pregunta por el formulario de abajo y te decimos la renta del espacio disponible.',
      },
      { q: '¿De qué tamaño es un espacio?', a: pending('medidas del espacio') },
      { q: '¿Incluye luz y agua?', a: pending('servicios') },
    ],
    formH: 'Pregunta por un espacio.',
    nameL: 'Tu nombre',
    contactL: 'Correo o usuario de Instagram',
    foodL: '¿Qué vendes?',
    notesL: 'Algo más',
    notesPh: 'Cuándo quieres empezar, tamaño de tu truck, preguntas',
    submit: 'Enviar',
    reassure: `Sin compromiso y sin nada que firmar. Respondemos en ${pending('tiempo de respuesta')}.`,
    escape: 'O escríbenos por Instagram',
    includedPending: pending('qué incluye'),
  },
} as const

export function LeaseASpace() {
  const lang = useLang()
  const t = copy[lang]
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Deliberately not wired. The destination is undecided (Ray does not read
    // email, and Cynthia is post-delivery), so this shows a visible placeholder
    // rather than a success message it cannot honour. The previous build told
    // people their message had been received and sent nothing.
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Seo title={t.title} description={t.description} />
      {/* Only the answered questions reach Google — see FaqJsonLd. Two of the
          six are still brackets waiting on Ray, and a placeholder inside
          structured data is a machine-readable claim rather than a visible gap. */}
      <FaqJsonLd items={t.faq} />

      {/* Hero on the lot itself. Corner-anchored — eyebrow top, headline and
          ask in the middle, locator bottom — so a near-full screen reads as
          composed rather than as one big photograph. The scrim is heavy left
          where the type sits and nearly clear right, so the sunlit half still
          reads as a working daytime park. Both moves are Home's. */}
      {/* `gap-y-10` is load-bearing, not decoration. `justify-between` alone
          lets the three anchored blocks butt into each other the moment the
          headline grows — which is what a longer Spanish string does. The gap
          makes the section grow instead of letting the type collide. */}
      <section className="relative flex min-h-[calc(100svh-var(--header-h)-6rem)] flex-col justify-between gap-y-10 overflow-hidden bg-night px-5 py-9 text-paper sm:px-8 sm:py-12">
        <img
          src={heroLot}
          alt={t.heroAlt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[45%_60%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-night/92 via-night/72 to-night/30"
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
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80">{t.lede}</p>
          <div className="mt-9">
            <Button as="a" href="#ask">
              {t.cta} <span aria-hidden="true">→</span>
            </Button>
            <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-paper/70 uppercase">
              {t.ctaMicro}
            </p>
          </div>
        </div>

        <p className="relative font-mono text-[11px] tracking-[0.12em] text-paper/75 uppercase">
          {site.address.street} · {site.address.city}, {site.address.state}
        </p>
      </section>

      {/* Accent band at flood footprint, per design.md. Kraken's 10YR move. */}
      <section className="bg-brand-yellow px-5 py-10 text-brand-black sm:px-8 sm:py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
          <p className="font-display text-6xl leading-none sm:text-7xl">
            {open}
            <span className="text-3xl sm:text-4xl">/{site.stalls.total}</span>
          </p>
          <div className="min-w-0">
            <Label tone="accent">{t.bandLabel}</Label>
            <p className="mt-1.5 max-w-md text-lg leading-snug font-medium">{t.bandBody}</p>
          </div>
        </div>
      </section>

      {/* Cream, not night. This section WAS the page's one dark surface, for
          contrast against the yellow band. The hero took the night ground on
          2026-08-18 and the ration is two per page counting the footer, so this
          one gave its up. It loses nothing: the argument here is the address
          and the hours, which read better as dark type on paper than as light
          type on a photograph. */}
      <Section className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="min-w-0">
            <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.placeH}</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">{t.placeBody}</p>
            <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                  {t.address}
                </dt>
                <dd className="mt-1.5">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                  {t.hours}
                </dt>
                <dd className="mt-1.5">{hoursRange()}</dd>
              </div>
            </dl>
          </div>
          <img
            src={parkPhoto}
            alt={t.placeAlt}
            loading="lazy"
            decoding="async"
            className="h-full max-h-[26rem] w-full object-cover"
          />
        </div>
      </Section>

      {/* The economics, stated openly. Block 40's move: no burying it. On a
          wash so the run of cream sections between the yellow band and the
          footer is broken once. Home changes ground at every section; this page
          cannot do that without inventing colours, but it can do it here. */}
      <section className="bg-wash-burrito px-5 py-16 text-ink sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="min-w-0">
              <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.rentH}</h2>
              <p className="mt-5 max-w-md leading-relaxed text-muted">{t.rentBody}</p>
            </div>
            <div className="min-w-0">
              <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.includedH}</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip>{t.includedPending}</Chip>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kraken's numbered sequence. Keeps its eyebrow: the sequence is the
          point of the section, and "how it works" is what the numbers mean. */}
      <Section className="py-14 sm:py-20">
        <Label>{t.stepsLabel}</Label>
        <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.stepsH}</h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {t.steps.map((s) => (
            <li key={s.n} className="min-w-0 border-t-2 border-ink pt-4">
              <p className="font-display text-3xl">{s.n}</p>
              <h3 className="mt-3 text-lg leading-snug uppercase">{s.h}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Native <details>: keyboard accessible, and the answers are in the HTML
          for a crawler that never runs JavaScript. */}
      <Section className="border-t border-rule py-12 sm:py-16">
        <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.faqH}</h2>
        <div className="mt-8 max-w-3xl">
          {t.faq.map((f) => (
            <details key={f.q} className="group border-b border-rule py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg leading-snug marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                <span className="min-w-0">{f.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 font-mono text-sm text-muted group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 hidden shrink-0 font-mono text-sm text-muted group-open:block"
                >
                  −
                </span>
              </summary>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* PROMO SLOT — renders nothing on purpose.
          Ray confirmed there is no active vendor promotion. Do not carry the
          Square site's "first month rent free" text and do not invent a
          stand-in. Fill only when Ray gives one. See CLAUDE.md. */}

      <Section id="ask" className="border-t border-rule py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="min-w-0">
            <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.formH}</h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted">{t.reassure}</p>
          </div>

          <form onSubmit={handleSubmit} className="min-w-0 max-w-xl">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <label
                  htmlFor="lease-name"
                  className="font-mono text-[11px] tracking-[0.12em] uppercase"
                >
                  {t.nameL}
                </label>
                <input id="lease-name" name="name" type="text" required className={field} />
              </div>
              <div className="min-w-0">
                <label
                  htmlFor="lease-contact"
                  className="font-mono text-[11px] tracking-[0.12em] uppercase"
                >
                  {t.contactL}
                </label>
                <input id="lease-contact" name="contact" type="text" required className={field} />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="lease-food"
                className="font-mono text-[11px] tracking-[0.12em] uppercase"
              >
                {t.foodL}
              </label>
              <input id="lease-food" name="food" type="text" required className={field} />
            </div>

            <div className="mt-5">
              <label
                htmlFor="lease-notes"
                className="font-mono text-[11px] tracking-[0.12em] uppercase"
              >
                {t.notesL}
              </label>
              <textarea
                id="lease-notes"
                name="notes"
                rows={3}
                placeholder={t.notesPh}
                className={field}
              />
            </div>

            <div className="mt-7">
              <Button type="submit">
                {t.submit} <span aria-hidden="true">→</span>
              </Button>
              <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
                {t.escape} {site.social.instagram}
              </p>
              {submitted && (
                <p className="mt-4 border border-ink px-3 py-2 font-mono text-xs">
                  {pending('form destination, not wired yet')}
                </p>
              )}
            </div>
          </form>
        </div>
      </Section>
    </>
  )
}
