import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildReport, reportWindow, downloadClicks } from './seo-daily-report.mjs'
import { changedUrls, validateUrls, main as indexNow } from './indexnow-ping.mjs'

const origin = 'https://www.codeagentswarm.com'
test('report uses a complete UTC day and all four direct guide platforms', () => {
  assert.deepEqual(reportWindow(new Date('2026-01-01T20:00:00Z')), {
    startAt: Date.parse('2025-12-31T00:00:00Z'), endAt: Date.parse('2025-12-31T23:59:59.999Z'),
  })
  assert.equal(downloadClicks([
    ...['silicon','intel','windows_x64','windows_arm64'].map(x => ({x:`download_app_guide_${x}`,y:2})),
    {x:'guide_product_block_click',y:20}, {x:'download_app_home_silicon',y:30},
  ], 'guide'), 8)
  assert.throws(() => downloadClicks([{x:'download_app_guide_intel',y:'8'}], 'guide'))
})

test('report does not replace a zero day with a later date or count scrolls as visitors', async (t) => {
  const saved = { UMAMI_USERNAME: process.env.UMAMI_USERNAME, UMAMI_PASSWORD: process.env.UMAMI_PASSWORD }
  process.env.UMAMI_USERNAME = 'test'
  process.env.UMAMI_PASSWORD = 'test'
  t.after(() => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
  })
  t.mock.method(globalThis, 'fetch', async (input) => {
    const url = new URL(input)
    let data
    if (url.pathname.endsWith('/login')) data = {token:'test'}
    else if (url.pathname.endsWith('/download-stats')) data = {daily:[
      {date:'2026-08-28',count:10}, {date:'2026-09-05',count:999},
    ]}
    else {
      assert.ok(url.searchParams.get('startAt'))
      assert.equal(Number(url.searchParams.get('endAt')) % 86400000, 86399999)
      if (url.pathname.endsWith('/stats')) data = {visitors:40}
      else if (url.searchParams.get('type') === 'path') data = [
        {x:'/en/guides/example',y:100}, {x:'/en/guides',y:20}, {x:'/es/guias/ejemplo',y:50},
      ]
      else {
        const path = url.searchParams.get('path')
        data = [{x:'guide_scroll_25',y:2},{x:'download_app_guide_silicon',y:path ? (path.startsWith('/en') ? 3 : 1) : 4}]
      }
    }
    return new Response(JSON.stringify(data))
  })
  const report = await buildReport(new Date('2026-09-05T20:00:00Z'))
  assert.match(report,/2026-09-04 \(dia completo UTC\)/)
  assert.match(report,/Solicitudes de instalador: 0\./)
  assert.match(report,/directa desde guias: 4\./)
  assert.match(report,/Paginas vistas de guias: 150/)
  assert.match(report,/2\.67%/)
  assert.match(report,/\/en\/guides\/example: 3 \/ 100/)
  assert.doesNotMatch(report,/999|Puente de guias/)
})

test('IndexNow restricts canonical hosts and includes deleted guides and shared changes', () => {
  const sitemap = [`${origin}/en`,`${origin}/en/guides`,`${origin}/en/guides/other`]
  assert.deepEqual(changedUrls(['content/guides/es/deleted-guide.ts'],sitemap),[
    `${origin}/es/guias/deleted-guide`,`${origin}/es/guias`,
  ])
  assert.deepEqual(changedUrls(['scripts/report.mjs','docs/private.md'],sitemap),[])
  assert.deepEqual(changedUrls(['components/guides/GuideProductBlock.tsx'],sitemap),sitemap.slice(1))
  assert.deepEqual(changedUrls(['messages/en.json'],sitemap),sitemap)
  assert.deepEqual(validateUrls([sitemap[0],sitemap[0]]),[sitemap[0]])
  for (const url of ['https://www.codeagentswarm.com.evil.test/en',`${origin}@evil.test/en`,`${origin}/en#download`,`${origin}/en?preview=1`]) {
    assert.throws(() => validateUrls([url]))
  }
})

test('IndexNow dry-run cannot send and a missing key prevents submission', async (t) => {
  t.mock.method(console,'log',()=>{})
  const fetch = t.mock.method(globalThis,'fetch',async () => { throw new Error('must not send') })
  await indexNow(['--dry-run',`${origin}/en`])
  assert.equal(fetch.mock.callCount(),0)
  fetch.mock.mockImplementation(async () => new Response('not the key'))
  await assert.rejects(indexNow([`${origin}/en`]),/key is not available/)
  assert.equal(fetch.mock.callCount(),1)
})


test('IndexNow uses the deployed build without requesting the bot-protected site', async (t) => {
  const cwd = process.cwd()
  const dir = mkdtempSync(join(tmpdir(), 'indexnow-'))
  t.after(() => { process.chdir(cwd); rmSync(dir, {recursive:true,force:true}) })
  process.chdir(dir)
  mkdirSync('.next/server/app', {recursive:true})
  mkdirSync('public')
  const key = '23805737595743fe97240d74cb15ff20'
  writeFileSync('.next/server/app/sitemap.xml.body', `<urlset><url><loc>${origin}/en</loc></url></urlset>`)
  writeFileSync(`public/${key}.txt`, key)
  t.mock.method(console, 'log', () => {})
  const fetch = t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://api.indexnow.org/indexnow')
    assert.equal(options.method, 'POST')
    assert.deepEqual(JSON.parse(options.body).urlList, [`${origin}/en`])
    assert.equal(JSON.parse(options.body).keyLocation, `${origin}/${key}.txt`)
    return new Response('', {status:202})
  })
  await indexNow(['--dry-run', '--deployed-build', '--sitemap'])
  assert.equal(fetch.mock.callCount(), 0)
  await indexNow(['--deployed-build', '--sitemap'])
  assert.equal(fetch.mock.callCount(), 1)
  writeFileSync(`public/${key}.txt`, 'wrong key')
  await assert.rejects(indexNow(['--deployed-build', '--sitemap']), /key is not available/)
  assert.equal(fetch.mock.callCount(), 1)
})
