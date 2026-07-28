import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-headless-ci',
    locale: 'en',
    title: 'Grok Build Headless Mode for Scripts and CI',
    metaTitle: 'Grok Build Headless (xAI): grok -p for CI and Scripts (2026)',
    metaDescription: 'Run Grok Build non-interactively with grok -p, output formats plain/json/streaming-json, XAI_API_KEY auth, and agent mode for automation.',
    intro: `Grok Build is not only a TUI. <code>grok -p</code> (single-turn) prints a response and exits, which is what you want in scripts and CI. Agent subcommands expose stdio and other integration modes for editors and custom harnesses.

Grok Build is xAI's coding CLI (<code>grok</code>), not the Grok chatbot.`,
    ctaText: 'Use headless Grok Build for CI; use CodeAgentSwarm when humans need to supervise long interactive sessions.',
    highlightedWords: ['headless', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'grok-build-headless-ci',
  },
  sections: [
    {
      id: 'single',
      title: 'Single-turn headless',
      content: [
        { type: 'code', language: 'bash', code: 'export XAI_API_KEY="xai-..."\ngrok -p "List the top three risks in this repo"\ngrok -p "Summarize git diff" --output-format json' },
        { type: 'paragraph', text: 'Output formats include <code>plain</code> (default), <code>json</code>, and <code>streaming-json</code>. Pair with <code>--max-turns</code> and permission flags carefully in CI so the agent cannot hang on prompts.' },
        { type: 'callout', variant: 'warning', content: 'Never bake production API keys into public logs. Prefer CI secrets and least-privilege sandboxes (<code>--sandbox</code> when appropriate).' },
      ],
    },
    {
      id: 'agent',
      title: 'Agent mode',
      content: [
        { type: 'paragraph', text: '<code>grok agent</code> exposes non-TUI runtimes (stdio, headless websocket, serve, leader). Use these when embedding Grok in an IDE bridge or multi-client setup. See <code>grok agent --help</code> for the current surface.' },
      ],
    },
    {
      id: 'vs-cas',
      title: 'Headless vs CodeAgentSwarm',
      content: [
        { type: 'paragraph', text: 'Headless is for machines. CodeAgentSwarm is for humans supervising interactive CLIs. They complement: CI runs <code>grok -p</code>, developers swarm interactive <code>grok</code> sessions in CAS.' },
      ],
    },
  ],
  faq: [
    { question: 'How do I run Grok Build in CI?', answer: 'Set XAI_API_KEY and use grok -p with a non-interactive permission mode. Prefer json output when a script must parse results.' },
    { question: 'Is -p the same as agent mode?', answer: 'No. -p is a single-turn CLI helper. grok agent targets longer integrations over stdio/websockets.' },
  ],
}

export default guide
