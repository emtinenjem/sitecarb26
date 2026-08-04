import type { VercelRequest, VercelResponse } from '@vercel/node'
import { renderEmailTemplate } from './_email-template.js'

const TEAM_INBOX = process.env.CONTACT_INBOX || 'contact@photocarb.com'
const FROM_ADDRESS = process.env.RESEND_FROM || 'Photocarb <notifications@photocarb.com>'

interface ContactPayload {
  firstName?: string
  lastName?: string
  company?: string
  jobTitle?: string
  sector?: string
  companySize?: string
  interests?: string[]
  language?: string
  callTime?: string
  referral?: string
  context?: string
  email?: string
  phone?: string
  // Honeypot — real users never fill this; bots usually do.
  website?: string
}

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

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as ContactPayload

  // Honeypot check — silently accept but drop, so bots don't learn it failed.
  if (body.website) {
    return res.status(200).json({ success: true })
  }

  const requiredFields: (keyof ContactPayload)[] = ['firstName', 'lastName', 'company', 'jobTitle']
  for (const field of requiredFields) {
    if (!body[field] || String(body[field]).trim() === '') {
      return res.status(400).json({ error: `Missing required field: ${field}` })
    }
  }

  const fullName = `${body.firstName} ${body.lastName}`.trim()

  const internalHtml = renderEmailTemplate({
    preheader: `New discovery call request from ${fullName} (${body.company})`,
    badge: 'notification',
    eyebrow: 'Website · Contact Form',
    heading: 'New Discovery Call Request',
    intro: `${fullName} from ${body.company} just booked a discovery session through the website. Reply to this email to respond directly to them.`,
    rows: [
      { label: 'Name', value: fullName },
      { label: 'Email', value: body.email || '' },
      { label: 'Phone', value: body.phone || '' },
      { label: 'Company', value: body.company || '' },
      { label: 'Job Title', value: body.jobTitle || '' },
      { label: 'Sector', value: body.sector || '' },
      { label: 'Company Size', value: body.companySize || '' },
      { label: 'Interests', value: (body.interests || []).join(', ') },
      { label: 'Preferred Language', value: body.language || '' },
      { label: 'Preferred Call Time', value: body.callTime || '' },
      { label: 'Referral Source', value: body.referral || '' },
      { label: 'Notes', value: body.context || '' },
    ],
  })

  const confirmationHtml = renderEmailTemplate({
    preheader: 'Your discovery session request has been received.',
    badge: 'success',
    eyebrow: 'Discovery Session',
    heading: 'Session request received.',
    intro: `Hi ${body.firstName}, thanks for reaching out to Photocarb. A Sousse-based solutions engineer will confirm your slot within 4 business hours.`,
    bullets: [
      'A solutions engineer reviews your request and sector',
      'You get a calendar invite for your preferred time slot',
      'We run a live walkthrough tailored to your compliance needs',
    ],
    bodyHtml: `<p style="margin:0;">In the meantime, feel free to reply directly to this email with any questions.</p>`,
    ctaLabel: 'Visit Photocarb',
    ctaUrl: 'https://photocarb.com',
  })

  try {
    const emails = [
      {
        from: FROM_ADDRESS,
        to: [TEAM_INBOX],
        reply_to: body.email || undefined,
        subject: `New discovery call request — ${body.company}`,
        html: internalHtml,
      },
    ]

    // Only send a confirmation if we actually have an address to send it to.
    if (body.email) {
      emails.push({
        from: FROM_ADDRESS,
        to: [body.email],
        reply_to: TEAM_INBOX,
        subject: 'Photocarb — session request received',
        html: confirmationHtml,
      })
    }

    for (const email of emails) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      })
      if (!r.ok) {
        const errText = await r.text()
        console.error('Resend error:', r.status, errText)
        return res.status(502).json({ error: 'Failed to send email.' })
      }
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return res.status(500).json({ error: 'Unexpected server error.' })
  }
}
