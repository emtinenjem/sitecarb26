import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { useOdometer } from '../hooks/useOdometer'
import { IconCheck } from './icons'
import { useLang } from '../i18n/LanguageContext'

const BENEFITS = [
  {
    num: '01',
    titleKey: 'benefits.b1.title',
    emphasisKey: 'benefits.b1.emphasis',
    descKey: 'benefits.b1.desc',
    stat: 94,
    statSuffix: '%',
    statLabelKey: 'benefits.b1.statLabel',
    color: 'var(--color-primary)',
    visual: 'dashboard',
    to: '/services/bilan-carbone',
  },
  {
    num: '02',
    titleKey: 'benefits.b2.title',
    emphasisKey: 'benefits.b2.emphasis',
    descKey: 'benefits.b2.desc',
    stat: 18,
    statSuffix: '%',
    statLabelKey: 'benefits.b2.statLabel',
    color: 'var(--color-lime)',
    visual: 'chart',
    to: '/services/simulation-lab',
  },
  {
    num: '03',
    titleKey: 'benefits.b3.title',
    emphasisKey: 'benefits.b3.emphasis',
    descKey: 'benefits.b3.desc',
    stat: 48,
    statSuffix: 'hrs',
    statLabelKey: 'benefits.b3.statLabel',
    color: 'var(--color-violet)',
    visual: 'report',
    to: '/services/ai-reports',
  },
]

export default function BenefitsSection() {
  return (
    <section className="bg-[var(--color-bg-secondary)] py-8">
      {BENEFITS.map((b, i) => (
        <BenefitBlock key={b.num} benefit={b} flip={i % 2 === 1} />
      ))}
    </section>
  )
}

function BenefitBlock({ benefit: b, flip }: { benefit: typeof BENEFITS[0]; flip: boolean }) {
  const { ref, visible } = useInView(0.2)
  const count = useOdometer(b.stat, visible)
  const { t } = useLang()

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14 lg:py-16"
    >
      <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${flip ? 'direction-rtl' : ''}`}>
        {/* Content */}
        <div className={`relative ${flip ? 'lg:order-2' : ''} fade-up ${visible ? 'visible' : ''}`}>
          {/* Oversized background numeral */}
          <div
            className="absolute -top-8 -start-4 text-[180px] font-bold leading-none pointer-events-none select-none gradient-numeral opacity-[0.08]"
            style={{ fontFamily: 'var(--font-display)', zIndex: 0 }}
          >
            {b.num}
          </div>

          <div className="relative" style={{ zIndex: 1 }}>
            <span
              className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 block"
              style={{ color: b.color, fontFamily: 'var(--font-body)' }}
            >
              {b.num} — {t('benefits.sectionLabel')}
            </span>

            <h2
              className="text-[38px] lg:text-[48px] leading-[1.08] text-[var(--color-text-primary)] mb-6"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            >
              <span className="font-bold">{t(b.titleKey)}</span>{' '}
              <em className="italic font-normal" style={{ color: b.color }}>{t(b.emphasisKey)}</em>
            </h2>

            <p
              className="text-[16px] leading-relaxed text-[var(--color-text-secondary)] mb-8 max-w-[480px]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t(b.descKey)}
            </p>

            {/* Animated metric */}
            <div
              className="inline-flex items-end gap-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl px-6 py-4 mb-8 shadow-sm"
            >
              <span
                className="text-[56px] font-bold leading-none"
                style={{ color: b.color, fontFamily: 'var(--font-display)' }}
              >
                {count}{b.statSuffix}
              </span>
              <span
                className="text-[13px] text-[var(--color-text-secondary)] mb-2 max-w-[120px] leading-tight"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t(b.statLabelKey)}
              </span>
            </div>

            <div>
              <Link
                to={b.to}
                className="inline-flex items-center gap-2 text-[15px] font-semibold transition-colors"
                style={{ color: b.color, fontFamily: 'var(--font-body)' }}
              >
                {t('common.learnMore')}
                <svg className="rtl-flip" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Visual panel */}
        <div className={`${flip ? 'lg:order-1' : ''} fade-up ${visible ? 'visible' : ''} stagger-2`}>
          <VisualPanel type={b.visual} color={b.color} num={b.num} />
        </div>
      </div>
    </div>
  )
}

function VisualPanel({ type, color }: { type: string; color: string; num?: string }) {
  return (
    <div
      className="rounded-3xl overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, ${color}10 0%, ${color}22 100%)`,
        border: `1px solid ${color}30`,
        minHeight: '360px',
      }}
    >
      {/* Decorative hex background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        viewBox="0 0 400 360"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 24 }).map((_, i) => {
          const col = i % 6
          const row = Math.floor(i / 6)
          const ox = col * 70 + (row % 2) * 35
          const oy = row * 60
          return (
            <polygon
              key={i}
              points={`${ox + 35},${oy} ${ox + 70},${oy + 17} ${ox + 70},${oy + 51} ${ox + 35},${oy + 68} ${ox},${oy + 51} ${ox},${oy + 17}`}
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
          )
        })}
      </svg>

      {/* Mock UI for each type */}
      <div className="relative p-8 flex flex-col gap-4 h-full min-h-[360px] justify-center">
        {type === 'dashboard' && <DashboardMock color={color} />}
        {type === 'chart' && <ChartMock color={color} />}
        {type === 'report' && <ReportMock color={color} />}
      </div>
    </div>
  )
}

function DashboardMock({ color }: { color: string }) {
  const { t } = useLang()
  const rows = [
    { label: t('benefitsMock.cementFacility'), val: 91, status: t('benefitsMock.statusOptimal') },
    { label: t('benefitsMock.steelFacility'), val: 87, status: t('benefitsMock.statusOptimal') },
    { label: t('benefitsMock.textileFacility'), val: 74, status: t('benefitsMock.statusReview') },
  ]
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>
          {t('benefitsMock.dashboardTitle')}
        </span>
        <span className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      {rows.map(r => (
        <div key={r.label} className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-[11px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{r.label}</span>
            <span className="text-[11px] font-semibold" style={{ color }}>{r.val}%</span>
          </div>
          <div className="h-1.5 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${r.val}%`, background: color }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ChartMock({ color }: { color: string }) {
  const { t } = useLang()
  const heights = [40, 55, 45, 70, 60, 80, 95, 88]
  const months = [
    t('benefitsMock.monthJan'), t('benefitsMock.monthFeb'), t('benefitsMock.monthMar'), t('benefitsMock.monthApr'),
    t('benefitsMock.monthMay'), t('benefitsMock.monthJun'), t('benefitsMock.monthJul'), t('benefitsMock.monthAug'),
  ]
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl p-5 shadow-lg">
      <div className="text-[12px] font-semibold text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-body)' }}>
        {t('benefitsMock.chartTitle')}
      </div>
      <div className="flex items-end gap-2 h-24">
        {heights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm transition-all"
            style={{ height: `${h}%`, background: i >= 4 ? color : `${color}44` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[9px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
        {months.map((m, i) => (
          <span key={m} style={i >= 4 ? { color } : undefined}>{m}</span>
        ))}
      </div>
    </div>
  )
}

function ReportMock({ color }: { color: string }) {
  const { t } = useLang()
  const items = [
    t('benefitsMock.reportCbam'), t('benefitsMock.reportIfrs'),
    t('benefitsMock.reportNdc'), t('benefitsMock.reportVerification'),
  ]
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl p-5 shadow-lg">
      <div className="text-[12px] font-semibold text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-body)' }}>
        {t('benefitsMock.reportTitle')}
      </div>
      {items.map((item, i) => (
        <div key={item} className="flex items-center gap-3 mb-3">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
            style={{ background: i < 3 ? color : 'var(--color-border)' }}
          >
            {i < 3 ? <IconCheck size={11} strokeWidth={2.6} /> : '···'}
          </div>
          <span className="text-[11px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
          {i < 3 && (
            <span
              className="ml-auto text-[9px] font-semibold px-2 py-0.5 rounded-full"
              style={{ color, background: `${color}15` }}
            >
              {t('benefitsMock.done')}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
