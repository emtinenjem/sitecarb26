import { useInView } from '../hooks/useInView'
import { useOdometer } from '../hooks/useOdometer'
import { IconTarget, IconGear, IconTrendingUp, IconClipboard, IconEuro, IconLeaf, IconBadge, IconLock } from './icons'
import { useLang } from '../i18n/LanguageContext'

const PALETTE = ['var(--color-primary)', 'var(--color-lime)', 'var(--color-violet)', 'var(--color-info)']

const STATS = [
  { value: 94,  suffix: '%',    labelKey: 'metrics.s1', icon: IconTarget },
  { value: 70,  suffix: '%',    labelKey: 'metrics.s2', icon: IconGear },
  { value: 18,  suffix: '%',    labelKey: 'metrics.s3', icon: IconTrendingUp },
  { value: 48,  suffix: 'hrs',  labelKey: 'metrics.s4', icon: IconClipboard },
  { value: 420, suffix: '/t',   labelKey: 'metrics.s5', icon: IconEuro, prefix: '€' },
  { value: 35,  suffix: '%',    labelKey: 'metrics.s6', icon: IconLeaf },
  { value: 45,  suffix: '%',    labelKey: 'metrics.s7', icon: IconBadge, iconProps: { label: 'TN' } },
  { value: 99,  suffix: '%',    labelKey: 'metrics.s8', icon: IconLock },
]

export default function MetricsStrip() {
  const { ref, visible } = useInView(0.2)
  const { t } = useLang()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-[var(--color-bg-secondary)] py-16 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-12 fade-up ${visible ? 'visible' : ''}`}>
          <span
            className="text-[11px] font-semibold tracking-[0.25em] text-[var(--color-primary)] uppercase mb-3 block"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('metrics.eyebrow')}
          </span>
          <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('metrics.title')}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <StatCard key={s.labelKey} stat={s} triggered={visible} delay={i * 0.06} color={PALETTE[i % PALETTE.length]} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, triggered, delay, color }: { stat: typeof STATS[0]; triggered: boolean; delay: number; color: string }) {
  const n = useOdometer(stat.value, triggered, 1800)
  const { t } = useLang()

  return (
    <div
      className={`fade-up ${triggered ? 'visible' : ''} card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 text-center`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="flex justify-center mb-3" style={{ color }}>
        {'iconProps' in stat && stat.iconProps ? <stat.icon {...stat.iconProps} size={20} color={color} /> : <stat.icon size={20} strokeWidth={1.6} />}
      </div>
      <div
        className="text-[30px] lg:text-[34px] font-bold leading-none mb-1.5"
        style={{ fontFamily: 'var(--font-display)', color }}
      >
        {stat.prefix || ''}{n}{stat.suffix}
      </div>
      <div
        className="text-[10.5px] text-[var(--color-text-secondary)] leading-tight uppercase tracking-wide"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {t(stat.labelKey)}
      </div>
    </div>
  )
}
