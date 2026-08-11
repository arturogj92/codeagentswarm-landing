import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
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
    ? 'CodeAgentSwarm – Centro de mando para agentes de programación con IA'
    : 'CodeAgentSwarm – Visual command center for AI coding agents'

  const description = isSpanish
    ? 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo: Claude Code, Codex, Antigravity CLI, OpenCode y Kimi Code, con visibilidad en tiempo real, notificaciones, historial completo de conversaciones, control de permisos, gestión multiproyecto e integraciones MCP.'
    : 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel: Claude Code, Codex, Antigravity CLI, OpenCode and Kimi Code, with real-time visibility, live notifications, full conversation history, permission control, multi-project management and MCP integrations.'

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: [
      'Claude Code',
      'Codex CLI',
      'Antigravity CLI',
      'OpenCode',
      'Kimi Code',
      'AI coding workspace',
      'AI developer workspace',
      'AI CLI workspace',
      'multi terminal coding workspace',
      'multiple Claude Code terminals',
      'multiple Codex terminals',
      'multiple Antigravity CLI terminals',
      'multiple OpenCode terminals',
      'multiple Kimi Code terminals',
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
      'run multiple AI coding agents',
      'AI coding agent supervision',
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
        // English is the fallback for any language we don't publish.
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: isSpanish
        ? 'CodeAgentSwarm – Varios agentes de IA en paralelo'
        : 'CodeAgentSwarm – Run multiple AI coding agents in parallel',
      description: isSpanish
        ? 'Supervisa Claude Code, Codex, Antigravity CLI, OpenCode y Kimi Code desde un centro de mando visual con diffs en vivo, notificaciones e historial completo.'
        : 'Supervise Claude Code, Codex, Antigravity CLI, OpenCode and Kimi Code from one visual command center with live diffs, notifications and full history.',
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
            ? 'CodeAgentSwarm - Centro de mando visual para agentes de IA'
            : 'CodeAgentSwarm - Visual command center for AI coding agents',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@CodeAgentSwarm',
      creator: '@CodeAgentSwarm',
      title: isSpanish
        ? 'CodeAgentSwarm – Agentes de IA en paralelo'
        : 'CodeAgentSwarm – AI coding agents in parallel',
      description: isSpanish
        ? 'Orquesta Claude Code, Codex, Antigravity CLI, OpenCode y Kimi Code desde un centro de mando con visibilidad en tiempo real.'
        : 'Orchestrate Claude Code, Codex, Antigravity CLI, OpenCode and Kimi Code from one command center with real-time visibility.',
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

  // Enable static rendering: without this, next-intl reads the incoming
  // request to resolve the locale and every page under [locale] becomes
  // dynamic (SSR per visit), burning Vercel Fluid CPU on each pageview.
  setRequestLocale(locale)

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
