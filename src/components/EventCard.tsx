import { useLanguage } from '../i18n/useLanguage';
import type { EventItem } from '../data/events';

interface EventCardProps {
  event: EventItem;
  highlighted?: boolean;
}

export function EventCard({ event, highlighted }: EventCardProps) {
  const { lang, t } = useLanguage();

  return (
    <li
      id={`event-${event.id}`}
      className={[
        'relative scroll-mt-24 aspect-[4/5] w-full overflow-hidden rounded-lg border bg-brand-yellow/15 transition-shadow',
        highlighted
          ? 'border-brand-yellow-dark ring-2 ring-brand-yellow-dark'
          : 'border-brand-black/10',
      ].join(' ')}
    >
      {event.fullImage ? (
        <img
          src={lang === 'es' && event.fullImageEs ? event.fullImageEs : event.fullImage}
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

      {event.dateUnconfirmed && (
        <span className="absolute left-2 top-2 rounded bg-brand-black/80 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">
          {t.eventsPage.dateTbd}
        </span>
      )}
    </li>
  );
}
