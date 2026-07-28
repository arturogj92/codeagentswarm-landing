// Shared release/download helpers used by the home download section (CTASection)
// and the guide download CTAs. Single source of truth for backend URLs.

export interface DownloadAsset {
  fileName: string
  fileUrl: string
  fileSize: number
}

export interface Release {
  version: string
  releaseDate: string
  formattedDownloads: {
    macArm: DownloadAsset | null
    macIntel: DownloadAsset | null
  }
  // Raw per-(platform-arch) map from the backend, e.g. 'win32-x64', 'win32-arm64'
  downloads?: Record<string, DownloadAsset>
}

export type DownloadTarget = 'silicon' | 'intel' | 'windows_x64' | 'windows_arm64'

export const BACKEND_BASE = 'https://codeagentswarm-backend-production.up.railway.app'

export function getDirectDownloadUrl(version: string, arch: string) {
  return `${BACKEND_BASE}/api/releases/download-dmg/${version}/${arch}`
}

// Routes the download through the backend so it is counted server-side
// (app_downloads); platform must be silicon | intel | windows-x64 | windows-arm64
export function getTrackedDownloadUrl(version: string, platform: string) {
  return `${BACKEND_BASE}/api/releases/download/${version}/${platform}`
}

export function notifyLandingEvent(event: string, data: Record<string, string>) {
  fetch(`${BACKEND_BASE}/api/notifications/landing-event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, data }),
  }).catch(() => {})
}

// The newest version may be platform-specific (e.g. a Windows-only patch), so
// pick the latest release that actually has builds for each platform.
export function pickMacRelease(releases: Release[]): Release | null {
  return releases.find((r) => r.formattedDownloads?.macArm || r.formattedDownloads?.macIntel) ?? null
}

export function pickWinRelease(releases: Release[]): Release | null {
  return releases.find((r) => r.downloads?.['win32-x64'] || r.downloads?.['win32-arm64']) ?? null
}

// Umami/notification architecture labels, matching what the home sends today.
export const ARCHITECTURE_BY_TARGET: Record<DownloadTarget, string> = {
  silicon: 'silicon',
  intel: 'intel',
  windows_x64: 'windows-x64',
  windows_arm64: 'windows-arm64',
}

export function resolveDownloadForTarget(
  releases: Release[],
  target: DownloadTarget
): { href: string; version: string } | null {
  if (target === 'silicon' || target === 'intel') {
    const mac = pickMacRelease(releases)
    if (!mac) return null
    if (target === 'silicon' && mac.formattedDownloads.macArm) {
      return { href: getDirectDownloadUrl(mac.version, 'arm64'), version: mac.version }
    }
    if (target === 'intel' && mac.formattedDownloads.macIntel) {
      return { href: getDirectDownloadUrl(mac.version, 'x64'), version: mac.version }
    }
    return null
  }
  const win = pickWinRelease(releases)
  if (!win) return null
  if (target === 'windows_x64' && win.downloads?.['win32-x64']) {
    return { href: getTrackedDownloadUrl(win.version, 'windows-x64'), version: win.version }
  }
  if (target === 'windows_arm64' && win.downloads?.['win32-arm64']) {
    return { href: getTrackedDownloadUrl(win.version, 'windows-arm64'), version: win.version }
  }
  return null
}
