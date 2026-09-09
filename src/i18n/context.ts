import { createContext } from 'react';
import type { Lang, Translations } from './translations';
import type { RouteKey } from '../lib/routes';

export interface LanguageContextValue {
  /** Read from the address. There is no language state anywhere. */
  lang: Lang;
  t: Translations;
  /** The address of a page in the current language. */
  path: (key: RouteKey) => string;
  /**
   * The address of the current page in another language. Falls back to that
   * language's home when the current address matches no route.
   */
  counterpartPath: (lang: Lang) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
