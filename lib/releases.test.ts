import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getLinuxDownloads, publicReleases, resolveDownloadForTarget, type Release } from './releases.ts'
const asset = { fileName: 'test', fileUrl: 'https://example.invalid/test', fileSize: 17 }
const releases: Release[] = [{ version: '2.4.1', releaseDate: '', formattedDownloads: { macArm: null, macIntel: null },
  downloads: Object.fromEntries(['x64', 'arm64'].flatMap(arch => ['deb', 'appimage'].map(format => [`linux-${arch}-${format}`, asset]))),
}, { version: '2.4.0', releaseDate: '', formattedDownloads: { macArm: asset, macIntel: null }, downloads: { 'win32-x64': asset } }]
test('Linux stays hidden by default, including Linux-only releases', () => {
  if (process.env.NEXT_PUBLIC_LINUX_DOWNLOADS_ENABLED === 'true') {
    assert.equal(publicReleases(releases).length, 2)
    assert.equal(getLinuxDownloads(releases).length, 4)
    assert.ok(getLinuxDownloads(releases).every(d => d.href.endsWith(d.target)))
  } else {
    assert.deepEqual(getLinuxDownloads(releases), [])
    assert.equal(publicReleases(releases).length, 1)
    assert.equal(publicReleases(releases)[0].version, '2.4.0')
  }
  assert.ok(resolveDownloadForTarget(releases, 'windows_x64')?.href.includes('/2.4.0/windows-x64'))
  assert.ok(resolveDownloadForTarget(releases, 'silicon')?.href.includes('/2.4.0/arm64'))
})
