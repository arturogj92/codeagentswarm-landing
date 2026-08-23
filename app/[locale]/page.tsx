'use client'

import { useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import Header from '@/components/Header'
import BetaBanner from '@/components/BetaBanner'
// HeroPromoSection is gone from the flow: master moved its six videos into
// FeatureVideosSection, so rendering both would show the same reel twice.
import HeroSection from '@/components/HeroSection'
import FeatureVideosSection from '@/components/FeatureVideosSection'
import ProblemSection from '@/components/ProblemSection'
import FeaturesSection from '@/components/FeaturesSection'
import WorksWithSection from '@/components/WorksWithSection'
// import DemoSection from '@/components/DemoSection'
import InteractiveDemoSection from '@/components/InteractiveDemoSection'
import ModeCompareSection from '@/components/ModeCompareSection'
import MCPSection from '@/components/MCPSection'
// import SocialProofSection from '@/components/SocialProofSection'
// import SwarmiSection from '@/components/SwarmiSection'
import BringYourOwnSubSection from '@/components/BringYourOwnSubSection'
import PricingSection from '@/components/PricingSection'
import RoadmapSection from '@/components/RoadmapSection'
import CommunitySection from '@/components/CommunitySection'
import FAQSection from '@/components/FAQSection'
import GuidesSection from '@/components/GuidesSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import { buildFaqItems } from '@/lib/faq-items'

export default function Home() {
  const locale = useLocale()
  const t = useTranslations('faq')
  const baseUrl = 'https://www.codeagentswarm.com'

  // SoftwareApplication schema - factual, no fake ratings
  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CodeAgentSwarm',
    description: locale === 'es'
      ? 'CodeAgentSwarm es un entorno de desarrollo agéntico (Agentic Development Environment, ADE) para ejecutar y supervisar varios agentes de programación con IA en paralelo: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build y Cursor Agent.'
      : 'CodeAgentSwarm is an Agentic Development Environment (ADE) for running and supervising multiple AI coding agents in parallel: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent.',
    url: baseUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Windows',
    featureList: locale === 'es'
      ? [
          'Ejecuta varios agentes de programación con IA en paralelo',
          'Notificaciones de escritorio cuando un agente termina o necesita ayuda',
          'Historial de conversaciones buscable de todos los agentes',
          'Diffs de archivos en vivo para cada agente',
          'Control de permisos y modo YOLO',
          'Tablero kanban que los agentes actualizan por MCP',
          'Git worktrees por sesión',
          'Marketplace de skills y de servidores MCP',
        ]
      : [
          'Run multiple AI coding agents in parallel',
          'Desktop notifications when an agent finishes or needs input',
          'Searchable conversation history across all agents',
          'Live file diffs for every agent',
          'Permission and YOLO mode control',
          'Kanban task board that agents update over MCP',
          'Git worktrees per session',
          'Skills marketplace and MCP server marketplace',
        ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: locale === 'es' ? 'Gratis con Pro incluido durante la Beta' : 'Free with Pro included during Beta',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CodeAgentSwarm',
      url: baseUrl,
      // Solo perfiles que existen de verdad: un sameAs roto debilita la señal de
      // entidad en vez de reforzarla. x.com/CodeAgentSwarm daba 404 el 2026-07-27.
      sameAs: [
        'https://discord.gg/a9ZqmW9UfQ',
        'https://x.com/Art0xDev',
        'https://github.com/arturogj92/codeagentswarm-landing',
        'https://github.com/arturogj92/codeagentswarm-site',
      ],
      founder: {
        '@type': 'Person',
        name: 'Arturo García',
        sameAs: [
          'https://github.com/arturogj92',
          'https://x.com/Art0xDev',
          'https://art0x.dev',
        ],
      },
    },
  }

  // FAQPage schema. Comparte la lista con el acordeón visible (FAQSection) para
  // que el schema no se quede corto cuando se añade una pregunta.
  const faqItems = buildFaqItems(t)

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  // Track scroll depth on home page (25%, 50%, 75%, 100%)
  useEffect(() => {
    const firedLevels = { 25: false, 50: false, 75: false, 100: false }

    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return

      const ratio = window.scrollY / maxScroll

      if (ratio >= 0.25 && !firedLevels[25]) {
        window.umami?.track('home_scroll_25')
        firedLevels[25] = true
      }
      if (ratio >= 0.5 && !firedLevels[50]) {
        window.umami?.track('home_scroll_50')
        firedLevels[50] = true
      }
      if (ratio >= 0.75 && !firedLevels[75]) {
        window.umami?.track('home_scroll_75')
        firedLevels[75] = true
      }
      if (ratio >= 0.98 && !firedLevels[100]) {
        window.umami?.track('home_scroll_100')
        firedLevels[100] = true
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-black">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* Fixed Grid Background */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Floating Gradient Orbs - Optimized blur */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-neon-purple/5 via-transparent to-transparent blur-2xl pointer-events-none will-change-auto" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent blur-2xl pointer-events-none will-change-auto" />

      {/* Beta Banner */}
      <BetaBanner />

      {/* Content */}
      <Header />

      {/* Spacer for beta banner - only visible on non-beta pages */}
      <div className="h-9" />

      <main>
        <HeroSection />
        {/* The proof of the headline it sits under: "Parallel coding agents.
            Zero window chaos." is a claim until you watch a swarm of them work
            in one window. Desktop only - on a phone this renders nothing and
            the page flows straight into Problem. */}
        <InteractiveDemoSection />
        <ProblemSection />
        <FeaturesSection />
        <FeatureVideosSection />
        <WorksWithSection />
        {/* After the agent roster on purpose: you have just read WHICH CLIs it
            runs, and this answers how you read them - same session as chat or
            as the raw terminal. Kept three sections away from the simulator so
            the page never stacks two interactive demos. */}
        <ModeCompareSection />
        {/* <DemoSection /> */}
        <MCPSection />
        {/* <SocialProofSection /> */}
        {/* <SwarmiSection /> */}
        <BringYourOwnSubSection />
        <PricingSection />
        <RoadmapSection />
        <CommunitySection />
        <FAQSection />
        <GuidesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
