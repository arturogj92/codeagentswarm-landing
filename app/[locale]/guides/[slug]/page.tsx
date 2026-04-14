import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getGuide, getGuideSlugs } from '@/content/guides'
import { GuideLayout } from '@/components/guides'

const baseUrl = 'https://www.codeagentswarm.com'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

// Generate static params for all English guides
export async function generateStaticParams() {
  const slugs = getGuideSlugs('en')
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata with SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params

  // Redirect Spanish users to /es/guias/
  if (locale === 'es') {
    return {}
  }

  const guide = getGuide('en', slug)
  if (!guide) {
    return {
      title: 'Guide Not Found',
    }
  }

  const { meta } = guide
  const canonicalUrl = `${baseUrl}/en/guides/${slug}`
  const alternateUrl = `${baseUrl}/es/guias/${meta.alternateSlug}`

  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl,
        es: alternateUrl,
      },
    },
    openGraph: {
      title: meta.metaTitle,
      description: meta.metaDescription,
      type: 'article',
      siteName: 'CodeAgentSwarm',
      url: canonicalUrl,
      locale: 'en_US',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@CodeAgentSwarm',
      title: meta.metaTitle,
      description: meta.metaDescription,
      images: ['/og.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function GuidePage({ params }: PageProps) {
  const { locale, slug } = await params

  // Redirect Spanish locale to the correct path
  if (locale === 'es') {
    const guide = getGuide('en', slug)
    if (guide) {
      redirect(`/es/guias/${guide.meta.alternateSlug}`)
    }
    notFound()
  }

  // Only allow English locale for /guides/
  if (locale !== 'en') {
    notFound()
  }

  const guide = getGuide('en', slug)
  if (!guide) {
    notFound()
  }

  // JSON-LD structured data - Article
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.meta.title,
    description: guide.meta.metaDescription,
    url: `${baseUrl}/en/guides/${slug}`,
    ...(guide.meta.publishedAt && { datePublished: guide.meta.publishedAt }),
    ...(guide.meta.updatedAt && { dateModified: guide.meta.updatedAt }),
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: 'CodeAgentSwarm',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/en/guides/${slug}`,
    },
  }

  // JSON-LD - BreadcrumbList
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/en`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: `${baseUrl}/en/guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.meta.title,
        item: `${baseUrl}/en/guides/${slug}`,
      },
    ],
  }

  // JSON-LD - FAQPage (only if guide has FAQ)
  const jsonLdFaq = guide.faq && guide.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {jsonLdFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      )}
      <GuideLayout guide={guide} />
    </>
  )
}
