import { useLanguage } from '../i18n/useLanguage';
import { trucks } from '../data/trucks';
import { TruckCard } from '../components/TruckCard';

export function FoodTrucks() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-brand-black sm:text-4xl">
          {t.foodTrucksPage.heading}
        </h1>
        <p className="mt-4 text-brand-black/70">{t.foodTrucksPage.intro}</p>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trucks.map((truck) => (
          <TruckCard key={truck.id} truck={truck} />
        ))}
      </ul>
    </section>
  );
}
