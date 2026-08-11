import { Route, Routes } from 'react-router-dom'
import { LANGS, ROUTES } from './lib/routes'
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

export function AppRoutes() {
  return (
    <Routes>
      {ROUTES.flatMap((route) => {
        const Page = PAGES[route.key]
        return LANGS.map((lang) => (
          <Route key={`${route.key}-${lang}`} path={route.path[lang]} element={<Page />} />
        ))
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
