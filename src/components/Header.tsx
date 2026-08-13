import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ROUTES, ROUTES } from '../lib/routes';
import { useLanguage } from '../i18n/useLanguage';
import { LanguageToggle } from './LanguageToggle';
import logo from '../assets/logo.png';

// Home is represented by the logo link, so it's excluded from the split nav groups.
const secondaryRoutes = NAV_ROUTES.filter((route) => route.path !== ROUTES.home);
const splitIndex = Math.ceil(secondaryRoutes.length / 2);
const leftRoutes = secondaryRoutes.slice(0, splitIndex);
const rightRoutes = secondaryRoutes.slice(splitIndex);

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return [
    'rounded-md px-3 py-2 text-base font-bold transition-colors',
    isActive ? 'bg-brand-black text-brand-yellow' : 'text-brand-black hover:bg-brand-black/10',
  ].join(' ');
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 font-nav bg-brand-yellow">
      <nav aria-label="Primary">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 py-3">
          <div className="col-start-1 flex items-center gap-3 justify-self-start md:justify-self-end">
            <div className="md:hidden">
              <LanguageToggle />
            </div>

            <ul className="hidden items-center gap-2 md:flex">
              {leftRoutes.map((route) => (
                <li key={route.path}>
                  <NavLink to={route.path} className={navLinkClassName}>
                    {t.nav[route.key]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <NavLink
            to="/"
            className="col-start-2 justify-self-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={logo} alt="Best Bite Food Park" className="h-14 w-14" />
          </NavLink>

          <div className="col-start-3 flex items-center justify-end gap-3 md:justify-between">
            <ul className="hidden items-center gap-2 md:flex">
              {rightRoutes.map((route) => (
                <li key={route.path}>
                  <NavLink to={route.path} className={navLinkClassName}>
                    {t.nav[route.key]}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <LanguageToggle />
            </div>

            <button
              type="button"
              className="rounded-md border border-brand-black/20 px-3 py-2 text-sm font-bold md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <ul
            id="mobile-nav"
            className="flex flex-col gap-1 border-t border-brand-black/10 px-4 py-3 md:hidden"
          >
            {NAV_ROUTES.map((route) => (
              <li key={route.path}>
                <NavLink
                  to={route.path}
                  end={route.path === '/'}
                  className={navLinkClassName}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.nav[route.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
