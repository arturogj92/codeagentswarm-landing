// Builders for the "plain" reply format: a minimal personal-looking email
// (no marketing template) with the original message quoted below, the way
// Gmail does it. Styles here assume the default light background of the
// recipient's client, unlike email-body-to-html.ts which styles paragraphs
// for the dark branded template.

const FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

const PARAGRAPH_STYLE = `margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #222222; font-family: ${FONT_FAMILY};`

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function paragraphsToHtml(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p style="${PARAGRAPH_STYLE}">${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('\n')
}

export interface QuotedOriginal {
  from: string
  date: string
  text: string
}

/**
 * Build the HTML for a plain reply: the operator's message as simple
 * paragraphs, followed (when available) by the quoted original message in
 * a muted blockquote, mimicking how a hand-written Gmail reply looks.
 */
export function buildPlainReplyHtml(body: string, original?: QuotedOriginal): string {
  const bodyHtml = paragraphsToHtml(body)

  let quoteHtml = ''
  if (original && original.text.trim()) {
    const attribution = `On ${escapeHtml(original.date)}, ${escapeHtml(original.from)} wrote:`
    quoteHtml = `
<div style="margin-top: 24px; font-size: 13px; line-height: 20px; color: #666666; font-family: ${FONT_FAMILY};">${attribution}</div>
<blockquote style="margin: 8px 0 0 0; padding: 0 0 0 12px; border-left: 2px solid #cccccc;">
${paragraphsToHtml(original.text).replace(/color: #222222/g, 'color: #666666')}
</blockquote>`
  }

  return `<!DOCTYPE html>
<html>
  <body style="margin: 0; padding: 0; background-color: #ffffff;">
    <div style="max-width: 600px; padding: 16px; font-family: ${FONT_FAMILY};">
${bodyHtml}
${quoteHtml}
    </div>
  </body>
</html>`
}

/**
 * Plain-text counterpart, with the original quoted using "> " prefixes so
 * text-only clients still show a recognizable reply thread.
 */
export function buildPlainReplyText(body: string, original?: QuotedOriginal): string {
  const normalized = body.replace(/\r\n/g, '\n').trim()

  if (!original || !original.text.trim()) return normalized

  const quoted = original.text
    .replace(/\r\n/g, '\n')
    .trim()
    .split('\n')
    .map(line => `> ${line}`)
    .join('\n')

  return `${normalized}\n\nOn ${original.date}, ${original.from} wrote:\n${quoted}`
}

/**
 * Extract a bare email address from a "Name <addr>" style header value.
 * Returns the input unchanged when it's already a bare address.
 */
export function extractEmailAddress(from: string): string {
  const match = from.match(/<([^>]+)>/)
  return (match ? match[1] : from).trim()
}
