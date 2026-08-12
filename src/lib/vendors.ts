/**
 * The nine vendors, and the only place their data lives.
 *
 * ORDER is Enrique's definitive roster in `food_trucks.txt` (2026-08-12).
 * Anyone not on that list does not appear on the site. `el_chilango.jpg` was
 * deleted on his instruction; Adan's Grill, Syrian House and La Flauta PDX are
 * out. Do not re-add any of them from an older source.
 *
 * WHERE THE DATA CAME FROM
 * Hours and cuisine were pulled from the vendors themselves by Bryan and lived
 * on `origin/main:src/data/trucks.ts`. Enrique confirmed the provenance
 * 2026-08-12: both came from the vendors, not from Google listings and not
 * written by us. That is what makes them usable under the never-invent-a-
 * client-fact rule. If a value is not in this file, we do not have it — do not
 * fill a gap from a vendor's Instagram, a delivery app, or a reasonable guess.
 *
 * WHAT WE DO NOT HAVE
 * Three vendors never sent hours. Bryan marked those "Hours coming soon" and
 * Enrique's call 2026-08-12 was to carry that wording across as-is rather than
 * convert it to the `pending()` bracket. It is an honest sentence rather than
 * data wearing a disguise, so it does not trip the placeholder rule — but note
 * that it is therefore INVISIBLE to `npm run pending`. `hoursKnown` is the flag
 * to filter on when you want the real list of what is still missing.
 *
 * HOURS ARE DISPLAY STRINGS, not structured data, because that is the form
 * they arrived in. They feed no schema. The park's own hours in `site.ts` stay
 * 24-hour for exactly the opposite reason — `openingHoursSpecification`
 * requires it. Do not try to make these two match in shape.
 *
 * NAMES ARE SPELLED THE WAY THE VENDOR SPELLS THEM, accents included, read off
 * their own logo. Enrique's call 2026-08-12. That is why this file carries
 * "Café Chula" and "Tortilleria El Patrón" but also "Taqueria Romero" and
 * "Que Rollon Sushi" — the first two set the accent on their signage and the
 * last two do not, and it is not our place to correct a business's spelling of
 * its own name. Do not run a tidy-up pass that adds the "missing" accents to
 * Taquería or ¿Qué Rollón?, and do not strip the ones that are here. Check the
 * logo in `src/assets/food_trucks/` before changing any name in this file.
 *
 * A vendor's hours are its own and routinely sit outside the park's 12:00–20:00.
 * Café Chula opens at 7am; Las Jarochitas closes at 9pm. That is real and not a
 * contradiction to "fix", but the Vendors page has to make clear whose hours
 * these are, or the page reads as disagreeing with itself. The Square site
 * printed two different sets of park hours on one page and Google read the
 * contradiction; this is the same failure by another route.
 */

import pupusasChileros from '../assets/food_trucks/pupusas_chileros.jpg'
import cafeChula from '../assets/food_trucks/cafe_chula.png'
import cafeChulaTruck from '../assets/food_trucks/cafe_chula_truck.jpg'
import lasJarochitas from '../assets/food_trucks/las_jarochitas.jpg'
import lasCuatasLokas from '../assets/food_trucks/las_cuatas_lokas.jpg'
import nieveCasera from '../assets/food_trucks/nieve_casera.jpeg'
import taqueriaRomero from '../assets/food_trucks/taqueria_romero.jpeg'
import theRedMarino from '../assets/food_trucks/the_red_marino.jpg'
import queRollonSushi from '../assets/food_trucks/que_rollon_sushi.jpg'
import elPatron from '../assets/food_trucks/tortilleria_el_patron_logo.png'
import elPatronTruck from '../assets/food_trucks/tortilleria_el_patron_truck.jpg'

export interface Vendor {
  /** Stable id. Never appears in a URL. */
  id: string
  name: string
  cuisine: Record<'en' | 'es', string>
  /** Display string, per language. `Hours coming soon` where none was sent. */
  hours: Record<'en' | 'es', string>
  /** False where the vendor never sent hours. The real missing-data list. */
  hoursKnown: boolean
  /** Every vendor has a logo. Nine of nine, checked by eye 2026-08-12. */
  logo: string
  /** A photograph of the truck. Only two vendors have one. */
  photo?: string
  /**
   * The ground the logo is drawn on, checked by eye. This is the containment
   * problem design.md § Components predicts, and it is worse than predicted:
   * the nine grounds are white, black, pink and a rainbow. A black-ground logo
   * dropped straight onto cream reads as a hole punched in the page, exactly
   * the way a white-ground logo reads on a dark card. The card container has to
   * neutralise all four — same box, same padding, same tile behind every one.
   */
  logoGround: 'white' | 'black' | 'colour'
}

export const VENDORS: Vendor[] = [
  {
    id: 'pupusas-chileros',
    name: 'Pupusas Chileros',
    cuisine: {
      en: 'Pupusas & Salvadoran food',
      es: 'Pupusas y comida salvadoreña',
    },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    hoursKnown: false,
    logo: pupusasChileros,
    logoGround: 'white',
  },
  {
    /* CUISINE CORRECTED, 2026-08-12. Bryan's file read "Coffee & Mexican
       breakfast"; the client context records Café Chula as Guatemalan coffee
       with a signature drink, Azul de la Sierra. Enrique's call was that the
       client context wins. The Mexican-breakfast half is dropped rather than
       merged — half a disputed line is still a disputed line. */
    id: 'cafe-chula',
    name: 'Café Chula',
    cuisine: { en: 'Guatemalan coffee', es: 'Café guatemalteco' },
    hours: {
      en: 'Mon–Thu 7am–2pm, Fri–Sat 7am–4pm, Sun 9am–4pm',
      es: 'Lun–Jue 7am–2pm, Vie–Sáb 7am–4pm, Dom 9am–4pm',
    },
    hoursKnown: true,
    logo: cafeChula,
    photo: cafeChulaTruck,
    logoGround: 'colour',
  },
  {
    id: 'las-jarochitas',
    name: 'Las Jarochitas',
    cuisine: {
      en: 'Veracruz-style Mexican food',
      es: 'Comida mexicana estilo veracruzano',
    },
    hours: {
      en: 'Mon closed, Tue–Wed 10am–8pm, Thu 10am–6pm, Fri–Sat 10am–9pm, Sun 10am–6pm',
      es: 'Lun cerrado, Mar–Mié 10am–8pm, Jue 10am–6pm, Vie–Sáb 10am–9pm, Dom 10am–6pm',
    },
    hoursKnown: true,
    logo: lasJarochitas,
    logoGround: 'white',
  },
  {
    id: 'las-cuatas-lokas',
    name: 'Las Cuatas Lokas',
    cuisine: { en: 'Mexican street food', es: 'Antojitos mexicanos' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    hoursKnown: false,
    logo: lasCuatasLokas,
    logoGround: 'black',
  },
  {
    /* The asset is a PHOTOGRAPH OF A STICKER held in someone's hand, fingers
       visible at the edge — not a logo file. It is the weakest asset in the
       repo and it cannot go in a card grid as-is. The sticker itself reads
       "Nieve Casera Villegas"; the roster says "Nieve Casera", so the shorter
       name is what ships until Ray says otherwise. */
    id: 'nieve-casera',
    name: 'Nieve Casera',
    cuisine: {
      en: 'Homemade ice cream & paletas',
      es: 'Nieve y paletas caseras',
    },
    hours: {
      en: 'Mon–Fri 2pm–8pm, Sat 12pm–8pm, Sun 11am–8pm',
      es: 'Lun–Vie 2pm–8pm, Sáb 12pm–8pm, Dom 11am–8pm',
    },
    hoursKnown: true,
    logo: nieveCasera,
    logoGround: 'colour',
  },
  {
    /* The logo reads "Taqueria Romero LLC". The LLC is dropped: it is a
       registration detail, not how the truck presents itself to a customer. */
    id: 'taqueria-romero',
    name: 'Taqueria Romero',
    cuisine: { en: 'Tacos & Mexican eats', es: 'Tacos y comida mexicana' },
    hours: {
      en: 'Mon–Fri 12pm–8pm, Sat 12pm–10pm, Sun closed',
      es: 'Lun–Vie 12pm–8pm, Sáb 12pm–10pm, Dom cerrado',
    },
    hoursKnown: true,
    logo: taqueriaRomero,
    logoGround: 'black',
  },
  {
    id: 'the-red-marino',
    name: 'The Red Marino',
    cuisine: {
      en: 'Seafood & Mexican specialties',
      es: 'Mariscos y especialidades mexicanas',
    },
    hours: {
      en: 'Mon–Tue closed, Wed–Sun 12:30pm–8:30pm',
      es: 'Lun–Mar cerrado, Mié–Dom 12:30pm–8:30pm',
    },
    hoursKnown: true,
    logo: theRedMarino,
    logoGround: 'white',
  },
  {
    /* Absent from Bryan's file entirely — no cuisine, no hours. Enrique's call
       2026-08-12 was to read the cuisine off the vendor's own logo, which sets
       "Sushi" under the name and draws a pair of chopsticks. Nothing else on
       that logo is used: it also carries a WhatsApp number and social handles,
       which are the vendor's contact details and not ours to publish.

       This is the vendor that answers Ray's stated recruiting goal — the park
       is "mostly Mexican" and he wants Asian food. See the open question in
       STATUS.md about whether the Únete recruiting line still stands. */
    id: 'que-rollon-sushi',
    name: 'Que Rollon Sushi',
    cuisine: { en: 'Sushi', es: 'Sushi' },
    hours: { en: 'Hours coming soon', es: 'Horario próximamente' },
    hoursKnown: false,
    logo: queRollonSushi,
    logoGround: 'black',
  },
  {
    /* NAME RESOLVED 2026-08-12, twice. Word order is Bryan's — Enrique kept
       "Tortilleria El Patron" after seeing that the logo sets "El Patrón" on
       the banner with TORTILLERIA beneath it. The accent then follows the
       sitewide rule below. `food_trucks.txt` was updated to match; the two no
       longer disagree. */
    id: 'el-patron',
    name: 'Tortilleria El Patrón',
    cuisine: {
      en: 'Fresh tortillas & Mexican eats',
      es: 'Tortillas frescas y comida mexicana',
    },
    hours: { en: 'Mon–Sun 9am–8pm', es: 'Lun–Dom 9am–8pm' },
    hoursKnown: true,
    logo: elPatron,
    photo: elPatronTruck,
    logoGround: 'white',
  },
]

/**
 * Vendors still owing us hours. `site.stalls.filled` must equal VENDORS.length
 * — if a vendor is added here and that number is not updated, Home and Únete
 * start advertising a stall count the Vendors page contradicts.
 */
export const VENDORS_MISSING_HOURS = VENDORS.filter((v) => !v.hoursKnown)
