import { describe, expect, it } from 'vitest'
import { VENDORS } from './vendors'
import { site } from './site'
import { LANGS } from './routes'

/**
 * The vendor roster holds the same facts in more than one shape — a sentence a
 * reader sees and ranges a machine compares against the clock — and nothing
 * about the build fails when those two drift apart. A card would just quietly
 * start claiming a kitchen is open on a day its own printed hours say it is
 * closed. These pin them together.
 */
describe('vendors', () => {
  it('matches the stall count advertised everywhere else', () => {
    // Home and Únete both print this number. If a vendor is added here and
    // site.ts is not updated, the site contradicts itself across three pages.
    expect(VENDORS.length).toBe(site.stalls.filled)
  })

  it('has no duplicate ids or names', () => {
    expect(new Set(VENDORS.map((v) => v.id)).size).toBe(VENDORS.length)
    expect(new Set(VENDORS.map((v) => v.name)).size).toBe(VENDORS.length)
  })

  it('gives every vendor a cuisine and an hours line in both languages', () => {
    for (const vendor of VENDORS) {
      for (const lang of LANGS) {
        expect(vendor.cuisine[lang], `${vendor.id} is missing ${lang} cuisine`).toBeTruthy()
        expect(vendor.hours[lang], `${vendor.id} is missing ${lang} hours`).toBeTruthy()
      }
    }
  })

  it('backs every claim of known hours with machine-readable ranges', () => {
    for (const vendor of VENDORS) {
      if (!vendor.hoursKnown) continue
      expect(vendor.hoursByDay, `${vendor.id} claims known hours but has no ranges`).toBeTruthy()
    }
  })

  it('never shows an open/closed badge for a vendor whose hours we lack', () => {
    for (const vendor of VENDORS) {
      if (vendor.hoursKnown) continue
      expect(
        vendor.hoursByDay,
        `${vendor.id} has ranges but is marked hours-unknown`,
      ).toBeUndefined()
    }
  })

  it('keeps every opening range inside a real day and in order', () => {
    for (const vendor of VENDORS) {
      for (const [day, range] of Object.entries(vendor.hoursByDay ?? {})) {
        const [open, close] = range
        expect(Number(day), `${vendor.id} has an impossible weekday`).toBeGreaterThanOrEqual(0)
        expect(Number(day), `${vendor.id} has an impossible weekday`).toBeLessThanOrEqual(6)
        expect(open, `${vendor.id} day ${day} opens before midnight`).toBeGreaterThanOrEqual(0)
        expect(close, `${vendor.id} day ${day} closes after midnight`).toBeLessThanOrEqual(24 * 60)
        expect(close, `${vendor.id} day ${day} closes before it opens`).toBeGreaterThan(open)
      }
    }
  })

  it('gives every vendor a logo and a wash to fall back to', () => {
    for (const vendor of VENDORS) {
      expect(vendor.logo, `${vendor.id} has no logo`).toBeTruthy()
      expect(vendor.wash, `${vendor.id} has no wash ground`).toMatch(/^var\(--color-wash-/)
    }
  })
})
