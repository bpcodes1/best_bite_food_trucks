import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Label, Section } from '../components/ui'
import { useLang } from '../lib/useLang'
import { pathFor } from '../lib/routes'
import { pending, site } from '../lib/site'
import karaokeFlyer from '../assets/events/karaoke.webp'
import cruiseFlyer from '../assets/events/back_to_school_cruise.webp'

/* Events — Index-First (design.md). The Yard maintains a live calendar through
 * Nov 2026; that is the bar this page grows toward.
 *
 * Everything stated as fact here traces to the park's own flyers (pulled from
 * the marketing assets on Bryan's branch, confirmed real by Enrique
 * 2026-08-12) or to the client context. The karaoke flyer says "te invita
 * todos los domingos" — a real recurring event. What a flyer does not state
 * (times, dates) renders as visible brackets, never as a guess.
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
 * DATED_EVENTS is deliberately a data array: when Ray sends the next event,
 * adding it is an entry here, not a layout change. That is the retainer
 * workflow this page is built for.
 */

interface DatedEvent {
  img: string
  /** Rendered in the date slot. Brackets until a flyer or Ray states one. */
  when: Record<'en' | 'es', string>
  title: string
  body: Record<'en' | 'es', string>
  alt: Record<'en' | 'es', string>
}

const DATED_EVENTS: DatedEvent[] = [
  {
    img: cruiseFlyer,
    when: { en: pending('cruise date'), es: pending('fecha del cruise') },
    title: 'Back to School Cruise',
    body: {
      en: 'Lowriders, food, family, community. Meet up at the park, cruise, and cruise back in for dinner.',
      es: 'Lowriders, comida, familia, comunidad. El punto de reunión es el parque: crucero, y de regreso a cenar.',
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
    h1: 'What is on at the park.',
    lede: 'Karaoke every Sunday. Car cruises when school starts. Cooking classes when the mood strikes. Free to come, and the kitchens stay open.',
    sundayLabel: 'Every Sunday',
    sundayH: 'Karaoke y música.',
    sundayBody:
      'The park invites you every Sunday: family atmosphere, good food, good music. Come sing and dance with us.',
    sundayTime: '6:00pm - 9:00pm · Music and karaoke with Dj Mike G.',
    sundayAlt: 'Flyer for karaoke Sundays at Best Bite Food Park',
    comingLabel: 'On the calendar',
    comingH: 'Coming up.',
    pastLabel: 'Already happened',
    pastH: 'This park has done.',
    past: ['A pupusa-making class', 'A coffee workshop', 'Karaoke, every Sunday since'],
    followLabel: 'Do not miss one',
    followH: 'New events land on Instagram first.',
    followBody: 'Follow the park, or write and ask what is on this weekend.',
    followIg: 'Instagram',
    followContact: 'Ask through the contact page',
  },
  es: {
    title: 'Eventos en Best Bite Food Park | Salem, OR',
    description:
      'Karaoke todos los domingos, cruceros de autos, clases de cocina. Entrada libre, ambiente familiar y las cocinas siguen abiertas. Eventos en Best Bite Food Park, Salem, OR.',
    eyebrow: 'Eventos · Salem, OR',
    h1: 'Qué hay en el parque.',
    lede: 'Karaoke todos los domingos. Cruceros de autos cuando empieza la escuela. Clases de cocina de vez en cuando. La entrada es libre y las cocinas siguen abiertas.',
    sundayLabel: 'Todos los domingos',
    sundayH: 'Karaoke y música.',
    sundayBody:
      'El parque te invita todos los domingos: ambiente familiar, buena comida y buena música. Ven a cantar y bailar con nosotros.',
    sundayTime: '6:00pm - 9:00pm · Música y karaoke a cargo de Dj Mike G.',
    sundayAlt: 'Volante del karaoke de los domingos en Best Bite Food Park',
    comingLabel: 'En el calendario',
    comingH: 'Lo que viene.',
    pastLabel: 'Ya pasó',
    pastH: 'Este parque ya ha hecho.',
    past: [
      'Una clase para hacer pupusas',
      'Un taller de café',
      'Karaoke, todos los domingos desde entonces',
    ],
    followLabel: 'No te pierdas ninguno',
    followH: 'Los eventos nuevos salen primero en Instagram.',
    followBody: 'Sigue al parque, o escríbenos y pregunta qué hay este fin de semana.',
    followIg: 'Instagram',
    followContact: 'Pregunta por la página de contacto',
  },
} as const

export function Events() {
  const lang = useLang()
  const t = copy[lang]

  return (
    <>
      <Seo title={t.title} description={t.description} />

      <Section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-3xl">
          <Label>{t.eyebrow}</Label>
          <h1 className="mt-5 text-[2.6rem] leading-[0.95] uppercase sm:text-6xl">{t.h1}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.lede}</p>
        </div>
      </Section>

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

      {/* Dated events, newest first. Data lives in DATED_EVENTS above. */}
      <Section ground="night" className="py-14 sm:py-20">
        <Label tone="night">{t.comingLabel}</Label>
        <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.comingH}</h2>
        <div className="mt-10 grid gap-12">
          {DATED_EVENTS.map((e) => (
            <article
              key={e.title}
              className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center"
            >
              <img
                src={e.img}
                alt={e.alt[lang]}
                loading="lazy"
                decoding="async"
                className="w-full max-w-md object-cover"
              />
              <div className="min-w-0">
                <p className="font-mono text-[11px] tracking-[0.12em] text-night-muted uppercase">
                  {e.when[lang]}
                </p>
                <h3 className="mt-3 text-2xl leading-[1.02] uppercase sm:text-3xl">{e.title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-night-muted">{e.body[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* What has already happened here. True per the client context; it is
          the honest substitute for a packed calendar the park does not have yet. */}
      <Section className="py-14 sm:py-20">
        <Label>{t.pastLabel}</Label>
        <h2 className="mt-4 text-3xl leading-[1.02] uppercase sm:text-4xl">{t.pastH}</h2>
        <ul className="mt-8 max-w-2xl">
          {t.past.map((p) => (
            <li key={p} className="border-b border-rule py-4 text-lg leading-snug first:border-t">
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-rule py-12 sm:py-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <Label>{t.followLabel}</Label>
            <h2 className="mt-3 text-2xl leading-[1.02] uppercase sm:text-3xl">{t.followH}</h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted">
              {t.followBody}{' '}
              <Link to={pathFor('contact', lang)} className="underline underline-offset-4">
                {t.followContact}
              </Link>
              .
            </p>
          </div>
          {/* Renders the visible bracket until Ray sends the handle. A styled
              button around a dead link would read as a working one. */}
          <p className="shrink-0 font-mono text-[11px] tracking-[0.12em] uppercase">
            {t.followIg}: {site.social.instagram}
          </p>
        </div>
      </Section>
    </>
  )
}
