#!/usr/bin/env node
// Pings IndexNow (Bing, Yandex, etc.) so updated URLs get recrawled fast.
// The key file must be live at https://www.codeagentswarm.com/<KEY>.txt before pinging.
//
// Usage:
//   node scripts/indexnow-ping.mjs <url> [<url> ...]   # ping specific URLs
//   node scripts/indexnow-ping.mjs --sitemap            # ping every URL in the live sitemap
//
// Run it AFTER the Vercel deploy finishes, only for URLs whose content changed.

const HOST = 'www.codeagentswarm.com'
const KEY = '23805737595743fe97240d74cb15ff20'
const ENDPOINT = 'https://api.indexnow.org/indexnow'

async function urlsFromSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Pass URLs to ping, or --sitemap for every sitemap URL.')
  process.exit(1)
}

const urlList = args[0] === '--sitemap' ? await urlsFromSitemap() : args
const bad = urlList.filter((u) => !u.startsWith(`https://${HOST}/`))
if (bad.length) {
  console.error(`These URLs do not belong to ${HOST}:\n` + bad.join('\n'))
  process.exit(1)
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
})

// 200 = submitted, 202 = accepted (key pending validation)
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URL(s)`)
if (res.status >= 400) {
  console.error(await res.text())
  process.exit(1)
}
