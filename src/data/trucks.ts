import pupusasChilerosTruck from '../assets/food_trucks/pupusas_chileros.jpg';
import cafeChulaLogo from '../assets/food_trucks/cafe_chula.PNG';
import cafeChulaTruck from '../assets/food_trucks/cafe_chula_truck.jpg';
import tortilleriaElPatronLogo from '../assets/food_trucks/tortilleria_el_patron_logo.png';
import tortilleriaElPatronTruck from '../assets/food_trucks/tortilleria_el_patron_truck.jpg';
import elChilangoTruck from '../assets/food_trucks/el_chilango.JPG';
import lasCuatasLokasTruck from '../assets/food_trucks/las_cuatas_lokas.JPG';
import lasJarochitasTruck from '../assets/food_trucks/las_jarochitas.jpg';
import nieveCaseraTruck from '../assets/food_trucks/nieve_casera.jpeg';
import queRollonSushiTruck from '../assets/food_trucks/que_rollon_sushi.JPG';
import taqueriaRomeroTruck from '../assets/food_trucks/taqueria_romero.JPEG';
import theRedMarinoTruck from '../assets/food_trucks/the_red_marino.jpg';

export interface Truck {
  id: string;
  name: string;
  foodType: { en: string; es: string };
  hours: { en: string; es: string };
  /**
   * Optional photo, shown on the Food Trucks page. Drop real photos in
   * `src/assets/food_trucks/` and import them here (e.g.
   * `import image from '../assets/food_trucks/cafe_chula_truck.jpg'`) so Vite can
   * hash and optimize them. Trucks without a photo yet fall back to a placeholder
   * in `TruckCard`.
   */
  image?: string;
  /**
   * Optional photo override for the homepage's "Featured food trucks" teaser.
   * Falls back to `image` when not set.
   */
  featuredImage?: string;
  /** Shown in the homepage's "Featured food trucks" teaser. */
  featured?: boolean;
}

export const trucks: Truck[] = [
  {
    id: 'pupusas-chileros',
    name: 'Pupusas Chileros',
    foodType: { en: 'Pupusas & Salvadoran food', es: 'Pupusas y comida salvadoreña' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: pupusasChilerosTruck,
  },
  {
    id: 'cafe-chula',
    name: 'Cafe Chula',
    foodType: { en: 'Coffee & Mexican breakfast', es: 'Café y desayuno mexicano' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: cafeChulaLogo,
    featuredImage: cafeChulaTruck,
    featured: true,
  },
  {
    id: 'tortilleria-el-patron',
    name: 'Tortilleria El Patron',
    foodType: { en: 'Fresh tortillas & Mexican eats', es: 'Tortillas frescas y comida mexicana' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: tortilleriaElPatronLogo,
    featuredImage: tortilleriaElPatronTruck,
    featured: true,
  },
  {
    id: 'las-jarochitas',
    name: 'Las Jarochitas',
    foodType: { en: 'Veracruz-style Mexican food', es: 'Comida mexicana estilo veracruzano' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: lasJarochitasTruck,
  },
  {
    id: 'taqueria-romero',
    name: 'Taqueria Romero',
    foodType: { en: 'Tacos & Mexican eats', es: 'Tacos y comida mexicana' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: taqueriaRomeroTruck,
  },
  {
    id: 'the-red-marino',
    name: 'The Red Marino',
    foodType: { en: 'Seafood & Mexican specialties', es: 'Mariscos y especialidades mexicanas' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: theRedMarinoTruck,
  },
  {
    id: 'el-chilango-chilaquiles',
    name: 'El Chilango Chilaquiles',
    foodType: { en: 'Chilaquiles & Mexican breakfast', es: 'Chilaquiles y desayuno mexicano' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: elChilangoTruck,
  },
  {
    id: 'adans-grill',
    name: "Adan's Grill",
    foodType: { en: 'Grilled Mexican specialties', es: 'Especialidades mexicanas a la parrilla' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
  },
  {
    id: 'syrian-house',
    name: 'Syrian House',
    foodType: { en: 'Syrian & Middle Eastern food', es: 'Comida siria y del medio oriente' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
  },
  {
    id: 'la-flauta-pdx',
    name: 'La Flauta PDX',
    foodType: { en: 'Flautas & Mexican eats', es: 'Flautas y comida mexicana' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
  },
  {
    id: 'las-cuatas-lokas',
    name: 'Las Cuatas Lokas',
    foodType: { en: 'Mexican street food', es: 'Antojitos mexicanos' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: lasCuatasLokasTruck,
  },
  {
    id: 'nieve-casera',
    name: 'Nieve Casera',
    foodType: { en: 'Homemade ice cream & paletas', es: 'Nieve y paletas caseras' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: nieveCaseraTruck,
  },
  {
    id: 'que-rollon-sushi',
    name: 'Que Rollón Sushi',
    foodType: { en: 'Sushi rolls', es: 'Rollos de sushi' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: queRollonSushiTruck,
  },
];
