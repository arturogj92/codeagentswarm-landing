const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['codeagentswarm-backend-production.up.railway.app'],
  },
}

module.exports = withNextIntl(nextConfig)
