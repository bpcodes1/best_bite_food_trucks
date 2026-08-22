import tacosImage from '../assets/food_carousel/tacos.webp';
import coffeeImage from '../assets/food_carousel/coffee.webp';
import pupusasImage from '../assets/food_carousel/pupusas.png';
import mariscosImage from '../assets/food_carousel/mariscos.webp';
import ribsImage from '../assets/food_carousel/ribs.webp';
import sandwichImage from '../assets/food_carousel/sandwich.jpg';

export interface FoodItem {
  id: string;
  name: { en: string; es: string };
  /**
   * Optional photo. Drop real photos in `src/assets/` and import them here so
   * Vite can hash and optimize them. Items without a photo yet show an
   * "Images coming soon" placeholder.
   */
  image?: string;
}

export const foods: FoodItem[] = [
  { id: 'tacos', name: { en: 'Tacos', es: 'Tacos' }, image: tacosImage },
  { id: 'tortas', name: { en: 'Tortas', es: 'Tortas' }, image: sandwichImage },
  { id: 'elote', name: { en: 'Elote', es: 'Elote' } },
  { id: 'tamales', name: { en: 'Tamales', es: 'Tamales' } },
  { id: 'quesadillas', name: { en: 'Quesadillas', es: 'Quesadillas' } },
  { id: 'aguas-frescas', name: { en: 'Aguas Frescas', es: 'Aguas Frescas' } },
  { id: 'churros', name: { en: 'Churros', es: 'Churros' } },
  { id: 'coffee', name: { en: 'Coffee', es: 'Café' }, image: coffeeImage },
  { id: 'pupusas', name: { en: 'Pupusas', es: 'Pupusas' }, image: pupusasImage },
  { id: 'mariscos', name: { en: 'Seafood', es: 'Mariscos' }, image: mariscosImage },
  { id: 'ribs', name: { en: 'Ribs', es: 'Costillas' }, image: ribsImage },
];
