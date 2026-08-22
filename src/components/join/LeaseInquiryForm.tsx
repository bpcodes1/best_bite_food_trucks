import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { parkInfo } from '../../data/parkInfo';

const inputClassName =
  'mt-1 w-full rounded-md border border-brand-black/20 bg-white px-3 py-2 text-brand-black focus:border-brand-black focus:outline-none';
const labelClassName = 'block text-sm font-bold text-brand-black';

const WEB3FORMS_ACCESS_KEY = '3520713f-fc91-4818-a5e3-a6b6ee2df6be';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export function LeaseInquiryForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<SubmitStatus>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New lease inquiry — Best Bite Food Park');

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
    <section
      id="lease-form"
      aria-labelledby="lease-form-heading"
      className="border-t border-brand-black/10 bg-white px-4 py-16"
    >
      <div className="mx-auto max-w-2xl">
        <h2 id="lease-form-heading" className="text-3xl font-bold text-brand-black sm:text-4xl">
          {t.joinPage.formHeading}
        </h2>
        <p className="mt-4 text-brand-black/70">{t.joinPage.formIntro}</p>
        <p className="mt-1 text-sm font-bold text-brand-black/70">{t.joinPage.formReassurance}</p>

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
            disabled={status === 'submitting'}
            className="mt-2 inline-block self-start rounded-md bg-brand-yellow px-8 py-3 font-heading font-bold text-brand-black transition-colors hover:bg-brand-yellow-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? t.joinPage.sendingCta : t.joinPage.submitCta}
          </button>

          <p
            role="status"
            aria-live="polite"
            className={`text-sm font-bold ${status === 'error' ? 'text-red-600' : 'text-brand-black'}`}
          >
            {status === 'success' && t.joinPage.successMessage}
            {status === 'error' && t.joinPage.errorMessage}
          </p>
        </form>

        <a
          href={parkInfo.social.instagram}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm font-bold text-brand-black hover:underline"
        >
          {t.joinPage.instagramCta}
        </a>
      </div>
    </section>
  );
}
