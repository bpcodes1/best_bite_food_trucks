// Build step 3: writes real HTML for every address.
//
// Vite builds the browser bundle (dist/) and a server bundle (dist-ssr/), then
// this renders each address to a string and folds it into dist/index.html. The
// result is one finished HTML file per address, so crawlers that never run
// JavaScript still see the full page.
//
// Adding a page? Edit src/lib/routes.ts. Nothing here needs touching — the
// route list, the sitemap, and the router all read that one array.

import fs from 'node:fs'
import path from 'node:path'
import { render, ALL_PATHS, NOT_FOUND_URL, langFromPath, site } from './dist-ssr/entry-server.js'

const template = fs.readFileSync('dist/index.html', 'utf8')

// React 19 emits the page's hoisted <title>/<meta>/<link> at the front of the
// rendered string, ahead of the app markup. Split them off so they can go in
// <head> instead of the body.
const HEAD_RE = /^(?:<title[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)+/

// Catches the failure where a page renders its head tags but no markup — the
// crawler gets an empty shell and nobody notices until the rankings don't come.
//
// RAISE THIS TO ~500 once the pages have real content. It is 10 right now
// because the scaffold's pages are deliberately a single <h1> and nothing else.
const MIN_BODY_BYTES = 10

function buildPage(url) {
  const rendered = render(url)
  const head = (rendered.match(HEAD_RE) || [''])[0]
  const body = rendered.slice(head.length)

  if (!head.includes('<title')) {
    throw new Error(`No <title> rendered for ${url}. Check that the page uses <Seo>.`)
  }
  if (body.length < MIN_BODY_BYTES) {
    throw new Error(`Suspiciously little markup rendered for ${url} (${body.length} bytes).`)
  }

  // The <html lang> attribute has to match the page's language. A Spanish page
  // declaring lang="en" tells screen readers to pronounce it with English
  // phonetics and tells Google the page is English.
  const lang = url === NOT_FOUND_URL ? 'en' : langFromPath(url)

  const html = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

  if (html.includes('<div id="root"></div>')) {
    throw new Error(`Failed to inject markup for ${url}; root div not found in dist/index.html.`)
  }
  return html
}

function write(outPath, html) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html)
  console.log(`  ${outPath.padEnd(40)} ${(html.length / 1024).toFixed(0)} kB`)
}

// Flat files, not <route>/index.html. Cloudflare Pages serves foo.html at
// /foo, while foo/index.html only answers at /foo/ and 308s the bare path to
// it. Our canonicals and sitemap both declare the no-trailing-slash form, so a
// directory layout would point every canonical at a redirecting URL.
console.log(`\n[prerender] ${ALL_PATHS.length} addresses + 404`)
for (const url of ALL_PATHS) {
  write(url === '/' ? 'dist/index.html' : `dist${url}.html`, buildPage(url))
}
write('dist/404.html', buildPage(NOT_FOUND_URL))

// sitemap.xml is generated, not hand-maintained, so a new page can never be
// missing from it.
const urls = ALL_PATHS.map((p) => `  <url><loc>${site.origin}${p}</loc></url>`).join('\n')
fs.writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(`  dist/sitemap.xml                         ${ALL_PATHS.length} addresses`)
console.log('[prerender] done\n')
