import { createSign } from 'crypto'

const SCOPE = 'https://www.googleapis.com/auth/calendar'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** True once GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_CALENDAR_ID are all set. */
export function isCalendarConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_CALENDAR_ID)
}

function getCalendarId(): string {
  const id = process.env.GOOGLE_CALENDAR_ID
  if (!id) throw new Error('GOOGLE_CALENDAR_ID is not set')
  return id
}

// Service-account JWT bearer flow (RFC 7523) — signed with Node's built-in crypto so we
// don't need the full googleapis SDK in a cold-starting serverless function.
async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_PRIVATE_KEY
  if (!email || !rawKey) throw new Error('Google service account is not configured')
  // Env vars can't hold real newlines, so the key is stored with literal \n escapes.
  const privateKey = rawKey.replace(/\\n/g, '\n')

  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = base64url(JSON.stringify({ iss: email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }))
  const signingInput = `${header}.${claims}`
  const signature = base64url(createSign('RSA-SHA256').update(signingInput).sign(privateKey))
  const jwt = `${signingInput}.${signature}`

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  })
  if (!res.ok) throw new Error(`Google auth failed: ${res.status} ${await res.text()}`)
  const data = (await res.json()) as { access_token: string }
  return data.access_token
}

export interface BusyInterval {
  start: string
  end: string
}

export async function getBusyIntervals(startISO: string, endISO: string): Promise<BusyInterval[]> {
  const calendarId = getCalendarId()
  const accessToken = await getAccessToken()

  const res = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ timeMin: startISO, timeMax: endISO, items: [{ id: calendarId }] }),
  })
  if (!res.ok) throw new Error(`Google freeBusy failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.calendars?.[calendarId]?.busy ?? []
}

export async function createCalendarEvent(opts: {
  summary: string
  description: string
  startISO: string
  endISO: string
}): Promise<{ id: string }> {
  const calendarId = getCalendarId()
  const accessToken = await getAccessToken()

  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      summary: opts.summary,
      description: opts.description,
      start: { dateTime: opts.startISO },
      end: { dateTime: opts.endISO },
    }),
  })
  if (!res.ok) throw new Error(`Google event creation failed: ${res.status} ${await res.text()}`)
  return res.json()
}
