import { useLanguage } from '../../i18n/useLanguage';
import { foods } from '../../data/foods';

export function FoodsGallery() {
  const { lang, t } = useLanguage();

  return (
    <section
      aria-labelledby="foods-heading"
      className="border-t border-brand-black/10 bg-white px-4 py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 id="foods-heading" className="text-3xl font-bold text-brand-black sm:text-4xl">
            {t.foodsSection.heading}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-brand-black/70">{t.foodsSection.subheading}</p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {foods.map((food) => (
            <li key={food.id} className="overflow-hidden rounded-lg border border-brand-black/10">
              <div className="aspect-square w-full bg-brand-yellow/15">
                {food.image ? (
                  <img
                    src={food.image}
                    alt={food.name[lang]}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-2 text-center text-xs font-bold text-brand-black/50">
                    {t.foodsSection.imagesComingSoon}
                  </div>
                )}
              </div>
              <p className="p-3 text-center text-sm font-bold text-brand-black">
                {food.name[lang]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
