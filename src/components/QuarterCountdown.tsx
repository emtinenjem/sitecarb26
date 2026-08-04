import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { IconClock } from './icons'

/** Always-accurate: computes the current calendar quarter's end date client-side, no hardcoded dates to go stale. */
function quarterInfo(now: Date) {
  const month = now.getMonth()
  const year = now.getFullYear()
  const q = Math.floor(month / 3)
  const endMonth = q * 3 + 2
  const end = new Date(year, endMonth + 1, 0, 23, 59, 59)
  const days = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / 86400000))
  return { qNum: q + 1, qYear: year, days }
}

export default function QuarterCountdown() {
  const { t } = useLang()
  const { qNum, qYear, days } = useMemo(() => quarterInfo(new Date()), [])

  const text = t('quarterBanner.text')
    .replace('{q}', String(qNum))
    .replace('{year}', String(qYear))
    .replace('{days}', String(days))

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 rounded-2xl border px-6 py-4 text-center sm:text-start"
      style={{ borderColor: 'color-mix(in srgb, var(--color-primary) 25%, transparent)', background: 'var(--color-tint-teal)' }}
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-full shrink-0" style={{ background: 'color-mix(in srgb, var(--color-primary) 16%, transparent)', color: 'var(--color-primary)' }}>
        <IconClock size={17} strokeWidth={1.8} />
      </span>
      <p className="text-[14px] font-medium text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>
        {text}
      </p>
      <Link
        to="/services/cbam"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold shrink-0"
        style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
      >
        {t('quarterBanner.cta')}
        <svg className="rtl-flip" width="14" height="14" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  )
}
