import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import { IconCheck, IconCross } from './icons'
import { useLang } from '../i18n/LanguageContext'

interface SideMetric {
  value: number
  prefix?: string
  suffix?: string
}

interface SideConfig {
  metric: SideMetric
  items: string[]
}

interface Props {
  color: string
  metricLabel: string
  off: SideConfig
  on: SideConfig
  offLabel?: string
  onLabel?: string
}

/** Reusable interactive "Without / With Photocarb" mini-app — toggle to see the effect live. */
export default function AvecSansWidget({ color, metricLabel, off, on, offLabel, onLabel }: Props) {
  const { t } = useLang()
  const [enabled, setEnabled] = useState(false)
  const side = enabled ? on : off
  const animatedValue = useAnimatedNumber(side.metric.value)
  const decimals = Number.isInteger(off.metric.value) && Number.isInteger(on.metric.value) ? 0 : 1

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] overflow-hidden">
      {/* Toggle */}
      <div className="p-6 pb-0 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
            {t('avecSans.liveSimulator')}
          </div>
          <div className="text-[15px] font-semibold text-[var(--color-text-primary)] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
            {t('avecSans.flipSwitch')}
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => setEnabled(v => !v)}
          className="relative inline-flex items-center rounded-full p-1 border border-[var(--color-border)] bg-[var(--color-bg)] shrink-0"
          style={{ width: 268 }}
        >
          <motion.div
            className="absolute top-1 bottom-1 rounded-full"
            style={{ width: 'calc(50% - 4px)', background: enabled ? color : 'var(--color-neutral-400)' }}
            animate={{ x: enabled ? 'calc(100% + 4px)' : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          />
          <span
            className={`relative z-10 flex-1 text-center text-[12.5px] font-semibold py-2 transition-colors duration-200 ${enabled ? 'text-[var(--color-text-secondary)]' : 'text-white'}`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {offLabel ?? t('avecSans.without')}
          </span>
          <span
            className={`relative z-10 flex-1 text-center text-[12.5px] font-semibold py-2 transition-colors duration-200 ${enabled ? 'text-white' : 'text-[var(--color-text-secondary)]'}`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {onLabel ?? t('avecSans.with')}
          </span>
        </button>
      </div>

      {/* Animated metric */}
      <div className="px-6 pt-6 pb-2 flex items-end gap-3">
        <div
          className="text-[52px] font-bold leading-none tabular-nums transition-colors duration-300"
          style={{ fontFamily: 'var(--font-display)', color: enabled ? color : 'var(--color-neutral-400)' }}
        >
          {side.metric.prefix}
          {animatedValue.toFixed(decimals)}
          {side.metric.suffix}
        </div>
        <div className="text-[13px] text-[var(--color-text-secondary)] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
          {metricLabel}
        </div>
      </div>

      <div className="h-px bg-[var(--color-border)] mx-6" />

      {/* Crossfading checklist */}
      <div className="p-6 relative overflow-hidden" style={{ minHeight: 190 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={enabled ? 'on' : 'off'}
            initial={{ opacity: 0, x: enabled ? 16 : -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: enabled ? -16 : 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {side.items.map(item => (
              <li key={item} className="flex items-start gap-3">
                {enabled ? (
                  <IconCheck size={16} strokeWidth={2.2} style={{ color, marginTop: 2 }} className="shrink-0" />
                ) : (
                  <IconCross size={16} strokeWidth={2} style={{ color: 'var(--color-neutral-400)', marginTop: 2 }} className="shrink-0" />
                )}
                <span
                  className="text-[13.5px] leading-snug"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: enabled ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    fontWeight: enabled ? 500 : 400,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  )
}
