"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import FeaturesSection from "@/components/features-section"
import DemoSection from "@/components/demo-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"

export default function Home() {
  return (
    <div className="relative">
      <ShaderBackground>
        <Header />
        <HeroContent />
        <PulsingCircle />
        
        {/* Content Sections */}
        <FeaturesSection />
        <DemoSection />
        <CTASection />
        <Footer />
      </ShaderBackground>
    </div>
  )
}