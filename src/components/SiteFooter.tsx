import { Link, useLocation } from 'react-router-dom'
import { ROUTES, alternatePath, langFromPath, type Lang } from '../lib/routes'
import { hoursRange, site } from '../lib/site'
import logo from '../assets/logo-256.png'

/**
 * Night ground, per design.md: dark is a section, never the page. The footer is
 * the one section that appears on all ten addresses, so it is also where the
 * site's internal linking is guaranteed — every page reachable from every page,
 * in the pre-rendered HTML.
 *
 * The name, address and hours come from `src/lib/site.ts` and are never retyped
 * here. Google matches the Business Profile to the site by exact string, and
 * this block is the one it reads.
 *
 * The social handles render as visible brackets until Ray sends them. That is
 * the point: a placeholder that looks like real data is how the previous build
 * shipped a fake Austin phone number on a Salem business.
 */

const COPY = {
  en: {
    pages: 'Pages',
    visit: 'Visit',
    hours: 'Hours',
    everyDay: 'Open every day',
    follow: 'Follow',
    rights: 'All rights reserved.',
  },
  es: {
    pages: 'Páginas',
    visit: 'Visítanos',
    hours: 'Horario',
    everyDay: 'Abierto todos los días',
    follow: 'Síguenos',
    rights: 'Todos los derechos reservados.',
  },
} satisfies Record<Lang, Record<string, string>>

const heading = 'font-mono text-[11px] uppercase tracking-[0.14em] text-night-muted'

const link =
  'font-mono text-[11px] uppercase tracking-[0.12em] text-paper transition-colors duration-150 ' +
  'ease-out hover:text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-4 ' +
  'focus-visible:outline-brand-yellow'

export function SiteFooter() {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)
  const alt = alternatePath(pathname)
  const t = COPY[lang]

  return (
    <footer className="bg-night px-5 py-14 text-paper sm:px-8 sm:py-16">
      {/* The mark sits above the columns rather than occupying one of them. As
          a fourth column it left a column-height void under a 72px image, which
          is the accidental kind of empty space, not the composed kind. */}
      <div className="mx-auto max-w-6xl">
        <img
          src={logo}
          alt={site.name}
          width={72}
          height={72}
          className="h-16 w-16 object-contain sm:h-[4.5rem] sm:w-[4.5rem]"
        />
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <nav aria-label={t.pages} className="min-w-0">
          <p className={heading}>{t.pages}</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {ROUTES.map((route) => (
              <li key={route.key}>
                <Link to={route.path[lang]} className={link}>
                  {route.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
          {alt && (
            <Link
              to={alt}
              hrefLang={lang === 'en' ? 'es' : 'en'}
              className={`${link} mt-5 inline-block border border-night-muted/50 px-2.5 py-1.5`}
            >
              {lang === 'en' ? 'Español' : 'English'}
            </Link>
          )}
        </nav>

        {/* NAP. One source, never retyped. */}
        <div className="min-w-0">
          <p className={heading}>{t.visit}</p>
          <address className="mt-4 text-sm leading-relaxed text-night-muted not-italic">
            <span className="block text-paper">{site.name}</span>
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <p className={`${heading} mt-6`}>{t.hours}</p>
          <p className="mt-2 font-mono text-sm text-paper">{hoursRange()}</p>
          <p className="mt-1 text-sm text-night-muted">{t.everyDay}</p>
        </div>

        <div className="min-w-0">
          <p className={heading}>{t.follow}</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm break-words text-night-muted">
            <li>{site.social.instagram}</li>
            <li>{site.social.facebook}</li>
            <li>{site.social.tiktok}</li>
          </ul>
        </div>
      </div>

      {/* No year. A copyright line that has to be edited every January is a
          neglect signal waiting to happen on a site nobody touches for months. */}
      <div className="mx-auto mt-12 max-w-6xl border-t border-night-muted/25 pt-6">
        <p className="font-mono text-[11px] tracking-[0.1em] text-night-muted uppercase">
          © {site.name}. {t.rights}
        </p>
      </div>
    </footer>
  )
}
