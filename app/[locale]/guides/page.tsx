import { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
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

export default async function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // /guides/ is the English listing only; send other locales to their canonical path
  if (locale !== 'en') {
    permanentRedirect('/es/guias')
  }

  const guides = getAllGuides('en')

  return <GuidesIndexPage guides={guides} locale="en" />
}
