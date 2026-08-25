import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/useLanguage';
import loteria from '../assets/events/loteria.webp';
import loteria2 from '../assets/events/loteria2.webp';
import easter from '../assets/events/easter.webp';
import easter2 from '../assets/events/easter2.webp';
import giveaway from '../assets/events/giveaway.webp';
import backToSchool from '../assets/events/back_to_school.webp';
import lowRiders from '../assets/events/low_riders.webp';
import jarochitas from '../assets/events/jarochitas.webp';
import mycelium from '../assets/events/mycelium.webp';
import christmas from '../assets/events/christmas.webp';

// `packRatio` is each photo's natural height/width — it drives column
// placement/balance only and should stay fixed so resizing a tile doesn't
// reshuffle the whole gallery. `displayRatio` drives the tile's actual
// on-screen height (via flexGrow) and defaults to packRatio, but can be
// bumped independently to make a specific tile taller — the extra height
// just crops more of that image via object-cover.
const PHOTOS = [
  { src: backToSchool, packRatio: 2611 / 1320, displayRatio: 2611 / 1320, label: 'Back to School' },
  { src: christmas, packRatio: 1133 / 1320, displayRatio: 1133 / 1320, label: 'Christmas' },
  { src: easter, packRatio: 993 / 1320, displayRatio: 993 / 1320, label: 'Easter' },
  { src: jarochitas, packRatio: 1368 / 1320, displayRatio: 1368 / 1320, label: 'Las Jarochitas' },
  { src: giveaway, packRatio: 2246 / 1320, displayRatio: 2246 / 1320, label: 'Giveaway' },
  { src: loteria2, packRatio: 1639 / 1320, displayRatio: 2.4, label: 'Lotería' },
  { src: mycelium, packRatio: 1640 / 1320, displayRatio: 2.4, label: 'Mycelium' },
  { src: loteria, packRatio: 2270 / 1320, displayRatio: 2270 / 1320, label: 'Lotería' },
  { src: easter2, packRatio: 2263 / 1320, displayRatio: 2263 / 1320, label: 'Easter' },
  { src: lowRiders, packRatio: 2267 / 1320, displayRatio: 2267 / 1320, label: 'Lowriders' },
];

function useColumnCount(): number {
  const [columnCount, setColumnCount] = useState(4);

  useEffect(() => {
    const smQuery = window.matchMedia('(min-width: 640px)');
    const lgQuery = window.matchMedia('(min-width: 1024px)');

    function updateColumnCount() {
      setColumnCount(lgQuery.matches ? 4 : smQuery.matches ? 3 : 2);
    }

    updateColumnCount();
    smQuery.addEventListener('change', updateColumnCount);
    lgQuery.addEventListener('change', updateColumnCount);
    return () => {
      smQuery.removeEventListener('change', updateColumnCount);
      lgQuery.removeEventListener('change', updateColumnCount);
    };
  }, []);

  return columnCount;
}

// Greedy longest-processing-time bin packing: place each photo (largest
// first) into whichever column is currently shortest, so every column ends
// up close to the same total height.
function distributeIntoColumns(columnCount: number): (typeof PHOTOS)[] {
  const columns: (typeof PHOTOS)[] = Array.from({ length: columnCount }, () => []);
  const columnHeights = Array<number>(columnCount).fill(0);

  const sorted = [...PHOTOS].sort((a, b) => b.packRatio - a.packRatio);
  for (const photo of sorted) {
    let shortest = 0;
    for (let i = 1; i < columnCount; i++) {
      if (columnHeights[i] < columnHeights[shortest]) shortest = i;
    }
    columns[shortest].push(photo);
    columnHeights[shortest] += photo.packRatio;
  }

  return columns;
}

export function PastEventsGallery() {
  const { t } = useLanguage();
  const columnCount = useColumnCount();
  const columns = distributeIntoColumns(columnCount);

  return (
    <div className="mt-10">
      <h2 className="font-heading text-2xl font-bold text-brand-black">
        {t.eventsPage.pastEventsHeading}
      </h2>

      <div className="mt-4 flex h-[520px] gap-4 sm:h-[620px] lg:h-[720px]">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex h-full flex-1 flex-col gap-4">
            {column.map((photo, photoIndex) => (
              <div
                key={photoIndex}
                style={{ flexGrow: photo.displayRatio, flexBasis: 0 }}
                className="relative min-h-0 overflow-hidden rounded-lg border border-brand-black/10"
              >
                <img src={photo.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute bottom-2 right-2 rounded bg-brand-black/50 px-1.5 py-0.5 text-xs font-bold text-white">
                  {photo.label}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
