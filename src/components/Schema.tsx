import { site } from '../lib/site'

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
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: site.name,
    url: site.origin,
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
