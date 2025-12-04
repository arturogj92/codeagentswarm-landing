import { Metadata } from 'next'

const baseUrl = 'https://www.codeagentswarm.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const canonicalUrl = `${baseUrl}/${locale}/beta`

  return {
    title: 'CodeAgentSwarm Open Beta – Free Pro Access for Developers',
    description:
      'Join the open beta, get the full Pro tier for free, and help shape the future of multi-agent coding workflows with 6 parallel Claude Code terminals.',
    keywords: [
      'CodeAgentSwarm beta',
      'Claude Code beta',
      'AI coding beta',
      'free pro access',
      'developer tools beta',
      'multi terminal AI',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/beta`,
        es: `${baseUrl}/es/beta`,
      },
    },
    openGraph: {
      title: 'CodeAgentSwarm Open Beta – Free Pro Access',
      description:
        'Join the open beta and get free Pro tier access. Help shape the future of AI-powered multi-terminal coding.',
      type: 'website',
      siteName: 'CodeAgentSwarm',
      url: canonicalUrl,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'CodeAgentSwarm Open Beta - Free Pro Access',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'CodeAgentSwarm Open Beta – Free Pro Access',
      description:
        'Join the open beta and get free Pro tier access to 6 parallel Claude Code AI agents.',
      images: ['/og.png'],
    },
  }
}

export default function BetaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
