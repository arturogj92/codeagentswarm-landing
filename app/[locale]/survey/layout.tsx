import type { Metadata } from 'next'

const baseUrl = 'https://www.codeagentswarm.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const normalized = locale === 'es' ? 'es' : 'en'
  const title = normalized === 'es' ? 'Encuesta de producto | CodeAgentSwarm' : 'Product Survey | CodeAgentSwarm'
  const description = normalized === 'es'
    ? 'Comparte cómo trabajas con agentes de programación y ayúdanos a mejorar CodeAgentSwarm.'
    : 'Share how you work with coding agents and help us improve CodeAgentSwarm.'
  const url = `${baseUrl}/${normalized}/survey`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/survey`,
        es: `${baseUrl}/es/survey`,
        'x-default': `${baseUrl}/en/survey`,
      },
    },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'CodeAgentSwarm',
      locale: normalized === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return children
}
