/**
 * Shared branded HTML email template. Table-based layout with inline styles —
 * intentionally low-tech, because modern CSS (flexbox, grid, custom properties)
 * is unreliably supported across email clients (Outlook especially).
 *
 * IMPORTANT: `LOGO_URL` must be a publicly reachable URL once deployed — email
 * clients cannot load images from localhost or from your Vite dev server.
 * Update it to your real production domain before going live.
 */

const LOGO_URL = 'https://photocarb.com/images/logo.png'
const BRAND_NAVY = '#0B1F52'
const BRAND_GREEN = '#0FAE85'
const TEXT_DARK = '#161F1B'
const TEXT_MUTED = '#57685F'
const BORDER = '#DCE6E0'
const BG = '#F6F9F8'

export interface EmailRow {
  label: string
  value: string
}

export function renderEmailTemplate(opts: {
  preheader: string
  heading: string
  intro?: string
  rows?: EmailRow[]
  bodyHtml?: string
  ctaLabel?: string
  ctaUrl?: string
}): string {
  const { preheader, heading, intro, rows, bodyHtml, ctaLabel, ctaUrl } = opts

  const rowsHtml = rows?.length
    ? rows
        .map(
          (r, i) => `
        <tr>
          <td style="padding:10px 0; border-top:${i === 0 ? 'none' : `1px solid ${BORDER}`}; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:0.06em; color:${TEXT_MUTED}; width:150px; vertical-align:top;">
            ${escapeHtml(r.label)}
          </td>
          <td style="padding:10px 0; border-top:${i === 0 ? 'none' : `1px solid ${BORDER}`}; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:${TEXT_DARK}; vertical-align:top;">
            ${escapeHtml(r.value) || '—'}
          </td>
        </tr>`
        )
        .join('')
    : ''

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0; padding:0; background:${BG};">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG}; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#FFFFFF; border-radius:16px; overflow:hidden; border:1px solid ${BORDER};">
          <tr>
            <td style="height:4px; background:linear-gradient(90deg, ${BRAND_NAVY}, ${BRAND_GREEN}); background-color:${BRAND_GREEN}; font-size:0; line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 32px 0 32px;">
              <img src="${LOGO_URL}" width="36" height="36" alt="Photocarb" style="display:inline-block; vertical-align:middle; border:0;" />
              <span style="display:inline-block; vertical-align:middle; margin-inline-start:10px; font-family:Georgia,'Times New Roman',serif; font-size:20px; font-weight:bold; color:${BRAND_NAVY};">Photocarb</span>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 8px 32px;">
              <h1 style="margin:0; font-family:Georgia,'Times New Roman',serif; font-size:22px; line-height:1.3; color:${TEXT_DARK};">${escapeHtml(heading)}</h1>
            </td>
          </tr>
          ${
            intro
              ? `<tr><td style="padding:0 32px 16px 32px;"><p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:${TEXT_MUTED};">${escapeHtml(intro)}</p></td></tr>`
              : ''
          }
          ${
            rowsHtml
              ? `<tr><td style="padding:8px 32px 8px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table></td></tr>`
              : ''
          }
          ${bodyHtml ? `<tr><td style="padding:8px 32px 8px 32px; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:${TEXT_DARK};">${bodyHtml}</td></tr>` : ''}
          ${
            ctaLabel && ctaUrl
              ? `<tr><td style="padding:20px 32px;"><a href="${ctaUrl}" style="display:inline-block; background:${BRAND_GREEN}; color:#FFFFFF; text-decoration:none; font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:bold; padding:12px 24px; border-radius:999px;">${escapeHtml(ctaLabel)}</a></td></tr>`
              : ''
          }
          <tr>
            <td style="padding:24px 32px 28px 32px; border-top:1px solid ${BORDER}; margin-top:16px;">
              <p style="margin:0 0 4px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:1.6; color:${TEXT_MUTED};">
                Photocarb Technologies &middot; Avenue Yasser Arafat, Sahloul, Sousse, Tunisia
              </p>
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:1.6; color:${TEXT_MUTED};">
                Gulf office: Doha, Qatar &middot; <a href="mailto:contact@photocarb.com" style="color:${TEXT_MUTED};">contact@photocarb.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function escapeHtml(str: string): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
