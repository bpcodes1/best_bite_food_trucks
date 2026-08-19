import { useLanguage } from '../../i18n/useLanguage';
import { parkInfo } from '../../data/parkInfo';

export function FAQSection() {
  const { t } = useLanguage();

  const faqEntries = [
    {
      question: t.joinPage.faqSpacesQuestion,
      answer: `${parkInfo.availableSlots} ${t.joinPage.faqSpacesOf} ${parkInfo.totalSlots}.`,
    },
    ...t.joinPage.faqItems,
  ];

  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-6xl px-4 py-16">
      <h2 id="faq-heading" className="text-3xl font-bold text-brand-black sm:text-4xl">
        {t.joinPage.faqHeading}
      </h2>

      <div className="mt-8 divide-y divide-brand-black/10 border-y border-brand-black/10">
        {faqEntries.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading font-bold text-brand-black marker:content-none [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                className="shrink-0 text-xl leading-none text-brand-black/40 transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-brand-black/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
