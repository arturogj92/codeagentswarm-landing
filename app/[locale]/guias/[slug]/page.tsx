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

// Generate static params for all Spanish guides
export async function generateStaticParams() {
  const slugs = getGuideSlugs('es')
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata with SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params

  // Redirect English users to /en/guides/
  if (locale === 'en') {
    return {}
  }

  const guide = getGuide('es', slug)
  if (!guide) {
    return {
      title: 'Guía no encontrada',
    }
  }

  const { meta } = guide
  const canonicalUrl = `${baseUrl}/es/guias/${slug}`
  const alternateUrl = `${baseUrl}/en/guides/${meta.alternateSlug}`

  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: alternateUrl,
        es: canonicalUrl,
      },
    },
    openGraph: {
      title: meta.metaTitle,
      description: meta.metaDescription,
      type: 'article',
      siteName: 'CodeAgentSwarm',
      url: canonicalUrl,
      locale: 'es_ES',
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

export default async function GuiaPage({ params }: PageProps) {
  const { locale, slug } = await params

  // Redirect English locale to the correct path
  if (locale === 'en') {
    const guide = getGuide('es', slug)
    if (guide) {
      redirect(`/en/guides/${guide.meta.alternateSlug}`)
    }
    notFound()
  }

  // Only allow Spanish locale for /guias/
  if (locale !== 'es') {
    notFound()
  }

  const guide = getGuide('es', slug)
  if (!guide) {
    notFound()
  }

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.meta.title,
    description: guide.meta.metaDescription,
    url: `${baseUrl}/es/guias/${slug}`,
    inLanguage: 'es',
    publisher: {
      '@type': 'Organization',
      name: 'CodeAgentSwarm',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/es/guias/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuideLayout guide={guide} />
    </>
  )
}
