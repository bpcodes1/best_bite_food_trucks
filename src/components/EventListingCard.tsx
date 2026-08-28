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
 * top at its own aspect ratio (4:5, matching the park's flyer artwork so
 * posters show in full rather than getting cropped), title, hours, and
 * short description below, a "view all events" CTA at the bottom. A white
 * matting border (the outer padded frame) sits around the whole card, so
 * the photo/content block reads as inset and smaller than the card's own
 * outer edge. Card height isn't fixed — it's driven by the image's aspect
 * ratio plus the (line-clamped) text below, so a row of cards still lines
 * up evenly without hardcoding a total height.
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
    <div className="mx-auto w-full max-w-[300px] rounded-2xl bg-white p-3 shadow-lg">
      <div className="flex flex-col overflow-hidden rounded-xl">
        <div className="aspect-[4/5] w-full shrink-0">
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-2 bg-white p-5">
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
            className="mt-2 block w-full rounded-md bg-brand-yellow px-4 py-2.5 text-center font-heading text-xs font-bold text-brand-black transition-colors hover:bg-brand-yellow-dark"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
