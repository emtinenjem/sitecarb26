import { useState } from 'react'
import { useOdometer } from '../hooks/useOdometer'
import { useLang } from '../i18n/LanguageContext'
import type { ComponentType } from 'react'
import type { IconProps } from './icons'

export interface EstimatorField {
  id: string
  label: string
  type: 'select' | 'number'
  options?: { label: string; value: number }[]
  placeholder?: string
  min?: number
}

export interface EstimatorResult {
  value: number
  decimals?: number
  note: string
}

interface Props {
  color: string
  icon: ComponentType<IconProps>
  title: string
  fields: EstimatorField[]
  compute: (values: Record<string, number>, lang: 'en' | 'fr' | 'ar') => EstimatorResult
  resultLabel: string
  resultPrefix?: string
  resultSuffix?: string
  assumption: string
  ctaLabel?: string
}

export default function MetricEstimator({
  color, icon: Icon, title, fields, compute, resultLabel, resultPrefix = '', resultSuffix = '',
  assumption, ctaLabel,
}: Props) {
  const { t, lang } = useLang()
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(fields.map(f => [f.id, f.type === 'select' ? f.options![0].value : NaN])),
  )
  const [rawInputs, setRawInputs] = useState<Record<string, string>>({})
  const [result, setResult] = useState<EstimatorResult | null>(null)
  const [triggered, setTriggered] = useState(false)

  const n = useOdometer(result ? result.value : 0, triggered, 1400)
  const ready = fields.every(f => f.type === 'select' || (Number.isFinite(values[f.id]) && values[f.id] > 0))

  function calculate() {
    if (!ready) return
    setResult(compute(values, lang))
    setTriggered(false)
    requestAnimationFrame(() => setTriggered(true))
  }

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] overflow-hidden">
      <div className="p-6 pb-5 flex items-center gap-3 border-b border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `color-mix(in srgb, ${color} 14%, transparent)`, color }}>
          <Icon size={18} strokeWidth={1.7} />
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('metricEst.liveEstimator')}</div>
          <div className="text-[14px] font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>{title}</div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {fields.map(f => (
          <div key={f.id}>
            <label className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5 block" style={{ fontFamily: 'var(--font-body)' }}>
              {f.label}
            </label>
            {f.type === 'select' ? (
              <select
                value={values[f.id]}
                onChange={e => setValues(v => ({ ...v, [f.id]: Number(e.target.value) }))}
                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-[14px] text-[var(--color-text-primary)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {f.options!.map(o => (
                  <option key={o.label} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                min={f.min ?? 1}
                value={rawInputs[f.id] ?? ''}
                onChange={e => {
                  setRawInputs(v => ({ ...v, [f.id]: e.target.value }))
                  setValues(v => ({ ...v, [f.id]: parseFloat(e.target.value) }))
                }}
                placeholder={f.placeholder}
                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-neutral-400)]"
                style={{ fontFamily: 'var(--font-body)' }}
              />
            )}
          </div>
        ))}

        <button
          onClick={calculate}
          disabled={!ready}
          className="w-full text-white font-semibold py-3 rounded-xl text-[14px] transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: color, fontFamily: 'var(--font-body)' }}
        >
          {t('metricEst.calculate')}
        </button>

        {result && (
          <div className="pt-2" style={{ animation: 'fade-up 0.3s ease both' }}>
            <div className="flex items-end gap-2">
              <span className="text-[40px] font-bold leading-none" style={{ color, fontFamily: 'var(--font-display)' }}>
                {resultPrefix}{n.toFixed(result.decimals ?? 0)}{resultSuffix}
              </span>
            </div>
            <p className="text-[12.5px] text-[var(--color-text-secondary)] mt-1" style={{ fontFamily: 'var(--font-body)' }}>{resultLabel}</p>
            <div className="mt-3 bg-[var(--color-bg)] rounded-xl p-3.5">
              <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{result.note}</p>
            </div>
            <a href="/contact" className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold" style={{ color, fontFamily: 'var(--font-body)' }}>
              {ctaLabel ?? t('metricEst.cta')}
            </a>
          </div>
        )}

        <p className="text-[10.5px] text-[var(--color-neutral-400)] italic" style={{ fontFamily: 'var(--font-body)' }}>{assumption}</p>
      </div>
    </div>
  )
}
