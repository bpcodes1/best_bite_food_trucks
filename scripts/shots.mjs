/**
 * `npm run shots` — screenshot every address of the built site, at every
 * width, in both languages, and measure sideways overflow while it is there.
 *
 * WHY THIS EXISTS AS A FILE. The browser-driving code for this was written
 * from scratch five times in one session and got it wrong twice: once the page
 * came out as mojibake because the prototype had no charset, and once it
 * measured at 980px while claiming to be at 375, which made a "no overflow"
 * reading worthless. Every trap below cost a real round-trip. They are fixed
 * here so nobody has to remember them again.
 *
 * WHAT IT IS NOT. This is not a routing check. It serves `dist/` from a local
 * static server written at the bottom of this file, so of course every address
 * answers — that proves nothing about Cloudflare Pages. Routing is verified
 * with `curl -I` against the live host and nowhere else. See CLAUDE.md.
 *
 * THE FIVE TRAPS, all of them load-bearing:
 *
 * 1. `--window-size` is not a viewport. Headless Chrome renders at its own
 *    default minimum layout width and hands you a picture of a bug that does
 *    not exist. The width has to be set through the DevTools Protocol with
 *    `Emulation.setDeviceMetricsOverride`.
 * 2. `captureBeyondViewport` never fires `loading="lazy"`. Anything below the
 *    fold photographs as a blank box unless every image is forced eager and
 *    `decode()`d first.
 * 3. Fonts. Capture before `document.fonts.ready` and the type is the fallback
 *    stack, which is a different layout from the one being reviewed.
 * 4. The scroll reveal. Cards caught mid-transition photograph half-faded and
 *    read as a design defect. A fixed wait does not fix it, because the reveal
 *    only starts when the card enters view. Reduced motion is emulated (which
 *    makes `useReveal` bail before it ever adds `.js-reveal`) and an
 *    `!important` override is injected on top, so it cannot matter either way.
 * 5. Overflow is a number, not an impression. `document.documentElement`'s
 *    `scrollWidth` against the emulated width, printed, and a non-zero exit if
 *    any page is wider than its viewport.
 *
 * USAGE
 *   npm run shots                    every page, 375 and 768, both languages
 *   npm run shots -- vendors         only that route key
 *   npm run shots -- vendors 1280    that route key, at 1280 as well
 *   npm run shots -- es 375          Spanish only, phone width only
 *   npm run shots -- --fold          also capture the first screen alone
 *   npm run shots -- --stale-ok      skip the "dist is older than src" guard
 *
 * Positional arguments are order-free: numbers are widths, `en`/`es` filter
 * language, anything else is matched against a route key from
 * `src/lib/routes.ts`.
 *
 * Output goes to `qa-screenshots/`, which is git-ignored. Nothing here ships.
 */

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import http from 'node:http'
import net from 'node:net'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const OUT = path.join(ROOT, 'qa-screenshots')

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

/** 375 and 768 are where the layout switches, so they are where it breaks. */
const DEFAULT_WIDTHS = [375, 768]

/** Tall enough that the fold sits somewhere believable. Full-page capture
 *  ignores this; it only decides what `--fold` frames. */
const VIEWPORT_HEIGHT = { 375: 812, 768: 1024, 1280: 800, 1440: 900 }

/** Retina, the way a phone actually renders. Chrome's texture ceiling is
 *  16384 device pixels, so a very long page drops to 1x rather than truncate. */
const SCALE = 2
const MAX_DEVICE_PX = 16000

// ---------------------------------------------------------------------------
// Arguments
// ---------------------------------------------------------------------------

const argv = process.argv.slice(2)
const flags = new Set(argv.filter((a) => a.startsWith('--')))
const positional = argv.filter((a) => !a.startsWith('--'))

const widths = positional.filter((a) => /^\d+$/.test(a)).map(Number)
const langFilter = positional.filter((a) => a === 'en' || a === 'es')
const keyFilter = positional.filter((a) => !/^\d+$/.test(a) && a !== 'en' && a !== 'es')

// ---------------------------------------------------------------------------
// The route list comes from the same array the site is built from
// ---------------------------------------------------------------------------

// Imported from the SSR bundle rather than the TypeScript source, exactly as
// prerender.mjs does it. That guarantees the screenshots cover the addresses
// that were actually generated, not the ones the source says should exist.
if (!fs.existsSync(path.join(ROOT, 'dist-ssr/entry-server.js'))) {
  console.error('\n  No dist-ssr/entry-server.js. Run `npm run build` first.\n')
  process.exit(1)
}
const { ROUTES, LANGS } = await import(path.join(ROOT, 'dist-ssr/entry-server.js'))

// ---------------------------------------------------------------------------
// Guard: never photograph a build older than the source
// ---------------------------------------------------------------------------

/**
 * Screenshotting a stale `dist/` is the same failure as verifying a deploy
 * against the old build: everything looks fine and nothing you changed is in
 * the picture. Cheap to check, so it is checked.
 */
function newestMtime(dir, skip = new Set(['node_modules', '.git'])) {
  let newest = 0
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (skip.has(entry.name)) continue
      const full = path.join(d, entry.name)
      if (entry.isDirectory()) walk(full)
      else newest = Math.max(newest, fs.statSync(full).mtimeMs)
    }
  }
  walk(dir)
  return newest
}

if (!fs.existsSync(DIST)) {
  console.error('\n  No dist/. Run `npm run build` first.\n')
  process.exit(1)
}
if (!flags.has('--stale-ok')) {
  const srcTime = newestMtime(path.join(ROOT, 'src'))
  const distTime = newestMtime(DIST)
  if (srcTime > distTime) {
    const mins = Math.round((srcTime - distTime) / 60000)
    console.error(
      `\n  dist/ is ${mins} minute(s) older than src/. These would be pictures of the\n` +
        '  previous build. Run `npm run build`, or pass --stale-ok if that is what you want.\n',
    )
    process.exit(1)
  }
}

// ---------------------------------------------------------------------------
// What to capture
// ---------------------------------------------------------------------------

const routes = keyFilter.length
  ? ROUTES.filter((r) => keyFilter.some((k) => r.key.startsWith(k)))
  : ROUTES
const langs = langFilter.length ? langFilter : LANGS
const useWidths = widths.length ? widths : DEFAULT_WIDTHS

if (!routes.length) {
  console.error(`\n  No route matches ${keyFilter.join(', ')}.`)
  console.error(`  Known keys: ${ROUTES.map((r) => r.key).join(', ')}\n`)
  process.exit(1)
}

const shots = []
for (const route of routes) {
  for (const lang of langs) {
    for (const width of useWidths) {
      shots.push({ key: route.key, lang, width, urlPath: route.path[lang] })
    }
  }
}

// ---------------------------------------------------------------------------
// Minimal DevTools Protocol client. Node 24 ships a global WebSocket, so this
// needs no dependency at all.
// ---------------------------------------------------------------------------

class CDP {
  #ws
  #nextId = 1
  #pending = new Map()
  #listeners = new Map()

  static async connect(url) {
    const client = new CDP()
    client.#ws = new WebSocket(url)
    client.#ws.addEventListener('message', (ev) => client.#onMessage(ev.data))
    await new Promise((resolve, reject) => {
      client.#ws.addEventListener('open', resolve, { once: true })
      client.#ws.addEventListener('error', reject, { once: true })
    })
    return client
  }

  #onMessage(raw) {
    const msg = JSON.parse(raw)
    if (msg.id && this.#pending.has(msg.id)) {
      const { resolve, reject } = this.#pending.get(msg.id)
      this.#pending.delete(msg.id)
      msg.error
        ? reject(new Error(`${msg.error.message} (${msg.error.code})`))
        : resolve(msg.result)
      return
    }
    if (msg.method) {
      for (const fn of this.#listeners.get(msg.method) ?? []) fn(msg.params)
    }
  }

  send(method, params = {}, sessionId) {
    const id = this.#nextId++
    const payload = { id, method, params }
    if (sessionId) payload.sessionId = sessionId
    this.#ws.send(JSON.stringify(payload))
    return new Promise((resolve, reject) => this.#pending.set(id, { resolve, reject }))
  }

  once(method) {
    return new Promise((resolve) => {
      const fn = (params) => {
        this.#listeners.set(
          method,
          (this.#listeners.get(method) ?? []).filter((f) => f !== fn),
        )
        resolve(params)
      }
      this.#listeners.set(method, [...(this.#listeners.get(method) ?? []), fn])
    })
  }

  close() {
    this.#ws.close()
  }
}

// ---------------------------------------------------------------------------
// The page-prep script. Runs in the browser, before every capture.
// ---------------------------------------------------------------------------

const PREPARE = `(async () => {
  // Trap 4, belt to the emulated reduced-motion braces. Tailwind v4 emits
  // \`translate\` and \`scale\` as their own properties rather than folding them
  // into \`transform\`, so all of them are pinned.
  const style = document.createElement('style')
  style.textContent = \`
    *, *::before, *::after {
      transition: none !important;
      animation: none !important;
      scroll-behavior: auto !important;
    }
    .reveal, .js-reveal .reveal {
      opacity: 1 !important;
      transform: none !important;
      translate: none !important;
      scale: none !important;
      rotate: none !important;
    }\`
  document.head.appendChild(style)
  document.documentElement.classList.remove('js-reveal')
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-revealed'))

  // Trap 2. captureBeyondViewport paints the whole page but never scrolls it,
  // so a lazy image below the fold is never asked to load.
  const imgs = [...document.images]
  for (const img of imgs) img.loading = 'eager'
  await Promise.allSettled(imgs.map((img) => img.decode().catch(() => {})))

  // Trap 3.
  await document.fonts.ready

  // Two frames, so the injected stylesheet and any layout it caused are done.
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

  const doc = document.documentElement
  return JSON.stringify({
    // Trap 5.
    scrollWidth: doc.scrollWidth,
    clientWidth: doc.clientWidth,
    scrollHeight: Math.max(doc.scrollHeight, document.body.scrollHeight),
    title: document.title,
    // Named docLang, not lang, so it cannot overwrite the language this shot
    // was requested in when the two objects are merged.
    docLang: doc.lang,
    imageCount: imgs.length,
    // A missing asset is complete with no intrinsic size. Worth catching here,
    // because it photographs as an empty box that reads like a design choice.
    brokenImages: imgs
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src),
    // Whatever is actually sticking out, so a fix has somewhere to start.
    widest: (() => {
      if (doc.scrollWidth <= doc.clientWidth) return null
      let worst = null
      for (const el of document.body.querySelectorAll('*')) {
        const r = el.getBoundingClientRect()
        const over = Math.round(r.right - doc.clientWidth)
        if (over > 1 && (!worst || over > worst.over)) {
          worst = {
            over,
            tag: el.tagName.toLowerCase(),
            cls: (el.getAttribute('class') || '').slice(0, 90),
          }
        }
      }
      return worst
    })(),
  })
})()`

// ---------------------------------------------------------------------------
// Static server over dist/. Resolves /vendors to dist/vendors.html the way
// Cloudflare Pages does — but see the header: this proves nothing about Pages.
// ---------------------------------------------------------------------------

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0])
  const rel = clean.replace(/^\/+/, '').replace(/\/+$/, '')
  const candidates = rel ? [rel, `${rel}.html`, path.join(rel, 'index.html')] : ['index.html']
  for (const candidate of candidates) {
    const full = path.resolve(DIST, candidate)
    // Never serve outside dist/, whatever the request says.
    if (!full.startsWith(DIST + path.sep) && full !== DIST) continue
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return full
  }
  return null
}

function startServer() {
  const server = http.createServer((req, res) => {
    const file = resolveFile(req.url)
    if (!file) {
      const notFound = path.join(DIST, '404.html')
      res.writeHead(404, { 'content-type': MIME['.html'] })
      res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'Not found')
      return
    }
    res.writeHead(200, {
      'content-type': MIME[path.extname(file)] ?? 'application/octet-stream',
      // No caching, so a rebuild mid-session can never be photographed stale.
      'cache-control': 'no-store',
    })
    fs.createReadStream(file).pipe(res)
  })
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }))
  })
}

async function freePort() {
  return new Promise((resolve) => {
    const probe = net.createServer()
    probe.listen(0, '127.0.0.1', () => {
      const { port } = probe.address()
      probe.close(() => resolve(port))
    })
  })
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

fs.mkdirSync(OUT, { recursive: true })

const { server, port } = await startServer()
const debugPort = await freePort()
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'bb-shots-'))

if (!fs.existsSync(CHROME)) {
  console.error(`\n  Chrome not found at:\n    ${CHROME}\n`)
  process.exit(1)
}

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profile}`,
    // Otherwise a scrollbar eats ~15px of the viewport and reads as overflow.
    '--hide-scrollbars',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    'about:blank',
  ],
  { stdio: 'ignore' },
)

let cleanedUp = false
const cleanup = () => {
  if (cleanedUp) return
  cleanedUp = true
  try {
    chrome.kill()
  } catch {
    /* already gone */
  }
  server.close()
  // Chrome is still flushing its profile as this runs, so the first unlink can
  // fail with ENOTEMPTY. Retry, and if it still will not go, leave it: a stray
  // temp directory is not worth failing a screenshot run over.
  try {
    fs.rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 })
  } catch {
    /* the OS will reap it */
  }
}
process.on('exit', cleanup)
process.on('SIGINT', () => {
  cleanup()
  process.exit(130)
})

/** Chrome takes a moment to open the debugging port. Poll rather than guess. */
async function browserWsUrl() {
  const deadline = Date.now() + 15000
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/version`)
      const json = await res.json()
      if (json.webSocketDebuggerUrl) return json.webSocketDebuggerUrl
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 120))
  }
  throw new Error('Chrome never opened its debugging port.')
}

const browser = await CDP.connect(await browserWsUrl())
const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true })

await browser.send('Page.enable', {}, sessionId)
await browser.send('Runtime.enable', {}, sessionId)
// Trap 4, the half of it that stops the reveal before it can ever start.
await browser.send(
  'Emulation.setEmulatedMedia',
  { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] },
  sessionId,
)

const results = []

for (const shot of shots) {
  const height = VIEWPORT_HEIGHT[shot.width] ?? 900

  // Trap 1. This, and never --window-size.
  await browser.send(
    'Emulation.setDeviceMetricsOverride',
    {
      width: shot.width,
      height,
      deviceScaleFactor: SCALE,
      mobile: shot.width < 768,
    },
    sessionId,
  )

  const loaded = browser.once('Page.loadEventFired')
  await browser.send('Page.navigate', { url: `http://127.0.0.1:${port}${shot.urlPath}` }, sessionId)
  await loaded

  const { result } = await browser.send(
    'Runtime.evaluate',
    { expression: PREPARE, awaitPromise: true, returnByValue: true },
    sessionId,
  )
  const info = JSON.parse(result.value)

  const metrics = await browser.send('Page.getLayoutMetrics', {}, sessionId)
  const contentHeight = Math.ceil(metrics.cssContentSize?.height ?? info.scrollHeight)

  // Chrome cannot allocate past its texture ceiling. Drop sharpness rather
  // than silently hand back a cropped page.
  let scale = SCALE
  let note = ''
  if (contentHeight * scale > MAX_DEVICE_PX) {
    scale = 1
    note = ' (1x — page too long for 2x)'
  }

  const capture = async (clip, suffix) => {
    const { data } = await browser.send(
      'Page.captureScreenshot',
      { format: 'png', captureBeyondViewport: true, clip: { ...clip, scale } },
      sessionId,
    )
    const file = path.join(OUT, `${shot.key}-${shot.lang}-${shot.width}-${suffix}.png`)
    fs.writeFileSync(file, Buffer.from(data, 'base64'))
    return file
  }

  const fullFile = await capture(
    { x: 0, y: 0, width: shot.width, height: Math.min(contentHeight, MAX_DEVICE_PX / scale) },
    'full',
  )
  if (flags.has('--fold')) {
    await capture({ x: 0, y: 0, width: shot.width, height }, 'fold')
  }

  const overflow = info.scrollWidth - info.clientWidth
  results.push({ ...shot, ...info, overflow, contentHeight, file: path.basename(fullFile), note })

  const flag = overflow > 0 ? `OVERFLOW +${overflow}px` : 'ok'
  console.log(
    `  ${path.basename(fullFile).padEnd(30)} ${String(shot.width).padStart(4)}px  ` +
      `${String(contentHeight).padStart(5)}px tall  ${flag}${note}`,
  )
}

browser.close()
cleanup()
process.removeAllListeners('exit')

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const overflowing = results.filter((r) => r.overflow > 0)
const broken = results.filter((r) => r.brokenImages.length)
const untitled = results.filter((r) => !r.title)
// A Spanish page declaring lang="en" tells a screen reader to use English
// phonetics and tells Google the page is English. Free to check while here.
const wrongLang = results.filter((r) => r.docLang !== r.lang)

console.log(`\n  ${results.length} screenshots in qa-screenshots/`)

if (broken.length) {
  console.log('\n  IMAGES THAT DID NOT LOAD:')
  for (const r of broken) {
    console.log(`    ${r.key} ${r.lang} @${r.width}: ${r.brokenImages.join(', ')}`)
  }
}
if (untitled.length) {
  console.log('\n  PAGES WITH NO <title>:')
  for (const r of untitled) console.log(`    ${r.key} ${r.lang} @${r.width}`)
}
if (wrongLang.length) {
  console.log('\n  WRONG <html lang>:')
  for (const r of wrongLang) {
    console.log(`    ${r.key} @${r.width}: expected "${r.lang}", got "${r.docLang}"`)
  }
}
if (overflowing.length) {
  console.log('\n  SIDEWAYS OVERFLOW — the page is wider than the phone:')
  for (const r of overflowing) {
    const w = r.widest
    console.log(
      `    ${r.key} ${r.lang} @${r.width}: +${r.overflow}px` +
        (w ? `  widest: <${w.tag} class="${w.cls}"> sticking out ${w.over}px` : ''),
    )
  }
}

// The README is rewritten every run, so it can never describe an older set.
fs.writeFileSync(
  path.join(OUT, 'README.txt'),
  [
    `QA screenshots of the local build, taken ${new Date().toISOString().slice(0, 10)}.`,
    'Generated by `npm run shots`. This folder is git-ignored; nothing here ships.',
    '',
    'FILE NAMES',
    '  <page>-<language>-<width>-full.png    the whole page, top to bottom',
    '  <page>-<language>-<width>-fold.png    just the first screen (--fold only)',
    '',
    'The number in the name is the width the page was TESTED at. The image file',
    `is ${SCALE}x that many pixels wide, because it is captured at retina sharpness the`,
    'way a phone renders. A phone screenshot doubles the same way.',
    '',
    'WHAT THESE DO NOT PROVE',
    '  Routing. These are served by a local static server, so every address',
    '  answering here says nothing about Cloudflare Pages. Use `curl -I` against',
    '  the live host for that.',
    '',
    'THIS RUN',
    ...results.map(
      (r) =>
        `  ${r.file.padEnd(32)} ${String(r.contentHeight).padStart(5)}px tall, ` +
        (r.overflow > 0 ? `OVERFLOW +${r.overflow}px` : 'no overflow'),
    ),
  ].join('\n') + '\n',
)

if (overflowing.length || broken.length || untitled.length || wrongLang.length) {
  console.log('')
  process.exit(1)
}
console.log('  No overflow, no broken images, every page titled.\n')
