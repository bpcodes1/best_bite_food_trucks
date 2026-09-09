import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';

/**
 * A link to this page's twin in the other language. Changing language
 * changes the address, which is what lets each language be indexed on its
 * own and lets a visitor share a page in the language they are reading it in.
 */
export function LanguageToggle() {
  const { lang, counterpartPath } = useLanguage();
  const target = lang === 'en' ? 'es' : 'en';
  const ariaLabel =
    lang === 'en'
      ? 'Switch to Spanish / Cambiar a español'
      : 'Switch to English / Cambiar a inglés';

  return (
    <Link
      to={counterpartPath(target)}
      hrefLang={target}
      lang={target}
      aria-label={ariaLabel}
      className="inline-block rounded-md border border-brand-black/20 px-3 py-2 text-sm font-bold text-brand-black transition-colors hover:bg-brand-black/10"
    >
      {lang === 'en' ? 'ES' : 'EN'}
    </Link>
  );
}
