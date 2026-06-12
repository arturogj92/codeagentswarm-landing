// Heavy media is served from Supabase Storage (Cloudflare CDN) instead of
// Vercel to stay within the Hobby plan's Fast Data Transfer limit.
const CDN_BASE =
  'https://fqamfucosytcyueqadog.supabase.co/storage/v1/object/public/landing-assets'

export function cdnVideo(filename: string): string {
  return `${CDN_BASE}/videos/${filename}`
}
