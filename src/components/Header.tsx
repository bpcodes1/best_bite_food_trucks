import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_KEYS } from '../lib/routes';
import { useLanguage } from '../i18n/useLanguage';
import { LanguageToggle } from './LanguageToggle';
import logo from '../assets/logo.webp';

// Home is represented by the logo link, so it's excluded from the split nav groups.
// Keys rather than paths: the path depends on the language of the current page.
const secondaryKeys = NAV_KEYS.filter((key) => key !== 'home');
const splitIndex = Math.ceil(secondaryKeys.length / 2);
const leftKeys = secondaryKeys.slice(0, splitIndex);
const rightKeys = secondaryKeys.slice(splitIndex);

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return [
    'rounded-md px-3 py-2 text-base font-bold transition-colors',
    isActive ? 'bg-brand-black text-brand-yellow' : 'text-brand-black hover:bg-brand-black/10',
  ].join(' ');
}

// Mobile menu links need a taller tap target (~44px) than the desktop nav's
// tighter padding — this variant adds the extra height without touching the
// shared desktop styling above.
function mobileNavLinkClassName({ isActive }: { isActive: boolean }) {
  return [
    'flex min-h-11 items-center rounded-md px-3 text-base font-bold transition-colors',
    isActive ? 'bg-brand-black text-brand-yellow' : 'text-brand-black hover:bg-brand-black/10',
  ].join(' ');
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      {open ? <path d="M6 6l12 12M18 6l-12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
    </svg>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, path } = useLanguage();

  return (
    <header className="sticky top-0 z-50 font-nav bg-brand-yellow">
      <nav aria-label={t.nav.primaryLabel}>
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 py-3">
          <div className="col-start-1 flex items-center gap-3 justify-self-start md:justify-self-end">
            <div className="md:hidden">
              <LanguageToggle />
            </div>

            <ul className="hidden items-center gap-2 md:flex">
              {leftKeys.map((key) => (
                <li key={key}>
                  <NavLink to={path(key)} className={navLinkClassName}>
                    {t.nav[key]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <NavLink
            to={path('home')}
            className="col-start-2 justify-self-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={logo} alt="Best Bite Food Park" className="h-14 w-14" />
          </NavLink>

          <div className="col-start-3 flex items-center justify-end gap-3 md:justify-between">
            <ul className="hidden items-center gap-2 md:flex">
              {rightKeys.map((key) => (
                <li key={key}>
                  <NavLink to={path(key)} className={navLinkClassName}>
                    {t.nav[key]}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <LanguageToggle />
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-brand-black/20 text-brand-black md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <MenuIcon open={isMenuOpen} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <ul
            id="mobile-nav"
            className="flex flex-col gap-1 border-t border-brand-black/10 px-4 py-3 md:hidden"
          >
            {NAV_KEYS.map((key) => (
              <li key={key}>
                <NavLink
                  to={path(key)}
                  end={key === 'home'}
                  className={mobileNavLinkClassName}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.nav[key]}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
