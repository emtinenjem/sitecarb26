import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { IconCheck } from './icons'
import { useLang } from '../i18n/LanguageContext'

export default function FinalCTA() {
  const { ref, visible } = useInView(0.2)
  const { t } = useLang()
  const inclusions = [t('finalCta.inc1'), t('finalCta.inc2'), t('finalCta.inc3'), t('finalCta.inc4')]

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg)] py-16">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
        <div className={`fade-up ${visible ? 'visible' : ''}`}>
          <span
            className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('finalCta.eyebrow')}
          </span>
          <h2
            className="text-[44px] lg:text-[56px] leading-[1.06] text-[var(--color-text-primary)] mb-6"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            {t('finalCta.title')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('finalCta.titleAccent')}</em>
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 mb-10 text-start max-w-[640px] mx-auto">
            {inclusions.map(item => (
              <div key={item} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5"
                  style={{ background: 'var(--color-primary)' }}
                >
                  <IconCheck size={11} strokeWidth={2.6} />
                </div>
                <span
                  className="text-[14px] text-[var(--color-text-secondary)] leading-snug"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-8 py-4 rounded-full hover:bg-[var(--color-primary-deep)] transition-colors duration-200 text-[16px]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('finalCta.bookCall')}
              <svg className="rtl-flip" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9h12M11 5l4 4-4 4"/></svg>
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold px-8 py-4 rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors duration-200 text-[16px]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('finalCta.downloadGuide')}
            </Link>
          </div>

          <p
            className="text-[13px] text-[var(--color-text-secondary)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('finalCta.disclaimer')}
          </p>
        </div>
      </div>
    </section>
  )
}
