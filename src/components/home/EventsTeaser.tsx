import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { ROUTES } from '../../lib/routes';
import { getUpcomingEvents } from '../../lib/parkStatus';
import { EventListingCard } from '../EventListingCard';

const FEATURED_COUNT = 3;

// Stand-in artwork until real event photos are added — a labeled color
// swatch per event, not a fabricated photo.
const PLACEHOLDER_COLORS = ['#f9bc15', '#c94f3c', '#2f6b57'];

function placeholderImage(label: string, background: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400">
    <rect width="100%" height="100%" fill="${background}" />
    <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function EventsTeaser() {
  const { lang, t } = useLanguage();
  // Pull every upcoming event, then prioritize the ones with a real photo —
  // otherwise events with a fixed, further-out date would crowd out ones
  // whose real date/time is still TBD but already have real artwork.
  const allUpcoming = getUpcomingEvents(Number.MAX_SAFE_INTEGER);
  const upcomingEvents = [
    ...allUpcoming.filter((event) => event.image),
    ...allUpcoming.filter((event) => !event.image),
  ].slice(0, FEATURED_COUNT);

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

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {upcomingEvents.map((event, index) => (
            <li key={event.id}>
              <EventListingCard
                imageUrl={
                  event.image ?? placeholderImage(event.name[lang], PLACEHOLDER_COLORS[index])
                }
                name={event.name[lang]}
                time={event.time[lang]}
                description={event.description[lang]}
                ctaLabel={t.eventsTeaser.viewAll}
                dateTbdLabel={event.dateUnconfirmed ? t.eventsPage.dateTbd : undefined}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
