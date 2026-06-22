import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LegalPage from '@/components/legal/LegalPage'
import { getLegalDoc } from '@/content/legal'

const baseUrl = 'https://www.codeagentswarm.com'
const slug = 'terms' as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const doc = getLegalDoc(slug, locale)
  const normalized = locale === 'es' ? 'es' : 'en'

  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${normalized}/${slug}`,
      languages: {
        en: `${baseUrl}/en/${slug}`,
        es: `${baseUrl}/es/${slug}`,
      },
    },
    openGraph: {
      title: doc.metaTitle,
      description: doc.metaDescription,
      url: `${baseUrl}/${normalized}/${slug}`,
      type: 'article',
      siteName: 'CodeAgentSwarm',
      locale: normalized === 'es' ? 'es_ES' : 'en_US',
    },
    robots: { index: true, follow: true },
  }
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const doc = getLegalDoc(slug, locale)
  if (!doc) notFound()
  return <LegalPage doc={doc} />
}
