import { useEffect, useState } from 'react'
import { Link } from './LocalizedLink'
import { AnimatePresence, motion } from 'framer-motion'
import CarbonMolecule from './CarbonMolecule'
import { SERVICES, localizeService } from '../data/services'
import { useLang } from '../i18n/LanguageContext'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const [kIdx, setKIdx] = useState(0)
  const { t, lang } = useLang()
  const headlineLines = [t('hero.titleLine1'), t('hero.titleLine2')].filter(Boolean)
  const keywords = SERVICES.map(s => localizeService(s, lang).title)

  useEffect(() => {
    const t = setInterval(() => setKIdx(i => (i + 1) % keywords.length), 2200)
    return () => clearInterval(t)
  }, [keywords.length])

  return (
    <section className="relative min-h-screen bg-[var(--color-bg)] pt-16 overflow-hidden flex flex-col">
      {/* Soft background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 70% 40%, color-mix(in srgb, var(--color-primary) 6%, transparent) 0%, transparent 60%), radial-gradient(circle at 20% 80%, color-mix(in srgb, var(--color-lime) 5%, transparent) 0%, transparent 50%)',
        }}
      />

      <div className="relative flex-1 flex items-center max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-16 lg:py-14">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center w-full">
          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center gap-3 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[var(--color-primary)]" />
                <span
                  className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('hero.eyebrow')}
                </span>
              </div>
            </motion.div>

            {/* Headline — staggered lines */}
            <h1 style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {headlineLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: EASE }}
                  className="text-[44px] lg:text-[58px] leading-[1.06] text-[var(--color-text-primary)]"
                >
                  {line}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
                className="text-[44px] lg:text-[58px] leading-[1.06] italic font-normal text-[var(--color-primary)]"
              >
                {t('hero.titleAccent')}
              </motion.div>
            </h1>

            {/* Tagline pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border-[1.5px] px-4 py-1.5"
              style={{ borderColor: 'color-mix(in srgb, var(--color-primary) 30%, transparent)', background: 'linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 10%, transparent), color-mix(in srgb, var(--color-info) 10%, transparent))' }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-body)' }}>
                {t('hero.pill')}
              </span>
            </motion.div>

            {/* Rotating keyword ticker */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
              className="flex flex-wrap items-center gap-x-2 gap-y-1"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
                {t('hero.poweringYour')}
              </span>
              <span className="relative inline-block h-[1.3rem] min-w-[13rem] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={kIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="absolute inset-x-0 top-0 whitespace-nowrap text-[14px] font-semibold text-[var(--color-primary)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {keywords[kIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="text-[17px] leading-relaxed text-[var(--color-text-secondary)] max-w-[520px]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('hero.description')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5, ease: EASE }}
              className="flex flex-col gap-4 pt-1"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-6 py-3 rounded-full shadow-[0_8px_20px_-6px_color-mix(in_srgb,var(--color-primary)_55%,transparent)] hover:bg-[var(--color-primary-deep)] hover:-translate-y-0.5 transition-all duration-200 text-[14px]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('common.bookDemo')}
                  <svg className="rtl-flip" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold px-6 py-3 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200 text-[14px]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('common.explorePlatform')}
                </Link>
              </div>

              <div className="flex items-center gap-x-5 gap-y-1.5 flex-wrap">
                {[t('hero.trilingualReports'), t('hero.noHardware')].map(f => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--color-text-secondary)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-[var(--color-primary)]">
                      <circle cx="7" cy="7" r="7" fill="currentColor" opacity="0.14" />
                      <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Hex Network */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-[440px] lg:max-w-[500px]">
              <CarbonMolecule />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none">
        <svg viewBox="0 0 1440 64" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="var(--color-bg-secondary)" />
        </svg>
      </div>
    </section>
  )
}
