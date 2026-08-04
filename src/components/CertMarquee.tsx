import { IconHex, IconBadge, IconChart, IconRecycle, IconLeaf } from './icons'
import { useLang } from '../i18n/LanguageContext'

const CERTS = [
  { label: 'ISO 14064', icon: IconHex },
  { label: 'CBAM Compliant', labelFr: 'Conforme MACF', labelAr: 'متوافق مع CBAM', icon: IconBadge, iconProps: { label: 'EU' } },
  { label: 'IFRS S2', icon: IconChart },
  { label: 'GHG Protocol', icon: IconRecycle },
  { label: 'Tunisia NDC 2030', labelFr: 'CDN Tunisie 2030', labelAr: 'المساهمة الوطنية لتونس 2030', icon: IconLeaf, color: 'var(--color-primary)' },
  { label: 'INPDP Aligned', labelFr: 'Conforme INPDP', labelAr: 'متوافق مع INPDP', icon: IconBadge, iconProps: { label: 'TN' }, color: 'var(--color-primary)' },
]

const LOOP = [...CERTS, ...CERTS]

export default function CertMarquee() {
  const { t, lang } = useLang()
  return (
    <section className="bg-[var(--color-bg-secondary)] border-y border-[var(--color-border)] py-8 overflow-hidden">
      <p
        className="text-center text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-6"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {t('certMarquee.text', 'Built to the standards Tunisian exporters and EU auditors already trust')}
      </p>
      <div className="relative">
        <div className="flex marquee-track w-max">
          {LOOP.map((c, i) => {
            const label = lang === 'ar' && 'labelAr' in c ? c.labelAr! : lang === 'fr' && 'labelFr' in c ? c.labelFr! : c.label
            return <CertBadge key={i} {...c} label={label} />
          })}
        </div>
      </div>
    </section>
  )
}

function CertBadge({ label, icon: Icon, iconProps, color = 'var(--color-primary)' }: { label: string; icon: any; iconProps?: Record<string, unknown>; color?: string }) {
  return (
    <div
      className="flex items-center gap-2.5 mx-8 shrink-0 bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-2.5 rounded-full shadow-sm"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <span className="flex items-center" style={{ color }}>
        {iconProps ? <Icon {...iconProps} size={17} color={color} /> : <Icon size={17} strokeWidth={1.7} />}
      </span>
      <span className="text-[12px] font-semibold text-[var(--color-text-primary)] whitespace-nowrap">{label}</span>
    </div>
  )
}
