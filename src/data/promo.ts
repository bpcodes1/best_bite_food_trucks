export interface Promo {
  /** Set to false to hide the promo banner without deleting the copy below. */
  active: boolean;
  headline: { en: string; es: string };
  body: { en: string; es: string };
}

/** Update this each month, or set `active: false` when there's no current promo. */
export const currentPromo: Promo = {
  active: false,
  headline: {
    en: "This Month's Move-In Special",
    es: 'Promoción de Este Mes',
  },
  body: {
    en: 'Contact us to learn about current availability and leasing terms.',
    es: 'Contáctanos para conocer la disponibilidad y términos de arrendamiento actuales.',
  },
};
