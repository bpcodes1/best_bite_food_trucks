import tacosImage from '../assets/food_carousel/tacos.webp';
import quesatacosImage from '../assets/food_carousel/quesatacos.webp';
import clubSandwichImage from '../assets/food_carousel/club_sandwich.webp';
import greekSaladImage from '../assets/food_carousel/greek_salad.webp';
import ribsImage from '../assets/food_carousel/ribs.webp';
import chamoyadaImage from '../assets/food_carousel/chamoyada.webp';
import tacoDoradoImage from '../assets/food_carousel/taco_dorado.webp';
import shrimpTostadaImage from '../assets/food_carousel/shrimp_tostada.webp';
import coffeeImage from '../assets/food_carousel/coffee.webp';
import ribsChickenImage from '../assets/food_carousel/ribs_chicken.webp';
import pupusasImage from '../assets/food_carousel/pupusas.webp';
import parkSpreadImage from '../assets/food_carousel/park_spread.webp';

export interface FoodItem {
  id: string;
  /**
   * Shown to nobody. `FoodsGallery` passes it to the fan as the image's alt
   * text, so it is read by a screen reader and by Google and has to describe
   * the photo it sits next to. Swap a photo, rewrite this in the same commit.
   */
  name: { en: string; es: string };
  /**
   * Optional photo. Items without one are filtered out of the gallery
   * entirely — they do not render a placeholder and never appear.
   */
  image?: string;
}

/**
 * Array order is carousel order. The fan shows five cards at a time and
 * cycles, so neighbours matter: the two rib plates sit at 5 and 10 rather
 * than side by side, and the drink and the wide table shot break up the
 * run of close-cropped plates.
 *
 * Photos below are from the 2026-09-12 shoot at the park. Everything after
 * the twelfth entry has no photo and is not on screen anywhere.
 */
export const foods: FoodItem[] = [
  { id: 'tacos', name: { en: 'Tacos', es: 'Tacos' }, image: tacosImage },
  {
    id: 'quesatacos',
    name: { en: 'Birria quesatacos', es: 'Quesatacos de birria' },
    image: quesatacosImage,
  },
  {
    id: 'club-sandwich',
    name: { en: 'Club sandwich', es: 'Club sándwich' },
    image: clubSandwichImage,
  },
  {
    id: 'greek-salad',
    name: { en: 'Greek salad', es: 'Ensalada griega' },
    image: greekSaladImage,
  },
  { id: 'ribs', name: { en: 'Ribs', es: 'Costillas' }, image: ribsImage },
  { id: 'chamoyada', name: { en: 'Chamoyada', es: 'Chamoyada' }, image: chamoyadaImage },
  { id: 'taco-dorado', name: { en: 'Taco dorado', es: 'Taco dorado' }, image: tacoDoradoImage },
  {
    id: 'shrimp-tostada',
    name: { en: 'Shrimp tostada', es: 'Tostada de camarón' },
    image: shrimpTostadaImage,
  },
  { id: 'coffee', name: { en: 'Coffee', es: 'Café' }, image: coffeeImage },
  {
    id: 'ribs-chicken',
    name: { en: 'Ribs and chicken', es: 'Costillas y pollo' },
    image: ribsChickenImage,
  },
  { id: 'pupusas', name: { en: 'Pupusas', es: 'Pupusas' }, image: pupusasImage },
  {
    id: 'park-spread',
    // Not a dish, so there is no dish name to use. The alt text describes
    // what is in the photo instead.
    name: {
      en: 'A table of food from across the park',
      es: 'Una mesa con comida de todo el parque',
    },
    image: parkSpreadImage,
  },

  // No photo yet — these do not render.
  { id: 'elote', name: { en: 'Elote', es: 'Elote' } },
  { id: 'tamales', name: { en: 'Tamales', es: 'Tamales' } },
  { id: 'quesadillas', name: { en: 'Quesadillas', es: 'Quesadillas' } },
  { id: 'aguas-frescas', name: { en: 'Aguas Frescas', es: 'Aguas Frescas' } },
  { id: 'churros', name: { en: 'Churros', es: 'Churros' } },
];
