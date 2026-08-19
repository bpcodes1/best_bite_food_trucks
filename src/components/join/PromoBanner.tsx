import { useLanguage } from '../../i18n/useLanguage';
import { currentPromo } from '../../data/promo';

export function PromoBanner() {
  const { lang } = useLanguage();

  if (!currentPromo.active) return null;

  return (
    <section id="move-in-special" aria-labelledby="promo-heading" className="bg-brand-yellow/15">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-black/60">
          {lang === 'es' ? 'Promoción por tiempo limitado' : 'Limited-time promotion'}
        </p>
        <h2 id="promo-heading" className="mt-2 text-3xl font-bold text-brand-black sm:text-4xl">
          {currentPromo.headline[lang]}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-black/70">{currentPromo.body[lang]}</p>
      </div>
    </section>
  );
}
