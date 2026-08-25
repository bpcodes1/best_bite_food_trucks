import { useLanguage } from '../i18n/useLanguage';
import cruisePoster from '../assets/events/cruise_into_the_school_year_full.webp';
import backToSchool from '../assets/recent_event/back_to_school.webp';
import facePainting from '../assets/recent_event/face_painting.webp';
import jewelry from '../assets/recent_event/jewelry.webp';
import lowRider from '../assets/recent_event/low_rider.webp';

const PHOTOS = [
  { src: backToSchool, label: 'Back to School' },
  { src: facePainting, label: 'Face Painting' },
  { src: jewelry, label: 'Jewelry' },
  { src: lowRider, label: 'Low Riders' },
];

export function RecentEventGallery() {
  const { t } = useLanguage();

  return (
    <div className="mt-10 sm:mx-auto sm:max-w-2xl sm:text-center">
      <h2 className="font-heading text-2xl font-bold text-brand-black">
        {t.eventsPage.recentEventHeading}
      </h2>
      <p className="mt-1 font-heading text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">
        {t.eventsPage.recentEventName}
      </p>

      <div className="mt-4 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-[1fr_1fr]">
        <div className="aspect-square w-full max-w-sm overflow-hidden rounded-lg border border-brand-black/10 justify-self-start sm:aspect-auto sm:h-full">
          <img
            src={cruisePoster}
            alt="Cruise Into The School Year flyer"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <ul className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-4">
          {PHOTOS.map((photo) => (
            <li
              key={photo.label}
              className="aspect-square overflow-hidden rounded-lg border border-brand-black/10 sm:aspect-[3/4]"
            >
              <img
                src={photo.src}
                alt={photo.label}
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
