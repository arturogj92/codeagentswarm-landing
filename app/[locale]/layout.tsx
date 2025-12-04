import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { routing } from '@/i18n/routing'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
})

const baseUrl = 'https://www.codeagentswarm.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const canonicalUrl = `${baseUrl}/${locale}`

  const isSpanish = locale === 'es'

  const title = isSpanish
    ? 'CodeAgentSwarm – Espacio de trabajo con IA para varias terminales de Claude Code'
    : 'CodeAgentSwarm – AI coding workspace with multiple Claude Code terminals, real-time visibility and MCP tools'

  const description = isSpanish
    ? 'Orquesta hasta 6 terminales de Claude Code en un espacio de trabajo para desarrolladores con visibilidad en tiempo real, notificaciones instantaneas, historial completo de conversaciones, control de permisos, gestion de multiples proyectos e integraciones MCP.'
    : 'Orchestrate up to 6 Claude Code terminals in a single AI developer workspace with real-time visibility, live notifications, full conversation history, permissions control, multi-project management and MCP integrations.'

  return {
    title,
    description,
    keywords: [
      'Claude Code',
      'AI coding workspace',
      'AI developer workspace',
      'multi terminal coding workspace',
      'multiple Claude Code terminals',
      'Claude Code multi terminal setup',
      'real time visibility',
      'Claude Code notifications',
      'Claude Code conversation history',
      'Claude Code permissions',
      'MCP tools',
      'MCP marketplace',
      'multi-project management',
      'real time change tracking',
      'live diffs',
      'CodeAgentSwarm',
    ],
    authors: [{ name: 'CodeAgentSwarm Team' }],
    creator: 'CodeAgentSwarm',
    publisher: 'CodeAgentSwarm',
    applicationName: 'CodeAgentSwarm',
    icons: {
      icon: '/favicon.png',
      apple: '/logo.png',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
    openGraph: {
      title: isSpanish
        ? 'CodeAgentSwarm – Varias terminales de Claude Code en paralelo'
        : 'CodeAgentSwarm – Multiple Claude Code terminals in parallel',
      description: isSpanish
        ? 'Desarrolla mas rapido con varias terminales de Claude Code, integracion Git, seguimiento de cambios en tiempo real e historial completo de conversaciones.'
        : 'Work faster with multiple Claude Code terminals, Git integration, real-time change tracking and full conversation history.',
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
            ? 'CodeAgentSwarm - Espacio de trabajo multi-terminal para Claude Code'
            : 'CodeAgentSwarm - AI coding workspace for multiple Claude Code terminals',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@CodeAgentSwarm',
      creator: '@CodeAgentSwarm',
      title: isSpanish
        ? 'CodeAgentSwarm – 6 terminales de Claude Code en paralelo'
        : 'CodeAgentSwarm – 6 Parallel Claude Code Terminals',
      description: isSpanish
        ? 'Transforma 8 horas de desarrollo en 30 minutos con 6 terminales de Claude Code trabajando simultaneamente.'
        : 'Transform 8-hour development marathons into 30-minute sprints with 6 parallel Claude Code terminals working simultaneously.',
      images: ['/og.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  const messages = await getMessages()

  return (
    <html lang={locale} className="dark">
      <head>
        <Script
          defer
          src="https://umami-codeagentswarm-production.up.railway.app/script.js"
          data-website-id="a6cf83f7-4ba1-47af-87b3-4fdbd2d537d9"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} ${orbitron.variable} bg-black text-white antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {/* Noise Overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Scan Line Effect */}
          <div className="scan-line" aria-hidden="true" />

          {/* Main Content */}
          <main className="relative">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
