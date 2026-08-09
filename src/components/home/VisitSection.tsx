import { useLanguage } from '../../i18n/useLanguage';
import { parkInfo } from '../../data/parkInfo';
import { getGroupedWeeklyHours } from '../../lib/parkStatus';

const fullAddress = `${parkInfo.address.line1}, ${parkInfo.address.line2}`;
const mapQuery = encodeURIComponent(fullAddress);
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const MAP_DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

export function VisitSection() {
  const { lang, t } = useLanguage();
  const groupedHours = getGroupedWeeklyHours(lang);

  return (
    <section aria-labelledby="visit-heading" className="mx-auto max-w-6xl px-4 py-16">
      <h2 id="visit-heading" className="text-3xl font-bold text-brand-black sm:text-4xl">
        {t.visitSection.heading}
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <iframe
          title={t.visitSection.mapTitle}
          src={MAP_EMBED_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full rounded-lg border border-brand-black/10 sm:h-96 lg:h-full"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <h3 className="flex items-center gap-1.5 font-heading text-sm font-bold uppercase tracking-wide text-brand-black">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t.visitSection.addressHeading}
            </h3>
            <address className="mt-2 not-italic text-brand-black/70">
              {parkInfo.address.line1}
              <br />
              {parkInfo.address.line2}
            </address>
            <a
              href={MAP_DIRECTIONS_HREF}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block font-bold text-brand-black hover:underline"
            >
              {t.visitSection.directionsCta} →
            </a>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand-black">
              {t.visitSection.hoursHeading}
            </h3>
            <ul className="mt-2 max-w-xs space-y-1 text-brand-black/70">
              {groupedHours.map((group) => (
                <li key={group.label} className="flex justify-between gap-4">
                  <span>{group.label}</span>
                  <span>{group.hours ?? t.visitSection.closed}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
