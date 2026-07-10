'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

const DISMISS_KEY = 'cas_guide_sticky_bar_dismissed'

interface StickyDownloadBarProps {
  locale: 'en' | 'es'
  slug: string
}

// Bottom download bar for guide pages. Slides in once the reader has scrolled
// past 25% of the page. Dismissing it hides it for the rest of the session
// (sessionStorage). Kept at z-40 (same layer as the fixed header) so any
// modal/overlay above z-40 still covers it.
export default function StickyDownloadBar({ locale, slug }: StickyDownloadBarProps) {
  const t = useTranslations('guides.stickyBar')
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') {
        setDismissed(true)
        return
      }
    } catch {
      // sessionStorage unavailable: behave as not dismissed
    }

    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return
      const ratio = window.scrollY / maxScroll
      // Hysteresis: the in-flow spacer changes scrollHeight when the bar
      // appears, so using a single 25% threshold could flicker right at the
      // boundary. Show past 25%, only hide again below 18%.
      setVisible((prev) => (prev ? ratio > 0.18 : ratio > 0.25))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // ignore
    }
    window.umami?.track('guide_sticky_bar_dismiss', { guide: slug })
  }

  if (dismissed) return null

  return (
    <>
      {/* In-flow spacer so the fixed bar never covers the end of the article */}
      {visible && <div aria-hidden className="h-20" />}

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[rgba(8,8,8,0.92)] backdrop-blur-[14px] transition-transform duration-[350ms] ease-out ${
          visible ? 'translate-y-0' : 'translate-y-[110%]'
        }`}
      >
        <div className="max-w-[1100px] mx-auto flex items-center gap-3.5 px-5 py-3">
          <Image src="/isotipo.png" alt="" width={26} height={26} className="w-[26px] h-[26px]" />
          <p className="flex-1 text-sm text-white/75 m-0">
            <strong className="text-white font-semibold">CodeAgentSwarm</strong>{' '}
            <span className="hidden sm:inline">{t('text')} </span>
            {t('textShort')}
          </p>
          <Link
            href={`/${locale}#download`}
            onClick={() => {
              window.umami?.track('guide_sticky_bar_click', { guide: slug })
            }}
            className="bg-neon-cyan text-black font-semibold text-[13.5px] px-5 py-[9px] rounded-full whitespace-nowrap hover:bg-amber-500 transition-colors"
          >
            {t('button')}
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label={t('close')}
            className="bg-transparent border-0 p-1.5 text-lg leading-none text-white/40 hover:text-white cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  )
}
