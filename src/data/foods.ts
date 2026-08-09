export interface FoodItem {
  id: string;
  name: { en: string; es: string };
  /**
   * Optional photo. Drop real photos in `src/assets/foods/` and import them here
   * (e.g. `import image from '../assets/foods/tacos.jpg'`) so Vite can hash and
   * optimize them. Items without a photo yet show an "Images coming soon" placeholder.
   */
  image?: string;
}

export const foods: FoodItem[] = [
  { id: 'tacos', name: { en: 'Tacos', es: 'Tacos' } },
  { id: 'tortas', name: { en: 'Tortas', es: 'Tortas' } },
  { id: 'elote', name: { en: 'Elote', es: 'Elote' } },
  { id: 'tamales', name: { en: 'Tamales', es: 'Tamales' } },
  { id: 'quesadillas', name: { en: 'Quesadillas', es: 'Quesadillas' } },
  { id: 'aguas-frescas', name: { en: 'Aguas Frescas', es: 'Aguas Frescas' } },
  { id: 'churros', name: { en: 'Churros', es: 'Churros' } },
  { id: 'coffee', name: { en: 'Coffee', es: 'Café' } },
];
