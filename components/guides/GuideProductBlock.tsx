'use client'

import { Download } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

const VIDEO_CDN_BASE =
  'https://fqamfucosytcyueqadog.supabase.co/storage/v1/object/public/landing-assets/videos'

// Intrinsic aspect ratios (width / height) of the CDN videos, used to reserve
// vertical space before the lazy-loaded video arrives so the article never
// shifts layout when the video loads.
const VIDEO_ASPECT: Record<string, number> = {
  'terminals.mp4': 1660 / 1080,
  'multi-model.mp4': 1660 / 1080,
  'conversation_history.mp4': 1800 / 1080,
  'gitmanager.mp4': 972 / 720,
}

// Pure, testable mapping from a guide slug (English or Spanish) to the demo
// video that best matches its topic. Order matters: topic keywords win over
// CLI-name keywords (e.g. "codex-cli-conversation-history" shows the
// conversation history video, not the multi-model one).
export function pickGuideVideo(slug: string): string {
  const s = slug.toLowerCase()
  const has = (...words: string[]) => words.some((w) => s.includes(w))

  if (has('history', 'historial', 'conversation', 'conversacion')) {
    return 'conversation_history.mp4'
  }
  if (has('changes', 'cambios', 'git')) {
    return 'gitmanager.mp4'
  }
  if (/(^|-)vs(-|$)/.test(s) || has('yolo', 'codex', 'gemini', 'opencode')) {
    return 'multi-model.mp4'
  }
  return 'terminals.mp4'
}

interface GuideProductBlockProps {
  locale: 'en' | 'es'
  slug: string
  videoKey: string
  /** Optional guide-specific copy (meta.ctaText); falls back to a generic text per locale. */
  ctaText?: string
}

// Product showcase block rendered inside the guide article, right after the
// intro. The video only starts loading when the block approaches the viewport
// (IntersectionObserver) so it never competes with the guide's LCP.
export default function GuideProductBlock({ locale, slug, videoKey, ctaText }: GuideProductBlockProps) {
  const t = useTranslations('guides.productBlock')
  const containerRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const videoSrc = `${VIDEO_CDN_BASE}/${videoKey}`
  const aspectRatio = VIDEO_ASPECT[videoKey] ?? 16 / 9

  return (
    <aside
      ref={containerRef}
      className="mb-10 rounded-[20px] border border-neon-cyan/25 overflow-hidden bg-[#0a0a0a] bg-[linear-gradient(160deg,rgba(251,191,36,0.07),rgba(0,0,0,0)_45%)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="px-4 pt-[18px] sm:px-[26px] sm:pt-[22px]">
        <div className="inline-flex items-center gap-[7px] text-[11.5px] font-semibold uppercase tracking-[0.14em] text-neon-cyan mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
          {t('overline')}
        </div>
        <p className="text-[21px] font-bold text-white leading-[1.3] mb-1.5 m-0">{t('title')}</p>
        <p className="text-[15.5px] text-white/65 mb-4 m-0">{ctaText ?? t('copy')}</p>
      </div>

      <div
        className="mx-4 sm:mx-[26px] rounded-xl border border-white/10 overflow-hidden bg-black"
        style={{ aspectRatio }}
      >
        {inView && (
          <video
            className="block w-full h-full object-cover"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 px-4 pt-4 pb-5 sm:px-[26px] sm:pt-[18px] sm:pb-6">
        <Link
          href={`/${locale}#download`}
          onClick={() => {
            window.umami?.track('guide_product_block_click', { guide: slug })
          }}
          className="inline-flex items-center gap-2 bg-neon-cyan text-black font-semibold text-[15px] px-[26px] py-3 rounded-full hover:bg-amber-500 transition-colors shadow-[0_0_20px_rgba(251,191,36,0.25)]"
        >
          {t('button')}
          <Download className="w-[15px] h-[15px]" strokeWidth={2.4} />
        </Link>
        <span className="text-[13px] text-white/45">{t('sub')}</span>
      </div>
    </aside>
  )
}
