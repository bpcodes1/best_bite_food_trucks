#!/usr/bin/env node
/**
 * npm run images
 *
 * Drop photos in photos-inbox/<bucket>/, run this, get correctly sized webp
 * in src/assets/. Named after the file you dropped in.
 *
 * Everything here exists because of a specific thing that went wrong on
 * 2026-09-12, when eight photos took ten minutes of rediscovery:
 *
 *   - iPhone HEIC files are rejected by the libheif build inside sharp
 *     ("Number of references in iref box exceeds the security limits").
 *     macOS `sips` decodes them fine, so HEIC goes through sips first.
 *   - Phone photos are stored LANDSCAPE with an EXIF rotation flag. Without
 *     .rotate() every one of them lands on its side.
 *   - Every destination has its own shape, and getting it wrong means the
 *     card crops the subject out. The presets below are read off the
 *     components, not guessed.
 */
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdtempSync, readdirSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');

let sharp;
try {
  sharp = createRequire(path.join(HERE, 'noop.js'))('sharp');
} catch {
  console.error(
    '\n  sharp is not installed for the image tools.\n\n' +
      '  Run this once, then never again:\n\n' +
      '      cd tools/images && npm install && cd ../..\n\n' +
      '  It installs only here, not in the site. The root package.json is\n' +
      '  untouched on purpose so Cloudflare never builds a native binary.\n'
  );
  process.exit(1);
}

/**
 * Shapes are read off the components that render them:
 *   carousel      FanGallery card is 288x384 css, so 3:4 at 2x
 *   trucks        TruckCard photo box is aspect-[4/3]
 *   logos         TruckCard badge is a 80px circle, so square
 *   recent-events RecentEventGallery is 3:4
 *   events        EventCard is aspect-[4/5] BUT a flyer is mostly text, and
 *                 cropping one cuts the date off. Flyers keep their own
 *                 shape and are only capped in width.
 */
const BUCKETS = {
  carousel: { dir: 'src/assets/food_carousel', w: 600, h: 800, quality: 80 },
  trucks: { dir: 'src/assets/food_trucks', w: 1200, h: 900, quality: 82 },
  logos: { dir: 'src/assets/food_trucks', w: 512, h: 512, quality: 88 },
  'recent-events': { dir: 'src/assets/recent_event', w: 900, h: 1200, quality: 80 },
  events: { dir: 'src/assets/events', w: 1200, h: null, quality: 82 },
};

const DECODE_FIRST = new Set(['.heic', '.heif']);
const ACCEPTED = new Set(['.heic', '.heif', '.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

const force = process.argv.includes('--force');

function slug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

const tmp = mkdtempSync(path.join(tmpdir(), 'bestbite-img-'));
const done = [];
const skipped = [];
const warnings = [];

for (const [bucket, preset] of Object.entries(BUCKETS)) {
  const inbox = path.join(ROOT, 'photos-inbox', bucket);
  if (!existsSync(inbox)) {
    mkdirSync(inbox, { recursive: true });
    continue;
  }

  for (const file of readdirSync(inbox).sort()) {
    const ext = path.extname(file).toLowerCase();
    if (file.startsWith('.') || !ACCEPTED.has(ext)) continue;

    const src = path.join(inbox, file);
    const name = slug(path.basename(file, path.extname(file)));
    const outDir = path.join(ROOT, preset.dir);
    const out = path.join(outDir, `${name}.webp`);
    mkdirSync(outDir, { recursive: true });

    if (existsSync(out) && !force) {
      skipped.push([bucket, file, `${name}.webp already exists, use --force to replace`]);
      continue;
    }

    // HEIC goes through the macOS decoder; sharp's libheif refuses iPhone files.
    let input = src;
    if (DECODE_FIRST.has(ext)) {
      input = path.join(tmp, `${name}.jpg`);
      execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', 'best', src, '--out', input], {
        stdio: 'ignore',
      });
    }

    // .rotate() with no argument applies the EXIF orientation flag. Without
    // it, phone photos come out on their side.
    let pipeline = sharp(input).rotate();
    const meta = await sharp(input).rotate().metadata();

    if (preset.h === null) {
      // Flyers keep their own shape; only the width is capped.
      pipeline = pipeline.resize(preset.w, null, { fit: 'inside', withoutEnlargement: true });
    } else {
      if (meta.width < preset.w || meta.height < preset.h) {
        warnings.push(
          `${bucket}/${file} is ${meta.width}x${meta.height}, smaller than the ${preset.w}x${preset.h} it is being written at. It will look soft.`
        );
      }
      pipeline = pipeline.resize(preset.w, preset.h, { fit: 'cover', position: 'attention' });
    }

    const info = await pipeline.webp({ quality: preset.quality }).toFile(out);
    done.push([bucket, file, `${name}.webp`, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`]);
  }
}

if (!done.length && !skipped.length) {
  console.log('\n  Nothing in photos-inbox. Buckets available:\n');
  for (const [b, p] of Object.entries(BUCKETS)) {
    console.log(`      photos-inbox/${b.padEnd(15)} -> ${p.dir}  ${p.h ? `${p.w}x${p.h}` : `${p.w} wide, uncropped`}`);
  }
  console.log('\n  Name each file what you want the asset called. quesatacos.heic becomes quesatacos.webp.\n');
  process.exit(0);
}

if (done.length) {
  console.log('\n  Written:\n');
  for (const [bucket, from, to, dims, size] of done) {
    console.log(`      ${bucket.padEnd(15)} ${from.padEnd(26)} -> ${to.padEnd(30)} ${dims.padEnd(11)} ${size}`);
  }
}

if (skipped.length) {
  console.log('\n  Skipped:\n');
  for (const [bucket, file, why] of skipped) console.log(`      ${bucket.padEnd(15)} ${file.padEnd(26)} ${why}`);
}

if (warnings.length) {
  console.log('\n  Warnings:\n');
  for (const w of warnings) console.log(`      ${w}`);
}

console.log(
  '\n  Written into src/assets. Nothing renders until it is imported:\n' +
    '      carousel      -> src/data/foods.ts\n' +
    '      trucks/logos  -> src/data/trucks.ts\n' +
    '      events        -> src/data/events.ts\n' +
    '  Alt text lives beside the image in those files and is a sentence in\n' +
    '  BOTH languages. Swapping a photo without rewriting it ships a false\n' +
    '  description.\n'
);
