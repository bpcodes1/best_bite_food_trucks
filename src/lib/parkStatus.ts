import { weeklyHours } from '../data/parkInfo';
import { events } from '../data/events';
import type { EventItem } from '../data/events';
import type { Lang } from '../i18n/translations';

const REFERENCE_SUNDAY = '2023-01-01T00:00:00'; // a known Sunday, used only to derive weekday names

/** Formats a 24h "HH:MM" string as a short 12h label, e.g. "21:00" -> "9pm". */
export function formatHour(hhmm: string): string {
  const [hourStr, minuteStr] = hhmm.split(':');
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  const period = hour >= 12 ? 'pm' : 'am';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return minute === 0
    ? `${hour12}${period}`
    : `${hour12}:${String(minute).padStart(2, '0')}${period}`;
}

/** Translated weekday name for a `Date#getDay()` index (0 = Sunday … 6 = Saturday). */
export function getWeekdayName(
  dayIndex: number,
  lang: Lang,
  style: 'long' | 'short' = 'long',
): string {
  const date = new Date(REFERENCE_SUNDAY);
  date.setDate(date.getDate() + dayIndex);
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', { weekday: style }).format(
    date,
  );
}

/** Formats a `Date` as a local (not UTC) "YYYY-MM-DD" string. */
export function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first

export interface HoursGroup {
  label: string;
  hours: string | null; // null = closed
}

/**
 * Weekly hours condensed into runs of consecutive days that share the same
 * schedule (e.g. "Tue–Thu" instead of three separate rows), for compact
 * display in the footer.
 */
export function getGroupedWeeklyHours(lang: Lang): HoursGroup[] {
  const runs: { days: number[]; hours: string | null }[] = [];

  for (const dayIndex of WEEK_ORDER) {
    const schedule = weeklyHours[dayIndex];
    const hours = schedule ? `${formatHour(schedule.open)}–${formatHour(schedule.close)}` : null;
    const lastRun = runs[runs.length - 1];

    if (lastRun && lastRun.hours === hours) {
      lastRun.days.push(dayIndex);
    } else {
      runs.push({ days: [dayIndex], hours });
    }
  }

  return runs.map(({ days, hours }) => ({
    label:
      days.length === 1
        ? getWeekdayName(days[0], lang, 'short')
        : `${getWeekdayName(days[0], lang, 'short')}–${getWeekdayName(days[days.length - 1], lang, 'short')}`,
    hours,
  }));
}

/** Whether the park is open right now, derived from `weeklyHours`. */
export function isParkOpenNow(now: Date = new Date()): boolean {
  const schedule = weeklyHours[now.getDay()];
  if (!schedule) return false;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const [openHour, openMinute] = schedule.open.split(':').map(Number);
  const [closeHour, closeMinute] = schedule.close.split(':').map(Number);
  const openMinutes = openHour * 60 + openMinute;
  const closeMinutes = closeHour * 60 + closeMinute;

  return nowMinutes >= openMinutes && nowMinutes < closeMinutes;
}

/** The next `count` events on or after today, soonest first. */
export function getUpcomingEvents(count: number, now: Date = new Date()): EventItem[] {
  const todayIso = toLocalIsoDate(now);
  return events
    .filter((event) => event.date >= todayIso)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, count);
}

/** Short weekday label for an event's ISO date, e.g. "Sat" / "sáb". */
export function formatEventWeekday(dateIso: string, lang: Lang): string {
  const date = new Date(`${dateIso}T00:00:00`);
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', { weekday: 'short' }).format(
    date,
  );
}

/** Short month + day label for an event's ISO date, e.g. "Aug 16" / "16 ago". */
export function formatEventDate(dateIso: string, lang: Lang): string {
  const date = new Date(`${dateIso}T00:00:00`);
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/** Past events (date before today), most recent first. */
export function getPastEvents(now: Date = new Date()): EventItem[] {
  const todayIso = toLocalIsoDate(now);
  return events
    .filter((event) => event.date < todayIso)
    .sort((a, b) => b.date.localeCompare(a.date));
}
