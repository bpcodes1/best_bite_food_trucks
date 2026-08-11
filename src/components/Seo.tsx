import { useLocation } from 'react-router-dom'
import { alternatePath, langFromPath, type Lang } from '../lib/routes'
import { site } from '../lib/site'

interface SeoProps {
  title: string
  description: string
}

/**
 * Every page declares its own head tags. `index.html` deliberately ships
 * without a title or description — a default there would leave two of each in
 * every pre-rendered file, and the generic one would win.
 *
 * No helmet library: React 19 hoists <title>, <meta>, and <link> to <head>
 * natively in the browser, and emits them at the front of the string during
 * SSR, which is what prerender.mjs splits off.
 *
 * The hreflang pair is the part that is easy to forget and expensive to miss:
 * it tells Google that `/vendors` and `/es/vendedores` are the same page in two
 * languages. Without it they compete with each other and can read as duplicates.
 */
export function Seo({ title, description }: SeoProps) {
  const { pathname } = useLocation()
  const lang: Lang = langFromPath(pathname)
  const alt = alternatePath(pathname)

  const url = `${site.origin}${pathname}`
  const altUrl = alt ? `${site.origin}${alt}` : undefined

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {altUrl && (
        <>
          <link rel="alternate" hrefLang={lang} href={url} />
          <link rel="alternate" hrefLang={lang === 'en' ? 'es' : 'en'} href={altUrl} />
          <link rel="alternate" hrefLang="x-default" href={lang === 'en' ? url : altUrl} />
        </>
      )}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={lang === 'es' ? 'es_US' : 'en_US'} />
    </>
  )
}
