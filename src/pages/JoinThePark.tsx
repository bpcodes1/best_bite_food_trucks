import { useLanguage } from '../i18n/useLanguage';
import { BenefitsSection } from '../components/join/BenefitsSection';
import { ShowcaseSection } from '../components/join/ShowcaseSection';
import { AvailabilitySection } from '../components/join/AvailabilitySection';
import { PromoBanner } from '../components/join/PromoBanner';
import { LeaseInquiryForm } from '../components/join/LeaseInquiryForm';

export function JoinThePark() {
  const { t } = useLanguage();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-brand-black sm:text-4xl">{t.joinPage.heading}</h1>
          <p className="mt-4 text-brand-black/70">{t.joinPage.intro}</p>
        </div>
      </section>

      <BenefitsSection />
      <ShowcaseSection />
      <AvailabilitySection />
      <PromoBanner />
      <LeaseInquiryForm />
    </>
  );
}
