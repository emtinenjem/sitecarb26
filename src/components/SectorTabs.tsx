import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { IconGlobe, IconBolt, IconGear, IconChart } from './icons'
import { useLang } from '../i18n/LanguageContext'

const SECTORS = [
  { id: 'lng', labelKey: 'sector.lng.label', icon: IconGlobe, headlineKey: 'sector.lng.headline', bodyKey: 'sector.lng.body', metric: '0.3%', metricLabelKey: 'sector.lng.metricLabel', statKey: 'sector.lng.stat', color: 'var(--color-primary)', bg: 'var(--color-bg-secondary)' },
  { id: 'cement', labelKey: 'sector.cement.label', icon: IconBolt, headlineKey: 'sector.cement.headline', bodyKey: 'sector.cement.body', metric: 'TND 50,000', metricLabelKey: 'sector.cement.metricLabel', statKey: 'sector.cement.stat', color: 'var(--color-navy)', bg: 'var(--color-tint-navy)' },
  { id: 'steel', labelKey: 'sector.steel.label', icon: IconGear, headlineKey: 'sector.steel.headline', bodyKey: 'sector.steel.body', metric: 'Scope 3', metricLabelKey: 'sector.steel.metricLabel', statKey: 'sector.steel.stat', color: 'var(--color-violet)', bg: 'var(--color-tint-violet)' },
  { id: 'hospitality', labelKey: 'sector.hospitality.label', icon: IconChart, headlineKey: 'sector.hospitality.headline', bodyKey: 'sector.hospitality.body', metric: 'IFRS S2', metricLabelKey: 'sector.hospitality.metricLabel', statKey: 'sector.hospitality.stat', color: 'var(--color-info)', bg: 'var(--color-bg-secondary)' },
]

export default function SectorTabs() {
  const [active, setActive] = useState(0)
  const { ref, visible } = useInView(0.15)
  const { t } = useLang()
  const s = SECTORS[active]

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-12 fade-up ${visible ? 'visible' : ''}`}>
          <span
            className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('sector.eyebrow')}
          </span>
          <h2
            className="text-[44px] leading-[1.08] text-[var(--color-text-primary)]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            {t('sector.title')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('sector.titleAccent')}</em>
          </h2>
        </div>

        {/* Tab bar */}
        <div className={`flex gap-2 mb-10 overflow-x-auto pb-2 fade-up ${visible ? 'visible' : ''} stagger-1`}>
          {SECTORS.map((sec, i) => (
            <button
              key={sec.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                active === i
                  ? 'bg-[var(--color-primary-deep)] text-white shadow-md'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-bg)]'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <sec.icon size={16} strokeWidth={1.8} />
              {t(sec.labelKey)}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div
          key={active}
          className={`grid lg:grid-cols-2 gap-10 fade-up ${visible ? 'visible' : ''} stagger-2`}
          style={{ animation: 'fade-up 0.4s ease both' }}
        >
          {/* Text panel */}
          <div className="bg-[var(--color-surface)] rounded-3xl p-10 border border-[var(--color-border)]">
            <div className="mb-5" style={{ color: s.color }}><s.icon size={30} strokeWidth={1.4} /></div>
            <h3
              className="text-[28px] font-bold text-[var(--color-text-primary)] leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t(s.headlineKey)}
            </h3>
            <p
              className="text-[15px] leading-relaxed text-[var(--color-text-secondary)] mb-8"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t(s.bodyKey)}
            </p>
            <div className="flex items-center gap-2 text-[13px] font-medium" style={{ color: s.color, fontFamily: 'var(--font-body)' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
              {t(s.statKey)}
            </div>
          </div>

          {/* Metric panel */}
          <div
            className="rounded-3xl p-10 border border-[var(--color-border)] flex flex-col justify-between"
            style={{ background: s.bg }}
          >
            <div>
              <span
                className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-6 block"
                style={{ color: s.color, fontFamily: 'var(--font-body)' }}
              >
                {t('sector.keyMetric')}
              </span>
              <div
                className="text-[72px] font-bold leading-none mb-3"
                style={{ color: s.color, fontFamily: 'var(--font-display)' }}
              >
                {s.metric}
              </div>
              <p
                className="text-[15px] text-[var(--color-text-secondary)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t(s.metricLabelKey)}
              </p>
            </div>

            {/* CTA */}
            <Link
              to="/services"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-[14px] transition-colors"
              style={{ color: s.color, fontFamily: 'var(--font-body)' }}
            >
              {t('sector.explore')} {t(s.labelKey)} {t('sector.exploreSuffix')}
              <svg className="rtl-flip" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
