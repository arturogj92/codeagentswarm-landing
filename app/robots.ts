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
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: 'https://www.codeagentswarm.com/sitemap.xml',
  };
}
