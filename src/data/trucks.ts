import pupusasChilerosTruck from '../assets/food_trucks/pupusas_chileros.jpg';
import cafeChulaTruck from '../assets/food_trucks/cafe_chula_truck.jpg';
import cafeChulaLogo from '../assets/food_trucks/cafe_chula_logo.png';
import tortilleriaElPatronTruck from '../assets/food_trucks/tortilleria_el_patron_truck.jpg';
import tortilleriaElPatronLogo from '../assets/food_trucks/tortilleria_el_patron_logo.png';
import elChilangoTruck from '../assets/food_trucks/el_chilango_truck.jpg';
import elChilangoLogo from '../assets/food_trucks/el_chilango_logo.jpg';
import lasCuatasLokasTruck from '../assets/food_trucks/las_cuatas_lokas.webp';
import lasCuatasLokasLogo from '../assets/food_trucks/las_cuatas_lokas_logo.png';
import lasJarochitasTruck from '../assets/food_trucks/las_jarochitas.webp';
import lasJarochitasLogo from '../assets/food_trucks/las_jarochitas_logo.jpg';
import nieveCaseraTruck from '../assets/food_trucks/nieve_casera.jpg';
import nieveCaseraLogo from '../assets/food_trucks/nieve_caseras_logo.jpg';
import taqueriaRomeroTruck from '../assets/food_trucks/taqueria_romero.webp';
import taqueriaRomeroLogo from '../assets/food_trucks/taqueria_romero_logo.jpg';
import theRedMarinoTruck from '../assets/food_trucks/the_red_marino.webp';
import theRedMarinoLogo from '../assets/food_trucks/the_red_marino_logo.jpg';
import adansGrillTruck from '../assets/food_trucks/adans_grill.webp';
import syrianHouseTruck from '../assets/food_trucks/syrian_house.webp';

export type TruckCategory =
  | 'mexican'
  | 'breakfast'
  | 'boba'
  | 'dessert'
  | 'salvadoran'
  | 'middle-eastern'
  | 'seafood';

export const CATEGORIES: { id: TruckCategory; label: { en: string; es: string } }[] = [
  { id: 'mexican', label: { en: 'Mexican', es: 'Mexicana' } },
  { id: 'breakfast', label: { en: 'Breakfast & Coffee', es: 'Desayuno y café' } },
  { id: 'boba', label: { en: 'Boba & Drinks', es: 'Boba y bebidas' } },
  { id: 'dessert', label: { en: 'Desserts', es: 'Postres' } },
  { id: 'salvadoran', label: { en: 'Salvadoran', es: 'Salvadoreña' } },
  { id: 'middle-eastern', label: { en: 'Middle Eastern', es: 'Medio Oriente' } },
  { id: 'seafood', label: { en: 'Seafood', es: 'Mariscos' } },
];

export interface Truck {
  id: string;
  name: string;
  category: TruckCategory;
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
  /** Optional small logo shown next to the truck's name on its card. */
  logo?: string;
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
    id: 'adans-grill',
    name: "Adan's Grill",
    category: 'mexican',
    foodType: { en: 'Grilled Mexican specialties', es: 'Especialidades mexicanas a la parrilla' },
    hours: {
      en: 'Thu–Sun 12pm–9pm, Mon–Wed closed',
      es: 'Jue–Dom 12pm–9pm, Lun–Mié cerrado',
    },
    image: adansGrillTruck,
  },
  {
    id: 'cafe-chula',
    name: 'Cafe Chula',
    category: 'breakfast',
    foodType: { en: 'Coffee & Mexican breakfast', es: 'Café y desayuno mexicano' },
    hours: {
      en: 'Mon–Thu 7am–2pm, Fri–Sat 7am–4pm, Sun 9am–4pm',
      es: 'Lun–Jue 7am–2pm, Vie–Sáb 7am–4pm, Dom 9am–4pm',
    },
    image: cafeChulaTruck,
    logo: cafeChulaLogo,
    featured: true,
  },
  {
    id: 'el-chilango-chilaquiles',
    name: 'El Chilango Chilaquiles',
    category: 'breakfast',
    foodType: { en: 'Chilaquiles & Mexican breakfast', es: 'Chilaquiles y desayuno mexicano' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: elChilangoTruck,
    logo: elChilangoLogo,
  },
  {
    id: 'jjs-boba',
    name: "JJ's Boba",
    category: 'boba',
    foodType: { en: 'Boba & Asian drinks', es: 'Boba y bebidas asiáticas' },
    hours: { en: 'Coming soon', es: 'Próximamente' },
  },
  {
    id: 'las-cuatas-lokas',
    name: 'Las Cuatas Lokas',
    category: 'mexican',
    foodType: { en: 'Mexican street food', es: 'Antojitos mexicanos' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: lasCuatasLokasTruck,
    logo: lasCuatasLokasLogo,
  },
  {
    id: 'las-jarochitas',
    name: 'Las Jarochitas',
    category: 'mexican',
    foodType: { en: 'Veracruz-style Mexican food', es: 'Comida mexicana estilo veracruzano' },
    hours: {
      en: 'Mon closed, Tue–Wed 10am–8pm, Thu 10am–6pm, Fri–Sat 10am–9pm, Sun 10am–6pm',
      es: 'Lun cerrado, Mar–Mié 10am–8pm, Jue 10am–6pm, Vie–Sáb 10am–9pm, Dom 10am–6pm',
    },
    image: lasJarochitasTruck,
    logo: lasJarochitasLogo,
  },
  {
    id: 'nieve-casera',
    name: 'Nieve Casera',
    category: 'dessert',
    foodType: { en: 'Homemade ice cream & paletas', es: 'Nieve y paletas caseras' },
    hours: {
      en: 'Mon–Fri 2pm–8pm, Sat 12pm–8pm, Sun 11am–8pm',
      es: 'Lun–Vie 2pm–8pm, Sáb 12pm–8pm, Dom 11am–8pm',
    },
    image: nieveCaseraTruck,
    logo: nieveCaseraLogo,
  },
  {
    id: 'pupusas-chileros',
    name: 'Pupusas Chileros',
    category: 'salvadoran',
    foodType: { en: 'Pupusas & Salvadoran food', es: 'Pupusas y comida salvadoreña' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: pupusasChilerosTruck,
  },
  {
    id: 'syrian-house',
    name: 'Syrian House',
    category: 'middle-eastern',
    foodType: { en: 'Syrian & Middle Eastern food', es: 'Comida siria y del medio oriente' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    image: syrianHouseTruck,
  },
  {
    id: 'taqueria-romero',
    name: 'Taqueria Romero',
    category: 'mexican',
    foodType: { en: 'Tacos & Mexican eats', es: 'Tacos y comida mexicana' },
    hours: {
      en: 'Mon–Fri 12pm–8pm, Sat 12pm–10pm, Sun closed',
      es: 'Lun–Vie 12pm–8pm, Sáb 12pm–10pm, Dom cerrado',
    },
    image: taqueriaRomeroTruck,
    logo: taqueriaRomeroLogo,
  },
  {
    id: 'the-red-marino',
    name: 'The Red Marino',
    category: 'seafood',
    foodType: { en: 'Seafood & Mexican specialties', es: 'Mariscos y especialidades mexicanas' },
    hours: {
      en: 'Mon–Tue closed, Wed–Sun 12:30pm–8:30pm',
      es: 'Lun–Mar cerrado, Mié–Dom 12:30pm–8:30pm',
    },
    image: theRedMarinoTruck,
    logo: theRedMarinoLogo,
  },
  {
    id: 'tortilleria-el-patron',
    name: 'Tortilleria El Patron',
    category: 'mexican',
    foodType: { en: 'Fresh tortillas & Mexican eats', es: 'Tortillas frescas y comida mexicana' },
    hours: {
      en: 'Mon–Sun 9am–8pm',
      es: 'Lun–Dom 9am–8pm',
    },
    image: tortilleriaElPatronTruck,
    logo: tortilleriaElPatronLogo,
    featured: true,
  },
];
