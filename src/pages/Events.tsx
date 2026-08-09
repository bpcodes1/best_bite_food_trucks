import { useLanguage } from '../i18n/useLanguage';
import { events } from '../data/events';
import { getUpcomingEvents } from '../lib/parkStatus';
import { EventCard } from '../components/EventCard';
import { EventCalendar } from '../components/EventCalendar';

export function Events() {
  const { t } = useLanguage();
  const upcomingEvents = getUpcomingEvents(events.length);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-brand-black sm:text-4xl">{t.eventsPage.heading}</h1>
        <p className="mt-4 text-brand-black/70">{t.eventsPage.intro}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>

        <div className="h-fit rounded-lg border border-brand-black/10 p-4">
          <EventCalendar />
        </div>
      </div>
    </section>
  );
}
