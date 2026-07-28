'use client'

import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useGuideDownload } from '@/hooks/useGuideDownload'
import { ARCHITECTURE_BY_TARGET, notifyLandingEvent, type DownloadTarget } from '@/lib/releases'

const PLATFORM_MESSAGE_KEY: Record<DownloadTarget, string> = {
  silicon: 'silicon',
  intel: 'intel',
  windows_x64: 'windowsX64',
  windows_arm64: 'windowsArm64',
}

interface GuideDownloadButtonProps {
  locale: 'en' | 'es'
  slug: string
  position: 'inline' | 'product_block' | 'final'
  size?: 'md' | 'lg'
  align?: 'start' | 'left' | 'center'
}

export default function GuideDownloadButton({ locale, slug, position, size = 'md', align = 'start' }: GuideDownloadButtonProps) {
  const t = useTranslations('guides.downloadCta')
  const download = useGuideDownload(locale)

  const trackClick = () => {
    // Legacy click events keep their historical names so the Umami baselines
    // (guide_cta_click / guide_product_block_click) stay comparable.
    if (position === 'product_block') {
      window.umami?.track('guide_product_block_click', { guide: slug })
    } else {
      window.umami?.track('guide_cta_click', { guide: slug, position })
    }
    if (download.direct && download.target) {
      // New guide-born download events, parallel to download_app_home_*.
      window.umami?.track(`download_app_guide_${download.target}`, {
        guide: slug,
        position,
        version: download.version ?? '',
      })
      notifyLandingEvent('download_app', {
        architecture: ARCHITECTURE_BY_TARGET[download.target],
        version: download.version ?? '',
        source: 'guide',
        guide: slug,
      })
    }
  }

  const buttonClasses =
    size === 'lg'
      ? 'inline-flex items-center gap-2 bg-neon-cyan text-black font-semibold text-[15px] px-[26px] py-3 rounded-full hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(251,191,36,0.25)]'
      : 'inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neon-cyan text-black font-semibold rounded-full hover:bg-amber-400 transition-colors'

  // 'start' hugs the right edge on desktop (inline CTA next to a paragraph), 'left' stays left-anchored (product block footer).
  const alignClasses =
    align === 'center'
      ? 'items-center text-center'
      : align === 'left'
        ? 'items-start text-left'
        : 'items-start sm:items-end text-left sm:text-right'

  return (
    <div className={`flex flex-col gap-1.5 ${alignClasses}`}>
      <a href={download.href} onClick={trackClick} className={buttonClasses}>
        {t('button')}
        <Download className="w-4 h-4" strokeWidth={2.4} />
      </a>
      {/* Fixed-height caption so the platform text can swap in after detection
          without any layout shift. */}
      <span className="min-h-[1rem] text-xs leading-4 text-white/40">
        {download.direct && download.target ? (
          <>
            {t(`platform.${PLATFORM_MESSAGE_KEY[download.target]}`)}
            {' · '}
            <a
              href={`/${locale}#download`}
              onClick={() => {
                window.umami?.track('guide_cta_click', { guide: slug, position, link: 'other_platforms' })
              }}
              className="underline decoration-white/30 underline-offset-2 hover:text-white/70 transition-colors"
            >
              {t('otherPlatforms')}
            </a>
          </>
        ) : (
          t('platform.generic')
        )}
      </span>
    </div>
  )
}
