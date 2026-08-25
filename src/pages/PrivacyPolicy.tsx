import { useLanguage } from '../i18n/useLanguage';
import { parkInfo } from '../data/parkInfo';

export function PrivacyPolicy() {
  const { t } = useLanguage();

  const sections = [
    { heading: t.privacyPage.collectHeading, body: t.privacyPage.collectBody },
    { heading: t.privacyPage.useHeading, body: t.privacyPage.useBody },
    { heading: t.privacyPage.thirdPartyHeading, body: t.privacyPage.thirdPartyBody },
    { heading: t.privacyPage.sharingHeading, body: t.privacyPage.sharingBody },
  ];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-brand-black sm:text-4xl">{t.privacyPage.heading}</h1>
      <p className="mt-1 text-sm text-brand-black/60">{t.privacyPage.effectiveDate}</p>
      <p className="mt-6 text-brand-black/70">{t.privacyPage.intro}</p>

      <div className="mt-8 flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-heading text-lg font-bold text-brand-black">{section.heading}</h2>
            <p className="mt-1 text-brand-black/70">{section.body}</p>
          </div>
        ))}

        <div>
          <h2 className="font-heading text-lg font-bold text-brand-black">
            {t.privacyPage.contactHeading}
          </h2>
          <p className="mt-1 text-brand-black/70">{t.privacyPage.contactBody}</p>
          <p className="mt-2 text-brand-black/70">
            {parkInfo.phone} · {parkInfo.email}
          </p>
        </div>
      </div>
    </section>
  );
}
