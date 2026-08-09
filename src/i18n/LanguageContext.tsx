import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { translations } from './translations';
import type { Lang } from './translations';
import { LanguageContext } from './context';
import type { LanguageContextValue } from './context';

const STORAGE_KEY = 'best-bite-lang';

// localStorage can throw (private browsing, sandboxed test environments, etc.),
// so reads/writes are best-effort and never block rendering.
function readStoredLang(): Lang | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'es' ? stored : null;
  } catch {
    return null;
  }
}

function writeStoredLang(lang: Lang): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore
  }
}

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';

  const stored = readStoredLang();
  if (stored) return stored;

  return window.navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    writeStoredLang(lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'en' ? 'es' : 'en'));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggleLang, t: translations[lang] }),
    [lang, setLang, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
