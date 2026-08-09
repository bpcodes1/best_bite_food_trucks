import { useLanguage } from '../../i18n/useLanguage';
import { parkInfo } from '../../data/parkInfo';

export function AvailabilitySection() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="availability-heading" className="bg-brand-black">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-10 sm:text-left">
        <div className="shrink-0">
          <p className="font-heading text-6xl font-bold text-brand-yellow">
            {parkInfo.availableSlots}
          </p>
          <p className="text-sm font-bold uppercase tracking-wide text-white/70">
            {t.joinPage.availabilitySlotsLabel}
          </p>
        </div>

        <div className="max-w-xl">
          <h2
            id="availability-heading"
            className="font-heading text-2xl font-bold text-white sm:text-3xl"
          >
            {t.joinPage.availabilityHeading}
          </h2>
          <p className="mt-2 text-white/80">{t.joinPage.availabilityBody}</p>
        </div>
      </div>
    </section>
  );
}
