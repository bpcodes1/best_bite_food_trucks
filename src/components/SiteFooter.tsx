import { Link, useLocation } from 'react-router-dom'
import { ROUTES, alternatePath, langFromPath, type Lang } from '../lib/routes'
import { hoursRange, site } from '../lib/site'
import { SocialLink } from './ui'

/**
 * The statement footer, chosen by Enrique 2026-08-12 after the hallmark audit
 * flagged the previous three-column layout as adjacent to the named "AI
 * footer". One big display line closes the page the way the yellow bands
 * punctuate it, then a single dense row carries everything real: pages, NAP,
 * hours, socials.
 *
 * The name, address and hours come from `src/lib/site.ts` and are never
 * retyped here. Google matches the Business Profile to the site by exact
 * string, and this block is the one it reads. The social handles render as
 * visible brackets until Ray sends them — a placeholder that looks like real
 * data is how the previous build shipped a fake phone number.
 */

const COPY = {
  en: {
    statement: 'Come hungry.',
    pages: 'Pages',
    visit: 'Visit',
    hours: 'Hours',
    everyDay: 'Open every day',
    follow: 'Follow',
    rights: 'All rights reserved.',
  },
  es: {
    statement: 'Ven con hambre.',
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
      <div className="mx-auto max-w-6xl">
        {/* The statement. Sitewide closing line; on Home it bookends the food
            band's own heading, and that repetition is deliberate. */}
        <p className="font-display text-4xl leading-[0.95] uppercase sm:text-6xl lg:text-7xl">
          {t.statement}
        </p>

        <div className="mt-10 border-t border-night-muted/25 pt-8 sm:mt-12">
          <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-x-14 lg:grid-cols-[auto_auto_1fr] lg:gap-x-16">
            <nav aria-label={t.pages} className="min-w-0">
              <p className={heading}>{t.pages}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {ROUTES.map((route) => (
                  <li key={route.key}>
                    <Link to={route.path[lang]} className={link}>
                      {route.label[lang]}
                    </Link>
                  </li>
                ))}
                {alt && (
                  <li className="mt-2">
                    <Link to={alt} hrefLang={lang === 'en' ? 'es' : 'en'} className={link}>
                      {lang === 'en' ? 'Español' : 'English'}
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            {/* NAP. One source, never retyped. */}
            <div className="min-w-0">
              <p className={heading}>{t.visit}</p>
              <address className="mt-3 text-sm leading-relaxed text-night-muted not-italic">
                <span className="block text-paper">{site.name}</span>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </address>
              <p className="mt-4 font-mono text-sm text-paper">{hoursRange()}</p>
              <p className="text-sm text-night-muted">{t.everyDay}</p>
            </div>

            <div className="min-w-0 lg:justify-self-end lg:text-right">
              <p className={heading}>{t.follow}</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm break-words text-night-muted">
                <li>
                  <SocialLink account={site.social.instagram} className="hover:text-brand-yellow" />
                </li>
                <li>
                  <SocialLink account={site.social.facebook} className="hover:text-brand-yellow" />
                </li>
                <li>
                  <SocialLink account={site.social.tiktok} />
                </li>
              </ul>
            </div>
          </div>

          {/* No year — a copyright line that has to be edited every January
              is a neglect signal waiting to happen. */}
          <p className="mt-10 font-mono text-[11px] tracking-[0.1em] text-night-muted uppercase">
            © {site.name}. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
