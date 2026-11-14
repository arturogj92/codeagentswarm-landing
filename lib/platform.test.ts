import { test } from 'node:test'
import assert from 'node:assert/strict'
import { detectDownloadTarget } from './platform.ts'

const detect = (userAgent: string, architecture?: string) => {
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: {
    userAgent, maxTouchPoints: 0,
    userAgentData: architecture ? { getHighEntropyValues: async () => ({ architecture }) } : undefined,
  } })
  return detectDownloadTarget()
}

test('Linux desktops get a direct download, phones and ChromeOS do not', async () => {
  assert.equal(await detect('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36', 'x86'), 'linux_x64_deb')
  assert.equal(await detect('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0'), 'linux_x64_deb')
  assert.equal(await detect('Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0'), 'linux_x64_appimage')
  assert.equal(await detect('Mozilla/5.0 (X11; Linux aarch64; rv:140.0) Gecko/20100101 Firefox/140.0'), 'linux_arm64_deb')
  assert.equal(await detect('Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Chrome/140.0.0.0 Mobile Safari/537.36'), null)
  assert.equal(await detect('Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36'), null)
  assert.equal(await detect('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36', 'x86'), 'windows_x64')
})
