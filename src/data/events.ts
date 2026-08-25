import cruiseImage from '../assets/events/cruise_into_the_school_year.webp';
import backToSchoolCruiseImage from '../assets/events/back_to_school_cruise.webp';
import karaokeImage from '../assets/events/karaoke.webp';
import cruiseFullImage from '../assets/events/cruise_into_the_school_year_full.webp';
import backToSchoolCruiseFullImage from '../assets/events/back_to_school_cruise_full.webp';
import karaokeFullImage from '../assets/events/karaoke_full.webp';

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
  /** Full-flyer photo shown on the Events page's image-only event cards. */
  fullImage?: string;
}

export const events: EventItem[] = [
  {
    id: 'karaoke-night',
    name: { en: 'Karaoke Night', es: 'Noche de Karaoke' },
    // Recurring every Sunday — date reflects the next occurrence.
    date: '2026-08-16',
    time: { en: '6pm–9pm, every Sunday', es: '6pm–9pm, todos los domingos' },
    description: {
      en: 'DJ Mike PDX joins us every Sunday from 6pm–9pm. Bring family and friends for karaoke night, amazing food, and more!',
      es: 'DJ Mike PDX nos acompaña todos los domingos de 6pm a 9pm. ¡Trae a tu familia y amigos para una noche de karaoke, comida increíble y más!',
    },
    image: karaokeImage,
    fullImage: karaokeFullImage,
  },
  {
    id: 'cruise-into-the-school-year',
    name: { en: 'Cruise Into The School Year', es: 'Cruise Into The School Year' },
    date: '2026-08-16',
    time: { en: '3pm–6pm', es: '3pm–6pm' },
    description: {
      en: 'Enjoy a lowrider showcase, delicious food, local vendors, games, face painting, music by our live DJ, activities for all ages, and school supplies while they last!',
      es: 'Disfruta de una exhibición de lowriders, comida deliciosa, vendedores locales, juegos, pintura facial, música con DJ en vivo, actividades para todas las edades, ¡y útiles escolares hasta agotar existencias!',
    },
    image: cruiseImage,
    fullImage: cruiseFullImage,
  },
  {
    id: 'back-to-school-cruise',
    name: { en: 'Sunday Back to School Cruise', es: 'Cruise de Regreso a Clases del Domingo' },
    date: '2026-08-16',
    time: { en: '3pm–6pm', es: '3pm–6pm' },
    description: {
      en: 'Enjoy a lowrider showcase, delicious food, local vendors, games, face painting, music by our live DJ, activities for all ages, and school supplies while they last!',
      es: 'Disfruta de una exhibición de lowriders, comida deliciosa, vendedores locales, juegos, pintura facial, música con DJ en vivo, actividades para todas las edades, ¡y útiles escolares hasta agotar existencias!',
    },
    image: backToSchoolCruiseImage,
    fullImage: backToSchoolCruiseFullImage,
  },
];
