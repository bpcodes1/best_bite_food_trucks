// Karaoke Night is on hold — imports kept for the commented-out entry below.
// import karaokeImage from '../assets/events/karaoke.webp';
// import karaokeFullImage from '../assets/events/karaoke_full.webp';

// Past cruise events — imports kept for the commented-out entries below.
// import cruiseImage from '../assets/events/cruise_into_the_school_year.webp';
// import backToSchoolCruiseImage from '../assets/events/back_to_school_cruise.webp';
// import cruiseFullImage from '../assets/events/cruise_into_the_school_year_full.webp';
// import backToSchoolCruiseFullImage from '../assets/events/back_to_school_cruise_full.webp';

// Salem Ponte Chula has passed — imports kept for the commented-out entry below.
// import ponteChulaEng from '../assets/events/ponte_chula_eng.png';
// import ponteChulaEsp from '../assets/events/ponte_chula_esp.png';
// Cafecito was rained out — imports kept for the commented-out entry below.
// import cafecitaEng from '../assets/events/cafecito_eng.webp';
// import cafecitaEsp from '../assets/events/cafecity_esp.webp';
import endOfSummerLowrider from '../assets/events/end_of_summer_lowrider.webp';

export interface EventItem {
  id: string;
  name: { en: string; es: string };
  /** ISO date (YYYY-MM-DD) used for sorting and computing the weekday label. */
  date: string;
  /**
   * True when `date` is a placeholder, not a confirmed booking (e.g. still
   * waiting on the client to lock a real date). Shows a "Date TBD" badge
   * instead of the real weekday everywhere the date would otherwise render,
   * so an unconfirmed date is never mistaken for a real one.
   */
  dateUnconfirmed?: boolean;
  time: { en: string; es: string };
  description: { en: string; es: string };
  /**
   * Optional photo. Drop real photos in `src/assets/` and import them here so
   * Vite can hash and optimize them. Events without a photo yet show a
   * placeholder in the homepage teaser cards.
   */
  image?: string;
  /** Full-flyer photo shown on the Events page's image-only event cards (English). */
  fullImage?: string;
  /** Spanish version of the full-flyer photo. Falls back to `fullImage` if absent. */
  fullImageEs?: string;
}

export const events: EventItem[] = [
  // Karaoke Night / Sunday DJ program has ended — commented out (not
  // deleted) so it's a one-line uncomment if it comes back.
  // {
  //   id: 'karaoke-night',
  //   name: { en: 'Karaoke Night', es: 'Noche de Karaoke' },
  //   date: '2026-08-16',
  //   time: { en: '6pm–9pm, every Sunday', es: '6pm–9pm, todos los domingos' },
  //   description: {
  //     en: 'DJ Mike PDX joins us every Sunday from 6pm–9pm. Bring family and friends for karaoke night, amazing food, and more!',
  //     es: 'DJ Mike PDX nos acompaña todos los domingos de 6pm a 9pm. ¡Trae a tu familia y amigos para una noche de karaoke, comida increíble y más!',
  //   },
  //   image: karaokeImage,
  //   fullImage: karaokeFullImage,
  // },
  // Salem Ponte Chula has passed — commented out (not deleted) so it's a
  // one-line uncomment if it comes back.
  // {
  //   id: 'salem-ponte-chula',
  //   name: { en: 'Salem Ponte Chula', es: 'Salem Ponte Chula' },
  //   date: '2026-08-28',
  //   time: { en: '5pm–7pm', es: '5pm–7pm' },
  //   description: {
  //     en: 'Try our new drink menu and enjoy a dancing horse performance. Come hang out, sip, and enjoy the evening.',
  //     es: 'Prueba nuestro nuevo menú de bebidas y disfruta una actuación de caballo bailador. Ven a convivir, tomar algo y disfrutar la noche.',
  //   },
  //   fullImage: ponteChulaEng,
  //   fullImageEs: ponteChulaEsp,
  // },
  {
    id: 'end-of-summer-lowrider-cruise-in',
    name: {
      en: 'Lowrider End of the Summer Cruise In',
      es: 'Lowrider Cruise In de Fin de Verano',
    },
    date: '2026-09-05',
    time: { en: 'Meet 4:30pm, cruise in 5pm', es: 'Reunión 4:30pm, cruise in 5pm' },
    description: {
      en: "Cap off the season with a lowrider cruise in. Meet up at the ARCO at 4433 Lancaster Drive at 4:30pm, roll out at 5pm, and cruise in to Best Bite Food Park. Good vibes, good rides, good food. Let's end the summer right!",
      es: 'Cierra la temporada con un cruise in de lowriders. Nos reunimos en el ARCO de 4433 Lancaster Drive a las 4:30pm, salimos a las 5pm y llegamos en caravana a Best Bite Food Park. Buena vibra, buenos carros, buena comida... ¡vamos a despedir el verano como se debe!',
    },
    fullImage: endOfSummerLowrider,
  },
  // Cafecito (2026-09-06) was rained out — commented out (not deleted) so
  // it's a one-line uncomment if it gets a new date.
  // {
  //   id: 'cafecito',
  //   name: { en: 'Cafecito', es: 'Cafecito' },
  //   date: '2026-09-06',
  //   time: { en: '9am–11am', es: '9am–11am' },
  //   description: {
  //     en: 'A space for women in every season of life to connect, share, learn, and meet new people. Come enjoy a morning just for you, where we can talk about life, family, business, goals, wellness, and everything in between... all while learning and growing together.',
  //     es: 'Un espacio para mujeres en cada etapa de la vida para conectar, compartir, aprender y conocer personas nuevas. Ven a disfrutar una mañana solo para ti, donde podemos hablar de vida, familia, negocios, metas, bienestar y todo lo que hay en medio... todo mientras aprendemos y crecemos juntas.',
  //   },
  //   fullImage: cafecitaEng,
  //   fullImageEs: cafecitaEsp,
  // },
  // Past events — kept for reference; images live in RecentEventGallery.
  // {
  //   id: 'cruise-into-the-school-year',
  //   name: { en: 'Cruise Into The School Year', es: 'Cruise Into The School Year' },
  //   date: '2026-08-16',
  //   time: { en: '3pm–6pm', es: '3pm–6pm' },
  //   description: {
  //     en: 'Enjoy a lowrider showcase, delicious food, local vendors, games, face painting, music by our live DJ, activities for all ages, and school supplies while they last!',
  //     es: 'Disfruta de una exhibición de lowriders, comida deliciosa, vendedores locales, juegos, pintura facial, música con DJ en vivo, actividades para todas las edades, ¡y útiles escolares hasta agotar existencias!',
  //   },
  //   image: cruiseImage,
  //   fullImage: cruiseFullImage,
  // },
  // {
  //   id: 'back-to-school-cruise',
  //   name: { en: 'Sunday Back to School Cruise', es: 'Cruise de Regreso a Clases del Domingo' },
  //   date: '2026-08-16',
  //   time: { en: '3pm–6pm', es: '3pm–6pm' },
  //   description: {
  //     en: 'Enjoy a lowrider showcase, delicious food, local vendors, games, face painting, music by our live DJ, activities for all ages, and school supplies while they last!',
  //     es: 'Disfruta de una exhibición de lowriders, comida deliciosa, vendedores locales, juegos, pintura facial, música con DJ en vivo, actividades para todas las edades, ¡y útiles escolares hasta agotar existencias!',
  //   },
  //   image: backToSchoolCruiseImage,
  //   fullImage: backToSchoolCruiseFullImage,
  // },
];
