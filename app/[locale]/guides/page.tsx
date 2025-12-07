import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getAllGuides } from '@/content/guides'
import GuidesIndexPage from '@/components/guides/GuidesIndexPage'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('guides')

  return {
    title: 'Guides | CodeAgentSwarm',
    description: 'Learn how to use CodeAgentSwarm with our practical guides. Tips, tutorials, and best practices for working with multiple Claude Code terminals.',
    alternates: {
      canonical: '/en/guides',
      languages: {
        en: '/en/guides',
        es: '/es/guias',
      },
    },
  }
}

export default function GuidesPage() {
  const guides = getAllGuides('en')

  return <GuidesIndexPage guides={guides} locale="en" />
}
