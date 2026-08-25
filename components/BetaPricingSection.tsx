'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface BetaPricingSectionProps {
  sectionId?: string
}

export default function BetaPricingSection({ sectionId = 'beta-pricing' }: BetaPricingSectionProps) {
  const t = useTranslations('pricing')
  const tBeta = useTranslations('beta.pricing')
  const tProposal = useTranslations('beta.pricingProposal')

  const capabilities = [
    {
      label: tProposal('run'),
      value: t('features.terminals6'),
      title: tProposal('workParallel'),
      features: [
        t('features.gridTabs'),
        t('features.resizable'),
        tProposal('liveChanges'),
      ],
    },
    {
      label: tProposal('organize'),
      value: t('features.unlimitedProjects'),
      title: tProposal('keepContext'),
      features: [
        t('features.projectShortcuts6'),
        t('features.taskLabels'),
        t('features.history'),
      ],
    },
  ]

  const allFeatures = [
    'terminals6',
    'unlimitedProjects',
    'notifications',
    'realTimeChanges',
    'gridTabs',
    'projectShortcuts6',
    'terminalShortcutsUnlimited',
    'resizable',
    'mcpConfig',
    'mcpMarketplace',
    'gitAi',
    'taskLabels',
    'shortcuts',
    'mcpPermissions',
    'claudePermissions',
    'turboMode',
    'history',
  ] as const

  return (
    <section id={sectionId} className="relative overflow-hidden bg-[#0b0b0c] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-end gap-11 pb-14 min-[1081px]:grid-cols-[minmax(0,1.5fr)_minmax(20rem,.7fr)] min-[1081px]:gap-24">
          <div>
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-[var(--accent)] before:h-px before:w-10 before:bg-current">
              {tProposal('eyebrow')}
            </p>
            <h2 className="max-w-4xl text-[clamp(2.875rem,6vw,5.125rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-zinc-100 text-balance">
              {tProposal('headline')}
            </h2>
          </div>

          <div className="max-w-[32.5rem] border-t border-white/20 pt-6">
            <div className="mb-5 flex items-baseline gap-3">
              <span className="text-[clamp(3.375rem,6vw,4.75rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-zinc-100">
                €0
              </span>
              <span className="max-w-28 text-sm leading-snug text-zinc-400">
                {tProposal('priceContext')}
              </span>
            </div>
            <p className="mb-6 max-w-[34ch] text-base leading-relaxed text-zinc-400">
              {tProposal('offer')}
            </p>
            <a
              href="#download"
              onClick={() => window.umami?.track('beta_pricing_cta_click', { section: sectionId })}
              className="inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap rounded-lg bg-[var(--accent)] px-6 font-bold text-[#17130a] transition-colors hover:bg-amber-300 active:translate-y-px"
            >
              {tBeta('cta')}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 border-y border-white/20 md:grid-cols-2">
          {capabilities.map((capability, index) => (
            <article
              key={capability.label}
              className={`py-8 md:min-h-[17rem] md:py-9 ${
                index === 0
                  ? 'md:pr-9'
                  : 'border-t border-white/15 md:border-l md:border-t-0 md:pl-9'
              }`}
            >
              <p className="mb-7 font-mono text-xs uppercase tracking-[0.08em] text-zinc-500 md:mb-12">
                {capability.label}
              </p>
              <strong className="mb-2 block text-2xl font-semibold tracking-[-0.035em] text-[var(--accent)]">
                {capability.value}
              </strong>
              <h3 className="mb-5 text-2xl font-semibold tracking-[-0.035em] text-zinc-100">
                {capability.title}
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed text-zinc-400">
                {capability.features.map(feature => <li key={feature}>{feature}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 items-center gap-8 border-b border-white/20 py-12 md:grid-cols-[minmax(15rem,.48fr)_minmax(0,1.52fr)] md:gap-10 md:py-16">
          <div>
            <h3 className="mb-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-zinc-100">
              {tProposal('proofTitle')}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              {tProposal('proofBody')}
            </p>
          </div>
          <Image
            src="/images/guides/multi-terminal.png"
            alt={tProposal('productAlt')}
            width={3016}
            height={1758}
            sizes="(max-width: 768px) 100vw, 70vw"
            className="aspect-[1.6] w-full rounded-lg border border-white/15 object-cover object-top md:aspect-[1.9048]"
          />
        </div>

        <details className="group pt-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-lg py-4 text-sm font-semibold text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] [&::-webkit-details-marker]:hidden">
            <span>{tProposal('allFeatures')}</span>
            <span className="ml-auto hidden text-xs font-normal text-zinc-500 sm:block">
              {tProposal('allFeaturesNote')}
            </span>
            <span className="text-[var(--accent)] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <ul className="mt-3 grid grid-cols-1 gap-x-9 gap-y-1 border-t border-white/15 pt-7 text-sm leading-relaxed text-zinc-400 md:grid-cols-3">
            {allFeatures.map(feature => (
              <li key={feature} className="py-2">{t(`features.${feature}`)}</li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  )
}
