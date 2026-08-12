import { Route, Routes } from 'react-router-dom'
import { LANGS, ROUTES } from './lib/routes'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { Home } from './pages/Home'
import { Vendors } from './pages/Vendors'
import { Events } from './pages/Events'
import { LeaseASpace } from './pages/LeaseASpace'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'

/**
 * One component per page, rendered at two addresses. The page reads its own
 * language off the URL, so there is no duplicated route tree and no language
 * state to keep in sync.
 */
const PAGES: Record<string, () => React.ReactElement> = {
  home: Home,
  vendors: Vendors,
  events: Events,
  lease: LeaseASpace,
  contact: Contact,
}

/**
 * The chrome wraps the routes rather than each page, so it is rendered by both
 * the browser entry and `entry-server.tsx` — which renders `AppRoutes`, not
 * `App`. Putting the header in `App` would ship a pre-rendered site with no
 * navigation in any of its files.
 */
export function AppRoutes() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <Routes>
          {ROUTES.flatMap((route) => {
            const Page = PAGES[route.key]
            return LANGS.map((lang) => (
              <Route key={`${route.key}-${lang}`} path={route.path[lang]} element={<Page />} />
            ))
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}
