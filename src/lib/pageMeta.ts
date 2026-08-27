import { parkInfo, weeklyHours } from '../data/parkInfo';
import { ROUTES } from './routes';

export const SITE_URL = 'https://bpcodes1.github.io/best_bite_food_trucks';
export const SITE_NAME = 'Best Bite Food Park';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

export interface PageMetaEntry {
  path: string;
  title: string;
  description: string;
}

export const PAGE_META: PageMetaEntry[] = [
  {
    path: ROUTES.home,
    title: 'Best Bite Food Park | Food Truck Park in Salem, OR',
    description:
      'A food truck park in Salem, OR with a rotating lineup of food trucks, live music, and family-friendly indoor and outdoor dining. Open daily 12pm to 8pm.',
  },
  {
    path: ROUTES.foodTrucks,
    title: 'Food Trucks | Best Bite Food Park',
    description:
      'See the full lineup of food trucks at Best Bite Food Park in Salem, OR, from Mexican and Salvadoran food to seafood, boba, and dessert.',
  },
  {
    path: ROUTES.events,
    title: 'Events | Best Bite Food Park',
    description:
      'Live music, theme nights, and community events at Best Bite Food Park in Salem, OR. Check the calendar for what is coming up.',
  },
  {
    path: ROUTES.joinThePark,
    title: 'Lease a Food Cart Space in Salem, OR | Best Bite Food Park',
    description: `${parkInfo.availableSlots} of ${parkInfo.totalSlots} food truck spaces are available at Best Bite Food Park on Silverton Rd NE. Month to month, no long-term lease.`,
  },
  {
    path: ROUTES.contact,
    title: 'Contact Us | Best Bite Food Park',
    description:
      'Questions about Best Bite Food Park, our food trucks, or planning an event? Get in touch with our team.',
  },
  {
    path: ROUTES.privacyPolicy,
    title: 'Privacy Policy | Best Bite Food Park',
    description:
      'How Best Bite Food Park collects and uses information submitted through this website.',
  },
];

const DEFAULT_META: PageMetaEntry = {
  path: '',
  title: SITE_NAME,
  description: 'Best Bite Food Park is a food truck park in Salem, OR.',
};

export function getPageMeta(pathname: string): PageMetaEntry {
  return PAGE_META.find((entry) => entry.path === pathname) ?? DEFAULT_META;
}

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
      postalCode: '97301',
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
