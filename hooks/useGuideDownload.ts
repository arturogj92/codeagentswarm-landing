'use client'

import { useEffect, useState } from 'react'
import { detectDownloadTarget } from '@/lib/platform'
import { resolveDownloadForTarget, type DownloadTarget, type Release } from '@/lib/releases'

export interface GuideDownloadState {
  href: string
  direct: boolean
  target: DownloadTarget | null
  version: string | null
}

// One fetch per page load, shared by every CTA instance on the page. The API
// route is CDN-cached for 5 minutes, so this is cheap even at guide scale.
let releasesPromise: Promise<Release[]> | null = null
function fetchReleases(): Promise<Release[]> {
  if (!releasesPromise) {
    releasesPromise = fetch('/api/releases?limit=5&preferDmg=true')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`http_${res.status}`))))
      .then((data) => (Array.isArray(data?.releases) ? (data.releases as Release[]) : []))
      .catch(() => {
        releasesPromise = null
        return []
      })
  }
  return releasesPromise
}

// SSR and the first client render always return the home-#download fallback so
// the crawled HTML is stable; the href upgrades to a direct download after
// hydration when the platform is detected and a matching build exists.
export function useGuideDownload(locale: 'en' | 'es'): GuideDownloadState {
  const [state, setState] = useState<GuideDownloadState>({
    href: `/${locale}#download`,
    direct: false,
    target: null,
    version: null,
  })

  useEffect(() => {
    let cancelled = false
    Promise.all([fetchReleases(), detectDownloadTarget()]).then(([releases, target]) => {
      if (cancelled || !target || releases.length === 0) return
      const resolved = resolveDownloadForTarget(releases, target)
      if (!resolved) return
      setState({ href: resolved.href, direct: true, target, version: resolved.version })
    })
    return () => {
      cancelled = true
    }
  }, [locale])

  return state
}
