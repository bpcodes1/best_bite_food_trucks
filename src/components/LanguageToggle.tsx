import { useLanguage } from '../i18n/useLanguage';

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const ariaLabel =
    lang === 'en'
      ? 'Switch to Spanish / Cambiar a español'
      : 'Switch to English / Cambiar a inglés';

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={ariaLabel}
      className="rounded-md border border-brand-black/20 px-3 py-2 text-sm font-bold text-brand-black transition-colors hover:bg-brand-black/10"
    >
      {lang === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
