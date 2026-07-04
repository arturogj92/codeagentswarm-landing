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
    ? 'CodeAgentSwarm Open Beta – Acceso Pro Gratis para Terminales AI CLI'
    : 'CodeAgentSwarm Open Beta – Free Pro Access with Multiple AI CLI Terminals'

  const description = isSpanish
    ? 'Unete a la open beta y accede gratis al plan Pro completo. Multiples terminales AI CLI (Claude Code, Codex, Antigravity CLI, OpenCode) en paralelo, visibilidad en tiempo real, notificaciones, historial de conversaciones y gestion de multiples proyectos.'
    : 'Join the open beta and get full Pro tier access for free. Multiple AI CLI terminals (Claude Code, Codex, Antigravity CLI, OpenCode) in parallel, real-time visibility, notifications, conversation history and multi-project management.'

  return {
    title,
    description,
    keywords: [
      'CodeAgentSwarm beta',
      'Claude Code beta',
      'Codex CLI beta',
      'Antigravity CLI beta',
      'OpenCode beta',
      'AI coding workspace beta',
      'AI CLI workspace',
      'free pro access',
      'multiple Claude Code terminals',
      'multiple Codex terminals',
      'multiple Antigravity CLI terminals',
      'multiple OpenCode terminals',
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
      },
    },
    openGraph: {
      title: isSpanish
        ? 'CodeAgentSwarm Open Beta – Acceso Pro Gratis para AI CLI'
        : 'CodeAgentSwarm Open Beta – Free Pro Access for AI CLI',
      description: isSpanish
        ? 'Unete a la open beta y accede gratis al plan Pro. Multiples terminales AI CLI (Claude Code, Codex, Antigravity CLI, OpenCode) con visibilidad en tiempo real.'
        : 'Join the open beta and get free Pro tier access. Multiple AI CLI terminals (Claude Code, Codex, Antigravity CLI, OpenCode) with real-time visibility.',
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
        ? 'Unete a la beta y accede gratis a multiples terminales AI CLI (Claude Code, Codex, Antigravity CLI, OpenCode) en paralelo.'
        : 'Join the open beta and get free Pro tier access to multiple parallel AI CLI terminals (Claude Code, Codex, Antigravity CLI, OpenCode).',
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
