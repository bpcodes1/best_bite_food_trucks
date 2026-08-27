import { useLanguage } from '../../i18n/useLanguage';
import { currentPromo } from '../../data/promo';

export function PromoBanner() {
  const { lang } = useLanguage();

  return (
    <section id="move-in-special" aria-labelledby="promo-heading" className="bg-brand-yellow/15">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-black/60">
          {lang === 'es' ? 'Promoción por tiempo limitado' : 'Limited-time promotion'}
        </p>
        {currentPromo.active ? (
          <>
            <h2 id="promo-heading" className="mt-2 text-3xl font-bold text-brand-black sm:text-4xl">
              {currentPromo.headline[lang]}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-black/70">{currentPromo.body[lang]}</p>
          </>
        ) : (
          <>
            <h2 id="promo-heading" className="mt-2 text-3xl font-bold text-brand-black sm:text-4xl">
              {lang === 'es' ? 'Próxima Promoción de Mudanza' : 'Move-In Promo Coming Soon'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-black/70">
              {lang === 'es'
                ? 'Pronto compartiremos nuestra próxima oferta especial. ¡Mantente al pendiente!'
                : 'Stay tuned — we will be sharing our next move-in special soon.'}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
