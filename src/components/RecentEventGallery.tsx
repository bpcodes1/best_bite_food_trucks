import { useLanguage } from '../i18n/useLanguage';
import eventPoster from '../assets/events/end_of_summer_lowrider.webp';
import lowriderTeal from '../assets/recent_event/lowrider_teal.webp';
import lowriderRedClassic from '../assets/recent_event/lowrider_red_classic.webp';
import lowriderOwners from '../assets/recent_event/lowrider_owners.webp';
import lowriderGroup from '../assets/recent_event/lowrider_group.webp';

// Keyed, not labelled: the alt text comes from translations so it is not
// English on the Spanish page. Swap a photo here and its alt text there in the
// same commit — a stale description is worse than none.
const PHOTOS = [
  { src: lowriderTeal, key: 'tealLowrider' },
  { src: lowriderRedClassic, key: 'redClassic' },
  { src: lowriderOwners, key: 'carOwners' },
  { src: lowriderGroup, key: 'group' },
] as const;

export function RecentEventGallery() {
  const { t } = useLanguage();
  const photoAlt = t.eventsPage.recentEventPhotos;

  return (
    <div className="mt-10 sm:mx-auto sm:max-w-2xl sm:text-center">
      <h2 className="font-heading text-2xl font-bold text-brand-black">
        {t.eventsPage.recentEventHeading}
      </h2>
      <p className="mt-1 font-heading text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">
        {t.eventsPage.recentEventName}
      </p>

      <div className="mt-4 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-[1fr_1fr]">
        {/* The flyer's own shape on phones, so none of it is cropped away. */}
        <div className="aspect-[900/1250] w-full max-w-sm overflow-hidden rounded-lg border border-brand-black/10 justify-self-start sm:aspect-auto sm:h-full">
          <img
            src={eventPoster}
            alt={photoAlt.poster}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <ul className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-4">
          {PHOTOS.map((photo) => (
            <li
              key={photo.key}
              className="aspect-square overflow-hidden rounded-lg border border-brand-black/10 sm:aspect-[3/4]"
            >
              <img
                src={photo.src}
                alt={photoAlt[photo.key]}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
