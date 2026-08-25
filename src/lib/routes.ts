import type { Translations } from '../i18n/translations';

export type NavKey = keyof Translations['nav'];

export interface NavRoute {
  path: string;
  key: NavKey;
}

export const ROUTES = {
  home: '/',
  foodTrucks: '/food-trucks',
  events: '/events',
  joinThePark: '/join-the-park',
  contact: '/contact',
  privacyPolicy: '/privacy-policy',
} as const;

export const NAV_ROUTES: NavRoute[] = [
  { path: ROUTES.home, key: 'home' },
  { path: ROUTES.foodTrucks, key: 'foodTrucks' },
  { path: ROUTES.events, key: 'events' },
  { path: ROUTES.joinThePark, key: 'joinThePark' },
  { path: ROUTES.contact, key: 'contact' },
];
