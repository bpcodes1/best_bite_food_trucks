import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLanguage } from '../../i18n/useLanguage';

const inputClassName =
  'mt-1 w-full rounded-md border border-brand-black/20 bg-white px-3 py-2 text-brand-black focus:border-brand-black focus:outline-none';
const labelClassName = 'block text-sm font-bold text-brand-black';

export function LeaseInquiryForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // This form isn't wired up to a backend yet — it just confirms locally.
    // Before launch, point it at a real submission endpoint (e.g. a Cloudflare
    // Pages Function or a form service like Formspree) so inquiries actually
    // reach the park.
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section
      aria-labelledby="lease-form-heading"
      className="border-t border-brand-black/10 bg-white px-4 py-16"
    >
      <div className="mx-auto max-w-2xl">
        <h2 id="lease-form-heading" className="text-3xl font-bold text-brand-black sm:text-4xl">
          {t.joinPage.formHeading}
        </h2>
        <p className="mt-4 text-brand-black/70">{t.joinPage.formIntro}</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="lease-name" className={labelClassName}>
              {t.joinPage.nameLabel}
            </label>
            <input
              id="lease-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="lease-business" className={labelClassName}>
              {t.joinPage.businessLabel}
            </label>
            <input
              id="lease-business"
              name="business"
              type="text"
              required
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lease-email" className={labelClassName}>
                {t.joinPage.emailLabel}
              </label>
              <input
                id="lease-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="lease-phone" className={labelClassName}>
                {t.joinPage.phoneLabel}
              </label>
              <input
                id="lease-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label htmlFor="lease-message" className={labelClassName}>
              {t.joinPage.messageLabel}
            </label>
            <textarea
              id="lease-message"
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
            {t.joinPage.submitCta}
          </button>

          <p role="status" aria-live="polite" className="text-sm font-bold text-brand-black">
            {submitted ? t.joinPage.successMessage : ''}
          </p>
        </form>
      </div>
    </section>
  );
}
