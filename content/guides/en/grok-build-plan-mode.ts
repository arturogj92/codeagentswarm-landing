import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-plan-mode',
    locale: 'en',
    title: 'Grok Build Plan Mode: Review and Approve Before It Codes',
    metaTitle: 'Grok Build Plan Mode (xAI): Review Before It Codes (2026)',
    metaDescription: 'Grok Build Plan Mode explained: how planning and approval gates work, --permission-mode plan, --no-plan, and when --always-approve is the wrong tool.',
    intro: `Plan Mode is Grok Build's way of thinking before it rewrites half your repo. Instead of diving straight into tool calls, the agent plans steps you can review. That is the opposite of blind YOLO, and it is one of the features people search for when they evaluate xAI's CLI.

Grok Build is xAI's coding CLI (<code>grok</code>), not the consumer Grok chat app.

This guide covers how to enable plan-oriented permissions, when to disable plan mode, how <code>--always-approve</code> fits (and when it is reckless), and how CodeAgentSwarm still helps when plan mode pauses for you.`,
    ctaText: 'Run Grok Build Plan Mode sessions in CodeAgentSwarm so you get a desktop ping when a plan is waiting on approval, not a quiet tab you forgot.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Plan Mode', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'modo-plan-grok-build',
  },
  sections: [
    {
      id: 'what',
      title: 'What Plan Mode is for',
      content: [
        { type: 'paragraph', text: 'Risky multi-file changes benefit from a written plan before edits land. Grok Build exposes plan-oriented behavior through <code>--permission-mode plan</code> and can disable planning with <code>--no-plan</code> when you want a faster path on a well-scoped task.' },
        { type: 'code', language: 'bash', code: 'grok --permission-mode plan "Refactor the billing module"\n# or turn planning off for a tight fix\ngrok --no-plan "Fix the null check in src/api.ts"' },
        { type: 'paragraph', text: 'Exact UX of plan graphs can change between releases; treat <code>grok --help</code> and the in-TUI affordances as source of truth.' },
      ],
    },
    {
      id: 'yolo',
      title: 'Where --always-approve fits',
      content: [
        { type: 'paragraph', text: '<code>--always-approve</code> auto-approves tool executions. That is YOLO-style autonomy: useful in a sandboxed worktree with a clear task, dangerous on main with production secrets nearby.' },
        { type: 'callout', variant: 'warning', content: 'Do not combine blind auto-approve with production credentials. Prefer Plan Mode or default permissions when the blast radius is unclear. CodeAgentSwarm Turbo Mode is a separate product control for safe auto-actions; it does not replace thinking about Grok\'s own flags.' },
        { type: 'code', language: 'bash', code: '# Only after you accept the risk\ngrok --always-approve --worktree=exp "try the migration"' },
      ],
    },
    {
      id: 'cas',
      title: 'Plan Mode + CodeAgentSwarm',
      content: [
        { type: 'paragraph', text: 'When plan mode waits for you, a forgotten terminal tab costs hours. CodeAgentSwarm surfaces status and desktop notifications so a Grok Build terminal that needs input is hard to miss, especially while another terminal runs Claude Code.' },
      ],
    },
  ],
  faq: [
    { question: 'How do I enable Plan Mode in Grok Build?', answer: 'Use grok --permission-mode plan for plan-oriented permissions. Use --no-plan when you want to disable plan mode for a session.' },
    { question: 'Is --always-approve the same as Plan Mode?', answer: 'No. Plan Mode emphasizes review before big changes. --always-approve auto-approves tools and skips human gates. Use it only when the risk is acceptable.' },
    { question: 'Can CodeAgentSwarm help with Plan Mode?', answer: 'Yes. It notifies you when a Grok Build terminal needs input so plans do not sit unnoticed.' },
  ],
}

export default guide
