import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES, alternatePath, langFromPath, pathFor, type Lang } from '../lib/routes'
import logo from '../assets/logo-256.png'

/**
 * The masthead. Two rows, newspaper-style, per the Atlantic DNA in design.md:
 * a brand row (logo, wordmark, language toggle) that scrolls away, and a nav
 * row on a rule that sticks. Chosen by Enrique 2026-08-12 after the hallmark
 * audit flagged the previous header as the named "AI nav" fingerprint
 * (wordmark left, inline links right, button hard-right).
 *
 * The masthead also solves the width problem the old header had: the nav row
 * owns the full page width, so the five Spanish labels (46 characters against
 * English's 38) fit from `sm` up instead of `lg` up. Below `sm` the menu
 * collapses into a native <details> — every link stays in the pre-rendered
 * HTML whether the menu is open or shut, which is what a crawler that never
 * runs JavaScript reads. A route test pins the Spanish label budget.
 */

const A11Y = {
  en: { skip: 'Skip to content', menu: 'Open navigation', primary: 'Primary' },
  es: { skip: 'Ir al contenido', menu: 'Abrir navegación', primary: 'Principal' },
} satisfies Record<Lang, { skip: string; menu: string; primary: string }>

/**
 * The toggle names the language you would be switching TO, written in that
 * language. A Spanish-dominant reader scans for the word "Español", not for a
 * two-letter code they have to decode first.
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
    <header>
      <a
        href="#content"
        className="sr-only font-mono text-xs uppercase focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {t.skip}
      </a>

      {/* Brand row. Scrolls away; the nav row below is what sticks. */}
      <div className="bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
          <Link
            to={pathFor('home', lang)}
            className="flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <img
              src={logo}
              alt="Best Bite Food Park"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            {/* The logo is a solid yellow square with the name set inside it,
                no horizontal lockup — so the wordmark beside it is type, and
                the image carries the accessible name. */}
            <span
              aria-hidden="true"
              className="font-display text-sm leading-[1.1] tracking-tight uppercase"
            >
              Best Bite
              <br />
              Food Park
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {alt && (
              <Link
                to={alt}
                hrefLang={lang === 'en' ? 'es' : 'en'}
                className={`${linkBase} shrink-0 border border-rule px-2.5 py-1.5 text-ink hover:border-ink`}
              >
                {SWITCH_TO[lang]}
              </Link>
            )}

            {/* Collapsed nav, phones only. The links live in the HTML at
                every width. */}
            <details ref={menu} className="relative sm:hidden">
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
      </div>

      {/* Nav row. Full width to itself — the reason Spanish fits from sm up —
          and the only part of the masthead that sticks. */}
      <nav
        aria-label={t.primary}
        className="sticky top-0 z-50 hidden border-y border-rule bg-paper/95 backdrop-blur-sm sm:block"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-7 px-5 sm:px-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={l.current ? 'page' : undefined}
              className={`${linkBase} py-3 ${
                l.current
                  ? 'text-ink underline decoration-brand-yellow decoration-2 underline-offset-[10px]'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
