import type { Vendor } from '../lib/vendors'
import type { Lang } from '../lib/routes'
import { OpenStatus } from './OpenStatus'

/**
 * One vendor. Approved by Enrique 2026-08-12 from a throwaway prototype, after
 * comparing it against a type-led alternative.
 *
 * THE NAME ALWAYS SITS INSIDE THE MEDIA AREA, photograph or not. That is the
 * rule that makes the grid hold together while only two of nine vendors have a
 * truck photo: a card without one gets a wash panel carrying its logo, and the
 * name occupies exactly the same position. Nothing moves when the photograph
 * finally arrives — the panel is replaced by the picture and the card is
 * otherwise untouched. The earlier version dropped the name below the box when
 * there was no photo, and a grid where the title jumps position card to card
 * reads as broken.
 *
 * Structure taken from a restaurant-directory reference Enrique supplied
 * (Foogra, ThemeForest, 2026-08-12): photograph carries the card, name set on
 * the image, category chip in the corner. Reimplemented on our tokens, not
 * copied. What was deliberately NOT carried over is everything that reference
 * fills its cards with — star ratings, review counts, price tiers, percent-off
 * badges. We can honestly fill one of those slots and inventing the rest is
 * the fabricated-proof line this project does not cross. So the card holds
 * what is true: name, cuisine, whether it is open, and the hours.
 *
 * THE LOGO IS CONTAINED IDENTICALLY on every card — same square, same padding,
 * same white tile — per design.md § Components. The nine logos arrive on white,
 * black, pink and one rainbow ground, and sizing each mark to its own aspect
 * made the grid read as a flea market. Three of them are drawn on solid black
 * and still read as dark squares even inside the tile; the fix for that is
 * transparent artwork from those vendors, not CSS.
 */
export function VendorCard({ vendor, lang }: { vendor: Vendor; lang: Lang }) {
  const cuisine = vendor.cuisine[lang]
  const hasPhoto = Boolean(vendor.photo)

  return (
    <article className="reveal min-w-0">
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={hasPhoto ? undefined : { background: vendor.wash }}
      >
        {hasPhoto ? (
          <>
            <img
              src={vendor.photo}
              alt={vendor.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            {/* Strong enough at the foot to hold white type over an unknown
                photograph. Ray's shots are phone shots in daylight, so this is
                the thing to re-check against each new one rather than assume. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-brand-black/40 to-transparent"
            />
          </>
        ) : (
          <img
            src={vendor.logo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute top-[11%] left-1/2 aspect-square w-[42%] -translate-x-1/2 border border-ink/10 bg-white object-contain p-2"
          />
        )}

        <div className="absolute top-3 left-3 z-10">
          <OpenStatus vendor={vendor} lang={lang} />
        </div>

        <div className="absolute right-0 bottom-0 left-0 p-4">
          <h3
            className={`text-lg leading-[1.05] uppercase sm:text-xl ${
              hasPhoto ? 'text-paper' : 'text-ink'
            }`}
          >
            {vendor.name}
          </h3>
          <p
            className={`mt-1.5 font-mono text-[10px] tracking-[0.1em] uppercase ${
              hasPhoto ? 'text-paper/85' : 'text-muted'
            }`}
          >
            {cuisine}
          </p>
        </div>
      </div>

      <p className="mt-3 flex items-start gap-2.5 text-sm leading-snug text-muted">
        <ClockIcon />
        <span className="min-w-0">{vendor.hours[lang]}</span>
      </p>
    </article>
  )
}

/** Hand-drawn, one stroke weight, matching EventCard. No icon library. */
function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
