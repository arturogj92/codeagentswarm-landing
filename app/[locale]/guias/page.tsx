import { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getAllGuides } from '@/content/guides'
import GuidesIndexPage from '@/components/guides/GuidesIndexPage'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Guías | CodeAgentSwarm'
  const description = 'Guías prácticas de CodeAgentSwarm: ejecuta Claude Code, Codex, Antigravity CLI, OpenCode, Kimi Code, Grok Build y Cursor Agent en paralelo con visibilidad, historial y control multiproyecto.'

  return {
    title,
    description,
    alternates: {
      canonical: '/es/guias',
      languages: {
        en: '/en/guides',
        es: '/es/guias',
        'x-default': '/en/guides',
      },
    },
    openGraph: {
      type: 'website',
      url: '/es/guias',
      title,
      description,
      images: ['/og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.png'],
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

  const guides = getAllGuides('es').map(({ meta }) => ({ meta }))

  return <GuidesIndexPage guides={guides} locale="es" />
}
