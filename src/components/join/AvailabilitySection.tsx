import { useLanguage } from '../../i18n/useLanguage';
import { parkInfo } from '../../data/parkInfo';

export function AvailabilitySection() {
  const { t } = useLanguage();

  const availabilitySummary = `${parkInfo.availableSlots} ${t.joinPage.availabilityOf} ${parkInfo.totalSlots} ${t.joinPage.availabilityUnitLabel}`;
  const availabilityAnnouncement = `${availabilitySummary}. ${t.joinPage.availabilityBody} ${t.joinPage.availabilityCta}`;

  const tickerItem = (
    <span className="flex shrink-0 items-center gap-3 px-6 py-3">
      <span className="rounded-full bg-brand-yellow px-3 py-1 font-heading text-xl font-bold text-brand-black">
        {parkInfo.availableSlots}/{parkInfo.totalSlots}
      </span>
      <span className="text-xs font-bold uppercase tracking-wide text-white/70">
        {availabilitySummary}
      </span>
      <span className="text-white/30" aria-hidden="true">
        ·
      </span>
      <span className="text-sm text-white/80">{t.joinPage.availabilityBody}</span>
      <a
        href="#move-in-special"
        tabIndex={-1}
        className="text-sm font-bold text-brand-yellow hover:underline"
      >
        {t.joinPage.availabilityCta}
      </a>
    </span>
  );

  return (
    <section
      aria-label={availabilityAnnouncement}
      className="marquee-pausable overflow-hidden bg-brand-black"
    >
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {tickerItem}
        {tickerItem}
      </div>
    </section>
  );
}
