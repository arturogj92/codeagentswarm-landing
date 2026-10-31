'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Globe, Smartphone } from 'lucide-react'
import { useLocale } from 'next-intl'

// Phone companion (iPhone on the App Store, Android beta by request, web app).
// Links match the ones the desktop app shows in Account > Relay. Copy lives here
// so this block stays self-contained while other branches edit messages/*.json.
const APP_STORE_URL = 'https://apps.apple.com/app/codeagentswarm/id6801180696'
const ANDROID_BETA_URL = 'https://discord.com/channels/1444798143672750164/1540046825938096140'
const WEB_APP_URL = 'https://web.codeagentswarm.com'

const COPY = {
  en: {
    eyebrow: 'Phone app',
    titlePre: 'Follow your coding agents',
    titleHighlight: 'from your phone',
    description:
      'Pair your phone with CodeAgentSwarm on your computer by scanning a QR code. Claude Code, Codex and the rest keep running on your machine, with your files and your logins, and you follow them from your pocket.',
    checks: [
      'Read every session and reply, or answer the question an agent is waiting on',
      'Start a new session in any of your projects',
      'Send a photo, a file or a voice note',
      'Get a notification when a session needs you',
    ],
    privacy: 'End-to-end encrypted: the relay moves your messages but cannot read them.',
    appStore: 'iPhone and Apple Watch',
    appStoreSub: 'App Store',
    android: 'Android',
    androidSub: 'Beta, request on Discord',
    web: 'Web app',
    webSub: 'Any browser',
    guide: 'How to control Claude Code from your phone',
    guideSlug: 'control-claude-code-from-phone',
  },
  es: {
    eyebrow: 'App para el móvil',
    titlePre: 'Sigue a tus agentes',
    titleHighlight: 'desde el móvil',
    description:
      'Empareja el móvil con CodeAgentSwarm en tu ordenador escaneando un código QR. Claude Code, Codex y los demás siguen corriendo en tu máquina, con tus archivos y tus cuentas, y tú los sigues desde el bolsillo.',
    checks: [
      'Lee cada sesión y responde, o contesta la pregunta que un agente te está esperando',
      'Abre una sesión nueva en cualquiera de tus proyectos',
      'Envía una foto, un archivo o una nota de voz',
      'Recibe un aviso cuando una sesión te necesita',
    ],
    privacy: 'Cifrado de extremo a extremo: el relay mueve tus mensajes, pero no puede leerlos.',
    appStore: 'iPhone y Apple Watch',
    appStoreSub: 'App Store',
    android: 'Android',
    androidSub: 'Beta, se pide en Discord',
    web: 'App web',
    webSub: 'Cualquier navegador',
    guide: 'Cómo controlar Claude Code desde el móvil',
    guideSlug: 'controlar-claude-code-desde-el-movil',
  },
} as const

export default function PhoneAppSection() {
  const locale = useLocale() === 'es' ? 'es' : 'en'
  const c = COPY[locale]
  const track = (platform: string) => window.umami?.track('phone_app_click', { platform, placement: 'home' })

  const linkClass =
    'flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors w-full sm:w-auto sm:min-w-[200px]'

  return (
    <section id="phone-app" aria-labelledby="phone-app-title" className="relative py-20 md:py-28 px-4 sm:px-6 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-neon-cyan/80 mb-3.5">
          {c.eyebrow}
        </span>
        <h2 id="phone-app-title" className="text-white font-bold text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.1] tracking-[-0.025em] mb-4">
          {c.titlePre} <span className="gradient-text">{c.titleHighlight}</span>
        </h2>
        <p className="text-white/70 text-base leading-[1.7] max-w-3xl">{c.description}</p>

        <ul className="mt-7 grid gap-2.5 sm:grid-cols-2 sm:gap-x-10">
          {c.checks.map(text => (
            <li key={text} className="flex items-start gap-2.5 text-white/70 text-[14.5px]">
              <span className="flex-none mt-px w-[18px] h-[18px] rounded-md bg-neon-cyan/10 border border-neon-cyan/25 flex items-center justify-center text-neon-cyan">
                <Check className="w-[11px] h-[11px]" strokeWidth={3} />
              </span>
              {text}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('ios')}
            className={`${linkClass} bg-amber-400 border-amber-400 text-black hover:bg-amber-300`}
          >
            <Smartphone className="w-5 h-5 flex-none" />
            <span className="flex flex-col leading-tight">
              <small className="text-[11px] font-medium opacity-70">{c.appStoreSub}</small>
              <strong className="text-sm">{c.appStore}</strong>
            </span>
          </a>
          <a
            href={ANDROID_BETA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('android')}
            className={`${linkClass} bg-white/[0.03] border-white/[0.12] text-white hover:border-neon-cyan/40`}
          >
            <Smartphone className="w-5 h-5 flex-none text-neon-cyan" />
            <span className="flex flex-col leading-tight">
              <small className="text-[11px] font-medium text-white/50">{c.androidSub}</small>
              <strong className="text-sm">{c.android}</strong>
            </span>
          </a>
          <a
            href={WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('web')}
            className={`${linkClass} bg-white/[0.03] border-white/[0.12] text-white hover:border-neon-cyan/40`}
          >
            <Globe className="w-5 h-5 flex-none text-neon-cyan" />
            <span className="flex flex-col leading-tight">
              <small className="text-[11px] font-medium text-white/50">{c.webSub}</small>
              <strong className="text-sm">{c.web}</strong>
            </span>
          </a>
        </div>

        <p className="mt-5 text-[13px] text-white/45">{c.privacy}</p>

        <Link
          href={`/${locale}/${locale === 'es' ? 'guias' : 'guides'}/${c.guideSlug}`}
          className="mt-6 w-fit flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan/70 hover:text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan/40 transition-all text-xs font-medium"
        >
          {c.guide}
          <ArrowRight className="w-3 h-3" />
        </Link>
      </motion.div>
    </section>
  )
}
