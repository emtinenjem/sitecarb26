import { useState } from 'react'
import { Link } from 'react-router-dom'
import PhotoCarbLogo from './PhotoCarbLogo'
import { SERVICES, localizeService, getServiceById } from '../data/services'
import { QatarFlag, TunisiaFlag } from './Flags'
import { IconMail, IconPhone, IconCheck, IconGlobe, IconInstagram, IconLinkedIn, IconFacebook } from './icons'
import { useLang } from '../i18n/LanguageContext'

const COLS = [
  {
    titleKey: 'footer.solutions',
    links: SERVICES.map(s => ({ serviceId: s.id, to: `/services/${s.id}` })),
  },
  {
    titleKey: 'footer.company',
    links: [
      { labelKey: 'footer.aboutUs', to: '/about' },
      { labelKey: 'footer.compliance', to: '/compliance' },
      { labelKey: 'footer.contact', to: '/contact' },
    ],
  },
  {
    titleKey: 'footer.legal',
    links: [
      { labelKey: 'footer.privacy', to: '/legal/privacy-policy' },
      { labelKey: 'footer.terms', to: '/legal/terms-of-service' },
      { labelKey: 'footer.dpa', to: '/legal/data-processing-agreement' },
      { labelKey: 'footer.cookie', to: '/legal/cookie-policy' },
    ],
  },
] as const

const CONTACT = [
  {
    Flag: TunisiaFlag,
    cityKey: 'contact.sousse',
    labelKey: 'footer.headquarters',
    addressKey: 'footer.tunisiaAddress',
    email: 'contact@photocarb.com',
    phone: '+216 58 56 10 00',
    color: 'var(--color-tunisia)',
  },
  {
    Flag: QatarFlag,
    cityKey: 'contact.doha',
    labelKey: 'footer.engineeringCentre',
    addressKey: 'footer.qatarAddress',
    email: 'contact@photocarb.qa',
    phone: '+974 4014 1000',
    color: 'var(--color-qatar)',
  },
]

const CERTS = ['ISO 14064', 'CBAM', 'IFRS S2', 'GHG Protocol', 'INPDP Aligned', 'Tunisia NDC 2030']

const SOCIAL = [
  { name: 'Website', href: 'https://www.photocarb.qa', icon: IconGlobe, color: 'var(--color-info)' },
  { name: 'Instagram', href: 'https://www.instagram.com/photo.carb', icon: IconInstagram, color: 'var(--color-violet)' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/PhotoCarb', icon: IconLinkedIn, color: 'var(--color-navy)' },
  { name: 'Facebook', href: 'https://www.facebook.com/Photocarb', icon: IconFacebook, color: 'var(--color-primary)' },
  { name: 'Email', href: 'mailto:contact@photocarb.com', icon: IconMail, color: 'var(--color-lime)' },
] as const

function Newsletter() {
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setError(null)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || t('footer.newsletterError'))
      }
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('footer.newsletterError'))
      setStatus('error')
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-5"
      style={{
        borderColor: 'color-mix(in srgb, var(--color-primary) 18%, var(--color-border))',
        background: 'linear-gradient(155deg, color-mix(in srgb, var(--color-primary) 8%, transparent), var(--color-surface) 60%)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Decorative corner glow */}
      <div
        className="pointer-events-none absolute -top-10 -end-10 w-32 h-32 rounded-full opacity-20 blur-2xl"
        style={{ background: 'var(--color-primary)' }}
      />

      <div className="relative flex items-center gap-2.5 mb-4">
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'color-mix(in srgb, var(--color-primary) 16%, transparent)', color: 'var(--color-primary)' }}
        >
          <IconMail size={14} strokeWidth={1.8} />
        </span>
        <div>
          <div className="text-[13.5px] font-bold text-[var(--color-text-primary)] leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
            {t('footer.newsletterLabel')}
          </div>
          <div className="text-[11.5px] text-[var(--color-text-secondary)] leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
            {t('footer.newsletterDesc')}
          </div>
        </div>
      </div>

      {status === 'success' ? (
        <div className="relative flex items-center gap-2 text-[13px] font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}>
          <IconCheck size={15} strokeWidth={2.6} />
          {t('footer.newsletterSuccess')}
        </div>
      ) : (
        <div className="relative">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('footer.newsletterPlaceholder')}
              className="w-full min-w-0 border border-[var(--color-border)] bg-[var(--color-bg)] rounded-full ps-4 pe-[5.7rem] py-2.5 text-[13px] text-[var(--color-text-primary)] placeholder:text-[var(--color-neutral-400)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="absolute end-1 top-1 bottom-1 inline-flex items-center gap-1 bg-[var(--color-primary)] text-white text-[12px] font-semibold px-3.5 rounded-full hover:bg-[var(--color-primary-deep)] transition-colors disabled:opacity-60"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {status === 'submitting' ? (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              ) : (
                <>
                  {t('footer.newsletterSubmit')}
                  <svg className="rtl-flip" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M2.5 6h7M6.5 2.5L10 6l-3.5 3.5"/></svg>
                </>
              )}
            </button>
          </form>
          {error && (
            <p className="text-[11.5px] mt-1.5" style={{ color: 'var(--color-danger)', fontFamily: 'var(--font-body)' }}>{error}</p>
          )}
        </div>
      )}
    </div>
  )
}

function FooterCol({ col, color }: { col: typeof COLS[number]; color: string }) {
  const { t, lang } = useLang()
  return (
    <div>
      <h4
        className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-5"
        style={{ fontFamily: 'var(--font-body)', color }}
      >
        {t(col.titleKey)}
      </h4>
      <ul className="space-y-2.5">
        {col.links.map(l => {
          const label =
            'labelKey' in l ? t(l.labelKey)
            : getServiceById(l.serviceId) ? localizeService(getServiceById(l.serviceId)!, lang).title : l.serviceId
          return (
            <li key={l.to + label}>
              {l.to.startsWith('/') ? (
                <Link
                  to={l.to}
                  className="nav-link-underline text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {label}
                </Link>
              ) : (
                <a
                  href={l.to}
                  className="nav-link-underline text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {label}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Footer() {
  const { t, lang } = useLang()
  return (
    <footer className="relative bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] overflow-hidden">
      {/* Decorative gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--color-primary) 6%, transparent) 0%, transparent 45%), radial-gradient(circle at 88% 10%, color-mix(in srgb, var(--color-violet) 6%, transparent) 0%, transparent 40%)' }}
      />
      <div
        className="h-[3px] relative"
        style={{ background: 'linear-gradient(90deg, var(--color-tunisia) 0%, var(--color-primary) 33%, var(--color-lime) 66%, var(--color-qatar) 100%)' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-8 relative">
        {/* 4-column main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand + tagline */}
          <div>
            <div className="mb-5">
              <PhotoCarbLogo markSize={38} />
            </div>
            <p
              className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('footer.tagline')}
            </p>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)] mb-2.5" style={{ fontFamily: 'var(--font-body)' }}>
                {t('footer.followUs')}
              </div>
              <div className="flex gap-2">
                {SOCIAL.map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--sc)] hover:border-[var(--sc)] hover:shadow-[0_4px_12px_color-mix(in_srgb,var(--sc)_30%,transparent)]"
                    style={{ ['--sc' as string]: s.color }}
                  >
                    <s.icon size={15} strokeWidth={1.7} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <FooterCol col={COLS[0]} color="var(--color-primary)" />

          {/* Company + Legal side by side, with the newsletter filling the space beneath them */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-2 gap-10">
              <FooterCol col={COLS[1]} color="var(--color-violet)" />
              <FooterCol col={COLS[2]} color="var(--color-info)" />
            </div>
            <div className="mt-8">
              <Newsletter />
            </div>
          </div>
        </div>

        {/* Contact block */}
        <div className="border-t border-[var(--color-border)] pt-10 mb-10">
          <h4
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-primary)] mb-6"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('footer.contact')}
          </h4>
          <div className="grid sm:grid-cols-2 gap-5">
            {CONTACT.map(office => (
              <div
                key={office.cityKey}
                className="card-hover rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <office.Flag width={22} height={16} />
                  <span
                    className="text-[11px] font-semibold tracking-[0.15em] uppercase"
                    style={{ fontFamily: 'var(--font-body)', color: office.color }}
                  >
                    {t(office.labelKey)}
                  </span>
                  <span className="text-[var(--color-border)]">·</span>
                  <span
                    className="text-[14px] font-semibold text-[var(--color-text-primary)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t(office.cityKey)}
                  </span>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                  {t(office.addressKey)}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <a dir="ltr" href={`mailto:${office.email}`} className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'var(--font-body)', unicodeBidi: 'isolate' }}>
                    <IconMail size={13} strokeWidth={1.8} />
                    {office.email}
                  </a>
                  <a dir="ltr" href={`tel:${office.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'var(--font-body)', unicodeBidi: 'isolate' }}>
                    <IconPhone size={13} strokeWidth={1.8} />
                    {office.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certification badges */}
        <div className="border-t border-[var(--color-border)] pt-8 mb-8">
          <p
            className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-[0.18em] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('footer.standards')}
          </p>
          <div className="flex flex-wrap gap-2">
            {CERTS.map(c => (
              <span
                key={c}
                className="text-[10px] font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 rounded-full"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {lang === 'fr' && c === 'CBAM' ? 'MACF' : c}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row — legal & company mentions */}
        <div className="border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p
            className="text-[12px] text-[var(--color-text-secondary)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('footer.rights')}
          </p>
          <p
            className="text-[12px] text-[var(--color-text-secondary)] flex items-center gap-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <TunisiaFlag width={16} height={11} /> {t('contact.sousse')}، {t('contact.tunisia')} · <QatarFlag width={16} height={11} /> {t('contact.doha')}، {t('contact.qatar')}
          </p>
        </div>
      </div>
    </footer>
  )
}
