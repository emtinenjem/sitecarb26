import { useState } from 'react'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import { IconCheck } from './icons'
import { useLang } from '../i18n/LanguageContext'
import type { ComponentType } from 'react'
import type { IconProps } from './icons'

interface Props {
  color: string
  icon: ComponentType<IconProps>
  title: string
  prompt: string
  items: string[]
  unit: string
  withPhotocarbNote: string
}

/** Interactive checklist — user ticks what they have today, sees the gap Photocarb closes. */
export default function ChecklistScorer({ color, icon: Icon, title, prompt, items, unit, withPhotocarbNote }: Props) {
  const { t } = useLang()
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const count = useAnimatedNumber(checked.size)
  const pct = Math.round((checked.size / items.length) * 100)

  const toggle = (i: number) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] overflow-hidden">
      <div className="p-6 pb-5 flex items-center gap-3 border-b border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `color-mix(in srgb, ${color} 14%, transparent)`, color }}>
          <Icon size={18} strokeWidth={1.7} />
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('checklistScorer.liveChecklist')}</div>
          <div className="text-[14px] font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>{title}</div>
        </div>
      </div>

      <div className="px-6 pt-5 pb-2">
        <p className="text-[13px] text-[var(--color-text-secondary)] mb-4" style={{ fontFamily: 'var(--font-body)' }}>{prompt}</p>
        <div className="flex items-end gap-3 mb-1">
          <span className="text-[40px] font-bold leading-none tabular-nums" style={{ color, fontFamily: 'var(--font-display)' }}>
            {Math.round(count)}<span className="text-[22px]">/{items.length}</span>
          </span>
          <span className="text-[13px] text-[var(--color-text-secondary)] mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>{unit} {t('checklistScorer.coveredToday')}</span>
        </div>
        <div className="h-1.5 rounded-full bg-[var(--color-bg)] overflow-hidden mb-5">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>

      <div className="px-6 pb-3 grid sm:grid-cols-2 gap-1.5 max-h-[240px] overflow-y-auto">
        {items.map((item, i) => {
          const isChecked = checked.has(i)
          return (
            <button
              key={item}
              onClick={() => toggle(i)}
              className="flex items-center gap-2.5 text-left px-2.5 py-2 rounded-lg transition-colors hover:bg-[var(--color-bg)]"
            >
              <span
                className="w-4 h-4 rounded shrink-0 flex items-center justify-center border transition-colors"
                style={{ borderColor: isChecked ? color : 'var(--color-neutral-300)', background: isChecked ? color : 'transparent' }}
              >
                {isChecked && <IconCheck size={11} strokeWidth={3} style={{ color: 'white' }} />}
              </span>
              <span className="text-[12.5px] text-[var(--color-text-primary)] leading-snug" style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
            </button>
          )
        })}
      </div>

      <div className="px-6 py-4 mt-2 border-t border-[var(--color-border)]" style={{ background: `color-mix(in srgb, ${color} 6%, transparent)` }}>
        <p className="text-[12.5px] leading-relaxed" style={{ color, fontFamily: 'var(--font-body)' }}>
          <strong>{items.length}/{items.length}</strong> {t('checklistScorer.withPhotocarbPrefix')} {withPhotocarbNote}
        </p>
      </div>
    </div>
  )
}
