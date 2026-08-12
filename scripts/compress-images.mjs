// Compresses every image in src/assets to web size, in place.
//
// The inherited assets arrived at camera/design-tool resolution — the worst
// was 2.7 MB for one photo against a 250 kB JS bundle, on a site whose job is
// ranking for local searches. This script is the fix, and it is safe to re-run:
// anything already at or under its class's ceiling is skipped.
//
// Originals are not kept on disk because git history already keeps them —
// every asset was committed at full size before this script first ran.
// `git show <commit>:<path>` recovers any of them.
//
// Two files are deliberately never touched:
//   src/assets/logo.png      — brand colours were SAMPLED from this file
//                              (#fdc20c / #010101, see design.md). It stays
//                              byte-identical as the source of truth.
//   src/assets/logo-256.png  — already sized for the header and footer.
//
// Run: npm run images

import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const NEVER_TOUCH = new Set(['src/assets/logo.png', 'src/assets/logo-256.png'])

// Per-class rules. Width is a ceiling, never an upscale (withoutEnlargement).
// The site renders nothing wider than the 1152px content column, so 1600px
// leaves headroom for full-bleed sections on 2x screens without absurdity.
const CLASSES = [
  {
    name: 'photo-jpeg',
    test: (p) => /\.(jpe?g)$/i.test(p),
    maxWidth: 1600,
    maxBytes: 300_000,
    out: (img) => img.jpeg({ quality: 75, mozjpeg: true }),
  },
  {
    name: 'photo-webp',
    test: (p) => /\.webp$/i.test(p),
    maxWidth: 1600,
    maxBytes: 300_000,
    out: (img) => img.webp({ quality: 78 }),
  },
  {
    // Vendor logos and event flyers arrive as heavyweight PNGs. Palette
    // quantisation keeps them PNG (some carry transparency; all carry hard
    // edges and text that webp-lossy can smear) at a fraction of the bytes.
    name: 'png',
    test: (p) => /\.png$/i.test(p),
    maxWidth: 1200,
    maxBytes: 250_000,
    out: (img) => img.png({ palette: true, quality: 90, compressionLevel: 9 }),
  },
]

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

let saved = 0
for (const file of walk('src/assets')) {
  const rel = file.split(path.sep).join('/')
  if (NEVER_TOUCH.has(rel)) continue

  const cls = CLASSES.find((c) => c.test(file))
  if (!cls) continue

  const before = fs.statSync(file).size
  const meta = await sharp(file).metadata()
  if (before <= cls.maxBytes && meta.width <= cls.maxWidth) continue

  const buf = await cls
    .out(sharp(file).resize({ width: cls.maxWidth, withoutEnlargement: true }))
    .toBuffer()

  // Never replace a file with a bigger one.
  if (buf.length >= before) continue

  fs.writeFileSync(file, buf)
  saved += before - buf.length
  console.log(
    `  ${rel.padEnd(52)} ${(before / 1024).toFixed(0).padStart(5)} kB -> ${(buf.length / 1024)
      .toFixed(0)
      .padStart(4)} kB`,
  )
}

console.log(`\n  total saved: ${(saved / 1024 / 1024).toFixed(1)} MB\n`)
