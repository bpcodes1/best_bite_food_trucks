import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';
import { events } from '../data/events';
import { EventCard } from '../components/EventCard';
import { EventCalendar } from '../components/EventCalendar';
import { ScheduledEvents } from '../components/ScheduledEvents';
import { PastEventsGallery } from '../components/PastEventsGallery';
import { RecentEventGallery } from '../components/RecentEventGallery';
import { PageHero } from '../components/PageHero';
import holdEventImage from '../assets/best_bite_sign2.webp';

const today = new Date();
const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));

export function Events() {
  const { t, path } = useLanguage();
  const [highlightedEventIds, setHighlightedEventIds] = useState<string[]>([]);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  function handleSelectEvents(eventIds: string[]) {
    setHighlightedEventIds(eventIds);
    const target = document.getElementById(`event-${eventIds[0]}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function handleViewChange(year: number, month: number) {
    setViewYear(year);
    setViewMonth(month);
  }

  return (
    <>
      <PageHero heading={t.eventsPage.heading} intro={t.eventsPage.intro} />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {sortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              highlighted={highlightedEventIds.includes(event.id)}
            />
          ))}
        </ul>

        <div className="mt-10 grid grid-cols-1 gap-8 rounded-lg border border-brand-black/10 p-4 sm:grid-cols-[3fr_2fr]">
          <EventCalendar
            viewYear={viewYear}
            viewMonth={viewMonth}
            onViewChange={handleViewChange}
            onSelectEvents={handleSelectEvents}
          />
          <div className="h-full sm:border-l sm:border-brand-black/10 sm:pl-8">
            <ScheduledEvents
              viewYear={viewYear}
              viewMonth={viewMonth}
              onSelectEvent={(eventId) => handleSelectEvents([eventId])}
            />
          </div>
        </div>

        <RecentEventGallery />

        <PastEventsGallery />

        <div className="mt-10 grid grid-cols-1 items-center gap-8 rounded-lg bg-brand-yellow/15 p-6 sm:grid-cols-2 sm:p-10">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
            <img
              src={holdEventImage}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-brand-black sm:text-3xl">
              {t.eventsPage.holdEventHeading}
            </h2>
            <p className="mt-3 text-brand-black/70">{t.eventsPage.holdEventBody}</p>
            <Link
              to={path('contact')}
              className="mt-6 inline-block rounded-md bg-brand-black px-6 py-3 font-heading font-bold text-brand-yellow transition-colors hover:bg-brand-black/80"
            >
              {t.eventsPage.holdEventCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
