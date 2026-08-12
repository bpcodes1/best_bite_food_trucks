import { useState } from 'react'
import type { FormEvent } from 'react'
import { Seo } from '../components/Seo'
import { Button, Chip, Label, Section } from '../components/ui'
import { useLang } from '../lib/useLang'
import { pending, site } from '../lib/site'
import parkPhoto from '../assets/best_bite_outdoor.webp'

/* Únete al Parque — the money page.
 *
 * Macrostructure: Narrative Workflow (design.md).
 * IA from Block 40: place, offer, economics, objections, ask.
 * Close from Kraken: numbered steps, four fields, an escape hatch, and
 * microcopy that answers "what am I committing to" and "when do I hear back".
 *
 * Every factual claim here traces to clients/ray-bestbite-context.xml or to
 * src/lib/site.ts. Anything Ray has not confirmed renders as visible brackets.
 */

const open = site.stalls.total - site.stalls.filled

const copy = {
  en: {
    title: 'Lease a Food Cart Space in Salem, OR | Best Bite Food Park',
    description: `${open} of ${site.stalls.total} spaces are open at Best Bite Food Park on Silverton Rd NE. Month to month, no long-term lease. Ask about a space.`,
    eyebrow: `Lease a space · Salem, OR`,
    h1: 'Park here month to month. Leave any time.',
    lede: `${site.stalls.filled} trucks are open at Best Bite right now, and every one of them has been here more than a year. ${open} of ${site.stalls.total} spaces are open.`,
    cta: 'Ask about a space',
    ctaMicro: '4 questions · 2 minutes · no commitment',
    bandLabel: 'Open now',
    bandBody: `${open} of ${site.stalls.total} spaces are available. We are especially looking for Asian food.`,
    placeLabel: 'The park',
    placeH: 'One lot, open every day.',
    placeBody:
      'Silverton Rd NE, with parking, seating and room to pull in. Open seven days a week.',
    hours: 'Hours',
    address: 'Address',
    includedLabel: 'What you get',
    includedH: 'What comes with a space.',
    rentLabel: 'The rent',
    rentH: 'What it costs.',
    rentBody:
      'There is no long-term lease. If the spot does not work for you, it costs you a month, not a year. That is the whole difference.',
    stepsLabel: 'How it works',
    stepsH: 'Three steps.',
    steps: [
      { n: '01', h: 'Tell us about your truck', b: 'What you serve and when you want to start.' },
      { n: '02', h: 'We reply', b: 'We confirm what is open and what the rent is.' },
      { n: '03', h: 'You come see it', b: 'Walk the lot before you decide anything.' },
    ],
    faqLabel: 'Questions',
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
      { q: 'What does it cost?', a: pending('rent amount, ask Ray') },
      { q: 'How big is a space?', a: pending('stall dimensions, ask Ray') },
      { q: 'Is power and water included?', a: pending('utilities, ask Ray') },
    ],
    formLabel: 'Ask about a space',
    formH: 'Four questions.',
    nameL: 'Your name',
    contactL: 'Email or Instagram handle',
    foodL: 'What do you serve?',
    notesL: 'Anything else',
    notesPh: 'When you want to start, size of your truck, questions',
    submit: 'Send',
    reassure: `No commitment, and nothing to sign. We reply within ${pending('response time, ask Ray')}.`,
    escape: 'Or message us on Instagram',
  },
  es: {
    title: 'Renta de Espacio para Food Truck en Salem, OR | Best Bite Food Park',
    description: `${open} de ${site.stalls.total} espacios están abiertos en Best Bite Food Park en Silverton Rd NE. Mes a mes, sin contrato a largo plazo.`,
    eyebrow: `Renta de espacio · Salem, OR`,
    h1: 'Renta mes a mes. Te puedes ir cuando quieras.',
    lede: `${site.stalls.filled} trucks están abiertos en Best Bite ahora mismo, y todos llevan más de un año aquí. ${open} de ${site.stalls.total} espacios están libres.`,
    cta: 'Pregunta por un espacio',
    ctaMicro: '4 preguntas · 2 minutos · sin compromiso',
    bandLabel: 'Disponible ahora',
    bandBody: `${open} de ${site.stalls.total} espacios están disponibles. Buscamos especialmente comida asiática.`,
    placeLabel: 'El parque',
    placeH: 'Un solo lote, abierto todos los días.',
    placeBody:
      'Silverton Rd NE, con estacionamiento, asientos y lugar para entrar. Abierto los siete días.',
    hours: 'Horario',
    address: 'Dirección',
    includedLabel: 'Qué recibes',
    includedH: 'Qué incluye un espacio.',
    rentLabel: 'La renta',
    rentH: 'Cuánto cuesta.',
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
    faqLabel: 'Preguntas',
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
      { q: '¿Cuánto cuesta?', a: pending('renta, preguntar a Ray') },
      { q: '¿De qué tamaño es un espacio?', a: pending('medidas del espacio, preguntar a Ray') },
      { q: '¿Incluye luz y agua?', a: pending('servicios, preguntar a Ray') },
    ],
    formLabel: 'Pregunta por un espacio',
    formH: 'Cuatro preguntas.',
    nameL: 'Tu nombre',
    contactL: 'Correo o usuario de Instagram',
    foodL: '¿Qué vendes?',
    notesL: 'Algo más',
    notesPh: 'Cuándo quieres empezar, tamaño de tu truck, preguntas',
    submit: 'Enviar',
    reassure: `Sin compromiso y sin nada que firmar. Respondemos en ${pending('tiempo de respuesta, preguntar a Ray')}.`,
    escape: 'O escríbenos por Instagram',
  },
} as const

const field =
  'mt-1.5 w-full border border-rule bg-transparent px-3 py-2.5 text-ink ' +
  'placeholder:text-muted/70 focus:border-ink focus:outline-none'

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

      {/* Hero. Left-biased, asymmetric, generous — then the page compresses. */}
      <Section className="pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="max-w-3xl">
          <Label>{t.eyebrow}</Label>
          <h1 className="mt-5 text-[2.6rem] leading-[0.95] uppercase sm:text-6xl lg:text-7xl">
            {t.h1}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.lede}</p>
          <div className="mt-9">
            <Button as="a" href="#ask">
              {t.cta} <span aria-hidden="true">→</span>
            </Button>
            <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
              {t.ctaMicro}
            </p>
          </div>
        </div>
      </Section>

      {/* Accent band at flood footprint, per design.md. Kraken's 10YR move. */}
      <section className="bg-brand-yellow px-5 py-10 text-brand-black sm:px-8">
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

      {/* Night section. Dark carries the photography — never the vendor logos. */}
      <Section ground="night" className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="min-w-0">
            <Label tone="night">{t.placeLabel}</Label>
            <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.placeH}</h2>
            <p className="mt-5 max-w-md leading-relaxed text-night-muted">{t.placeBody}</p>
            <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[11px] tracking-[0.12em] text-night-muted uppercase">
                  {t.address}
                </dt>
                <dd className="mt-1.5">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.12em] text-night-muted uppercase">
                  {t.hours}
                </dt>
                <dd className="mt-1.5">
                  {site.hours.open} - {site.hours.close}
                </dd>
              </div>
            </dl>
          </div>
          <img
            src={parkPhoto}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full max-h-[26rem] w-full object-cover"
          />
        </div>
      </Section>

      {/* The economics, stated openly. Block 40's move: no burying it. */}
      <Section className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <Label>{t.rentLabel}</Label>
            <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.rentH}</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">{t.rentBody}</p>
          </div>
          <div className="min-w-0">
            <Label>{t.includedLabel}</Label>
            <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.includedH}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              <Chip>{pending('what is included, ask Ray')}</Chip>
            </div>
          </div>
        </div>
      </Section>

      {/* Kraken's numbered sequence. */}
      <Section className="border-t border-rule py-14 sm:py-20">
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
      <Section className="border-t border-rule py-14 sm:py-20">
        <Label>{t.faqLabel}</Label>
        <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.faqH}</h2>
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

      <Section id="ask" className="border-t border-rule py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="min-w-0">
            <Label>{t.formLabel}</Label>
            <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.formH}</h2>
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
