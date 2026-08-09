import { useLanguage } from '../i18n/useLanguage';
import { formatEventWeekday } from '../lib/parkStatus';
import type { EventItem } from '../data/events';

interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  const { lang } = useLanguage();
  const weekday = formatEventWeekday(event.date, lang);

  return (
    <li className="rounded-lg border border-brand-black/10 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-yellow-dark">{weekday}</p>
      <h3 className="mt-1 font-heading text-lg font-bold text-brand-black">{event.name[lang]}</h3>
      <p className="mt-1 text-sm text-brand-black/60">{event.time[lang]}</p>
      <p className="mt-2 text-sm text-brand-black/70">{event.description[lang]}</p>
    </li>
  );
}
