import { useState } from 'react'
import { Link } from './LocalizedLink'
import { AnimatePresence, motion } from 'framer-motion'
import { useOdometer } from '../hooks/useOdometer'
import { useLang } from '../i18n/LanguageContext'
import { IconLeaf, IconNetwork, IconScale, IconCheck, IconTrendingUp } from './icons'

type Pillar = 'E' | 'S' | 'G'

interface Option {
  en: string
  fr: string
  ar: string
  pts: number // 0–10 maturity points
}

interface Question {
  pillar: Pillar
  en: string
  fr: string
  ar: string
  options: Option[]
}

/**
 * Maturity-scale questionnaire modeled on the structure of S&P Global CSA /
 * MSCI ESG assessments (simplified): 4 Environmental, 3 Social, 3 Governance
 * questions, each scored 0/3/6/10 by maturity level.
 * Total score = 40% E + 30% S + 30% G, on a 0–100 scale.
 */
const QUESTIONS: Question[] = [
  // ── Environmental ─────────────────────────────────────────────
  {
    pillar: 'E',
    en: 'How does your organization measure its greenhouse gas emissions?',
    fr: 'Comment votre organisation mesure-t-elle ses émissions de gaz à effet de serre ?',
    ar: 'كيف تقيس مؤسستك انبعاثات غازات الدفيئة؟',
    options: [
      { en: 'We do not measure emissions', fr: 'Nous ne mesurons pas les émissions', ar: 'لا نقيس الانبعاثات', pts: 0 },
      { en: 'Rough estimates using industry averages', fr: "Estimations approximatives basées sur des moyennes sectorielles", ar: 'تقديرات تقريبية بمتوسطات القطاع', pts: 3 },
      { en: 'Scope 1 & 2 calculated from real operational data', fr: 'Scopes 1 et 2 calculés à partir de données opérationnelles réelles', ar: 'النطاقان 1 و2 محسوبان من بيانات تشغيلية حقيقية', pts: 6 },
      { en: 'Full Scope 1–3, continuously measured & third-party verified', fr: 'Scopes 1 à 3 complets, mesurés en continu et vérifiés par un tiers', ar: 'النطاقات 1–3 كاملة، مقيسة باستمرار وموثّقة من طرف ثالث', pts: 10 },
    ],
  },
  {
    pillar: 'E',
    en: 'Does your organization have emission reduction targets?',
    fr: "Votre organisation a-t-elle des objectifs de réduction des émissions ?",
    ar: 'هل لدى مؤسستك أهداف لخفض الانبعاثات؟',
    options: [
      { en: 'No targets set', fr: 'Aucun objectif défini', ar: 'لا توجد أهداف', pts: 0 },
      { en: 'Informal internal ambitions', fr: 'Ambitions internes informelles', ar: 'طموحات داخلية غير رسمية', pts: 3 },
      { en: 'Public targets with defined baseline year', fr: 'Objectifs publics avec une année de référence définie', ar: 'أهداف معلنة بسنة أساس محددة', pts: 6 },
      { en: 'Science-based targets (SBTi-aligned) with annual tracking', fr: 'Objectifs scientifiques (alignés SBTi) avec suivi annuel', ar: 'أهداف علمية (متوافقة مع SBTi) مع تتبّع سنوي', pts: 10 },
    ],
  },
  {
    pillar: 'E',
    en: 'What share of your energy consumption is renewable or low-carbon?',
    fr: "Quelle part de votre consommation énergétique est renouvelable ou bas carbone ?",
    ar: 'ما نسبة الطاقة المتجددة أو منخفضة الكربون من استهلاككم؟',
    options: [
      { en: "None / we don't track it", fr: "Aucune / nous ne la suivons pas", ar: 'لا شيء / لا نتتبّعها', pts: 0 },
      { en: 'Under 10%', fr: 'Moins de 10 %', ar: 'أقل من 10%', pts: 3 },
      { en: '10–30% with an expansion plan', fr: '10 à 30 % avec un plan d\'expansion', ar: '10–30% مع خطة توسّع', pts: 6 },
      { en: 'Over 30% with contracted growth (PPA / solar)', fr: 'Plus de 30 % avec une croissance contractuelle (PPA / solaire)', ar: 'أكثر من 30% مع نمو متعاقد عليه (اتفاقيات شراء / طاقة شمسية)', pts: 10 },
    ],
  },
  {
    pillar: 'E',
    en: 'How is environmental management (waste, water, spills) handled?',
    fr: "Comment la gestion environnementale (déchets, eau, déversements) est-elle traitée ?",
    ar: 'كيف تُدار الشؤون البيئية (النفايات، المياه، التسرّبات)؟',
    options: [
      { en: 'Reactively, when incidents occur', fr: 'De manière réactive, lors des incidents', ar: 'بشكل تفاعلي عند وقوع الحوادث', pts: 0 },
      { en: 'Internal procedures, no certification', fr: 'Procédures internes, sans certification', ar: 'إجراءات داخلية دون شهادة', pts: 3 },
      { en: 'ISO 14001 certified management system', fr: 'Système de gestion certifié ISO 14001', ar: 'نظام إدارة معتمد ISO 14001', pts: 6 },
      { en: 'ISO 14001 + quantified reduction KPIs reported publicly', fr: 'ISO 14001 + indicateurs de réduction quantifiés publiés', ar: 'ISO 14001 + مؤشرات خفض كمّية مُعلنة', pts: 10 },
    ],
  },
  // ── Social ────────────────────────────────────────────────────
  {
    pillar: 'S',
    en: 'How mature is your health & safety management?',
    fr: "Quel est le niveau de maturité de votre gestion santé et sécurité ?",
    ar: 'ما مدى نضج إدارة الصحة والسلامة لديكم؟',
    options: [
      { en: 'Basic legal compliance only', fr: 'Conformité légale de base uniquement', ar: 'امتثال قانوني أساسي فقط', pts: 0 },
      { en: 'Incident tracking (LTIF) with internal reviews', fr: 'Suivi des incidents (LTIF) avec revues internes', ar: 'تتبّع الحوادث (LTIF) مع مراجعات داخلية', pts: 3 },
      { en: 'ISO 45001 certified with public safety KPIs', fr: 'Certifié ISO 45001 avec indicateurs de sécurité publiés', ar: 'معتمد ISO 45001 مع مؤشرات سلامة معلنة', pts: 6 },
      { en: 'Zero-harm program, leading indicators, contractor coverage', fr: "Programme zéro incident, indicateurs avancés, couverture des sous-traitants", ar: 'برنامج انعدام الأذى، مؤشرات استباقية، وتغطية المقاولين', pts: 10 },
    ],
  },
  {
    pillar: 'S',
    en: 'How do you manage workforce development and diversity (incl. nationalization)?',
    fr: "Comment gérez-vous le développement des effectifs et la diversité (y compris la tunisification) ?",
    ar: 'كيف تديرون تطوير الكوادر والتنوع (بما يشمل التوطين)؟',
    options: [
      { en: 'No formal programs', fr: 'Aucun programme formel', ar: 'لا برامج رسمية', pts: 0 },
      { en: 'Training budget, no measurable targets', fr: 'Budget de formation, sans objectifs mesurables', ar: 'ميزانية تدريب دون أهداف قابلة للقياس', pts: 3 },
      { en: 'Structured development + nationalization targets tracked', fr: 'Développement structuré + objectifs de tunisification suivis', ar: 'تطوير منظّم + أهداف توطين متتبّعة', pts: 6 },
      { en: 'Published workforce KPIs, pay-equity review, leadership pipeline', fr: "Indicateurs publiés, revue d'équité salariale, filière de leadership", ar: 'مؤشرات معلنة، مراجعة عدالة الأجور، وخط قيادات', pts: 10 },
    ],
  },
  {
    pillar: 'S',
    en: 'Do you assess ESG standards across your suppliers and community impact?',
    fr: "Évaluez-vous les normes ESG de vos fournisseurs et votre impact communautaire ?",
    ar: 'هل تقيّمون معايير ESG لدى مورّديكم وأثركم المجتمعي؟',
    options: [
      { en: 'No supplier or community assessment', fr: 'Aucune évaluation des fournisseurs ou de la communauté', ar: 'لا تقييم للمورّدين أو المجتمع', pts: 0 },
      { en: 'Code of conduct signed by key suppliers', fr: 'Code de conduite signé par les fournisseurs clés', ar: 'مدونة سلوك موقّعة من المورّدين الرئيسيين', pts: 3 },
      { en: 'Supplier ESG screening + structured community program', fr: 'Filtrage ESG des fournisseurs + programme communautaire structuré', ar: 'فرز ESG للمورّدين + برنامج مجتمعي منظّم', pts: 6 },
      { en: 'Audited supplier ESG program with corrective actions', fr: 'Programme ESG fournisseurs audité avec actions correctives', ar: 'برنامج ESG مُدقَّق للمورّدين مع إجراءات تصحيحية', pts: 10 },
    ],
  },
  // ── Governance ────────────────────────────────────────────────
  {
    pillar: 'G',
    en: 'Who oversees ESG in your organization?',
    fr: "Qui supervise l'ESG au sein de votre organisation ?",
    ar: 'من يشرف على ESG في مؤسستكم؟',
    options: [
      { en: 'No one formally', fr: 'Personne formellement', ar: 'لا أحد رسميًا', pts: 0 },
      { en: 'An HSE / CSR team without board access', fr: 'Une équipe HSE / RSE sans accès au conseil', ar: 'فريق HSE / مسؤولية اجتماعية دون وصول لمجلس الإدارة', pts: 3 },
      { en: 'Executive sponsor reporting to the board annually', fr: 'Sponsor exécutif rendant compte au conseil annuellement', ar: 'راعٍ تنفيذي يرفع تقارير سنوية للمجلس', pts: 6 },
      { en: 'Board-level ESG committee with quarterly review & exec KPIs', fr: 'Comité ESG au niveau du conseil, revue trimestrielle et indicateurs exécutifs', ar: 'لجنة ESG على مستوى المجلس بمراجعة فصلية ومؤشرات تنفيذية', pts: 10 },
    ],
  },
  {
    pillar: 'G',
    en: 'What is the state of your ESG disclosure and reporting?',
    fr: "Quel est l'état de votre divulgation et reporting ESG ?",
    ar: 'ما حالة الإفصاح والتقارير ESG لديكم؟',
    options: [
      { en: 'No ESG reporting', fr: 'Aucun reporting ESG', ar: 'لا تقارير ESG', pts: 0 },
      { en: 'Internal reporting only', fr: 'Reporting interne uniquement', ar: 'تقارير داخلية فقط', pts: 3 },
      { en: 'Annual sustainability report (GRI-referenced)', fr: 'Rapport de durabilité annuel (référencé GRI)', ar: 'تقرير استدامة سنوي (بمرجعية GRI)', pts: 6 },
      { en: 'IFRS S2 / GRI report with independent assurance', fr: 'Rapport IFRS S2 / GRI avec assurance indépendante', ar: 'تقرير IFRS S2 / GRI مع توكيد مستقل', pts: 10 },
    ],
  },
  {
    pillar: 'G',
    en: 'How developed are your ethics & compliance controls?',
    fr: "Quel est le niveau de développement de vos contrôles éthiques et de conformité ?",
    ar: 'ما مدى تطوّر ضوابط الأخلاقيات والامتثال لديكم؟',
    options: [
      { en: 'No formal code of conduct', fr: 'Aucun code de conduite formel', ar: 'لا مدونة سلوك رسمية', pts: 0 },
      { en: 'Code of conduct exists, limited training', fr: 'Code de conduite existant, formation limitée', ar: 'توجد مدونة سلوك مع تدريب محدود', pts: 3 },
      { en: 'Anti-corruption policy, whistleblowing channel, annual training', fr: 'Politique anti-corruption, canal de signalement, formation annuelle', ar: 'سياسة مكافحة فساد، قناة إبلاغ، وتدريب سنوي', pts: 6 },
      { en: 'Full compliance program incl. data privacy, audited regularly', fr: 'Programme de conformité complet incluant la confidentialité des données, audité régulièrement', ar: 'برنامج امتثال كامل يشمل خصوصية البيانات ويُدقَّق دوريًا', pts: 10 },
    ],
  },
]

const WEIGHTS: Record<Pillar, number> = { E: 0.4, S: 0.3, G: 0.3 }

/**
 * Indicative benchmarks derived from public S&P Global CSA / MSCI ESG ratings
 * distributions for industrial & energy sectors (0–100 normalized).
 */
const BENCHMARKS = [
  { en: 'Tunisian industrial average', fr: 'Moyenne industrielle tunisienne', ar: 'متوسط الصناعة التونسية', score: 42 },
  { en: 'Global energy sector average', fr: "Moyenne mondiale du secteur de l'énergie", ar: 'المتوسط العالمي لقطاع الطاقة', score: 54 },
  { en: 'Top quartile — global industrials', fr: 'Quartile supérieur — industrie mondiale', ar: 'الربع الأعلى — الصناعات العالمية', score: 71 },
  { en: 'ESG leaders (top 5%)', fr: 'Leaders ESG (top 5 %)', ar: 'قادة ESG (أعلى 5%)', score: 85 },
]

const PILLAR_META: Record<Pillar, { icon: typeof IconLeaf; color: string; en: string; fr: string; ar: string }> = {
  E: { icon: IconLeaf, color: 'var(--color-primary)', en: 'Environmental', fr: 'Environnement', ar: 'البيئة' },
  S: { icon: IconNetwork, color: 'var(--color-info)', en: 'Social', fr: 'Social', ar: 'المجتمع' },
  G: { icon: IconScale, color: 'var(--color-violet)', en: 'Governance', fr: 'Gouvernance', ar: 'الحوكمة' },
}

function ratingBand(score: number, lang: 'en' | 'fr' | 'ar') {
  const labels = {
    leader: { en: 'Leader', fr: 'Leader', ar: 'رائد' },
    established: { en: 'Established', fr: 'Établi', ar: 'راسخ' },
    developing: { en: 'Developing', fr: 'En développement', ar: 'في طور التطوّر' },
    emerging: { en: 'Emerging', fr: 'Émergent', ar: 'ناشئ' },
  }
  if (score >= 75) return { label: labels.leader[lang], color: 'var(--color-primary)' }
  if (score >= 60) return { label: labels.established[lang], color: 'var(--color-lime)' }
  if (score >= 40) return { label: labels.developing[lang], color: 'var(--color-warning, #C67A0A)' }
  return { label: labels.emerging[lang], color: 'var(--color-danger, #DC2626)' }
}

export default function EsgScoreCalculator() {
  const { lang } = useLang()
  const [step, setStep] = useState(0) // question index; QUESTIONS.length = results
  const [answers, setAnswers] = useState<number[]>([]) // pts per question

  const L = lang === 'ar'
    ? {
        eyebrow: 'جرّبها بنفسك',
        title: 'ما هو تصنيفك ESG؟',
        subtitle: 'أجب عن 10 أسئلة واحصل على درجة نضج ESG من 100 — مع مقارنة بمعايير قطاعية حقيقية.',
        question: 'سؤال',
        of: 'من',
        back: 'رجوع',
        restart: 'أعد التقييم',
        yourScore: 'درجتك ESG',
        outOf100: 'من 100',
        pillarBreakdown: 'التفصيل حسب الركيزة',
        comparison: 'مقارنة بالمعايير المرجعية',
        you: 'أنت',
        weights: 'الأوزان: البيئة 40% · المجتمع 30% · الحوكمة 30%',
        benchNote: 'معايير استرشادية مستمدة من توزيعات تقييمات S&P Global CSA وMSCI ESG المعلنة للقطاعات الصناعية والطاقة.',
        aboveGcc: (d: number) => `أعلى من متوسط الصناعة التونسية بـ ${d} نقطة`,
        belowGcc: (d: number) => `أدنى من متوسط الصناعة التونسية بـ ${d} نقطة`,
        atGcc: 'عند متوسط الصناعة التونسية تمامًا',
        weakest: 'أكبر فرصة للتحسّن',
        ctaText: 'تبني فوتوكارب إفصاحك ESG الجاهز للتدقيق — IFRS S2 وGRI وCDP — من بياناتك الحية خلال 48 ساعة.',
        cta: 'احصل على تقييم ESG كامل',
      }
    : lang === 'fr'
    ? {
        eyebrow: 'Essayez par vous-même',
        title: 'Quel est votre score ESG ?',
        subtitle: 'Répondez à 10 questions et obtenez un score de maturité ESG sur 100 — comparé à des données sectorielles réelles.',
        question: 'Question',
        of: 'sur',
        back: 'Retour',
        restart: "Refaire l'évaluation",
        yourScore: 'Votre score ESG',
        outOf100: 'sur 100',
        pillarBreakdown: 'Répartition par pilier',
        comparison: 'Votre positionnement',
        you: 'Vous',
        weights: 'Pondérations : Environnement 40 % · Social 30 % · Gouvernance 30 %',
        benchNote: "Références indicatives issues des distributions publiées des notations S&P Global CSA et MSCI ESG pour les secteurs industriel et énergétique.",
        aboveGcc: (d: number) => `${d} points au-dessus de la moyenne industrielle tunisienne`,
        belowGcc: (d: number) => `${d} points en dessous de la moyenne industrielle tunisienne`,
        atGcc: 'Exactement à la moyenne industrielle tunisienne',
        weakest: "Plus grande opportunité d'amélioration",
        ctaText: "Photocarb construit votre divulgation ESG prête pour l'audit — IFRS S2, GRI, CDP — à partir de vos données en direct en 48 heures.",
        cta: 'Obtenir une évaluation ESG complète',
      }
    : {
        eyebrow: 'Try It Yourself',
        title: 'What is your ESG score?',
        subtitle: 'Answer 10 questions and get an ESG maturity score out of 100 — benchmarked against real sector data.',
        question: 'Question',
        of: 'of',
        back: 'Back',
        restart: 'Retake assessment',
        yourScore: 'Your ESG Score',
        outOf100: 'out of 100',
        pillarBreakdown: 'Pillar breakdown',
        comparison: 'How you compare',
        you: 'You',
        weights: 'Weights: Environmental 40% · Social 30% · Governance 30%',
        benchNote: 'Indicative benchmarks derived from published S&P Global CSA and MSCI ESG rating distributions for industrial and energy sectors.',
        aboveGcc: (d: number) => `${d} points above the Tunisian industrial average`,
        belowGcc: (d: number) => `${d} points below the Tunisian industrial average`,
        atGcc: 'Exactly at the Tunisian industrial average',
        weakest: 'Biggest improvement opportunity',
        ctaText: 'Photocarb builds your audit-ready ESG disclosure — IFRS S2, GRI, CDP — from your live data in 48 hours.',
        cta: 'Get a full ESG assessment',
      }

  const done = step >= QUESTIONS.length

  const pillarScore = (p: Pillar) => {
    const idx = QUESTIONS.map((q, i) => (q.pillar === p ? i : -1)).filter(i => i >= 0)
    const answered = idx.filter(i => answers[i] !== undefined)
    if (answered.length === 0) return 0
    const pts = answered.reduce((sum, i) => sum + answers[i], 0)
    return Math.round((pts / (answered.length * 10)) * 100)
  }

  const scores: Record<Pillar, number> = { E: pillarScore('E'), S: pillarScore('S'), G: pillarScore('G') }
  const total = Math.round(scores.E * WEIGHTS.E + scores.S * WEIGHTS.S + scores.G * WEIGHTS.G)
  const band = ratingBand(total, lang)
  const displayed = useOdometer(total, done, 1400)
  const gccDelta = total - BENCHMARKS[0].score
  const weakest = (Object.keys(scores) as Pillar[]).reduce((a, b) => (scores[b] < scores[a] ? b : a))

  const answer = (pts: number) => {
    const next = [...answers]
    next[step] = pts
    setAnswers(next)
    setStep(step + 1)
  }

  const restart = () => {
    setAnswers([])
    setStep(0)
  }

  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)]
  const meta = PILLAR_META[q.pillar]

  return (
    <section className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 block text-[var(--color-lime)]" style={{ fontFamily: 'var(--font-body)' }}>
            {L.eyebrow}
          </span>
          <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {L.title}
          </h2>
          <p className="text-[14.5px] text-[var(--color-text-secondary)] max-w-[560px] mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            {L.subtitle}
          </p>
        </div>

        <div className="max-w-[640px] mx-auto">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-7 lg:p-9 shadow-[var(--shadow-card)]">
            {!done ? (
              <>
                {/* Progress */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-semibold text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
                    {L.question} {step + 1} {L.of} {QUESTIONS.length}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ color: meta.color, background: `color-mix(in srgb, ${meta.color} 12%, transparent)`, fontFamily: 'var(--font-body)' }}
                  >
                    <meta.icon size={12} strokeWidth={1.8} />
                    {meta[lang]}
                  </span>
                </div>
                <div className="h-1.5 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden mb-7">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${(step / QUESTIONS.length) * 100}%`, background: meta.color }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-[19px] font-bold text-[var(--color-text-primary)] mb-5 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                      {q[lang]}
                    </h3>
                    <div className="space-y-2.5">
                      {q.options.map((o, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => answer(o.pts)}
                          className="w-full text-start flex items-center justify-between gap-3 border border-[var(--color-border)] rounded-xl px-4 py-3.5 text-[14px] text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-tint-teal)]"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          <span>{o[lang]}</span>
                          <span className="shrink-0 w-6 h-6 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[10px] font-bold text-[var(--color-text-secondary)]">
                            {String.fromCharCode(65 + i)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="mt-5 text-[13px] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    ← {L.back}
                  </button>
                )}
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {/* Score */}
                <div className="text-center mb-8">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                    {L.yourScore}
                  </div>
                  <div className="text-[72px] font-bold leading-none" style={{ color: band.color, fontFamily: 'var(--font-display)' }}>
                    {displayed}
                  </div>
                  <div className="text-[13px] text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: 'var(--font-body)' }}>{L.outOf100}</div>
                  <span
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-1.5 rounded-full"
                    style={{ color: band.color, background: `color-mix(in srgb, ${band.color} 13%, transparent)`, fontFamily: 'var(--font-body)' }}
                  >
                    <IconCheck size={13} strokeWidth={2.4} />
                    {band.label}
                  </span>
                  <div className="mt-3 text-[12.5px] font-medium text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
                    {gccDelta > 0 ? L.aboveGcc(gccDelta) : gccDelta < 0 ? L.belowGcc(-gccDelta) : L.atGcc}
                  </div>
                </div>

                {/* Pillar breakdown */}
                <div className="mb-8">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                    {L.pillarBreakdown}
                  </div>
                  <div className="space-y-3">
                    {(Object.keys(PILLAR_META) as Pillar[]).map(p => {
                      const m = PILLAR_META[p]
                      return (
                        <div key={p}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>
                              <m.icon size={13} strokeWidth={1.8} style={{ color: m.color }} />
                              {m[lang]}
                              {p === weakest && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: 'var(--color-warning, #C67A0A)', background: 'var(--color-warning-bg, #FCF3E3)' }}>
                                  {L.weakest}
                                </span>
                              )}
                            </span>
                            <span className="text-[13px] font-bold" style={{ color: m.color, fontFamily: 'var(--font-body)' }}>{scores[p]}</span>
                          </div>
                          <div className="h-2 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${scores[p]}%`, background: m.color }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-2.5 text-[10.5px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{L.weights}</div>
                </div>

                {/* Benchmark comparison */}
                <div className="mb-8">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                    {L.comparison}
                  </div>
                  <div className="space-y-2.5">
                    {[...BENCHMARKS, { en: L.you, fr: L.you, ar: L.you, score: total, you: true as const }]
                      .sort((a, b) => a.score - b.score)
                      .map(b => {
                        const isYou = 'you' in b
                        return (
                          <div key={b.en} className="flex items-center gap-3">
                            <span
                              className={`w-[164px] shrink-0 text-[11.5px] leading-tight ${isYou ? 'font-bold text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`}
                              style={{ fontFamily: 'var(--font-body)' }}
                            >
                              {b[lang]}
                            </span>
                            <div className="flex-1 h-4 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${b.score}%`,
                                  background: isYou ? 'var(--color-primary)' : 'color-mix(in srgb, var(--color-text-secondary) 30%, transparent)',
                                }}
                              />
                            </div>
                            <span className={`w-7 text-[12px] font-bold text-end ${isYou ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`} style={{ fontFamily: 'var(--font-body)' }}>
                              {b.score}
                            </span>
                          </div>
                        )
                      })}
                  </div>
                  <div className="mt-2.5 text-[10.5px] text-[var(--color-text-secondary)] leading-snug" style={{ fontFamily: 'var(--font-body)' }}>{L.benchNote}</div>
                </div>

                {/* CTA */}
                <div className="rounded-2xl p-5 mb-4" style={{ background: 'linear-gradient(160deg, var(--color-tint-lime), var(--color-surface) 70%)' }}>
                  <div className="flex items-start gap-3">
                    <IconTrendingUp size={20} strokeWidth={1.7} className="shrink-0 mt-0.5 text-[var(--color-primary)]" />
                    <p className="text-[13.5px] text-[var(--color-text-primary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{L.ctaText}</p>
                  </div>
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center gap-2 bg-[var(--color-primary)] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--color-primary-deep)] transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {L.cta}
                    <svg className="rtl-flip" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h8M7 3l4 4-4 4"/></svg>
                  </Link>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={restart}
                    className="text-[13px] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    ↺ {L.restart}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
