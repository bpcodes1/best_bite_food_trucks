export interface EventItem {
  id: string;
  name: { en: string; es: string };
  /** ISO date (YYYY-MM-DD) used for sorting and computing the weekday label. */
  date: string;
  time: { en: string; es: string };
  description: { en: string; es: string };
}

export const events: EventItem[] = [
  {
    id: 'salsa-night',
    name: { en: 'Salsa Night', es: 'Noche de Salsa' },
    date: '2026-08-08',
    time: { en: '7pm–10pm', es: '7pm–10pm' },
    description: {
      en: 'Live band and a dance floor between the trucks.',
      es: 'Banda en vivo y pista de baile entre los food trucks.',
    },
  },
  {
    id: 'cruise-into-the-school-year',
    name: { en: 'Cruise Into The School Year', es: 'Cruise Into The School Year' },
    date: '2026-08-09',
    time: { en: '3pm–6pm', es: '3pm–6pm' },
    description: {
      en: 'A lowrider car show with food, family activities, and community vibes to kick off the new school year.',
      es: 'Una exhibición de lowriders con comida, actividades familiares y buen ambiente comunitario para arrancar el nuevo año escolar.',
    },
  },
  {
    id: 'trivia-tuesday',
    name: { en: 'Trivia Tuesday', es: 'Martes de Trivia' },
    date: '2026-08-11',
    time: { en: '6:30pm–8:30pm', es: '6:30pm–8:30pm' },
    description: {
      en: 'Team trivia with prizes from park vendors.',
      es: 'Trivia en equipo con premios de los vendedores del parque.',
    },
  },
  {
    id: 'live-music-roadhouse',
    name: { en: 'Live Music: The Roadhouse Band', es: 'Música en Vivo: The Roadhouse Band' },
    date: '2026-08-15',
    time: { en: '6pm–9pm', es: '6pm–9pm' },
    description: {
      en: 'Local favorites playing rock and country covers.',
      es: 'Banda local tocando covers de rock y country.',
    },
  },
  {
    id: 'food-truck-rally',
    name: { en: 'Food Truck Rally', es: 'Festival de Food Trucks' },
    date: '2026-08-23',
    time: { en: '11am–8pm', es: '11am–8pm' },
    description: {
      en: 'Guest trucks join the park for a bigger-than-usual lineup.',
      es: 'Trucks invitados se suman al parque para una alineación más grande de lo usual.',
    },
  },
];
