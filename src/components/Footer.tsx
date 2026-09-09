import { Link } from 'react-router-dom';
import { NAV_KEYS } from '../lib/routes';
import { useLanguage } from '../i18n/useLanguage';
import { parkInfo } from '../data/parkInfo';
import logo from '../assets/logo.webp';

const footerNavKeys = NAV_KEYS.filter((key) => key !== 'home');

const SOCIAL_LINKS = [
  { key: 'instagram', href: parkInfo.social.instagram, label: 'Instagram' },
  { key: 'facebook', href: parkInfo.social.facebook, label: 'Facebook' },
  { key: 'tiktok', href: parkInfo.social.tiktok, label: 'TikTok' },
] as const;

export function Footer() {
  const { t, path } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-black/10 bg-brand-yellow">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3">
        <Link to={path('home')}>
          <img src={logo} alt="Best Bite Food Park" className="h-16 w-16" />
        </Link>

        <nav aria-label={t.nav.footerLabel}>
          <h2 className="text-xs font-bold uppercase tracking-wide text-brand-black/60">
            {t.nav.home}
          </h2>
          <ul className="mt-2 space-y-1 text-sm font-bold text-brand-black">
            {footerNavKeys.map((key) => (
              <li key={key}>
                <Link to={path(key)} className="hover:underline">
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wide text-brand-black/60">
            {t.footer.contactHeading}
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-brand-black">
            <li>
              <a href={`tel:${parkInfo.phone.replace(/[^+\d]/g, '')}`} className="hover:underline">
                {parkInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${parkInfo.email}`} className="hover:underline">
                {parkInfo.email}
              </a>
            </li>
          </ul>

          <h2 className="mt-4 text-xs font-bold uppercase tracking-wide text-brand-black/60">
            {t.footer.followHeading}
          </h2>
          <ul className="mt-2 flex gap-4">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.key}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-brand-black hover:underline"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-black/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-xs text-brand-black/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Best Bite Food Park</p>
          <Link to={path('privacyPolicy')} className="hover:underline">
            {t.footer.privacyCta}
          </Link>
        </div>
      </div>
    </footer>
  );
}
