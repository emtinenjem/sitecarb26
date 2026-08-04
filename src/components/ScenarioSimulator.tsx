import { useState } from 'react'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import { useLang } from '../i18n/LanguageContext'
import type { ComponentType } from 'react'
import type { IconProps } from './icons'

export interface Scenario {
  id: string
  label: string
  emissionsPct: number
  costPct: number
  paybackMonths: number
  note: string
}

interface Props {
  color: string
  icon: ComponentType<IconProps>
  title: string
  scenarios: Scenario[]
}

/** Pick a what-if scenario, see the simulated carbon/cost/payback impact animate instantly. */
export default function ScenarioSimulator({ color, icon: Icon, title, scenarios }: Props) {
  const { t } = useLang()
  const [idx, setIdx] = useState(0)
  const s = scenarios[idx]
  const emissions = useAnimatedNumber(s.emissionsPct, 600)
  const cost = useAnimatedNumber(s.costPct, 600)
  const payback = useAnimatedNumber(s.paybackMonths, 600)

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] overflow-hidden">
      <div className="p-6 pb-5 flex items-center gap-3 border-b border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `color-mix(in srgb, ${color} 14%, transparent)`, color }}>
          <Icon size={18} strokeWidth={1.7} />
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('scenarioSim.liveSimulation')}</div>
          <div className="text-[14px] font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>{title}</div>
        </div>
      </div>

      <div className="p-6">
        <label className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5 block" style={{ fontFamily: 'var(--font-body)' }}>
          {t('scenarioSim.chooseScenario')}
        </label>
        <select
          value={idx}
          onChange={e => setIdx(Number(e.target.value))}
          className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-[14px] text-[var(--color-text-primary)] mb-5"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {scenarios.map((sc, i) => (
            <option key={sc.id} value={i}>{sc.label}</option>
          ))}
        </select>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[var(--color-bg)] rounded-xl p-3.5 text-center">
            <div className="text-[24px] font-bold leading-none tabular-nums" style={{ color, fontFamily: 'var(--font-display)' }}>{emissions.toFixed(0)}%</div>
            <div className="text-[10px] text-[var(--color-text-secondary)] mt-1.5 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>{t('scenarioSim.emissions')}</div>
          </div>
          <div className="bg-[var(--color-bg)] rounded-xl p-3.5 text-center">
            <div className="text-[24px] font-bold leading-none tabular-nums" style={{ color, fontFamily: 'var(--font-display)' }}>{cost.toFixed(0)}%</div>
            <div className="text-[10px] text-[var(--color-text-secondary)] mt-1.5 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>{t('scenarioSim.costImpact')}</div>
          </div>
          <div className="bg-[var(--color-bg)] rounded-xl p-3.5 text-center">
            <div className="text-[24px] font-bold leading-none tabular-nums" style={{ color, fontFamily: 'var(--font-display)' }}>{payback.toFixed(0)}<span className="text-[14px]">mo</span></div>
            <div className="text-[10px] text-[var(--color-text-secondary)] mt-1.5 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>{t('scenarioSim.payback')}</div>
          </div>
        </div>

        <div key={s.id} className="bg-[var(--color-bg)] rounded-xl p-4" style={{ animation: 'fade-up 0.25s ease both' }}>
          <p className="text-[12.5px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{s.note}</p>
        </div>
        <p className="text-[10.5px] text-[var(--color-neutral-400)] italic mt-3" style={{ fontFamily: 'var(--font-body)' }}>
          {t('scenarioSim.disclaimer')}
        </p>
      </div>
    </div>
  )
}
