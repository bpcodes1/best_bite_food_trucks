import pupusasChilerosTruck from '../assets/food_trucks/pupusas_chileros.webp';
import queRollonSushiTruck from '../assets/food_trucks/que_rollon_sushi.webp';
import queRollonSushiLogo from '../assets/food_trucks/que_rollon_sushi_logo.webp';
import cafeChulaTruck from '../assets/food_trucks/cafe_chula_truck.webp';
import cafeChulaLogo from '../assets/food_trucks/cafe_chula_logo.webp';
import tortilleriaElPatronTruck from '../assets/food_trucks/tortilleria_el_patron_truck.webp';
import tortilleriaElPatronLogo from '../assets/food_trucks/tortilleria_el_patron_logo.webp';
// El Chilango isn't open yet — import kept for the commented-out entry below.
// import elChilangoTruck from '../assets/food_trucks/el_chilango_truck.webp';
// import elChilangoLogo from '../assets/food_trucks/el_chilango_logo.webp';
import lasCuatasLokasTruck from '../assets/food_trucks/las_cuatas_lokas.webp';
import lasCuatasLokasLogo from '../assets/food_trucks/las_cuatas_lokas_logo.webp';
import lasJarochitasTruck from '../assets/food_trucks/las_jarochitas.webp';
import lasJarochitasLogo from '../assets/food_trucks/las_jarochitas_logo.webp';
import nieveCaseraTruck from '../assets/food_trucks/nieve_casera.webp';
import nieveCaseraLogo from '../assets/food_trucks/nieve_caseras_logo.webp';
import taqueriaRomeroTruck from '../assets/food_trucks/taqueria_romero.webp';
import taqueriaRomeroLogo from '../assets/food_trucks/taqueria_romero_logo.webp';
import theRedMarinoTruck from '../assets/food_trucks/the_red_marino.webp';
import theRedMarinoLogo from '../assets/food_trucks/the_red_marino_logo.webp';
import adansGrillTruck from '../assets/food_trucks/adans_grill.webp';
import syrianHouseTruck from '../assets/food_trucks/syrian_house.webp';

export type TruckCategory =
  | 'mexican'
  | 'breakfast'
  | 'boba'
  | 'dessert'
  | 'salvadoran'
  | 'middle-eastern'
  | 'seafood'
  | 'japanese';

export const CATEGORIES: { id: TruckCategory; label: { en: string; es: string } }[] = [
  { id: 'mexican', label: { en: 'Mexican', es: 'Mexicana' } },
  { id: 'breakfast', label: { en: 'Breakfast & Coffee', es: 'Desayuno y café' } },
  { id: 'boba', label: { en: 'Boba & Drinks', es: 'Boba y bebidas' } },
  { id: 'dessert', label: { en: 'Desserts', es: 'Postres' } },
  { id: 'salvadoran', label: { en: 'Salvadoran', es: 'Salvadoreña' } },
  { id: 'middle-eastern', label: { en: 'Middle Eastern', es: 'Medio Oriente' } },
  { id: 'seafood', label: { en: 'Seafood', es: 'Mariscos' } },
  { id: 'japanese', label: { en: 'Japanese', es: 'Japonesa' } },
];

export interface Truck {
  id: string;
  name: string;
  category: TruckCategory;
  foodType: { en: string; es: string };
  hours: { en: string; es: string };
  /**
   * The same hours as `hours`, machine readable, for the open/closed badge on
   * the Food Trucks page. Keys are `Date#getDay()` (0 = Sunday). Each value is
   * a LIST of trading windows, each `[opens, closes]` in minutes from
   * midnight. A missing day means closed that day; a missing `hoursByDay`
   * entirely means the vendor has never given us hours, and the badge says so
   * rather than guessing.
   *
   * WHY A LIST AND NOT ONE PAIR. This held a single `[opens, closes]` until
   * 2026-09-09, when Cynthia sent Syrian House Cuisine's real hours: 11am–2pm
   * AND 5pm–9pm, a lunch service and a dinner service with the truck shut in
   * between. A single pair cannot say that. It could only be flattened to
   * 11am–9pm, which tells someone the kitchen is serving at 3pm when it is
   * not, or left at 11am–2pm, which is what shipped and which reported them
   * closed right through dinner. A split shift is normal in food service, so
   * the shape now expresses one and the next such vendor is a data edit.
   *
   * KEEP IN SYNC WITH `hours` ABOVE. That string is what a reader and a
   * crawler see; this is what the badge computes from. If they ever disagree,
   * the string is the one a person wrote and wins.
   */
  hoursByDay?: Record<number, [number, number][]>;
  /**
   * Optional photo, shown on the Food Trucks page. Drop real photos in
   * `src/assets/food_trucks/` and import them here (e.g.
   * `import image from '../assets/food_trucks/cafe_chula_truck.webp'`) so Vite can
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
    hoursByDay: { 0: [[720, 1260]], 4: [[720, 1260]], 5: [[720, 1260]], 6: [[720, 1260]] },
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
    hoursByDay: {
      0: [[540, 960]],
      1: [[420, 840]],
      2: [[420, 840]],
      3: [[420, 840]],
      4: [[420, 840]],
      5: [[420, 960]],
      6: [[420, 960]],
    },
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
  // El Chilango Chilaquiles isn't open yet — commented out (not deleted) so
  // it's a one-line uncomment to bring back once it's actually operating.
  // {
  //   id: 'el-chilango-chilaquiles',
  //   name: 'El Chilango Chilaquiles',
  //   category: 'breakfast',
  //   foodType: { en: 'Chilaquiles & Mexican breakfast', es: 'Chilaquiles y desayuno mexicano' },
  //   hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
  //   image: elChilangoTruck,
  //   logo: elChilangoLogo,
  // },
  // JJ's Boba isn't open yet — commented out (not deleted) so it's a
  // one-line uncomment to bring back once it's actually operating.
  // {
  //   id: 'jjs-boba',
  //   name: "JJ's Boba",
  //   category: 'boba',
  //   foodType: { en: 'Boba & Asian drinks', es: 'Boba y bebidas asiáticas' },
  //   hours: { en: 'Coming soon', es: 'Próximamente' },
  // },
  {
    id: 'las-cuatas-lokas',
    hoursByDay: {
      0: [[900, 1290]],
      3: [[900, 1290]],
      4: [[900, 1290]],
      5: [[900, 1290]],
      6: [[900, 1290]],
    },
    name: 'Las Cuatas Lokas',
    category: 'mexican',
    foodType: { en: 'Mexican street food', es: 'Antojitos mexicanos' },
    hours: { en: 'Wed–Sun 3pm–9:30pm, Mon–Tue closed', es: 'Mié–Dom 3pm–9:30pm, Lun–Mar cerrado' },
    image: lasCuatasLokasTruck,
    logo: lasCuatasLokasLogo,
  },
  {
    id: 'las-jarochitas',
    hoursByDay: {
      0: [[600, 1080]],
      2: [[600, 1200]],
      3: [[600, 1200]],
      4: [[600, 1080]],
      5: [[600, 1260]],
      6: [[600, 1260]],
    },
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
    hoursByDay: {
      0: [[900, 1260]],
      3: [[900, 1260]],
      4: [[900, 1260]],
      5: [[900, 1260]],
      6: [[900, 1260]],
    },
    name: 'Nieve Casera Villegas',
    category: 'dessert',
    foodType: { en: 'Homemade ice cream & paletas', es: 'Nieve y paletas caseras' },
    hours: {
      en: 'Mon–Tue closed, Wed–Sun 3pm–9pm',
      es: 'Lun–Mar cerrado, Mié–Dom 3pm–9pm',
    },
    image: nieveCaseraTruck,
    logo: nieveCaseraLogo,
  },
  {
    id: 'pupusas-chileros',
    hoursByDay: {
      0: [[630, 1200]],
      1: [[630, 1200]],
      2: [[630, 1200]],
      3: [[630, 1200]],
      4: [[630, 1200]],
      5: [[630, 1380]],
      6: [[480, 1380]],
    },
    name: 'Pupusas Chileros',
    category: 'salvadoran',
    foodType: { en: 'Pupusas & Salvadoran food', es: 'Pupusas y comida salvadoreña' },
    hours: {
      en: 'Sun–Thu 10:30am–8pm, Fri 10:30am–11pm, Sat 8am–11pm',
      es: 'Dom–Jue 10:30am–8pm, Vie 10:30am–11pm, Sáb 8am–11pm',
    },
    image: pupusasChilerosTruck,
  },
  {
    id: 'que-rollon-sushi',
    hoursByDay: {
      0: [[840, 1260]],
      3: [[720, 1200]],
      4: [[720, 1200]],
      5: [[720, 1320]],
      6: [[720, 1320]],
    },
    name: 'Que Rollon Sushi',
    category: 'japanese',
    foodType: { en: 'Sushi & Japanese rolls', es: 'Sushi y rollos japoneses' },
    hours: {
      en: 'Wed–Thu 12pm–8pm, Fri–Sat 12pm–10pm, Sun 2pm–9pm, Mon–Tue closed',
      es: 'Mié–Jue 12pm–8pm, Vie–Sáb 12pm–10pm, Dom 2pm–9pm, Lun–Mar cerrado',
    },
    image: queRollonSushiTruck,
    logo: queRollonSushiLogo,
  },
  {
    id: 'syrian-house',
    // Split shift, both services every day: 11am-2pm (660-840) and 5pm-9pm
    // (1020-1260). Confirmed by Cynthia 2026-09-08.
    hoursByDay: {
      0: [
        [660, 840],
        [1020, 1260],
      ],
      1: [
        [660, 840],
        [1020, 1260],
      ],
      2: [
        [660, 840],
        [1020, 1260],
      ],
      3: [
        [660, 840],
        [1020, 1260],
      ],
      4: [
        [660, 840],
        [1020, 1260],
      ],
      5: [
        [660, 840],
        [1020, 1260],
      ],
      6: [
        [660, 840],
        [1020, 1260],
      ],
    },
    name: 'Syrian House Cuisine',
    category: 'middle-eastern',
    foodType: { en: 'Syrian & Middle Eastern food', es: 'Comida siria y del medio oriente' },
    hours: { en: 'Daily 11am–2pm, 5pm–9pm', es: 'Todos los días 11am–2pm, 5pm–9pm' },
    image: syrianHouseTruck,
  },
  {
    id: 'taqueria-romero',
    hoursByDay: {
      1: [[720, 1200]],
      2: [[720, 1200]],
      3: [[720, 1200]],
      4: [[720, 1200]],
      5: [[720, 1200]],
      6: [[720, 1320]],
    },
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
    hoursByDay: {
      0: [[720, 1230]],
      3: [[720, 1230]],
      4: [[720, 1230]],
      5: [[720, 1230]],
      6: [[720, 1230]],
    },
    name: 'The Red Marino',
    category: 'seafood',
    foodType: { en: 'Seafood & Mexican specialties', es: 'Mariscos y especialidades mexicanas' },
    hours: {
      en: 'Mon–Tue closed, Wed–Sun 12pm–8:30pm',
      es: 'Lun–Mar cerrado, Mié–Dom 12pm–8:30pm',
    },
    image: theRedMarinoTruck,
    logo: theRedMarinoLogo,
  },
  {
    id: 'tortilleria-el-patron',
    hoursByDay: {
      0: [[540, 1200]],
      1: [[540, 1200]],
      2: [[540, 1200]],
      3: [[540, 1200]],
      4: [[540, 1200]],
      5: [[540, 1200]],
      6: [[540, 1200]],
    },
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
