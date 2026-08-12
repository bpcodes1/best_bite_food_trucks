import { useId, useState } from 'react'
import type { KeyboardEvent } from 'react'

/**
 * The fanned image stack: the active photograph sits centred and largest, its
 * neighbours sit upright at reducing scale spread outward, and the arrows
 * cycle through. Adapted from the version on Bryan's branch
 * (`src/components/FanGallery.tsx`, origin/bryan) at Enrique's request,
 * 2026-08-12, rebuilt against our tokens and our bilingual pattern.
 *
 * Two deliberate differences from the Sunbeam reference this pattern answers:
 *
 * 1. **It does not autoplay.** Content that advances on its own needs a pause
 *    control to meet WCAG 2.2.2, and it makes a page hard to read for anyone
 *    who scans slowly. The reader drives this one, so the requirement never
 *    arises.
 * 2. **The caption is live.** Cycling changes the name under the stack, which
 *    is the "the item name switches too" move Enrique liked — and the region
 *    is `aria-live`, so a screen-reader user hears the change a sighted user
 *    sees.
 *
 * No animation library. Transform and opacity only, both GPU-composited,
 * with a `motion-reduce` escape. See design.md § Motion.
 */

export interface FanItem {
  src: string
  /** Already resolved to the page's language by the caller. */
  label: string
  /**
   * The wash this photograph brings with it. The section behind the gallery
   * cross-fades to it as the card becomes active, so the ground answers the
   * food. Enrique's idea, 2026-08-12: he asked for the vendor's colour, and
   * that is where this goes the day we can attribute a photo to a vendor —
   * only two of six are attributable today, and guessing the rest would be
   * inventing a client fact.
   */
  wash: string
}

/**
 * Position styles by distance from the active card. Written as whole class
 * strings, never assembled from fragments, because Tailwind scans source text
 * and cannot see a class that only exists once the string is concatenated.
 */
const BY_DELTA: Record<string, string> = {
  '-2': '-translate-x-[9.5rem] scale-[0.62] opacity-70 z-10 sm:-translate-x-[19rem]',
  '-1': '-translate-x-[5rem] scale-[0.82] opacity-90 z-20 sm:-translate-x-[10rem]',
  '0': 'translate-x-0 scale-100 z-30',
  '1': 'translate-x-[5rem] scale-[0.82] opacity-90 z-20 sm:translate-x-[10rem]',
  '2': 'translate-x-[9.5rem] scale-[0.62] opacity-70 z-10 sm:translate-x-[19rem]',
}

const HIDDEN = 'translate-x-0 scale-50 opacity-0 z-0 pointer-events-none'

/**
 * Shortest signed distance from `index` to `active` around a ring, so the
 * first and last cards are neighbours rather than opposite ends of a line.
 */
function signedDelta(index: number, active: number, length: number): number {
  let delta = index - active
  const half = length / 2
  if (delta > half) delta -= length
  if (delta < -half) delta += length
  return delta
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
  )
}

interface FanGalleryProps {
  items: FanItem[]
  /** Accessible names for the controls, in the page's language. */
  labels: { previous: string; next: string; region: string }
  /** Notified with the active item's wash so the section can tint to match. */
  onWashChange?: (wash: string) => void
}

export function FanGallery({ items, labels, onWashChange }: FanGalleryProps) {
  const [active, setActive] = useState(0)
  const captionId = useId()
  const length = items.length

  function goTo(next: number) {
    const index = ((next % length) + length) % length
    setActive(index)
    onWashChange?.(items[index].wash)
  }

  // Arrow keys work whenever focus is anywhere inside the gallery, which is
  // what a reader who has just tabbed to the Next button will try first.
  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(active - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(active + 1)
    }
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={labels.region}
      aria-describedby={captionId}
      onKeyDown={handleKey}
      className="flex flex-col items-center"
    >
      <div className="relative h-64 w-full sm:h-[26rem]">
        {items.map((item, index) => {
          const delta = signedDelta(index, active, length)
          const near = Math.abs(delta) <= 2
          const placement = near ? BY_DELTA[String(delta)] : HIDDEN

          return (
            <img
              key={item.src}
              src={item.src}
              alt={item.label}
              loading="lazy"
              decoding="async"
              aria-hidden={near ? undefined : true}
              /* A white polaroid edge, not the paper token: the ground behind
                 this gallery changes colour with the active dish, and a cream
                 border disappears against the warmer washes. The shadow is a
                 hairline separation between overlapping cards, not decoration
                 — design.md bans hierarchy built out of stacked shadows.

                 `translate,scale`, NOT `transform`. Tailwind v4 compiles
                 `-translate-x-*` and `scale-*` to the individual `translate`
                 and `scale` CSS properties, not to the `transform` shorthand.
                 A `transition-[transform,opacity]` therefore animates a
                 property that never changes, and the cards jump between
                 positions while only the fade runs. That was the bug.
                 `transition-all` also works and is what Bryan's version used,
                 but design.md bans it. */
              className={`absolute top-1/2 left-1/2 -ml-[5.5rem] h-52 w-44 -translate-y-1/2 rounded-sm border-[6px] border-white object-cover shadow-[0_2px_10px_rgba(28,26,23,0.12)] transition-[translate,scale,opacity] duration-500 ease-out motion-reduce:transition-none sm:-ml-[8.5rem] sm:h-[24rem] sm:w-[17rem] ${placement}`}
            />
          )
        })}
      </div>

      <p
        id={captionId}
        aria-live="polite"
        className="mt-7 text-center font-display text-2xl text-ink uppercase sm:text-3xl"
      >
        {items[active].label}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label={labels.previous}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-150 ease-out hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <Chevron direction="left" />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label={labels.next}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-150 ease-out hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <Chevron direction="right" />
        </button>
      </div>
    </div>
  )
}
