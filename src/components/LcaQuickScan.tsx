import { useMemo, useState } from 'react'
import { Link } from './LocalizedLink'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import { IconRecycle, IconFactory, IconPackage, IconPlane, IconTarget, IconTrendingUp, IconGlobe, IconLeaf } from './icons'

/**
 * LCA Quick Scan — simplified cradle-to-gate screening.
 *
 * Emission factors (kg CO₂e per kg unless noted) are grounded in published
 * cradle-to-gate LCA data: ICE Database v3 (Circular Ecology), ecoinvent,
 * and DEFRA 2023 transport factors (kg CO₂e per tonne-km). Values are
 * representative averages for rapid screening only.
 */

interface Bi { en: string; fr: string; ar: string }
interface Opt { id: string; label: Bi; f: number; recycledTo?: string }

// ── Product types → typical unit weight (kg) + unit label ────────────────
const PRODUCTS: (Opt & { weight: number })[] = [
  { id: 'packaging', weight: 0.08, f: 0, label: { en: 'Packaging / container', fr: 'Emballage / contenant', ar: 'تغليف / عبوة' } },
  { id: 'electronics', weight: 0.35, f: 0, label: { en: 'Consumer electronics', fr: 'Électronique grand public', ar: 'إلكترونيات استهلاكية' } },
  { id: 'apparel', weight: 0.5, f: 0, label: { en: 'Apparel / textile item', fr: 'Vêtement / article textile', ar: 'ملابس / منسوجات' } },
  { id: 'appliance', weight: 12, f: 0, label: { en: 'Household appliance', fr: 'Appareil électroménager', ar: 'جهاز منزلي' } },
  { id: 'furniture', weight: 18, f: 0, label: { en: 'Furniture item', fr: "Meuble", ar: 'قطعة أثاث' } },
  { id: 'auto', weight: 6, f: 0, label: { en: 'Automotive component', fr: 'Composant automobile', ar: 'مكوّن سيارات' } },
  { id: 'construction', weight: 25, f: 0, label: { en: 'Construction element', fr: 'Élément de construction', ar: 'عنصر بناء' } },
  { id: 'food', weight: 0.45, f: 0, label: { en: 'Packaged food & beverage', fr: 'Aliments et boissons emballés', ar: 'أغذية ومشروبات مغلّفة' } },
]

// ── Raw materials → cradle-to-gate kg CO₂e/kg (ICE v3 / ecoinvent) ────────
const MATERIALS: Opt[] = [
  { id: 'alu_v', f: 16.1, recycledTo: 'alu_r', label: { en: 'Aluminium — virgin', fr: 'Aluminium — vierge', ar: 'ألمنيوم — بكر' } },
  { id: 'alu_r', f: 1.6, label: { en: 'Aluminium — recycled', fr: 'Aluminium — recyclé', ar: 'ألمنيوم — معاد تدويره' } },
  { id: 'steel_v', f: 2.5, recycledTo: 'steel_r', label: { en: 'Steel — virgin (BF-BOF)', fr: 'Acier — vierge (BF-BOF)', ar: 'صلب — بكر (BF-BOF)' } },
  { id: 'steel_r', f: 0.65, label: { en: 'Steel — recycled (EAF)', fr: 'Acier — recyclé (EAF)', ar: 'صلب — معاد تدويره (EAF)' } },
  { id: 'stainless', f: 6.15, label: { en: 'Stainless steel', fr: 'Acier inoxydable', ar: 'صلب مقاوم للصدأ' } },
  { id: 'plastic_v', f: 3.1, recycledTo: 'plastic_r', label: { en: 'Plastic — virgin', fr: 'Plastique — vierge', ar: 'بلاستيك — بكر' } },
  { id: 'plastic_r', f: 1.1, label: { en: 'Plastic — recycled', fr: 'Plastique — recyclé', ar: 'بلاستيك — معاد تدويره' } },
  { id: 'glass', f: 0.9, label: { en: 'Glass', fr: 'Verre', ar: 'زجاج' } },
  { id: 'paper', f: 0.95, label: { en: 'Paper / cardboard', fr: 'Papier / carton', ar: 'ورق / كرتون' } },
  { id: 'cotton', f: 5.9, label: { en: 'Cotton / natural fibre', fr: 'Coton / fibre naturelle', ar: 'قطن / ألياف طبيعية' } },
  { id: 'polyester', f: 3.4, label: { en: 'Synthetic textile (polyester)', fr: 'Textile synthétique (polyester)', ar: 'نسيج صناعي (بوليستر)' } },
  { id: 'wood', f: 0.35, label: { en: 'Wood / timber', fr: 'Bois', ar: 'خشب' } },
  { id: 'concrete', f: 0.15, label: { en: 'Concrete / mineral', fr: 'Béton / minéral', ar: 'خرسانة / معدني' } },
  { id: 'electronics', f: 25, label: { en: 'Electronics (mixed + PCB)', fr: 'Électronique (mixte + circuits imprimés)', ar: 'إلكترونيات (مختلطة + لوحات)' } },
]

// ── Manufacturing process → added kg CO₂e/kg ─────────────────────────────
const PROCESSES: Opt[] = [
  { id: 'assembly', f: 0.3, label: { en: 'Manual / low-energy assembly', fr: 'Assemblage manuel / basse énergie', ar: 'تجميع يدوي / منخفض الطاقة' } },
  { id: 'moulding', f: 0.9, label: { en: 'Injection moulding', fr: 'Moulage par injection', ar: 'قولبة بالحقن' } },
  { id: 'stamping', f: 0.6, label: { en: 'Metal stamping / forming', fr: 'Emboutissage / formage métallique', ar: 'ختم / تشكيل معدني' } },
  { id: 'machining', f: 1.8, label: { en: 'Machining (CNC)', fr: 'Usinage (CNC)', ar: 'تصنيع آلي (CNC)' } },
  { id: 'casting', f: 1.3, label: { en: 'Casting / forging', fr: 'Moulage / forgeage', ar: 'صبّ / طرق' } },
  { id: 'firing', f: 2.6, label: { en: 'Kiln / high-heat firing', fr: 'Cuisson au four / haute température', ar: 'فرن / حرق عالي الحرارة' } },
  { id: 'weaving', f: 1.5, label: { en: 'Weaving / textile finishing', fr: 'Tissage / finition textile', ar: 'نسيج / تشطيب منسوجات' } },
  { id: 'assembly_e', f: 3.2, label: { en: 'Electronics assembly', fr: 'Assemblage électronique', ar: 'تجميع إلكترونيات' } },
]

// ── Packaging → kg CO₂e per kg of product ────────────────────────────────
const PACKAGING: Opt[] = [
  { id: 'minimal', f: 0.02, label: { en: 'None / minimal', fr: 'Aucun / minimal', ar: 'لا شيء / أدنى حد' } },
  { id: 'cardboard_r', f: 0.05, label: { en: 'Recycled cardboard', fr: 'Carton recyclé', ar: 'كرتون معاد تدويره' } },
  { id: 'cardboard_v', f: 0.12, label: { en: 'Cardboard + some plastic', fr: 'Carton + un peu de plastique', ar: 'كرتون + بعض البلاستيك' } },
  { id: 'plastic', f: 0.25, label: { en: 'Plastic-heavy / blister', fr: 'Fortement plastique / blister', ar: 'بلاستيك كثيف / بليستر' } },
  { id: 'composite', f: 0.3, label: { en: 'Mixed / composite (hard to recycle)', fr: 'Mixte / composite (difficile à recycler)', ar: 'مختلط / مركّب (صعب التدوير)' } },
]

// ── Transport method → kg CO₂e per tonne-km (DEFRA 2023) ─────────────────
const TRANSPORT: Opt[] = [
  { id: 'sea', f: 0.011, label: { en: 'Sea freight', fr: 'Fret maritime', ar: 'شحن بحري' } },
  { id: 'rail', f: 0.027, label: { en: 'Rail freight', fr: 'Fret ferroviaire', ar: 'شحن بالسكك' } },
  { id: 'road', f: 0.107, label: { en: 'Road (truck)', fr: 'Route (camion)', ar: 'طريق (شاحنة)' } },
  { id: 'air', f: 0.8, label: { en: 'Air freight', fr: 'Fret aérien', ar: 'شحن جوي' } },
]

const DISTANCES: (Opt & { km: number })[] = [
  { id: 'local', km: 200, f: 0, label: { en: 'Local (~200 km)', fr: 'Local (~200 km)', ar: 'محلي (~200 كم)' } },
  { id: 'regional', km: 1500, f: 0, label: { en: 'Regional (~1 500 km)', fr: 'Régional (~1 500 km)', ar: 'إقليمي (~1500 كم)' } },
  { id: 'intercont', km: 8000, f: 0, label: { en: 'Intercontinental (~8 000 km)', fr: 'Intercontinental (~8 000 km)', ar: 'عابر للقارات (~8000 كم)' } },
]

type RatingKey = 'A' | 'B' | 'C' | 'D' | 'E'
const RATING: Record<RatingKey, { color: string; label: Bi }> = {
  A: { color: '#16A34A', label: { en: 'Excellent', fr: 'Excellent', ar: 'ممتاز' } },
  B: { color: 'var(--color-lime)', label: { en: 'Good', fr: 'Bon', ar: 'جيد' } },
  C: { color: '#E8850C', label: { en: 'Moderate', fr: 'Modéré', ar: 'متوسط' } },
  D: { color: '#F97316', label: { en: 'High impact', fr: 'Impact élevé', ar: 'أثر مرتفع' } },
  E: { color: '#DC2626', label: { en: 'Very high impact', fr: 'Impact très élevé', ar: 'أثر مرتفع جدًا' } },
}

function ratingFor(intensity: number): RatingKey {
  if (intensity < 2) return 'A'
  if (intensity < 4) return 'B'
  if (intensity < 7) return 'C'
  if (intensity < 11) return 'D'
  return 'E'
}

const byId = <T extends { id: string }>(arr: T[], id: string) => arr.find(o => o.id === id)!

export default function LcaQuickScan() {
  const { lang } = useLang()
  const t = (b: Bi) => (lang === 'ar' ? b.ar : lang === 'fr' ? b.fr : b.en)

  const [product, setProduct] = useState('packaging')
  const [material, setMaterial] = useState('alu_v')
  const [process, setProcess] = useState('stamping')
  const [packaging, setPackaging] = useState('cardboard_v')
  const [transport, setTransport] = useState('road')
  const [distance, setDistance] = useState('regional')
  const [submitted, setSubmitted] = useState<
    { product: string; material: string; process: string; packaging: string; transport: string; distance: string } | null
  >(null)

  const result = useMemo(() => {
    if (!submitted) return null
    const p = byId(PRODUCTS, submitted.product)
    const m = byId(MATERIALS, submitted.material)
    const pr = byId(PROCESSES, submitted.process)
    const pk = byId(PACKAGING, submitted.packaging)
    const tr = byId(TRANSPORT, submitted.transport)
    const d = byId(DISTANCES, submitted.distance)
    const W = p.weight

    const stages = {
      materials: W * m.f,
      manufacturing: W * pr.f,
      packaging: W * pk.f,
      transport: (W / 1000) * d.km * tr.f,
    }
    const total = stages.materials + stages.manufacturing + stages.packaging + stages.transport
    const intensity = total / W
    const rating = ratingFor(intensity)
    const hotspot = (Object.keys(stages) as (keyof typeof stages)[]).reduce((a, b) => (stages[b] > stages[a] ? b : a))

    // potential materials saving via recycled alternative
    let recSaving = 0
    if (m.recycledTo) {
      const alt = byId(MATERIALS, m.recycledTo)
      recSaving = (W * (m.f - alt.f)) / total
    }

    return { W, m, pr, pk, tr, d, stages, total, intensity, rating, hotspot, recSaving }
  }, [submitted])

  // inputs changed since the last run?
  const dirty =
    !submitted ||
    submitted.product !== product || submitted.material !== material || submitted.process !== process ||
    submitted.packaging !== packaging || submitted.transport !== transport || submitted.distance !== distance

  const run = () => setSubmitted({ product, material, process, packaging, transport, distance })

  const animTotal = useAnimatedNumber(result?.total ?? 0, 700)
  const animIntensity = useAnimatedNumber(result?.intensity ?? 0, 700)

  const L = lang === 'ar'
    ? {
        eyebrow: 'جرّبها بنفسك', title: 'الفحص السريع لتقييم دورة الحياة (LCA)',
        subtitle: 'قيّم بسرعة الأثر البيئي لمنتجك عبر تقييم مبسّط لدورة الحياة — اختر نوع المنتج والمواد والعملية والتغليف والنقل لتحصل على تصنيف استدامة من A إلى E مع رؤى بيئية أساسية.',
        product: 'نوع المنتج', material: 'المادة الأساسية', process: 'عملية التصنيع', packaging: 'التغليف', transport: 'طريقة النقل', distance: 'مسافة النقل',
        rating: 'تصنيف الاستدامة', footprint: 'الأثر الكربوني المقدَّر', perUnit: 'لكل وحدة', intensityLabel: 'الكثافة الكربونية', perKg: 'كجم CO₂e/كجم',
        breakdown: 'التفصيل حسب المرحلة', hotspot: 'النقطة البيئية الساخنة', insights: 'رؤى بيئية أساسية',
        stages: { materials: 'المواد الخام', manufacturing: 'التصنيع', packaging: 'التغليف', transport: 'النقل' } as Record<string, string>,
        note: 'ملاحظة: هذا تقييم أولي مُصمَّم للفحص السريع ولا يحل محل تقييم كامل لدورة الحياة متوافق مع ISO 14040/14044.',
        ctaText: 'تُنتج فوتوكارب بصمة كربونية للمنتج معتمدة وفق ISO 14067 من بيانات عمليتك الفعلية.',
        cta: 'اطلب تقييم LCA معتمدًا',
        run: 'شغّل الفحص', rerun: 'أعد تشغيل الفحص',
        emptyTitle: 'جاهز عندما تكون مستعدًا',
        emptyText: 'اختر تفاصيل منتجك ثم اضغط «شغّل الفحص» لعرض التصنيف والأثر الكربوني والنقاط الساخنة.',
        changed: 'تغيّرت المدخلات — أعد تشغيل الفحص لتحديث النتائج.',
      }
    : lang === 'fr'
    ? {
        eyebrow: 'Essayez par vous-même', title: 'Analyse rapide ACV',
        subtitle: "Évaluez rapidement l'impact environnemental de votre produit avec une analyse de cycle de vie simplifiée. Sélectionnez le type de produit, les matières premières, le procédé de fabrication, l'emballage et le transport pour obtenir une note de durabilité de A à E avec les principaux enseignements environnementaux.",
        product: 'Type de produit', material: 'Matière première principale', process: 'Procédé de fabrication', packaging: 'Emballage', transport: 'Mode de transport', distance: 'Distance de transport',
        rating: 'Note de durabilité', footprint: 'Empreinte carbone estimée', perUnit: 'par unité', intensityLabel: 'Intensité carbone', perKg: 'kg CO₂e/kg',
        breakdown: 'Répartition par étape', hotspot: 'Point chaud environnemental', insights: 'Principaux enseignements environnementaux',
        stages: { materials: 'Matières premières', manufacturing: 'Fabrication', packaging: 'Emballage', transport: 'Transport' } as Record<string, string>,
        note: "Remarque : il s'agit d'une évaluation préliminaire conçue pour un dépistage rapide et ne remplace pas une analyse de cycle de vie complète conforme à ISO 14040/14044.",
        ctaText: "Photocarb produit des empreintes carbone produit certifiées ISO 14067 à partir des données réelles de votre procédé.",
        cta: 'Demander une ACV certifiée',
        run: "Lancer l'analyse", rerun: "Relancer l'analyse",
        emptyTitle: 'Prêt quand vous l\'êtes',
        emptyText: 'Sélectionnez les détails de votre produit, puis appuyez sur « Lancer l\'analyse » pour voir la note, l\'empreinte carbone et les points chauds.',
        changed: 'Les données ont changé — relancez l\'analyse pour mettre à jour les résultats.',
      }
    : {
        eyebrow: 'Try It Yourself', title: 'LCA Quick Scan',
        subtitle: "Quickly assess your product's environmental impact with a simplified life cycle assessment. Select product type, raw materials, manufacturing process, packaging and transport to receive an A–E sustainability rating with key environmental insights.",
        product: 'Product type', material: 'Primary raw material', process: 'Manufacturing process', packaging: 'Packaging', transport: 'Transport method', distance: 'Transport distance',
        rating: 'Sustainability rating', footprint: 'Estimated carbon footprint', perUnit: 'per unit', intensityLabel: 'Carbon intensity', perKg: 'kg CO₂e/kg',
        breakdown: 'Stage breakdown', hotspot: 'Environmental hotspot', insights: 'Key environmental insights',
        stages: { materials: 'Raw materials', manufacturing: 'Manufacturing', packaging: 'Packaging', transport: 'Transport' } as Record<string, string>,
        note: 'Note: this is a preliminary assessment designed for rapid screening and does not replace a full ISO 14040/14044-compliant life cycle assessment.',
        ctaText: 'Photocarb produces ISO 14067-certified product carbon footprints from your actual process data.',
        cta: 'Request a certified LCA',
        run: 'Run scan', rerun: 'Re-run scan',
        emptyTitle: 'Ready when you are',
        emptyText: 'Select your product details, then press “Run scan” to see the rating, carbon footprint and hotspots.',
        changed: 'Inputs changed — re-run the scan to update the results.',
      }

  const stageMeta: Record<string, { icon: typeof IconRecycle; color: string }> = {
    materials: { icon: IconRecycle, color: 'var(--color-primary)' },
    manufacturing: { icon: IconFactory, color: 'var(--color-violet)' },
    packaging: { icon: IconPackage, color: 'var(--color-lime)' },
    transport: { icon: IconPlane, color: 'var(--color-info)' },
  }

  const insights: Bi[] = useMemo(() => {
    if (!result) return []
    const out: Bi[] = []
    const hp = result.hotspot
    const pct = Math.round((result.stages[hp] / result.total) * 100)
    out.push({
      en: `${L.stages[hp]} are your biggest hotspot — ${pct}% of the total footprint.`,
      fr: `${L.stages[hp]} est votre plus grand point chaud — ${pct}% de l'empreinte totale.`,
      ar: `${L.stages[hp]} هي أكبر نقطة ساخنة لديك — ${pct}% من الأثر الإجمالي.`,
    })
    if (result.recSaving > 0.05) {
      const rs = Math.round(result.recSaving * 100)
      out.push({
        en: `Switching to a recycled version of ${t(result.m.label)} could cut roughly ${rs}% of the total footprint.`,
        fr: `Passer à une version recyclée de ${t(result.m.label)} pourrait réduire environ ${rs}% de l'empreinte totale.`,
        ar: `التحوّل إلى نسخة معاد تدويرها من ${t(result.m.label)} قد يخفض نحو ${rs}% من الأثر الإجمالي.`,
      })
    }
    if (result.tr.id === 'air') {
      const saved = Math.round((result.stages.transport * (1 - 0.011 / 0.8) / result.total) * 100)
      out.push({
        en: `Air freight dominates transport; shipping by sea would cut transport emissions by ~98% (≈ ${saved}% of the total).`,
        fr: `Le fret aérien domine le transport ; l'expédition par mer réduirait les émissions de transport d'environ 98% (≈ ${saved}% du total).`,
        ar: `يهيمن الشحن الجوي على النقل؛ الشحن البحري يخفض انبعاثات النقل بنحو 98% (≈ ${saved}% من الإجمالي).`,
      })
    } else if (hp === 'manufacturing') {
      out.push({ en: 'Powering manufacturing with renewable electricity is the fastest lever to lower this stage.', fr: "Alimenter la fabrication avec une électricité renouvelable est le levier le plus rapide pour réduire cette étape.", ar: 'تشغيل التصنيع بالكهرباء المتجددة هو أسرع رافعة لخفض هذه المرحلة.' })
    } else if (hp === 'packaging') {
      out.push({ en: 'Move to recyclable mono-material packaging to reduce this stage.', fr: 'Passez à un emballage mono-matériau recyclable pour réduire cette étape.', ar: 'انتقل إلى تغليف أحادي المادة قابل للتدوير لخفض هذه المرحلة.' })
    }
    return out.slice(0, 3)
  }, [result, L, lang])

  const selects: { label: string; value: string; set: (v: string) => void; options: Opt[] }[] = [
    { label: L.product, value: product, set: setProduct, options: PRODUCTS },
    { label: L.material, value: material, set: setMaterial, options: MATERIALS },
    { label: L.process, value: process, set: setProcess, options: PROCESSES },
    { label: L.packaging, value: packaging, set: setPackaging, options: PACKAGING },
    { label: L.transport, value: transport, set: setTransport, options: TRANSPORT },
    { label: L.distance, value: distance, set: setDistance, options: DISTANCES },
  ]

  const rMeta = result ? RATING[result.rating] : null

  return (
    <section className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-8">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 block text-[var(--color-lime)]" style={{ fontFamily: 'var(--font-body)' }}>{L.eyebrow}</span>
          <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>{L.title}</h2>
          <p className="text-[14.5px] text-[var(--color-text-secondary)] max-w-[620px] mx-auto" style={{ fontFamily: 'var(--font-body)' }}>{L.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-6 items-start">
          {/* Inputs */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 lg:p-7 shadow-[var(--shadow-card)]">
            <div className="grid sm:grid-cols-2 gap-4">
              {selects.map(s => (
                <div key={s.label} className={s.options === PRODUCTS ? 'sm:col-span-2' : ''}>
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>{s.label}</label>
                  <select
                    value={s.value}
                    onChange={e => s.set(e.target.value)}
                    className="w-full border border-[var(--color-border)] rounded-xl px-3.5 py-2.5 text-[13.5px] text-[var(--color-text-primary)] bg-[var(--color-bg)] focus:outline-none focus:border-[var(--color-primary)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {s.options.map(o => <option key={o.id} value={o.id}>{t(o.label)}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={run}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-6 py-3.5 rounded-full hover:bg-[var(--color-primary-deep)] transition-colors text-[15px]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {submitted ? L.rerun : L.run}
              <svg className="rtl-flip" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </button>
            {submitted && dirty && (
              <p className="mt-2.5 text-center text-[11.5px] font-medium" style={{ color: '#E8850C', fontFamily: 'var(--font-body)' }}>
                {L.changed}
              </p>
            )}
          </div>

          {/* Results */}
          <div className="space-y-4">
            {!result || !rMeta ? (
              <div className="bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] rounded-3xl p-10 text-center flex flex-col items-center justify-center min-h-[340px]">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'var(--color-tint-lime)', color: 'var(--color-primary)' }}>
                  <IconLeaf size={26} strokeWidth={1.6} />
                </div>
                <h3 className="text-[18px] font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>{L.emptyTitle}</h3>
                <p className="text-[13.5px] text-[var(--color-text-secondary)] max-w-[320px] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{L.emptyText}</p>
              </div>
            ) : (
            <>
            {/* Rating + footprint */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={result.rating}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-[86px] h-[86px] rounded-2xl flex flex-col items-center justify-center shrink-0 text-white"
                    style={{ background: rMeta.color }}
                  >
                    <span className="text-[44px] font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>{result.rating}</span>
                  </motion.div>
                </AnimatePresence>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)] mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>{L.rating}</div>
                  <div className="text-[20px] font-bold text-[var(--color-text-primary)] mb-2" style={{ color: rMeta.color, fontFamily: 'var(--font-display)' }}>{t(rMeta.label)}</div>
                  <div className="flex items-center gap-1">
                    {(['A', 'B', 'C', 'D', 'E'] as RatingKey[]).map(k => (
                      <span key={k} className="flex-1 h-1.5 rounded-full" style={{ background: k === result.rating ? RATING[k].color : 'var(--color-bg-secondary)' }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="bg-[var(--color-bg-secondary)] rounded-xl p-3.5">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] mb-1" style={{ fontFamily: 'var(--font-body)' }}>{L.footprint}</div>
                  <div className="text-[24px] font-bold leading-none text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                    {animTotal < 10 ? animTotal.toFixed(1) : Math.round(animTotal)}<span className="text-[12px] text-[var(--color-text-secondary)]"> kg CO₂e</span>
                  </div>
                  <div className="text-[10px] text-[var(--color-text-secondary)] mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>{L.perUnit}</div>
                </div>
                <div className="bg-[var(--color-bg-secondary)] rounded-xl p-3.5">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] mb-1" style={{ fontFamily: 'var(--font-body)' }}>{L.intensityLabel}</div>
                  <div className="text-[24px] font-bold leading-none text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                    {animIntensity.toFixed(1)}
                  </div>
                  <div className="text-[10px] text-[var(--color-text-secondary)] mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>{L.perKg}</div>
                </div>
              </div>
            </div>

            {/* Breakdown + hotspot */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 shadow-[var(--shadow-card)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: 'var(--font-body)' }}>{L.breakdown}</div>
              <div className="space-y-2.5">
                {(Object.keys(result.stages) as (keyof typeof result.stages)[]).map(k => {
                  const val = result.stages[k]
                  const pct = (val / result.total) * 100
                  const meta = stageMeta[k]
                  const isHot = k === result.hotspot
                  return (
                    <div key={k}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>
                          <meta.icon size={13} strokeWidth={1.8} style={{ color: meta.color }} />
                          {L.stages[k]}
                          {isHot && (
                            <span className="inline-flex items-center gap-1 text-[9.5px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: '#DC2626', background: 'color-mix(in srgb, #DC2626 12%, transparent)' }}>
                              <IconTarget size={9} strokeWidth={2} />{L.hotspot}
                            </span>
                          )}
                        </span>
                        <span className="text-[12px] font-bold text-[var(--color-text-secondary)]">{val < 10 ? val.toFixed(1) : Math.round(val)} kg · {Math.round(pct)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: meta.color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Insights */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 shadow-[var(--shadow-card)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: 'var(--font-body)' }}>{L.insights}</div>
              <ul className="space-y-2.5">
                {insights.map((ins, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                    <IconTrendingUp size={15} strokeWidth={1.8} className="shrink-0 mt-0.5 text-[var(--color-primary)]" />
                    <span>{t(ins)}</span>
                  </li>
                ))}
              </ul>
            </div>
            </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between" style={{ background: 'linear-gradient(160deg, var(--color-tint-lime), var(--color-surface) 70%)' }}>
          <p className="inline-flex items-center gap-2.5 text-[13.5px] text-[var(--color-text-primary)] leading-relaxed max-w-[640px]" style={{ fontFamily: 'var(--font-body)' }}>
            <IconGlobe size={18} strokeWidth={1.7} className="shrink-0 text-[var(--color-primary)]" />
            {L.ctaText}
          </p>
          <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[var(--color-primary)] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--color-primary-deep)] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
            {L.cta}
            <svg className="rtl-flip" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h8M7 3l4 4-4 4"/></svg>
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-center text-[11.5px] text-[var(--color-text-secondary)] max-w-[720px] mx-auto leading-snug italic" style={{ fontFamily: 'var(--font-body)' }}>
          {L.note}
        </p>
      </div>
    </section>
  )
}
