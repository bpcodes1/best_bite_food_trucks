import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { PAGE_META, getPageMeta, getLocalBusinessSchema } from './lib/pageMeta';

/**
 * Renders one route to a static HTML string at build time (see
 * scripts/prerender.mjs). This is prerendering, not true SSR/hydration — the
 * client bundle does a full `createRoot().render()` over this markup rather
 * than `hydrateRoot()`, so there's no hydration-mismatch risk from
 * client-only state (language auto-detect, matchMedia-driven layout, etc.).
 * The prerendered HTML exists purely so crawlers and link-preview bots that
 * don't run JS see real content instead of an empty shell.
 */
export function render(url: string) {
  // StaticRouter's `location` is matched against `basename` the same way
  // BrowserRouter matches a real `window.location.pathname` — it needs the
  // basename prefix included, unlike the plain `/food-trucks`-style paths
  // ROUTES/PAGE_META use for basename-relative <Link to> targets.
  const base = import.meta.env.BASE_URL;
  const fullLocation = url === '/' ? base : base.replace(/\/$/, '') + url;

  const html = renderToString(
    <StrictMode>
      <StaticRouter basename={base} location={fullLocation}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </StaticRouter>
    </StrictMode>,
  );

  return { html, meta: getPageMeta(url) };
}

export { PAGE_META, getLocalBusinessSchema };
