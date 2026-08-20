import { useState } from 'react'
import type { FormEvent } from 'react'
import { Seo } from '../components/Seo'
import { LocalBusinessJsonLd } from '../components/Schema'
import { Button, Label, Section, SocialLink, field, fieldLabel } from '../components/ui'
import { useLang } from '../lib/useLang'
import { pathFor } from '../lib/routes'
import { fullAddress, hoursRange, pending, site } from '../lib/site'
/* The park sign from Silverton Rd, cropped to the branded panel and sky.
   Contact is the "find us" page and this is literally the object a visitor is
   looking for from the road, so it is the right subject for the hero.

   THE CROP IS THE WHOLE POINT. Every one of the seventeen sign photographs
   includes the vendor board, and that board is out of date — it lists Adan's
   Grill, El Chilango, Syrian House and J JS Boba, none of which are on the
   roster, and omits Las Cuatas Lokas, Nieve Casera and Que Rollon Sushi, which
   are. Publishing it would put a wrong vendor list on the site in a photograph,
   where nobody would think to check it. `park_sign.webp` is the uncropped file
   and stays unused for exactly this reason.

   THE CROP IS 2800x1950 OF IMG_8022, TOP LEFT. That stops above the vendor
   board and puts the sign column near the centre of the frame, which is what
   makes it survive both container shapes: at 375 the hero is portrait and
   object-cover keeps roughly the middle 45% of the width; at 1280 it is
   landscape and crops vertically instead. A centred subject survives both.

   Two earlier attempts are worth not repeating. A 45%-height strip put the
   neighbouring gym's boxing gloves more prominently in frame than the client's
   own mark. A 28% strip fixed that but was 4.76:1, and on a phone it cropped to
   unreadable letterforms — the sign became abstract yellow shapes. Aspect ratio
   is the variable that matters here, not how much of the sign is in the source.
   Ladder the crop and look at it at BOTH widths; do not pick a number by
   reasoning about it. */
import heroSign from '../assets/park/entrance_sign.webp'

/* Contact — the short page.
 *
 * Macrostructure: Long Document (design.md). NAP, hours, map, the same short
 * form philosophy as Únete: three fields, an escape hatch, expectation-setting
 * microcopy. This page also establishes the LocalBusiness schema pattern.
 *
 * The one strategic element is the cross-door at the bottom: a truck owner who
 * lands on Contact instead of the leasing page gets pointed there before they
 * write a message the form was not built for.
 *
 * BROUGHT UP TO HOME'S STANDARD 2026-08-19, last of the three, and it was the
 * furthest behind — it failed five of the seven checks in STATUS.md § "What
 * Home looks like now, and why", against Únete's three and Events' two.
 *
 * FOUR CREAM SECTIONS IN A ROW, then the footer. One ground change on the
 * entire page, at the very end. Now night → accent → cream → wash → cream →
 * footer.
 *
 * NO ACCENT BAND AT ALL. The only address on the site with no yellow on it, on
 * a page whose whole job is a street address. The address now takes the flood,
 * with the directions CTA in it: that is the primary action of this page and it
 * was previously a solid button two thirds of the way down a cream column.
 *
 * FOUR MONO EYEBROWS against two. Same habit as the other two pages — Únete had
 * eight, Events five, this four. All three section kickers are gone; the hero
 * locator and the accent band's label remain.
 *
 * THREE ARROW GLYPHS, on directions, submit and the cross-door. The glyph marks
 * the primary path in and the primary path out and means nothing if every
 * button wears one. The form's submit lost its arrow; directions and the
 * cross-door keep theirs.
 *
 * A TYPE-ONLY HERO, the same defect the other two had.
 *
 * The cross-door gave up its night ground so the hero could take it. Two dark
 * surfaces per page counting the footer, per src/index.css.
 */

const copy = {
  en: {
    title: 'Contact Best Bite Food Park | Salem, OR',
    description: `Best Bite Food Park, ${fullAddress()}. Open every day, ${hoursRange()}. Directions, hours, and a form that reaches the park.`,
    eyebrow: 'Contact · Salem, OR',
    /* Two lines for the corner-anchored hero, the lesson Únete taught: the
       headline grows into the space the eyebrow and locator are anchored in. */
    h1a: 'One lot on',
    h1b: 'Silverton Road.',
    lede: 'Come by any day from noon to eight, or write and we will point you the right way.',
    heroAlt: 'The Best Bite Food Park sign on Silverton Rd NE, seen from the road',
    bandLabel: 'Visit',
    visitH: 'Where and when.',
    address: 'Address',
    hours: 'Hours',
    everyDay: 'Open every day',
    directions: 'Get directions',
    mapTitle: 'Map to Best Bite Food Park',
    formH: 'Ask anything.',
    nameL: 'Your name',
    contactL: 'Email or Instagram handle',
    messageL: 'Your message',
    submit: 'Send',
    reassure: `We reply within ${pending('reply time')}.`,
    escape: 'Or message us on Instagram',
    leaseH: 'Asking about a space?',
    leaseBody: 'Rent, terms, and what comes with a spot are all on the leasing page.',
    leaseCta: 'See the leasing page',
  },
  es: {
    title: 'Contacto | Best Bite Food Park en Salem, OR',
    description: `Best Bite Food Park, ${fullAddress()}. Abierto todos los días, ${hoursRange()}. Cómo llegar, horario y un formulario que sí llega al parque.`,
    eyebrow: 'Contacto · Salem, OR',
    h1a: 'Un solo lote',
    h1b: 'en Silverton Road.',
    lede: 'Ven cualquier día de doce a ocho, o escríbenos y te orientamos.',
    heroAlt: 'El letrero de Best Bite Food Park en Silverton Rd NE, visto desde la calle',
    bandLabel: 'Visítanos',
    visitH: 'Dónde y cuándo.',
    address: 'Dirección',
    hours: 'Horario',
    everyDay: 'Abierto todos los días',
    directions: 'Cómo llegar',
    mapTitle: 'Mapa a Best Bite Food Park',
    formH: 'Pregunta lo que sea.',
    nameL: 'Tu nombre',
    contactL: 'Correo o usuario de Instagram',
    messageL: 'Tu mensaje',
    submit: 'Enviar',
    reassure: `Respondemos en ${pending('tiempo de respuesta')}.`,
    escape: 'O escríbenos por Instagram',
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

      {/* The sign from the road, corner-anchored like every other hero.
          The source is 4.76:1 and the container is portrait at 375, so
          object-cover shows roughly a sixth of its width there. The sign sits
          in the left third, so the position is pulled left to keep it in frame.
          Tuned by screenshot, not by arithmetic. */}
      <section className="relative flex min-h-[calc(100svh-var(--header-h)-6rem)] flex-col justify-between gap-y-10 overflow-hidden bg-night px-5 py-9 text-paper sm:px-8 sm:py-12">
        <img
          src={heroSign}
          alt={t.heroAlt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-night/92 via-night/74 to-night/35"
        />

        <div className="relative">
          <Label tone="night">{t.eyebrow}</Label>
        </div>

        <div className="relative max-w-3xl">
          <h1 className="text-[2.6rem] leading-[0.95] uppercase sm:text-6xl">
            {t.h1a}
            <br />
            {t.h1b}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80">{t.lede}</p>
        </div>

        <p className="relative font-mono text-[11px] tracking-[0.12em] text-paper/75 uppercase">
          {hoursRange()} · {t.everyDay}
        </p>
      </section>

      {/* THE ADDRESS AT FLOOD FOOTPRINT, with the one action this page exists
          for. Contact had no accent band at all — the only address on the site
          with no yellow on it, on the page whose entire job is a street
          address. The directions button was previously a solid yellow button
          two thirds of the way down a cream column, which is exactly the "timid
          3% underline" design.md § Ground warns against. */}
      <section className="bg-brand-yellow px-5 py-12 text-brand-black sm:px-8 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="min-w-0">
            <Label tone="accent">{t.bandLabel}</Label>
            <p className="mt-3 font-display text-3xl leading-[1.05] uppercase sm:text-5xl">
              {site.address.street}
            </p>
            <p className="mt-2 text-lg leading-snug font-medium">
              {site.address.city}, {site.address.state} {site.address.zip}
            </p>
          </div>
          <div className="shrink-0">
            <Button as="a" href={mapDirections} variant="invert">
              {t.directions} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </section>

      {/* The map, and the hours beside it. The address moved up into the band,
          so this section is what the band cannot carry: a picture of where the
          lot sits, and when it is open. */}
      <Section className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div className="min-w-0">
            <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.visitH}</h2>
            <dl className="mt-8 grid gap-6">
              <div>
                <dt className={`${fieldLabel} text-muted`}>{t.hours}</dt>
                <dd className="mt-1.5 font-mono text-lg">{hoursRange()}</dd>
                <dd className="text-muted">{t.everyDay}</dd>
              </div>
              <div>
                <dt className={`${fieldLabel} text-muted`}>{t.address}</dt>
                <dd className="mt-1.5 text-lg">{fullAddress()}</dd>
              </div>
            </dl>
          </div>
          <iframe
            src={mapEmbed}
            title={t.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full border border-rule sm:h-[26rem]"
          />
        </div>
      </Section>

      {/* On a wash, so the run between the accent band and the footer is broken
          once rather than reading as one long cream column. */}
      <section className="bg-wash-mariscos px-5 py-16 text-ink sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="min-w-0">
              <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.formH}</h2>
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
                  <input
                    id="contact-contact"
                    name="contact"
                    type="text"
                    required
                    className={field}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className={fieldLabel}>
                  {t.messageL}
                </label>
                <textarea id="contact-message" name="message" rows={4} required className={field} />
              </div>

              <div className="mt-7">
                {/* No arrow. The glyph marks the primary path in and the primary
                  path out; this page spends both on directions and the
                  cross-door. Three arrows made it decoration. */}
                <Button type="submit">{t.submit}</Button>
                <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
                  {t.escape}{' '}
                  <SocialLink account={site.social.instagram} className="hover:text-ink" />
                </p>
                {submitted && (
                  <p className="mt-4 border border-ink px-3 py-2 font-mono text-xs">
                    {pending('form destination, not wired yet')}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* The cross-door. Truck owners get routed before they write.
          Cream, not night: the hero took the night ground on 2026-08-19 and the
          ration is two surfaces per page counting the footer. */}
      <Section className="border-t border-rule py-10 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl leading-[1.02] uppercase sm:text-3xl">{t.leaseH}</h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted">{t.leaseBody}</p>
          </div>
          <div className="shrink-0">
            <Button to={pathFor('lease', lang)} variant="outline">
              {t.leaseCta} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
