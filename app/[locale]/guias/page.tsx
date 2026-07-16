import { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
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

export default async function GuiasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  // /guias/ is the Spanish listing only; send other locales to their canonical path
  if (locale !== 'es') {
    permanentRedirect('/en/guides')
  }

  const guides = getAllGuides('es')

  return <GuidesIndexPage guides={guides} locale="es" />
}
