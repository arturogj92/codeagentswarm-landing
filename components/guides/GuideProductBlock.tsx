'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import { Expand, X } from 'lucide-react'
import type { GuideCtaAgent } from '@/content/guides/types'
import MobileEmailPanel from '../MobileEmailPanel'
import GuideDownloadButton from './GuideDownloadButton'
import { pickGuideVideo } from './guide-video'

export { pickGuideVideo } from './guide-video'

const VIDEO_CDN_BASE =
  'https://fqamfucosytcyueqadog.supabase.co/storage/v1/object/public/landing-assets/videos'

// Intrinsic aspect ratios (width / height) of the CDN videos, used to reserve
// vertical space before the lazy-loaded video arrives so the article never
// shifts layout when the video loads.
const VIDEO_ASPECT: Record<string, number> = {
  'terminals.mp4': 1660 / 1080,
  'terminals-list.mp4': 16 / 9,
  'multi-model-v2.mp4': 1660 / 1080,
  'agent-claude.mp4': 1660 / 1080,
  'agent-codex.mp4': 1660 / 1080,
  'agent-antigravity.mp4': 1660 / 1080,
  'agent-opencode.mp4': 1660 / 1080,
  'agent-kimi.mp4': 1660 / 1080,
  'agent-grok.mp4': 1660 / 1080,
  'agent-chat-claude.mp4': 1660 / 1080,
  'agent-chat-codex.mp4': 1660 / 1080,
  'agent-chat-antigravity.mp4': 1660 / 1080,
  'agent-chat-opencode.mp4': 1660 / 1080,
  'agent-chat-kimi.mp4': 1660 / 1080,
  'agent-chat-grok.mp4': 1660 / 1080,
  'conversation_history.mp4': 1800 / 1080,
  'gitmanager.mp4': 972 / 720,
  'guide-conversation-history.mp4': 16 / 9,
  'guide-terminals.mp4': 16 / 9,
  'guide-gitmanager.mp4': 16 / 9,
  'guide-kanban.mp4': 16 / 9,
  'guide-terminal-notifications.mp4': 1708 / 1080,
}

interface GuideProductBlockProps {
  locale: 'en' | 'es'
  slug: string
  videoKey: string
  ctaAgent: GuideCtaAgent
}

// Product showcase block rendered inside the guide article, right after the
// intro. The video only starts loading when the block approaches the viewport
// (IntersectionObserver) so it never competes with the guide's LCP.
export default function GuideProductBlock({ locale, slug, videoKey, ctaAgent }: GuideProductBlockProps) {
  const t = useTranslations('guides.productBlock')
  const headingId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
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
  const message = videoKey === 'guide-conversation-history.mp4'
    ? 'history'
    : videoKey === 'guide-terminals.mp4'
      ? 'parallel'
      : videoKey === 'guide-gitmanager.mp4'
        ? 'worktrees'
        : null

  const agentNames: Partial<Record<GuideCtaAgent, string>> = {
    'claude-code': 'Claude Code', codex: 'Codex', opencode: 'OpenCode',
    'kimi-code': 'Kimi Code', antigravity: 'Antigravity', 'grok-build': 'Grok Build',
  }
  const agent = agentNames[ctaAgent]
  const useFeatureVideo = videoKey.startsWith('guide-') && videoKey !== 'guide-terminals.mp4'
  const media = (expanded = false) => useFeatureVideo ? (
    <video
      className="block w-full h-auto"
      style={{ aspectRatio }}
      src={inView ? videoSrc : undefined}
      autoPlay={!expanded}
      controls={expanded}
      muted loop playsInline preload="none"
    />
  ) : (
    <Image
      src="/images/guides/parallel-workspace-codex.webp"
      alt={t('workspaceAlt')}
      width={1280} height={720}
      sizes={expanded ? '94vw' : '(max-width: 767px) 90vw, 420px'}
      className="block w-full h-auto"
    />
  )

  return (
    <aside
      ref={containerRef}
      aria-labelledby={headingId}
      data-guide-product-block
      className="mb-10 grid md:grid-cols-2 gap-6 items-center p-5 md:p-7 rounded-[20px] border border-neon-cyan/25 bg-[#0a0a0a] bg-[linear-gradient(130deg,rgba(251,191,36,0.055),transparent_65%)]"
    >
      <div>
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-neon-cyan mb-3">
          <span aria-hidden="true" className="w-[5px] h-[5px] rounded-full bg-neon-cyan" />
          {agent ? `${agent}${/windows/.test(slug) ? ' · Windows' : ''}` : t('workspaceLabel')}
        </p>
        <h2 id={headingId} className="text-[28px] font-bold text-white leading-[1.15] tracking-[-0.035em] mb-3">
          {message ? t(`${message}.title`) : agent ? t('agentTitle', { agent }) : t('parallel.title')}
        </h2>
        <p className="text-sm leading-[1.65] text-white/65 mb-6">
          {message ? t(`${message}.copy`) : agent ? t('agentCopy', { agent }) : t('parallel.copy')}
        </p>
        <div className="hidden md:block">
          <GuideDownloadButton locale={locale} slug={slug} position="product_block" size="lg" align="left" />
        </div>
        <div className="md:hidden">
          <MobileEmailPanel guide={slug} />
        </div>
        <p className="text-[11px] text-neutral-400 mt-4">{t('providerNote')}</p>
      </div>
      <figure className="min-w-0 m-0">
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          aria-label={t('enlarge')}
          className="relative block w-full rounded-[10px] border border-white/15 overflow-hidden bg-black cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-cyan"
        >
          {media()}
          <span className="absolute right-2 bottom-2 p-1.5 rounded bg-neutral-900/90 border border-white/15"><Expand aria-hidden="true" className="w-3.5 h-3.5 text-neutral-300" /></span>
        </button>
        <figcaption className="text-[10px] md:text-[9px] leading-relaxed text-neutral-400 mt-2">
          {t(useFeatureVideo ? 'featureCaption' : 'workspaceCaption')}
        </figcaption>
      </figure>
      <dialog
        ref={dialogRef}
        aria-label={t('enlarge')}
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }}
        className="m-auto w-[94vw] max-w-[1100px] max-h-[94vh] p-4 pt-10 rounded-xl border border-white/25 bg-neutral-950 text-white backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <button type="button" onClick={() => dialogRef.current?.close()} aria-label={t('close')} className="absolute top-2 right-3 p-1 focus-visible:outline focus-visible:outline-neon-cyan"><X className="w-5 h-5" /></button>
        {media(true)}
        <p className="text-xs text-neutral-400 mt-3">{t(useFeatureVideo ? 'featureCaption' : 'workspaceCaption')}</p>
      </dialog>
    </aside>
  )
}
