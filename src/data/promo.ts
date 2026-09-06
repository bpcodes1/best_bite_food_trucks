export interface Promo {
  /** Set to false to hide the promo banner without deleting the copy below. */
  active: boolean;
  headline: { en: string; es: string };
  body: { en: string; es: string };
}

/** Update this each month, or set `active: false` when there's no current promo. */
export const currentPromo: Promo = {
  active: true,
  headline: {
    en: 'Your First 3 Months Are $750/mo',
    es: 'Tus Primeros 3 Meses Son $750/mes',
  },
  body: {
    en: 'Sign a six-month contract and pay $750/month for the first 3 months, then $1,000/month for the next 3. Contact us to claim a space.',
    es: 'Firma un contrato de seis meses y paga $750/mes durante los primeros 3 meses, luego $1,000/mes los siguientes 3. Contáctanos para reservar tu espacio.',
  },
};
