import { useLanguage } from '../i18n/useLanguage';
import { BenefitsSection } from '../components/join/BenefitsSection';
import { ShowcaseSection } from '../components/join/ShowcaseSection';
import { AvailabilitySection } from '../components/join/AvailabilitySection';
import { EconomicsSection } from '../components/join/EconomicsSection';
import { FAQSection } from '../components/join/FAQSection';
import { PromoBanner } from '../components/join/PromoBanner';
import { LeaseInquiryForm } from '../components/join/LeaseInquiryForm';
import { PageHero } from '../components/PageHero';
import { VisitSection } from '../components/home/VisitSection';

export function JoinThePark() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        heading={t.joinPage.heading}
        intro={t.joinPage.intro}
        hideIntroOnMobile
        cta={{ label: t.joinPage.ctaLabel, href: '#lease-form' }}
        ctaMicrocopy={t.joinPage.ctaMicrocopy}
      />

      <AvailabilitySection />
      <BenefitsSection />
      <EconomicsSection />
      <ShowcaseSection />
      <FAQSection />
      <PromoBanner />
      <LeaseInquiryForm />
      <VisitSection />
    </>
  );
}
