'use client'

import { useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import Header from '@/components/Header'
import BetaBanner from '@/components/BetaBanner'
import HeroSection from '@/components/HeroSection'
import FeatureVideosSection from '@/components/FeatureVideosSection'
import ProblemSection from '@/components/ProblemSection'
import FeaturesSection from '@/components/FeaturesSection'
import WorksWithSection from '@/components/WorksWithSection'
// import DemoSection from '@/components/DemoSection'
import MCPSection from '@/components/MCPSection'
import SocialProofSection from '@/components/SocialProofSection'
// import SwarmiSection from '@/components/SwarmiSection'
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
      ? 'Espacio de trabajo con IA para terminales Claude Code, Codex, Antigravity CLI, OpenCode y Kimi Code con herramientas MCP'
      : 'AI coding workspace for Claude Code, Codex, Antigravity CLI, OpenCode and Kimi Code terminals with MCP tools',
    url: baseUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Windows',
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
        <ProblemSection />
        <FeaturesSection />
        <FeatureVideosSection />
        <WorksWithSection />
        {/* <DemoSection /> */}
        <MCPSection />
        <SocialProofSection />
        {/* <SwarmiSection /> */}
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
