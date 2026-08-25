import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'multiple-claude-code-accounts',
    locale: 'en',
    title: 'How to Use Multiple Claude Code Accounts and Codex Accounts',
    metaTitle: 'Multiple Claude Code Accounts and Codex Accounts (2026)',
    metaDescription: 'Use multiple Claude Code and Codex accounts on one computer without logging out. Isolate credentials, preserve native history and track quota per account.',
    intro: `You can use multiple Claude Code accounts and multiple Codex accounts on the same computer without logging out of one account every time you need another. CodeAgentSwarm gives each managed account an isolated credential profile, while your existing Current CLI profile stays available.

The important distinction is that accounts are not sessions. An account is the Claude or OpenAI identity that owns the subscription and quota. A session is one conversation or running agent. You can run several sessions under one account, or bind different conversations to different accounts.

This guide shows how to add Claude Code and Codex accounts, choose the default for new conversations and read quota for the account doing the work. Codex account switching on an existing Chat has passed a live cross-account check. Claude uses the same restart design, but the existing-Chat switch has not yet been live-verified with two distinct Claude accounts.`,
    ctaText: 'Keep your work and personal Claude Code or Codex accounts signed in, then choose the right account for each conversation.',
    ctaAgent: 'multi',
    highlightedWords: ['Multiple Claude Code Accounts', 'Codex Accounts'],
    publishedAt: '2026-08-24',
    updatedAt: '2026-08-25',
    alternateSlug: 'varias-cuentas-claude-code-codex',
  },
  sections: [
    {
      id: 'accounts-vs-sessions',
      title: 'Multiple accounts are not multiple sessions',
      content: [
        {
          type: 'paragraph',
          text: 'Running three Claude Code sessions does not mean you are using three Claude accounts. It means three processes are drawing from the quota of whichever account they share. Multiple accounts solve a different problem: keeping personal, work or separate subscription identities signed in at the same time.',
        },
        {
          type: 'paragraph',
          text: 'If your goal is parallel work under one login, use the <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">multiple Claude Code sessions guide</a> or the <a href="/en/guides/run-multiple-codex-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">multiple Codex sessions guide</a>. You can also combine both ideas, for example by running two work conversations on one account and a personal conversation on another.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: '<strong>Account</strong> means identity and quota. <strong>Session</strong> means conversation and running process. You can use either feature independently or combine both.',
        },
      ],
    },
    {
      id: 'add-account',
      title: 'How to add a Claude Code or Codex account',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm uses each provider\'s normal sign-in flow. Give each account a local label so you can recognize it in conversations and quota views.',
        },
        {
          type: 'image',
          src: '/images/guides/provider-accounts-multilogin.webp',
          alt: 'Managing multiple Claude Code accounts in Settings, Providers, with Personal and Work profiles',
          caption: 'The Default account is used for new conversations. Existing Chats keep the account already bound to them.',
          size: 'full',
        },
        {
          type: 'list',
          items: [
            'Open <strong>Settings</strong>, then <strong>Providers</strong>.',
            'Expand <strong>Claude Code</strong> or <strong>Codex</strong>.',
            'Click <strong>Add account</strong> and give the login a recognizable name, such as Work or Personal.',
            'Finish the provider sign-in in your browser.',
            'Click <strong>Make default</strong> if new conversations should use this account automatically.',
            'Repeat for each account you want to keep available.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: '<strong>Current CLI profile</strong> is not replaced. It remains available beside the managed accounts.',
        },
      ],
    },
    {
      id: 'credential-isolation',
      title: 'How CodeAgentSwarm keeps the logins separate',
      content: [
        {
          type: 'paragraph',
          text: 'Each managed Claude Code or Codex account gets its own CLI credential directory. CodeAgentSwarm launches the provider with the directory that belongs to the conversation, so one login does not overwrite another. Provider tokens remain in those isolated CLI profiles instead of being copied into CodeAgentSwarm settings.',
        },
        {
          type: 'paragraph',
          text: 'Claude Code uses its supported configuration-directory boundary and Codex uses its supported home-directory boundary. The selected directory belongs to the provider process, not to the whole app, so two conversations can use different accounts side by side.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Only connect accounts you own or are authorized to use. Each provider\'s subscription terms and usage limits still apply.',
        },
      ],
    },
    {
      id: 'choose-and-switch',
      title: 'Choose an account for new and existing conversations',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'default-new-conversations',
          text: 'Set the default for new conversations',
        },
        {
          type: 'paragraph',
          text: 'New conversations use the account marked <strong>Default</strong>. Once the provider creates the native conversation id, CodeAgentSwarm binds that account to the conversation. Reopening it later uses the same account instead of whichever login happens to be the current default.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'switch-current-conversation',
          text: 'Switch the account on an existing Chat',
        },
        {
          type: 'paragraph',
          text: 'Wait until the current response finishes. Open the account selector in the quota popover and choose another account, or press <strong>Cmd+P</strong> and run <strong>Switch current conversation to &lt;label&gt;</strong>. CodeAgentSwarm stops the idle provider process and resumes the same native conversation id with the selected account.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm restarts the idle provider process with the original native conversation id and shared history store. Codex has passed a live cross-account resume check. Claude uses the same restart path, but still needs the same live check with two distinct accounts.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'You cannot switch accounts while the provider is answering. Wait for the turn to finish so the conversation can restart safely on the same id.',
        },
      ],
    },
    {
      id: 'history-and-quota',
      title: 'Native history follows the conversation; quota follows the account',
      content: [
        {
          type: 'paragraph',
          text: 'Managed profiles isolate credentials while preserving the provider\'s native conversation store. Exact-id resume keeps the real Claude Code transcript or Codex thread instead of rebuilding it from exported text. For more detail, read the <a href="/en/guides/claude-code-history-complete-guide" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code history guide</a> or the <a href="/en/guides/codex-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex conversation history guide</a>.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm also keys quota by provider and account. Work Claude, Personal Claude and Work Codex do not collapse into one reading. The <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code plans guide</a> and <a href="/en/guides/codex-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex plans guide</a> explain what each provider\'s limits mean.',
        },
      ],
    },
    {
      id: 'supported-providers',
      title: 'Which providers support managed accounts?',
      content: [
        {
          type: 'paragraph',
          text: 'Managed accounts currently work for Claude Code and Codex. The other providers still use their current machine login inside CodeAgentSwarm.',
        },
        {
          type: 'table',
          headers: ['Provider', 'Managed accounts', 'Current behavior'],
          rows: [
            ['Claude Code', 'Yes', 'Add, label, set a default and switch idle Chats'],
            ['Codex', 'Yes', 'Add, label, set a default and switch idle Chats'],
            ['Grok, Kimi Code and OpenCode', 'Not yet', 'Uses Current CLI profile'],
            ['Cursor and Antigravity', 'Not yet', 'Uses Current CLI profile'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Settings does not show <strong>Add account</strong> for a current-profile-only provider. Its existing CLI login still works normally.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can I use multiple Claude Code accounts on one computer?',
      answer: 'Yes. Add each Claude Code login under Settings, Providers. CodeAgentSwarm gives every managed account an isolated credential profile and keeps your existing Current CLI profile available.',
    },
    {
      question: 'How do I switch Claude Code accounts without logging out?',
      answer: 'Add both accounts first. You can assign a managed account to a new Chat. Switching an existing Claude Chat uses the same idle restart path as Codex, but has not yet been live-verified with two distinct Claude accounts.',
    },
    {
      question: 'Does switching accounts start a new conversation?',
      answer: 'CodeAgentSwarm restarts the provider with the original native conversation id and shared history store instead of creating a replacement conversation. Codex has passed a live cross-account resume check; Claude still needs the same check with two distinct accounts.',
    },
    {
      question: 'Can I use multiple Codex accounts at the same time?',
      answer: 'Yes. Add separate managed Codex accounts, choose a default for new conversations and bind different conversations to different accounts.',
    },
    {
      question: 'Are quotas combined across accounts?',
      answer: 'No. CodeAgentSwarm keeps quota readings separate by provider and account, matching the account bound to each conversation.',
    },
    {
      question: 'Does this work with Grok, Kimi Code, OpenCode, Cursor or Antigravity?',
      answer: 'Not as managed accounts yet. Those providers remain current-profile-only. Claude Code and Codex are supported in the current release.',
    },
  ],
}

export default guide
