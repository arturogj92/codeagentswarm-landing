import { Metadata } from 'next'
import { getAllGuides } from '@/content/guides'
import GuidesIndexPage from '@/components/guides/GuidesIndexPage'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Guías | CodeAgentSwarm',
    description: 'Aprende a usar CodeAgentSwarm con nuestras guías prácticas. Consejos, tutoriales y mejores prácticas para trabajar con varios terminales de Claude Code.',
    alternates: {
      canonical: '/es/guias',
      languages: {
        en: '/en/guides',
        es: '/es/guias',
      },
    },
  }
}

export default function GuiasPage() {
  const guides = getAllGuides('es')

  return <GuidesIndexPage guides={guides} locale="es" />
}
