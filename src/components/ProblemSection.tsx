import { useInView } from '../hooks/useInView'
import { IconClipboard, IconCoins, IconGear, IconNetwork } from '../components/icons'
import { useLang } from '../i18n/LanguageContext'

const PROBLEMS = [
  { icon: IconClipboard, titleKey: 'problem.reg.title', bodyKey: 'problem.reg.body', color: 'var(--color-primary)' },
  { icon: IconCoins, titleKey: 'problem.fin.title', bodyKey: 'problem.fin.body', color: 'var(--color-violet)' },
  { icon: IconGear, titleKey: 'problem.ops.title', bodyKey: 'problem.ops.body', color: 'var(--color-lime)' },
  { icon: IconNetwork, titleKey: 'problem.comp.title', bodyKey: 'problem.comp.body', color: 'var(--color-primary)' },
]

export default function ProblemSection() {
  const { ref, visible } = useInView(0.15)
  const { t } = useLang()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 bg-[var(--color-bg)]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`mb-16 max-w-[760px] fade-up ${visible ? 'visible' : ''}`}>
          <span
            className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('problem.eyebrow')}
          </span>
          <h2
            className="text-[44px] lg:text-[56px] leading-[1.06] text-[var(--color-text-primary)]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            {t('problem.title')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('problem.titleAccent')}</em>
          </h2>
        </div>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROBLEMS.map((p, i) => (
            <div
              key={p.titleKey}
              className={`fade-up ${visible ? 'visible' : ''} stagger-${i + 1} card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7`}
            >
              {/* Hex icon */}
              <div
                className="w-12 h-12 hexagon-clip flex items-center justify-center mb-5"
                style={{ background: `color-mix(in srgb, ${p.color} 18%, transparent)`, color: p.color }}
              >
                <p.icon size={21} strokeWidth={1.6} />
              </div>
              <h3
                className="text-[18px] font-semibold text-[var(--color-text-primary)] mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t(p.titleKey)}
              </h3>
              <p
                className="text-[14px] leading-relaxed text-[var(--color-text-secondary)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t(p.bodyKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className={`mt-16 fade-up ${visible ? 'visible' : ''} stagger-4`}>
          <p
            className="text-[24px] font-semibold text-[var(--color-primary)] text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('problem.closing')}
          </p>
        </div>
      </div>
    </section>
  )
}
