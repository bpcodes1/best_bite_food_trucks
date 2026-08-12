import { useLanguage } from '../../i18n/useLanguage';

function TruckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M2 8h11v8H2z" />
      <path d="M13 11h4l3 3v2h-7z" />
      <circle cx="6" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <ellipse cx="12" cy="16" rx="5" ry="4" />
      <circle cx="5" cy="9" r="2" />
      <circle cx="10" cy="5.5" r="2" />
      <circle cx="14" cy="5.5" r="2" />
      <circle cx="19" cy="9" r="2" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  );
}

function ParkingIcon() {
  return (
    <div
      className="flex h-5 w-5 items-center justify-center rounded border-2 border-current text-xs font-bold leading-none"
      aria-hidden="true"
    >
      P
    </div>
  );
}

export function TrustBar() {
  const { t } = useLanguage();

  const badges = [
    { key: 'trucks', icon: TruckIcon, label: t.trustBar.trucks },
    { key: 'friendly', icon: PawIcon, label: t.trustBar.friendly },
    { key: 'music', icon: MusicIcon, label: t.trustBar.music },
    { key: 'parking', icon: ParkingIcon, label: t.trustBar.parking },
  ];

  return (
    <section aria-label={t.trustBar.heading} className="border-b border-brand-black/10 bg-brand-yellow">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:divide-x sm:divide-brand-black/10">
          {badges.map(({ key, icon: Icon, label }) => (
            <div key={key} className="flex flex-col items-center gap-1.5 text-center sm:px-4">
              <Icon />
              <span className="text-xs font-bold text-brand-black">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
