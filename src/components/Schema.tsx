import { site } from '../lib/site'
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
