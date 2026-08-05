// Mirrors TIME_SLOTS in src/pages/ContactPage.tsx — keep both in sync if business hours change.
// Tunisia does not observe DST, so its UTC offset is a fixed +01:00 year-round.
export const TIME_SLOTS = ['09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']
export const SLOT_MINUTES = 30
export const TUNISIA_OFFSET = '+01:00'

export function slotRange(dateStr: string, slot: string): { start: Date; end: Date } {
  const start = new Date(`${dateStr}T${slot}:00${TUNISIA_OFFSET}`)
  const end = new Date(start.getTime() + SLOT_MINUTES * 60_000)
  return { start, end }
}

export function isValidDateStr(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
}

export function isValidSlot(slot: string): boolean {
  return (TIME_SLOTS as string[]).includes(slot)
}

export function intervalsOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && bStart < aEnd
}
