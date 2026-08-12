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

  social: {
    instagram: pending('Instagram'),
    facebook: pending('Facebook'),
    tiktok: pending('TikTok'),
  },

  stalls: {
    /** Park capacity per the client context. */
    total: 15,
    /**
     * Filled stalls. The context says 9; Enrique says 10 may be the real
     * number. Resolves during the build. Card count is data, not structure.
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

/** The NAP address string, assembled in one place so it can never drift. */
export function fullAddress(): string {
  const { street, city, state, zip } = site.address
  return `${street}, ${city}, ${state} ${zip}`
}
