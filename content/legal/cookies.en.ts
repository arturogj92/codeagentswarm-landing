import type { LegalDoc } from './types'

const cookiesEn: LegalDoc = {
  slug: 'cookies',
  locale: 'en',
  title: 'Cookie Notice',
  metaTitle: 'Cookie Notice | CodeAgentSwarm',
  metaDescription:
    'CodeAgentSwarm uses privacy-friendly, cookieless analytics and does not use tracking or advertising cookies. Here is exactly what we do and do not use.',
  lastUpdated: '2026-09-27',
  intro:
    'This Cookie Notice explains the cookies and similar technologies used on the CodeAgentSwarm website and desktop application. The short version: we do not use tracking or advertising cookies, and our analytics is cookieless.',
  sections: [
    {
      id: 'summary',
      title: 'Summary',
      blocks: [
        {
          type: 'callout',
          variant: 'tip',
          text: 'We do not use advertising, marketing or cross-site tracking cookies, and we do not share data with ad networks. Because of this, we do not show a cookie consent banner. We only use strictly necessary technologies to make the site and app work, plus privacy-friendly analytics that does not use cookies.',
        },
      ],
    },
    {
      id: 'analytics',
      title: 'Website analytics (cookieless)',
      blocks: [
        {
          type: 'paragraph',
          text: 'Our website uses Umami, a privacy-focused analytics tool that we host ourselves. Umami is cookieless: it does not set cookies, does not collect personal data and does not track you across other websites. It gives us aggregate, anonymous statistics such as how many people visit a page, which pages are popular and roughly which country a visit comes from. This helps us improve the site without profiling individuals.',
        },
      ],
    },
    {
      id: 'functional',
      title: 'Strictly necessary and functional storage',
      blocks: [
        {
          type: 'paragraph',
          text: 'To make the site work we may use strictly necessary technologies that do not require consent under EU law, for example:',
        },
        {
          type: 'list',
          items: [
            'A small preference that remembers your chosen language (English or Spanish).',
            'If you sign in, a session cookie or token that keeps you logged in while you use the site.',
          ],
        },
      ],
    },
    {
      id: 'app',
      title: 'The desktop application',
      blocks: [
        {
          type: 'paragraph',
          text: 'The desktop app uses local storage for settings and authentication. Optional product analytics also use random installation and session identifiers, created only after you enable analytics in Settings > Privacy. No website cookie is required for this feature; the consent requirement still applies to its local analytics identifiers. With consent, usage events and these identifiers are sent to our backend and can be linked to your account while signed in. They are pseudonymous, not fully anonymous. You can withdraw consent in Settings > Privacy. See our Privacy Policy for the data categories and retention.',
        },
      ],
    },
    {
      id: 'managing',
      title: 'Managing cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'You can block or delete cookies through your browser settings at any time. Since we do not rely on tracking cookies, doing so will not break the core experience, though it may affect functional preferences such as your language choice.',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes and contact',
      blocks: [
        {
          type: 'paragraph',
          text: 'If we ever introduce additional cookies, we will update this notice and, where required by law, ask for your consent first. For any question, email hello@codeagentswarm.com. See our Privacy Policy for full details on how we handle data.',
        },
      ],
    },
  ],
}

export default cookiesEn
