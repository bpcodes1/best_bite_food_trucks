import { useLanguage } from '../../i18n/useLanguage';
import indoorPhoto from '../../assets/best_bite_inside.webp';
import outdoorPhoto from '../../assets/best_bite_outdoor.webp';
import bathroomsPhoto from '../../assets/bathrooms.webp';
import cleaningStationPhoto from '../../assets/cleaning_station.webp';

export function DiningSection() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="dining-heading" className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <h2 id="dining-heading" className="text-3xl font-bold text-brand-black sm:text-4xl">
          {t.diningSection.heading}
        </h2>
        <p className="mt-4 text-brand-black/70">{t.diningSection.body}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <figure>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
            <img
              src={indoorPhoto}
              alt={t.diningSection.indoorLabel}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-2 text-sm font-bold text-brand-black">
            {t.diningSection.indoorLabel}
          </figcaption>
        </figure>

        <figure>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
            <img
              src={outdoorPhoto}
              alt={t.diningSection.outdoorLabel}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-2 text-sm font-bold text-brand-black">
            {t.diningSection.outdoorLabel}
          </figcaption>
        </figure>

        <figure>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
            <img
              src={bathroomsPhoto}
              alt={t.diningSection.restroomsLabel}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-2 text-sm font-bold text-brand-black">
            {t.diningSection.restroomsLabel}
          </figcaption>
        </figure>

        <figure>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
            <img
              src={cleaningStationPhoto}
              alt={t.diningSection.cleaningStationLabel}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-2 text-sm font-bold text-brand-black">
            {t.diningSection.cleaningStationLabel}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
