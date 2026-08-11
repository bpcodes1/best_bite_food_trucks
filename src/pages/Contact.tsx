import { Seo } from '../components/Seo'
import { useLang } from '../lib/useLang'

export function Contact() {
  const lang = useLang()
  return (
    <>
      <Seo
        title={lang === 'es' ? 'Contacto' : 'Contact'}
        description={lang === 'es' ? 'Pendiente' : 'Pending'}
      />
      <h1>{lang === 'es' ? 'Contacto' : 'Contact'}</h1>
    </>
  )
}
