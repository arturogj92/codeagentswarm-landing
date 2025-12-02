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

export const metadata: Metadata = {
  title: 'CodeAgentSwarm - Run 6 Parallel Claude Code AI Agents for Faster Development',
  description: 'Boost developer productivity with CodeAgentSwarm - the ultimate AI coding assistant tool that runs 6 parallel Claude Code agents simultaneously. Transform hours of development into minutes with intelligent multi-agent orchestration, autonomous coding workflows, and parallel task execution.',
  keywords: [
    'AI coding assistant',
    'Claude Code',
    'parallel AI agents',
    'AI development tools',
    'developer productivity',
    'CodeAgentSwarm',
    'multi-agent coding',
    'parallel development',
    'AI agent orchestration',
    'autonomous coding',
  ],
  authors: [{ name: 'CodeAgentSwarm Team' }],
  creator: 'CodeAgentSwarm',
  publisher: 'CodeAgentSwarm',
  applicationName: 'CodeAgentSwarm',
  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'CodeAgentSwarm - 6 Parallel Claude Code AI Agents for Developers',
    description: 'Multiply your coding power with 6 parallel Claude Code AI agents. The ultimate AI coding assistant for developers who want to build faster, smarter, and more efficiently.',
    type: 'website',
    siteName: 'CodeAgentSwarm',
    url: 'https://codeagentswarm.com',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'CodeAgentSwarm - Parallel AI Coding Agents Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@CodeAgentSwarm',
    creator: '@CodeAgentSwarm',
    title: 'CodeAgentSwarm - 6 Parallel Claude Code AI Agents',
    description: 'Transform 8-hour development marathons into 30-minute sprints with 6 parallel Claude Code AI agents working simultaneously.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
