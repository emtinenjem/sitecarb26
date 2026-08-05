import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getBusyIntervals, isCalendarConfigured } from './_google-calendar.js'
import { TIME_SLOTS, TUNISIA_OFFSET, isValidDateStr, slotRange, intervalsOverlap } from './_slots.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const date = String(req.query.date || '')
  if (!isValidDateStr(date)) {
    return res.status(400).json({ error: 'Invalid or missing date. Expected YYYY-MM-DD.' })
  }

  // Calendar not wired up yet — fail open so the booking form still works, just without
  // live availability (every slot shows as open, matching pre-Calendar behavior).
  if (!isCalendarConfigured()) {
    return res.status(200).json({ taken: [], configured: false })
  }

  try {
    const dayStart = new Date(`${date}T00:00:00${TUNISIA_OFFSET}`)
    const dayEnd = new Date(`${date}T23:59:59${TUNISIA_OFFSET}`)
    const busy = await getBusyIntervals(dayStart.toISOString(), dayEnd.toISOString())

    const taken = TIME_SLOTS.filter(slot => {
      const { start, end } = slotRange(date, slot)
      return busy.some(b => intervalsOverlap(start, end, new Date(b.start), new Date(b.end)))
    })

    return res.status(200).json({ taken, configured: true })
  } catch (err) {
    console.error('Availability check failed:', err)
    // Fail open rather than blocking the whole form over a Calendar/network hiccup.
    return res.status(200).json({ taken: [], configured: true, degraded: true })
  }
}
