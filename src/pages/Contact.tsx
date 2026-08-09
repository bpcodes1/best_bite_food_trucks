import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLanguage } from '../i18n/useLanguage';
import { parkInfo } from '../data/parkInfo';

const inputClassName =
  'mt-1 w-full rounded-md border border-brand-black/20 bg-white px-3 py-2 text-brand-black focus:border-brand-black focus:outline-none';
const labelClassName = 'block text-sm font-bold text-brand-black';

export function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // This form isn't wired up to a backend yet — it just confirms locally.
    // Before launch, point it at a real submission endpoint (e.g. a Cloudflare
    // Pages Function or a form service like Formspree) so messages actually
    // reach the park.
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-brand-black sm:text-4xl">{t.contactPage.heading}</h1>
        <p className="mt-4 text-brand-black/70">{t.contactPage.intro}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="contact-name" className={labelClassName}>
              {t.contactPage.nameLabel}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClassName}>
              {t.contactPage.emailLabel}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="contact-reason" className={labelClassName}>
              {t.contactPage.reasonLabel}
            </label>
            <select
              id="contact-reason"
              name="reason"
              defaultValue=""
              required
              className={inputClassName}
            >
              <option value="" disabled>
                {t.contactPage.reasonPlaceholder}
              </option>
              <option value="general">{t.contactPage.reasonGeneral}</option>
              <option value="vendor">{t.contactPage.reasonVendor}</option>
              <option value="event">{t.contactPage.reasonEvent}</option>
              <option value="other">{t.contactPage.reasonOther}</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClassName}>
              {t.contactPage.messageLabel}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              className={inputClassName}
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-block self-start rounded-md bg-brand-yellow px-8 py-3 font-heading font-bold text-brand-black transition-colors hover:bg-brand-yellow-dark"
          >
            {t.contactPage.submitCta}
          </button>

          <p role="status" aria-live="polite" className="text-sm font-bold text-brand-black">
            {submitted ? t.contactPage.successMessage : ''}
          </p>
        </form>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wide text-brand-black/60">
            {t.contactPage.directLabel}
          </h2>
          <ul className="mt-2 space-y-1 text-brand-black">
            <li>
              <a href={`tel:${parkInfo.phone.replace(/[^+\d]/g, '')}`} className="hover:underline">
                {parkInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${parkInfo.email}`} className="hover:underline">
                {parkInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
