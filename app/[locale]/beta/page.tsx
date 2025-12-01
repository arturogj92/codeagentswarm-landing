import { Metadata } from 'next'
import Header from '@/components/Header'
import BetaHeroSection from '@/components/BetaHeroSection'
import BetaWhatIs from '@/components/BetaWhatIs'
import BetaHowToJoin from '@/components/BetaHowToJoin'
import BetaSignupForm from '@/components/BetaSignupForm'
import BetaWhatYouGet from '@/components/BetaWhatYouGet'
import BetaPricingSection from '@/components/BetaPricingSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'CodeAgentSwarm Open Beta – Free Pro Access for Developers',
  description: 'Join the open beta, get the full Pro tier for free, and help shape the future of multi-agent coding workflows.',
}

export default function BetaPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Fixed Grid Background */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Floating Gradient Orbs */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-neon-purple/5 via-transparent to-transparent blur-2xl pointer-events-none will-change-auto" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent blur-2xl pointer-events-none will-change-auto" />

      {/* Content */}
      <Header />

      <main>
        <BetaHeroSection />
        <BetaWhatIs />
        <BetaHowToJoin />
        <BetaSignupForm />
        <BetaWhatYouGet />
        <BetaPricingSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
