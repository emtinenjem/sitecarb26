import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from './LocalizedLink'
import PhotoCarbLogo from './PhotoCarbLogo'
import { SERVICES, localizeService } from '../data/services'
import { useLang, LANG_ORDER, LANG_LABELS, LANG_NAMES, getBarePath } from '../i18n/LanguageContext'
import { IconGlobe } from './icons'

const SCROLL_THRESHOLD = 80

const LINKS = [
  { key: 'nav.about', to: '/about' },
  { key: 'nav.compliance', to: '/compliance' },
  { key: 'nav.contact', to: '/contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { t, lang, setLang } = useLang()
  const services = SERVICES.map(s => localizeService(s, lang))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setMobileOpen(false)
    setServicesOpen(false)
    setLangOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false)
        setLangOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150)
  }

  const barePath = getBarePath(location.pathname)
  const isServicesActive = barePath === '/services'

  return (
    <nav
      style={{ fontFamily: 'var(--font-body)' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg)]/98 backdrop-blur-md shadow-[0_4px_24px_color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] border-b border-[var(--color-border)]/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="shrink-0 transition-transform duration-200 hover:scale-[1.02]">
          <PhotoCarbLogo markSize={42} />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {/* Services dropdown trigger */}
          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setServicesOpen(v => !v)}
              aria-expanded={servicesOpen}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                isServicesActive || servicesOpen
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {t('nav.services')}
              <svg
                width="11" height="11" viewBox="0 0 12 12" fill="none"
                className="transition-transform duration-200"
                style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[600px]"
                >
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-card-hover)] overflow-hidden p-5">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                      {t('nav.ourServices')}
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {services.map(item => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.id}
                            to={`/services/${item.id}`}
                            className="group flex items-center gap-3 rounded-xl p-2.5 hover:bg-[var(--color-bg)] transition-colors"
                          >
                            <div
                              className="icon-tile w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `color-mix(in srgb, ${item.color} 14%, transparent)`, color: item.color }}
                            >
                              <Icon size={17} strokeWidth={1.7} />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[13px] font-semibold text-[var(--color-text-primary)] leading-snug truncate">{item.title}</div>
                              <div className="text-[11px] text-[var(--color-text-secondary)] leading-snug truncate">{item.subtitle}</div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                    <div className="flex items-center justify-between border-t border-[var(--color-border)] mt-3 pt-3.5">
                      <span className="text-[11px] text-[var(--color-text-secondary)]">{t('nav.reportsReady')}</span>
                      <Link
                        to="/services"
                        className="link-arrow text-[12px] font-semibold text-[var(--color-primary)]"
                      >
                        {t('common.viewAllServices')}
                        <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {LINKS.map(l => {
            const isActive = barePath === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link-underline px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'is-active text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {t(l.key)}
              </Link>
            )
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button
              type="button"
              onClick={() => setLangOpen(v => !v)}
              aria-label={t('nav.switchLanguage')}
              aria-expanded={langOpen}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
            >
              <IconGlobe size={16} strokeWidth={1.7} />
              {LANG_LABELS[lang]}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full end-0 pt-2 w-[160px]"
                >
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-[var(--shadow-card-hover)] overflow-hidden p-1.5">
                    {LANG_ORDER.map(l => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => { setLang(l); setLangOpen(false) }}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                          l === lang ? 'text-[var(--color-primary)] bg-[var(--color-tint-teal)]' : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'
                        }`}
                      >
                        {LANG_NAMES[l]}
                        {l === lang && <span className="text-[11px]">✓</span>}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[var(--color-primary-deep)] transition-colors duration-200"
          >
            {t('common.bookDemo')}
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen(v => !v)}
              aria-label={t('nav.switchLanguage')}
              aria-expanded={langOpen}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)]"
            >
              <IconGlobe size={15} strokeWidth={1.7} />
              {LANG_LABELS[lang]}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full end-0 pt-2 w-[150px] z-10"
                >
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-[var(--shadow-card-hover)] overflow-hidden p-1.5">
                    {LANG_ORDER.map(l => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => { setLang(l); setLangOpen(false) }}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                          l === lang ? 'text-[var(--color-primary)] bg-[var(--color-tint-teal)]' : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'
                        }`}
                      >
                        {LANG_NAMES[l]}
                        {l === lang && <span className="text-[11px]">✓</span>}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            type="button"
            aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setMobileOpen(v => !v)}
            className="text-[var(--color-text-primary)] p-2.5 -me-2.5"
          >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {mobileOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-[var(--color-bg)] border-t border-[var(--color-border)] overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-text-secondary)] mt-1 mb-1.5">{t('nav.services')}</div>
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {services.map(item => {
                  const Icon = item.icon
                  return (
                    <Link key={item.id} to={`/services/${item.id}`} className="flex items-center gap-2 py-2 text-[13px] font-medium text-[var(--color-text-primary)]">
                      <Icon size={16} strokeWidth={1.7} style={{ color: item.color }} />
                      {item.title}
                    </Link>
                  )
                })}
              </div>
              <div className="h-px bg-[var(--color-border)] my-2" />
              {LINKS.map(l => (
                <Link key={l.to} to={l.to} className="py-2.5 text-[15px] font-medium text-[var(--color-text-primary)]">
                  {t(l.key)}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-3 text-center bg-[var(--color-primary)] text-white text-sm font-medium px-5 py-3 rounded-full"
              >
                {t('common.bookDemo')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
