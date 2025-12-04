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

  return {
    title: 'CodeAgentSwarm – AI-powered multi-terminal coding workspace',
    description:
      'Orchestrate up to 6 Claude Code terminals in parallel with real time visibility, Git tools, live notifications, conversation history and intelligent task flows.',
    keywords: [
      'Claude Code',
      'AI coding',
      'developer tools',
      'multi terminal',
      'AI assistants',
      'parallel AI agents',
      'AI development tools',
      'developer productivity',
      'CodeAgentSwarm',
      'multi-agent coding',
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
      title: 'CodeAgentSwarm – Unleash Claude Code in parallel',
      description:
        'Work faster with multiple Claude Code terminals, Git integration, real time change tracking and full conversation history.',
      type: 'website',
      siteName: 'CodeAgentSwarm',
      url: canonicalUrl,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'CodeAgentSwarm - AI-powered multi-terminal coding workspace',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@CodeAgentSwarm',
      creator: '@CodeAgentSwarm',
      title: 'CodeAgentSwarm – 6 Parallel Claude Code AI Agents',
      description:
        'Transform 8-hour development marathons into 30-minute sprints with 6 parallel Claude Code AI agents working simultaneously.',
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
