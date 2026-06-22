import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Link } from '@/i18n/navigation'
import type { LegalBlock, LegalDoc } from '@/content/legal/types'

// Server component: renders a full legal document (Privacy / Terms / Cookies) on the
// same dark themed shell as the rest of the site, with a table of contents and anchors.

function formatDate(iso: string, locale: string): string {
  // Parse as a plain calendar date (no timezone surprises) and format per locale.
  const [year, month, day] = iso.split('-').map((n) => parseInt(n, 10))
  const date = new Date(Date.UTC(year, (month || 1) - 1, day || 1))
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-white/70 leading-relaxed mb-4">{block.text}</p>
      )
    case 'heading':
      return (
        <h3
          id={block.id}
          className="text-lg font-display font-semibold text-white mt-8 mb-3 scroll-mt-28"
        >
          {block.text}
        </h3>
      )
    case 'list':
      return (
        <ul className="list-disc list-outside pl-5 space-y-2 mb-4 text-white/70 marker:text-neon-cyan/60">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <div className="overflow-x-auto mb-6 rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/80">
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {block.rows.map((row, ri) => (
                <tr key={ri} className="align-top">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-white/60">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'callout': {
      const variant = block.variant || 'info'
      const styles: Record<string, string> = {
        info: 'border-neon-cyan/30 bg-neon-cyan/5',
        warning: 'border-amber-500/30 bg-amber-500/5',
        tip: 'border-neon-purple/30 bg-neon-purple/5',
      }
      return (
        <div
          className={`rounded-xl border ${styles[variant]} px-5 py-4 mb-6 text-white/75 leading-relaxed`}
        >
          {block.text}
        </div>
      )
    }
    default:
      return null
  }
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const updatedLabel = doc.locale === 'es' ? 'Última actualización' : 'Last updated'
  const tocLabel = doc.locale === 'es' ? 'Contenido' : 'Contents'

  return (
    <div className="relative min-h-screen bg-black">
      {/* Fixed Grid Background */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Floating Gradient Orbs */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-neon-purple/5 via-transparent to-transparent blur-2xl pointer-events-none will-change-auto" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent blur-2xl pointer-events-none will-change-auto" />

      <Header />

      <main className="relative max-w-3xl mx-auto px-6 pt-40 md:pt-44 pb-24">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            {doc.title}
          </h1>
          <p className="text-white/40 text-sm">
            {updatedLabel}: {formatDate(doc.lastUpdated, doc.locale)}
          </p>
          {doc.intro && (
            <p className="text-white/70 leading-relaxed mt-6">{doc.intro}</p>
          )}
        </header>

        {/* Table of contents */}
        <nav className="mb-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-sm uppercase tracking-wider text-white/40 mb-4">
            {tocLabel}
          </h2>
          <ol className="space-y-2">
            {doc.sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-white/60 hover:text-neon-cyan transition-colors text-sm"
                >
                  {i + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <article>
          {doc.sections.map((section, i) => (
            <section key={section.id} id={section.id} className="mb-10 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-display font-semibold text-white mb-4">
                {i + 1}. {section.title}
              </h2>
              {section.blocks.map((block, bi) => (
                <Block key={bi} block={block} />
              ))}
            </section>
          ))}
        </article>

        {/* Cross-links between legal docs */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-sm">
          <Link href="/privacy" className="text-white/50 hover:text-neon-cyan transition-colors">
            {doc.locale === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
          </Link>
          <Link href="/terms" className="text-white/50 hover:text-neon-cyan transition-colors">
            {doc.locale === 'es' ? 'Términos del Servicio' : 'Terms of Service'}
          </Link>
          <Link href="/cookies" className="text-white/50 hover:text-neon-cyan transition-colors">
            {doc.locale === 'es' ? 'Política de Cookies' : 'Cookie Notice'}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
