import type { LegalDoc } from './types'

const privacyEn: LegalDoc = {
  slug: 'privacy',
  locale: 'en',
  title: 'Privacy Policy',
  metaTitle: 'Privacy Policy | CodeAgentSwarm',
  metaDescription:
    'How CodeAgentSwarm handles your data: what we collect, what we never collect, who processes it, how long we keep it and how to exercise your GDPR rights.',
  lastUpdated: '2026-06-22',
  intro:
    'This Privacy Policy explains what personal data CodeAgentSwarm collects when you use the desktop application and this website, why we collect it, who we share it with, and the rights you have over it. We have written it to match exactly what our software actually does. If anything here is unclear, email us at hello@codeagentswarm.com.',
  sections: [
    {
      id: 'controller',
      title: 'Who is responsible for your data',
      blocks: [
        {
          type: 'paragraph',
          text: 'The data controller is Arturo Garcia, an individual based in Ciudad Real, Spain (the "Provider", "we", "us"). You can contact us about anything related to your data at hello@codeagentswarm.com.',
        },
        {
          type: 'paragraph',
          text: 'We process personal data in accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 on Data Protection and Digital Rights (LOPDGDD).',
        },
      ],
    },
    {
      id: 'summary',
      title: 'The short version',
      blocks: [
        {
          type: 'callout',
          variant: 'tip',
          text: 'CodeAgentSwarm is a desktop app that runs third-party AI coding tools (Claude Code, OpenAI Codex, Gemini CLI and similar) in terminals on your own computer. The code, files, prompts and AI responses inside those terminals travel directly from the CLI on your machine to the AI provider you chose, using your own account or API key. We do not sit in the middle of that and we do not receive or store that content.',
        },
        {
          type: 'paragraph',
          text: 'What we do collect is limited to: anonymous usage and error information that helps us keep the app working; the account details you give us if you choose to sign in; the messages you send to our in-app help assistant or to our support, feedback and survey forms; and billing status if you ever subscribe to a paid plan. Each of these is described in detail below.',
        },
      ],
    },
    {
      id: 'not-collected',
      title: 'What we do NOT collect',
      blocks: [
        {
          type: 'paragraph',
          text: 'To be explicit, we do not receive, store or have access to:',
        },
        {
          type: 'list',
          items: [
            'The contents of your terminals, your source code, your files or your project data.',
            'The prompts you send to, or the responses you receive from, the AI CLIs you run (Claude Code, Codex, Gemini CLI, etc.). Those are governed by the privacy policy of the provider you use (Anthropic, OpenAI, Google).',
            'Your AI provider API keys or credentials. They stay on your machine.',
            'When the app generates a git commit message, it runs the Claude CLI that is already installed on your computer and passes it your local git diff. That happens on your machine; we never see the diff.',
          ],
        },
      ],
    },
    {
      id: 'collected',
      title: 'What we collect and why',
      blocks: [
        {
          type: 'heading',
          text: 'a) Anonymous usage analytics (desktop app)',
          id: 'collected-analytics',
        },
        {
          type: 'paragraph',
          text: 'In production builds, the app records which in-app actions are used (for example, opening a terminal or pressing a button), together with the app version and a random session identifier stored locally on your device. This is sent to our own backend. It does not include your name, email, file paths, code or terminal content. If you are signed in, these events can be associated with your account.',
        },
        {
          type: 'heading',
          text: 'b) Error and crash reports (desktop app)',
          id: 'collected-errors',
        },
        {
          type: 'paragraph',
          text: 'In production builds, when the app hits an unexpected error it sends a report to our backend so we can fix it. A report contains the error message and technical stack trace (which may include file paths from your system), the app version, operating system, architecture and a random anonymous installation identifier. It does not include your account email. These reports are received by our backend and forwarded to our error-monitoring provider, Sentry, to help us diagnose and fix issues.',
        },
        {
          type: 'heading',
          text: 'c) Account data (only if you sign in)',
          id: 'collected-account',
        },
        {
          type: 'paragraph',
          text: 'Signing in is optional and uses third-party OAuth providers (GitHub, Google or Discord). When you sign in we receive and store the profile data those providers share: your email address, name, username, avatar URL, the provider and provider user ID, and OAuth access and refresh tokens (used to keep you signed in). We also record your last login time and, for each session, your IP address and basic device information.',
        },
        {
          type: 'heading',
          text: 'd) In-app AI help assistant ("Swarmi")',
          id: 'collected-swarmi',
        },
        {
          type: 'paragraph',
          text: 'Swarmi is the AI help assistant built into the app that answers questions about how to use CodeAgentSwarm. When you ask it something, your question and a short recent history are sent to our backend, which generates a reply. We store the text of your questions and the assistant’s responses to operate the feature, monitor quality and prevent abuse. To enforce daily usage limits we also keep a hashed (non-reversible) form of your IP address and an anonymous identifier. Please do not paste secrets or sensitive personal data into the assistant.',
        },
        {
          type: 'heading',
          text: 'e) Support, feedback, surveys and beta sign-up',
          id: 'collected-support',
        },
        {
          type: 'paragraph',
          text: 'If you contact us or submit a feedback form, a survey or a beta sign-up, we store what you send us: your email address, the message, title, description or answers, any screenshots you attach, and technical metadata such as your IP address, app version and platform.',
        },
        {
          type: 'heading',
          text: 'f) Billing (only if you subscribe to a paid plan)',
          id: 'collected-billing',
        },
        {
          type: 'paragraph',
          text: 'If we offer paid plans and you subscribe, payments are processed by Stripe. Stripe handles your card details directly; we never receive or store your full card number. We store your Stripe customer identifier, subscription status, plan and related dates so we can give you access to the features you paid for.',
        },
        {
          type: 'heading',
          text: 'g) Update checks',
          id: 'collected-updates',
        },
        {
          type: 'paragraph',
          text: 'To tell you about new versions, the app periodically asks our update server whether an update exists, sending only the current version, platform and architecture. No personal or device identifier is sent with update checks.',
        },
      ],
    },
    {
      id: 'legal-bases',
      title: 'Legal bases for processing',
      blocks: [
        {
          type: 'paragraph',
          text: 'Under the GDPR we rely on the following legal bases:',
        },
        {
          type: 'list',
          items: [
            'Performance of a contract (Art. 6.1.b): to provide your account, the help assistant and any paid subscription you request.',
            'Legitimate interest (Art. 6.1.f): to keep the app secure and working, fix errors, understand anonymous usage and prevent abuse, in a way that is proportionate and does not override your rights.',
            'Consent (Art. 6.1.a): where we ask for it, for example optional analytics or marketing emails. You can withdraw consent at any time.',
            'Legal obligation (Art. 6.1.c): to comply with accounting, tax or other legal duties when applicable.',
          ],
        },
      ],
    },
    {
      id: 'subprocessors',
      title: 'Who we share your data with',
      blocks: [
        {
          type: 'paragraph',
          text: 'We do not sell your personal data. We share it only with the service providers ("processors") that help us run the product, and only as needed:',
        },
        {
          type: 'table',
          headers: ['Provider', 'Purpose', 'Location'],
          rows: [
            ['Railway', 'Hosting of our backend and analytics service', 'United States'],
            ['Sentry', 'Error and crash monitoring (receives the error reports described above)', 'United States'],
            ['Supabase', 'Database and file storage (accounts, support content, analytics)', 'European Union / United States'],
            ['Stripe', 'Payment processing for paid plans', 'United States / EU'],
            ['GitHub, Google, Discord', 'OAuth sign-in (only if you choose to sign in)', 'United States'],
            ['Anthropic, OpenAI, Google', 'The AI CLIs you run connect to these directly with your own account', 'United States'],
            ['Umami (self-hosted)', 'Privacy-friendly, cookieless website analytics', 'Hosted by us on Railway'],
          ],
        },
        {
          type: 'paragraph',
          text: 'We may also disclose data if required by law, to comply with a legal request, or to protect our rights, safety or property.',
        },
      ],
    },
    {
      id: 'transfers',
      title: 'International data transfers',
      blocks: [
        {
          type: 'paragraph',
          text: 'Some of our providers are located outside the European Economic Area, primarily in the United States. When personal data is transferred there, it is protected by appropriate safeguards such as the European Commission’s Standard Contractual Clauses or equivalent mechanisms offered by those providers.',
        },
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep your data',
      blocks: [
        {
          type: 'list',
          items: [
            'Account data: while your account exists, and deleted when you ask us to delete it.',
            'Support, feedback and survey messages: kept while needed to handle your request and for a reasonable period afterwards.',
            'Anonymous analytics and error reports: kept in aggregate to improve the product.',
            'Billing records: kept for as long as legally required for accounting and tax purposes.',
          ],
        },
        {
          type: 'paragraph',
          text: 'When you exercise your right to erasure, we delete the personal data we hold about you unless we are legally required to keep part of it (for example, invoices).',
        },
      ],
    },
    {
      id: 'rights',
      title: 'Your rights and how to exercise them',
      blocks: [
        {
          type: 'paragraph',
          text: 'You have the following rights over your personal data under the GDPR:',
        },
        {
          type: 'list',
          items: [
            'Access: get a copy of the data we hold about you.',
            'Rectification: correct data that is inaccurate or incomplete.',
            'Erasure ("right to be forgotten"): ask us to delete your data.',
            'Restriction: ask us to limit how we use your data.',
            'Portability: receive your data in a portable format.',
            'Objection: object to processing based on our legitimate interest.',
            'Withdraw consent: at any time, where processing is based on consent.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'To exercise any of these rights, including deleting your account and data, email hello@codeagentswarm.com from the address associated with your account. We will respond and act within one month. There is no charge for this.',
        },
        {
          type: 'paragraph',
          text: 'If you believe we have not handled your data correctly, you have the right to lodge a complaint with the Spanish Data Protection Agency (Agencia Espanola de Proteccion de Datos, www.aepd.es) or your local supervisory authority.',
        },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      blocks: [
        {
          type: 'paragraph',
          text: 'We use reasonable technical and organisational measures to protect your data, such as encrypted connections (HTTPS), hashing of sensitive identifiers and access controls. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
        },
      ],
    },
    {
      id: 'children',
      title: 'Children',
      blocks: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is intended for developers and is not directed at children. You must be at least 16 years old to create an account. If you believe a minor has provided us with personal data, contact us and we will delete it.',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      blocks: [
        {
          type: 'paragraph',
          text: 'We may update this Privacy Policy as the product evolves or the law changes. We will update the "Last updated" date at the top and, for significant changes, provide a more prominent notice. Continued use after an update means you accept the revised policy.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      blocks: [
        {
          type: 'paragraph',
          text: 'For any privacy question or request, email hello@codeagentswarm.com.',
        },
      ],
    },
  ],
}

export default privacyEn
