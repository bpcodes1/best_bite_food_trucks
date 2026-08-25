import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLanguage } from '../i18n/useLanguage';
import { parkInfo } from '../data/parkInfo';
import { PageHero } from '../components/PageHero';

const inputClassName =
  'mt-1 w-full rounded-md border border-brand-black/20 bg-white px-3 py-2 text-brand-black focus:border-brand-black focus:outline-none';
const labelClassName = 'block text-sm font-bold text-brand-black';

const WEB3FORMS_ACCESS_KEY = '3ff547eb-7d0b-4f4d-85f6-92839b042d1f';
const EMAIL_PATTERN = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';
const NAME_MAX_LENGTH = 100;
const MESSAGE_MAX_LENGTH = 1000;

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<SubmitStatus>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: real visitors never see or fill this field, so a filled-in
    // value means a bot submitted the form. Bail out without hitting the API.
    if (formData.get('botcheck')) {
      setStatus('idle');
      return;
    }

    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New contact message — Best Bite Food Park');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <PageHero heading={t.contactPage.heading} intro={t.contactPage.intro} />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: 'none' }}
            />

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
                maxLength={NAME_MAX_LENGTH}
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
                pattern={EMAIL_PATTERN}
                title={t.contactPage.emailValidationHint}
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
                maxLength={MESSAGE_MAX_LENGTH}
                className={inputClassName}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 inline-block self-start rounded-md bg-brand-yellow px-8 py-3 font-heading font-bold text-brand-black transition-colors hover:bg-brand-yellow-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? t.contactPage.sendingCta : t.contactPage.submitCta}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`text-sm font-bold ${status === 'error' ? 'text-red-600' : 'text-brand-black'}`}
            >
              {status === 'success' && t.contactPage.successMessage}
              {status === 'error' && t.contactPage.errorMessage}
            </p>
          </form>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide text-brand-black/60">
              {t.contactPage.directLabel}
            </h2>
            <ul className="mt-2 space-y-1 text-brand-black">
              <li>
                <a
                  href={`tel:${parkInfo.phone.replace(/[^+\d]/g, '')}`}
                  className="hover:underline"
                >
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
    </>
  );
}
