import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { routing } from '@/i18n/routing'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

const handelGothic = localFont({
  src: '../fonts/HandelGothicBold.ttf',
  variable: '--font-handel',
  display: 'swap',
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
    ? 'CodeAgentSwarm – Espacio de trabajo con IA para terminales Claude Code, Codex y Gemini CLI'
    : 'CodeAgentSwarm – AI coding workspace for Claude Code, Codex and Gemini CLI terminals with MCP tools'

  const description = isSpanish
    ? 'Orquesta hasta 6 terminales AI CLI (Claude Code, Codex, Gemini CLI) en un espacio de trabajo para desarrolladores con visibilidad en tiempo real, notificaciones instantaneas, historial completo de conversaciones, control de permisos, gestion de multiples proyectos e integraciones MCP.'
    : 'Orchestrate up to 6 AI CLI terminals (Claude Code, Codex, Gemini CLI) in a single developer workspace with real-time visibility, live notifications, full conversation history, permissions control, multi-project management and MCP integrations.'

  return {
    title,
    description,
    keywords: [
      'Claude Code',
      'Codex CLI',
      'Gemini CLI',
      'AI coding workspace',
      'AI developer workspace',
      'AI CLI workspace',
      'multi terminal coding workspace',
      'multiple Claude Code terminals',
      'multiple Codex terminals',
      'multiple Gemini CLI terminals',
      'Claude Code multi terminal setup',
      'real time visibility',
      'AI CLI notifications',
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
      icon: [
        { url: '/favicon.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      ],
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
        ? 'CodeAgentSwarm – Terminales AI CLI en paralelo (Claude Code, Codex, Gemini)'
        : 'CodeAgentSwarm – Multiple AI CLI terminals in parallel (Claude Code, Codex, Gemini)',
      description: isSpanish
        ? 'Desarrolla mas rapido con terminales AI CLI (Claude Code, Codex, Gemini CLI), integracion Git, seguimiento de cambios en tiempo real e historial completo.'
        : 'Work faster with multiple AI CLI terminals (Claude Code, Codex, Gemini CLI), Git integration, real-time change tracking and full conversation history.',
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
            ? 'CodeAgentSwarm - Espacio de trabajo multi-terminal para AI CLI'
            : 'CodeAgentSwarm - AI coding workspace for multiple AI CLI terminals',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@CodeAgentSwarm',
      creator: '@CodeAgentSwarm',
      title: isSpanish
        ? 'CodeAgentSwarm – 6 terminales AI CLI en paralelo'
        : 'CodeAgentSwarm – 6 Parallel AI CLI Terminals',
      description: isSpanish
        ? 'Orquesta 6 terminales AI CLI (Claude Code, Codex, Gemini CLI) en un workspace con visibilidad en tiempo real.'
        : 'Orchestrate 6 AI CLI terminals (Claude Code, Codex, Gemini CLI) in one workspace with real-time visibility.',
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
      <body className={`${inter.className} ${inter.variable} ${manrope.variable} ${handelGothic.variable} bg-black text-white antialiased`}>
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
