const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['codeagentswarm-backend-production.up.railway.app'],
  },
  async redirects() {
    return [
      // 2026-07: YOLO pair consolidation - both pages were stuck pos 11-12
      // splitting the same query cluster, merged into -explained/-explicado
      {
        source: '/en/guides/claude-code-yolo-turbo-mode',
        destination: '/en/guides/claude-code-yolo-mode-explained',
        permanent: true,
      },
      {
        source: '/es/guias/claude-code-yolo-turbo-mode',
        destination: '/es/guias/modo-yolo-claude-code-explicado',
        permanent: true,
      },
      // Short community link used in posts/emails/app; non-permanent so the
      // invite can be rotated without clients caching the old target
      {
        source: '/discord',
        destination: 'https://discord.gg/a9ZqmW9UfQ',
        permanent: false,
      },
      // 2026-07: locale-less URLs used to 404. They are not in the sitemap and
      // nothing links to them, but the middleware spent months advertising
      // them to Google as the hreflang x-default, so crawlers have seen them.
      // Sending them to the right page is free here: next.config redirects are
      // resolved by Vercel's routing layer, they never invoke a function.
      // /guias and /guides carry the language in the path itself; the rest fall
      // back to `defaultLocale` ('en').
      { source: '/guias', destination: '/es/guias', permanent: true },
      { source: '/guias/:slug+', destination: '/es/guias/:slug+', permanent: true },
      { source: '/guides', destination: '/en/guides', permanent: true },
      { source: '/guides/:slug+', destination: '/en/guides/:slug+', permanent: true },
      { source: '/privacy', destination: '/en/privacy', permanent: true },
      { source: '/terms', destination: '/en/terms', permanent: true },
      { source: '/cookies', destination: '/en/cookies', permanent: true },
      { source: '/beta', destination: '/en/beta', permanent: true },
      { source: '/survey', destination: '/en/survey', permanent: true },
    ]
  },
}

module.exports = withNextIntl(nextConfig)
