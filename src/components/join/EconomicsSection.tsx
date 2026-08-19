import { useLanguage } from '../../i18n/useLanguage';

export function EconomicsSection() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="economics-heading" className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <h2 id="economics-heading" className="text-3xl font-bold text-brand-black sm:text-4xl">
          {t.joinPage.economicsHeading}
        </h2>
        <p className="mt-4 text-brand-black/70">{t.joinPage.economicsBody}</p>
      </div>

      <div className="mt-12">
        <h3 className="font-heading text-xs font-bold uppercase tracking-wide text-brand-black/60">
          {t.joinPage.howItWorksHeading}
        </h3>

        <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {t.joinPage.howItWorksSteps.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-brand-black/10 p-6">
              <p className="font-heading text-3xl font-bold text-brand-yellow">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h4 className="mt-3 font-heading text-lg font-bold text-brand-black">{step.title}</h4>
              <p className="mt-1 text-sm text-brand-black/70">{step.body}</p>
            </li>
          ))}
        </ol>

        <a
          href="#lease-form"
          className="mt-8 inline-block rounded-md bg-brand-yellow px-8 py-3 text-center font-heading font-bold text-brand-black transition-colors hover:bg-brand-yellow-dark"
        >
          {t.joinPage.ctaLabel}
        </a>
      </div>
    </section>
  );
}
