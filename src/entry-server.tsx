import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppRoutes } from './AppRoutes'
import { ALL_PATHS, LANGS, NOT_FOUND_URL, ROUTES, langFromPath } from './lib/routes'
import { site } from './lib/site'

// Used by prerender.mjs and scripts/shots.mjs, both at build time.
//
// The route list and the site facts are re-exported here so the pre-render
// step reads the same values the app does. RHC keeps its route list in three
// places with a comment reminding you to update all of them; this cannot drift.
//
// `ROUTES` and `LANGS` are here for the screenshot script, which needs the key
// and the per-language path rather than the flat address list. Reading them
// from the built bundle rather than the TypeScript source is what guarantees it
// photographs the addresses that were actually generated.
export { ALL_PATHS, LANGS, NOT_FOUND_URL, ROUTES, langFromPath, site }

/**
 * React 19 hoists the <title>, <meta>, and <link> tags a page declares, so the
 * returned string carries this address's head tags ahead of its markup.
 * prerender.mjs splits them off and puts them in <head>.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}
