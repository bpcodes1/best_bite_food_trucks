import { PENDING_MARKER, site, socialUrls } from '../lib/site'
import { VENDORS } from '../lib/vendors'

/**
 * LocalBusiness structured data, rendered on Home and Contact.
 *
 * Every value derives from src/lib/site.ts — the same single source the
 * visible NAP block uses — because Google matches the Business Profile to the
 * site by exact string, and schema drifting from the page is the same failure
 * as two components typing their own hours.
 *
 * Deliberately absent until real values exist: telephone (pending from Ray;
 * schema with a bracketed placeholder would be worse than none), geo
 * coordinates (never guessed), servesCuisine (waits on the final roster),
 * priceRange, and image.
 *
 * React 19 hoists <title>/<meta>/<link> but not <script>, so this renders in
 * the body. Google reads JSON-LD from the body just the same.
 */
export function LocalBusinessJsonLd() {
  const sameAs = socialUrls()

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: site.name,
    url: site.origin,
    /* The accounts that prove this is one business rather than several with
       similar names. Omitted entirely while the list is empty — an empty array
       is a claim that the park has no accounts, which is not what we mean. */
    ...(sameAs.length ? { sameAs } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: 'US',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: site.hours.open,
      closes: site.hours.close,
    },
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

/**
 * The nine vendors as named entities, for the Vendors page.
 *
 * This is the point of that page beyond showing cards. Search engines work out
 * what a place IS partly from the entities attached to it, and a food park is
 * defined by its kitchens. Nine named FoodEstablishments, each with a cuisine
 * and each located at the park's address, say what "Best Bite Food Park" means
 * far more precisely than any sentence we could write about variety.
 *
 * Only facts that exist go in. No ratings, no price range, no telephone: none
 * of those are known per vendor, and schema is exactly where an invented value
 * does the most damage, because it is a machine-readable claim.
 *
 * `servesCuisine` uses the English string for every language. It is a
 * classification for a machine, not a sentence for a reader, and giving Google
 * two different cuisine values for the same entity on two addresses would
 * muddy the thing this markup exists to clarify.
 */
export function VendorListJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Food trucks at ${site.name}`,
    numberOfItems: VENDORS.length,
    itemListElement: VENDORS.map((vendor, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'FoodEstablishment',
        name: vendor.name,
        servesCuisine: vendor.cuisine.en,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.zip,
          addressCountry: 'US',
        },
        containedInPlace: { '@type': 'FoodEstablishment', name: site.name },
      },
    })),
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

/**
 * The Únete FAQ as FAQPage structured data.
 *
 * The answers are already on the page inside native `<details>`, so this adds
 * no content — it only tells Google that the question/answer pairs are exactly
 * that. Laja's data puts an FAQ section at roughly +18% traffic, and a leasing
 * page is where a prospect arrives already holding questions.
 *
 * PENDING ANSWERS ARE FILTERED OUT, and that filter is the whole reason this
 * takes the array rather than reading the copy itself. Two of the six answers
 * are `pending()` brackets waiting on Ray. A visible `[PENDIENTE — stall size]`
 * on the page is honest, because a reader can see it is a gap. The same string
 * inside JSON-LD is a machine-readable claim that Best Bite's official answer
 * to "how big is a space" is a placeholder, and it can be surfaced as a rich
 * result. Structured data is exactly where a placeholder does the most damage.
 *
 * If every answer is pending the component renders nothing rather than an empty
 * FAQPage, which Google treats as a markup error.
 */
export function FaqJsonLd({ items }: { items: readonly { q: string; a: string }[] }) {
  const answered = items.filter((item) => !item.a.includes(PENDING_MARKER))
  if (!answered.length) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answered.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

/**
 * The recurring karaoke night as an Event, for the Events page.
 *
 * Events was the only address on the site carrying no structured data at all.
 * Home and Contact have LocalBusiness, Vendors has the ItemList of nine
 * kitchens, Únete has FAQPage. A weekly, free, family event is exactly the kind
 * of thing search engines surface, and it is the one thing on that page a
 * reader can act on any week of the year.
 *
 * NO `startDate`, AND THAT IS DELIBERATE. Google documents `startDate` as
 * required for Event rich results, so the obvious move is to compute the next
 * Sunday at build time. That is the same trap the open/closed badge on Vendors
 * exists to avoid: this site pre-renders to static files, so a computed date is
 * frozen at whatever `npm run build` last ran and then confidently states a
 * stale one for however many days pass before the next deploy. `eventSchedule`
 * with a `Schedule` is schema.org's own answer for something that repeats and
 * needs no fixed date. If that costs a rich result, the trade is a correct
 * page over a decorated one.
 *
 * The 6pm–9pm and the DJ's name come off the park's own flyer and are the same
 * facts the page prints. If Ray corrects either, both change together — this
 * component takes them as props rather than restating them.
 */
export function KaraokeEventJsonLd({
  name,
  description,
  image,
}: {
  name: string
  description: string
  image: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    // Every heading on this site ends in a full stop as a type convention.
    // That is a visual decision and has no business inside a machine-readable
    // entity name, where it would become part of the event's title.
    name: name.replace(/\.$/, ''),
    description,
    image,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    // Stated on the page in both languages, so it is not a new claim.
    isAccessibleForFree: true,
    eventSchedule: {
      '@type': 'Schedule',
      repeatFrequency: 'P1W',
      byDay: 'https://schema.org/Sunday',
      startTime: '18:00',
      endTime: '21:00',
      scheduleTimezone: 'America/Los_Angeles',
    },
    organizer: { '@type': 'Organization', name: site.name, url: site.origin },
    location: {
      '@type': 'Place',
      name: site.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
        addressCountry: 'US',
      },
    },
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
