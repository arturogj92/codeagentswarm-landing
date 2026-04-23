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

/**
 * Build a single-line plain-text preview suitable for the inbox preheader
 * (the hidden div Gmail/Apple Mail show after the subject in the inbox row).
 *
 * The preheader should COMPLEMENT the subject, not duplicate the title — so
 * we derive it from the body, not from the title field.
 *
 * - Collapses all whitespace to single spaces
 * - Truncates to maxLen with an ellipsis if needed
 * - Escapes HTML so it's safe to drop into the template
 * - Returns "" if the body is empty (template will fall back to first body line)
 */
export function buildInboxPreview(text: string, maxLen = 110): string {
  if (!text) return ''

  const flattened = text
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim()

  if (!flattened) return ''

  const truncated =
    flattened.length > maxLen
      ? flattened.slice(0, maxLen).trimEnd() + '…'
      : flattened

  return escapeHtml(truncated)
}
