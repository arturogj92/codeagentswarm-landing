'use client'

import { useLocale } from 'next-intl'
import { VideoShowcase } from './HeroSection'

// The 6 feature videos (multi-terminal, multi-model, history, kanban, Git, notifications),
// moved out of the hero to a detail section below it.
export default function FeatureVideosSection() {
  const locale = useLocale()
  return (
    <section id="feature-videos" className="relative py-20 px-6 scroll-mt-32">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="heading-lg text-white mb-3">
          {locale === 'es' ? 'Cada función, en detalle' : 'See each feature in action'}
        </h2>
        <p className="text-lg text-white/50 max-w-2xl mx-auto">
          {locale === 'es'
            ? 'Multiterminal, multimodelo, historial de conversaciones, kanban, Git y notificaciones.'
            : 'Multi-terminal, multi-model, conversation history, kanban, Git and notifications.'}
        </p>
      </div>
      <VideoShowcase />
    </section>
  )
}
