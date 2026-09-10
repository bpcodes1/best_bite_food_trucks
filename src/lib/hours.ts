/**
 * Trading-hours arithmetic, kept apart from the badge that renders it so it
 * can be tested against a fixed clock. `OpenStatus` reads the real time, which
 * is untestable without mocking; this is the part that decides the answer, and
 * it is the part that shipped wrong.
 */

/** `[opens, closes]`, minutes from midnight. */
export type TradingWindow = [number, number];

/**
 * Is this vendor trading at `minutes` past midnight on weekday `day`
 * (0 = Sunday)?
 *
 * Open means inside ANY of that day's windows, so a vendor working a split
 * shift reads as closed in the gap between services. `closes` is exclusive:
 * a kitchen shutting at 2pm is shut at 2pm.
 *
 * No hours at all means closed rather than open. A wrong "Open now" sends
 * someone across town to a dark window, which is worse than no badge.
 */
export function isOpenAt(
  hoursByDay: Record<number, TradingWindow[]> | undefined,
  day: number,
  minutes: number,
): boolean {
  const windows = hoursByDay?.[day] ?? [];
  return windows.some(([opens, closes]) => minutes >= opens && minutes < closes);
}
