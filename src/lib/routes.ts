import type { Lang } from '../i18n/translations';

/**
 * The single source of truth for every address on this site.
 *
 * Six pages, two languages, twelve addresses. The router, the language
 * toggle, every internal link, the prerender list, the sitemap and the
 * hreflang tags all derive from ROUTE_DEFS. Adding or renaming a page means
 * editing this file and nothing else.
 *
 * Spanish gets its own address rather than a client-side toggle on a shared
 * one. A toggle changes what is on screen; it does not change the address,
 * and Google files pages by address. Without separate addresses the Spanish
 * half of the site is never indexed at all.
 *
 * The English addresses are live and indexed. Never change them.
 */

export const LANGS: readonly Lang[] = ['en', 'es'];
export const DEFAULT_LANG: Lang = 'en';

/** URL prefix that marks the Spanish half of the site. */
const ES_PREFIX = '/es';

export type RouteKey =
  'home' | 'foodTrucks' | 'events' | 'joinThePark' | 'contact' | 'privacyPolicy';

/** The routes that appear in the header and footer nav. */
export type NavRouteKey = Exclude<RouteKey, 'privacyPolicy'>;

export interface RouteDef {
  /** Stable id. Never appears in a URL, so it is safe to keep in code. */
  key: RouteKey;
  /** One address per language. */
  path: Record<Lang, string>;
}

export const ROUTE_DEFS: readonly RouteDef[] = [
  { key: 'home', path: { en: '/', es: '/es' } },
  { key: 'foodTrucks', path: { en: '/food-trucks', es: '/es/food-trucks' } },
  { key: 'events', path: { en: '/events', es: '/es/eventos' } },
  { key: 'joinThePark', path: { en: '/join-the-park', es: '/es/unete-al-parque' } },
  { key: 'contact', path: { en: '/contact', es: '/es/contacto' } },
  { key: 'privacyPolicy', path: { en: '/privacy-policy', es: '/es/politica-de-privacidad' } },
];

export const NAV_KEYS: readonly NavRouteKey[] = [
  'home',
  'foodTrucks',
  'events',
  'joinThePark',
  'contact',
];

/**
 * The URL prerender.mjs renders to produce `dist/404.html`. It deliberately
 * matches no route, so the router falls through to the NotFound page and the
 * 404 file gets the real site chrome instead of a bare redirect stub.
 */
export const NOT_FOUND_URL = '/__not-found__';

/** Every address the site answers on, in prerender order. */
export const ALL_PATHS: readonly string[] = ROUTE_DEFS.flatMap((route) =>
  LANGS.map((lang) => route.path[lang]),
);

// Cloudflare serves each page at a trailing-slash address and 308s the bare
// one to it, so both forms have to resolve to the same route.
function normalizePath(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function pathFor(key: RouteKey, lang: Lang): string {
  const route = ROUTE_DEFS.find((r) => r.key === key);
  if (!route) throw new Error(`Unknown route key: ${key}`);
  return route.path[lang];
}

/** Which language an address is in. `/es` and anything under it is Spanish. */
export function langFromPath(pathname: string): Lang {
  const p = normalizePath(pathname);
  return p === ES_PREFIX || p.startsWith(`${ES_PREFIX}/`) ? 'es' : DEFAULT_LANG;
}

export function routeKeyFromPath(pathname: string): RouteKey | null {
  const p = normalizePath(pathname);
  return ROUTE_DEFS.find((r) => LANGS.some((lang) => r.path[lang] === p))?.key ?? null;
}

/**
 * The same page in another language. An address that matches no route (a
 * 404) has no twin, so the toggle goes to that language's home instead.
 */
export function counterpartPath(pathname: string, lang: Lang): string {
  return pathFor(routeKeyFromPath(pathname) ?? 'home', lang);
}
