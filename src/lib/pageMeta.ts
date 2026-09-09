import { parkInfo, weeklyHours } from '../data/parkInfo';
import { LANGS, ROUTE_DEFS, langFromPath, pathFor } from './routes';
import type { RouteKey } from './routes';
import type { Lang } from '../i18n/translations';

export const SITE_URL = 'https://bestbitefoodpark.com';
export const SITE_NAME = 'Best Bite Food Park';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

/** Open Graph wants a full locale, not a bare language code. */
const OG_LOCALE: Record<Lang, string> = { en: 'en_US', es: 'es_US' };

interface Copy {
  title: string;
  description: string;
}

/**
 * Title and description for every page, in both languages.
 *
 * The Spanish is written from the Spanish page copy in translations.ts, not
 * machine-translated from the English, so it matches the words a Spanish
 * reader actually sees on the page.
 */
const PAGE_COPY: Record<RouteKey, Record<Lang, Copy>> = {
  home: {
    en: {
      title: 'Best Bite Food Park | Food Truck Park in Salem, OR',
      description:
        'A food truck park in Salem, OR with a rotating lineup of food trucks and family-friendly indoor and outdoor dining. Open daily 9am to 8pm.',
    },
    es: {
      title: 'Best Bite Food Park | Parque de Food Trucks en Salem, OR',
      description:
        'Un parque de food trucks en Salem, OR con una alineación rotativa de camiones y espacios para comer bajo techo y al aire libre. Abierto todos los días de 9am a 8pm.',
    },
  },
  foodTrucks: {
    en: {
      title: 'Food Trucks | Best Bite Food Park',
      // Lists what is actually on the lot. The previous version of this line
      // advertised boba, and the only boba vendor is commented out of
      // data/trucks.ts because it has not opened.
      description:
        'See the full lineup of food trucks at Best Bite Food Park in Salem, OR, from Mexican and Salvadoran food to sushi, Middle Eastern, seafood and dessert.',
    },
    es: {
      title: 'Food Trucks | Best Bite Food Park',
      description:
        'La alineación completa de food trucks en Best Bite Food Park en Salem, OR: comida mexicana, salvadoreña, japonesa, del medio oriente, mariscos y postres.',
    },
  },
  events: {
    en: {
      title: 'Events | Best Bite Food Park',
      description:
        'Theme nights and community events at Best Bite Food Park in Salem, OR. Check the calendar for what is coming up.',
    },
    es: {
      title: 'Eventos | Best Bite Food Park',
      description:
        'Noches temáticas y encuentros comunitarios en Best Bite Food Park en Salem, OR. Revisa el calendario para ver lo que se viene.',
    },
  },
  joinThePark: {
    en: {
      title: 'Lease a Food Cart Space in Salem, OR | Best Bite Food Park',
      description: `${parkInfo.availableSlots} of ${parkInfo.totalSlots} food truck spaces are available at Best Bite Food Park on Silverton Rd NE. $750 a month for your first three months.`,
    },
    es: {
      title: 'Renta un Espacio para Food Truck en Salem, OR | Best Bite Food Park',
      description: `${parkInfo.availableSlots} de ${parkInfo.totalSlots} espacios para food truck están libres en Best Bite Food Park en Silverton Rd NE. $750 al mes durante tus primeros tres meses.`,
    },
  },
  contact: {
    en: {
      title: 'Contact Us | Best Bite Food Park',
      description:
        'Questions about Best Bite Food Park, our food trucks, or planning an event? Get in touch with our team.',
    },
    es: {
      title: 'Contáctanos | Best Bite Food Park',
      description:
        '¿Tienes preguntas sobre Best Bite Food Park, nuestros food trucks o quieres planear un evento? Ponte en contacto con nuestro equipo.',
    },
  },
  privacyPolicy: {
    en: {
      title: 'Privacy Policy | Best Bite Food Park',
      description:
        'How Best Bite Food Park collects and uses information submitted through this website.',
    },
    es: {
      title: 'Aviso de Privacidad | Best Bite Food Park',
      description:
        'Cómo Best Bite Food Park recopila y usa la información enviada a través de este sitio web.',
    },
  },
};

export interface Alternate {
  /** `en`, `es`, or `x-default`. */
  hreflang: string;
  href: string;
}

export interface PageMetaEntry {
  key: RouteKey;
  lang: Lang;
  path: string;
  title: string;
  description: string;
  ogLocale: string;
  /** Absolute URL this page declares as its canonical. */
  canonical: string;
  /**
   * Every language version of THIS page, plus x-default. Each page in a set
   * must list every page in the set including itself, or Google ignores the
   * annotation.
   */
  alternates: Alternate[];
}

/**
 * Absolute URL with a trailing slash, because that is the form Cloudflare
 * Pages actually serves: `/events` returns a 308 to `/events/`. Declaring the
 * slashless form as canonical points Google at an address that redirects, so
 * every crawl pays a wasted hop.
 */
function absolute(path: string): string {
  return `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;
}

/**
 * One entry per address: six pages times two languages. The prerender script,
 * the sitemap and the client-side head updater all read this same list, so a
 * page cannot exist in one and be missing from another.
 */
export const PAGE_META: PageMetaEntry[] = ROUTE_DEFS.flatMap((route) =>
  LANGS.map((lang) => {
    const copy = PAGE_COPY[route.key][lang];
    const alternates: Alternate[] = [
      ...LANGS.map((l) => ({ hreflang: l, href: absolute(route.path[l]) })),
      // x-default is what Google serves a searcher whose language matches
      // neither version. English is the default here.
      { hreflang: 'x-default', href: absolute(route.path.en) },
    ];

    return {
      key: route.key,
      lang,
      path: route.path[lang],
      title: copy.title,
      description: copy.description,
      ogLocale: OG_LOCALE[lang],
      canonical: absolute(route.path[lang]),
      alternates,
    };
  }),
);

const DEFAULT_META: PageMetaEntry = {
  key: 'home',
  lang: 'en',
  path: '',
  title: SITE_NAME,
  description: 'Best Bite Food Park is a food truck park in Salem, OR.',
  ogLocale: OG_LOCALE.en,
  canonical: `${SITE_URL}/`,
  alternates: [],
};

export function getPageMeta(pathname: string): PageMetaEntry {
  const normalized =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return (
    PAGE_META.find((entry) => entry.path === normalized) ?? {
      ...DEFAULT_META,
      lang: langFromPath(normalized),
    }
  );
}

export { pathFor };

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

/**
 * schema.org LocalBusiness JSON-LD, built from the same `parkInfo` data the
 * rest of the site renders — never hand-duplicated, so it can't drift out of
 * sync.
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    image: DEFAULT_OG_IMAGE,
    telephone: parkInfo.phone,
    email: parkInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: parkInfo.address.line1,
      addressLocality: 'Salem',
      addressRegion: 'OR',
      postalCode: '97301-8655',
      addressCountry: 'US',
    },
    openingHoursSpecification: Object.entries(weeklyHours).flatMap(([dayIndex, schedule]) =>
      schedule
        ? [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: DAY_NAMES[Number(dayIndex)],
              opens: schedule.open,
              closes: schedule.close,
            },
          ]
        : [],
    ),
    sameAs: [parkInfo.social.instagram, parkInfo.social.facebook, parkInfo.social.tiktok],
  };
}
