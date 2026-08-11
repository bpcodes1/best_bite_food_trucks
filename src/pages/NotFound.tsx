import { Seo } from '../components/Seo'

/**
 * Pre-rendered to `dist/404.html`, which Cloudflare Pages serves as a real 404
 * for any address that matches no route.
 */
export function NotFound() {
  return (
    <>
      <Seo title="404" description="Page not found" />
      <h1>404</h1>
    </>
  )
}
