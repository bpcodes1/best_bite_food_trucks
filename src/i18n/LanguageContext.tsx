import { useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { translations } from './translations';
import type { Lang } from './translations';
import { LanguageContext } from './context';
import type { LanguageContextValue } from './context';
import { counterpartPath, langFromPath, pathFor } from '../lib/routes';
import type { RouteKey } from '../lib/routes';

/**
 * Language is read from the address and nowhere else: `/es/...` is Spanish,
 * everything else is English.
 *
 * There is deliberately no stored preference and no browser-language
 * detection. The address is the preference, so a shared link opens in the
 * language it was shared in, a visitor is never moved somewhere they did not
 * ask to go, and Google sees exactly one language per address.
 *
 * This provider holds no state. It exists so that components can read `t`
 * and build links without each one re-deriving the language from the URL.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: translations[lang],
      path: (key: RouteKey) => pathFor(key, lang),
      counterpartPath: (target: Lang) => counterpartPath(pathname, target),
    }),
    [lang, pathname],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
