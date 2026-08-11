import { Seo } from '../components/Seo'
import { useLang } from '../lib/useLang'

export function Vendors() {
  const lang = useLang()
  return (
    <>
      <Seo
        title={lang === 'es' ? 'Vendedores' : 'Vendors'}
        description={lang === 'es' ? 'Pendiente' : 'Pending'}
      />
      <h1>{lang === 'es' ? 'Vendedores' : 'Vendors'}</h1>
    </>
  )
}
