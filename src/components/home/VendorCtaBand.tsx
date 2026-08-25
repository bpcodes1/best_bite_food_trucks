import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { ROUTES } from '../../lib/routes';
import logo from '../../assets/logo.webp';

export function VendorCtaBand() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="vendor-cta-heading" className="bg-brand-black">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 sm:grid-cols-2">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-brand-yellow">
          <img src={logo} alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>

        <div>
          <h2
            id="vendor-cta-heading"
            className="font-heading text-2xl font-bold text-white sm:text-3xl"
          >
            {t.vendorCta.heading}
          </h2>
          <p className="mt-3 text-white/80">{t.vendorCta.body}</p>
          <Link
            to={ROUTES.joinThePark}
            className="mt-6 inline-block rounded-md bg-brand-yellow px-6 py-3 font-heading font-bold text-brand-black transition-colors hover:bg-brand-yellow-dark"
          >
            {t.vendorCta.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
