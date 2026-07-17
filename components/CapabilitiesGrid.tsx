'use client'

import { useTranslations } from 'next-intl'
import styles from './CapabilitiesGrid.module.css'

type IconName = 'terminals' | 'search' | 'visibility' | 'board'

// Each illustration carries a single amber segment marking the payoff: the live
// prompt, the match you found, the change approved, the task completed. Same
// rule as the Community section's illustrations, so the page reads as one.
const AMBER = '#fbbf24'

function CapabilityIcon({ name }: { name: IconName }) {
  const commonProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.5,
  }

  if (name === 'terminals') {
    return (
      <svg className={styles.featureIcon} viewBox="0 0 96 96" aria-hidden="true">
        <g {...commonProps}>
          <path className={styles.mutedStroke} d="M12 17h72M12 79h72" />
          <rect className={styles.mutedStroke} x="18" y="19" width="44" height="34" rx="5" />
          <rect className={styles.softStroke} x="25" y="27" width="44" height="34" rx="5" />
          <rect x="32" y="35" width="46" height="36" rx="5" />
          <path className={styles.mutedStroke} d="M32 44h46" />
          {/* the agent running right now */}
          <path stroke={AMBER} d="m43 48 6 5-6 5M54 59h11" />
        </g>
        <circle cx="38" cy="40" r="1.4" fill="currentColor" />
        <circle cx="43" cy="40" r="1.4" fill="currentColor" opacity="0.35" />
      </svg>
    )
  }

  if (name === 'search') {
    return (
      <svg className={styles.featureIcon} viewBox="0 0 96 96" aria-hidden="true">
        <g {...commonProps}>
          <path className={styles.mutedStroke} d="M12 17h72M12 79h72" />
          <path className={styles.softStroke} d="M27 21h31l10 10v25M58 21v11h10" />
          <path className={styles.softStroke} d="M35 37h15M35 44h20M35 51h13" />
          <circle cx="56" cy="57" r="14" />
          <circle className={styles.mutedStroke} cx="56" cy="57" r="7" />
          <path d="m66 67 9 9" />
          {/* what you were looking for, found */}
          <path stroke={AMBER} d="M52 57h8M56 53v8" />
        </g>
      </svg>
    )
  }

  if (name === 'visibility') {
    return (
      <svg className={styles.featureIcon} viewBox="0 0 96 96" aria-hidden="true">
        <g {...commonProps}>
          <path className={styles.mutedStroke} d="M12 17h72M12 79h72" />
          <rect x="22" y="20" width="52" height="56" rx="6" />
          <path className={styles.softStroke} d="M33 32h13M33 40h24M33 58h11M33 66h20" />
          <path d="M62 31v11M57 36.5h10" />
          {/* the change, reviewed */}
          <path stroke={AMBER} d="M58 57l4 4 7-8" />
          <path className={`${styles.signal} ${styles.mutedStroke}`} d="M22 49h52" />
        </g>
        <circle cx="22" cy="49" r="2.2" fill="currentColor" />
        <circle cx="74" cy="49" r="2.2" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg className={styles.featureIcon} viewBox="0 0 96 96" aria-hidden="true">
      <g {...commonProps}>
        <path className={styles.mutedStroke} d="M12 17h72M12 79h72" />
        <rect x="13" y="19" width="68" height="56" rx="6" />
        <path className={styles.softStroke} d="M13 31h68" />
        <path className={styles.mutedStroke} d="M36 31v44M59 31v44" />
        <rect className={styles.softStroke} x="18" y="37" width="13" height="9" rx="2" fill="currentColor" fillOpacity="0.05" />
        <rect x="18" y="51" width="13" height="14" rx="2" fill="currentColor" fillOpacity="0.08" />
        <rect x="41" y="37" width="13" height="14" rx="2" fill="currentColor" fillOpacity="0.08" />
        <rect className={styles.softStroke} x="41" y="56" width="13" height="9" rx="2" fill="currentColor" fillOpacity="0.05" />
        <rect className={styles.softStroke} x="64" y="37" width="12" height="9" rx="2" fill="currentColor" fillOpacity="0.05" />
        <rect className={styles.softStroke} x="64" y="51" width="12" height="9" rx="2" fill="currentColor" fillOpacity="0.05" />
        <path className={styles.softStroke} d="M21 41.5h7M44 41.5h7M67 41.5h6" />
      </g>
      <circle cx="20" cy="25" r="1.3" fill="currentColor" opacity="0.35" />
      <circle cx="25" cy="25" r="1.3" fill="currentColor" opacity="0.55" />
      <circle cx="30" cy="25" r="1.3" fill="currentColor" />
      {/* the task your agents finished */}
      <circle cx="74" cy="65" r="10" fill="#0a0a09" stroke={AMBER} strokeWidth="1.5" />
      <path d="m69 65 3 3 6-7" fill="none" stroke={AMBER} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

export default function CapabilitiesGrid() {
  const t = useTranslations('hero.stats')
  const capabilities: Array<{ icon: IconName; title: string; description: string }> = [
    { icon: 'terminals', title: t('terminals'), description: t('terminalsDesc') },
    { icon: 'search', title: t('searchableChats'), description: t('searchableChatsDesc') },
    { icon: 'visibility', title: t('codePreview'), description: t('codePreviewDesc') },
    { icon: 'board', title: t('kanban'), description: t('kanbanDesc') },
  ]

  return (
    <section className={styles.rail} aria-label={t('eyebrow')}>
      {capabilities.map((capability) => (
        <article className={styles.feature} key={capability.icon}>
          <div className={styles.featureIconWrap}>
            <CapabilityIcon name={capability.icon} />
          </div>
          <div className={styles.featureCopy}>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
