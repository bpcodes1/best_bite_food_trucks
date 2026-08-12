import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES, alternatePath, langFromPath, pathFor, type Lang } from '../lib/routes'
import logo from '../assets/logo-256.png'

/**
 * The nav, the wordmark and the language toggle. Every link comes from
 * `src/lib/routes.ts`, so a new page appears here without this file changing.
 *
 * TWO THINGS HERE ARE LOAD-BEARING AND EASY TO UNDO BY ACCIDENT.
 *
 * 1. The nav collapses below `lg`, not below `md`. The five Spanish labels
 *    (`Inicio · Vendedores · Eventos · Únete al Parque · Contacto`) run to
 *    roughly 46 characters against English's 38, and set in letterspaced mono
 *    alongside the wordmark and the toggle they overflow a 768px header. The
 *    English nav fits there fine, which is exactly the trap: checking one
 *    language passes.
 *
 * 2. The collapsed menu is a native `<details>`, not React state. Every link
 *    is in the pre-rendered HTML whether the menu is open or shut, so a
 *    crawler that never runs JavaScript still sees the whole site's internal
 *    linking. A `{open && <nav>}` would leave four of five pages unlinked in
 *    the shipped file, which on a site whose job is local search is the
 *    expensive kind of invisible. It is also keyboard accessible for free.
 */

const A11Y = {
  en: { skip: 'Skip to content', menu: 'Open navigation', primary: 'Primary' },
  es: { skip: 'Ir al contenido', menu: 'Abrir navegación', primary: 'Principal' },
} satisfies Record<Lang, { skip: string; menu: string; primary: string }>

/**
 * The toggle names the language you would be switching TO, written in that
 * language. A Spanish-dominant reader looking for their language scans for the
 * word "Español", not for a two-letter code they have to decode first.
 */
const SWITCH_TO: Record<Lang, string> = { en: 'Español', es: 'English' }

const linkBase =
  'font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-150 ease-out ' +
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink'

export function SiteHeader() {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)
  const alt = alternatePath(pathname)
  const t = A11Y[lang]
  const menu = useRef<HTMLDetailsElement>(null)

  // Client-side navigation does not close a <details> on its own, so the menu
  // would stay open over the page you just moved to. Without JavaScript this
  // never runs and never needs to: a full page load closes it anyway.
  useEffect(() => {
    if (menu.current) menu.current.open = false
  }, [pathname])

  const navLinks = ROUTES.map((route) => {
    const to = route.path[lang]
    return { to, label: route.label[lang], current: to === pathname }
  })

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <a
        href="#content"
        className="sr-only font-mono text-xs uppercase focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {t.skip}
      </a>

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        {/* The logo is a solid yellow square with the name set inside it and no
            horizontal lockup, so the visible wordmark beside it is type, not a
            second copy of the mark. The image carries the accessible name and
            the text is decorative, which keeps one name rather than two. */}
        <Link
          to={pathFor('home', lang)}
          className="flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <img
            src={logo}
            alt="Best Bite Food Park"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          <span
            aria-hidden="true"
            className="hidden font-display text-[13px] leading-[1.1] tracking-tight uppercase sm:block"
          >
            Best Bite
            <br />
            Food Park
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-6">
          {/* Wide nav. Hidden below lg because Spanish does not fit at 768. */}
          <nav aria-label={t.primary} className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                aria-current={l.current ? 'page' : undefined}
                className={`${linkBase} ${
                  l.current
                    ? 'text-ink underline decoration-brand-yellow decoration-2 underline-offset-[6px]'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {alt && (
            <Link
              to={alt}
              hrefLang={lang === 'en' ? 'es' : 'en'}
              className={`${linkBase} shrink-0 border border-rule px-2.5 py-1.5 text-ink hover:border-ink`}
            >
              {SWITCH_TO[lang]}
            </Link>
          )}

          {/* Collapsed nav. The links live in the HTML at every width. */}
          <details ref={menu} className="relative lg:hidden">
            <summary
              aria-label={t.menu}
              className="flex cursor-pointer list-none flex-col justify-center gap-[5px] p-2 marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span aria-hidden="true" className="block h-[2px] w-6 bg-ink" />
              <span aria-hidden="true" className="block h-[2px] w-6 bg-ink" />
              <span aria-hidden="true" className="block h-[2px] w-6 bg-ink" />
            </summary>
            <nav
              aria-label={t.primary}
              className="absolute right-0 z-50 mt-3 flex w-[15rem] flex-col border border-rule bg-paper"
            >
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  aria-current={l.current ? 'page' : undefined}
                  className={`${linkBase} border-b border-rule px-4 py-3.5 last:border-b-0 ${
                    l.current
                      ? 'border-l-2 border-l-brand-yellow bg-ink/[0.03] text-ink'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
