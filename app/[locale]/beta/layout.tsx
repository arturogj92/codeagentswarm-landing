import { Metadata } from 'next'

const baseUrl = 'https://www.codeagentswarm.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const canonicalUrl = `${baseUrl}/${locale}/beta`

  const isSpanish = locale === 'es'

  const title = isSpanish
    ? 'CodeAgentSwarm Open Beta – Acceso Pro Gratis para Desarrolladores'
    : 'CodeAgentSwarm Open Beta – Free Pro Access with 6 Claude Code Terminals'

  const description = isSpanish
    ? 'Unete a la open beta y accede gratis al plan Pro completo. 6 terminales de Claude Code en paralelo, visibilidad en tiempo real, notificaciones, historial de conversaciones y gestion de multiples proyectos.'
    : 'Join the open beta and get full Pro tier access for free. 6 Claude Code terminals in parallel, real-time visibility, notifications, conversation history and multi-project management.'

  return {
    title,
    description,
    keywords: [
      'CodeAgentSwarm beta',
      'Claude Code beta',
      'AI coding workspace beta',
      'free pro access',
      'multiple Claude Code terminals',
      'real time visibility',
      'Claude Code notifications',
      'conversation history',
      'multi-project management',
      'MCP tools',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/beta`,
        es: `${baseUrl}/es/beta`,
      },
    },
    openGraph: {
      title: isSpanish
        ? 'CodeAgentSwarm Open Beta – Acceso Pro Gratis'
        : 'CodeAgentSwarm Open Beta – Free Pro Access',
      description: isSpanish
        ? 'Unete a la open beta y accede gratis al plan Pro. 6 terminales de Claude Code con visibilidad en tiempo real.'
        : 'Join the open beta and get free Pro tier access. 6 Claude Code terminals with real-time visibility.',
      type: 'website',
      siteName: 'CodeAgentSwarm',
      url: canonicalUrl,
      locale: isSpanish ? 'es_ES' : 'en_US',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: isSpanish
            ? 'CodeAgentSwarm Open Beta - Acceso Pro Gratis'
            : 'CodeAgentSwarm Open Beta - Free Pro Access',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isSpanish
        ? 'CodeAgentSwarm Open Beta – Pro Gratis'
        : 'CodeAgentSwarm Open Beta – Free Pro Access',
      description: isSpanish
        ? 'Unete a la beta y accede gratis a 6 terminales de Claude Code en paralelo.'
        : 'Join the open beta and get free Pro tier access to 6 parallel Claude Code terminals.',
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
