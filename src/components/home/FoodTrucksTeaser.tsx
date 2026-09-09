import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { trucks } from '../../data/trucks';
import { TruckListingCard } from '../TruckListingCard';

export function FoodTrucksTeaser() {
  const { lang, t, path } = useLanguage();
  const featuredTrucks = trucks.filter((truck) => truck.featured);

  return (
    <section aria-labelledby="trucks-teaser-heading" className="bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2
              id="trucks-teaser-heading"
              className="text-3xl font-bold text-brand-black sm:text-4xl"
            >
              {t.trucksTeaser.heading}
            </h2>
            <p className="mt-2 max-w-md text-brand-black/70">{t.trucksTeaser.subheading}</p>
          </div>

          <Link
            to={path('foodTrucks')}
            className="inline-block shrink-0 rounded-md bg-brand-yellow px-10 py-2 font-heading text-sm font-bold text-brand-black transition-colors hover:bg-brand-yellow-dark"
          >
            {t.trucksTeaser.viewAll}
          </Link>
        </div>

        <hr className="my-8 border-t border-brand-yellow/50" />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featuredTrucks.map((truck) => (
            <li key={truck.id}>
              <TruckListingCard
                imageUrl={truck.featuredImage ?? truck.image ?? ''}
                name={truck.name}
                hours={truck.hours[lang]}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
