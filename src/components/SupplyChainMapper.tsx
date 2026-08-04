import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import {
  IconBrick, IconLink, IconPlane, IconGear, IconPackage, IconFactory,
  IconGlobe, IconBolt, IconRecycle, IconTrendingUp,
} from './icons'

type NodeId =
  | 'rawMaterials' | 'purchasedGoods' | 'inboundTransport' | 'capitalGoods' | 'packaging'
  | 'yourOps'
  | 'outboundDistribution' | 'productUse' | 'endOfLife'

interface Bi { en: string; fr: string; ar: string }

interface NodeDef {
  id: NodeId
  side: 'up' | 'you' | 'down'
  left: number   // card left, % of container width
  top: number    // card top, % of container height
  ax: number     // connection anchor x, in 0–100 space (right anchor for up, left for down)
  ay: number     // connection anchor y
  icon: typeof IconBrick
  scope: Bi      // GHG Protocol category tag
  name: Bi
  lever: Bi      // reduction lever shown on select
}

const CARD_W = 21
const CARD_H = 13

const NODES: NodeDef[] = [
  // Upstream (left)
  {
    id: 'rawMaterials', side: 'up', left: 1, top: 2, ax: 22, ay: 8.5, icon: IconBrick,
    scope: { en: 'Scope 3 · Cat 1', fr: 'Scope 3 · Cat. 1', ar: 'النطاق 3 · الفئة 1' },
    name: { en: 'Raw Materials', fr: 'Matières premières', ar: 'المواد الخام' },
    lever: { en: 'Switch to recycled / low-carbon inputs and require verified supplier PCFs.', fr: 'Passer à des intrants recyclés / bas carbone et exiger des empreintes produit fournisseurs vérifiées.', ar: 'التحوّل إلى مدخلات معاد تدويرها / منخفضة الكربون وطلب بصمات منتج موثّقة من المورّدين.' },
  },
  {
    id: 'purchasedGoods', side: 'up', left: 1, top: 21.5, ax: 22, ay: 28, icon: IconLink,
    scope: { en: 'Scope 3 · Cat 1', fr: 'Scope 3 · Cat. 1', ar: 'النطاق 3 · الفئة 1' },
    name: { en: 'Purchased Goods', fr: 'Biens achetés', ar: 'السلع المشتراة' },
    lever: { en: 'Structured supplier data collection and hotspot-based engagement with the top 20 suppliers.', fr: 'Collecte structurée de données fournisseurs et engagement basé sur les points chauds avec les 20 principaux fournisseurs.', ar: 'جمع بيانات منظّم من المورّدين وإشراك قائم على النقاط الساخنة لأكبر 20 موردًا.' },
  },
  {
    id: 'inboundTransport', side: 'up', left: 1, top: 41, ax: 22, ay: 47.5, icon: IconPlane,
    scope: { en: 'Scope 3 · Cat 4', fr: 'Scope 3 · Cat. 4', ar: 'النطاق 3 · الفئة 4' },
    name: { en: 'Inbound Logistics', fr: 'Logistique amont', ar: 'الخدمات اللوجستية الواردة' },
    lever: { en: 'Modal shift (sea/rail over air/road) and inbound load optimization.', fr: 'Report modal (mer/rail plutôt qu\'air/route) et optimisation des charges entrantes.', ar: 'التحوّل النَّمَطي (بحر/سكة بدل جو/طريق) وتحسين أحمال الوارد.' },
  },
  {
    id: 'capitalGoods', side: 'up', left: 1, top: 60.5, ax: 22, ay: 67, icon: IconGear,
    scope: { en: 'Scope 3 · Cat 2', fr: 'Scope 3 · Cat. 2', ar: 'النطاق 3 · الفئة 2' },
    name: { en: 'Capital Goods', fr: 'Biens d\'équipement', ar: 'السلع الرأسمالية' },
    lever: { en: 'Low-carbon procurement criteria for plant and equipment purchases.', fr: 'Critères d\'achat bas carbone pour les achats d\'installations et d\'équipements.', ar: 'معايير شراء منخفضة الكربون لمشتريات المصنع والمعدات.' },
  },
  {
    id: 'packaging', side: 'up', left: 1, top: 80, ax: 22, ay: 86.5, icon: IconPackage,
    scope: { en: 'Scope 3 · Cat 1', fr: 'Scope 3 · Cat. 1', ar: 'النطاق 3 · الفئة 1' },
    name: { en: 'Packaging', fr: 'Emballage', ar: 'التغليف' },
    lever: { en: 'Light-weighting and recycled-content packaging with take-back schemes.', fr: 'Allègement et emballage à contenu recyclé avec systèmes de reprise.', ar: 'تخفيف الوزن وتغليف بمحتوى معاد تدويره مع أنظمة استرجاع.' },
  },
  // Your operations (center pivot)
  {
    id: 'yourOps', side: 'you', left: 39.5, top: 43.5, ax: 50, ay: 50, icon: IconFactory,
    scope: { en: 'Scope 1 + 2', fr: 'Scope 1 + 2', ar: 'النطاق 1 + 2' },
    name: { en: 'Your Operations', fr: 'Vos opérations', ar: 'عملياتك' },
    lever: { en: 'Direct emissions and purchased energy — measured continuously by Bilan Carbone.', fr: 'Émissions directes et énergie achetée — mesurées en continu par le Bilan Carbone.', ar: 'الانبعاثات المباشرة والطاقة المشتراة — مقيسة باستمرار عبر البصمة الكربونية.' },
  },
  // Downstream (right)
  {
    id: 'outboundDistribution', side: 'down', left: 78, top: 14, ax: 78, ay: 20.5, icon: IconGlobe,
    scope: { en: 'Scope 3 · Cat 9', fr: 'Scope 3 · Cat. 9', ar: 'النطاق 3 · الفئة 9' },
    name: { en: 'Distribution', fr: 'Distribution', ar: 'التوزيع' },
    lever: { en: 'Fleet electrification, route optimization and carrier emission requirements.', fr: 'Électrification de la flotte, optimisation des itinéraires et exigences d\'émissions des transporteurs.', ar: 'كهربة الأسطول وتحسين المسارات ومتطلبات انبعاثات الناقلين.' },
  },
  {
    id: 'productUse', side: 'down', left: 78, top: 43.5, ax: 78, ay: 50, icon: IconBolt,
    scope: { en: 'Scope 3 · Cat 11', fr: 'Scope 3 · Cat. 11', ar: 'النطاق 3 · الفئة 11' },
    name: { en: 'Use of Products', fr: 'Utilisation des produits', ar: 'استخدام المنتجات' },
    lever: { en: 'Improve in-use efficiency and enable fuel/feedstock switching for customers.', fr: 'Améliorer l\'efficacité en usage et permettre le changement de combustible/matière première pour les clients.', ar: 'تحسين الكفاءة أثناء الاستخدام وتمكين تحويل الوقود/اللقيم لدى العملاء.' },
  },
  {
    id: 'endOfLife', side: 'down', left: 78, top: 73, ax: 78, ay: 79.5, icon: IconRecycle,
    scope: { en: 'Scope 3 · Cat 12', fr: 'Scope 3 · Cat. 12', ar: 'النطاق 3 · الفئة 12' },
    name: { en: 'End-of-Life', fr: 'Fin de vie', ar: 'نهاية العمر' },
    lever: { en: 'Design for recyclability and route materials into circular loops.', fr: 'Concevoir pour la recyclabilité et orienter les matériaux vers des boucles circulaires.', ar: 'التصميم لقابلية إعادة التدوير وتوجيه المواد إلى حلقات دائرية.' },
  },
]

const SC3_NODES = NODES.filter(n => n.side !== 'you')

interface Industry {
  id: string
  name: Bi
  total: number // annual Scope 3 tCO2e (indicative)
  shares: Record<Exclude<NodeId, 'yourOps'>, number> // % of Scope 3, sums ~100
}

const INDUSTRIES: Industry[] = [
  {
    id: 'steel', name: { en: 'Steel', fr: 'Acier', ar: 'الصلب' }, total: 4_200_000,
    shares: { rawMaterials: 38, purchasedGoods: 10, inboundTransport: 7, capitalGoods: 5, packaging: 2, outboundDistribution: 8, productUse: 18, endOfLife: 12 },
  },
  {
    id: 'cement', name: { en: 'Cement', fr: 'Ciment', ar: 'الإسمنت' }, total: 3_100_000,
    shares: { rawMaterials: 30, purchasedGoods: 14, inboundTransport: 8, capitalGoods: 4, packaging: 3, outboundDistribution: 16, productUse: 20, endOfLife: 5 },
  },
  {
    id: 'lng', name: { en: 'LNG / Petrochemicals', fr: 'GNL / Pétrochimie', ar: 'الغاز المسال / البتروكيماويات' }, total: 8_500_000,
    shares: { rawMaterials: 22, purchasedGoods: 8, inboundTransport: 6, capitalGoods: 5, packaging: 1, outboundDistribution: 12, productUse: 43, endOfLife: 3 },
  },
  {
    id: 'manufacturing', name: { en: 'Manufacturing / Auto', fr: 'Industrie / Automobile', ar: 'التصنيع / السيارات' }, total: 620_000,
    shares: { rawMaterials: 24, purchasedGoods: 20, inboundTransport: 8, capitalGoods: 6, packaging: 4, outboundDistribution: 10, productUse: 25, endOfLife: 3 },
  },
  {
    id: 'food', name: { en: 'Food & Beverage', fr: 'Agroalimentaire', ar: 'الأغذية والمشروبات' }, total: 480_000,
    shares: { rawMaterials: 40, purchasedGoods: 15, inboundTransport: 8, capitalGoods: 3, packaging: 10, outboundDistribution: 12, productUse: 5, endOfLife: 7 },
  },
  {
    id: 'retail', name: { en: 'Retail', fr: 'Commerce de détail', ar: 'التجزئة' }, total: 350_000,
    shares: { rawMaterials: 18, purchasedGoods: 45, inboundTransport: 8, capitalGoods: 4, packaging: 6, outboundDistribution: 12, productUse: 4, endOfLife: 3 },
  },
]

const HOT = '#DC2626'
const HIGH = '#E8850C'
const MOD = 'var(--color-primary)'

function tierColor(share: number) {
  if (share >= 25) return HOT
  if (share >= 12) return HIGH
  return MOD
}

function fmt(t: number, lang: 'en' | 'fr' | 'ar') {
  if (t >= 1_000_000) return `${(t / 1_000_000).toFixed(1)}M`
  if (t >= 1_000) return `${Math.round(t / 1_000)}${lang === 'ar' ? ' ألف' : 'k'}`
  return `${Math.round(t)}`
}

export default function SupplyChainMapper() {
  const { lang } = useLang()
  const [ind, setInd] = useState(0)
  const [selected, setSelected] = useState<NodeId>('rawMaterials')
  const [hovered, setHovered] = useState<NodeId | null>(null)

  const industry = INDUSTRIES[ind]
  const shareOf = (id: NodeId) => (id === 'yourOps' ? 0 : industry.shares[id])
  const emissionsOf = (id: NodeId) => (shareOf(id) / 100) * industry.total

  const hotspots = [...SC3_NODES]
    .sort((a, b) => shareOf(b.id) - shareOf(a.id))
    .slice(0, 3)

  const sel = NODES.find(n => n.id === selected)!
  const tt = (b: Bi) => lang === 'ar' ? b.ar : lang === 'fr' ? b.fr : b.en

  const L = lang === 'ar'
    ? {
        eyebrow: 'جرّبها بنفسك',
        title: 'مُخطِّط سلسلة التوريد',
        subtitle: 'اختر قطاعك لرسم سلسلة التوريد وإبراز المورّدين والمراحل الأكثر تأثيرًا على الانبعاثات.',
        upstream: 'المنبع', downstream: 'المصب',
        totalLabel: 'إجمالي النطاق 3 (سنويًا)',
        hotspots: 'أكبر النقاط الساخنة للانبعاثات',
        share: 'الحصة', lever: 'فرصة الخفض',
        ctaText: 'تجمع فوتوكارب بيانات مورّديك، وتحسب فئات النطاق 3 الـ15، وترتّب نقاطك الساخنة الحقيقية — لا التقديرات.',
        cta: 'ارسم سلسلة التوريد الخاصة بك',
        note: 'أوزان استرشادية بحسب القطاع لأغراض التوضيح؛ ترسم فوتوكارب خريطتك من بيانات مورّديك الفعلية.',
      }
    : lang === 'fr'
    ? {
        eyebrow: 'Essayez par vous-même',
        title: "Cartographe de la chaîne d'approvisionnement",
        subtitle: "Choisissez votre secteur pour dessiner la chaîne d'approvisionnement et révéler les fournisseurs et étapes les plus impactants sur les émissions.",
        upstream: 'Amont', downstream: 'Aval',
        totalLabel: 'Total Scope 3 (annuel)',
        hotspots: "Plus grands points chauds d'émissions",
        share: 'Part', lever: 'Levier de réduction',
        ctaText: "Photocarb collecte les données de vos fournisseurs, calcule les 15 catégories du Scope 3 et classe vos points chauds réels — pas des estimations.",
        cta: "Cartographiez votre propre chaîne d'approvisionnement",
        note: "Pondérations moyennes sectorielles indicatives à titre d'illustration ; Photocarb cartographie votre chaîne à partir des données réelles de vos fournisseurs.",
      }
    : {
        eyebrow: 'Try It Yourself',
        title: 'Supply Chain Mapper',
        subtitle: 'Pick your sector to draw the supply chain and reveal the suppliers and stages most impactful on emissions.',
        upstream: 'Upstream', downstream: 'Downstream',
        totalLabel: 'Total Scope 3 (annual)',
        hotspots: 'Biggest emission hotspots',
        share: 'Share', lever: 'Reduction lever',
        ctaText: "Photocarb collects your supplier data, calculates all 15 Scope 3 categories and ranks your real hotspots — not estimates.",
        cta: 'Map your own supply chain',
        note: 'Indicative sector-average weights for illustration; Photocarb maps your chain from your actual supplier data.',
      }

  return (
    <section className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-8">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 block text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-body)' }}>
            {L.eyebrow}
          </span>
          <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {L.title}
          </h2>
          <p className="text-[14.5px] text-[var(--color-text-secondary)] max-w-[580px] mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            {L.subtitle}
          </p>
        </div>

        {/* Industry selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {INDUSTRIES.map((it, i) => (
            <button
              key={it.id}
              type="button"
              onClick={() => setInd(i)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                i === ind
                  ? 'bg-[var(--color-primary-deep)] text-white shadow-md'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-bg)]'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {tt(it.name)}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
          {/* Map */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-4 shadow-[var(--shadow-card)] overflow-x-auto">
            <div className="relative min-w-[620px]" style={{ aspectRatio: '16 / 10' }} dir="ltr">
              {/* column labels */}
              <div className="absolute top-0 left-[1%] text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{L.upstream}</div>
              <div className="absolute top-0 right-[1%] text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{L.downstream}</div>

              {/* Flows */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                {SC3_NODES.map(n => {
                  const share = shareOf(n.id)
                  const active = selected === n.id || hovered === n.id
                  const color = tierColor(share)
                  const w = 0.6 + (share / 100) * 7
                  const [x1, y1, x2, y2] = n.side === 'up'
                    ? [n.ax, n.ay, 39.5, 50]
                    : [61.5, 50, n.ax, n.ay]
                  const dx = (x2 - x1) * 0.5
                  return (
                    <path
                      key={n.id}
                      d={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                      fill="none"
                      stroke={color}
                      strokeWidth={w}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      opacity={active ? 0.95 : 0.4}
                      style={{ transition: 'opacity 0.2s' }}
                    />
                  )
                })}
              </svg>

              {/* Nodes */}
              {NODES.map(n => {
                const share = shareOf(n.id)
                const isYou = n.side === 'you'
                const color = isYou ? 'var(--color-text-primary)' : tierColor(share)
                const isSel = selected === n.id
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setSelected(n.id)}
                    onMouseEnter={() => setHovered(n.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="absolute text-left rounded-xl border bg-[var(--color-surface)] px-2.5 py-2 transition-all"
                    style={{
                      left: `${n.left}%`, top: `${n.top}%`, width: `${isYou ? CARD_W + 1 : CARD_W}%`, minHeight: `${CARD_H}%`,
                      borderColor: isSel ? color : 'var(--color-border)',
                      borderWidth: isSel ? 2 : 1,
                      boxShadow: isSel ? `0 4px 14px color-mix(in srgb, ${color} 30%, transparent)` : 'var(--shadow-card)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: `color-mix(in srgb, ${color} 14%, transparent)`, color }}>
                        <n.icon size={13} strokeWidth={1.8} />
                      </span>
                      <span className="text-[11.5px] font-bold text-[var(--color-text-primary)] leading-tight truncate">
                        {tt(n.name)}
                      </span>
                    </div>
                    {!isYou && (
                      <div className="mt-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-[var(--color-text-secondary)]">{tt(n.scope)}</span>
                          <span className="text-[11px] font-bold" style={{ color }}>{share}%</span>
                        </div>
                        <div className="mt-1 h-1 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(share * 2.2, 100)}%`, background: color }} />
                        </div>
                      </div>
                    )}
                    {isYou && (
                      <div className="mt-1 text-[9px] text-[var(--color-text-secondary)]">{tt(n.scope)}</div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            {/* Total */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)] mb-1" style={{ fontFamily: 'var(--font-body)' }}>{L.totalLabel}</div>
              <div className="text-[40px] font-bold leading-none text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                {fmt(industry.total, lang)} <span className="text-[18px] text-[var(--color-text-secondary)]">tCO₂e</span>
              </div>
            </div>

            {/* Hotspots */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: 'var(--font-body)' }}>{L.hotspots}</div>
              <div className="space-y-2">
                {hotspots.map((n, i) => {
                  const share = shareOf(n.id)
                  const color = tierColor(share)
                  return (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setSelected(n.id)}
                      className="w-full flex items-center gap-3 text-left rounded-xl p-2 hover:bg-[var(--color-bg-secondary)] transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ background: color }}>{i + 1}</span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[13px] font-semibold text-[var(--color-text-primary)] truncate">{tt(n.name)}</span>
                        <span className="block text-[11px] text-[var(--color-text-secondary)]">{fmt(emissionsOf(n.id), lang)} tCO₂e</span>
                      </span>
                      <span className="text-[15px] font-bold shrink-0" style={{ color }}>{share}%</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Selected node detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: sel.side === 'you' ? 'color-mix(in srgb, var(--color-text-primary) 10%, transparent)' : `color-mix(in srgb, ${tierColor(shareOf(sel.id))} 14%, transparent)`,
                      color: sel.side === 'you' ? 'var(--color-text-primary)' : tierColor(shareOf(sel.id)),
                    }}
                  >
                    <sel.icon size={16} strokeWidth={1.8} />
                  </span>
                  <div>
                    <div className="text-[15px] font-bold text-[var(--color-text-primary)] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{tt(sel.name)}</div>
                    <div className="text-[10.5px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{tt(sel.scope)}</div>
                  </div>
                  {sel.side !== 'you' && (
                    <span className="ml-auto text-[18px] font-bold" style={{ color: tierColor(shareOf(sel.id)), fontFamily: 'var(--font-display)' }}>
                      {shareOf(sel.id)}%
                    </span>
                  )}
                </div>
                {sel.side !== 'you' && (
                  <div className="text-[12px] text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                    {fmt(emissionsOf(sel.id), lang)} tCO₂e · {L.share}: {shareOf(sel.id)}%
                  </div>
                )}
                <div className="flex items-start gap-2 rounded-xl p-3" style={{ background: 'var(--color-tint-teal)' }}>
                  <IconTrendingUp size={15} strokeWidth={1.8} className="shrink-0 mt-0.5 text-[var(--color-primary)]" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-primary)] mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>{L.lever}</div>
                    <p className="text-[12.5px] text-[var(--color-text-primary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{tt(sel.lever)}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between" style={{ background: 'linear-gradient(160deg, var(--color-tint-teal), var(--color-surface) 70%)' }}>
          <p className="text-[13.5px] text-[var(--color-text-primary)] leading-relaxed max-w-[640px]" style={{ fontFamily: 'var(--font-body)' }}>{L.ctaText}</p>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-[var(--color-primary)] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--color-primary-deep)] transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {L.cta}
            <svg className="rtl-flip" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h8M7 3l4 4-4 4"/></svg>
          </Link>
        </div>

        <p className="mt-4 text-center text-[11px] text-[var(--color-text-secondary)] max-w-[640px] mx-auto leading-snug" style={{ fontFamily: 'var(--font-body)' }}>{L.note}</p>
      </div>
    </section>
  )
}
