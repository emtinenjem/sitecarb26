import { Link } from 'react-router-dom'
import CertMarquee from '../components/CertMarquee'
import IntegrationArch from '../components/IntegrationArch'
import MetricsStrip from '../components/MetricsStrip'
import FinalCTA from '../components/FinalCTA'
import { useInView } from '../hooks/useInView'
import { SERVICES, localizeService, type ServiceDef } from '../data/services'
import { useLang } from '../i18n/LanguageContext'

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <CertMarquee />
      <ServicesIndex />
      <IntegrationArch />
      <MetricsStrip />
      <FinalCTA />
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ServicesHero() {
  const { t } = useLang()
  return (
    <section className="pt-32 pb-16 bg-[var(--color-bg)] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, color-mix(in srgb, var(--color-primary) 7%, transparent) 0%, transparent 60%)' }}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[820px]">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
              — {t('servicesPage.eyebrow')}
            </span>
            <span className="tunisia-rule" />
          </div>
          <h1 className="text-[48px] lg:text-[62px] leading-[1.06] text-[var(--color-text-primary)] mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
            {t('servicesPage.title')}{' '}
            <em className="italic font-normal text-[var(--color-primary)]">{t('servicesPage.titleAccent')}</em>
          </h1>
          <p className="text-[18px] leading-relaxed text-[var(--color-text-secondary)] max-w-[620px]" style={{ fontFamily: 'var(--font-body)' }}>
            {t('servicesPage.subtitle')}
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Bento index ────────────────────────────────────────────────────────────────

function ServicesIndex() {
  const { ref, visible } = useInView(0.1)
  const { lang } = useLang()
  const [first, ...rest] = SERVICES.map(s => localizeService(s, lang))

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-5">
          <IndexCard service={first} featured visible={visible} delay={0} />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((s, i) => (
            <IndexCard key={s.id} service={s} visible={visible} delay={0.05 + i * 0.04} />
          ))}
        </div>
      </div>
    </section>
  )
}

function IndexCard({ service: s, featured, visible, delay }: { service: ServiceDef; featured?: boolean; visible: boolean; delay: number }) {
  const Icon = s.icon
  const { t } = useLang()

  if (featured) {
    return (
      <Link
        to={`/services/${s.id}`}
        style={{ transitionDelay: `${delay}s`, borderColor: `color-mix(in srgb, ${s.color} 35%, transparent)` }}
        className={`group fade-up ${visible ? 'visible' : ''} card-hover flex flex-col sm:flex-row sm:items-center gap-6 bg-[var(--color-surface)] border-2 rounded-2xl no-underline p-8`}
      >
        <div
          className="w-16 h-16 flex items-center justify-center rounded-xl shrink-0"
          style={{ background: `color-mix(in srgb, ${s.color} 13%, transparent)`, color: s.color }}
        >
          <Icon size={30} strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-[26px] font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
            {s.title}
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{s.subtitle}</p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)] max-w-[560px]" style={{ fontFamily: 'var(--font-body)' }}>{s.valueProp}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {s.industries.slice(0, 4).map(ind => (
              <span
                key={ind}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: `color-mix(in srgb, ${s.color} 10%, transparent)`, color: s.color, fontFamily: 'var(--font-body)' }}
              >
                {ind}
              </span>
            ))}
            {s.industries.length > 4 && (
              <span className="text-[11px] font-medium px-2.5 py-1 text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
                +{s.industries.length - 4}
              </span>
            )}
          </div>
        </div>
        <span className="link-arrow text-[13px] font-semibold shrink-0" style={{ color: s.color, fontFamily: 'var(--font-body)' }}>
          {t('common.learnMore')}
          <svg className="rtl-flip" width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </Link>
    )
  }

  return (
    <Link
      to={`/services/${s.id}`}
      style={{ transitionDelay: `${delay}s` }}
      className={`group fade-up ${visible ? 'visible' : ''} card-hover flex flex-col gap-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl no-underline p-6`}
    >
      <div
        className="w-11 h-11 flex items-center justify-center rounded-xl shrink-0"
        style={{ background: `color-mix(in srgb, ${s.color} 13%, transparent)`, color: s.color }}
      >
        <Icon size={20} strokeWidth={1.6} />
      </div>
      <div>
        <h3 className="text-[16px] font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
          {s.title}
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{s.subtitle}</p>
      </div>
      <p className="text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{s.valueProp}</p>
      <div className="flex flex-wrap gap-1.5">
        {s.industries.slice(0, 2).map(ind => (
          <span
            key={ind}
            className="text-[10.5px] font-medium px-2 py-1 rounded-full"
            style={{ background: `color-mix(in srgb, ${s.color} 10%, transparent)`, color: s.color, fontFamily: 'var(--font-body)' }}
          >
            {ind}
          </span>
        ))}
        {s.industries.length > 2 && (
          <span className="text-[10.5px] font-medium px-2 py-1 text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
            +{s.industries.length - 2}
          </span>
        )}
      </div>
      <span className="link-arrow text-[13px] font-semibold mt-auto" style={{ color: s.color, fontFamily: 'var(--font-body)' }}>
        {t('common.learnMore')}
        <svg className="rtl-flip" width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </Link>
  )
}
