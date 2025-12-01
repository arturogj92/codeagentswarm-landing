'use client'

import Header from '@/components/Header'
import BetaBanner from '@/components/BetaBanner'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import SolutionSection from '@/components/SolutionSection'
import FeaturesSection from '@/components/FeaturesSection'
import SocialProofSection from '@/components/SocialProofSection'
import DemoSection from '@/components/DemoSection'
import SwarmiSection from '@/components/SwarmiSection'
import PricingSection from '@/components/PricingSection'
import RoadmapSection from '@/components/RoadmapSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
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
      <div className="h-[52px]" />

      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <SocialProofSection />
        <DemoSection />
        <SwarmiSection />
        <PricingSection />
        <RoadmapSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
