/**
 * The single source of truth for every address on this site.
 *
 * Five pages, two languages, ten addresses. The router, the pre-render list,
 * `sitemap.xml`, the nav, the language toggle, and the hreflang tags are all
 * derived from this array. Adding or renaming a page means editing this file
 * and nothing else.
 *
 * Spanish gets its own address rather than a client-side toggle on a shared
 * one. A toggle changes what is on screen; it does not change the address, and
 * Google files pages by address. Without separate addresses the Spanish half of
 * the site is never indexed at all.
 */

export type Lang = 'en' | 'es'

export const LANGS: Lang[] = ['en', 'es']

export interface RouteDef {
  /** Stable id. Never appears in a URL, so it is safe to keep in code. */
  key: string
  path: Record<Lang, string>
}

/**
 * NOTE — the English `lease` slug is Enrique's call and is not final. The local
 * SEO target is "food cart space for rent salem", so the slug is worth choosing
 * deliberately rather than inheriting. Changing it here changes it everywhere.
 *
 * Spanish slugs are Spanish on purpose: `/es/vendedores` can rank for Spanish
 * queries in a way `/es/vendors` cannot.
 */
export const ROUTES: RouteDef[] = [
  { key: 'home', path: { en: '/', es: '/es' } },
  { key: 'vendors', path: { en: '/vendors', es: '/es/vendedores' } },
  { key: 'events', path: { en: '/events', es: '/es/eventos' } },
  { key: 'lease', path: { en: '/lease-a-space', es: '/es/unete-al-parque' } },
  { key: 'contact', path: { en: '/contact', es: '/es/contacto' } },
]

/** Every address the site answers on, in pre-render order. */
export const ALL_PATHS: string[] = ROUTES.flatMap((r) => LANGS.map((l) => r.path[l]))

/** The URL prerender.mjs renders to produce `dist/404.html`. Matches no route. */
export const NOT_FOUND_URL = '/__not-found__'

export function pathFor(key: string, lang: Lang): string {
  const route = ROUTES.find((r) => r.key === key)
  if (!route) throw new Error(`Unknown route key: ${key}`)
  return route.path[lang]
}

/** Language is derived from the address, never from component state. */
export function langFromPath(pathname: string): Lang {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en'
}

export function routeFromPath(pathname: string): RouteDef | undefined {
  return ROUTES.find((r) => LANGS.some((l) => r.path[l] === pathname))
}

/**
 * The same page in the other language. Powers the toggle and the hreflang
 * pair. Returns undefined for an address that matches no route, so the toggle
 * can hide itself on the 404 page.
 */
export function alternatePath(pathname: string): string | undefined {
  const route = routeFromPath(pathname)
  if (!route) return undefined
  return route.path[langFromPath(pathname) === 'en' ? 'es' : 'en']
}
