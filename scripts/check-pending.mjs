// Lists every placeholder still in the source.
//
// Placeholders during a build are fine and useful. Placeholders that look like
// real data are how a fake phone number ships. Everything unfilled is wrapped
// in `pending()` from src/lib/site.ts, so it renders as visible brackets and so
// this script can find it.
//
// Matches the `pending(...)` call in source, not the rendered `[PENDIENTE ...]`
// string — the brackets only exist at runtime.
//
// Run before any client review: `npm run pending`

import fs from 'node:fs'
import path from 'node:path'

const ROOT = 'src'
const CALL_RE = /\bpending\(\s*['"`]([^'"`]+)['"`]/g

const hits = []

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'assets') walk(full)
      continue
    }
    if (!/\.(ts|tsx)$/.test(entry.name)) continue

    fs.readFileSync(full, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        // Skip comment lines so this file's own documentation of the pattern,
        // and any commented-out code, don't register as unfilled slots.
        const trimmed = line.trim()
        if (trimmed.startsWith('*') || trimmed.startsWith('//') || trimmed.startsWith('/*')) return

        for (const m of line.matchAll(CALL_RE)) {
          hits.push({ file: full, line: i + 1, what: m[1] })
        }
      })
  }
}

walk(ROOT)

if (hits.length === 0) {
  console.log('\nNo placeholders left. Every slot is filled with real data.\n')
  process.exit(0)
}

console.log(`\n${hits.length} placeholder${hits.length === 1 ? '' : 's'} still unfilled:\n`)
for (const h of hits) {
  console.log(`  ${h.what.padEnd(46)} ${h.file}:${h.line}`)
}
console.log('\nThese render as visible brackets on the page. Do not present a client')
console.log('review as final until this list is empty or every item left is deliberate.\n')
