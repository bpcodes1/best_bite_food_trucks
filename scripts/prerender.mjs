// Post-build step (see package.json "build" script): renders every address to
// a real static HTML file under dist/, so the host serves actual content at
// e.g. /food-trucks/ instead of an empty shell that JS then fills in. Without
// this, only "/" has real markup and every other route is invisible to any
// crawler or link-preview bot that doesn't execute JavaScript.
//
// Six pages in two languages = twelve addresses. Each one is written in its
// own language, declares its own <html lang>, and carries hreflang links
// naming every language version of itself. That last part is what lets Google
// index the Spanish half at all: a language toggle changes what is on screen
// but not the address, and Google files pages by address.
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(rootDir, 'dist');
const ssrDir = join(rootDir, 'dist-ssr');

const ssrEntryFile = readdirSync(ssrDir).find((f) => /^entry-server.*\.m?js$/.test(f));
if (!ssrEntryFile) {
  throw new Error(`No entry-server bundle found in ${ssrDir}`);
}

const { PAGE_META, render, getLocalBusinessSchema, NOT_FOUND_URL } = await import(
  pathToFileURL(join(ssrDir, ssrEntryFile))
);

const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// A replacement that silently matches nothing would ship a page with the
// template's placeholder title still on it, which is exactly the kind of
// failure that looks fine until it is indexed. Fail the build instead.
function replaceOnce(html, find, replacement, label, path) {
  if (!html.includes(find)) {
    throw new Error(`prerender: no "${label}" placeholder found while rendering ${path}`);
  }
  return html.replace(find, replacement);
}

const jsonLdJson = JSON.stringify(getLocalBusinessSchema()).replace(/<\/script/gi, '<\\/script');
const jsonLdScript = `<script type="application/ld+json">${jsonLdJson}</script>`;

for (const entry of PAGE_META) {
  const { path, lang, title, description, canonical, alternates, ogLocale } = entry;
  const { html } = render(path);
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

  // Every page in an hreflang set lists every page in the set, itself
  // included. Google drops the whole annotation if the references are not
  // reciprocal.
  const alternateTags = alternates
    .map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
    .join('\n    ');

  const localeAlternates = alternates
    .filter((a) => a.hreflang !== 'x-default' && a.hreflang !== lang)
    .map((a) => `\n    <meta property="og:locale:alternate" content="${a.hreflang}_US" />`)
    .join('');

  let page = template;
  page = replaceOnce(page, '<html lang="en">', `<html lang="${lang}">`, 'html lang', path);
  page = replaceOnce(page, '<div id="root"></div>', `<div id="root">${html}</div>`, 'root', path);
  page = replaceOnce(
    page,
    '<title>Best Bite Food Park</title>',
    `<title>${safeTitle}</title>`,
    'title',
    path,
  );
  page = replaceOnce(
    page,
    '<meta name="description" content="Best Bite Food Park" />',
    `<meta name="description" content="${safeDescription}" />`,
    'description',
    path,
  );
  page = replaceOnce(
    page,
    'href="https://bestbitefoodpark.com/"',
    `href="${canonical}"`,
    'canonical',
    path,
  );
  page = replaceOnce(page, '<!-- SEO:ALTERNATES -->', alternateTags, 'alternates', path);
  page = replaceOnce(
    page,
    '<meta property="og:locale" content="en_US" />',
    `<meta property="og:locale" content="${ogLocale}" />${localeAlternates}`,
    'og:locale',
    path,
  );
  page = replaceOnce(
    page,
    '<meta property="og:title" content="Best Bite Food Park" />',
    `<meta property="og:title" content="${safeTitle}" />`,
    'og:title',
    path,
  );
  page = replaceOnce(
    page,
    '<meta property="og:description" content="Best Bite Food Park" />',
    `<meta property="og:description" content="${safeDescription}" />`,
    'og:description',
    path,
  );
  page = replaceOnce(
    page,
    '<meta property="og:url" content="https://bestbitefoodpark.com/" />',
    `<meta property="og:url" content="${canonical}" />`,
    'og:url',
    path,
  );
  page = replaceOnce(
    page,
    '<meta name="twitter:title" content="Best Bite Food Park" />',
    `<meta name="twitter:title" content="${safeTitle}" />`,
    'twitter:title',
    path,
  );
  page = replaceOnce(
    page,
    '<meta name="twitter:description" content="Best Bite Food Park" />',
    `<meta name="twitter:description" content="${safeDescription}" />`,
    'twitter:description',
    path,
  );
  page = replaceOnce(page, '<!-- SEO:JSONLD -->', jsonLdScript, 'jsonld', path);

  const outDir = path === '/' ? distDir : join(distDir, path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), page);
  console.log(`prerendered ${path === '/' ? '/' : path + '/'}  [${lang}]`);
}

// dist/404.html — the page Cloudflare Pages serves for any address that
// matches no file. It is generated here rather than kept as a static file in
// public/ so that it carries the real header, footer and styling.
//
// The previous public/404.html was a stub whose only content was
// `<meta http-equiv="refresh" content="0;url=/">`. The status code was already
// correct, but a person following a dead link was thrown to the homepage with
// no explanation and no idea the page they wanted was gone.
//
// It carries noindex and no canonical: a 404 should never be indexed, and
// pointing its canonical at a real page would invite Google to treat the two
// as the same page.
{
  const { html } = render(NOT_FOUND_URL);
  const title = 'Page not found | Best Bite Food Park';
  const description = 'That page does not exist. Browse the food trucks, events and hours at Best Bite Food Park in Salem, OR.';

  let page = template;
  page = replaceOnce(page, '<html lang="en">', '<html lang="en">', 'html lang', '404');
  page = replaceOnce(page, '<div id="root"></div>', `<div id="root">${html}</div>`, 'root', '404');
  page = replaceOnce(
    page,
    '<title>Best Bite Food Park</title>',
    `<title>${escapeHtml(title)}</title>`,
    'title',
    '404',
  );
  page = replaceOnce(
    page,
    '<meta name="description" content="Best Bite Food Park" />',
    `<meta name="description" content="${escapeHtml(description)}" />\n    <meta name="robots" content="noindex" />`,
    'description',
    '404',
  );
  page = replaceOnce(
    page,
    '<link rel="canonical" href="https://bestbitefoodpark.com/" />',
    '',
    'canonical',
    '404',
  );
  page = replaceOnce(page, '<!-- SEO:ALTERNATES -->', '', 'alternates', '404');
  page = replaceOnce(
    page,
    '<meta property="og:title" content="Best Bite Food Park" />',
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    'og:title',
    '404',
  );
  page = replaceOnce(page, '<!-- SEO:JSONLD -->', '', 'jsonld', '404');

  writeFileSync(join(distDir, '404.html'), page);
  console.log('prerendered 404.html  [en, noindex]');
}

// Regenerated from PAGE_META (the same list the loop above just used) rather
// than left as a hand-maintained public/sitemap.xml copy, so it can't silently
// drift out of sync with the actual routes. Each <url> carries the same
// hreflang set as the page itself, which is how Google is meant to be told
// about a translated page it has not crawled yet.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${PAGE_META.map(
  (entry) =>
    `  <url>\n    <loc>${entry.canonical}</loc>\n` +
    entry.alternates
      .map(
        (a) =>
          `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />\n`,
      )
      .join('') +
    `  </url>`,
).join('\n')}
</urlset>
`;
writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
console.log(`wrote sitemap.xml (${PAGE_META.length} urls)`);

rmSync(ssrDir, { recursive: true, force: true });
