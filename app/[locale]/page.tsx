'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import BetaBanner from '@/components/BetaBanner'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import FeaturesSection from '@/components/FeaturesSection'
import MCPSection from '@/components/MCPSection'
import SocialProofSection from '@/components/SocialProofSection'
import SwarmiSection from '@/components/SwarmiSection'
import PricingSection from '@/components/PricingSection'
import RoadmapSection from '@/components/RoadmapSection'
import FAQSection from '@/components/FAQSection'
import GuidesSection from '@/components/GuidesSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
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
        <MCPSection />
        <SocialProofSection />
        <SwarmiSection />
        <PricingSection />
        <RoadmapSection />
        <FAQSection />
        <GuidesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
