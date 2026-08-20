import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { KaraokeEventJsonLd } from '../components/Schema'
import { Button, Label, Section, SocialLink } from '../components/ui'
import { useLang } from '../lib/useLang'
import { pathFor } from '../lib/routes'
import { site } from '../lib/site'
import karaokeFlyer from '../assets/events/karaoke.webp'
/* The uncropped cruise flyer, from `origin/bryan` 2026-08-18. It carries the
   meet-up point and the times that the cropped copy cut off, and unlike the
   karaoke and school-year flyers it is clean artwork rather than a screenshot
   of an Instagram story, so nothing had to be trimmed.

   IT IS A SECOND COPY OF A FLYER THE REPO ALREADY HAS, on purpose. Home renders
   `back_to_school_cruise.webp` with a hand-tuned `focus` value derived from
   that file's proportions. This one is portrait where that one is nearly
   square, so swapping the shared asset would silently reframe Home. Enrique's
   call 2026-08-18 was to leave Home alone, so Events gets its own file. */
import cruiseFlyer from '../assets/events/back_to_school_cruise_full.webp'
/* The indoor hall: the illuminated Best Bite sign, barrel tables, low light.
   From Bryan's branch. It is the only asset in the repo that looks like a
   place where something happens after dark, which is what this page is about,
   and it is already dark so the scrim works with the photograph rather than
   fighting it.

   ONE THING NOT TO DO WITH IT: the client context gates hall rental on a city
   permit that has not been granted. This photograph is the hall. It is fine as
   atmosphere on an events page and it must not acquire "book this space" copy
   until Ray says the permit landed. */
import heroHall from '../assets/park/inside_sign.webp'

/* Events — Index-First (design.md). The Yard maintains a live calendar through
 * Nov 2026; that is the bar this page grows toward.
 *
 * Everything stated as fact here traces to the park's own flyers (pulled from
 * the marketing assets on Bryan's branch, confirmed real by Enrique
 * 2026-08-12) or to the client context. The karaoke flyer says "te invita
 * todos los domingos" — a real recurring event. What a flyer does not state
 * (times, dates) renders as visible brackets, never as a guess. As of
 * 2026-08-18 this page holds no brackets at all: the last one was the cruise
 * date, and it turned out to be printed on a second flyer we already had.
 *
 * THE KARAOKE TIME AND THE DJ'S NAME CAME OFF THE FLYER, 2026-08-18, and both
 * used to be brackets. The copy of the flyer in this repo was a crop, and the
 * crop had removed exactly the strip carrying "DE 6PM A 9PM" and "MUSICA Y
 * KARAOKE A CARGO DE Dj Mike G." The uncropped original on `origin/bryan`
 * (`events/karaoke_full.jpg`) has both, and it now replaces the cropped file so
 * the picture and the text agree.
 *
 * TWO THINGS TO WATCH. The flyer carries no date, so "6pm to 9pm" is true as of
 * whenever it was printed and nobody has confirmed it since — it is on the list
 * for Ray. And Dj Mike G is a real person rather than something Ray controls:
 * if he stops working the park, this line is wrong about a named individual,
 * which is worse than being wrong about a time. Enrique's call, 2026-08-18.
 *
 * EVENTS ARE DATA, not layout: when Ray sends the next one, adding it is an
 * entry in `UPCOMING_EVENTS`, and retiring it is moving that entry into
 * `PAST_EVENTS`. Neither is a layout change. That is the retainer workflow
 * this page is built for.
 *
 * BROUGHT UP TO HOME'S STANDARD 2026-08-18, second of the three. Scored against
 * the checklist in STATUS.md § "What Home looks like now, and why" it failed
 * two, and had one gap the checklist does not cover:
 *
 * FIVE MONO EYEBROWS against three. Únete had eight and this had five, which
 * says the habit was systemic rather than one page's slip. All three section
 * kickers are gone; the hero locator and the accent band's label stay, matching
 * Home. Two headings were rewritten to stand on their own, because a heading
 * that only makes sense under a kicker is not a heading.
 *
 * A TYPE-ONLY HERO, the same defect Únete had. It now opens on the indoor hall.
 *
 * NO STRUCTURED DATA AT ALL — the only address on the site with none. Home and
 * Contact carry LocalBusiness, Vendors an ItemList of nine kitchens, Únete a
 * FAQPage. A free weekly family event is precisely what search engines surface,
 * so the karaoke night is now an Event. See `KaraokeEventJsonLd` for why it
 * carries no `startDate`.
 *
 * THE PAGE HAD NO BUTTON ANYWHERE. Not a checklist item, but every other page
 * ends on a door and this one ended on a bracketed Instagram handle. Events
 * exist to bring people to the lot and the kitchens are the reason they stay,
 * so the door goes to Vendors.
 */

interface DatedEvent {
  img: string
  /** Rendered in the date slot. A bracket until a flyer or Ray states one. */
  when: Record<'en' | 'es', string>
  title: string
  body: Record<'en' | 'es', string>
  alt: Record<'en' | 'es', string>
}

/* TWO ARRAYS, NOT ONE ARRAY AND A DATE COMPARISON.
 *
 * Whether an event has happened is decided by the person adding it, at the
 * moment they add it, not computed from the clock. This site pre-renders to
 * static files: a `new Date()` comparison is frozen at whatever `npm run build`
 * last ran, so an event would sit under "Coming up" for every day between the
 * date passing and the next deploy. That is the same failure the open/closed
 * badge on Vendors exists to avoid, and here it would be worse — a badge that
 * is briefly wrong is a nuisance, a calendar that is wrong is the thing the
 * page is for.
 *
 * Moving an event is a one-line edit between the two arrays. That is the
 * retainer workflow.
 */
const UPCOMING_EVENTS: DatedEvent[] = []

const PAST_EVENTS: DatedEvent[] = [
  {
    /* The date was a `pending()` bracket until 2026-08-18, and it did not need
       to be. Two flyers describe this afternoon: this one gives the route and
       the times, and "Cruise Into the School Year" gives the date. Enrique
       confirmed they are one event. It ran on Sunday 16 August 2026 and this
       page had it under "Coming up" with an unknown date, two days after it
       finished. */
    img: cruiseFlyer,
    when: {
      en: 'Sunday, August 16, 2026 · 3:00pm - 6:00pm',
      es: 'Domingo 16 de agosto de 2026 · 3:00pm - 6:00pm',
    },
    title: 'Back to School Cruise',
    /* Past tense, because it is past. The old copy read "Meet up at the park,
       cruise, and cruise back in for dinner" — an invitation, which is wrong
       under a heading saying it already happened. Route and meeting point are
       read off the flyer. */
    body: {
      en: 'Lowriders met at the Burger King on Lancaster Drive, cruised the strip, and came back to the park for dinner.',
      es: 'Los lowriders se reunieron en el Burger King de Lancaster Drive, dieron el crucero y regresaron al parque a cenar.',
    },
    alt: {
      en: 'Flyer for the Back to School Cruise at Best Bite Food Park',
      es: 'Volante del Back to School Cruise en Best Bite Food Park',
    },
  },
]

const copy = {
  en: {
    title: 'Events at Best Bite Food Park | Salem, OR',
    description:
      'Karaoke every Sunday, car cruises, cooking classes. Free to come, family first, and the kitchens stay open. Events at Best Bite Food Park, Salem, OR.',
    eyebrow: 'Events · Salem, OR',
    /* Split to two lines for the corner-anchored hero. Same lesson Únete
       taught: the headline grows into the space the eyebrow and locator are
       anchored in, so it has to be short in the longer language too. */
    h1a: 'What is on',
    h1b: 'at the park.',
    lede: 'Karaoke every Sunday. Car cruises when school starts. Cooking classes when the mood strikes. Free to come, and the kitchens stay open.',
    heroAlt: 'The lit Best Bite sign on the wall of the indoor hall, with barrel tables',
    sundayLabel: 'Every Sunday',
    sundayH: 'Karaoke y música.',
    sundayBody:
      'The park invites you every Sunday: family atmosphere, good food, good music. Come sing and dance with us.',
    sundayTime: '6:00pm - 9:00pm · Music and karaoke with Dj Mike G.',
    sundayAlt: 'Flyer for karaoke Sundays at Best Bite Food Park',
    comingH: 'Coming up.',
    comingEmpty:
      'Nothing new on the calendar yet. Karaoke runs every Sunday, and the next event goes up here as soon as it is set.',
    /* Was "This park has done." under an "Already happened" kicker. The kicker
       was one of three cut on 2026-08-18, and the heading could not stand
       without it. A heading that only parses beneath its eyebrow is not a
       heading. */
    pastH: 'Already done here.',
    past: ['A pupusa-making class', 'A coffee workshop', 'Karaoke, every Sunday since'],
    followH: 'New events land on Instagram first.',
    followBody: 'Follow the park, or write and ask what is on this weekend.',
    followIg: 'Instagram',
    followContact: 'Ask through the contact page',
    doorH: 'Come for the music, stay for the food.',
    doorBody: `${site.stalls.filled} kitchens are open while every event runs.`,
    doorCta: 'See the trucks',
  },
  es: {
    title: 'Eventos en Best Bite Food Park | Salem, OR',
    description:
      'Karaoke todos los domingos, cruceros de autos, clases de cocina. Entrada libre, ambiente familiar y las cocinas siguen abiertas. Eventos en Best Bite Food Park, Salem, OR.',
    eyebrow: 'Eventos · Salem, OR',
    h1a: 'Qué hay',
    h1b: 'en el parque.',
    lede: 'Karaoke todos los domingos. Cruceros de autos cuando empieza la escuela. Clases de cocina de vez en cuando. La entrada es libre y las cocinas siguen abiertas.',
    heroAlt: 'El letrero iluminado de Best Bite en el salón interior, con mesas de barril',
    sundayLabel: 'Todos los domingos',
    sundayH: 'Karaoke y música.',
    sundayBody:
      'El parque te invita todos los domingos: ambiente familiar, buena comida y buena música. Ven a cantar y bailar con nosotros.',
    sundayTime: '6:00pm - 9:00pm · Música y karaoke a cargo de Dj Mike G.',
    sundayAlt: 'Volante del karaoke de los domingos en Best Bite Food Park',
    comingH: 'Lo que viene.',
    comingEmpty:
      'Todavía no hay nada nuevo en el calendario. El karaoke es todos los domingos, y el próximo evento aparece aquí en cuanto se confirme.',
    pastH: 'Lo que ya se ha hecho aquí.',
    past: [
      'Una clase para hacer pupusas',
      'Un taller de café',
      'Karaoke, todos los domingos desde entonces',
    ],
    followH: 'Los eventos nuevos salen primero en Instagram.',
    followBody: 'Sigue al parque, o escríbenos y pregunta qué hay este fin de semana.',
    followIg: 'Instagram',
    followContact: 'Pregunta por la página de contacto',
    doorH: 'Ven por la música, quédate por la comida.',
    doorBody: `${site.stalls.filled} cocinas están abiertas mientras dura cada evento.`,
    doorCta: 'Conoce los trucks',
  },
} as const

/* One dated event. Shared by the upcoming and the past sections so the two can
   never drift into different treatments — the point of showing a finished event
   is that it looks exactly like a scheduled one will. */
function EventRow({ event, lang }: { event: DatedEvent; lang: 'en' | 'es' }) {
  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
      <img
        src={event.img}
        alt={event.alt[lang]}
        loading="lazy"
        decoding="async"
        className="w-full max-w-sm object-cover"
      />
      <div className="min-w-0">
        <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
          {event.when[lang]}
        </p>
        <h3 className="mt-3 text-2xl leading-[1.02] uppercase sm:text-3xl">{event.title}</h3>
        <p className="mt-4 max-w-md leading-relaxed text-muted">{event.body[lang]}</p>
      </div>
    </article>
  )
}

export function Events() {
  const lang = useLang()
  const t = copy[lang]

  return (
    <>
      <Seo title={t.title} description={t.description} />
      <KaraokeEventJsonLd name={t.sundayH} description={t.sundayBody} image={karaokeFlyer} />

      {/* Corner-anchored on the hall, like Home's and Únete's. `gap-y-10` for
          the reason Únete records: `justify-between` alone lets the anchored
          blocks butt together once a Spanish string runs long. */}
      <section className="relative flex min-h-[calc(100svh-var(--header-h)-6rem)] flex-col justify-between gap-y-10 overflow-hidden bg-night px-5 py-9 text-paper sm:px-8 sm:py-12">
        <img
          src={heroHall}
          alt={t.heroAlt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_45%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/75 to-night/40"
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
          {site.address.street} · {site.address.city}, {site.address.state}
        </p>
      </section>

      {/* The recurring event gets the flood. It is the one thing a reader can
          act on any week of the year. */}
      <section className="bg-brand-yellow px-5 py-12 text-brand-black sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
          <div className="min-w-0">
            <Label tone="accent">{t.sundayLabel}</Label>
            <h2 className="mt-3 font-display text-4xl leading-[0.98] uppercase sm:text-6xl">
              {t.sundayH}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-snug font-medium">{t.sundayBody}</p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.12em] uppercase">{t.sundayTime}</p>
          </div>
          <img
            src={karaokeFlyer}
            alt={t.sundayAlt}
            loading="lazy"
            decoding="async"
            className="w-full max-w-sm justify-self-center border-2 border-brand-black lg:justify-self-end"
          />
        </div>
      </section>

      {/* Cream, not night: the hero took the night ground on 2026-08-18 and the
          ration is two surfaces per page counting the footer.

          THE EMPTY STATE IS THE NORMAL STATE HERE, and it is written rather
          than hidden. The park runs a handful of events a year, so this section
          will be empty most of the time. Hiding it would make the page look
          like it has no calendar at all; a bare heading over nothing looks
          broken. Saying so, and pointing at the one thing that does run every
          week, is honest and keeps the section alive between flyers. */}
      <Section className="py-16 sm:py-24">
        <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.comingH}</h2>
        {UPCOMING_EVENTS.length ? (
          <div className="mt-10 grid gap-12">
            {UPCOMING_EVENTS.map((e) => (
              <EventRow key={e.title} event={e} lang={lang} />
            ))}
          </div>
        ) : (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.comingEmpty}</p>
        )}
      </Section>

      {/* What has already happened here. True per the client context; it is
          the honest substitute for a packed calendar the park does not have yet. */}
      <section className="bg-wash-events px-5 py-12 text-ink sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.pastH}</h2>

          {/* A finished event keeps its flyer and its card. It is the same
              treatment an upcoming one gets, which is deliberate twice over:
              Ray can see exactly how a dated event renders without one being
              scheduled, and a park that visibly ran a lowrider cruise is
              better proof than a sentence saying it runs events. */}
          {PAST_EVENTS.length > 0 && (
            <div className="mt-10 grid gap-12">
              {PAST_EVENTS.map((e) => (
                <EventRow key={e.title} event={e} lang={lang} />
              ))}
            </div>
          )}

          <ul className="mt-10 max-w-2xl">
            {t.past.map((p) => (
              <li
                key={p}
                className="border-b border-brand-black/15 py-4 text-lg leading-snug first:border-t"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section className="py-12 sm:py-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl leading-[1.02] uppercase sm:text-3xl">{t.followH}</h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted">
              {t.followBody}{' '}
              <Link to={pathFor('contact', lang)} className="underline underline-offset-4">
                {t.followContact}
              </Link>
              .
            </p>
          </div>
          {/* A real link since 2026-08-19, when Enrique supplied the account.
              It stays a link rather than becoming a button: the page's one
              button is the door to Vendors at the foot, and a second CTA of
              equal weight pointing off-site would compete with it. */}
          <p className="shrink-0 font-mono text-[11px] tracking-[0.12em] uppercase">
            {t.followIg}:{' '}
            <SocialLink account={site.social.instagram} className="hover:text-muted" />
          </p>
        </div>
      </Section>

      {/* The door. This page had no button at all before 2026-08-18, which made
          it the one address a reader could arrive at and leave from without
          being offered anywhere to go. Vendors, not Contact: events bring
          people to the lot and the kitchens are why they stay. */}
      <Section className="border-t border-rule py-10 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl leading-[1.02] uppercase sm:text-3xl">{t.doorH}</h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted">{t.doorBody}</p>
          </div>
          <div className="shrink-0">
            <Button to={pathFor('vendors', lang)} variant="outline">
              {t.doorCta} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
