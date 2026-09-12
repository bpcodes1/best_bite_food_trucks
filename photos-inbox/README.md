# photos-inbox

Drop photos in the right folder, name them what you want the file called, run
`npm run images`. Correctly sized `.webp` lands in `src/assets/`.

Photos dropped here are ignored by git. The originals live in
`../best-bite-project/photos/` and stay there.

| Put it in | It goes to | Shape |
| --- | --- | --- |
| `carousel/` | `src/assets/food_carousel/` | 600x800, cropped |
| `trucks/` | `src/assets/food_trucks/` | 1200x900, cropped |
| `logos/` | `src/assets/food_trucks/` | 512x512, cropped |
| `recent-events/` | `src/assets/recent_event/` | 900x1200, cropped |
| `events/` | `src/assets/events/` | 1200 wide, NOT cropped |

Flyers are the exception that keeps its own shape. Crop one to a card and you
cut the date off it.

`quesatacos.heic` becomes `quesatacos.webp`. Spaces and capitals get turned
into underscores and lowercase, so `Club Sandwich.HEIC` becomes
`club_sandwich.webp`.

iPhone HEIC files work. So do jpg, png, tif and webp.

## First time on a machine

```
cd tools/images && npm install && cd ../..
```

Once, ever. It installs `sharp` inside `tools/images` only. The site's own
`package.json` has no image dependency on purpose, because Cloudflare installs
the root packages on every push and this is the live site with no staging step.

## Two things it does that are easy to get wrong by hand

Phone photos are stored sideways with a rotation flag. This applies it. Skip
that step and every photo lands on its side.

The copy of `sharp` that reads HEIC refuses iPhone files outright. This decodes
them with the Mac's own decoder first.

## After it runs

The file exists but nothing shows it yet. Import it:

- carousel photos in `src/data/foods.ts`
- truck photos and logos in `src/data/trucks.ts`
- event flyers in `src/data/events.ts`

Alt text sits beside the image in those files, in English and Spanish. It is
what a blind visitor hears and what Google reads. Change the photo and the
sentence describing it in the same commit, every time, or the site is making a
false statement about a picture nobody can check.
