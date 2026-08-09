import { useLanguage } from '../../i18n/useLanguage';

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function NoContractIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      <rect x="3" y="11" width="14" height="10" rx="2" />
      <path d="m14 15 3 3 5-5" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M15.5 14.2c2.6.4 4.5 2.6 4.5 5.3" />
    </svg>
  );
}

function AmenitiesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M9 2v4M15 2v4" />
      <rect x="7" y="6" width="10" height="7" rx="1" />
      <path d="M12 13v4M9 21h6" />
    </svg>
  );
}

const ICONS = [LocationIcon, NoContractIcon, CommunityIcon, AmenitiesIcon];

export function BenefitsSection() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="benefits-heading" className="mx-auto max-w-6xl px-4 py-16">
      <h2 id="benefits-heading" className="text-3xl font-bold text-brand-black sm:text-4xl">
        {t.joinPage.benefitsHeading}
      </h2>

      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {t.joinPage.benefits.map((benefit, index) => {
          const Icon = ICONS[index];
          return (
            <li key={benefit.title} className="rounded-lg border border-brand-black/10 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-yellow text-brand-black">
                <Icon />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-brand-black">
                {benefit.title}
              </h3>
              <p className="mt-1 text-sm text-brand-black/70">{benefit.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
