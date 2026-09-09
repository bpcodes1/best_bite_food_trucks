import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';

export function NotFound() {
  const { t, path } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-brand-black sm:text-4xl">
        {t.notFoundPage.heading}
      </h1>
      <p className="mt-4 text-brand-black/70">{t.notFoundPage.body}</p>
      <Link
        to={path('home')}
        className="mt-6 inline-block rounded-md bg-brand-yellow px-4 py-2 font-semibold text-brand-black"
      >
        {t.notFoundPage.backHome}
      </Link>
    </section>
  );
}
