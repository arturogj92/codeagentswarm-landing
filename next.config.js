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
    ]
  },
}

module.exports = withNextIntl(nextConfig)
