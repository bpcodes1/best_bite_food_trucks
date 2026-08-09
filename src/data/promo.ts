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
    en: "This Month's Move-In Special",
    es: 'Promoción de Este Mes',
  },
  body: {
    en: 'Sign a lease this month and get your first 15 days of rent free.',
    es: 'Firma tu contrato este mes y obtén gratis los primeros 15 días de renta.',
  },
};
