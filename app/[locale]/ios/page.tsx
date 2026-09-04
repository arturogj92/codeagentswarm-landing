import type { Metadata } from 'next'
import Image from 'next/image'

const appStoreUrl = 'https://apps.apple.com/app/codeagentswarm/id6801180696'
const baseUrl = 'https://www.codeagentswarm.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isSpanish = locale === 'es'
  const title = isSpanish
    ? 'CodeAgentSwarm para iPhone y Apple Watch'
    : 'CodeAgentSwarm for iPhone and Apple Watch'
  const description = isSpanish
    ? 'Descarga CodeAgentSwarm en App Store y controla tus agentes desde cualquier lugar.'
    : 'Download CodeAgentSwarm on the App Store and control your agents from anywhere.'
  const url = `${baseUrl}/${locale}/ios`
  const image = `${baseUrl}/og-app-store.png?v=1`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'CodeAgentSwarm',
      url,
      locale: isSpanish ? 'es_ES' : 'en_US',
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: { index: false, follow: true },
  }
}

export default async function IosDownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isSpanish = locale === 'es'

  return (
    <section className="flex min-h-screen items-center justify-center bg-black px-6 text-center">
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(appStoreUrl)})`,
        }}
      />
      <div>
        <Image
          src="/isotipo.png"
          alt=""
          width={112}
          height={112}
          className="mx-auto mb-8 h-28 w-28"
        />
        <h1 className="text-3xl font-bold text-white">
          {isSpanish ? 'Abriendo App Store…' : 'Opening the App Store…'}
        </h1>
        <p className="mt-3 text-zinc-400">
          {isSpanish
            ? 'Si no se abre automáticamente, usa el botón.'
            : 'If it does not open automatically, use the button.'}
        </p>
        <a
          href={appStoreUrl}
          className="mt-8 inline-block rounded-xl bg-amber-400 px-6 py-3 font-semibold text-black"
        >
          {isSpanish ? 'Abrir App Store' : 'Open App Store'}
        </a>
      </div>
    </section>
  )
}
