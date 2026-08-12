import { Link } from 'react-router-dom';
import { ROUTES } from '../lib/routes';

interface EventListingCardProps {
  imageUrl: string;
  name: string;
  time: string;
  description: string;
  ctaLabel: string;
}

/**
 * Tall, skinny, photo-forward event card for the homepage teaser: image on
 * top (half the card's height), title, hours, and short description below,
 * a "view all events" CTA pinned to the bottom. A white matting border (the
 * outer padded frame) sits around the whole card, so the photo/content
 * block reads as inset and smaller than the card's own outer edge.
 */
export function EventListingCard({
  imageUrl,
  name,
  time,
  description,
  ctaLabel,
}: EventListingCardProps) {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-2xl bg-white p-3 shadow-lg">
      <div className="flex h-[440px] flex-col overflow-hidden rounded-xl">
        <div className="h-1/2 w-full shrink-0">
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden bg-white p-5">
          <div>
            <h3 className="line-clamp-2 font-heading text-base font-bold text-brand-black">
              {name}
            </h3>
            <p className="mt-0.5 text-xs font-bold text-brand-yellow-dark">{time}</p>
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
