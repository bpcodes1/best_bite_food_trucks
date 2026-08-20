/**
 * Name, address, phone, hours — one source, used everywhere.
 *
 * Google matches the Business Profile to the site by exact string. One
 * character of drift between here and the GBP listing costs the local ranking
 * signal, so nothing in this file gets retyped into a component.
 *
 * PENDING VALUES
 * Anything we do not have yet is wrapped in `pending()`, which renders as
 * visible brackets — `[PENDIENTE — site phone]`. That is deliberate. A
 * placeholder that looks like real data is the failure mode: the previous
 * build shipped `(512) 555-0148`, a fake number in an Austin area code on a
 * Salem business, and nothing on the page or in the code said so.
 *
 * Run `npm run pending` to list everything still unfilled.
 */

export const PENDING_MARKER = '[PENDIENTE'

export function pending(what: string): string {
  return `${PENDING_MARKER} — ${what}]`
}

export const site = {
  name: 'Best Bite Food Park',

  /** Confirmed against the client context, Aug 2026. Includes the ZIP+4. */
  address: {
    street: '3282 Silverton Rd NE',
    city: 'Salem',
    state: 'OR',
    zip: '97301-8655',
  },

  /**
   * Confirmed with Ray, Aug 2026: 12pm–8pm, open every day. This supersedes
   * both numbers on the Square site (the 10–9 flyer was wrong).
   */
  hours: {
    open: '12:00',
    close: '20:00',
    openEveryDay: true,
  },

  phone: pending('teléfono'),
  email: pending('correo'),

  /**
   * The park's own accounts. Each carries what the page prints and where it
   * points; `url: undefined` means we do not have the account yet, and the
   * label stays a visible bracket.
   *
   * These are not decoration. They go into `sameAs` on the LocalBusiness
   * markup, which is how a search engine confirms that the Instagram account,
   * the Facebook page and this website are the same business rather than three
   * businesses with similar names.
   *
   * INSTAGRAM AND FACEBOOK CAME FROM ENRIQUE 2026-08-19, as URLs. The Instagram
   * label is the handle read off its own URL. Facebook's is the bare network
   * name because THE PAGE HAS NO USERNAME: its address is the numeric
   * `/p/...-61584137473837/` form, which is what Facebook serves until an owner
   * sets a vanity URL. There is no `@name` to print, and printing the page's
   * own title instead would put a second, slightly different spelling of the
   * business name next to the NAP block — the exact drift `fullAddress()` and
   * `site.name` exist to prevent. Worth telling Ray: an unnamed page is harder
   * to find and reads as unfinished.
   */
  social: {
    instagram: {
      label: '@bestbitefoodpark',
      url: 'https://www.instagram.com/bestbitefoodpark/',
    },
    facebook: {
      label: 'Facebook',
      url: 'https://www.facebook.com/p/The-Best-Bite-Food-Truck-Park-61584137473837/',
    },
    tiktok: {
      label: pending('TikTok'),
      url: undefined,
    },
  },

  stalls: {
    /** Park capacity per the client context. */
    total: 15,
    /**
     * Filled stalls. Nine, confirmed by Enrique's definitive roster
     * 2026-08-12 (see food_trucks.txt). Card count is data, not structure.
     */
    filled: 9,
  },

  /**
   * Production origin. Every canonical, hreflang, OG tag, and sitemap entry is
   * built from this one value, so cutover is a single edit here.
   * Currently the preview origin — swap when the domain is live.
   */
  origin: 'http://localhost:5173',
} as const

/**
 * Every social account we actually have, for `sameAs` in the structured data.
 *
 * Derived rather than hand-listed, so an account added above reaches the markup
 * without a second edit — and a pending one can never reach it at all. A
 * bracket inside `sameAs` would be a machine-readable claim that the park's
 * TikTok lives at a placeholder.
 */
export function socialUrls(): string[] {
  // `site` is `as const`, so each url reads as its own literal type. Widen
  // before filtering, or the guard has nothing general to narrow to.
  return Object.values(site.social)
    .map((account): string | undefined => account.url)
    .filter((url): url is string => Boolean(url))
}

/** The NAP address string, assembled in one place so it can never drift. */
export function fullAddress(): string {
  const { street, city, state, zip } = site.address
  return `${street}, ${city}, ${state} ${zip}`
}

/**
 * The hours range as a reader sees it: `12:00pm - 8:00pm`.
 *
 * Assembled once for the same reason the address is. The Square site printed
 * 10:00-9:00 on a flyer graphic and 12:00-8:00 in its hours block on the same
 * homepage; two components each typing their own version is exactly how that
 * happens, and Google reads the contradiction.
 *
 * DERIVED, never hand-written. `site.hours` keeps the 24-hour values because
 * schema.org's openingHoursSpecification requires them in that form — see
 * `LocalBusinessJsonLd`. Only the display format is twelve-hour, so the page
 * and the structured data can never disagree about when the park is open.
 *
 * Both languages get the same string. `pm` is read the same way by a
 * Spanish-dominant reader in Salem, and inventing a second format is one more
 * thing that can drift.
 */
function twelveHour(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')}${suffix}`
}

export function hoursRange(): string {
  return `${twelveHour(site.hours.open)} - ${twelveHour(site.hours.close)}`
}
