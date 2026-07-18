// Transactional "here is your download link" email, sent when a mobile
// visitor asks to receive the desktop download link by email
// (POST /api/download-link).
//
// Visual style mirrors emails/feedback-custom.html (dark #0a0a0a background,
// #111111 card, amber #fbbf24 accent, logo header, Arturo signature, footer).
// Copy rules: bilingual (en/es), short, founder voice, and NO em dashes.

export type DownloadLinkLocale = 'en' | 'es'

export interface DownloadLinkEntry {
  /** Visible platform name, e.g. "macOS Apple Silicon" */
  label: string
  /** Small descriptor under the label, e.g. "M1, M2, M3, M4" */
  description: string
  /** Tracked backend download URL */
  url: string
}

export interface RenderDownloadLinkEmailOptions {
  locale: DownloadLinkLocale
  /** App version the links point to, e.g. "1.9.0" */
  version: string
  links: DownloadLinkEntry[]
}

export interface RenderedDownloadLinkEmail {
  subject: string
  html: string
  text: string
}

const COPY = {
  en: {
    subject: 'Your CodeAgentSwarm download link',
    preheader: 'Open this email on your computer and pick your platform.',
    heroTitle: 'Here is CodeAgentSwarm',
    intro:
      'You asked for the download link from your phone. Open this email on your computer and pick your platform:',
    versionLabel: 'Version',
    farewell: 'See you in the app!',
    discordLine:
      'By the way, I post every update and collect feedback in our Discord community. Come say hi:',
    signatureRole: 'Founder, CodeAgentSwarm',
    footerLine: "You're getting this because you requested the download link on codeagentswarm.com.",
  },
  es: {
    subject: 'Tu enlace de descarga de CodeAgentSwarm',
    preheader: 'Abre este correo en tu ordenador y elige tu plataforma.',
    heroTitle: 'Aquí tienes CodeAgentSwarm',
    intro:
      'Nos pediste el enlace de descarga desde el móvil. Abre este correo en tu ordenador y elige tu plataforma:',
    versionLabel: 'Versión',
    farewell: '¡Nos vemos dentro de la app!',
    discordLine:
      'Por cierto, publico las novedades y recojo feedback en nuestro Discord. Pásate a saludar:',
    signatureRole: 'Founder, CodeAgentSwarm',
    footerLine: 'Recibes este correo porque pediste el enlace de descarga en codeagentswarm.com.',
  },
} as const

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

// Branded redirect to the community Discord (next.config.js rewrites /discord
// to the real invite, so the invite can rotate without touching sent emails).
const DISCORD_URL = 'https://www.codeagentswarm.com/discord'

function renderButton(link: DownloadLinkEntry): string {
  return `
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 12px 0;">
                      <tr>
                        <td bgcolor="#fbbf24" style="background-color: #fbbf24; background-image: linear-gradient(#fbbf24, #fbbf24); border-radius: 10px;">
                          <a href="${escapeHtml(link.url)}" target="_blank"
                             style="display: block; padding: 13px 18px; font-family: ${FONT_STACK}; text-decoration: none; border-radius: 10px;">
                            <span style="display: block; font-size: 15px; line-height: 20px; font-weight: 700; color: #0a0a0a;">${escapeHtml(link.label)}</span>
                            <span style="display: block; font-size: 12px; line-height: 16px; color: #57430a;">${escapeHtml(link.description)}</span>
                          </a>
                        </td>
                      </tr>
                    </table>`
}

export function renderDownloadLinkEmail(
  options: RenderDownloadLinkEmailOptions
): RenderedDownloadLinkEmail {
  const { locale, version, links } = options
  const copy = COPY[locale]

  const buttonsHtml = links.map(renderButton).join('\n')

  const text = [
    copy.heroTitle,
    '',
    copy.intro,
    '',
    ...links.map((link) => `${link.label} (${link.description}): ${link.url}`),
    '',
    `${copy.versionLabel} ${version}`,
    '',
    copy.farewell,
    '',
    `${copy.discordLine} ${DISCORD_URL}`,
    '',
    'Arturo',
    copy.signatureRole,
  ].join('\n')

  const html = `<!DOCTYPE html>
<html lang="${locale}" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>${escapeHtml(copy.subject)}</title>
  <style type="text/css">
    :root { color-scheme: light only; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }

    @media only screen and (max-width: 600px) {
      .wrap { width: 100% !important; max-width: 100% !important; }
      .card-pad { padding: 28px 20px !important; }
      .outer-pad { padding: 16px 10px !important; }
      .hero-title { font-size: 22px !important; line-height: 30px !important; }
      .body-txt { font-size: 15px !important; line-height: 24px !important; }
      .logo-img { width: 220px !important; }
      .sig-icon { width: 32px !important; height: 32px !important; }
      .footer-txt { font-size: 11px !important; }
    }
  </style>
</head>

<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: ${FONT_STACK}; -webkit-font-smoothing: antialiased;">

  <!-- Preheader (inbox preview line) -->
  <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #0a0a0a;">
    ${escapeHtml(copy.preheader)} &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
         bgcolor="#0a0a0a"
         style="background-color: #0a0a0a; background-image: linear-gradient(#0a0a0a, #0a0a0a);">
    <tr>
      <td align="center" class="outer-pad" style="padding: 28px 16px; background-color: #0a0a0a; background-image: linear-gradient(#0a0a0a, #0a0a0a);">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" class="wrap" style="max-width: 560px; width: 100%;">

          <!-- ===== LOGO ===== -->
          <tr>
            <td align="center" style="padding-bottom: 28px; background-color: #0a0a0a; background-image: linear-gradient(#0a0a0a, #0a0a0a);" bgcolor="#0a0a0a">
              <img src="https://www.codeagentswarm.com/email-logo.png" alt="CodeAgentSwarm" width="290" height="57" class="logo-img" style="display: block; width: 290px; height: auto; max-width: 100%;" />
            </td>
          </tr>

          <!-- ===== MAIN CARD ===== -->
          <tr>
            <td bgcolor="#0a0a0a" style="background-color: #0a0a0a; background-image: linear-gradient(#0a0a0a, #0a0a0a);">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                     bgcolor="#111111"
                     style="background-color: #111111; background-image: linear-gradient(#111111, #111111); border: 1px solid #2a2a2a; border-radius: 16px;">
                <tr>
                  <td class="card-pad" bgcolor="#111111" style="padding: 36px 34px; background-color: #111111; background-image: linear-gradient(#111111, #111111);">

                    <!-- Hero heading -->
                    <p class="hero-title" style="margin: 0 0 6px 0; font-size: 26px; line-height: 34px; font-weight: 700; color: #ffffff; font-family: ${FONT_STACK};">
                      ${escapeHtml(copy.heroTitle)}
                    </p>

                    <!-- Amber accent underline -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                      <tr>
                        <td bgcolor="#fbbf24" style="width: 40px; height: 3px; background-color: #fbbf24; background-image: linear-gradient(#fbbf24, #fbbf24); border-radius: 2px; font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </table>

                    <p class="body-txt" style="margin: 0 0 22px 0; font-size: 16px; line-height: 26px; color: #d4d4d4; font-family: ${FONT_STACK};">
                      ${escapeHtml(copy.intro)}
                    </p>

${buttonsHtml}

                    <p style="margin: 14px 0 0 0; font-size: 12px; line-height: 18px; color: #888888; font-family: ${FONT_STACK};">
                      ${escapeHtml(copy.versionLabel)} ${escapeHtml(version)}
                    </p>

                    <p class="body-txt" style="margin: 22px 0 0 0; font-size: 16px; line-height: 26px; color: #d4d4d4; font-family: ${FONT_STACK};">
                      ${escapeHtml(copy.farewell)}
                    </p>

                    <p style="margin: 18px 0 0 0; font-size: 14px; line-height: 22px; color: #999999; font-family: ${FONT_STACK};">
                      ${escapeHtml(copy.discordLine)}
                      <a href="${DISCORD_URL}" target="_blank" style="color: #fbbf24; text-decoration: underline;">codeagentswarm.com/discord</a>
                    </p>

                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td bgcolor="#111111" style="padding: 0 34px; background-color: #111111; background-image: linear-gradient(#111111, #111111);">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td bgcolor="#2a2a2a" style="height: 1px; background-color: #2a2a2a; background-image: linear-gradient(#2a2a2a, #2a2a2a); font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Signature -->
                <tr>
                  <td bgcolor="#111111" style="padding: 20px 34px 24px 34px; background-color: #111111; background-image: linear-gradient(#111111, #111111);">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td valign="middle" style="padding-right: 14px;">
                          <img src="https://www.codeagentswarm.com/isotipo.png" alt="" width="36" height="36" class="sig-icon" style="display: block; width: 36px; height: 36px; border-radius: 6px;" />
                        </td>
                        <td valign="middle" style="border-left: 2px solid #fbbf24; padding-left: 14px;">
                          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #ffffff; font-family: ${FONT_STACK};">Arturo</p>
                          <p style="margin: 2px 0 0 0; font-size: 12px; color: #999999; font-family: ${FONT_STACK};">${escapeHtml(copy.signatureRole)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- ===== FOOTER ===== -->
          <tr>
            <td bgcolor="#0a0a0a" style="padding: 20px 0 0 0; background-color: #0a0a0a; background-image: linear-gradient(#0a0a0a, #0a0a0a);">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" class="footer-txt" style="font-size: 12px; line-height: 18px; color: #888888; font-family: ${FONT_STACK};">
                    ${escapeHtml(copy.footerLine)}
                  </td>
                </tr>
                <tr>
                  <td align="center" class="footer-txt" style="padding-top: 6px; font-size: 12px; line-height: 18px; font-family: ${FONT_STACK};">
                    <a href="https://www.codeagentswarm.com" style="color: #999999; text-decoration: underline;">codeagentswarm.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`

  return { subject: copy.subject, html, text }
}
