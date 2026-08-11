import { Seo } from '../components/Seo'
import { useLang } from '../lib/useLang'

export function LeaseASpace() {
  const lang = useLang()
  return (
    <>
      <Seo
        title={lang === 'es' ? 'Únete al Parque' : 'Lease a Space'}
        description={lang === 'es' ? 'Pendiente' : 'Pending'}
      />
      <h1>{lang === 'es' ? 'Únete al Parque' : 'Lease a Space'}</h1>
    </>
  )
}
