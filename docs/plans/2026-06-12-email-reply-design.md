# Email Dashboard: Inline Reply System

**Date:** 2026-06-12
**Task:** CodeAgentSwarm #11578

## Problem

The email dashboard could list and read emails received at hello@codeagentswarm.com (via Resend receiving), but had no way to answer them. Support replies had to go through Gmail, outside the tool.

## Design

### API: `POST /api/dashboard/emails/reply`

Separate from `/api/dashboard/emails/send` on purpose: `/send` is 1-to-N with a mandatory marketing template and a 600ms throttle between recipients; `/reply` is an immediate 1-to-1 send. Mixing both would fill one endpoint with conditionals.

Payload:

```json
{
  "to": "user@example.com",
  "subject": "Re: original subject",
  "body": "plain text, paragraphs separated by blank lines",
  "format": "plain | branded",
  "originalEmailId": "resend-received-email-id"
}
```

Behavior:

- **plain** (default): minimal hand-written-looking HTML (system font, no branding) plus the original message quoted below in a muted blockquote, Gmail style. A `text` version is sent too, with `> ` quoting.
- **branded**: uses `reply-branded.html`, a reply-specific variant of `feedback-custom` with the same dark shell, logo and signature but no hero title, no amber accent bar and no `Hey {{name}},` greeting (replies start directly with the operator's text). Its footer also drops the community/unsubscribe lines, which don't fit a 1-to-1 reply.
- **Threading (best effort)**: the original email is fetched from Resend; if it exposes a `message_id` (top-level or in a headers list), the reply is sent with `In-Reply-To` and `References` headers so it threads in the recipient's client. If not, the reply still goes out with just the `Re:` subject.
- Fetching the original is a nice-to-have: failures are logged and never block the send.
- Sender is always `Arturo from CodeAgentSwarm <hello@codeagentswarm.com>`. Replies appear automatically in the dashboard's Sent tab since they go through Resend.

### UI: inline `ReplyBox` in the detail panel

In `EmailDashboardClient.tsx`, when viewing a received email, a `Reply` button at the bottom of the detail panel expands an inline form: read-only `To` (parsed from the original `From`), editable subject prefilled with `Re: ...`, a plain/branded selector (plain default), a textarea, and Send/Cancel. Mounted with `key={selectedEmail.id}` so state resets when switching emails.

### New files

- `lib/reply-email.ts`: plain HTML/text builders + address/name parsing helpers (pure, shared client/server).
- `app/api/dashboard/emails/reply/route.ts`: the endpoint.

### Out of scope (YAGNI)

- Attachments, CC/BCC, rich-text editing.
- Reply history/threading view inside the dashboard.
- Quoting HTML-only originals (only `text` is quoted; HTML-only originals get no quote block).
