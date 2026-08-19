import { useLanguage } from '../i18n/useLanguage';
import { BenefitsSection } from '../components/join/BenefitsSection';
import { ShowcaseSection } from '../components/join/ShowcaseSection';
import { AvailabilitySection } from '../components/join/AvailabilitySection';
import { PromoBanner } from '../components/join/PromoBanner';
import { LeaseInquiryForm } from '../components/join/LeaseInquiryForm';
import { PageHero } from '../components/PageHero';

export function JoinThePark() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero heading={t.joinPage.heading} intro={t.joinPage.intro} />

      <BenefitsSection />
      <ShowcaseSection />
      <AvailabilitySection />
      <PromoBanner />
      <LeaseInquiryForm />
    </>
  );
}
