import { useLanguage } from '../i18n/useLanguage';

// Varied row/col spans so the grid reads as a masonry-style layout once real
// photos replace these blank placeholder tiles.
const TILE_SPANS = [
  'row-span-2',
  'row-span-1',
  'row-span-1',
  'col-span-2 row-span-1',
  'row-span-2',
  'row-span-1',
  'row-span-1',
  'row-span-2',
  'col-span-2 row-span-1',
  'row-span-1',
];

export function PastEventsGallery() {
  const { t } = useLanguage();

  return (
    <div className="mt-10">
      <h2 className="font-heading text-2xl font-bold text-brand-black">
        {t.eventsPage.pastEventsHeading}
      </h2>

      <ul className="mt-4 grid auto-rows-[110px] grid-cols-2 grid-flow-dense gap-4 sm:grid-cols-4">
        {TILE_SPANS.map((span, index) => (
          <li
            key={index}
            className={`${span} rounded-lg border border-brand-black/10 bg-brand-yellow/15`}
          />
        ))}
      </ul>
    </div>
  );
}
