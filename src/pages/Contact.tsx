import { useState } from 'react'
import type { FormEvent } from 'react'
import { Seo } from '../components/Seo'
import { LocalBusinessJsonLd } from '../components/Schema'
import { Button, Label, Section, field, fieldLabel } from '../components/ui'
import { useLang } from '../lib/useLang'
import { pathFor } from '../lib/routes'
import { fullAddress, hoursRange, pending, site } from '../lib/site'

/* Contact — the short page.
 *
 * Macrostructure: Long Document (design.md). NAP, hours, map, the same short
 * form philosophy as Únete: three fields, an escape hatch, expectation-setting
 * microcopy. This page also establishes the LocalBusiness schema pattern.
 *
 * The one strategic element is the cross-door at the bottom: a truck owner who
 * lands on Contact instead of the leasing page gets pointed there before they
 * write a message the form was not built for.
 */

const copy = {
  en: {
    title: 'Contact Best Bite Food Park | Salem, OR',
    description: `Best Bite Food Park, ${fullAddress()}. Open every day, ${hoursRange()}. Directions, hours, and a form that reaches the park.`,
    eyebrow: 'Contact · Salem, OR',
    h1: 'One lot on Silverton Road.',
    lede: 'Come by any day from noon to eight, or write and we will point you the right way.',
    visitLabel: 'Visit',
    visitH: 'Where and when.',
    address: 'Address',
    hours: 'Hours',
    everyDay: 'Open every day',
    directions: 'Get directions',
    mapTitle: 'Map to Best Bite Food Park',
    formLabel: 'Write to us',
    formH: 'Ask anything.',
    nameL: 'Your name',
    contactL: 'Email or Instagram handle',
    messageL: 'Your message',
    submit: 'Send',
    reassure: `We reply within ${pending('reply time')}.`,
    escape: 'Or message us on Instagram',
    leaseLabel: 'For truck owners',
    leaseH: 'Asking about a space?',
    leaseBody: 'Rent, terms, and what comes with a spot are all on the leasing page.',
    leaseCta: 'See the leasing page',
  },
  es: {
    title: 'Contacto | Best Bite Food Park en Salem, OR',
    description: `Best Bite Food Park, ${fullAddress()}. Abierto todos los días, ${hoursRange()}. Cómo llegar, horario y un formulario que sí llega al parque.`,
    eyebrow: 'Contacto · Salem, OR',
    h1: 'Un solo lote en Silverton Road.',
    lede: 'Ven cualquier día de doce a ocho, o escríbenos y te orientamos.',
    visitLabel: 'Visítanos',
    visitH: 'Dónde y cuándo.',
    address: 'Dirección',
    hours: 'Horario',
    everyDay: 'Abierto todos los días',
    directions: 'Cómo llegar',
    mapTitle: 'Mapa a Best Bite Food Park',
    formLabel: 'Escríbenos',
    formH: 'Pregunta lo que sea.',
    nameL: 'Tu nombre',
    contactL: 'Correo o usuario de Instagram',
    messageL: 'Tu mensaje',
    submit: 'Enviar',
    reassure: `Respondemos en ${pending('tiempo de respuesta')}.`,
    escape: 'O escríbenos por Instagram',
    leaseLabel: 'Para dueños de trucks',
    leaseH: '¿Preguntas por un espacio?',
    leaseBody: 'La renta, las condiciones y qué incluye un espacio están en Únete al Parque.',
    leaseCta: 'Ir a Únete al Parque',
  },
} as const

/** Both built from the NAP string, so the map can never point somewhere the text does not. */
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress())}&output=embed`
const mapDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress())}`

export function Contact() {
  const lang = useLang()
  const t = copy[lang]
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Deliberately not wired — same reason as Únete's form. A visible
    // placeholder beats a success message the site cannot honour.
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Seo title={t.title} description={t.description} />
      <LocalBusinessJsonLd />

      <Section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-3xl">
          <Label>{t.eyebrow}</Label>
          <h1 className="mt-5 text-[2.6rem] leading-[0.95] uppercase sm:text-6xl">{t.h1}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.lede}</p>
        </div>
      </Section>

      {/* NAP + map. The visible strings and the map query come from site.ts. */}
      <Section className="border-t border-rule py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="min-w-0">
            <Label>{t.visitLabel}</Label>
            <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.visitH}</h2>
            <dl className="mt-8 grid gap-6">
              <div>
                <dt className={`${fieldLabel} text-muted`}>{t.address}</dt>
                <dd className="mt-1.5 text-lg">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </dd>
              </div>
              <div>
                <dt className={`${fieldLabel} text-muted`}>{t.hours}</dt>
                <dd className="mt-1.5 font-mono text-lg">{hoursRange()}</dd>
                <dd className="text-muted">{t.everyDay}</dd>
              </div>
            </dl>
            <div className="mt-9">
              <Button as="a" href={mapDirections}>
                {t.directions} <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
          <iframe
            src={mapEmbed}
            title={t.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full border border-rule sm:h-96"
          />
        </div>
      </Section>

      <Section className="border-t border-rule py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="min-w-0">
            <Label>{t.formLabel}</Label>
            <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.formH}</h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted">{t.reassure}</p>
          </div>

          <form onSubmit={handleSubmit} className="min-w-0 max-w-xl">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="contact-name" className={fieldLabel}>
                  {t.nameL}
                </label>
                <input id="contact-name" name="name" type="text" required className={field} />
              </div>
              <div className="min-w-0">
                <label htmlFor="contact-contact" className={fieldLabel}>
                  {t.contactL}
                </label>
                <input id="contact-contact" name="contact" type="text" required className={field} />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="contact-message" className={fieldLabel}>
                {t.messageL}
              </label>
              <textarea id="contact-message" name="message" rows={4} required className={field} />
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

      {/* The cross-door. Truck owners get routed before they write. */}
      <Section ground="night" className="py-12 sm:py-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <Label tone="night">{t.leaseLabel}</Label>
            <h2 className="mt-3 text-2xl leading-[1.02] uppercase sm:text-3xl">{t.leaseH}</h2>
            <p className="mt-3 max-w-md leading-relaxed text-night-muted">{t.leaseBody}</p>
          </div>
          <div className="shrink-0">
            <Button to={pathFor('lease', lang)}>
              {t.leaseCta} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
