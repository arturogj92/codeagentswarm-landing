// Run against a local landing server. All download/email writes are intercepted.
// PLAYWRIGHT_MODULE may point to an existing Playwright installation.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || require.resolve('playwright', { paths: [process.cwd(), path.resolve(__dirname, '../../codeagentswarm-app')] }))
const base = process.env.GUIDE_TEST_URL || 'http://127.0.0.1:3016'
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'Use a local server')
const output = process.env.GUIDE_EVIDENCE_DIR || '/tmp/guide-download-evidence'
const asset = { fileName: 'installer', fileUrl: 'https://example.invalid/installer', fileSize: 100 }
const releases = [
  { version: '2.3.1', formattedDownloads: { macArm: null, macIntel: null }, downloads: { 'win32-x64': asset, 'win32-arm64': asset } },
  { version: '2.3.0', formattedDownloads: { macArm: asset, macIntel: asset } },
]
const windows = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36'
const mac = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15'
const iphone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1'
let emailReply = { status: 200, body: { queued: true, emailSent: true } }
const emailRequests = [], notifications = [], errors = []
async function prepare(browser, userAgent, width = 1440, architecture) {
  const context = await browser.newContext({ userAgent, viewport: { width, height: 1050 } })
  await context.addInitScript(({ architecture }) => {
    window.guideEvents = []
    window.umami = { track: (name, data) => window.guideEvents.push({ name, data }) }
    Object.defineProperty(navigator, 'userAgentData', { value: architecture ? { getHighEntropyValues: async () => ({ architecture }) } : undefined })
  }, { architecture })
  await context.route('**/*', async route => {
    const req = route.request(), url = new URL(req.url())
    if (url.pathname === '/api/releases') return route.fulfill({ json: { releases } })
    if (url.pathname === '/api/download-link') {
      emailRequests.push(req.postDataJSON())
      await new Promise(resolve => setTimeout(resolve, 150))
      return route.fulfill({ status: emailReply.status, json: emailReply.body })
    }
    if (url.pathname === '/api/notifications/landing-event') {
      notifications.push(req.postDataJSON())
      return route.fulfill({ json: { ok: true } })
    }
    if (/\/api\/releases\/download/.test(url.pathname)) return route.fulfill({ body: 'test installer', headers: { 'Content-Disposition': 'attachment; filename="test-installer.txt"' } })
    if (/umami|analytics|googletag|google-analytics/.test(url.href)) return route.fulfill({ contentType: 'application/javascript', body: '' })
    if (req.method() !== 'GET' && url.origin !== new URL(base).origin) return route.fulfill({ json: {} })
    return route.continue()
  })
  const page = await context.newPage()
  page.on('pageerror', error => errors.push(error.message))
  return { context, page }
}
async function screenshot(page, name, selector = '[data-guide-product-block]') {
  const block = page.locator(selector)
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(800)
  await block.evaluate(el => scrollTo({ top: el.getBoundingClientRect().top + scrollY - 98, behavior: 'instant' }))
  await page.waitForTimeout(200)
  await page.screenshot({ path: path.join(output, `${name}.png`) })
  if (await block.locator('figure img').count()) {
    const loaded = await block.locator('figure img').evaluate(el => el.complete && el.naturalWidth > 0)
    assert.ok(loaded, 'Workspace image loaded')
  }
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow')
}
async function submit(page) {
  await page.locator('[data-guide-product-block]').getByRole('button', { name: /Email me the download link/ }).click()
  await page.getByRole('button', { name: 'Sending...' }).waitFor()
}
(async () => {
  fs.mkdirSync(output, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  try {
    for (const [name, ua, arch, target] of [
      ['windows', windows, 'x86', 'windows-x64'], ['windows-arm', windows, 'arm', 'windows-arm64'],
      ['mac-silicon', mac, undefined, 'arm64'], ['mac-intel', mac, 'x86', 'x64'],
    ]) {
      const { context, page } = await prepare(browser, ua, 1440, arch)
      await page.goto(`${base}/en/guides/${name.startsWith('mac') ? 'how-to-use-kimi-code' : 'opencode-on-windows'}`)
      const block = page.locator('[data-guide-product-block]')
      const link = block.getByRole('link', { name: name.startsWith('mac') ? 'Download for Mac' : 'Download for Windows', exact: true })
      await link.waitFor()
      assert.ok((await link.getAttribute('href')).endsWith(`/${target}`))
      assert.ok((await link.getAttribute('href')).includes(name.startsWith('mac') ? '2.3.0' : '2.3.1'), 'Resolve platform-specific latest release')
      assert.equal(await block.getByRole('textbox').isVisible(), false)
      await screenshot(page, name)
      await block.locator('summary').click()
      assert.equal(await block.locator('details a').count(), 3)
      const alternate = block.locator('details a').first()
      const alternateUrl = await alternate.getAttribute('href')
      const downloaded = page.waitForEvent('download')
      await alternate.click()
      await downloaded
      assert.ok(notifications.at(-1)?.data.architecture, 'Alternate download has attribution')
      assert.ok(await page.evaluate(() => window.guideEvents.some(e => e.name.startsWith('download_app_guide_'))))
      await block.getByRole('button', { name: 'Enlarge the workspace preview' }).click()
      assert.equal(await block.locator('dialog').evaluate(el => el.open), true)
      await page.keyboard.press('Escape')
      assert.equal(await block.locator('dialog').evaluate(el => el.open), false)
      assert.ok(alternateUrl)
      await context.close()
    }
    const { context, page } = await prepare(browser, iphone, 390)
    await page.goto(`${base}/en/guides/opencode-on-windows`)
    const block = page.locator('[data-guide-product-block]')
    await screenshot(page, 'mobile')
    const input = block.getByRole('textbox', { name: 'Email address' })
    await input.fill('invalid')
    await block.getByRole('button', { name: /Email me the download link/ }).click()
    assert.equal(emailRequests.length, 0, 'Invalid email cannot submit')
    await input.fill('preview@example.com')
    await submit(page)
    await block.getByText('Done, check your inbox', { exact: true }).waitFor()
    assert.deepEqual(emailRequests.at(-1), { email: 'preview@example.com', locale: 'en' })
    assert.ok(await page.evaluate(() => window.guideEvents.some(e => e.name === 'mobile_link_submit' && e.data.guide === 'opencode-on-windows')))
    await page.screenshot({ path: path.join(output, 'mobile-success.png') })
    await block.getByRole('button', { name: 'Use another email' }).click()
    for (const [reply, text] of [
      [{ status: 429, body: {} }, 'You already asked a few times today. Check your inbox (and spam).'],
      [{ status: 500, body: {} }, 'Something went wrong. Try again in a minute.'],
      [{ status: 200, body: { queued: true, emailSent: false } }, 'Something went wrong. Try again in a minute.'],
    ]) {
      emailReply = reply
      await submit(page)
      await block.getByText(text, { exact: true }).waitFor()
      assert.equal(await block.getByText('Done, check your inbox', { exact: true }).count(), 0)
    }
    await page.goto(`${base}/es/guias/${'opencode-en-windows'}`)
    await page.locator('[data-guide-product-block]').getByRole('button', { name: /Enviarme el enlace/ }).waitFor()
    await screenshot(page, 'mobile-es')
    await page.goto(`${base}/en#download`)
    const homeInput = page.locator('#download').getByRole('textbox', { name: 'Email address', exact: true })
    await homeInput.waitFor()
    await homeInput.fill('preview@example.com')
    emailReply = { status: 200, body: { emailSent: true } }
    await page.getByRole('button', { name: 'Email me the link', exact: true }).click()
    await page.getByText('Done, check your inbox', { exact: true }).waitFor()
    await context.close()
    for (const [route, source, position] of [
      ['/en', 'home', 'feature_videos'],
      ['/en/guides', 'guides_index', 'after_first_group'],
      ['/en/guides/opencode-on-windows', 'guide', 'final'],
    ]) {
      const selector = `[data-download-cta="${source}:${position}"]`
      for (const width of [1440, 390]) {
        const { context, page } = await prepare(browser, width === 390 ? iphone : windows, width, 'x86')
        await page.goto(base + route)
        const cta = page.locator(selector)
        await cta.waitFor()
        assert.equal(await cta.count(), 1)
        if (position === 'after_first_group') assert.ok(await cta.evaluate(el => el.previousElementSibling?.tagName === 'SECTION' && el.nextElementSibling?.tagName === 'SECTION'))
        if (position === 'final') assert.equal(await cta.locator('figure, video, dialog').count(), 0)
        if (position === 'feature_videos') assert.ok(await cta.evaluate(el => el.parentElement.previousElementSibling?.id === 'feature-videos'))
        await screenshot(page, `${source}-${position}-${width}`, selector)
        if (width === 1440) {
          const link = cta.getByRole('link', { name: 'Download for Windows', exact: true })
          await link.waitFor()
          const downloaded = page.waitForEvent('download')
          await link.click()
          await downloaded
          const event = await page.evaluate(() => window.guideEvents.filter(e => e.name.startsWith('download_app_')).at(-1))
          assert.equal(event.name, `download_app_${source}_windows_x64`)
          assert.equal(event.data.source, source)
          assert.equal(event.data.position, position)
          assert.equal(event.data.guide, source === 'guide' ? 'opencode-on-windows' : undefined)
          assert.equal(notifications.at(-1).data.position, position)
        } else {
          await cta.getByRole('textbox', { name: 'Email address' }).fill('preview@example.com')
          emailReply = { status: 200, body: { emailSent: true } }
          await cta.getByRole('button', { name: /Email me the download link/ }).click()
          await cta.getByText('Done, check your inbox', { exact: true }).waitFor()
          const event = await page.evaluate(() => window.guideEvents.filter(e => e.name === 'mobile_link_submit').at(-1))
          assert.equal(event.data.source, source)
          assert.equal(event.data.position, position)
          assert.equal(event.data.guide, source === 'guide' ? 'opencode-on-windows' : undefined)
          assert.ok(await page.locator('input[type=email]').evaluateAll(inputs => new Set(inputs.map(i => i.id)).size === inputs.length))
        }
        await context.close()
      }
    }
    for (const [route, text] of [
      ['/en/guides/how-to-use-pi-coding-agent', 'Pi support in CodeAgentSwarm is in beta testing.'],
      ['/en/guides/how-to-use-devin-cli', 'Devin Chat, installation and history are in CodeAgentSwarm beta testing'],
      ['/es/guias/opencode-en-windows', 'Prueba CodeAgentSwarm'],
    ]) {
      const { context, page } = await prepare(browser, iphone, 390)
      await page.goto(base + route)
      const footer = page.locator('[data-download-cta="guide:final"]')
      assert.ok((await footer.innerText()).includes(text))
      await context.close()
    }
    assert.deepEqual(errors, [])
    const result = { ok: true, placements: ['home:feature_videos', 'guides_index:after_first_group', 'guide:final'], platforms: ['windows-x64', 'windows-arm64', 'mac-silicon', 'mac-intel'], mobile: ['validation', 'sending', 'success', 'reset', 'rate-limit', 'error', 'email-not-sent', 'Spanish', 'home reuse'], emailRequests: emailRequests.length, screenshots: fs.readdirSync(output).filter(f => f.endsWith('.png')), errors }
    fs.writeFileSync(path.join(output, 'result.json'), JSON.stringify(result, null, 2))
    console.log(JSON.stringify(result, null, 2))
  } finally { await browser.close() }
})().catch(error => { console.error(error); process.exitCode = 1 })
