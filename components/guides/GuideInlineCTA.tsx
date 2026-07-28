'use client'

import { useTranslations } from 'next-intl'
import { CTA_AGENT_MESSAGE_KEY, type GuideCtaAgent } from '@/content/guides/types'
import GuideDownloadButton from './GuideDownloadButton'

interface GuideInlineCTAProps {
  locale: 'en' | 'es'
  slug: string
  ctaAgent: GuideCtaAgent
}

// In-content CTA shown after the first section of a guide. SEO-safe: a regular
// element in the document flow (no sticky/fixed positioning, no interstitial,
// no layout shift). Copy adapts to the agent the guide is about.
export default function GuideInlineCTA({ locale, slug, ctaAgent }: GuideInlineCTAProps) {
  const t = useTranslations('guides.downloadCta')

  return (
    <aside className="my-12 p-6 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <p className="flex-1 text-white/80 leading-relaxed m-0">
          {t(`context.${CTA_AGENT_MESSAGE_KEY[ctaAgent]}`)}
        </p>
        <div className="shrink-0">
          <GuideDownloadButton locale={locale} slug={slug} position="inline" />
        </div>
      </div>
    </aside>
  )
}
