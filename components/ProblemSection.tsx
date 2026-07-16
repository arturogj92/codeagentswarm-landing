'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Brain, X, Check, ArrowRight, Download } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import LogoText from './LogoText'

// Visual Comparison - Without/With CodeAgentSwarm
// Left side is a pure HTML/CSS "window chaos" scene (crisp text, no AI-generated images).
// Right side is a real screenshot of the app running 12 terminals.

const CLAUDE_ASCII = ' ▐▛███▜▌\n▝▜█████▛▘\n  ▘▘ ▝▝'
const MONO = { fontFamily: "var(--font-mono)" }

function MacWindow({ className = '', title, light = false, children }: {
  className?: string
  title?: string
  light?: boolean
  children?: ReactNode
}) {
  return (
    <div className={`absolute rounded-lg overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.65)] ${light ? 'bg-[#ececee] border border-black/30' : 'bg-[#141417] border border-white/[0.08]'} ${className}`}>
      <div className={`h-5 flex items-center gap-[5px] px-2 border-b ${light ? 'bg-[#dededf] border-black/[0.08]' : 'bg-[#1e1e23] border-white/[0.06]'}`}>
        <span className="w-[7px] h-[7px] rounded-full bg-[#ff5f57] flex-shrink-0" />
        <span className="w-[7px] h-[7px] rounded-full bg-[#febc2e] flex-shrink-0" />
        <span className="w-[7px] h-[7px] rounded-full bg-[#28c840] flex-shrink-0" />
        {title && <span className="ml-1.5 text-[8px] text-[#7d7d86] font-medium whitespace-nowrap overflow-hidden">{title}</span>}
      </div>
      {children}
    </div>
  )
}

// The "window switching hell" scene, built with real app logos and real CLI headers
function ChaosScene() {
  return (
    <div className="absolute inset-0 bg-[#08080b] saturate-[0.8]">
      {/* subtle desktop grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* deepest layer: windows bleeding off the screen edges */}
      <MacWindow className="-top-[6%] -left-[7%] w-[34%] h-[30%] rotate-[2deg] z-[1] opacity-30 blur-[1px] hidden sm:block" title="npm — watch">
        <pre className="p-2 text-[8px] leading-[1.6] text-[#5f5f68] bg-[#101013]" style={MONO}>{'⚠ 14 modules rebuilt · waiting…'}</pre>
      </MacWindow>
      <MacWindow className="-bottom-[9%] -right-[5%] w-[40%] h-[32%] -rotate-[2deg] z-[1] opacity-30 blur-[1px] hidden sm:block" title="terminal — zsh">
        <pre className="p-2 text-[8px] leading-[1.6] text-[#5f5f68] bg-[#101013]" style={MONO}>{'$ git stash list\nstash@{0}: WIP… (4 days ago)'}</pre>
      </MacWindow>

      {/* buried second editor */}
      <MacWindow className="top-[1%] left-[16%] w-[44%] h-[40%] rotate-[1deg] z-[1] opacity-40 blur-[0.5px] hidden sm:block" title="payments — Visual Studio Code">
        <div className="p-2.5 flex flex-col gap-1.5">
          {[70, 52, 80, 38, 64].map((w, i) => (
            <div key={i} className="h-[5px] rounded bg-white/[0.07]" style={{ width: `${w}%` }} />
          ))}
        </div>
      </MacWindow>

      {/* buried slack with unread pings */}
      <MacWindow className="top-[8%] right-[24%] w-[34%] h-[46%] -rotate-[0.8deg] z-[2] opacity-55 hidden sm:block" title="Slack — dev-team">
        <div className="flex h-[calc(100%-20px)]">
          <div className="w-[34%] bg-[#1a1220] border-r border-white/[0.05] px-2 py-1.5 text-[7.5px] leading-loose text-[#9a8fa5]">
            <div className="flex items-center justify-between"><b className="text-[#d5cfdb]"># deploys</b><span className="bg-[#c94f4f] text-white text-[6.5px] rounded-full px-[5px] font-bold">3</span></div>
            <div># backend</div>
            <div className="flex items-center justify-between"><b className="text-[#d5cfdb]"># incidents</b><span className="bg-[#c94f4f] text-white text-[6.5px] rounded-full px-[5px] font-bold">7</span></div>
            <div># frontend</div>
          </div>
          <div className="flex-1 p-2 text-[7.5px] leading-[1.9] text-[#8a8a92]">
            <b className="text-[#c9c9cf]">sara</b> prod is throwing 500s again…<br />
            <b className="text-[#c9c9cf]">leo</b> who touched auth??
          </div>
        </div>
      </MacWindow>

      {/* main editor */}
      <MacWindow className="top-[4%] -left-[1%] w-[51%] h-[56%] -rotate-[1.6deg] z-[3]" title="auth-service — Visual Studio Code">
        <div className="flex h-[calc(100%-20px)] bg-[#131317]" style={MONO}>
          <div className="w-[22px] bg-[#1b1b20] border-r border-white/[0.05] flex-shrink-0" />
          <pre className="p-2 text-[8px] leading-[1.75] text-[#7d7d88]">
            <span className="text-[#5a5a66]">{'// where was I?...'}</span>{'\n'}
            <span className="text-[#c586c0]">export async function</span> <span className="text-[#dcdcaa]">refreshToken</span>(<span className="text-[#9cdcfe]">req</span>) {'{'}{'\n'}
            {'  '}<span className="text-[#c586c0]">const</span> <span className="text-[#9cdcfe]">session</span> = <span className="text-[#c586c0]">await</span> <span className="text-[#dcdcaa]">getSession</span>(<span className="text-[#9cdcfe]">req</span>){'\n'}
            {'  '}<span className="text-[#c586c0]">if</span> (!<span className="text-[#9cdcfe]">session</span>) <span className="text-[#c586c0]">throw new</span> <span className="text-[#dcdcaa]">AuthError</span>(<span className="text-[#ce9178]">&apos;expired&apos;</span>){'\n'}
            {'  '}<span className="text-[#5a5a66]">{'// TODO: did Claude already change this?'}</span>{'\n'}
            {'  '}<span className="text-[#c586c0]">return</span> <span className="text-[#dcdcaa]">rotate</span>(<span className="text-[#9cdcfe]">session</span>.<span className="text-[#9cdcfe]">token</span>){'\n'}
            {'}'}
          </pre>
        </div>
      </MacWindow>

      {/* browser with a 500 */}
      <MacWindow light className="top-[23%] -right-[1%] w-[43%] h-[38%] rotate-[1.6deg] z-[4]" title="">
        <div className="absolute top-[3px] left-[64px] right-2 h-3 rounded-md bg-white border border-black/10 text-[7.5px] text-[#71717a] flex items-center px-1.5" style={MONO}>localhost:3000/api/users</div>
        <div className="px-3.5 py-3">
          <h4 className="text-[12.5px] text-[#18181b] font-extrabold tracking-tight sm:whitespace-nowrap">500 Internal Server Error</h4>
          <p className="text-[8.5px] text-[#71717a] mt-1">Something broke while you were in another window.</p>
        </div>
      </MacWindow>

      {/* buried expired terminal */}
      <MacWindow className="bottom-[1%] left-[36%] w-[36%] h-[26%] rotate-[0.6deg] z-[2] opacity-55" title="claude — ~/dev/mobile">
        <pre className="p-2 text-[8px] leading-[1.6] text-[#5f5f68] bg-[#101013]" style={MONO}>✳ Claude Code · session expired 2h ago</pre>
      </MacWindow>

      {/* Claude Code terminal, real header, stuck waiting */}
      <MacWindow className="-bottom-[1%] -left-[1%] w-[47%] h-[46%] -rotate-[1.3deg] z-[6]" title="claude — ~/dev/api">
        <pre className="p-2 px-2.5 text-[8px] leading-[1.6] text-[#b0b0b8] bg-[#101013] h-full" style={MONO}>
          <span className="flex gap-2 items-start">
            <span className="text-[#d97757] font-bold leading-[1.45]">{CLAUDE_ASCII}</span>
            <span className="leading-[1.45]">
              <b className="text-[#e8e8ec]">Claude Code</b> <span className="text-[#5f5f68]">v2.1.211</span>{'\n'}
              <span className="text-[#5f5f68]">Fable 5 · Claude Max</span>{'\n'}
              <span className="text-[#5f5f68]">~/dev/api</span>
            </span>
          </span>
          {'\n'}
          <span className="text-amber-400">⠧ Waiting for your approval…</span> <span className="text-[#5f5f68]">(14 min)</span>{'\n'}
          <span className="text-[#5f5f68]">{'  ❯ 1. Yes   2. Yes, don’t ask again'}</span>
        </pre>
      </MacWindow>

      {/* Codex terminal, context lost */}
      <MacWindow className="bottom-[6%] -right-[1.5%] w-[44%] h-[40%] rotate-[1.8deg] z-[5]" title="codex — ~/dev/web">
        <pre className="p-2 px-2.5 text-[8px] leading-[1.6] text-[#b0b0b8] bg-[#101013] h-full" style={MONO}>
          <b className="text-[#e8e8ec]">&gt;_ OpenAI Codex</b> <span className="text-[#5f5f68]">(v0.48.0)</span>{'\n'}
          <span className="text-[#5f5f68]">model: gpt-5.2-codex · ~/dev/web</span>{'\n'}
          {'\n'}
          <span className="text-[#5f5f68]">&gt; fix the login redirect…</span>{'\n'}
          <span className="text-amber-400">■ session expired.</span> <span className="text-[#5f5f68]">context lost</span>
        </pre>
      </MacWindow>

      {/* "not responding" dialog */}
      <div className="absolute right-[4%] top-[47%] z-[8] w-[140px] hidden sm:block bg-[#202024]/[0.97] border border-white/[0.14] rounded-[10px] shadow-[0_24px_60px_rgba(0,0,0,0.8)] px-3 py-2.5 -rotate-[0.5deg]">
        <b className="block text-[9px] text-[#ececf0] font-bold mb-[3px]">&quot;npm run dev&quot; is not responding</b>
        <span className="block text-[8px] text-[#8a8a92] leading-[1.4]">You can wait for it to become responsive or force quit.</span>
        <div className="flex gap-1.5 mt-2 justify-end">
          <span className="text-[7.5px] px-2 py-[3px] rounded-[5px] bg-[#2a2a30] text-[#c9c9cf] border border-white/10">Wait</span>
          <span className="text-[7.5px] px-2 py-[3px] rounded-[5px] bg-[#3b3b44] text-white border border-white/10">Force Quit</span>
        </div>
      </div>

      {/* cmd+tab switcher with the real app logos */}
      <div className="absolute left-[33%] top-[48%] -translate-x-1/2 -translate-y-1/2 z-[10] bg-[#101014]/[0.94] backdrop-blur-lg border border-white/[0.13] rounded-[13px] px-2.5 py-2 flex items-center gap-2 shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
        <span className="absolute left-1/2 -top-6 -translate-x-1/2 text-[9px] text-[#a8a8b0] whitespace-nowrap font-medium bg-[#0c0c0e]/90 border border-white/10 rounded-full px-2 py-[3px]">⌘⇥ … again … and again</span>
        {[
          { src: '/icons/apps/vscode.svg', sel: false, badge: null },
          { src: '/icons/apps/claude-icon.svg', sel: true, badge: '2' },
          { src: '/icons/apps/chrome.svg', sel: false, badge: '3' },
          { src: '/icons/apps/codex-icon.svg', sel: false, badge: '1' },
          { src: '/icons/apps/slack.svg', sel: false, badge: '12' },
        ].map((app, i) => (
          <span key={i} className={`relative w-6 h-6 sm:w-[30px] sm:h-[30px] rounded-lg flex items-center justify-center bg-[#1c1c21] border border-white/[0.08] ${app.sel ? 'outline outline-2 outline-white/50 outline-offset-2' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={app.src} alt="" className="w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] object-contain" />
            {app.badge && (
              <span className="absolute -top-[5px] -right-[5px] min-w-[11px] h-[11px] px-[3px] rounded-full bg-[#e0453a] text-white text-[7px] font-bold leading-[11px] text-center">{app.badge}</span>
            )}
          </span>
        ))}
      </div>

      {/* missed notifications */}
      <div className="absolute top-[4%] right-[2.5%] z-[11] w-[158px] sm:w-[188px] bg-[#141418]/[0.96] border border-white/[0.12] rounded-[10px] px-2.5 py-2 flex gap-2 items-center shadow-[0_16px_40px_rgba(0,0,0,0.6)] rotate-[0.5deg]">
        <span className="w-6 h-6 rounded-md bg-[#1c1c21] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/apps/claude-icon.svg" alt="" className="w-[15px] h-[15px] object-contain" />
        </span>
        <span><b className="block text-[9px] text-[#e4e4e7] font-semibold">Claude finished 12 min ago</b><span className="text-[8.5px] text-[#8a8a92]">You never saw it.</span></span>
      </div>
      <div className="absolute top-[13.5%] right-[3%] z-[10] w-[188px] opacity-85 hidden sm:flex bg-[#141418]/[0.96] border border-white/[0.12] rounded-[10px] px-2.5 py-2 gap-2 items-center shadow-[0_16px_40px_rgba(0,0,0,0.6)] -rotate-[0.4deg] scale-[0.97]">
        <span className="w-6 h-6 rounded-md bg-[#1c1c21] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/apps/codex-icon.svg" alt="" className="w-[15px] h-[15px] object-contain" />
        </span>
        <span><b className="block text-[9px] text-[#e4e4e7] font-semibold">Codex needs your input</b><span className="text-[8.5px] text-[#8a8a92]">Still waiting…</span></span>
      </div>
      <div className="absolute top-[22.5%] right-[1.5%] z-[9] w-[170px] opacity-60 hidden sm:flex bg-[#141418]/[0.96] border border-white/[0.12] rounded-[10px] px-2.5 py-2 gap-2 items-center shadow-[0_16px_40px_rgba(0,0,0,0.6)] rotate-[0.8deg] scale-[0.94]">
        <span className="w-6 h-6 rounded-md bg-[#1c1c21] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/apps/slack.svg" alt="" className="w-[15px] h-[15px] object-contain" />
        </span>
        <span><b className="block text-[9px] text-[#e4e4e7] font-semibold">12 new in #incidents</b><span className="text-[8.5px] text-[#8a8a92]">…and 4 more notifications</span></span>
      </div>

      {/* sad vignette */}
      <div className="absolute inset-0 z-[12] pointer-events-none bg-[radial-gradient(95%_85%_at_50%_45%,transparent_32%,rgba(0,0,0,0.68)_100%)]" />
    </div>
  )
}

function VisualComparison() {
  const t = useTranslations('problem.chaos')

  const painPoints = [
    { icon: RefreshCw, text: t('pain1') },
    { icon: AlertTriangle, text: t('pain2') },
    { icon: Brain, text: t('pain3') },
  ]

  const benefits = [
    { icon: Check, text: t('benefit1') },
    { icon: Check, text: t('benefit2') },
    { icon: Check, text: t('benefit3') },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a]">

        {/* Central arrow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:flex">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
            className="w-14 h-14 rounded-full bg-[#0a0a0a] border border-amber-400/45 flex items-center justify-center shadow-[0_0_0_6px_rgba(251,191,36,0.06),0_20px_50px_rgba(0,0,0,0.7)]"
          >
            <ArrowRight className="w-5 h-5 text-amber-400" />
          </motion.div>
        </div>

        {/* Vertical divider */}
        <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-white/[0.14] to-transparent" />

        <div className="relative flex flex-col lg:grid lg:grid-cols-2 min-w-0">
          {/* LEFT - WITHOUT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative min-w-0 p-6 pb-11 lg:p-9 lg:pb-11"
          >
            <div className="relative flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#0f0f10] border border-white/[0.12] flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-[#8a8a92]" />
              </div>
              <div>
                <span className="block text-white/50 font-semibold text-[13px] uppercase tracking-[0.12em]">{t('withoutLabel')}</span>
                <LogoText className="text-white text-lg" />
                <p className="text-white/[0.38] text-xs font-medium mt-0.5">{t('switchingFatigue')} {t('costingHours')}</p>
              </div>
            </div>

            <div className="relative space-y-2 mb-4">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2.5 text-[13px]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#101011] border border-white/[0.14] flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-3 h-3 text-[#8a8a92]" />
                  </div>
                  <span className="text-white/50">{point.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#050505] border border-white/[0.12]">
                <ChaosScene />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  className="px-4 py-1.5 bg-[#151517] border border-white/[0.18] rounded-full shadow-[0_6px_18px_rgba(0,0,0,0.5)]"
                >
                  <span className="text-white/75 text-xs font-semibold whitespace-nowrap">{t('chaosLabel')}</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile arrow between sections */}
          <div className="lg:hidden flex justify-center py-5">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="w-11 h-11 rounded-full bg-[#0a0a0a] border border-amber-400/45 flex items-center justify-center rotate-90"
            >
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </motion.div>
          </div>

          {/* RIGHT - WITH */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative min-w-0 p-6 pb-11 lg:p-9 lg:pb-11 bg-[radial-gradient(110%_80%_at_88%_0%,rgba(251,191,36,0.04),transparent_60%)]"
          >
            <div className="relative flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#0f0f10] border border-amber-400/30 flex items-center justify-center flex-shrink-0 p-[7px]">
                <Image src="/isotipo.png" alt="CodeAgentSwarm" width={30} height={30} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="block text-white/50 font-semibold text-[13px] uppercase tracking-[0.12em]">{t('withLabel')}</span>
                <LogoText className="text-white text-lg" />
                <p className="text-emerald-400/75 text-xs font-medium mt-0.5">{t('allVisible')} · {t('sixTerminals')}</p>
              </div>
            </div>

            <div className="relative space-y-2 mb-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-2.5 text-[13px]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#101011] border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-white/75">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#050505] border border-amber-400/35 shadow-[0_0_40px_rgba(251,191,36,0.07)]">
                <Image
                  src="/images/codeagentswarm-12terminals.jpg"
                  alt="CodeAgentSwarm - 12 AI agents working in parallel in one view"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1 }}
                  className="px-4 py-1.5 bg-[#151517] border border-emerald-500/40 rounded-full shadow-[0_6px_18px_rgba(0,0,0,0.5)]"
                >
                  <span className="text-emerald-300 text-xs font-semibold whitespace-nowrap">{t('controlLabel')}</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProblemSection() {
  const t = useTranslations('problem')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-amber-400 mb-5">
            {t('badge')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            <span className="text-white">{t('titleLine1')}</span>{' '}
            <span className="text-amber-400">{t('titleLine2')}</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed mt-6">
            {t('description')}
          </p>
        </motion.div>

        {/* Visual Comparison - Without/With CodeAgentSwarm */}
        <VisualComparison />

        {/* Closing statement + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 md:mt-20 pt-12 md:pt-14 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 md:gap-12 items-center"
        >
          <div>
            <h3 className="text-2xl md:text-[32px] font-bold tracking-tight text-white leading-tight">
              {t('closing.title1')}
              <br />
              {t.rich('closing.title2', {
                amber: (chunks) => <span className="text-amber-400">{chunks}</span>,
              })}
            </h3>
            <p className="text-[15px] text-white/45 leading-relaxed mt-3.5 max-w-[46ch]">
              {t('closing.text')}
            </p>
          </div>
          <div className="md:text-right">
            <a
              href="#download"
              className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 active:translate-y-px text-black text-[15px] font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              <Download className="w-[18px] h-[18px]" />
              {t('closing.cta')}
            </a>
            <span className="block text-xs text-white/35 mt-3">{t('closing.hint')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
