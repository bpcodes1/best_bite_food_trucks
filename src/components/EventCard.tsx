import { useLanguage } from '../i18n/useLanguage';
import type { EventItem } from '../data/events';

interface EventCardProps {
  event: EventItem;
  highlighted?: boolean;
}

export function EventCard({ event, highlighted }: EventCardProps) {
  const { lang } = useLanguage();

  return (
    <li
      id={`event-${event.id}`}
      className={[
        'scroll-mt-24 aspect-[3/4] w-full overflow-hidden rounded-lg border bg-brand-yellow/15 transition-shadow',
        highlighted
          ? 'border-brand-yellow-dark ring-2 ring-brand-yellow-dark'
          : 'border-brand-black/10',
      ].join(' ')}
    >
      {event.fullImage ? (
        <img
          src={event.fullImage}
          alt={event.name[lang]}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-2xl"
          role="img"
          aria-label={event.name[lang]}
        >
          📅
        </div>
      )}
    </li>
  );
}
