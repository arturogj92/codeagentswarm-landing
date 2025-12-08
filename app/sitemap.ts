import { MetadataRoute } from 'next';
import { getGuideSlugs } from '@/content/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.codeagentswarm.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/beta`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/es/beta`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic guide pages - English
  const enGuideSlugs = getGuideSlugs('en');
  const enGuidePages: MetadataRoute.Sitemap = enGuideSlugs.map((slug) => ({
    url: `${baseUrl}/en/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic guide pages - Spanish
  const esGuideSlugs = getGuideSlugs('es');
  const esGuidePages: MetadataRoute.Sitemap = esGuideSlugs.map((slug) => ({
    url: `${baseUrl}/es/guias/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...enGuidePages, ...esGuidePages];
}
