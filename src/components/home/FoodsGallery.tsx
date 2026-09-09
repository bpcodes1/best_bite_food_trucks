import { useLanguage } from '../../i18n/useLanguage';
import { foods } from '../../data/foods';
import { FanGallery } from '../FanGallery';

export function FoodsGallery() {
  const { lang, t } = useLanguage();
  const fanFoods = foods.filter((food) => food.image).slice(0, 6);
  const fanImages = fanFoods.map((food) => food.image!);
  const fanAltTexts = fanFoods.map((food) => food.name[lang]);

  return (
    <section
      aria-labelledby="foods-heading"
      className="overflow-x-hidden bg-brand-yellow/10 px-4 py-16"
    >
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-heading text-sm font-bold uppercase tracking-widest text-brand-yellow-dark">
          {t.foodsSection.kicker}
        </p>
        <h2 id="foods-heading" className="mt-1 text-3xl font-bold text-brand-black sm:text-4xl">
          {t.foodsSection.heading}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-brand-black/70">{t.foodsSection.subheading}</p>

        <div className="mt-8">
          <FanGallery
            images={fanImages}
            altTexts={fanAltTexts}
            previousLabel={t.foodsSection.previousImage}
            nextLabel={t.foodsSection.nextImage}
          />
        </div>
      </div>
    </section>
  );
}
