import { describe, expect, it } from 'vitest'
import { ALL_PATHS, LANGS, ROUTES, alternatePath, langFromPath, pathFor } from './routes'

/**
 * Guards the one array everything else derives from. A duplicate or missing
 * path here silently breaks the router, the sitemap, and the hreflang pairs at
 * once, and the build would still go green.
 */
describe('routes', () => {
  it('gives every page an address in both languages', () => {
    for (const route of ROUTES) {
      for (const lang of LANGS) {
        expect(route.path[lang], `${route.key} is missing ${lang}`).toBeTruthy()
      }
    }
  })

  it('has no duplicate addresses', () => {
    expect(new Set(ALL_PATHS).size).toBe(ALL_PATHS.length)
  })

  it('produces two addresses per page', () => {
    expect(ALL_PATHS).toHaveLength(ROUTES.length * LANGS.length)
  })

  it('puts every Spanish address under /es and no English one', () => {
    for (const route of ROUTES) {
      expect(langFromPath(route.path.es)).toBe('es')
      expect(langFromPath(route.path.en)).toBe('en')
    }
  })

  it('pairs each address with its translation, both ways', () => {
    for (const route of ROUTES) {
      expect(alternatePath(route.path.en)).toBe(route.path.es)
      expect(alternatePath(route.path.es)).toBe(route.path.en)
    }
  })

  it('has no alternate for an unknown address, so the toggle can hide', () => {
    expect(alternatePath('/__not-found__')).toBeUndefined()
  })

  it('resolves a page by key', () => {
    expect(pathFor('lease', 'es')).toBe('/es/unete-al-parque')
    expect(() => pathFor('our-story', 'en')).toThrow()
  })
})
