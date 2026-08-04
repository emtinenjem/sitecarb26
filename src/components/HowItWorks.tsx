import { useInView } from '../hooks/useInView'
import { IconPlug, IconBolt, IconCheckCircle } from './icons'
import { useLang } from '../i18n/LanguageContext'

const STEPS = [
  { num: '01', titleKey: 'how.s1.title', subtitleKey: 'how.s1.subtitle', descKey: 'how.s1.desc', icon: IconPlug, color: 'var(--color-primary)' },
  { num: '02', titleKey: 'how.s2.title', subtitleKey: 'how.s2.subtitle', descKey: 'how.s2.desc', icon: IconBolt, color: 'var(--color-lime)' },
  { num: '03', titleKey: 'how.s3.title', subtitleKey: 'how.s3.subtitle', descKey: 'how.s3.desc', icon: IconCheckCircle, color: 'var(--color-violet)' },
]

export default function HowItWorks() {
  const { ref, visible } = useInView(0.2)
  const { t } = useLang()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-20 fade-up ${visible ? 'visible' : ''}`}>
          <span
            className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('how.eyebrow')}
          </span>
          <h2
            className="text-[44px] leading-[1.08] text-[var(--color-text-primary)]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            {t('how.title')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('how.titleAccent')}</em>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-0 relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(33.33%+24px)] right-[calc(33.33%+24px)] h-[1px] bg-[var(--color-border)] z-0" />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`relative z-10 px-6 fade-up ${visible ? 'visible' : ''} stagger-${i + 1}`}
            >
              {/* Step circle */}
              <div
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-6 shadow-lg"
                style={{ background: step.color, fontFamily: 'var(--font-body)' }}
              >
                {step.num}
              </div>

              {/* Card */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7 text-center card-hover">
                <div className="mb-4 flex justify-center" style={{ color: step.color }}><step.icon size={28} strokeWidth={1.5} /></div>
                <h3
                  className="text-[22px] font-bold text-[var(--color-text-primary)] leading-tight mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t(step.titleKey)}
                </h3>
                <div
                  className="text-[13px] font-medium mb-4"
                  style={{ color: step.color, fontFamily: 'var(--font-body)' }}
                >
                  {t(step.subtitleKey)}
                </div>
                <p
                  className="text-[14px] leading-relaxed text-[var(--color-text-secondary)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t(step.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
