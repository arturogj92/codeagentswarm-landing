import { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getAllGuides } from '@/content/guides'
import GuidesIndexPage from '@/components/guides/GuidesIndexPage'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Guides | CodeAgentSwarm',
    description: 'Practical guides for CodeAgentSwarm: run Claude Code, Codex, Antigravity CLI, OpenCode, Kimi Code and Grok Build in parallel with visibility, history and multi-project control.',
    alternates: {
      canonical: '/en/guides',
      languages: {
        en: '/en/guides',
        es: '/es/guias',
        'x-default': '/en/guides',
      },
    },
  }
}

export default async function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  // /guides/ is the English listing only; send other locales to their canonical path
  if (locale !== 'en') {
    permanentRedirect('/es/guias')
  }

  const guides = getAllGuides('en').map(({ meta }) => ({ meta }))

  return <GuidesIndexPage guides={guides} locale="en" />
}
