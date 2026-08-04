import { useInView } from '../hooks/useInView'
import { useLang } from '../i18n/LanguageContext'

const NODE_DEFS = [
  {
    groupKey: 'integrationArch.group.sources',
    color: 'var(--color-text-secondary)',
    bg: 'var(--color-bg-secondary)',
    itemKeys: ['integrationArch.item.utilityBills', 'integrationArch.item.productionRecords', 'integrationArch.item.erpSap', 'integrationArch.item.satelliteFeeds', 'integrationArch.item.manualEntry'],
  },
  {
    groupKey: 'integrationArch.group.core',
    color: 'var(--color-primary)',
    bg: 'var(--color-tint-teal)',
    itemKeys: ['integrationArch.item.digitalTwin', 'integrationArch.item.aiAnomaly', 'integrationArch.item.scopeLedger', 'integrationArch.item.baselineCalc'],
  },
  {
    groupKey: 'integrationArch.group.output',
    color: 'var(--color-lime)',
    bg: 'var(--color-tint-lime)',
    itemKeys: ['integrationArch.item.reductionSim', 'integrationArch.item.complianceSuite', 'integrationArch.item.apiGateway', 'integrationArch.item.dashboards'],
  },
  {
    groupKey: 'integrationArch.group.stakeholders',
    color: 'var(--color-violet)',
    bg: 'var(--color-tint-violet)',
    itemKeys: ['integrationArch.item.regulators', 'integrationArch.item.auditors', 'integrationArch.item.boardCfo', 'integrationArch.item.euBuyers'],
  },
]

export default function IntegrationArch() {
  const { ref, visible } = useInView(0.2)
  const { t } = useLang()
  const nodes = NODE_DEFS.map(n => ({ ...n, group: t(n.groupKey), items: n.itemKeys.map(k => t(k)) }))

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-14 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-3 block" style={{ fontFamily: 'var(--font-body)' }}>
            {t('integrationArch.eyebrow')}
          </span>
          <h2 className="text-[38px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('integrationArch.titleLine1')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('integrationArch.titleAccent')}</em>
          </h2>
        </div>

        {/* Architecture flow */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {nodes.map((node, i) => (
            <div key={node.group} className={`flex items-stretch flex-1 fade-up ${visible ? 'visible' : ''} stagger-${i + 1}`}>
              {/* Node card */}
              <div
                className="flex-1 rounded-2xl p-6 border"
                style={{ background: node.bg, borderColor: `color-mix(in srgb, ${node.color} 30%, transparent)` }}
              >
                <div
                  className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4"
                  style={{ color: node.color, fontFamily: 'var(--font-body)' }}
                >
                  {node.group}
                </div>
                <ul className="space-y-2.5">
                  {node.items.map(item => (
                    <li key={item} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: node.color }} />
                      <span className="text-[13px] text-[var(--color-text-primary)] font-medium" style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow connector */}
              {i < nodes.length - 1 && (
                <div className="hidden lg:flex items-center px-2 shrink-0">
                  <svg className="rtl-flip" width="32" height="24" fill="none">
                    <path d="M2 12h24M20 6l8 6-8 6" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray="28" strokeDashoffset={visible ? '0' : '28'}
                      style={{ transition: `stroke-dashoffset 0.8s ease ${i * 0.2}s` }}
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
