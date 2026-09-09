import { Link } from 'react-router-dom';
import heroImage from '../assets/best_bite_sign.webp';
import { useLanguage } from '../i18n/useLanguage';

export function Hero() {
  const { t, path } = useLanguage();

  return (
    <section className="relative isolate flex h-[calc(100vh-5rem)] items-end overflow-hidden">
      {/* Placeholder still image — swap for drone footage (video) once available. */}
      <img
        src={heroImage}
        alt={t.hero.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-[75%_20%] sm:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-brand-black/35 to-transparent" />

      <div className="relative flex w-full flex-col items-start gap-6 px-4 py-10 sm:px-8 sm:py-16 lg:px-16">
        <div className="flex flex-col gap-2">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-brand-yellow">
            {t.hero.kicker}
          </p>

          <h1 className="font-heading text-4xl font-bold uppercase leading-none text-white sm:text-8xl">
            <span className="block">{t.hero.titleLine1}</span>{' '}
            <span className="block">{t.hero.titleLine2}</span>
          </h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to={path('foodTrucks')}
            className="rounded-sm bg-brand-yellow px-[22px] py-[11px] text-center font-heading text-sm font-semibold text-brand-black transition-colors hover:bg-brand-yellow-dark"
          >
            {t.hero.ctaTrucks}
          </Link>
          <Link
            to={path('joinThePark')}
            className="rounded-sm border border-white px-[22px] py-[11px] text-center font-heading text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-black"
          >
            {t.hero.ctaJoin}
          </Link>
        </div>
      </div>
    </section>
  );
}
