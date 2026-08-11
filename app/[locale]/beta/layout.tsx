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
    ? 'CodeAgentSwarm Open Beta – Pro Gratis para Agentes de IA'
    : 'CodeAgentSwarm Open Beta – Free Pro Access for AI Coding Agents'

  const description = isSpanish
    ? 'Únete a la open beta y ejecuta Claude Code, Codex, Antigravity CLI, OpenCode y Kimi Code en paralelo, con visibilidad en tiempo real, notificaciones, historial y Pro gratis.'
    : 'Join the open beta and run Claude Code, Codex, Antigravity CLI, OpenCode and Kimi Code in parallel with live status, notifications, history and free Pro access.'

  return {
    title,
    description,
    keywords: [
      'CodeAgentSwarm beta',
      'Claude Code beta',
      'Codex CLI beta',
      'Antigravity CLI beta',
      'OpenCode beta',
      'Kimi Code beta',
      'AI coding workspace beta',
      'AI CLI workspace',
      'free pro access',
      'multiple Claude Code terminals',
      'multiple Codex terminals',
      'multiple Antigravity CLI terminals',
      'multiple OpenCode terminals',
      'multiple Kimi Code terminals',
      'real time visibility',
      'AI CLI notifications',
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
        'x-default': `${baseUrl}/en/beta`,
      },
    },
    openGraph: {
      title: isSpanish
        ? 'CodeAgentSwarm Open Beta – Acceso Pro Gratis para AI CLI'
        : 'CodeAgentSwarm Open Beta – Free Pro Access for AI CLI',
      description: isSpanish
        ? 'Únete a la open beta y ejecuta varios agentes de IA en paralelo con visibilidad en tiempo real y acceso Pro gratis.'
        : 'Join the open beta and run multiple AI coding agents in parallel with real-time visibility and free Pro access.',
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
        ? 'CodeAgentSwarm Open Beta – Pro Gratis para AI CLI'
        : 'CodeAgentSwarm Open Beta – Free Pro for AI CLI',
      description: isSpanish
        ? 'Únete a la beta y ejecuta varios agentes de IA en paralelo con Pro gratis.'
        : 'Join the open beta and run multiple AI coding agents in parallel with free Pro access.',
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
