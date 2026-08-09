import { useLanguage } from '../i18n/useLanguage';
import { events } from '../data/events';
import { getWeekdayName, toLocalIsoDate } from '../lib/parkStatus';

const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first

function getMonthWeeks(year: number, month: number): (Date | null)[][] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Mon = 0 ... Sun = 6

  const days: (Date | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  while (days.length % 7 !== 0) days.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function EventCalendar() {
  const { lang } = useLanguage();
  const today = new Date();
  const todayIso = toLocalIsoDate(today);
  const eventDates = new Set(events.map((event) => event.date));
  const weeks = getMonthWeeks(today.getFullYear(), today.getMonth());
  const monthLabel = new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', {
    month: 'long',
    year: 'numeric',
  }).format(today);
  const weekdayLabels = WEEK_ORDER.map((dayIndex) => getWeekdayName(dayIndex, lang, 'short'));

  return (
    <div>
      <h3 className="text-center font-heading text-lg font-bold text-brand-black capitalize">
        {monthLabel}
      </h3>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
        {weekdayLabels.map((label) => (
          <div key={label} className="pb-1 font-bold text-brand-black/50">
            {label}
          </div>
        ))}

        {weeks.map((week) =>
          week.map((date, dayIndex) => {
            if (!date) return <div key={dayIndex} />;

            const iso = toLocalIsoDate(date);
            const hasEvent = eventDates.has(iso);
            const isToday = iso === todayIso;

            return (
              <div
                key={iso}
                className={[
                  'flex aspect-square items-center justify-center rounded-md',
                  isToday ? 'border-2 border-brand-black' : '',
                  hasEvent ? 'bg-brand-yellow font-bold text-brand-black' : 'text-brand-black/70',
                ].join(' ')}
              >
                {date.getDate()}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
