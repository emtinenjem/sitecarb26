import CertMarquee from '../components/CertMarquee'
import RegulationQuiz from '../components/RegulationQuiz'
import RegulationExplorer from '../components/RegulationExplorer'
import FinalCTA from '../components/FinalCTA'
import { useInView } from '../hooks/useInView'
import { useLang } from '../i18n/LanguageContext'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { IconCheck, IconCircleDot } from '../components/icons'

const FRAMEWORKS = [
  {
    num: '01', id: 'cbam',
    title: 'CBAM', fullTitle: 'Carbon Border Adjustment Mechanism',
    tagline: "Europe's carbon border tax has been in full effect since January 2026.",
    color: 'var(--color-primary)',
    desc: 'The EU CBAM places a carbon price on imports of steel, cement, aluminium, fertilisers, hydrogen, and electricity from non-EU countries. Tunisian exporters must submit verified embedded carbon data per shipment or pay default CBAM rates — which assume the worst-case intensity.',
    points: [
      'Phase-in reporting began Q4 2023 — quarterly declarations required',
      'Full financial liability has applied since January 2026',
      'Default CBAM intensity rates are ~30–60% above verified actual rates for Tunisian producers',
      'Verified data allows use of actual facility intensity — directly reducing CBAM cost',
      'Photocarb generates shipment-level ISO 14064-verified intensity certificates',
    ],
    timeline: [
      { date: 'Oct 2023', label: 'Reporting phase begins — quarterly declarations', done: true },
      { date: 'Jan 2025', label: 'Importers must register in EU CBAM registry', done: true },
      { date: 'Jan 2026', label: 'Full financial liability — CBAM certificates required', done: true },
      { date: 'Jan 2034', label: 'Free allowances fully phased out — full CBAM exposure', done: false },
    ],
  },
  {
    num: '02', id: 'ifrs',
    title: 'IFRS S1/S2', fullTitle: 'International Sustainability Reporting Standards',
    tagline: 'Climate risk is now a financial reporting requirement.',
    color: 'var(--color-violet)',
    desc: "IFRS S1 (general sustainability disclosures) and S2 (climate-specific disclosures) require companies to report material climate risks, physical risks, transition risks, and climate-related opportunities in their financial statements. Tunisia's Conseil du Marché Financier has already issued ESG reporting guidance for listed companies, pointing toward full IFRS S2 adoption.",
    points: [
      'Scope 1, 2, and material Scope 3 emissions required',
      'Scenario analysis across 1.5°C and 2°C pathways',
      'Physical risk quantification (heat, water stress, flooding)',
      'Transition risk: carbon pricing, stranded asset risk',
      'Photocarb auto-generates the IFRS S2 quantification tables and scenario analysis packs',
    ],
    timeline: [
      { date: '2024', label: 'Mandatory for listed entities in Australia, UK, EU', done: true },
      { date: '2025', label: "CMF issues first ESG reporting guidance for Tunisian listed companies", done: true },
      { date: '2026', label: 'Broader regional IFRS S2 adoption underway', done: false },
      { date: '2027', label: 'Full global convergence expected', done: false },
    ],
  },
  {
    num: '03', id: 'ncap',
    title: 'ANME · Article 7', fullTitle: 'Mandatory Energy Audit — Law No. 2009-7',
    tagline: 'Binding today — audit non-compliance costs up to TND 50,000, doing it right can fund most of the fix.',
    color: 'var(--color-navy)',
    desc: 'Law No. 2009-7 of 9 February 2009 and its implementing Decree No. 2009-362 make periodic energy audits mandatory for any industrial facility consuming 800 tonnes of oil equivalent (TOE) or more per year — regardless of sector — and for tertiary, transport or residential establishments above 500 TOE. Under Article 7 of Decree No. 2017-983, the Fonds de Transition Énergétique (FTE) then covers 70% of the audit cost, capped at TND 30,000, plus up to 20% of the resulting efficiency investment, on ANME\'s technical opinion.',
    points: [
      'Applies to any facility ≥800 TOE/year (≥500 TOE for tertiary, transport, residential) — every sector, not just exporters',
      'Non-compliance fines: TND 20,000–50,000 under Decree No. 2009-2269',
      'FTE subsidy: 70% of audit cost, capped at TND 30,000, granted on ANME\'s technical opinion (Art. 7, Decree No. 2017-983)',
      'A further subsidy of up to 20% typically applies to the resulting efficiency investment',
      'Photocarb prepares the consumption baseline your ANME-registered auditor needs and builds the case for the FTE file — it does not replace the licensed auditor',
    ],
    timeline: [
      { date: '2009', label: 'Law No. 2009-7 and Decree No. 2009-362 make periodic energy audits mandatory', done: true },
      { date: '2009', label: 'Decree No. 2009-2269 sets fines of TND 20,000–50,000 for non-compliance', done: true },
      { date: '2017', label: 'Decree No. 2017-983 (Art. 7) sets the FTE subsidy mechanism via ANME', done: true },
      { date: '2026', label: "EU CBAM and Tunisia's own import carbon declaration both now in effect", done: true },
    ],
  },
]

const FRAMEWORKS_AR: Record<string, { title?: string; fullTitle: string; tagline: string; desc: string; points: string[]; timeline: string[] }> = {
  cbam: {
    fullTitle: 'آلية تعديل الكربون الحدودية',
    tagline: 'ضريبة الكربون الحدودية الأوروبية سارية بالكامل منذ يناير 2026.',
    desc: 'تفرض آلية CBAM الأوروبية سعرًا للكربون على واردات الصلب والإسمنت والألمنيوم والأسمدة والهيدروجين والكهرباء من الدول غير الأعضاء في الاتحاد الأوروبي. وعلى المصدّرين التونسيين تقديم بيانات كربون مُضمَّن موثّقة لكل شحنة أو دفع معدلات CBAM الافتراضية — التي تفترض أسوأ كثافة ممكنة.',
    points: [
      'بدأ الإبلاغ التدريجي في الربع الرابع 2023 — إقرارات فصلية مطلوبة',
      'الالتزام المالي الكامل سارٍ منذ يناير 2026',
      'معدلات كثافة CBAM الافتراضية أعلى بنحو 30–60% من المعدلات الفعلية الموثّقة للمنتجين التونسيين',
      'تتيح البيانات الموثّقة استخدام كثافة المنشأة الفعلية — ما يخفض تكلفة CBAM مباشرة',
      'تنشئ فوتوكارب شهادات كثافة على مستوى الشحنة موثّقة وفق ISO 14064',
    ],
    timeline: [
      'تبدأ مرحلة الإبلاغ — إقرارات فصلية',
      'على المستوردين التسجيل في سجل CBAM الأوروبي',
      'الالتزام المالي الكامل — شهادات CBAM مطلوبة',
      'الإلغاء الكامل للمخصصات المجانية — انكشاف كامل على CBAM',
    ],
  },
  ifrs: {
    fullTitle: 'معايير الإبلاغ الدولية عن الاستدامة',
    tagline: 'أصبحت المخاطر المناخية متطلبًا للإبلاغ المالي.',
    desc: 'يتطلب IFRS S1 (الإفصاحات العامة عن الاستدامة) وS2 (الإفصاحات المناخية) من الشركات الإبلاغ عن المخاطر المناخية الجوهرية، والمخاطر المادية، ومخاطر التحول، والفرص المرتبطة بالمناخ في قوائمها المالية. وقد أصدرت هيئة السوق المالية التونسية (CMF) بالفعل إرشادات إفصاح ESG للشركات المدرجة، تمهيدًا لتبنٍّ كامل لمعيار IFRS S2.',
    points: [
      'مطلوب انبعاثات النطاق 1 و2 والنطاق 3 الجوهري',
      'تحليل سيناريوهات عبر مسارات 1.5°م و2°م',
      'تحديد المخاطر المادية (الحرارة، إجهاد المياه، الفيضانات)',
      'مخاطر التحول: تسعير الكربون، مخاطر الأصول العالقة',
      'تنشئ فوتوكارب تلقائيًا جداول تحديد IFRS S2 وحزم تحليل السيناريوهات',
    ],
    timeline: [
      'إلزامي للكيانات المدرجة في أستراليا والمملكة المتحدة والاتحاد الأوروبي',
      'هيئة السوق المالية التونسية تصدر أول إرشادات إفصاح ESG للشركات المدرجة',
      'تبنٍّ إقليمي أوسع لمعيار IFRS S2 جارٍ',
      'التقارب العالمي الكامل متوقع',
    ],
  },
  ncap: {
    fullTitle: 'التدقيق الطاقي الإلزامي — القانون عدد 2009-7',
    tagline: 'إلزامي اليوم — عدم الامتثال للتدقيق يكلّف حتى 50,000 دينار، والقيام به بشكل صحيح قد يموّل معظم الحل.',
    desc: 'يجعل القانون عدد 2009-7 المؤرَّخ في 9 فيفري 2009 وأمره التطبيقي عدد 2009-362 التدقيق الطاقي الدوري إلزاميًا لأي منشأة صناعية تستهلك 800 طن مكافئ نفط أو أكثر سنويًا — من أي قطاع — وللمنشآت الخدمية والنقل والسكنية التي تتجاوز 500 طن مكافئ نفط. وبموجب الفصل 7 من الأمر عدد 2017-983، يغطي صندوق الانتقال الطاقي (FTE) عندها 70% من تكلفة التدقيق، بحد أقصى 30,000 دينار، إضافة إلى نسبة تصل إلى 20% من استثمار الكفاءة الناتج، بناءً على الرأي الفني لـ ANME.',
    points: [
      'ينطبق على أي منشأة ≥800 طن مكافئ نفط سنويًا (≥500 للخدمات والنقل والسكن) — كل القطاعات، لا المصدّرين فقط',
      'غرامات عدم الامتثال: 20,000–50,000 دينار بموجب الأمر عدد 2009-2269',
      'دعم صندوق الانتقال الطاقي: 70% من تكلفة التدقيق، بحد أقصى 30,000 دينار، يُمنح بناءً على الرأي الفني لـ ANME (الفصل 7، الأمر عدد 2017-983)',
      'دعم إضافي يصل إلى 20% ينطبق عادةً على استثمار الكفاءة الناتج',
      'تُعِدّ فوتوكارب بيانات خط الأساس التي يحتاجها مدققك المُسجَّل لدى ANME وتبني ملف الدعم لصندوق الانتقال الطاقي — دون أن تحلّ محل المدقق المُرخَّص',
    ],
    timeline: [
      'القانون عدد 2009-7 والأمر عدد 2009-362 يجعلان التدقيق الطاقي الدوري إلزاميًا',
      'الأمر عدد 2009-2269 يحدد غرامات 20,000–50,000 دينار لعدم الامتثال',
      'الأمر عدد 2017-983 (الفصل 7) يحدد آلية دعم صندوق الانتقال الطاقي عبر ANME',
      'دخول CBAM الأوروبية وإقرار الكربون التونسي المرآوي على الواردات حيّز التنفيذ',
    ],
  },
}

const FRAMEWORKS_FR: Record<string, { title?: string; fullTitle: string; tagline: string; desc: string; points: string[]; timeline: string[] }> = {
  cbam: {
    title: 'MACF',
    fullTitle: 'Mécanisme d\'ajustement carbone aux frontières',
    tagline: "La taxe carbone frontalière européenne est pleinement en vigueur depuis janvier 2026.",
    desc: "Le MACF de l'UE impose un prix du carbone sur les importations d'acier, de ciment, d'aluminium, d'engrais, d'hydrogène et d'électricité en provenance de pays non membres de l'UE. Les exportateurs tunisiens doivent soumettre des données de carbone incorporé vérifiées par expédition ou payer les taux MACF par défaut — qui supposent le pire scénario d'intensité.",
    points: [
      'Le reporting progressif a débuté au T4 2023 — déclarations trimestrielles requises',
      'La responsabilité financière totale s\'applique depuis janvier 2026',
      'Les taux d\'intensité MACF par défaut sont environ 30 à 60 % supérieurs aux taux réels vérifiés des producteurs tunisiens',
      'Les données vérifiées permettent d\'utiliser l\'intensité réelle de l\'installation — réduisant directement le coût du MACF',
      'Photocarb génère des certificats d\'intensité vérifiés ISO 14064 au niveau de l\'expédition',
    ],
    timeline: [
      'La phase de reporting commence — déclarations trimestrielles',
      'Les importateurs doivent s\'enregistrer dans le registre MACF de l\'UE',
      'Responsabilité financière totale — certificats MACF requis',
      'Élimination complète des quotas gratuits — exposition MACF totale',
    ],
  },
  ifrs: {
    fullTitle: 'Normes internationales de reporting de durabilité',
    tagline: 'Le risque climatique est désormais une exigence de reporting financier.',
    desc: "IFRS S1 (divulgations générales de durabilité) et S2 (divulgations climatiques) exigent des entreprises qu'elles déclarent les risques climatiques importants, les risques physiques, les risques de transition et les opportunités liées au climat dans leurs états financiers. Le Conseil du Marché Financier tunisien a déjà publié des directives de reporting ESG pour les sociétés cotées, ouvrant la voie à une adoption complète d'IFRS S2.",
    points: [
      'Scopes 1, 2 et Scope 3 important requis',
      'Analyse de scénarios selon les trajectoires 1,5 °C et 2 °C',
      "Quantification des risques physiques (chaleur, stress hydrique, inondations)",
      "Risque de transition : tarification carbone, risque d'actifs échoués",
      'Photocarb génère automatiquement les tableaux de quantification IFRS S2 et les dossiers d\'analyse de scénarios',
    ],
    timeline: [
      'Obligatoire pour les entités cotées en Australie, au Royaume-Uni et dans l\'UE',
      'Le CMF publie ses premières directives de reporting ESG pour les sociétés cotées tunisiennes',
      "Adoption régionale plus large d'IFRS S2 en cours",
      'Convergence mondiale complète attendue',
    ],
  },
  ncap: {
    fullTitle: "Audit énergétique obligatoire — Loi n° 2009-7",
    tagline: "Contraignant dès aujourd'hui — la non-conformité à l'audit coûte jusqu'à 50 000 TND, bien le faire peut financer l'essentiel de la solution.",
    desc: "La loi n° 2009-7 du 9 février 2009 et son décret d'application n° 2009-362 rendent l'audit énergétique périodique obligatoire pour toute installation industrielle consommant 800 tonnes équivalent pétrole (TEP) ou plus par an — quel que soit le secteur — et pour les établissements tertiaires, de transport ou résidentiels au-delà de 500 TEP. En vertu de l'article 7 du décret n° 2017-983, le Fonds de Transition Énergétique (FTE) couvre alors 70 % du coût de l'audit, plafonné à 30 000 TND, plus jusqu'à 20 % de l'investissement d'efficacité qui en résulte, sur avis technique de l'ANME.",
    points: [
      'S\'applique à toute installation ≥800 TEP/an (≥500 TEP pour le tertiaire, le transport, le résidentiel) — tous secteurs, pas seulement les exportateurs',
      "Amendes de non-conformité : 20 000 à 50 000 TND en vertu du décret n° 2009-2269",
      "Subvention FTE : 70 % du coût de l'audit, plafonné à 30 000 TND, accordée sur avis technique de l'ANME (Art. 7, décret n° 2017-983)",
      "Une subvention supplémentaire jusqu'à 20 % s'applique généralement à l'investissement d'efficacité qui en résulte",
      "Photocarb prépare la référence de consommation dont votre auditeur agréé par l'ANME a besoin et construit le dossier pour le fichier FTE — sans remplacer l'auditeur agréé",
    ],
    timeline: [
      "La loi n° 2009-7 et le décret n° 2009-362 rendent l'audit énergétique périodique obligatoire",
      "Le décret n° 2009-2269 fixe des amendes de 20 000 à 50 000 TND en cas de non-conformité",
      "Le décret n° 2017-983 (Art. 7) établit le mécanisme de subvention du FTE via l'ANME",
      "Le MACF européen et la déclaration carbone miroir de la Tunisie sur les importations entrent tous deux en vigueur",
    ],
  },
}

function localizeFramework(fw: typeof FRAMEWORKS[0], lang: 'en' | 'fr' | 'ar') {
  if (lang === 'en') return fw
  const a = lang === 'ar' ? FRAMEWORKS_AR[fw.id] : FRAMEWORKS_FR[fw.id]
  if (!a) return fw
  return {
    ...fw,
    title: a.title ?? fw.title,
    fullTitle: a.fullTitle,
    tagline: a.tagline,
    desc: a.desc,
    points: a.points,
    timeline: fw.timeline.map((item, i) => ({ ...item, label: a.timeline[i] ?? item.label })),
  }
}

export default function CompliancePage() {
  const { lang, t } = useLang()
  useDocumentMeta(t('meta.compliance.title'), t('meta.compliance.desc'))
  return (
    <>
      <ComplianceHero />
      <CertMarquee />
      {FRAMEWORKS.map((fw, i) => (
        <FrameworkBlock key={fw.id} fw={localizeFramework(fw, lang)} flip={i % 2 === 1} />
      ))}
      <RegulationQuiz />
      <RegulationExplorer />
      <FinalCTA />
    </>
  )
}

function ComplianceHero() {
  const { t } = useLang()
  return (
    <section className="pt-32 pb-20 bg-[var(--color-bg)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, color-mix(in srgb, var(--color-primary) 7%, transparent) 0%, transparent 55%)' }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[820px]">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-5 block" style={{ fontFamily: 'var(--font-body)' }}>
            — {t('compliancePage.eyebrow')}
          </span>
          <h1 className="text-[52px] lg:text-[68px] leading-[1.04] text-[var(--color-text-primary)] mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
            {t('compliancePage.title')}{' '}
            <em className="italic font-normal text-[var(--color-primary)]">{t('compliancePage.titleAccent')}</em>
          </h1>
          <p className="text-[18px] leading-relaxed text-[var(--color-text-secondary)] max-w-[600px]" style={{ fontFamily: 'var(--font-body)' }}>
            {t('compliancePage.subtitle')}
          </p>
        </div>
      </div>
    </section>
  )
}

function FrameworkBlock({ fw, flip }: { fw: typeof FRAMEWORKS[0]; flip: boolean }) {
  const { ref, visible } = useInView(0.12)
  const { t } = useLang()
  return (
    <section
      id={fw.id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-16 ${flip ? 'bg-[var(--color-bg-secondary)]' : 'bg-[var(--color-bg)]'}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`grid lg:grid-cols-2 gap-14 items-start`}>
          {/* Left — content */}
          <div className={`relative ${flip ? 'lg:order-2' : ''} fade-up ${visible ? 'visible' : ''}`}>
            <div
              className="absolute -top-6 -left-4 text-[160px] font-bold leading-none pointer-events-none select-none gradient-numeral opacity-[0.07]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {fw.num}
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[28px] font-bold"
                  style={{ color: fw.color, fontFamily: 'var(--font-display)' }}
                >
                  {fw.title}
                </span>
                <span className="text-[11px] font-semibold tracking-[0.15em] text-[var(--color-text-secondary)] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                  {fw.fullTitle}
                </span>
              </div>
              <h2 className="text-[32px] font-bold leading-tight text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                <em className="italic font-normal" style={{ color: fw.color }}>{fw.tagline}</em>
              </h2>
              <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)] mb-7" style={{ fontFamily: 'var(--font-body)' }}>{fw.desc}</p>
              <ul className="space-y-3 mb-8">
                {fw.points.map(p => (
                  <li key={p} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: fw.color }} />
                    <span className="text-[14px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-[14px] font-semibold"
                style={{ color: fw.color, fontFamily: 'var(--font-body)' }}
              >
                {t('compliancePage.getAssessment').replace('{title}', fw.title)} →
              </a>
            </div>
          </div>

          {/* Right — timeline */}
          <div className={`${flip ? 'lg:order-1' : ''} fade-up ${visible ? 'visible' : ''} stagger-2`}>
            <div className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-5" style={{ fontFamily: 'var(--font-body)' }}>
              {t('compliancePage.keyDeadlines')}
            </div>
            <div className="space-y-4">
              {fw.timeline.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      item.done
                        ? 'text-white border-current'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)]'
                    }`}
                    style={{
                      background: item.done ? fw.color : undefined,
                      borderColor: item.done ? fw.color : undefined,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {item.done ? <IconCheck size={16} strokeWidth={2.4} /> : <IconCircleDot size={14} strokeWidth={1.8} />}
                  </div>
                  <div className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3">
                    <div className="text-[11px] font-bold mb-0.5" style={{ color: fw.color, fontFamily: 'var(--font-body)' }}>{item.date}</div>
                    <div className="text-[13px] text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
