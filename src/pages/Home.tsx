import { Seo } from '../components/Seo'
import { useLang } from '../lib/useLang'

export function Home() {
  const lang = useLang()
  return (
    <>
      <Seo
        title={lang === 'es' ? 'Best Bite Food Park' : 'Best Bite Food Park'}
        description={lang === 'es' ? 'Pendiente' : 'Pending'}
      />
      <h1>{lang === 'es' ? 'Inicio' : 'Home'}</h1>
    </>
  )
}
