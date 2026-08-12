import { Chip } from './ui'

/**
 * One event: photograph, title, cuisine-style tags, a short line, then the
 * two facts a reader actually needs — when and where.
 *
 * Structure adapted from a reference Enrique supplied 2026-08-12 (an events
 * grid from Dribbble): image on top, title, tag row, description, then
 * icon-led when/where rows. The reference's filled pill chips and rounded
 * blue buttons are NOT carried over — our chips are outlined and our buttons
 * are square, per design.md § Components.
 *
 * Shared rather than page-local because the Events page needs the same card,
 * and two hand-maintained copies of one card is how they drift apart.
 *
 * The icons are two hand-drawn inline SVGs at one stroke weight. No icon
 * library: mixing icon sets is a named tell, and importing a whole library
 * for two glyphs is weight we do not need.
 */

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export interface EventCardProps {
  image: string
  imageAlt: string
  title: string
  /** Short, from the flyer itself. Never invented. */
  tags: readonly string[]
  description: string
  /** Renders a visible bracket until a real date exists. */
  when: string
  where: string
}

export function EventCard({
  image,
  imageAlt,
  title,
  tags,
  description,
  when,
  where,
}: EventCardProps) {
  return (
    <article className="flex min-w-0 flex-col">
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] w-full rounded-sm object-cover"
      />

      <h3 className="mt-5 text-xl leading-[1.1] uppercase sm:text-2xl">{title}</h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>

      <p className="mt-4 leading-relaxed text-muted">{description}</p>

      <dl className="mt-5 flex flex-col gap-2 text-sm">
        <div className="flex items-start gap-2.5">
          <dt className="mt-0.5 text-muted">
            <ClockIcon />
            <span className="sr-only">When</span>
          </dt>
          <dd className="min-w-0">{when}</dd>
        </div>
        <div className="flex items-start gap-2.5">
          <dt className="mt-0.5 text-muted">
            <PinIcon />
            <span className="sr-only">Where</span>
          </dt>
          <dd className="min-w-0">{where}</dd>
        </div>
      </dl>
    </article>
  )
}
