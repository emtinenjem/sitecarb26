import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { IconShield, IconCoins, IconLeaf, IconClipboard } from './icons'
import { WORLD_VIEWBOX, COUNTRY_PATHS } from '../data/worldMap'
import { REG, levelLabel, pick, type Level } from '../data/regulationData'

const LEVEL_COLOR: Record<Level, string> = {
  red: '#DC2626',
  orange: '#E8850C',
  green: 'var(--color-primary)',
}

export default function RegulationExplorer() {
  const { lang } = useLang()
  const [selected, setSelected] = useState('tn')
  const [hovered, setHovered] = useState<string | null>(null)
  const country = REG[selected]

  const L = lang === 'ar'
    ? {
        eyebrow: 'مستكشف تفاعلي',
        title: 'مستكشف لوائح الكربون حول العالم',
        subtitle: 'انقر على دولة لعرض وضع CBAM وضريبة الكربون ومتطلبات ESG وقواعد الإبلاغ فيها.',
        legendRed: 'تسعير كربون وتدابير حدودية سارية',
        legendOrange: 'تنظيم قيد التطبيق التدريجي',
        legendGreen: 'إطار وطني قيد التطوير',
        cbam: 'آلية الكربون الحدودية (CBAM)',
        tax: 'ضريبة / تسعير الكربون',
        esg: 'متطلبات ESG',
        reporting: 'قواعد الإبلاغ',
        note: 'ملخص استرشادي — يوليو 2026. المصادر: لائحة الاتحاد الأوروبي 2023/956، وبرامج التسعير الوطنية، ومتتبّعات تبنّي ISSB/CSRD. خريطة العالم بيانات المجال العام.',
      }
    : lang === 'fr'
    ? {
        eyebrow: 'Explorateur interactif',
        title: 'Explorateur des réglementations carbone par pays',
        subtitle: 'Cliquez sur un pays pour voir son statut MACF, sa taxe carbone, ses exigences ESG et ses règles de reporting.',
        legendRed: 'Tarification carbone et mesures frontalières en vigueur',
        legendOrange: 'Réglementation en cours de déploiement',
        legendGreen: 'Cadre national en développement',
        cbam: 'MACF / Mécanisme frontalier',
        tax: 'Taxe / tarification carbone',
        esg: 'Exigences ESG',
        reporting: 'Règles de reporting',
        note: "Résumé indicatif — juillet 2026. Sources : règlement UE 2023/956, programmes nationaux de tarification carbone, suivis d'adoption ISSB/CSRD. Carte du monde : géométrie du domaine public.",
      }
    : {
        eyebrow: 'Interactive Explorer',
        title: 'Country Carbon Regulation Explorer',
        subtitle: 'Click a country to see its CBAM status, carbon tax, ESG requirements and reporting rules.',
        legendRed: 'Carbon pricing & border measures in force',
        legendOrange: 'Regulation phasing in',
        legendGreen: 'National framework developing',
        cbam: 'CBAM / Border mechanism',
        tax: 'Carbon tax / pricing',
        esg: 'ESG requirements',
        reporting: 'Reporting rules',
        note: 'Indicative summary — July 2026. Sources: EU Reg. 2023/956, national carbon-pricing programs, ISSB/CSRD adoption trackers. World map: public-domain geometry.',
      }

  const rows = country
    ? [
        { icon: IconShield, label: L.cbam, text: country.cbam, color: 'var(--color-violet)' },
        { icon: IconCoins, label: L.tax, text: country.tax, color: 'var(--color-info)' },
        { icon: IconLeaf, label: L.esg, text: country.esg, color: 'var(--color-lime)' },
        { icon: IconClipboard, label: L.reporting, text: country.reporting, color: 'var(--color-primary)' },
      ]
    : []

  return (
    <section className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 block text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-body)' }}>
            {L.eyebrow}
          </span>
          <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {L.title}
          </h2>
          <p className="text-[14.5px] text-[var(--color-text-secondary)] max-w-[560px] mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            {L.subtitle}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-6">
          {([['red', L.legendRed], ['orange', L.legendOrange], ['green', L.legendGreen]] as [Level, string][]).map(([lvl, label]) => (
            <span key={lvl} className="inline-flex items-center gap-2 text-[12px] font-medium text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: LEVEL_COLOR[lvl] }} />
              {label}
            </span>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.55fr_1fr] gap-6 items-start">
          {/* Map */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-3 lg:p-5 shadow-[var(--shadow-card)] overflow-hidden" dir="ltr">
            <svg viewBox={WORLD_VIEWBOX} className="w-full h-auto block" role="group" aria-label={L.title}>
              {Object.entries(COUNTRY_PATHS).map(([iso, d]) => {
                const r = REG[iso]
                const clickable = !!r
                const isSel = iso === selected
                const isHov = iso === hovered
                let fill = 'var(--color-border)'
                let fillOpacity = 1
                if (r) {
                  fill = LEVEL_COLOR[r.level]
                  fillOpacity = isSel ? 1 : isHov ? 0.9 : 0.72
                }
                return (
                  <path
                    key={iso}
                    data-iso={iso}
                    d={d}
                    fill={fill}
                    fillOpacity={fillOpacity}
                    stroke={isSel ? 'var(--color-text-primary)' : 'var(--color-surface)'}
                    strokeWidth={isSel ? 1 : 0.3}
                    style={{ cursor: clickable ? 'pointer' : 'default', transition: 'fill-opacity 0.15s' }}
                    onClick={clickable ? () => setSelected(iso) : undefined}
                    onMouseEnter={clickable ? () => setHovered(iso) : undefined}
                    onMouseLeave={clickable ? () => setHovered(null) : undefined}
                  >
                    {r && <title>{pick(r.name, lang)}</title>}
                  </path>
                )
              })}
              {/* Re-draw the selected country on top so its outline is never hidden */}
              {REG[selected] && COUNTRY_PATHS[selected] && (
                <path
                  d={COUNTRY_PATHS[selected]}
                  fill={LEVEL_COLOR[REG[selected].level]}
                  fillOpacity={1}
                  stroke="var(--color-text-primary)"
                  strokeWidth={1}
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </svg>
          </div>

          {/* Detail panel */}
          {country && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-[var(--shadow-card)] lg:sticky lg:top-24"
              >
                <div className="h-1.5" style={{ background: LEVEL_COLOR[country.level] }} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                      style={{ background: LEVEL_COLOR[country.level], fontFamily: 'var(--font-body)' }}
                    >
                      {selected.slice(0, 2).toUpperCase()}
                    </span>
                    <h3 className="text-[21px] font-bold text-[var(--color-text-primary)] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {pick(country.name, lang)}
                    </h3>
                  </div>
                  <span
                    className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full mb-5"
                    style={{
                      color: LEVEL_COLOR[country.level],
                      background: `color-mix(in srgb, ${LEVEL_COLOR[country.level]} 12%, transparent)`,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {levelLabel(country.level, lang)}
                  </span>

                  <div className="space-y-4">
                    {rows.map(row => (
                      <div key={row.label} className="flex items-start gap-3">
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: `color-mix(in srgb, ${row.color} 12%, transparent)`, color: row.color }}
                        >
                          <row.icon size={15} strokeWidth={1.8} />
                        </span>
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold uppercase tracking-[0.1em] mb-0.5" style={{ color: row.color, fontFamily: 'var(--font-body)' }}>
                            {row.label}
                          </div>
                          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                            {pick(row.text, lang)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] text-[var(--color-text-secondary)] max-w-[680px] mx-auto leading-snug" style={{ fontFamily: 'var(--font-body)' }}>
          {L.note}
        </p>
      </div>
    </section>
  )
}
