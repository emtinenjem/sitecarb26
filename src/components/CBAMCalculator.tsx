import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useOdometer } from '../hooks/useOdometer'
import { useLang } from '../i18n/LanguageContext'
import { IconCalculator } from './icons'

const CBAM_PRICE = 68 // EUR/tonne CO₂ (indicative 2026 EUA price)

interface Result { low: number; high: number; intensity: number }

export default function CBAMCalculator() {
  const { t } = useLang()
  const SECTORS = [
    { label: t('cbamCalc.sector.lng'), factor: 0.38 },
    { label: t('cbamCalc.sector.cement'), factor: 0.82 },
    { label: t('cbamCalc.sector.steel'), factor: 0.54 },
    { label: t('cbamCalc.sector.aluminium'), factor: 1.1 },
    { label: t('cbamCalc.sector.fertilisers'), factor: 0.44 },
    { label: t('cbamCalc.sector.hydrogen'), factor: 1.8 },
    { label: t('cbamCalc.sector.electricity'), factor: 0.65 },
  ]
  const [sector, setSector] = useState(0)
  const [tonnage, setTonnage] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [triggered, setTriggered] = useState(false)
  const { ref, visible } = useInView(0.15)

  const low  = useOdometer(result ? result.low  : 0, triggered, 1600)
  const high = useOdometer(result ? result.high : 0, triggered, 1600)

  function calculate() {
    const t = parseFloat(tonnage)
    if (!t || t <= 0) return
    const factor = SECTORS[sector].factor
    const intensity = t * factor * 1000 // kgCO₂ → tonnes
    const midCost = intensity * CBAM_PRICE
    setResult({ low: Math.round(midCost * 0.85), high: Math.round(midCost * 1.18), intensity })
    setTriggered(false)
    requestAnimationFrame(() => setTriggered(true))
  }

  const riskLevel = result
    ? result.high > 5_000_000 ? 'high' : result.high > 1_000_000 ? 'medium' : 'low'
    : null

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-[var(--color-bg)] py-16"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block" style={{ fontFamily: 'var(--font-body)' }}>
            {t('cbamCalc.eyebrow')}
          </span>
          <h2 className="text-[44px] lg:text-[56px] leading-[1.06] text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('cbamCalc.titleLine1')}{' '}
            <span className="text-[var(--color-primary)]">{t('cbamCalc.titleAccent')}</span>
          </h2>
          <p className="mt-4 text-[16px] text-[var(--color-text-secondary)] max-w-[540px] mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            {t('cbamCalc.subtitle')}
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-10 fade-up ${visible ? 'visible' : ''} stagger-1`}>
          {/* Inputs */}
          <div className="bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] p-8 lg:p-10 shadow-sm">
            <h3 className="text-[20px] font-semibold text-[var(--color-text-primary)] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
              {t('cbamCalc.exportProfile')}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-2 block" style={{ fontFamily: 'var(--font-body)' }}>
                  {t('cbamCalc.sectorLabel')}
                </label>
                <select
                  value={sector}
                  onChange={e => setSector(Number(e.target.value))}
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[15px] text-[var(--color-text-primary)] transition-all"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {SECTORS.map((s, i) => (
                    <option key={s.label} value={i}>{s.label}</option>
                  ))}
                </select>
                <p className="mt-1.5 text-[11px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
                  {t('cbamCalc.intensityFactor').replace('{factor}', String(SECTORS[sector].factor))}
                </p>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-2 block" style={{ fontFamily: 'var(--font-body)' }}>
                  {t('cbamCalc.volumeLabel')}
                </label>
                <input
                  type="number"
                  min="1"
                  value={tonnage}
                  onChange={e => setTonnage(e.target.value)}
                  placeholder={t('cbamCalc.volumePlaceholder')}
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[15px] text-[var(--color-text-primary)] transition-all placeholder:text-[var(--color-neutral-400)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>

              <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4">
                <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  <strong className="text-[var(--color-text-primary)]">{t('cbamCalc.assumptionsLabel')}</strong>{' '}
                  {t('cbamCalc.assumptionsText').replace('{price}', String(CBAM_PRICE))}
                </p>
              </div>

              <button
                onClick={calculate}
                disabled={!tonnage || parseFloat(tonnage) <= 0}
                className="w-full bg-[var(--color-primary)] text-white font-semibold py-4 rounded-xl text-[16px] hover:bg-[var(--color-primary-deep)] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t('cbamCalc.calculateBtn')}
                <svg className="rtl-flip" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9h12M11 5l4 4-4 4"/></svg>
              </button>
            </div>
          </div>

          {/* Result panel */}
          <div className={`rounded-3xl border p-8 lg:p-10 flex flex-col justify-between transition-all duration-500 ${
            result
              ? riskLevel === 'high'
                ? 'bg-[var(--color-danger-bg)] border-[color-mix(in_srgb,var(--color-danger)_25%,transparent)]'
                : riskLevel === 'medium'
                  ? 'bg-[var(--color-warning-bg)] border-[color-mix(in_srgb,var(--color-warning)_25%,transparent)]'
                  : 'bg-[var(--color-bg-secondary)] border-[var(--color-border)]'
              : 'bg-[var(--color-bg-secondary)] border-[var(--color-border)]'
          }`}>
            {!result ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 hexagon-clip bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex items-center justify-center mb-6 text-[var(--color-primary)]">
                  <IconCalculator size={30} strokeWidth={1.5} />
                </div>
                <p className="text-[16px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
                  {t('cbamCalc.emptyState')}
                </p>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span
                      className="text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                      style={{
                        fontFamily: 'var(--font-body)',
                        background: riskLevel === 'high' ? 'color-mix(in srgb, var(--color-danger) 15%, transparent)' : riskLevel === 'medium' ? 'color-mix(in srgb, var(--color-warning) 18%, transparent)' : 'var(--color-tint-teal)',
                        color: riskLevel === 'high' ? 'var(--color-danger)' : riskLevel === 'medium' ? 'var(--color-warning)' : 'var(--color-primary)',
                      }}
                    >
                      {riskLevel === 'high' ? t('cbamCalc.riskHigh') : riskLevel === 'medium' ? t('cbamCalc.riskMedium') : t('cbamCalc.riskLow')}
                    </span>
                  </div>

                  <p className="text-[13px] text-[var(--color-text-secondary)] mb-2" style={{ fontFamily: 'var(--font-body)' }}>{t('cbamCalc.estimatedLiability')}</p>
                  <div dir="ltr" className="text-[52px] lg:text-[64px] font-bold leading-none mb-1" style={{ fontFamily: 'var(--font-display)', color: riskLevel === 'high' ? 'var(--color-danger)' : riskLevel === 'medium' ? 'var(--color-warning)' : 'var(--color-primary)', unicodeBidi: 'isolate' }}>
                    €{(low / 1000).toFixed(0)}K
                  </div>
                  <div className="text-[22px] text-[var(--color-text-secondary)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>— €{(high / 1000).toFixed(0)}K</span> {t('cbamCalc.perYear')}
                  </div>

                  {/* Risk meter */}
                  <div className="mb-6">
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-warning), var(--color-danger))' }}>
                      <div
                        className="h-full bg-[color-mix(in_srgb,var(--color-surface)_60%,transparent)] rounded-full transition-all duration-1000"
                        style={{
                          marginLeft: riskLevel === 'high' ? '66%' : riskLevel === 'medium' ? '33%' : '0%',
                          width: '33%',
                          background: 'transparent',
                          boxShadow: '0 0 0 2px white inset',
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-[var(--color-text-secondary)] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                      <span>{t('cbamCalc.meterLow')}</span><span>{t('cbamCalc.meterMedium')}</span><span>{t('cbamCalc.meterHigh')}</span>
                    </div>
                  </div>

                  <div className="bg-[color-mix(in_srgb,var(--color-surface)_60%,transparent)] rounded-xl p-4 mb-4">
                    <p className="text-[12px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
                      {t('cbamCalc.impliedMass')} <strong className="text-[var(--color-text-primary)]">{(result.intensity / 1000).toFixed(1)}{t('cbamCalc.impliedMassUnit')}</strong><br />
                      {t('cbamCalc.verifiedNote')} <strong className="text-[var(--color-primary)]">40–65%</strong>
                    </p>
                  </div>

                  <p className="text-[10px] text-[var(--color-neutral-400)] italic" style={{ fontFamily: 'var(--font-body)' }}>
                    {t('cbamCalc.disclaimer')}
                  </p>
                </div>

                <a
                  href="/contact"
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-semibold py-3.5 rounded-xl text-[15px] hover:bg-[var(--color-primary-deep)] transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('cbamCalc.cta')}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
