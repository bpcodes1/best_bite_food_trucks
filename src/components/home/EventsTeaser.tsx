import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { ROUTES } from '../../lib/routes';
import { getUpcomingEvents } from '../../lib/parkStatus';
import { EventCard } from '../EventCard';

const FEATURED_COUNT = 3;

export function EventsTeaser() {
  const { t } = useLanguage();
  const upcomingEvents = getUpcomingEvents(FEATURED_COUNT);

  if (upcomingEvents.length === 0) return null;

  return (
    <section aria-labelledby="events-teaser-heading" className="bg-brand-black">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="events-teaser-heading" className="text-3xl font-bold text-white sm:text-4xl">
              {t.eventsTeaser.heading}
            </h2>
            <p className="mt-2 max-w-xl text-white/70">{t.eventsTeaser.subheading}</p>
          </div>
          <Link
            to={ROUTES.events}
            className="whitespace-nowrap font-bold text-brand-yellow hover:underline"
          >
            {t.eventsTeaser.viewAll}
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </section>
  );
}
