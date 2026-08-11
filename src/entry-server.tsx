import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppRoutes } from './AppRoutes'
import { ALL_PATHS, NOT_FOUND_URL, langFromPath } from './lib/routes'
import { site } from './lib/site'

// Used only by prerender.mjs at build time.
//
// The route list and the site facts are re-exported here so the pre-render
// step reads the same values the app does. RHC keeps its route list in three
// places with a comment reminding you to update all of them; this cannot drift.
export { ALL_PATHS, NOT_FOUND_URL, langFromPath, site }

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
