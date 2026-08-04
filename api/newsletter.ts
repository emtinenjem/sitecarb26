import type { VercelRequest, VercelResponse } from '@vercel/node'
import { renderEmailTemplate } from './_email-template.js'

const TEAM_INBOX = process.env.CONTACT_INBOX || 'contact@photocarb.com'
const FROM_ADDRESS = process.env.RESEND_FROM || 'Photocarb <notifications@photocarb.com>'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'Email service is not configured yet.' })
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as { email?: string; website?: string }

  // Honeypot
  if (body.website) {
    return res.status(200).json({ success: true })
  }

  const email = (body.email || '').trim()
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  const internalHtml = renderEmailTemplate({
    preheader: `New newsletter signup: ${email}`,
    heading: 'New Newsletter Signup',
    intro: `${email} just subscribed to the Photocarb newsletter from the website footer.`,
  })

  const welcomeHtml = renderEmailTemplate({
    preheader: "You're subscribed to Photocarb's newsletter.",
    heading: "You're on the list.",
    intro: 'Thanks for subscribing. We\'ll send you occasional updates on CBAM, ANME, and IFRS S2 changes that affect Tunisian industry — no more than once a month.',
    ctaLabel: 'Explore Photocarb',
    ctaUrl: 'https://photocarb.com',
  })

  try {
    // Note: this only notifies the team and confirms to the subscriber — it does not
    // add the address to a managed mailing list. For sending actual newsletter
    // campaigns later, connect this endpoint to Resend Audiences (or Mailchimp/etc.)
    // and call their "add contact" API here as well.
    const emails = [
      { from: FROM_ADDRESS, to: [TEAM_INBOX], subject: 'New newsletter signup', html: internalHtml },
      { from: FROM_ADDRESS, to: [email], subject: "You're subscribed to Photocarb", html: welcomeHtml },
    ]

    for (const emailPayload of emails) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      })
      if (!r.ok) {
        const errText = await r.text()
        console.error('Resend error:', r.status, errText)
        return res.status(502).json({ error: 'Failed to send email.' })
      }
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Newsletter signup error:', err)
    return res.status(500).json({ error: 'Unexpected server error.' })
  }
}
