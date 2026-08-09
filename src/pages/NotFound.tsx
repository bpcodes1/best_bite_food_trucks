import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-brand-black sm:text-4xl">Page not found</h1>
      <p className="mt-4 text-brand-black/70">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-brand-yellow px-4 py-2 font-semibold text-brand-black"
      >
        Back to home
      </Link>
    </section>
  );
}
