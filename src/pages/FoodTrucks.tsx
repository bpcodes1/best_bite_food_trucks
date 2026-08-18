import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';
import { trucks, CATEGORIES } from '../data/trucks';
import type { TruckCategory } from '../data/trucks';
import { TruckCard } from '../components/TruckCard';
import { ROUTES } from '../lib/routes';
import vendorCtaImage from '../assets/inside_sign.png';

export function FoodTrucks() {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<TruckCategory | 'all'>('all');

  const usedCategories = CATEGORIES.filter((category) =>
    trucks.some((truck) => truck.category === category.id),
  );
  const filteredTrucks =
    activeCategory === 'all' ? trucks : trucks.filter((truck) => truck.category === activeCategory);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-brand-black sm:text-4xl">
          {t.foodTrucksPage.heading}
        </h1>
        <p className="mt-4 text-brand-black/70">{t.foodTrucksPage.intro}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
            activeCategory === 'all'
              ? 'bg-brand-black text-brand-yellow'
              : 'bg-brand-yellow/15 text-brand-black hover:bg-brand-yellow/30'
          }`}
        >
          {t.foodTrucksPage.allCategories}
        </button>
        {usedCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              activeCategory === category.id
                ? 'bg-brand-black text-brand-yellow'
                : 'bg-brand-yellow/15 text-brand-black hover:bg-brand-yellow/30'
            }`}
          >
            {category.label[lang]}
          </button>
        ))}
      </div>

      {filteredTrucks.length > 0 ? (
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTrucks.map((truck) => (
            <TruckCard key={truck.id} truck={truck} />
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-brand-black/60">{t.foodTrucksPage.noResults}</p>
      )}

      <div className="mt-10 grid grid-cols-1 items-center gap-8 rounded-lg bg-brand-yellow/15 p-6 sm:grid-cols-2 sm:p-10">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
          <img
            src={vendorCtaImage}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <h2 className="font-heading text-2xl font-bold text-brand-black sm:text-3xl">
            {t.foodTrucksPage.vendorCtaHeading}
          </h2>
          <p className="mt-3 text-brand-black/70">{t.foodTrucksPage.vendorCtaBody}</p>
          <Link
            to={ROUTES.joinThePark}
            className="mt-6 inline-block rounded-md bg-brand-black px-6 py-3 font-heading font-bold text-brand-yellow transition-colors hover:bg-brand-black/80"
          >
            {t.foodTrucksPage.vendorCtaCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
