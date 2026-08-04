import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
  const trustBadges = ['ISO 14064', 'IFRS S2', t('hero.trilingualReports'), t('hero.noHardware')]

  useEffect(() => {
    const t = setInterval(() => setKIdx(i => (i + 1) % keywords.length), 2200)
    return () => clearInterval(t)
  }, [keywords.length])

  return (
    <section className="relative min-h-screen bg-[var(--color-bg)] pt-16 overflow-hidden">
      {/* Soft background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 70% 40%, color-mix(in srgb, var(--color-primary) 6%, transparent) 0%, transparent 60%), radial-gradient(circle at 20% 80%, color-mix(in srgb, var(--color-lime) 5%, transparent) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-24">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-start">
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
          </div>

          {/* Right — Hex Network + actions */}
          <div className="flex flex-col items-center gap-7">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
              className="w-full max-w-[480px]"
            >
              <CarbonMolecule />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex w-full max-w-[420px] flex-col items-center gap-4"
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-6 py-3 rounded-full hover:bg-[var(--color-primary-deep)] transition-colors duration-200 text-[14px]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('common.bookDemo')}
                  <svg className="rtl-flip" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold px-6 py-3 rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors duration-200 text-[14px]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('common.explorePlatform')}
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                {trustBadges.map(b => (
                  <span
                    key={b}
                    className="text-[10.5px] font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] px-2.5 py-1 rounded-full bg-[var(--color-surface)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
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
