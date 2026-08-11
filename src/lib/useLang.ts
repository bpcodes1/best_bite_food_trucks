import { useLocation } from 'react-router-dom'
import { langFromPath, type Lang } from './routes'

/**
 * The page's language, read off the address.
 *
 * There is no language state, no context, and no provider. `/vendors` is
 * English and `/es/vendedores` is Spanish because of where they live, which is
 * the same fact Google uses. One source, so the two can never disagree.
 */
export function useLang(): Lang {
  return langFromPath(useLocation().pathname)
}
