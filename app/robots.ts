import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Private app/dashboard routes should not be indexed
        disallow: ['/login', '/dashboard'],
      },
      // Explicitly welcome AI answer-engine crawlers (GEO/AEO) so CodeAgentSwarm
      // can be cited by ChatGPT, Perplexity, Claude and Google AI Overviews.
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-User',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
        ],
        allow: '/',
        disallow: ['/login', '/dashboard'],
      },
    ],
    sitemap: 'https://www.codeagentswarm.com/sitemap.xml',
  };
}
