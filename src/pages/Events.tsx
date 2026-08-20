import { Seo } from '../components/Seo'
import { KaraokeEventJsonLd } from '../components/Schema'
import { Button, Label, Section } from '../components/ui'
import { useLang } from '../lib/useLang'
import { pathFor, type Lang } from '../lib/routes'
import { pending, site } from '../lib/site'
import karaokeFlyer from '../assets/events/karaoke.webp'
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

/* THE FOUR EVENT PHOTOGRAPHS, all pulled from `origin/bryan` 2026-08-19 and all
   of them things that actually happened in Ray's lot. Until this date the page
   had none — every event asset in the repo was a flyer, which proves we have
   flyers. Enrique was right that Bryan's branch had more than the two we
   harvested on 2026-08-18; there were sixteen event files and we had looked at
   two of them.

   `loteria.webp` is cropped. The original carries a burned-in reel caption
   ("LEMONADE AND MUCH MORE") across its lower third — the same Instagram-chrome
   defect trimmed off the karaoke flyer. It is worth the crop rather than the
   omission: it is the only photograph we have of people actually doing
   something here, hands on the table mid-game.

   NOT USED, and deliberately: `giveaway.jpg` is a Louis Vuitton box, which puts
   another company's trademark on Ray's commercial page and says nothing about a
   food park. `mycelium.jpg` is a flyer for somebody else's meeting. `easter2`,
   `loteria2` and `jarochitas` all carry burned-in captions or a TikTok
   watermark; `jarochitas` is also a vendor's own content rather than the
   park's. */
import cruise from '../assets/events/cruise_lowriders.webp'
import easter from '../assets/events/easter_egg_hunt.webp'
import christmas from '../assets/events/hall_christmas.webp'
import loteria from '../assets/events/loteria.webp'
/* Three park photographs, none of them used anywhere else on the site. Every
   existing one in `src/assets/park/` is already a hero or a band on another
   address, and a grid that reuses them makes the site repeat its own
   photography — the fault Únete had when it illustrated a paragraph about
   parking with the Vendors hero. `wagon_planter` is Bryan's; the two tent shots
   are IMG_8013 and IMG_7999 from the 2026-08-17 set, converted through `sips`
   because sharp cannot read 24-megapixel HEIC, then rotated because they carry
   EXIF orientation. */
import wagonPlanter from '../assets/park/wagon_planter.webp'
import tentWide from '../assets/park/tent_wide.webp'
import tentTables from '../assets/park/tent_tables.webp'

/* Events — Index-First (design.md). The Yard maintains a live calendar through
 * Nov 2026; that is the bar this page grows toward.
 *
 * Everything stated as fact here traces to the park's own flyers (confirmed
 * real by Enrique 2026-08-12) or to the client context. What a flyer does not
 * state renders as visible brackets, never as a guess.
 *
 * THE KARAOKE TIME AND THE DJ'S NAME CAME OFF THE FLYER, 2026-08-18. Two things
 * to watch: the flyer carries no date, so "6pm to 9pm" is true as of whenever it
 * was printed and nobody has confirmed it since; and Dj Mike G is a real person
 * rather than something Ray controls, so if he stops working the park this line
 * is wrong about a named individual. Both are on the list for Ray.
 *
 * REBUILT 2026-08-19 against a reference Enrique supplied — an Alibi Bar &
 * Lounge events page, filed at swipe/entries/alibi-events-lineup.md and
 * alibi-social-grid.md. Approved from a throwaway English-only prototype before
 * any of this was written, per the rule in ../CLAUDE.md that cost this project
 * four rebuilds of one hero.
 *
 * WHAT THE REBUILD REPLACED. "Coming up" and "Already done here" were two
 * sections splitting one calendar in half, and one of them was always empty.
 * They are now a single lineup with finished events receded rather than filed
 * elsewhere. The bulleted list of past programming became rows in it.
 *
 * WHAT WAS TAKEN FROM THE REFERENCE, and it is arrangement only: events as a
 * LIST of full-width rows rather than a card grid, a two-end row with identity
 * left and status right, and a photo grid anchored by one oversized cell.
 *
 * WHAT WAS NOT TAKEN: "Book Now" on every row (ours are free and public, and a
 * button styled as a booking button that lands on a contact form is a question
 * mark); the reservation form (the hall permit has not landed and we must not
 * imply booking); the "private and special events" pair, which needs a heading
 * and a paragraph per event and we have a photograph and nothing else for
 * Easter and Christmas; and the serif type and gold, which are appearance and
 * come from design.md.
 *
 * The grid is NOT headed "Follow our activity" the way the reference is. Theirs
 * implies the grid is the live feed. Ours is seven pictures we chose, so the
 * heading claims only what is true. A real embedded feed is also out on this
 * site: it renders nothing without JavaScript.
 */

interface LineupRow {
  title: Record<Lang, string>
  /** A bracket until a flyer or Ray states one. Four of five are brackets. */
  when: Record<Lang, string>
  img: string | null
  alt?: Record<Lang, string>
  /** Ground for the thumbnail when no photograph exists. */
  wash?: string
  past: boolean
}

/* ONE LIST, AND `past` IS A WRITTEN FACT rather than a date comparison. This
 * site pre-renders to static files, so `new Date()` freezes at whatever
 * `npm run build` last ran and an event would sit under the wrong marker for
 * every day between its date passing and the next deploy. Same reasoning as the
 * open/closed badge on Vendors, and here it would be worse: a badge that is
 * briefly wrong is a nuisance, a calendar that is wrong is the thing the page
 * is for.
 *
 * Adding an event is one entry. Retiring it is one word. That is the retainer
 * workflow this page exists to support.
 *
 * FOUR OF THE FIVE DATES ARE BRACKETS AND THAT IS HONEST, NOT UNFINISHED. The
 * cruise is the only event anyone has dated. The Easter flyer prints "April 5th"
 * with no year and nothing in the repo dates the rest. Each bracket names its
 * own event so `npm run pending` produces a list Ray can answer line by line.
 */
const LINEUP: LineupRow[] = [
  {
    title: { en: 'Back to School Cruise', es: 'Back to School Cruise' },
    when: {
      en: 'Sunday, August 16, 2026 · 3:00pm - 6:00pm',
      es: 'Domingo 16 de agosto de 2026 · 3:00pm - 6:00pm',
    },
    img: cruise,
    alt: {
      en: 'Lowriders and a motorcycle parked in the lot at Best Bite Food Park',
      es: 'Lowriders y una motocicleta en el lote de Best Bite Food Park',
    },
    past: true,
  },
  {
    title: { en: 'Easter egg hunt', es: 'Búsqueda de huevos de Pascua' },
    when: { en: pending('Easter date'), es: pending('fecha de Pascua') },
    img: easter,
    alt: {
      en: 'Hundreds of plastic eggs scattered across the lot at Best Bite Food Park',
      es: 'Cientos de huevos de plástico repartidos por el lote de Best Bite Food Park',
    },
    past: true,
  },
  {
    title: { en: 'Christmas at the park', es: 'Navidad en el parque' },
    when: { en: pending('Christmas date'), es: pending('fecha de Navidad') },
    img: christmas,
    alt: {
      en: 'The Best Bite sign lit up beside a decorated Christmas tree in the hall',
      es: 'El letrero de Best Bite iluminado junto a un árbol de Navidad en el salón',
    },
    past: true,
  },
  {
    title: { en: 'Lotería night', es: 'Noche de lotería' },
    when: { en: pending('lotería date'), es: pending('fecha de la lotería') },
    img: loteria,
    alt: {
      en: 'A lotería board on a picnic table with beans as markers and snacks beside it',
      es: 'Una tabla de lotería en una mesa de picnic con frijoles de marcador y botana al lado',
    },
    past: true,
  },
  /* No photograph, and the row holds its shape anyway. The thumbnail is small
     and fixed, so a wash tile fills it without the row collapsing — the exact
     opposite of the vendor card, where a missing photo leaves the name with
     nowhere to sit. It is why this pattern suits a client whose photography is
     thin, and it is written up in the swipe entry. */
  {
    title: { en: 'Pupusa-making class', es: 'Clase para hacer pupusas' },
    when: { en: pending('pupusa class date'), es: pending('fecha de la clase de pupusas') },
    img: null,
    wash: 'var(--color-wash-pupusas)',
    past: true,
  },
  {
    title: { en: 'Coffee workshop', es: 'Taller de café' },
    when: { en: pending('coffee workshop date'), es: pending('fecha del taller de café') },
    img: null,
    wash: 'var(--color-wash-coffee)',
    past: true,
  },
]

/* Seven cells: one at 2x2 and six at 1x1, in a five-column two-row grid.
 *
 * THE BIG CELL IS SECOND IN THIS ARRAY, NOT FIRST, so it lands in columns two
 * and three and its mass sits just left of centre. Dead centre reads as a formal
 * arrangement; hard left reads like a sentence. One column of offset is the
 * whole trick and it is the thing the reference does that an even grid does not.
 * Writing the array in the obvious order put it hard left and had to be undone.
 *
 * Four of seven are events and three are the place. The cruise takes the big
 * cell because it is the only photograph here with a person in it. The moment
 * Ray sends crowd photographs, swapping a cell is a data change.
 */
const GRID = [
  {
    img: easter,
    alt: { en: 'Plastic eggs across the lot', es: 'Huevos de plástico por todo el lote' },
  },
  {
    img: cruise,
    alt: {
      en: 'Lowriders in the lot at Best Bite Food Park',
      es: 'Lowriders en el lote de Best Bite Food Park',
    },
    big: true,
  },
  {
    img: tentWide,
    alt: {
      en: 'The striped tent and picnic tables seen across the lot',
      es: 'La carpa de rayas y las mesas de picnic vistas desde el lote',
    },
  },
  {
    img: christmas,
    alt: {
      en: 'The hall decorated for Christmas',
      es: 'El salón decorado para Navidad',
    },
  },
  {
    img: loteria,
    alt: {
      en: 'A lotería game in progress on a picnic table',
      es: 'Un juego de lotería en una mesa de picnic',
    },
  },
  {
    img: tentTables,
    alt: {
      en: 'Long wooden tables under the striped tent',
      es: 'Mesas largas de madera bajo la carpa de rayas',
    },
  },
  {
    img: wagonPlanter,
    alt: {
      en: 'The wooden wagon planter with the trucks behind it',
      es: 'La carreta de madera con flores y los trucks al fondo',
    },
  },
]

const copy = {
  en: {
    title: 'Events at Best Bite Food Park | Salem, OR',
    description:
      'Karaoke every Sunday, car cruises, cooking classes. Free to come, family first, and the kitchens stay open. Events at Best Bite Food Park, Salem, OR.',
    eyebrow: 'Events · Salem, OR',
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
    lineupH: 'The lineup.',
    lineupLede:
      'Everything the park has run, and everything it has coming. Karaoke is every Sunday and does not need a line here.',
    /* The empty state is written rather than hidden. The park runs a handful of
       events a year, so this is its normal condition — a bare heading over
       nothing reads as broken, and hiding the section reads as having no
       calendar at all. */
    lineupEmpty: 'Nothing new on the calendar yet. The next one goes up here as soon as it is set.',
    statusPast: 'Past',
    statusUpcoming: 'Coming up',
    gridH: 'This is what a good day looks like.',
    gridCta: 'See more on Instagram',
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
    /* "La programación" rather than a literal translation of "lineup": it is
       what a Spanish-speaking reader calls a venue's schedule, and the hero
       already says "Qué hay en el parque", so the heading has to differ. */
    lineupH: 'La programación.',
    lineupLede:
      'Todo lo que el parque ha hecho, y todo lo que viene. El karaoke es todos los domingos y no necesita una línea aquí.',
    lineupEmpty:
      'Todavía no hay nada nuevo en el calendario. El próximo aparece aquí en cuanto se confirme.',
    statusPast: 'Ya pasó',
    statusUpcoming: 'Próximamente',
    gridH: 'Así se ve un buen día.',
    gridCta: 'Ver más en Instagram',
    doorH: 'Ven por la música, quédate por la comida.',
    doorBody: `${site.stalls.filled} cocinas están abiertas mientras dura cada evento.`,
    doorCta: 'Conoce los trucks',
  },
} as const

/* Past is a muted outline and upcoming is a filled brand chip — the vendor
   open/closed language rather than a second one invented for this page, and the
   same pairing EventCard uses on Home.

   The reference greys two of its four rows and never says why, so a visitor has
   to guess between sold out, cancelled and finished. Ours prints the word. */
function StatusChip({ past, label }: { past: boolean; label: string }) {
  const skin = past
    ? 'border border-rule bg-paper/90 text-muted'
    : 'bg-brand-yellow text-brand-black'
  return (
    <span
      className={`inline-block px-2.5 py-1 font-mono text-[10px] tracking-[0.11em] uppercase ${skin}`}
    >
      {label}
    </span>
  )
}

export function Events() {
  const lang = useLang()
  const t = copy[lang]
  const igUrl = site.social.instagram.url

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
          act on any week of the year, and the reason it has no row in the
          lineup below: a weekly event repeated as rows would bury the dated
          ones, and stated once it needs no date at all. */}
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

      {/* ── THE LINEUP ─────────────────────────────────────────────────────
          One row per event. Two-end layout: identity hard left, status hard
          right, and a wide empty gutter between them. The gutter is the
          mechanism — with nothing in the middle the eye runs straight down the
          left edge reading names and only crosses when it finds one.

          Row height comes from the thumbnail, not the text, so every row is
          identical however long a name runs. That matters more in Spanish,
          where the titles run a fifth longer. */}
      <Section className="py-14 sm:py-20">
        <h2 className="text-3xl leading-[1.02] uppercase sm:text-4xl">{t.lineupH}</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{t.lineupLede}</p>

        <ul className="mt-10 border-t border-rule">
          {LINEUP.map((row) => (
            <li key={row.title.en} className="border-b border-rule">
              <div className="flex items-center gap-4 py-5 sm:gap-8 sm:py-6">
                <div className="w-24 shrink-0 sm:w-40">
                  {row.img ? (
                    <img
                      src={row.img}
                      alt={row.alt ? row.alt[lang] : ''}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[7/5] w-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="aspect-[7/5] w-full"
                      style={{ background: row.wash }}
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg leading-[1.1] uppercase sm:text-2xl">{row.title[lang]}</h3>
                  <p className="mt-1.5 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
                    {row.when[lang]}
                  </p>
                  {/* Below `sm` the chip sits under the date; the two-end layout
                      needs width the phone does not have. */}
                  <div className="mt-2.5 sm:hidden">
                    <StatusChip
                      past={row.past}
                      label={row.past ? t.statusPast : t.statusUpcoming}
                    />
                  </div>
                </div>

                <div className="hidden shrink-0 sm:block">
                  <StatusChip past={row.past} label={row.past ? t.statusPast : t.statusUpcoming} />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-xl leading-relaxed text-muted">{t.lineupEmpty}</p>
      </Section>

      {/* ── THE GRID ───────────────────────────────────────────────────────
          EVERY CELL IS `relative` AND EVERY IMAGE IS `absolute inset-0`, which
          is design.md § Rhythm and not a detail: an in-flow <img> reports its
          own aspect ratio and drives the row it sits in. Left in flow, the
          portrait cruise photograph stretched its two rows to 1180px against
          340px squares and tore a hole down the right of the section. The small
          squares set the row height and the big cell fills whatever that comes
          to.

          At phone width five columns collapse to two and the big cell goes
          `order-first`, so it leads instead of leaving a hole in the row above. */}
      <section className="bg-wash-events px-5 py-16 text-ink sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl text-3xl leading-[1.02] uppercase sm:text-4xl">{t.gridH}</h2>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:grid-rows-2 sm:gap-4">
            {GRID.map((cell) => (
              <li
                key={cell.alt.en}
                className={`relative aspect-square ${
                  cell.big
                    ? 'order-first col-span-2 sm:order-none sm:col-span-2 sm:row-span-2 sm:aspect-auto'
                    : ''
                }`}
              >
                <img
                  src={cell.img}
                  alt={cell.alt[lang]}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </li>
            ))}
          </ul>

          {/* Only rendered once the account exists. A styled button around a
              placeholder reads as a working link, which is the failure the
              visible bracket exists to prevent. */}
          {igUrl && (
            <div className="mt-10 flex justify-center">
              <Button as="a" href={igUrl}>
                {t.gridCta}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* The door. Vendors, not Contact: events bring people to the lot and the
          kitchens are why they stay. */}
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
