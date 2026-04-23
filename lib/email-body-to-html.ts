const PARAGRAPH_STYLE =
  "margin: 0 0 16px 0; font-size: 15px; line-height: 26px; color: #d4d4d4; " +
  "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;"

const PARAGRAPH_STYLE_LAST =
  "margin: 0; font-size: 15px; line-height: 26px; color: #d4d4d4; " +
  "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;"

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Convert plain-text email body into a sequence of styled <p> tags.
 *
 * - Double newline ("\n\n") starts a new paragraph.
 * - Single newline within a paragraph becomes a <br>.
 * - All HTML metacharacters are escaped so the operator can't accidentally
 *   inject markup (or break the surrounding template).
 * - The last paragraph drops its bottom margin so the spacing before the
 *   signature divider stays visually consistent.
 *
 * Used by both the send endpoint (server) and the compose preview (client),
 * so the preview matches what the recipient actually receives.
 */
export function bodyToHtml(text: string): string {
  if (!text) return ''

  const paragraphs = text
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(p => p.length > 0)

  if (paragraphs.length === 0) return ''

  return paragraphs
    .map((p, idx) => {
      const escaped = escapeHtml(p).replace(/\n/g, '<br>')
      const style = idx === paragraphs.length - 1 ? PARAGRAPH_STYLE_LAST : PARAGRAPH_STYLE
      return `<p class="body-txt" style="${style}">${escaped}</p>`
    })
    .join('\n')
}

export function escapeHtmlForAttribute(text: string): string {
  return escapeHtml(text)
}
