'use client'

import { useCallback } from 'react'
import { useLocale } from 'next-intl'
import { useGuideDownload } from '@/hooks/useGuideDownload'
import { ARCHITECTURE_BY_TARGET, notifyLandingEvent } from '@/lib/releases'

/** Where in the demo the button lives, so the events can tell them apart. */
export type DemoDownloadPosition = 'section'

/**
 * The original click event of each button, kept under its historical name so
 * whatever Umami has already recorded stays comparable.
 */
const LEGACY_EVENT: Record<DemoDownloadPosition, string> = {
  section: 'demo_download_click',
}

/**
 * Makes a demo button actually download the app, and reports it as a download.
 *
 * The three buttons used to point at `#download`, which only scrolls the page.
 * That is measurable as intent but it is a dead end for attribution: the
 * visitor then clicks AGAIN in the download section, and that second click is
 * recorded as `download_app_home_*` with no memory of where it came from. So
 * the question worth asking - does the demo actually produce downloads? - could
 * not be answered, only guessed at from two unrelated counters.
 *
 * Now they behave exactly like the guide CTAs: direct download when the
 * platform is known, reported as `download_app_demo_*` and counted server-side
 * with `source: 'demo'`. When the platform cannot be detected the href falls
 * back to `#download`, so nobody is ever left without a way through.
 */
export function useDemoDownload(position: DemoDownloadPosition) {
  const locale = useLocale() as 'en' | 'es'
  const download = useGuideDownload(locale)

  const onClick = useCallback(() => {
    window.umami?.track(LEGACY_EVENT[position])
    if (!download.direct || !download.target) return
    window.umami?.track(`download_app_demo_${download.target}`, {
      position,
      version: download.version ?? '',
    })
    // The server-side counter, which is the number that does not depend on the
    // visitor having ad blocking switched off.
    notifyLandingEvent('download_app', {
      architecture: ARCHITECTURE_BY_TARGET[download.target],
      version: download.version ?? '',
      source: 'demo',
      position,
    })
  }, [download, position])

  return { href: download.href, direct: download.direct, onClick }
}
