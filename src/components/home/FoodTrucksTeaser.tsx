import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { ROUTES } from '../../lib/routes';
import { trucks } from '../../data/trucks';
import { TruckCard } from '../TruckCard';

export function FoodTrucksTeaser() {
  const { t } = useLanguage();
  const featuredTrucks = trucks.filter((truck) => truck.featured);

  return (
    <section aria-labelledby="trucks-teaser-heading" className="bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            id="trucks-teaser-heading"
            className="text-3xl font-bold text-brand-black sm:text-4xl"
          >
            {t.trucksTeaser.heading}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-brand-black/70">{t.trucksTeaser.subheading}</p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {featuredTrucks.map((truck) => (
            <TruckCard
              key={truck.id}
              truck={{ ...truck, image: truck.featuredImage ?? truck.image }}
            />
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            to={ROUTES.foodTrucks}
            className="inline-block rounded-md border-2 border-brand-black px-10 py-2 font-heading text-sm font-bold text-brand-black transition-colors hover:bg-brand-black hover:text-white"
          >
            {t.trucksTeaser.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
