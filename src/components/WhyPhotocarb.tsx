import { useInView } from '../hooks/useInView'
import { IconLock, IconShield, IconBolt, IconGlobe } from './icons'
import { useLang } from '../i18n/LanguageContext'

const REASONS = [
  { icon: IconLock, titleKey: 'whyUs.r1.title', bodyKey: 'whyUs.r1.body', color: 'var(--color-primary)' },
  { icon: IconShield, titleKey: 'whyUs.r2.title', bodyKey: 'whyUs.r2.body', color: 'var(--color-navy)' },
  { icon: IconBolt, titleKey: 'whyUs.r3.title', bodyKey: 'whyUs.r3.body', color: 'var(--color-violet)' },
  { icon: IconGlobe, titleKey: 'whyUs.r4.title', bodyKey: 'whyUs.r4.body', color: 'var(--color-info)' },
]

export default function WhyPhotocarb() {
  const { ref, visible } = useInView(0.15)
  const { t } = useLang()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 bg-[var(--color-bg)]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-14 max-w-[760px] fade-up ${visible ? 'visible' : ''}`}>
          <span
            className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('whyUs.eyebrow')}
          </span>
          <h2
            className="text-[40px] lg:text-[52px] leading-[1.08] text-[var(--color-text-primary)]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            {t('whyUs.title')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('whyUs.titleAccent')}</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((r, i) => (
            <div
              key={r.titleKey}
              className={`fade-up ${visible ? 'visible' : ''} stagger-${i + 1} card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `color-mix(in srgb, ${r.color} 14%, transparent)`, color: r.color }}
              >
                <r.icon size={21} strokeWidth={1.6} />
              </div>
              <h3
                className="text-[17px] font-semibold text-[var(--color-text-primary)] mb-3 leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t(r.titleKey)}
              </h3>
              <p
                className="text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t(r.bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
