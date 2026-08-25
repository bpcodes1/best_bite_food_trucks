// Post-build step (see package.json "build" script): renders every route to
// a real static HTML file under dist/, so GitHub Pages serves actual content
// at e.g. /food-trucks/ instead of a 404 that JS then redirects from. Without
// this, only "/" has real markup and every other route is invisible to any
// crawler or link-preview bot that doesn't execute JavaScript.
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

const { PAGE_META, render, getLocalBusinessSchema } = await import(
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

const jsonLdJson = JSON.stringify(getLocalBusinessSchema()).replace(/<\/script/gi, '<\\/script');
const jsonLdScript = `<script type="application/ld+json">${jsonLdJson}</script>`;

for (const { path, title, description } of PAGE_META) {
  const { html } = render(path);
  const canonicalUrl = `https://bpcodes1.github.io/best_bite_food_trucks${path}`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

  const page = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('<title>Best Bite Food Park</title>', `<title>${safeTitle}</title>`)
    .replace(
      '<meta name="description" content="Best Bite Food Park" />',
      `<meta name="description" content="${safeDescription}" />`,
    )
    .replace(
      'href="https://bpcodes1.github.io/best_bite_food_trucks/"',
      `href="${canonicalUrl}"`,
    )
    .replace(
      '<meta property="og:title" content="Best Bite Food Park" />',
      `<meta property="og:title" content="${safeTitle}" />`,
    )
    .replace(
      '<meta property="og:description" content="Best Bite Food Park" />',
      `<meta property="og:description" content="${safeDescription}" />`,
    )
    .replace(
      '<meta property="og:url" content="https://bpcodes1.github.io/best_bite_food_trucks/" />',
      `<meta property="og:url" content="${canonicalUrl}" />`,
    )
    .replace(
      '<meta name="twitter:title" content="Best Bite Food Park" />',
      `<meta name="twitter:title" content="${safeTitle}" />`,
    )
    .replace(
      '<meta name="twitter:description" content="Best Bite Food Park" />',
      `<meta name="twitter:description" content="${safeDescription}" />`,
    )
    .replace('<!-- SEO:JSONLD -->', jsonLdScript);

  const outDir = path === '/' ? distDir : join(distDir, path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), page);
  console.log(`prerendered ${path === '/' ? '/' : path + '/'}`);
}

// Regenerated from PAGE_META (the same list the prerender loop above just
// used) rather than left as a hand-maintained public/sitemap.xml copy, so it
// can't silently drift out of sync with the actual routes.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGE_META.map(
  ({ path }) =>
    `  <url>\n    <loc>https://bpcodes1.github.io/best_bite_food_trucks${path === '/' ? '/' : path}</loc>\n  </url>`,
).join('\n')}
</urlset>
`;
writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
console.log('wrote sitemap.xml');

rmSync(ssrDir, { recursive: true, force: true });
