import { Link } from 'react-router-dom';
import heroImage from '../assets/best_bite_sign.jpg';
import { useLanguage } from '../i18n/useLanguage';
import { ROUTES } from '../lib/routes';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden sm:min-h-[80vh]">
      {/* Placeholder still image — swap for drone footage (video) once available. */}
      <img
        src={heroImage}
        alt={t.hero.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-[75%_20%] sm:object-center"
      />
      <div className="absolute inset-0 bg-brand-black/55" />

      <div className="relative flex w-full flex-col items-start gap-6 px-4 py-10 sm:px-8 sm:py-16 lg:px-16">
        <h1 className="font-heading text-4xl font-bold uppercase leading-none text-white sm:text-8xl">
          <span className="block">{t.hero.titleLine1}</span>{' '}
          <span className="block">{t.hero.titleLine2}</span>
        </h1>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to={ROUTES.foodTrucks}
            className="rounded-md bg-brand-yellow px-10 py-2 text-center font-heading text-sm font-bold text-brand-black transition-colors hover:bg-brand-yellow-dark"
          >
            {t.hero.ctaTrucks}
          </Link>
          <Link
            to={ROUTES.joinThePark}
            className="rounded-md bg-white px-10 py-2 text-center font-heading text-sm font-bold text-brand-black transition-colors hover:bg-white/90"
          >
            {t.hero.ctaJoin}
          </Link>
        </div>
      </div>
    </section>
  );
}
