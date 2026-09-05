#!/usr/bin/env node
// Run only AFTER a successful production deployment. --since compares the last
// successful deployment with this checkout, including deleted guide URLs.
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'

const HOST = 'www.codeagentswarm.com'
const ORIGIN = `https://${HOST}`
const KEY = '23805737595743fe97240d74cb15ff20'
const ENDPOINT = 'https://api.indexnow.org/indexnow'

export function validateUrls(urls) {
  const unique = [...new Set(urls)]
  if (unique.length > 10000) throw new Error('IndexNow accepts at most 10000 URLs per request')
  for (const value of unique) {
    const url = new URL(value)
    if (url.origin !== ORIGIN || url.username || url.password || url.search || url.hash) {
      throw new Error(`Not a canonical production URL: ${value}`)
    }
  }
  return unique
}

export function changedUrls(files, sitemap) {
  const urls = new Set()
  for (const file of files) {
    if (/\.(test|spec)\./.test(file)) continue
    const guide = file.match(/^content\/guides\/(en|es)\/([a-z0-9-]+)\.ts$/)
    if (guide) {
      const [, locale, slug] = guide
      urls.add(`${ORIGIN}/${locale}/${locale === 'es' ? 'guias' : 'guides'}/${slug}`)
      urls.add(`${ORIGIN}/${locale}/${locale === 'es' ? 'guias' : 'guides'}`)
    } else if (file === 'content/guides/index.ts') {
      urls.add(`${ORIGIN}/en/guides`)
      urls.add(`${ORIGIN}/es/guias`)
    } else if (/^(components\/guides\/|content\/guides\/types\.ts|app\/\[locale\]\/(guides|guias)\/)/.test(file)) {
      sitemap.filter((url) => /\/(guides|guias)(\/|$)/.test(url)).forEach((url) => urls.add(url))
    } else if (/^(components\/|messages\/|public\/|app\/\[locale\]\/|app\/sitemap\.ts|app\/robots\.ts|i18n\/|middleware\.|next\.config\.)/.test(file)) {
      // Shared public UI can change every page; notify all canonical URLs.
      sitemap.forEach((url) => urls.add(url))
    }
  }
  return validateUrls([...urls])
}

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`, { signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`Sitemap: HTTP ${res.status}`)
  const urls = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (!urls.length) throw new Error('Production sitemap has no URLs')
  return validateUrls(urls)
}

export async function main(args = process.argv.slice(2)) {
  const dryRun = args.includes('--dry-run')
  args = args.filter((arg) => arg !== '--dry-run')
  let urls
  if (args[0] === '--since' && args.length === 2) {
    if (!/^[a-f0-9]{40}$/.test(args[1])) throw new Error('--since requires a full commit SHA')
    const files = execFileSync('git', ['diff', '--name-only', args[1], 'HEAD'], { encoding: 'utf8' }).trim().split('\n')
    urls = changedUrls(files, await sitemapUrls())
  } else if (args[0] === '--sitemap' && args.length === 1) {
    urls = await sitemapUrls()
  } else if (args.length && args.every((arg) => !arg.startsWith('--'))) {
    urls = validateUrls(args)
  } else {
    throw new Error('Usage: indexnow-ping.mjs [--dry-run] --since SHA | --sitemap | URL [URL...]')
  }
  if (!urls.length) { console.log('No public URLs changed'); return }
  if (dryRun) { console.log(urls.join('\n')); return }
  const keyLocation = `${ORIGIN}/${KEY}.txt`
  const keyRes = await fetch(keyLocation, { signal: AbortSignal.timeout(20000) })
  if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) throw new Error('Production IndexNow key is not available')
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation, urlList: urls }),
    signal: AbortSignal.timeout(20000),
  })
  if (res.status !== 200 && res.status !== 202) throw new Error(`IndexNow: HTTP ${res.status}`)
  console.log(`IndexNow accepted ${urls.length} URL(s), HTTP ${res.status}; indexing is not guaranteed`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1 })
}
