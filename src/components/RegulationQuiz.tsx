import { useState } from 'react'
import { Link } from './LocalizedLink'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { IconShield, IconBolt, IconChart, IconScale, IconCheck } from './icons'

function ArrowIcon() {
  return (
    <svg className="rtl-flip shrink-0 mt-2 text-[var(--color-text-secondary)]" width="14" height="14" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type Answer = 'yes' | 'no' | 'unsure'

interface Question {
  en: string
  fr: string
  ar: string
  options: { value: Answer; en: string; fr: string; ar: string }[]
}

const QUESTIONS: Question[] = [
  {
    en: 'Do you export CBAM-covered goods (cement, steel, aluminium, fertilizers, hydrogen, electricity) to the EU?',
    fr: "Exportez-vous des biens couverts par le MACF (ciment, acier, aluminium, engrais, hydrogène, électricité) vers l'UE ?",
    ar: 'هل تصدّر سلعًا مشمولة بـ CBAM (إسمنت، صلب، ألمنيوم، أسمدة، هيدروجين، كهرباء) إلى الاتحاد الأوروبي؟',
    options: [
      { value: 'yes', en: 'Yes', fr: 'Oui', ar: 'نعم' },
      { value: 'no', en: 'No', fr: 'Non', ar: 'لا' },
    ],
  },
  {
    en: 'Does your facility consume roughly 800 tonnes of oil equivalent or more in energy per year?',
    fr: "Votre installation consomme-t-elle environ 800 tonnes équivalent pétrole ou plus par an ?",
    ar: 'هل تستهلك منشأتك نحو 800 طن مكافئ نفط أو أكثر من الطاقة سنويًا؟',
    options: [
      { value: 'yes', en: 'Yes', fr: 'Oui', ar: 'نعم' },
      { value: 'no', en: 'No', fr: 'Non', ar: 'لا' },
      { value: 'unsure', en: 'Not sure', fr: 'Pas sûr', ar: 'لست متأكدًا' },
    ],
  },
  {
    en: 'Is your company listed on the Bourse de Tunis, or does it report to international investors or lenders?',
    fr: "Votre entreprise est-elle cotée à la Bourse de Tunis, ou rend-elle des comptes à des investisseurs ou prêteurs internationaux ?",
    ar: 'هل شركتك مدرجة في بورصة تونس، أو تُقدّم تقارير لمستثمرين أو ممولين دوليين؟',
    options: [
      { value: 'yes', en: 'Yes', fr: 'Oui', ar: 'نعم' },
      { value: 'no', en: 'No', fr: 'Non', ar: 'لا' },
    ],
  },
]

export default function RegulationQuiz() {
  const { lang } = useLang()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])

  const L = lang === 'ar'
    ? {
        eyebrow: 'جرّبها بنفسك',
        title: 'أي لائحة تنطبق عليك؟',
        subtitle: 'أجب عن 3 أسئلة لمعرفة أي أطر الامتثال التونسية والأوروبية تخصّ منشأتك تحديدًا.',
        question: 'سؤال',
        of: 'من',
        back: 'رجوع',
        restart: 'أعد الإجابة',
        resultsTitle: 'إليك ما ينطبق عليك.',
        applies: 'ينطبق',
        checkLater: 'تحقق لاحقًا',
        notYet: 'لا ينطبق حاليًا',
        alwaysTitle: 'الأساس لكل الحالات',
        alwaysDesc: 'بصمة كربونية معتمدة تفيدك أيًّا كانت إجاباتك — للتمويل، والمناقصات، والاستعداد المبكر.',
        exploreService: 'استكشف الخدمة',
        noneTitle: 'لا شيء من هذا إلزامي عليك اليوم — وهذا جيد.',
        noneDesc: 'لكن المشترين الأوروبيين والممولين يطلبون هذه البيانات بشكل متزايد طوعًا، والقواعد تتّسع كل عام. البصمة الكربونية نقطة انطلاق منطقية.',
      }
    : lang === 'fr'
    ? {
        eyebrow: 'Essayez par vous-même',
        title: 'Quelle réglementation vous concerne ?',
        subtitle: "Répondez à 3 questions pour voir exactement quels cadres de conformité tunisiens et européens s'appliquent à votre installation.",
        question: 'Question',
        of: 'sur',
        back: 'Retour',
        restart: 'Recommencer',
        resultsTitle: 'Voici ce qui vous concerne.',
        applies: 'Vous concerne',
        checkLater: 'À vérifier',
        notYet: 'Pas encore requis',
        alwaysTitle: 'La base, quel que soit le cas',
        alwaysDesc: "Un bilan carbone certifié est utile quelles que soient vos réponses — pour le financement, les appels d'offres, et anticiper ce qui arrive.",
        exploreService: 'Explorer le service',
        noneTitle: "Rien de tout cela n'est obligatoire pour vous aujourd'hui — et c'est très bien.",
        noneDesc: "Mais les acheteurs et prêteurs européens demandent de plus en plus ces données volontairement, et les règles s'élargissent chaque année. Le bilan carbone est le point de départ logique.",
      }
    : {
        eyebrow: 'Try It Yourself',
        title: 'Which regulation applies to you?',
        subtitle: 'Answer 3 questions to see exactly which Tunisian and EU compliance frameworks apply to your facility.',
        question: 'Question',
        of: 'of',
        back: 'Back',
        restart: 'Retake',
        resultsTitle: "Here's what applies to you.",
        applies: 'Applies to you',
        checkLater: 'Worth checking',
        notYet: 'Not required yet',
        alwaysTitle: 'The foundation, regardless',
        alwaysDesc: 'A certified carbon footprint helps whatever your answers were — for financing, tenders, and getting ahead of what\'s coming.',
        exploreService: 'Explore the service',
        noneTitle: "Nothing here is mandatory for you today — and that's fine.",
        noneDesc: "But EU buyers and lenders increasingly ask for this data voluntarily, and the rules widen every year. Bilan carbone is the logical place to start.",
      }

  const done = step >= QUESTIONS.length
  const answer = (a: Answer) => {
    const next = [...answers]
    next[step] = a
    setAnswers(next)
    setStep(step + 1)
  }
  const restart = () => { setAnswers([]); setStep(0) }

  const exportsEU = answers[0] === 'yes'
  const energyHigh = answers[1] === 'yes'
  const energyUnsure = answers[1] === 'unsure'
  const listed = answers[2] === 'yes'
  const noneApply = answers[0] === 'no' && answers[1] === 'no' && answers[2] === 'no'

  const RESULTS = [
    {
      key: 'cbam', icon: IconShield, color: 'var(--color-primary)',
      applies: exportsEU,
      titleEn: 'CBAM', titleFr: 'MACF', titleAr: 'CBAM',
      descEn: 'Your exports to the EU require certified embedded-carbon declarations, quarterly.',
      descFr: "Vos exportations vers l'UE nécessitent des déclarations de carbone incorporé certifiées, chaque trimestre.",
      descAr: 'صادراتك إلى الاتحاد الأوروبي تتطلب إقرارات كربون مُضمَّن معتمدة، كل فصل.',
      to: '/services/cbam',
    },
    {
      key: 'anme', icon: IconBolt, color: 'var(--color-navy)',
      applies: energyHigh, uncertain: energyUnsure,
      titleEn: 'ANME · Article 7', titleFr: 'ANME · Article 7', titleAr: 'ANME · الفصل 7',
      descEn: 'Your energy consumption likely triggers the mandatory audit — and the FTE subsidy that comes with it.',
      descFr: "Votre consommation d'énergie déclenche probablement l'audit obligatoire — et la subvention du FTE qui l'accompagne.",
      descAr: 'استهلاكك للطاقة يُرجّح أن يُفعّل التدقيق الإلزامي — ودعم صندوق الانتقال الطاقي المرافق له.',
      descUncertainEn: "We'll check your 800 TOE threshold for you, free of charge.",
      descUncertainFr: "Nous vérifierons votre seuil de 800 TEP pour vous, gratuitement.",
      descUncertainAr: 'سنتحقق من عتبة 800 طن مكافئ نفط نيابةً عنك، دون مقابل.',
      to: '/services/anme-compliance',
    },
    {
      key: 'ifrs', icon: IconChart, color: 'var(--color-violet)',
      applies: listed,
      titleEn: 'IFRS S2 & CMF', titleFr: 'IFRS S2 et CMF', titleAr: 'IFRS S2 وCMF',
      descEn: "Your board and the CMF will expect structured ESG and climate-risk disclosure.",
      descFr: "Votre conseil d'administration et le CMF attendront une divulgation ESG et des risques climatiques structurée.",
      descAr: 'مجلس إدارتك وهيئة السوق المالية سيتوقعان إفصاح ESG ومخاطر مناخية منظّمًا.',
      to: '/services/esg-reports',
    },
  ]

  const titleFor = (r: typeof RESULTS[number]) => lang === 'ar' ? r.titleAr : lang === 'fr' ? r.titleFr : r.titleEn
  const descFor = (r: typeof RESULTS[number]) => lang === 'ar' ? r.descAr : lang === 'fr' ? r.descFr : r.descEn
  const descUncertainFor = (r: typeof RESULTS[number]) =>
    lang === 'ar' ? r.descUncertainAr : lang === 'fr' ? r.descUncertainFr : r.descUncertainEn
  const qText = (q: Question) => lang === 'ar' ? q.ar : lang === 'fr' ? q.fr : q.en
  const oText = (o: Question['options'][number]) => lang === 'ar' ? o.ar : lang === 'fr' ? o.fr : o.en

  return (
    <section className="bg-[var(--color-bg)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 block text-[var(--color-navy)]" style={{ fontFamily: 'var(--font-body)' }}>
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
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-semibold text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
                    {L.question} {step + 1} {L.of} {QUESTIONS.length}
                  </span>
                </div>
                <div className="h-1.5 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden mb-7">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${(step / QUESTIONS.length) * 100}%`, background: 'var(--color-navy)' }}
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
                      {qText(QUESTIONS[step])}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {QUESTIONS[step].options.map(o => (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => answer(o.value)}
                          className="flex-1 min-w-[120px] border border-[var(--color-border)] rounded-xl px-5 py-3.5 text-[14px] font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-navy)] hover:bg-[var(--color-tint-navy)]"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {oText(o)}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="mt-5 text-[13px] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-navy)] transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    ← {L.back}
                  </button>
                )}
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h3 className="text-[19px] font-bold text-[var(--color-text-primary)] mb-6 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                  {L.resultsTitle}
                </h3>

                {noneApply && (
                  <div className="rounded-2xl p-5 mb-5" style={{ background: 'var(--color-tint-teal)' }}>
                    <p className="text-[14px] font-semibold text-[var(--color-text-primary)] mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>{L.noneTitle}</p>
                    <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{L.noneDesc}</p>
                  </div>
                )}

                <div className="space-y-3 mb-5">
                  {RESULTS.map(r => {
                    const status = r.applies ? L.applies : r.uncertain ? L.checkLater : L.notYet
                    const active = r.applies || r.uncertain
                    return (
                      <Link
                        key={r.key}
                        to={r.to}
                        className={`flex items-start gap-3.5 rounded-xl border px-4 py-3.5 transition-colors ${active ? 'hover:bg-[var(--color-bg-secondary)]' : 'opacity-55'}`}
                        style={{ borderColor: active ? `color-mix(in srgb, ${r.color} 35%, transparent)` : 'var(--color-border)' }}
                      >
                        <span
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `color-mix(in srgb, ${r.color} 14%, transparent)`, color: r.color }}
                        >
                          {active ? <IconCheck size={16} strokeWidth={2.4} /> : <r.icon size={16} strokeWidth={1.7} />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[14px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                              {titleFor(r)}
                            </span>
                            <span
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ color: r.color, background: `color-mix(in srgb, ${r.color} 14%, transparent)`, fontFamily: 'var(--font-body)' }}
                            >
                              {status}
                            </span>
                          </div>
                          <p className="text-[12.5px] text-[var(--color-text-secondary)] leading-snug mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                            {r.uncertain ? descUncertainFor(r) : descFor(r)}
                          </p>
                        </div>
                        <ArrowIcon />
                      </Link>
                    )
                  })}
                </div>

                <Link
                  to="/services/bilan-carbone"
                  className="flex items-start gap-3.5 rounded-xl border px-4 py-3.5 mb-6 transition-colors hover:bg-[var(--color-bg-secondary)]"
                  style={{ borderColor: 'color-mix(in srgb, var(--color-lime) 35%, transparent)' }}
                >
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'color-mix(in srgb, var(--color-lime) 16%, transparent)', color: 'var(--color-lime)' }}>
                    <IconScale size={16} strokeWidth={1.7} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[14px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>{L.alwaysTitle}</span>
                    <p className="text-[12.5px] text-[var(--color-text-secondary)] leading-snug mt-1" style={{ fontFamily: 'var(--font-body)' }}>{L.alwaysDesc}</p>
                  </div>
                  <ArrowIcon />
                </Link>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={restart}
                    className="text-[13px] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-navy)] transition-colors"
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
