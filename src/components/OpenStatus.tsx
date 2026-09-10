import { useEffect, useState } from 'react';
import type { Truck } from '../data/trucks';
import type { Lang } from '../i18n/translations';
import { isOpenAt } from '../lib/hours';

/**
 * "Open now" / "Closed", per vendor, computed against the clock.
 *
 * WHY THIS IS NOT PRE-RENDERED. Every other word on this site is baked into a
 * static file at build time. This one answer changes every few hours, so
 * baking it would publish a file that confidently says "Open now" for however
 * many days sit between a build and a reader. It renders nothing on the
 * server and fills in after mount.
 *
 * That does not break the rule that nothing may be JavaScript-only, because
 * nothing is lost without it: the vendor's full hours are printed on the card
 * as plain text in the pre-rendered HTML, which is what a crawler reads and
 * what a reader without JavaScript sees. The badge is a shortcut for people
 * who do not want to work out whether 12:30pm to 8:30pm includes right now. A
 * vendor who has never sent hours renders its badge statically, because that
 * fact is true at build time and worth having in the HTML.
 *
 * SALEM TIME, ALWAYS. Not the visitor's. A relative checking the park from
 * another state must not be told it is closed because it is late where they
 * are. `America/Los_Angeles` also carries daylight saving for us, which is why
 * this reads the zone rather than applying a fixed offset.
 *
 * THE BADGE IS ONLY AS GOOD AS `hoursByDay`. It cannot know about a holiday, a
 * sick day, or a truck that sold out at 6pm. A wrong "Open now" sends someone
 * to a closed window, which is worse than no badge at all, so those hours need
 * confirming with the park whenever the roster moves.
 */

const COPY = {
  en: { open: 'Open now', shut: 'Closed', pending: 'Hours pending' },
  es: { open: 'Abierto ahora', shut: 'Cerrado', pending: 'Horario pendiente' },
} satisfies Record<Lang, { open: string; shut: string; pending: string }>;

const BASE =
  'inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap backdrop-blur-sm';

/** Minutes since midnight in Salem, plus the weekday there. */
function salemNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour12: false,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  const days: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  return {
    day: days[get('weekday')] ?? 0,
    // Intl gives "24" rather than "00" for midnight in some environments.
    minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')),
  };
}

export function OpenStatus({ truck, lang }: { truck: Truck; lang: Lang }) {
  const t = COPY[lang];
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    if (!truck.hoursByDay) return;
    const tick = () => {
      const { day, minutes } = salemNow();
      setIsOpen(isOpenAt(truck.hoursByDay, day, minutes));
    };
    tick();
    // A reader can sit on this page across an opening or closing time. Once a
    // minute is cheap and stops the badge going stale under them.
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [truck]);

  // Never sent us hours. True at build time, so it ships in the HTML.
  if (!truck.hoursByDay) {
    return (
      <span
        className={`${BASE} border border-dashed border-brand-black/25 bg-white/80 text-brand-black/50`}
      >
        {t.pending}
      </span>
    );
  }

  // Server render and first client render. The hours themselves are already
  // on the card, so nothing is missing in the meantime.
  if (isOpen === null) return null;

  /* Open is a filled brand chip and closed recedes, rather than green and red.
     Two new colours would be a third and fourth brand colour, and this reads
     better anyway: the kitchens you can actually walk up to are the ones that
     pop. */
  return isOpen ? (
    <span className={`${BASE} bg-brand-yellow text-brand-black`}>{t.open}</span>
  ) : (
    <span className={`${BASE} border border-brand-black/15 bg-white/85 text-brand-black/55`}>
      {t.shut}
    </span>
  );
}
