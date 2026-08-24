import { MetadataRoute } from 'next';
import { getGuideSlugs, getGuide } from '@/content/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.codeagentswarm.com';

  const guideLastMod = (locale: string, slug: string): Date | undefined => {
    const guide = getGuide(locale, slug);
    const stamp = guide?.meta.updatedAt || guide?.meta.publishedAt;
    return stamp ? new Date(`${stamp}T00:00:00Z`) : undefined;
  };

  const latestGuideLastMod = (locale: string): Date | undefined =>
    getGuideSlugs(locale)
      .map((slug) => guideLastMod(locale, slug))
      .filter((date): date is Date => date !== undefined)
      .sort((a, b) => b.getTime() - a.getTime())[0];

  // Static pages (no bare root URL to avoid canonical duplication with /en)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/es`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/guides`,
      lastModified: latestGuideLastMod('en'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/es/guias`,
      lastModified: latestGuideLastMod('es'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/beta`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/es/beta`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...(['en', 'es'] as const).map((locale) => ({
      url: `${baseUrl}/${locale}/about`,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    })),
    ...(['privacy', 'terms', 'cookies'] as const).flatMap((slug) => [
      {
        url: `${baseUrl}/en/${slug}`,
        changeFrequency: 'yearly' as const,
        priority: 0.2,
      },
      {
        url: `${baseUrl}/es/${slug}`,
        changeFrequency: 'yearly' as const,
        priority: 0.2,
      },
    ]),
  ];

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
