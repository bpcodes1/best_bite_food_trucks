import { useLanguage } from '../i18n/useLanguage';
import { formatEventWeekday, getUpcomingEvents, isParkOpenNow } from '../lib/parkStatus';

export function StatusBar() {
  const { lang, t } = useLanguage();
  const isOpen = isParkOpenNow();
  const [nextEvent] = getUpcomingEvents(1);

  return (
    <div className="border-b border-brand-black/10 bg-brand-yellow text-brand-black">
      <div
        className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between"
        aria-label="Park status"
      >
        <p className="flex items-center gap-2 font-bold">
          <span
            className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-green-600' : 'bg-red-600'}`}
            aria-hidden="true"
          />
          {isOpen ? t.statusBar.open : t.statusBar.closed}
        </p>
        <p className="text-brand-black/80">
          {nextEvent ? (
            <>
              <span className="font-bold">{t.statusBar.nextEvent}:</span> {nextEvent.name[lang]} —{' '}
              {formatEventWeekday(nextEvent.date, lang)}
            </>
          ) : (
            t.statusBar.noUpcomingEvents
          )}
        </p>
      </div>
    </div>
  );
}
