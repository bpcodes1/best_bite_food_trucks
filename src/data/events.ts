import cruiseImage from '../assets/events/cruise_into_the_school_year.png';
import backToSchoolCruiseImage from '../assets/events/back_to_school_cruise.png';
import karaokeImage from '../assets/events/karaoke.png';
import cruiseFullImage from '../assets/events/cruise_into_the_school_year_full.jpg';
import backToSchoolCruiseFullImage from '../assets/events/back_to_school_cruise_full.jpg';
import karaokeFullImage from '../assets/events/karaoke_full.jpg';

export interface EventItem {
  id: string;
  name: { en: string; es: string };
  /** ISO date (YYYY-MM-DD) used for sorting and computing the weekday label. */
  date: string;
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
    // Placeholder date — real date to follow.
    date: '2026-08-30',
    time: { en: '3pm–6pm', es: '3pm–6pm' },
    description: {
      en: 'Enjoy a lowrider showcase, delicious food, local vendors, games, face painting, music by our live DJ, activities for all ages, and school supplies while they last!',
      es: 'Disfruta de una exhibición de lowriders, comida deliciosa, vendedores locales, juegos, pintura facial, música con DJ en vivo, actividades para todas las edades, ¡y útiles escolares hasta agotar existencias!',
    },
    image: backToSchoolCruiseImage,
    fullImage: backToSchoolCruiseFullImage,
  },
];
