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
    ? 'CodeAgentSwarm | Entorno de Desarrollo Agéntico (ADE)'
    : 'CodeAgentSwarm | Agentic Development Environment (ADE)'

  const description = isSpanish
    ? 'CodeAgentSwarm es un entorno de desarrollo agéntico (ADE) para orquestar Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build en paralelo.'
    : 'CodeAgentSwarm is an Agentic Development Environment (ADE) for orchestrating Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code and Grok Build in parallel.'

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
      'Grok Build',
      'AI coding workspace',
      'AI developer workspace',
      'AI CLI workspace',
      'Agentic Development Environment',
      'ADE',
      'multi terminal coding workspace',
      'multiple Claude Code terminals',
      'multiple Codex terminals',
      'multiple Antigravity CLI terminals',
      'multiple OpenCode terminals',
      'multiple Kimi Code terminals',
      'multiple Grok Build terminals',
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
      title,
      description: isSpanish
        ? 'Un ADE para dirigir varios agentes de programación con tareas, notificaciones, historial, permisos y diffs en vivo desde un solo lugar.'
        : 'An ADE for directing multiple coding agents with tasks, notifications, history, permissions and live diffs in one place.',
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
      title,
      description: isSpanish
        ? 'Entorno de desarrollo agéntico para orquestar Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build en paralelo.'
        : 'Agentic Development Environment for orchestrating Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code and Grok Build in parallel.',
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
        {/*
          data-domains is what keeps localhost out of the real numbers.
          Without it Umami reports from wherever the script runs, so every
          `npm run dev` session lands in production analytics: a single
          afternoon of building the interactive demo put 81 demo_seen, 5
          demo_answered and a download_app_demo_silicon in there, for a feature
          that had not shipped. Which quietly poisons exactly the conversion
          rates we look at to decide anything.
        */}
        <Script
          defer
          src="https://umami-codeagentswarm-production.up.railway.app/script.js"
          data-website-id="a6cf83f7-4ba1-47af-87b3-4fdbd2d537d9"
          data-domains="codeagentswarm.com,www.codeagentswarm.com"
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
