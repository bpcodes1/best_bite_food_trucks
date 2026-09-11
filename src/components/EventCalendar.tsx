import { useLanguage } from '../i18n/useLanguage';
import { events } from '../data/events';
import { getWeekdayName, toLocalIsoDate } from '../lib/parkStatus';

const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

function getMonthWeeks(year: number, month: number): (CalendarDay | null)[][] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Mon = 0 ... Sun = 6
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const leadingDays: CalendarDay[] = Array.from({ length: firstWeekday }, (_, i) => ({
    date: new Date(year, month - 1, daysInPrevMonth - firstWeekday + i + 1),
    isCurrentMonth: false,
  }));

  const currentMonthDays: CalendarDay[] = Array.from({ length: daysInMonth }, (_, i) => ({
    date: new Date(year, month, i + 1),
    isCurrentMonth: true,
  }));

  const days: (CalendarDay | null)[] = [...leadingDays, ...currentMonthDays];
  while (days.length % 7 !== 0) days.push(null);

  const weeks: (CalendarDay | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

interface EventCalendarProps {
  viewYear: number;
  viewMonth: number;
  onViewChange: (year: number, month: number) => void;
  /** Called with the event ids on a clicked, upcoming event date. */
  onSelectEvents?: (eventIds: string[]) => void;
}

export function EventCalendar({
  viewYear,
  viewMonth,
  onViewChange,
  onSelectEvents,
}: EventCalendarProps) {
  const { lang, t } = useLanguage();
  const today = new Date();
  const todayIso = toLocalIsoDate(today);

  const eventIdsByDate = new Map<string, string[]>();
  for (const event of events) {
    const ids = eventIdsByDate.get(event.date) ?? [];
    ids.push(event.id);
    eventIdsByDate.set(event.date, ids);
  }

  const weeks = getMonthWeeks(viewYear, viewMonth);
  const monthName = new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(viewYear, viewMonth, 1));
  // Only the first letter is raised. CSS `capitalize` raised every word and
  // printed "Septiembre De 2026"; Spanish capitalizes the first word only.
  const monthLabel = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const weekdayLabels = WEEK_ORDER.map((dayIndex) => getWeekdayName(dayIndex, lang, 'short'));
  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  function goToPreviousMonth() {
    const prev = new Date(viewYear, viewMonth - 1, 1);
    onViewChange(prev.getFullYear(), prev.getMonth());
  }

  function goToNextMonth() {
    const next = new Date(viewYear, viewMonth + 1, 1);
    onViewChange(next.getFullYear(), next.getMonth());
  }

  function goToToday() {
    onViewChange(today.getFullYear(), today.getMonth());
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={goToPreviousMonth}
          aria-label={t.eventsPage.previousMonth}
          className="flex h-7 w-7 items-center justify-center rounded-md text-brand-black/60 hover:bg-brand-yellow/20 hover:text-brand-black"
        >
          ‹
        </button>

        <div className="flex flex-col items-center">
          <h3 className="font-heading text-lg font-bold text-brand-black">
            {monthLabel}
          </h3>
          {!isCurrentMonth && (
            <button
              type="button"
              onClick={goToToday}
              className="text-xs font-bold text-brand-yellow-dark hover:underline"
            >
              {t.eventsPage.jumpToToday}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={goToNextMonth}
          aria-label={t.eventsPage.nextMonth}
          className="flex h-7 w-7 items-center justify-center rounded-md text-brand-black/60 hover:bg-brand-yellow/20 hover:text-brand-black"
        >
          ›
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2 text-center text-sm">
        {weekdayLabels.map((label) => (
          <div key={label} className="pb-1 font-bold text-brand-black/50">
            {label}
          </div>
        ))}

        {weeks.map((week) =>
          week.map((day, dayIndex) => {
            if (!day) return <div key={dayIndex} />;

            const { date, isCurrentMonth } = day;
            const iso = toLocalIsoDate(date);

            if (!isCurrentMonth) {
              return (
                <div
                  key={iso}
                  className="flex aspect-square items-center justify-center rounded-md text-brand-black/30"
                >
                  {date.getDate()}
                </div>
              );
            }

            const eventIds = eventIdsByDate.get(iso) ?? [];
            const hasEvent = eventIds.length > 0;
            const isToday = iso === todayIso;
            const isUpcoming = iso >= todayIso;

            const cellClassName = [
              'flex aspect-square items-center justify-center rounded-md',
              isToday ? 'border-2 border-brand-black' : '',
              hasEvent ? '' : 'text-brand-black/70',
            ].join(' ');

            const numberClassName = [
              'flex h-7 w-7 items-center justify-center rounded-full',
              hasEvent ? 'bg-brand-yellow font-bold text-brand-black' : '',
            ].join(' ');

            if (hasEvent && isUpcoming) {
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => onSelectEvents?.(eventIds)}
                  className={`${cellClassName} cursor-pointer`}
                >
                  <span
                    className={`${numberClassName} transition-colors hover:bg-brand-yellow-dark`}
                  >
                    {date.getDate()}
                  </span>
                </button>
              );
            }

            return (
              <div key={iso} className={cellClassName}>
                <span className={numberClassName}>{date.getDate()}</span>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
