import { MetadataRoute } from 'next';
import { getGuideSlugs, getGuide } from '@/content/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.codeagentswarm.com';
  const now = new Date();

  // Static pages (no bare root URL to avoid canonical duplication with /en)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/es`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/es/guias`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/beta`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/es/beta`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Use each guide's real updatedAt (falling back to publishedAt) so lastmod is
  // truthful per URL instead of an identical build-time stamp on every entry.
  const guideLastMod = (locale: string, slug: string): Date => {
    const guide = getGuide(locale, slug);
    const stamp = guide?.meta.updatedAt || guide?.meta.publishedAt;
    return stamp ? new Date(stamp) : now;
  };

  // Dynamic guide pages - English
  const enGuidePages: MetadataRoute.Sitemap = getGuideSlugs('en').map((slug) => ({
    url: `${baseUrl}/en/guides/${slug}`,
    lastModified: guideLastMod('en', slug),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic guide pages - Spanish
  const esGuidePages: MetadataRoute.Sitemap = getGuideSlugs('es').map((slug) => ({
    url: `${baseUrl}/es/guias/${slug}`,
    lastModified: guideLastMod('es', slug),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...enGuidePages, ...esGuidePages];
}
