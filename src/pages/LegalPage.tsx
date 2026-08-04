import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LEGAL_DOCS, getLegalDoc, localizeLegalDoc } from '../data/legal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import FinalCTA from '../components/FinalCTA'
import { useLang } from '../i18n/LanguageContext'

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, lang } = useLang()
  const base = slug ? getLegalDoc(slug) : undefined
  const doc = base ? localizeLegalDoc(base, lang) : undefined
  const localizedOthers = LEGAL_DOCS.filter(d => d.slug !== slug).map(d => localizeLegalDoc(d, lang))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useDocumentMeta(
    doc ? `${doc.title} | Photocarb` : 'Legal | Photocarb',
    doc?.summary,
  )

  if (!doc) return <Navigate to="/" replace />

  const others = localizedOthers

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-14 bg-[var(--color-bg)] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 82% 20%, color-mix(in srgb, var(--color-primary) 7%, transparent) 0%, transparent 55%)' }}
        />
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-2 mb-6 text-[13px]" style={{ fontFamily: 'var(--font-body)' }}>
            <Link to="/" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">{t('legalPage.home')}</Link>
            <span className="text-[var(--color-border)]">/</span>
            <span className="text-[var(--color-primary)] font-semibold">{t('legalPage.legal')}</span>
          </div>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block" style={{ fontFamily: 'var(--font-body)' }}>
            — {t('legalPage.legal')}
          </span>
          <h1 className="text-[40px] lg:text-[52px] leading-[1.06] text-[var(--color-text-primary)] mb-5" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
            {doc.title}
          </h1>
          <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)] max-w-[640px] mb-4" style={{ fontFamily: 'var(--font-body)' }}>
            {doc.summary}
          </p>
          <span
            className="inline-flex items-center text-[12px] font-medium px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('legalPage.lastUpdated')} {doc.updated}
          </span>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[var(--color-bg-secondary)] py-16">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 lg:p-12">
            <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)] mb-10 pb-10 border-b border-[var(--color-border)]" style={{ fontFamily: 'var(--font-body)' }}>
              {doc.intro}
            </p>

            <div className="space-y-9">
              {doc.sections.map(section => (
                <div key={section.heading}>
                  <h2 className="text-[19px] font-bold text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                    {section.heading}
                  </h2>
                  {section.body?.map((p, i) => (
                    <p key={i} className="text-[14.5px] leading-relaxed text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2.5 mt-3">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
                          <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--color-primary)' }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[12.5px] text-[var(--color-text-secondary)] italic mt-12 pt-8 border-t border-[var(--color-border)]" style={{ fontFamily: 'var(--font-body)' }}>
              {t('legalPage.disclaimer')}
            </p>
          </div>

          {/* Other legal documents */}
          <div className="mt-10">
            <div className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-[0.18em] mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              {t('legalPage.otherDocs')}
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {others.map(d => (
                <Link
                  key={d.slug}
                  to={`/legal/${d.slug}`}
                  className="group card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 no-underline"
                >
                  <div className="text-[14px] font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                    {d.title}
                  </div>
                  <div className="text-[12px] text-[var(--color-text-secondary)] leading-snug" style={{ fontFamily: 'var(--font-body)' }}>
                    {d.summary}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
