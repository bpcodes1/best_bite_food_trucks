import { Seo } from '../components/Seo'
import { useLang } from '../lib/useLang'

export function Events() {
  const lang = useLang()
  return (
    <>
      <Seo
        title={lang === 'es' ? 'Eventos' : 'Events'}
        description={lang === 'es' ? 'Pendiente' : 'Pending'}
      />
      <h1>{lang === 'es' ? 'Eventos' : 'Events'}</h1>
    </>
  )
}
