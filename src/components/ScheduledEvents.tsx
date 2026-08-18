import { useLanguage } from '../i18n/useLanguage';
import { events } from '../data/events';
import { formatEventWeekday } from '../lib/parkStatus';

interface ScheduledEventsProps {
  viewYear: number;
  viewMonth: number;
  onSelectEvent?: (eventId: string) => void;
}

export function ScheduledEvents({ viewYear, viewMonth, onSelectEvent }: ScheduledEventsProps) {
  const { lang, t } = useLanguage();

  const monthEvents = events
    .filter((event) => {
      const date = new Date(`${event.date}T00:00:00`);
      return date.getFullYear() === viewYear && date.getMonth() === viewMonth;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="flex h-full flex-col">
      <h3 className="font-heading text-lg font-bold text-brand-black">
        {t.eventsPage.scheduledHeading}
      </h3>

      {monthEvents.length > 0 ? (
        <ul className="mt-3 flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {monthEvents.map((event) => (
            <li key={event.id}>
              <button
                type="button"
                onClick={() => onSelectEvent?.(event.id)}
                className="w-full rounded-md border border-brand-black/10 p-3 text-left transition-colors hover:border-brand-yellow-dark hover:bg-brand-yellow/10"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-brand-yellow-dark">
                  {formatEventWeekday(event.date, lang)}
                </p>
                <p className="mt-0.5 font-bold text-brand-black">{event.name[lang]}</p>
                <p className="text-sm text-brand-black/60">{event.time[lang]}</p>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-brand-black/60">{t.eventsPage.noScheduledEvents}</p>
      )}
    </div>
  );
}
