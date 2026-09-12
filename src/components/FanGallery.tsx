import { useState } from 'react';

interface FanGalleryProps {
  images: string[];
  altTexts?: string[];
  /**
   * Arrow labels. Passed in rather than held here, like altTexts, so this
   * component speaks no language of its own.
   */
  previousLabel: string;
  nextLabel: string;
}

// Fan offset -> horizontal translate (fixed px, mobile value first, sm:
// override for larger screens) and scale. Offsets are sized against the
// card's own width at each breakpoint so edges overlap instead of gapping.
// Center card is largest, all cards stay upright (no tilt).
const OFFSET_STYLES: Record<number, string> = {
  '-2': 'translate-x-[-180px] sm:translate-x-[-400px] scale-65 z-10 opacity-90',
  '-1': 'translate-x-[-100px] sm:translate-x-[-220px] scale-85 z-20',
  '0': 'translate-x-0 scale-100 z-30',
  '1': 'translate-x-[100px] sm:translate-x-[220px] scale-85 z-20',
  '2': 'translate-x-[180px] sm:translate-x-[400px] scale-65 z-10 opacity-90',
};

const HIDDEN_STYLE = 'translate-x-0 scale-50 opacity-0 z-0 pointer-events-none';

// Shortest signed distance from `index` to `current` around a circular array,
// e.g. for a 5-item array, index 4 is delta -1 from current 0 (wraps around).
function signedDelta(index: number, current: number, length: number): number {
  let delta = index - current;
  const half = length / 2;
  if (delta > half) delta -= length;
  if (delta < -half) delta += length;
  return delta;
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
  );
}

/**
 * Flush image stack: the active image sits centered and largest, its
 * neighbors sit upright at reduced scale, spread outward, cycled with the
 * arrow buttons. Every image stays mounted (keyed by its own index) so the
 * transform swap animates as a slide instead of a hard cut.
 */
export function FanGallery({ images, altTexts, previousLabel, nextLabel }: FanGalleryProps) {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const goTo = (next: number) => setCurrent(((next % length) + length) % length);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-72 w-full sm:h-[440px]">
        {images.map((src, index) => {
          const delta = signedDelta(index, current, length);
          const offsetStyle = Math.abs(delta) <= 2 ? OFFSET_STYLES[delta] : HIDDEN_STYLE;

          // Hidden cards are still in the viewport, just scaled to nothing at
          // zero opacity, so loading="lazy" would not defer them. Dropping
          // their fetch priority does: the five on screen download first and
          // the rest trickle in behind. Their `src` stays in the markup either
          // way, which is what a crawler reads.
          const onScreen = Math.abs(delta) <= 2;

          return (
            <img
              key={index}
              src={src}
              alt={altTexts?.[index] ?? `Gallery image ${index + 1}`}
              decoding="async"
              fetchPriority={delta === 0 ? 'high' : onScreen ? 'auto' : 'low'}
              className={`absolute left-1/2 top-1/2 -ml-20 h-56 w-40 -translate-y-1/2 rounded-2xl object-cover shadow-lg transition-all duration-500 ease-out motion-reduce:transition-none sm:-ml-36 sm:h-96 sm:w-72 ${offsetStyle}`}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          aria-label={previousLabel}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-black/20 bg-white text-brand-black transition-colors hover:bg-brand-black hover:text-white"
        >
          <ChevronIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          aria-label={nextLabel}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-black/20 bg-white text-brand-black transition-colors hover:bg-brand-black hover:text-white"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    </div>
  );
}
