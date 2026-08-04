/**
 * Shared branded HTML email template. Table-based layout with inline styles —
 * intentionally low-tech, because modern CSS (flexbox, grid, custom properties)
 * is unreliably supported across email clients (Outlook especially). A light
 * <style> block is included for the handful of properties (media query,
 * hover-free button state) that clients supporting it can use as a progressive
 * enhancement — clients that ignore <style> just fall back to the inline styles.
 *
 * IMPORTANT: `LOGO_URL` must be a publicly reachable URL once deployed — email
 * clients cannot load images from localhost or from your Vite dev server.
 * Override via the LOGO_URL env var if the production path ever changes.
 */

const LOGO_URL = process.env.LOGO_URL || 'https://photocarb.com/images/logo.png'
const BRAND_NAVY = '#0B1F52'
const BRAND_GREEN = '#0FAE85'
const BRAND_GREEN_DEEP = '#0C8F6E'
const TEXT_DARK = '#161F1B'
const TEXT_MUTED = '#57685F'
const TEXT_FAINT = '#8A9990'
const BORDER = '#DCE6E0'
const BG = '#F6F9F8'
const TINT = '#EAF7F3'

const SOCIAL_LINKS = [
  { label: 'photocarb.com', url: 'https://photocarb.com' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/PhotoCarb' },
  { label: 'Instagram', url: 'https://www.instagram.com/photo.carb' },
  { label: 'Facebook', url: 'https://www.facebook.com/Photocarb' },
]

export interface EmailRow {
  label: string
  value: string
}

export function renderEmailTemplate(opts: {
  preheader: string
  eyebrow?: string
  badge?: 'success' | 'notification'
  heading: string
  intro?: string
  rows?: EmailRow[]
  bullets?: string[]
  bodyHtml?: string
  ctaLabel?: string
  ctaUrl?: string
}): string {
  const { preheader, eyebrow, badge, heading, intro, rows, bullets, bodyHtml, ctaLabel, ctaUrl } = opts

  const badgeHtml = badge
    ? `<tr><td style="padding:24px 32px 0 32px;">
        <span style="display:inline-block; width:40px; height:40px; line-height:40px; text-align:center; border-radius:999px; background:${badge === 'success' ? TINT : '#EEF1FB'}; color:${badge === 'success' ? BRAND_GREEN_DEEP : BRAND_NAVY}; font-family:Arial,Helvetica,sans-serif; font-size:18px; font-weight:bold;">
          ${badge === 'success' ? '&#10003;' : '&#9993;'}
        </span>
      </td></tr>`
    : ''

  const eyebrowHtml = eyebrow
    ? `<tr><td style="padding:${badge ? '14px' : '28px'} 32px 0 32px;">
        <span style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:0.14em; text-transform:uppercase; color:${BRAND_GREEN_DEEP};">${escapeHtml(eyebrow)}</span>
      </td></tr>`
    : ''

  const rowsHtml = rows?.length
    ? rows
        .map(
          (r, i) => `
        <tr>
          <td style="padding:11px 0; border-top:${i === 0 ? 'none' : `1px solid ${BORDER}`}; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:0.06em; color:${TEXT_MUTED}; width:150px; vertical-align:top;">
            ${escapeHtml(r.label)}
          </td>
          <td style="padding:11px 0; border-top:${i === 0 ? 'none' : `1px solid ${BORDER}`}; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:${TEXT_DARK}; vertical-align:top;">
            ${escapeHtml(r.value) || '&mdash;'}
          </td>
        </tr>`
        )
        .join('')
    : ''

  const bulletsHtml = bullets?.length
    ? `<tr><td style="padding:4px 32px 8px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${bullets
            .map(
              b => `<tr>
                <td style="padding:5px 0; width:22px; vertical-align:top;">
                  <span style="display:inline-block; width:16px; height:16px; line-height:16px; text-align:center; border-radius:999px; background:${TINT}; color:${BRAND_GREEN_DEEP}; font-family:Arial,Helvetica,sans-serif; font-size:10px; font-weight:bold;">&#10003;</span>
                </td>
                <td style="padding:5px 0; font-family:Arial,Helvetica,sans-serif; font-size:13.5px; line-height:1.5; color:${TEXT_DARK};">${escapeHtml(b)}</td>
              </tr>`
            )
            .join('')}
        </table>
      </td></tr>`
    : ''

  const socialHtml = SOCIAL_LINKS.map(
    s => `<a href="${s.url}" style="color:${TEXT_MUTED}; text-decoration:none; font-family:Arial,Helvetica,sans-serif; font-size:12px;">${escapeHtml(s.label)}</a>`
  ).join(`<span style="color:${BORDER}; font-size:12px;"> &middot; </span>`)

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(heading)}</title>
<style>
  @media only screen and (max-width: 620px) {
    .pc-container { width:100% !important; border-radius:0 !important; }
    .pc-px { padding-left:20px !important; padding-right:20px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background:${BG};">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">${escapeHtml(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG}; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" class="pc-container" style="max-width:600px; width:100%; background:#FFFFFF; border-radius:16px; overflow:hidden; border:1px solid ${BORDER};">
          <tr>
            <td style="height:4px; background:linear-gradient(90deg, ${BRAND_NAVY}, ${BRAND_GREEN}); background-color:${BRAND_GREEN}; font-size:0; line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td class="pc-px" style="padding:28px 32px 20px 32px; border-bottom:1px solid ${BORDER};">
              <img src="${LOGO_URL}" width="34" height="34" alt="Photocarb" style="display:inline-block; vertical-align:middle; border:0;" />
              <span style="display:inline-block; vertical-align:middle; margin-inline-start:10px; font-family:Georgia,'Times New Roman',serif; font-size:19px; font-weight:bold; color:${BRAND_NAVY};">Photocarb</span>
            </td>
          </tr>
          ${badgeHtml}
          ${eyebrowHtml}
          <tr>
            <td class="pc-px" style="padding:10px 32px 8px 32px;">
              <h1 style="margin:0; font-family:Georgia,'Times New Roman',serif; font-size:23px; line-height:1.3; color:${TEXT_DARK};">${escapeHtml(heading)}</h1>
            </td>
          </tr>
          ${
            intro
              ? `<tr><td class="pc-px" style="padding:0 32px 16px 32px;"><p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:${TEXT_MUTED};">${escapeHtml(intro)}</p></td></tr>`
              : ''
          }
          ${
            rowsHtml
              ? `<tr><td class="pc-px" style="padding:8px 32px 8px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG}; border-radius:12px; padding:4px 16px;"><tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table></td></tr></table></td></tr>`
              : ''
          }
          ${bulletsHtml}
          ${bodyHtml ? `<tr><td class="pc-px" style="padding:8px 32px 8px 32px; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:${TEXT_DARK};">${bodyHtml}</td></tr>` : ''}
          ${
            ctaLabel && ctaUrl
              ? `<tr><td class="pc-px" style="padding:22px 32px 8px 32px;"><a href="${ctaUrl}" style="display:inline-block; background:${BRAND_GREEN}; color:#FFFFFF; text-decoration:none; font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:bold; padding:13px 26px; border-radius:999px;">${escapeHtml(ctaLabel)}</a></td></tr>`
              : ''
          }
          <tr>
            <td class="pc-px" style="padding:28px 32px 24px 32px; margin-top:16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER};">
                <tr><td style="padding-top:20px;">
                  <p style="margin:0 0 6px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:1.6; color:${TEXT_MUTED};">
                    Photocarb Technologies &middot; Avenue Yasser Arafat, Sahloul, Sousse, Tunisia
                  </p>
                  <p style="margin:0 0 12px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:1.6; color:${TEXT_MUTED};">
                    Gulf office: Doha, Qatar &middot; <a href="mailto:contact@photocarb.com" style="color:${TEXT_MUTED};">contact@photocarb.com</a> &middot; <a href="mailto:contact@photocarb.qa" style="color:${TEXT_MUTED};">contact@photocarb.qa</a>
                  </p>
                  <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:1.6;">
                    ${socialHtml}
                  </p>
                  <p style="margin:14px 0 0 0; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:1.6; color:${TEXT_FAINT};">
                    You're receiving this because you contacted Photocarb or subscribed on our website. Just reply to this email if you'd rather not hear from us again.
                  </p>
                </td></tr>
              </table>
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
