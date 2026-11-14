import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getDirectDownloadUrl, getLinuxDownloads, getTrackedDownloadUrl, publicReleases, resolveDownloadForTarget, type Release } from './releases.ts'
const asset = { fileName: 'test', fileUrl: 'https://example.invalid/test', fileSize: 17 }
const releases: Release[] = [{ version: '2.4.1', releaseDate: '', formattedDownloads: { macArm: null, macIntel: null },
  downloads: Object.fromEntries(['x64', 'arm64'].flatMap(arch => ['deb', 'appimage'].map(format => [`linux-${arch}-${format}`, asset]))),
}, { version: '2.4.0', releaseDate: '', formattedDownloads: { macArm: asset, macIntel: null }, downloads: { 'win32-x64': asset } }]
test('Linux is public by default and hidden only by an explicit false', () => {
  if (process.env.NEXT_PUBLIC_LINUX_DOWNLOADS_ENABLED !== 'false') {
    assert.equal(publicReleases(releases).length, 2)
    assert.equal(getLinuxDownloads(releases).length, 4)
    assert.ok(getLinuxDownloads(releases).every(d => d.href.endsWith(d.target)))
    assert.ok(resolveDownloadForTarget(releases, 'linux_arm64_appimage')?.href.endsWith('/2.4.1/linux-arm64-appimage'))
  } else {
    assert.deepEqual(getLinuxDownloads(releases), [])
    assert.equal(resolveDownloadForTarget(releases, 'linux_x64_deb'), null)
    assert.equal(publicReleases(releases).length, 1)
    assert.equal(publicReleases(releases)[0].version, '2.4.0')
  }
  assert.ok(resolveDownloadForTarget(releases, 'windows_x64')?.href.includes('/2.4.0/windows-x64'))
  assert.ok(resolveDownloadForTarget(releases, 'silicon')?.href.includes('/2.4.0/arm64'))
})

test('A shared link carries its source to the installer request', () => {
  const page = (search: string) => Object.defineProperty(globalThis, 'window', { configurable: true, value: { location: { search } } })
  try {
    page('?source=mobile_share')
    assert.ok(getTrackedDownloadUrl('2.4.3', 'windows-x64').endsWith('/2.4.3/windows-x64?source=mobile_share'))
    assert.ok(getDirectDownloadUrl('2.4.3', 'arm64').endsWith('/2.4.3/arm64?source=mobile_share'))
    page('?source=Not%20Valid!')
    assert.ok(getTrackedDownloadUrl('2.4.3', 'windows-x64').endsWith('/windows-x64'))
  } finally {
    // @ts-expect-error test cleanup
    delete globalThis.window
  }
})
