import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const baseUrl = 'https://www.codeagentswarm.com'

const copy = {
  en: {
    title: 'About CodeAgentSwarm',
    metaTitle: 'About CodeAgentSwarm and its creator',
    description: 'Who builds CodeAgentSwarm, why the product exists, how its guides are maintained and where to contact the team.',
    intro: 'CodeAgentSwarm is an independent developer tool built by Arturo García. It turns a pile of AI coding terminals into one supervised workspace, so parallel agents save time without becoming another source of chaos.',
    whyTitle: 'Why it exists',
    why: 'Running several coding agents is easy. Keeping track of what each one changed, which session needs an answer and where a conversation went is the hard part. CodeAgentSwarm is built around that attention problem: live status, notifications, searchable history, file changes, permissions and a task board in one place.',
    factsTitle: 'What the product does today',
    facts: [
      'Runs on macOS and Windows. A Linux desktop build is not available.',
      'Supports Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent.',
      'Uses the agent accounts and subscriptions you already have. CodeAgentSwarm is not a model provider.',
      'Mobile Connect is in alpha. The web beta is available to every account, while native iOS and Android access is available by request. The desktop remains the source of truth and must stay open.',
      'The desktop app is free with Pro included during the open beta.',
    ],
    guidesTitle: 'How the guides are maintained',
    guides: 'The guides are written from the product team point of view, and every comparison discloses that interest. Third-party facts are dated and linked to their sources. Product claims are corrected when shipped behavior changes. If you find an error, send the URL and the correction to hello@codeagentswarm.com.',
    creatorTitle: 'Creator',
    creator: 'Arturo García builds CodeAgentSwarm and publishes programming work as Art0xDev. The public website source and product updates are available through the official links below.',
    contactTitle: 'Official links',
    contact: 'Questions, corrections or partnership ideas are welcome.',
    email: 'Email CodeAgentSwarm',
  },
  es: {
    title: 'Sobre CodeAgentSwarm',
    metaTitle: 'Sobre CodeAgentSwarm y su creador',
    description: 'Quién desarrolla CodeAgentSwarm, por qué existe el producto, cómo se mantienen sus guías y dónde contactar con el equipo.',
    intro: 'CodeAgentSwarm es una herramienta independiente para desarrolladores creada por Arturo García. Convierte un montón de terminales con agentes de programación en un solo espacio supervisado, para que el trabajo en paralelo ahorre tiempo sin convertirse en otra fuente de caos.',
    whyTitle: 'Por qué existe',
    why: 'Ejecutar varios agentes de programación es fácil. Saber qué cambió cada uno, qué sesión necesita respuesta y dónde quedó una conversación es lo difícil. CodeAgentSwarm se centra en ese problema de atención: estado en vivo, notificaciones, historial con búsqueda, cambios de archivos, permisos y un tablero de tareas en un solo lugar.',
    factsTitle: 'Qué hace el producto hoy',
    facts: [
      'Funciona en macOS y Windows. No hay una versión de escritorio para Linux.',
      'Admite Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build y Cursor Agent.',
      'Usa las cuentas y suscripciones de agentes que ya tienes. CodeAgentSwarm no es un proveedor de modelos.',
      'Mobile Connect está en alpha. La beta web está disponible para todas las cuentas, mientras que el acceso nativo para iOS y Android se ofrece bajo petición. El escritorio sigue siendo la fuente de verdad y debe permanecer abierto.',
      'La app de escritorio es gratis con Pro incluido durante la beta abierta.',
    ],
    guidesTitle: 'Cómo se mantienen las guías',
    guides: 'Las guías están escritas desde el punto de vista del equipo del producto y cada comparativa declara ese interés. Los datos de terceros llevan fecha y enlazan sus fuentes. Las afirmaciones sobre el producto se corrigen cuando cambia el comportamiento publicado. Si encuentras un error, envía la URL y la corrección a hello@codeagentswarm.com.',
    creatorTitle: 'Creador',
    creator: 'Arturo García desarrolla CodeAgentSwarm y publica contenido de programación como Art0xDev. El código público de la web y las novedades del producto están disponibles en los enlaces oficiales de abajo.',
    contactTitle: 'Enlaces oficiales',
    contact: 'Puedes escribirnos con preguntas, correcciones o propuestas de colaboración.',
    email: 'Escribir a CodeAgentSwarm',
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const normalized = locale === 'es' ? 'es' : 'en'
  const page = copy[normalized]
  const url = `${baseUrl}/${normalized}/about`

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/about`,
        es: `${baseUrl}/es/about`,
        'x-default': `${baseUrl}/en/about`,
      },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url,
      type: 'website',
      siteName: 'CodeAgentSwarm',
      locale: normalized === 'es' ? 'es_ES' : 'en_US',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.description,
      images: ['/og.png'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const normalized = locale === 'es' ? 'es' : 'en'
  const page = copy[normalized]
  const url = `${baseUrl}/${normalized}/about`
  setRequestLocale(normalized)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: page.title,
    description: page.description,
    url,
    inLanguage: normalized,
    mainEntity: {
      '@type': 'Organization',
      name: 'CodeAgentSwarm',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      email: 'hello@codeagentswarm.com',
      founder: {
        '@type': 'Person',
        name: 'Arturo García',
        sameAs: [
          'https://github.com/arturogj92',
          'https://x.com/Art0xDev',
          'https://art0x.dev',
        ],
      },
      sameAs: [
        'https://github.com/arturogj92/codeagentswarm-landing',
        'https://x.com/Art0xDev',
        'https://discord.gg/a9ZqmW9UfQ',
      ],
    },
  }

  return (
    <div className="relative min-h-screen bg-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-neon-purple/5 via-transparent to-transparent blur-2xl pointer-events-none" />
      <Header />

      <main className="relative max-w-4xl mx-auto px-6 pt-40 md:pt-44 pb-24">
        <header className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{page.title}</h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">{page.intro}</p>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">{page.whyTitle}</h2>
            <p className="text-white/70 leading-relaxed">{page.why}</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-5">{page.factsTitle}</h2>
            <ul className="space-y-3 text-white/70">
              {page.facts.map((fact) => (
                <li key={fact} className="flex gap-3 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan" aria-hidden="true" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">{page.guidesTitle}</h2>
            <p className="text-white/70 leading-relaxed">{page.guides}</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">{page.creatorTitle}</h2>
            <p className="text-white/70 leading-relaxed">{page.creator}</p>
          </section>

          <section className="rounded-2xl border border-neon-cyan/25 bg-neon-cyan/5 p-6 md:p-8">
            <h2 className="text-2xl font-display font-semibold text-white mb-3">{page.contactTitle}</h2>
            <p className="text-white/70 leading-relaxed mb-6">{page.contact}</p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:hello@codeagentswarm.com" className="rounded-full bg-neon-cyan px-5 py-2.5 font-semibold text-black hover:bg-amber-400 transition-colors">{page.email}</a>
              <a href="https://github.com/arturogj92/codeagentswarm-landing" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-5 py-2.5 text-white/80 hover:border-white/35 hover:text-white transition-colors">GitHub</a>
              <a href="https://x.com/Art0xDev" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-5 py-2.5 text-white/80 hover:border-white/35 hover:text-white transition-colors">Art0xDev</a>
              <a href="https://discord.gg/a9ZqmW9UfQ" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-5 py-2.5 text-white/80 hover:border-white/35 hover:text-white transition-colors">Discord</a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
