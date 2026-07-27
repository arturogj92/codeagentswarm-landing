import type { DownloadTarget } from './releases'

interface NavigatorUAData {
  getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>
}

// Best-effort client-side platform detection for the guide download CTAs.
// Returns null when the visitor cannot install the desktop app (mobile) or the
// OS is not supported; callers then fall back to the home #download section.
export async function detectDownloadTarget(): Promise<DownloadTarget | null> {
  if (typeof navigator === 'undefined') return null
  const ua = navigator.userAgent
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return null

  const isMacLike = /Macintosh|Mac OS X/.test(ua)
  // Modern iPadOS reports a Macintosh user agent; touch points give it away.
  if (isMacLike && navigator.maxTouchPoints > 1) return null
  const isWindows = /Windows/.test(ua)
  if (!isMacLike && !isWindows) return null

  // Chromium exposes the CPU architecture via UA client hints; Safari and
  // Firefox do not, so we default to the overwhelmingly common arch and offer
  // the rest through the "other platforms" link next to the button.
  let arch: string | undefined
  try {
    const uaData = (navigator as Navigator & { userAgentData?: NavigatorUAData }).userAgentData
    if (uaData?.getHighEntropyValues) {
      arch = (await uaData.getHighEntropyValues(['architecture'])).architecture
    }
  } catch {
    // ignore: fall through to defaults
  }

  if (isMacLike) return arch === 'x86' ? 'intel' : 'silicon'
  return arch === 'arm' ? 'windows_arm64' : 'windows_x64'
}
