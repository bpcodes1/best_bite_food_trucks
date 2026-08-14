import { useEffect, useState } from 'react'
import type { Vendor } from '../lib/vendors'
import type { Lang } from '../lib/routes'

/**
 * "Open now" / "Closed", per vendor, computed against the clock.
 *
 * WHY THIS CANNOT BE PRE-RENDERED. Every other word on this site is baked into
 * a static file at build time, which is the whole point of the project. This
 * one answer changes every few hours, so baking it would publish a file that
 * confidently says "Open now" for however many days sit between a build and a
 * reader. It renders nothing on the server and fills in after mount.
 *
 * That does NOT break the rule that nothing may be JavaScript-only, because
 * nothing is lost without it: the vendor's full hours are printed on the card
 * as plain text in the pre-rendered HTML, which is what a crawler reads and
 * what a reader without JavaScript sees. The badge is a shortcut for people
 * who do not want to work out whether 12:30pm–8:30pm includes right now. A
 * vendor who has never sent hours renders its bracket statically, since that
 * fact is true at build time and worth having in the HTML.
 *
 * SALEM TIME, ALWAYS. Not the visitor's. A relative checking the park from
 * another state must not be told it is closed because it is late where they
 * are. `America/Los_Angeles` also carries daylight saving for us, which is why
 * this reads the zone rather than applying a fixed offset.
 */

const COPY = {
  en: { open: 'Open now', shut: 'Closed', pending: 'Hours pending' },
  es: { open: 'Abierto ahora', shut: 'Cerrado', pending: 'Horario pendiente' },
} satisfies Record<Lang, { open: string; shut: string; pending: string }>

const BASE =
  'inline-block px-2.5 py-1 font-mono text-[10px] tracking-[0.11em] uppercase whitespace-nowrap'

/** Minutes since midnight in Salem, plus the weekday there. */
function salemNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour12: false,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(new Date())

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0'
  const days: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

  return {
    day: days[get('weekday')] ?? 0,
    // Intl gives "24" rather than "00" for midnight in some environments.
    minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')),
  }
}

export function OpenStatus({ vendor, lang }: { vendor: Vendor; lang: Lang }) {
  const t = COPY[lang]
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    if (!vendor.hoursByDay) return
    const tick = () => {
      const { day, minutes } = salemNow()
      const today = vendor.hoursByDay?.[day]
      setIsOpen(Boolean(today) && minutes >= today![0] && minutes < today![1])
    }
    tick()
    // A reader can sit on this page across an opening or closing time. Once a
    // minute is cheap and stops the badge from going stale under them.
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [vendor])

  // Never sent us hours. True at build time, so it ships in the HTML.
  if (!vendor.hoursByDay) {
    return (
      <span className={`${BASE} border border-dashed border-rule bg-paper/80 text-muted`}>
        {t.pending}
      </span>
    )
  }

  // Server and first client render. The hours themselves are already on the card.
  if (isOpen === null) return null

  /* Open is a filled brand chip and closed recedes, rather than the green and
     red the references use. Two new colours would break design.md's
     no-third-brand-colour rule, and this reads better anyway: the kitchens you
     can actually walk up to are the ones that pop. */
  return isOpen ? (
    <span className={`${BASE} bg-brand-yellow text-brand-black`}>{t.open}</span>
  ) : (
    <span className={`${BASE} border border-rule bg-paper/90 text-muted`}>{t.shut}</span>
  )
}
