import { useInView } from '../hooks/useInView'
import { useLang } from '../i18n/LanguageContext'
import QuarterCountdown from './QuarterCountdown'

const REGS = [
  { num: '①', label: 'CBAM', labelFr: 'MACF', titleKey: 'compliance.cbam.title', descKey: 'compliance.cbam.desc', deadlineKey: 'compliance.cbam.deadline', color: 'var(--color-primary)' },
  { num: '②', label: 'IFRS S1/S2', titleKey: 'compliance.ifrs.title', descKey: 'compliance.ifrs.desc', deadlineKey: 'compliance.ifrs.deadline', color: 'var(--color-violet)' },
  { num: '③', label: 'ANME · Art. 7', titleKey: 'compliance.ncap.title', descKey: 'compliance.ncap.desc', deadlineKey: 'compliance.ncap.deadline', color: 'var(--color-navy)' },
]

export default function ComplianceSection() {
  const { ref, visible } = useInView(0.15)
  const { t, lang } = useLang()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-16 fade-up ${visible ? 'visible' : ''}`}>
          <span
            className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('compliance.eyebrow')}
          </span>
          <h2
            className="text-[44px] leading-[1.08] text-[var(--color-text-primary)]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            {t('compliance.title')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('compliance.titleAccent')}</em>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {REGS.map((r, i) => (
            <div
              key={r.num}
              className={`fade-up ${visible ? 'visible' : ''} stagger-${i + 1} card-hover bg-white border border-[var(--color-border)] rounded-3xl p-8`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span
                    className="text-[28px] font-bold"
                    style={{ color: r.color, fontFamily: 'var(--font-display)' }}
                  >
                    {r.num}
                  </span>
                  <span
                    className="ml-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-text-secondary)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {lang === 'fr' && 'labelFr' in r ? r.labelFr : r.label}
                  </span>
                </div>
                <span
                  className="text-[10px] font-semibold px-3 py-1 rounded-full"
                  style={{ background: `color-mix(in srgb, ${r.color} 15%, transparent)`, color: r.color, fontFamily: 'var(--font-body)' }}
                >
                  {t(r.deadlineKey)}
                </span>
              </div>

              <h3
                className="text-[20px] font-bold text-[var(--color-text-primary)] mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t(r.titleKey)}
              </h3>

              <p
                className="text-[14px] leading-relaxed text-[var(--color-text-secondary)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t(r.descKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Live quarter-close urgency banner */}
        <div className={`mt-8 fade-up ${visible ? 'visible' : ''} stagger-4`}>
          <QuarterCountdown />
        </div>
      </div>
    </section>
  )
}
