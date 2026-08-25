import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta, SITE_URL } from '../lib/pageMeta';

function setMetaContent(selector: string, content: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', content);
}

/**
 * Keeps the browser tab title, meta description, canonical link, and OG/
 * Twitter tags in sync with the current route on client-side navigation.
 * The prerender step (scripts/prerender.mjs) sets the same values in the
 * static HTML for each route's first paint — this covers everything after,
 * since React Router swaps pages without a full document reload.
 */
export function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    const canonicalUrl = `${SITE_URL}${pathname}`;

    document.title = meta.title;
    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', canonicalUrl);
  }, [pathname]);

  return null;
}
