'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { FolderInput, Plus, X, Zap } from 'lucide-react'
import { PROJECT_LIST } from './projects'
import type { AgentKey, DemoProject } from './types'

/**
 * What Run opens: the app's two-step launcher, PROJECT then AGENT.
 *
 * Rebuilt from the real screen rather than invented, down to the breadcrumb, the
 * project count on the right, the search field and the three actions along the
 * bottom. This is the surface a visitor uses to make the multi-agent claim
 * concrete, so a made-up dialog in its place undercut the whole demo.
 */

const AGENTS: { key: AgentKey; name: string; model: string; icon: string; blurb: string }[] = [
  { key: 'claude', name: 'Claude Code', model: 'Opus 5', icon: '/icons/apps/claude-icon.svg', blurb: 'Anthropic' },
  { key: 'codex', name: 'Codex CLI', model: 'GPT-5.6', icon: '/icons/apps/codex-icon.svg', blurb: 'OpenAI' },
  { key: 'antigravity', name: 'Antigravity CLI', model: 'Gemini 3 Pro', icon: '/icons/apps/antigravity-icon.png', blurb: 'Google' },
  { key: 'opencode', name: 'opencode', model: 'Any provider', icon: '/icons/apps/opencode-icon.svg', blurb: 'Open source' },
  { key: 'kimi', name: 'Kimi Code', model: 'Kimi K2', icon: '/icons/apps/kimi-icon.png', blurb: 'Moonshot AI' },
]

interface Props {
  onLaunch: (agent: AgentKey, project: DemoProject) => void
  onClose: () => void
}

export default function TerminalLauncher({ onLaunch, onClose }: Props) {
  const t = useTranslations('interactiveDemo.launcher')
  const [step, setStep] = useState<'project' | 'agent'>('project')
  const [project, setProject] = useState<DemoProject | null>(null)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return PROJECT_LIST
    return PROJECT_LIST.filter(
      (item) => item.name.toLowerCase().includes(needle) || item.path.toLowerCase().includes(needle)
    )
  }, [query])

  useEffect(() => {
    // The real launcher lands with the cursor in the search field.
    if (step === 'project') searchRef.current?.focus()
  }, [step])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.stopPropagation()
      // Escape walks BACK a step before closing, which is what the app does and
      // what anyone who just picked the wrong project expects.
      if (step === 'agent') setStep('project')
      else onClose()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [step, onClose])

  const choose = (item: DemoProject) => {
    setProject(item)
    setStep('agent')
  }

  return (
    <div className="demo-launcher-backdrop">
      <div className="demo-launcher" ref={panelRef} role="dialog" aria-label={t('title')}>
        <div className="demo-launcher-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="demo-launcher-logo" src="/isotipo.png" alt="" aria-hidden="true" />
          <nav className="demo-crumbs">
            <button
              type="button"
              className={`demo-crumb${step === 'project' ? ' is-active' : ''}`}
              onClick={() => setStep('project')}
            >
              <span className="demo-crumb-num">1</span>
              {t('project')}
            </button>
            <span className="demo-crumb-sep">›</span>
            <span className={`demo-crumb${step === 'agent' ? ' is-active' : ''}`}>
              <span className="demo-crumb-num">2</span>
              {t('agent')}
            </span>
          </nav>
          <span className="demo-launcher-count">
            {step === 'project' ? t('count', { count: PROJECT_LIST.length }) : project?.name}
          </span>
        </div>

        {step === 'project' ? (
          <>
            <input
              ref={searchRef}
              className="demo-launcher-search"
              placeholder={t('search')}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && matches[0]) choose(matches[0])
              }}
            />
            <div className="demo-launcher-list">
              {matches.map((item) => (
                <button key={item.name} type="button" className="demo-launcher-row" onClick={() => choose(item)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="demo-launcher-icon" src={item.icon} alt="" aria-hidden="true" />
                  <span className="demo-launcher-text">
                    <span className="demo-launcher-name">{item.name}</span>
                    <span className="demo-launcher-path">{item.path}</span>
                  </span>
                  <span className="demo-launcher-age">{item.lastUsed}</span>
                </button>
              ))}
              {matches.length === 0 && <p className="demo-launcher-empty">{t('empty')}</p>}
            </div>
          </>
        ) : (
          <div className="demo-launcher-list demo-launcher-agents">
            {AGENTS.map((agent) => (
              <button
                key={agent.key}
                type="button"
                className="demo-launcher-row"
                onClick={() => project && onLaunch(agent.key, project)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="demo-launcher-icon is-agent" src={agent.icon} alt="" aria-hidden="true" />
                <span className="demo-launcher-text">
                  <span className="demo-launcher-name">{agent.name}</span>
                  <span className="demo-launcher-path">{agent.blurb}</span>
                </span>
                <span className="demo-launcher-age">{agent.model}</span>
              </button>
            ))}
          </div>
        )}

        <div className="demo-launcher-actions">
          <button type="button" className="demo-launcher-primary" disabled>
            <Plus className="w-4 h-4" />
            {t('newProject')}
          </button>
          <button type="button" className="demo-launcher-secondary" disabled>
            <FolderInput className="w-4 h-4" />
            {t('importProject')}
          </button>
          <button type="button" className="demo-launcher-secondary" disabled>
            <Zap className="w-4 h-4" />
            {t('noProject')}
          </button>
          <button type="button" className="demo-launcher-close" onClick={onClose} aria-label={t('close')}>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
