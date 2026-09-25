'use client'

import { Download } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useGuideDownload } from '@/hooks/useGuideDownload'
import { ARCHITECTURE_BY_TARGET, notifyLandingEvent, type DownloadTarget, type DownloadSource, type DownloadPosition } from '@/lib/releases'

const PLATFORM_MESSAGE_KEY: Record<DownloadTarget, string> = {
  silicon: 'silicon',
  intel: 'intel',
  windows_x64: 'windowsX64',
  windows_arm64: 'windowsArm64',
}

interface GuideDownloadButtonProps {
  locale: 'en' | 'es'
  slug?: string
  position: DownloadPosition
  source?: DownloadSource
  prominent?: boolean
  size?: 'md' | 'lg'
  align?: 'start' | 'left' | 'center'
}

export default function GuideDownloadButton({ locale, slug, position, source = 'guide', prominent = position === 'product_block', size = 'md', align = 'start' }: GuideDownloadButtonProps) {
  const t = useTranslations('guides.downloadCta')
  const download = useGuideDownload(locale)

  const productBlock = prominent
  const attribution: Record<string, string> = { source, position, ...(source === 'guide' && slug ? { guide: slug } : {}) }
  const trackClick = (choice = download) => {
    // Legacy click events keep their historical names so the Umami baselines
    // (guide_cta_click / guide_product_block_click) stay comparable.
    if (source === 'guide') {
      window.umami?.track(position === 'product_block' ? 'guide_product_block_click' : 'guide_cta_click', attribution)
    } else {
      window.umami?.track(`${source}_cta_click`, attribution)
    }
    if (choice.direct && choice.target) {
      // New guide-born download events, parallel to download_app_home_*.
      window.umami?.track(`download_app_${source}_${choice.target}`, {
        ...attribution,
        version: choice.version ?? '',
      })
      notifyLandingEvent('download_app', {
        architecture: ARCHITECTURE_BY_TARGET[choice.target],
        version: choice.version ?? '',
        ...attribution,
      })
    }
  }

  const buttonClasses =
    productBlock
      ? 'inline-flex items-center gap-2.5 min-h-[46px] bg-neon-cyan text-black font-semibold text-[13px] px-[18px] py-3 rounded-full hover:bg-amber-300 transition-colors'
      : size === 'lg'
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
      <a href={download.href} onClick={() => trackClick()} className={`${buttonClasses} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-cyan`}>
        {productBlock && download.target && (download.target.startsWith('windows') ? <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M0 2.2 6.5 1.3v6H0zm7.5-1L16 0v7.3H7.5zM0 8.3h6.5v6L0 13.4zm7.5 0H16V16l-8.5-1.2z" /></svg> : <Image src="/icons/apple-logo.png" alt="" width={16} height={16} className="brightness-0" />)}
        {productBlock && download.target ? t(download.target.startsWith('windows') ? 'windowsButton' : 'macButton') : t(position === 'inline' ? 'inlineButton' : 'button')}
        <Download className="w-4 h-4" strokeWidth={2.4} />
      </a>
      {/* Fixed-height caption so the platform text can swap in after detection
          without any layout shift. */}
      <span className="min-h-[1rem] text-xs leading-4 text-white/40">
        {download.direct && download.target ? (
          <>
            {productBlock && <>{t('freeBeta')}{' · '}</>}
            {t(`platform.${PLATFORM_MESSAGE_KEY[download.target]}`)}
            {!productBlock && <>{' · '}
            <a
              href={`/${locale}#download`}
              onClick={() => {
                window.umami?.track('guide_cta_click', { ...attribution, link: 'other_platforms' })
              }}
              className="underline decoration-white/30 underline-offset-2 hover:text-white/70 transition-colors"
            >
              {t('otherPlatforms')}
            </a></>}
          </>
        ) : (
          t('platform.generic')
        )}
      </span>
      {productBlock && download.options.length > 0 && (
        <details className="text-[11px] text-neutral-400">
          <summary className="cursor-pointer underline underline-offset-4 focus-visible:outline focus-visible:outline-neon-cyan">{t('otherPlatforms')}</summary>
          <div className="flex flex-col items-start gap-2 pt-3">
            {download.options.filter((option) => option.target !== download.target).map((option) => (
              <a key={option.target} href={option.href} onClick={() => trackClick({ ...option, direct: true, options: download.options })} className="underline underline-offset-4 hover:text-white">
                {t(`platform.${PLATFORM_MESSAGE_KEY[option.target]}`)}
              </a>
            ))}
          </div>
        </details>
      )}
    </div>
  )
}
