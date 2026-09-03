import { Link } from 'react-router-dom';
import { ROUTES } from '../lib/routes';

interface EventListingCardProps {
  imageUrl: string;
  name: string;
  time: string;
  description: string;
  ctaLabel: string;
  /** Shows a "Date TBD" badge next to the time when the event's date is still a placeholder. */
  dateTbdLabel?: string;
}

/**
 * Tall, skinny, photo-forward event card for the homepage teaser: image on
 * top in a fixed 4:5 box (center-cropped via `object-cover` so every card's
 * image is exactly the same height regardless of the source poster's
 * dimensions, which keeps the text below starting at the same point across
 * a row), title, hours, and short description below, a "view all events"
 * CTA at the bottom. The `<img>` is positioned `absolute` inside the
 * `relative` aspect box so its intrinsic size can't stretch the box. A white
 * matting border (the outer padded frame) sits around the whole card, so
 * the photo/content block reads as inset and smaller than the card's own
 * outer edge. The card stretches to fill its grid cell (`h-full`) and the
 * text block flexes (`flex-1`) with the CTA pinned to the bottom
 * (`mt-auto`), so every card in a row is the same height even when titles
 * or times run to different line counts.
 */
export function EventListingCard({
  imageUrl,
  name,
  time,
  description,
  ctaLabel,
  dateTbdLabel,
}: EventListingCardProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-[300px] flex-col rounded-2xl bg-white p-3 shadow-lg">
      <div className="flex h-full flex-col overflow-hidden rounded-xl">
        <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 bg-white p-5">
          <div>
            <h3 className="line-clamp-2 font-heading text-base font-bold text-brand-black">
              {name}
            </h3>
            <p className="mt-0.5 text-xs font-bold text-brand-yellow-dark">
              {time}
              {dateTbdLabel && (
                <span className="ml-1.5 rounded bg-brand-black/80 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white">
                  {dateTbdLabel}
                </span>
              )}
            </p>
          </div>
          <p className="line-clamp-4 text-xs text-brand-black/70">{description}</p>

          <Link
            to={ROUTES.events}
            className="mt-auto block w-full rounded-md bg-brand-yellow px-4 py-2.5 text-center font-heading text-xs font-bold text-brand-black transition-colors hover:bg-brand-yellow-dark"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
