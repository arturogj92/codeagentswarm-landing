import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-pricing',
    locale: 'en',
    title: 'Grok Build Pricing and Access: SuperGrok, X Premium+ and What You Need',
    metaTitle: 'Grok Build Pricing: SuperGrok, X Premium+ and Access (2026)',
    metaDescription: 'What you need to run Grok Build (xAI grok CLI): SuperGrok or X Premium+ access framing, API keys for CI, and honest notes without invented quota numbers.',
    intro: `Search results for Grok Build pricing are messy because xAI ships fast and tiers change. This page does not invent monthly request caps. It documents the access model as publicly framed, how auth works for humans vs CI, and what CodeAgentSwarm does and does not bill you for.

Grok Build is xAI's coding CLI (<code>grok</code>), not the consumer Grok chat app.`,
    ctaText: 'CodeAgentSwarm is a workspace on top of your xAI access. You bring SuperGrok or X Premium+ (or an API key); we add multi-terminal supervision.',
    highlightedWords: ['pricing', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'precios-y-acceso-grok-build',
  },
  sections: [
    {
      id: 'access',
      title: 'Access requirements (no invented quotas)',
      content: [
        { type: 'paragraph', text: 'During the current public beta era, interactive Grok Build use is framed around SuperGrok or X Premium+ style subscriptions on the xAI / X side. Confirm the live requirement on xAI before you budget a team rollout; this guide will not invent seat prices or rate limits.' },
        { type: 'paragraph', text: 'For automation, <code>XAI_API_KEY</code> is the headless path. Billing for API usage follows xAI\'s API terms, which may differ from chat subscription tiers.' },
        { type: 'callout', variant: 'warning', content: 'If a blog quotes exact "requests per hour" for Grok Build without a primary xAI source, treat it as stale. Prefer account UI and official docs.' },
      ],
    },
    {
      id: 'cas-cost',
      title: 'What CodeAgentSwarm costs relative to Grok',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm does not sell Grok tokens. It is a desktop workspace. You pay xAI (or X) for model access and you use CodeAgentSwarm\'s own plan/beta for the supervisor app. Running four Grok Build terminals does not add a special swarm fee on the xAI side beyond your existing allowance.' },
      ],
    },
    {
      id: 'check',
      title: 'How to verify on your machine',
      content: [
        { type: 'code', language: 'bash', code: 'grok --version\n# first interactive launch will surface auth if you are not signed in\ngrok\n# CI style\nexport XAI_API_KEY=...\ngrok -p "ping"' },
        { type: 'callout', variant: 'tip', content: 'If auth fails, re-check subscription status on the xAI / Grok account side before debugging CodeAgentSwarm.' },
      ],
    },
  ],
  faq: [
    { question: 'Is Grok Build free?', answer: 'Do not assume free unlimited use. Interactive access has been tied to SuperGrok / X Premium+ style plans during beta. Confirm on xAI.' },
    { question: 'Does CodeAgentSwarm include Grok usage?', answer: 'No. CAS is the workspace. Model usage is billed by xAI / your API key.' },
    { question: 'Can I use an API key instead of SuperGrok?', answer: 'For headless/CI, XAI_API_KEY is supported. Interactive browser login is the default for humans.' },
  ],
}

export default guide
