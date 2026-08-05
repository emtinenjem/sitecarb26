import CertMarquee from '../components/CertMarquee'
import AchievementsMap from '../components/AchievementsMap'
import Partners from '../components/Partners'
import FinalCTA from '../components/FinalCTA'
import { useInView } from '../hooks/useInView'
import { useOdometer } from '../hooks/useOdometer'
import { useState } from 'react'
import { IconFactory, IconGlobe, IconChart } from '../components/icons'
import { TunisiaFlag } from '../components/Flags'
import { useLang } from '../i18n/LanguageContext'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useBreadcrumbJsonLd } from '../hooks/useBreadcrumbJsonLd'

const CEO_MESSAGE = {
  initials: 'IJ',
  color: 'var(--color-primary)',
  en: {
    name: 'Imtinen Jemaa',
    role: 'Founder & Chief Executive Officer (CEO)',
    lead: 'We created Photocarb with one ambition: to turn the complexity of carbon into decisions that are simple, intelligent, and accessible.',
    paragraphs: [
      'Climate change is no longer a distant reality. It is already shaping how we produce, how we consume, and how we build our future.',
      'At Photocarb, our story was born from a deep conviction: every company, whatever its size, should have the means to understand its impact and the power to act on it.',
      'We created Photocarb with one ambition: to turn the complexity of carbon into decisions that are simple, intelligent, and accessible. Because behind every tonne of CO₂ measured lies an opportunity for improvement, an innovation to develop, and a future to protect.',
      'We believe the ecological transition should not be experienced as a constraint, but as a new way of imagining growth — one that is more responsible, more efficient, and more sustainable.',
      'Through our platform, we combine the power of technology, artificial intelligence, and climate expertise to guide companies on a journey where every data point becomes an action, and every action becomes a positive impact.',
      'Our mission goes beyond measuring emissions. We want to build a movement where companies become agents of change, where economic performance and environmental responsibility advance together.',
      'The low-carbon future will not be built tomorrow. It is being built today, through courageous decisions, innovative solutions, and a collective will to act.',
      'Thank you to every company that trusts us and chooses to be part of this transformation.',
    ],
  },
  ar: {
    name: 'امتنان جماعة',
    role: 'المؤسِّسة والرئيسة التنفيذية (CEO)',
    lead: 'أنشأنا فوتوكارب بطموح واحد: تحويل تعقيد الكربون إلى قرارات بسيطة وذكية ومتاحة للجميع.',
    paragraphs: [
      'لم يعد تغيّر المناخ حقيقة بعيدة. إنه يُشكّل بالفعل طريقة إنتاجنا واستهلاكنا وبناء مستقبلنا.',
      'في فوتوكارب، وُلدت قصتنا من قناعة عميقة: يجب أن يكون لكل شركة، مهما كان حجمها، الوسائل لفهم أثرها والقدرة على التصرّف بشكل ملموس.',
      'أنشأنا فوتوكارب بطموح واحد: تحويل تعقيد الكربون إلى قرارات بسيطة وذكية ومتاحة للجميع. لأنه خلف كل طن من ثاني أكسيد الكربون المُقاس، توجد فرصة للتحسين، وابتكار يجب تطويره، ومستقبل يستحق الحماية.',
      'نؤمن بأن التحوّل البيئي يجب ألا يُعاش كقيد، بل كطريقة جديدة لتخيّل النمو — نموّ أكثر مسؤولية وكفاءة واستدامة.',
      'من خلال منصتنا، نجمع بين قوة التقنية والذكاء الاصطناعي والخبرة المناخية لمرافقة الشركات في مسار تتحوّل فيه كل بيانة إلى إجراء، وكل إجراء إلى أثر إيجابي.',
      'رسالتنا تتجاوز قياس الانبعاثات. نريد خلق حركة تصبح فيها الشركات فاعلة في التغيير، حيث يتقدّم الأداء الاقتصادي والمسؤولية البيئية معًا.',
      'لن يُبنى المستقبل منخفض الكربون غدًا. إنه يُبنى اليوم، بقرارات جريئة وحلول مبتكرة وإرادة جماعية للعمل.',
      'شكرًا لكل الشركات التي تثق بنا وتختار أن تكون جزءًا من هذا التحوّل.',
    ],
  },
  fr: {
    name: 'Imtinen Jemaa',
    role: 'Fondatrice et Directrice Générale (CEO)',
    lead: 'Nous avons créé PhotoCarb avec une ambition : transformer la complexité du carbone en décisions simples, intelligentes et accessibles.',
    paragraphs: [
      'Le changement climatique n’est plus une réalité lointaine. Il façonne déjà notre manière de produire, de consommer et de construire notre avenir.',
      'Chez PhotoCarb, notre histoire est née d’une conviction profonde : chaque entreprise, quelle que soit sa taille, doit avoir les moyens de comprendre son impact et le pouvoir d’agir concrètement.',
      'Nous avons créé PhotoCarb avec une ambition : transformer la complexité du carbone en décisions simples, intelligentes et accessibles. Parce que derrière chaque tonne de CO₂ mesurée, il existe une opportunité d’amélioration, une innovation à développer et un avenir à préserver.',
      'Nous croyons que la transition écologique ne doit pas être vécue comme une contrainte, mais comme une nouvelle façon d’imaginer la croissance : plus responsable, plus efficace et plus durable.',
      'À travers notre plateforme, nous combinons la puissance de la technologie, l’intelligence artificielle et l’expertise climatique pour accompagner les entreprises dans un parcours où chaque donnée devient une action, et chaque action devient un impact positif.',
      'Notre mission dépasse la mesure des émissions. Nous voulons créer un mouvement où les entreprises deviennent des acteurs du changement, où la performance économique et la responsabilité environnementale avancent ensemble.',
      'L’avenir bas carbone ne se construira pas demain. Il se construit aujourd’hui, avec des décisions courageuses, des solutions innovantes et une volonté collective d’agir.',
      'Merci à toutes les entreprises qui nous font confiance et qui choisissent de faire partie de cette transformation.',
    ],
  },
}

const VALUES = [
  { num: '01', titleKey: 'about.val1.title', emphasisKey: 'about.val1.emphasis', descKey: 'about.val1.desc', color: 'var(--color-primary)' },
  { num: '02', titleKey: 'about.val2.title', emphasisKey: 'about.val2.emphasis', descKey: 'about.val2.desc', color: 'var(--color-lime)' },
  { num: '03', titleKey: 'about.val3.title', emphasisKey: 'about.val3.emphasis', descKey: 'about.val3.desc', color: 'var(--color-violet)' },
  { num: '04', titleKey: 'about.val4.title', emphasisKey: 'about.val4.emphasis', descKey: 'about.val4.desc', color: 'var(--color-primary)' },
]

const VISION_PILLARS = [
  { icon: IconFactory, titleKey: 'about.vision.p1.title', descKey: 'about.vision.p1.desc' },
  { icon: IconGlobe, titleKey: 'about.vision.p2.title', descKey: 'about.vision.p2.desc' },
  { icon: IconChart, titleKey: 'about.vision.p3.title', descKey: 'about.vision.p3.desc' },
]

export default function AboutPage() {
  const { t } = useLang()
  useDocumentMeta(t('meta.about.title'), t('meta.about.desc'))
  useBreadcrumbJsonLd([
    { name: t('legalPage.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
  ])

  return (
    <>
      <AboutHero />
      <CertMarquee />
      <OriginStory />
      <AchievementsMap />
      <CEOMessageSection />
      <ValuesSection />
      <Vision2030 />
      <Partners />
      <FinalCTA />
    </>
  )
}

function AboutHero() {
  const { t } = useLang()
  return (
    <section className="pt-32 pb-20 bg-[var(--color-bg)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, color-mix(in srgb, var(--color-lime) 6%, transparent) 0%, transparent 55%)' }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[820px]">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-5 block" style={{ fontFamily: 'var(--font-body)' }}>
            — {t('about.heroEyebrow')}
          </span>
          <h1 className="text-[52px] lg:text-[68px] leading-[1.04] text-[var(--color-text-primary)] mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
            {t('about.heroTitle')}{' '}
            <em className="italic font-normal text-[var(--color-primary)]">{t('about.heroTitleAccent')}</em>
          </h1>
          <p className="text-[18px] leading-relaxed text-[var(--color-text-secondary)] max-w-[600px]" style={{ fontFamily: 'var(--font-body)' }}>
            {t('about.heroSubtitle')}
          </p>
        </div>
      </div>
    </section>
  )
}

function OriginStory() {
  const { ref, visible } = useInView(0.2)
  const { t } = useLang()
  const founded = useOdometer(2024, visible, 1400)
  const rd = useOdometer(2025, visible, 1600)
  const modules = useOdometer(7, visible, 1200)

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`grid lg:grid-cols-[1.5fr_1fr] gap-14 items-start fade-up ${visible ? 'visible' : ''}`}>
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block" style={{ fontFamily: 'var(--font-body)' }}>{t('about.storyEyebrow')}</span>
            <h2 className="text-[38px] leading-tight text-[var(--color-text-primary)] mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {t('about.storyTitle')}{' '}
              <em className="italic font-normal text-[var(--color-text-secondary)]">{t('about.storyTitleAccent')}</em>
            </h2>
            <div className="space-y-5">
              <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('about.story.p1')}</p>
              <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('about.story.p2')}</p>
              <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('about.story.p3')}</p>
              <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('about.story.p4')}</p>
              <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('about.story.p5')}</p>
              <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t('about.story.p6')}</p>
            </div>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5 lg:sticky lg:top-24">
            {[
              { n: founded, suffix: '', label: t('about.stat.founded') },
              { n: rd,      suffix: '', label: t('about.stat.rd') },
              { n: modules, suffix: '', label: t('about.stat.modules') },
            ].map(s => (
              <div key={s.label} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] text-center lg:text-start">
                <div className="text-[44px] font-bold leading-none text-[var(--color-primary)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {s.n}{s.suffix}
                </div>
                <div className="text-[12px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CEOMessageSection() {
  const { ref, visible } = useInView(0.15)
  const [expanded, setExpanded] = useState(false)
  const { t, lang } = useLang()
  const m = { ...CEO_MESSAGE, ...(CEO_MESSAGE[lang] ?? CEO_MESSAGE.en) }
  const closingLine = m.paragraphs[m.paragraphs.length - 1]

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden py-20"
      style={{ background: 'linear-gradient(165deg, var(--color-tint-teal), var(--color-bg) 55%)' }}
    >
      {/* Hex pattern motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <svg viewBox="0 0 1200 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 60 }).map((_, i) => {
            const col = i % 12
            const row = Math.floor(i / 12)
            const ox = col * 110 + (row % 2) * 55
            const oy = row * 94
            return (
              <polygon
                key={i}
                points={`${ox + 55},${oy} ${ox + 110},${oy + 31} ${ox + 110},${oy + 79} ${ox + 55},${oy + 110} ${ox},${oy + 79} ${ox},${oy + 31}`}
                fill="none" stroke="var(--color-primary)" strokeWidth="1"
              />
            )
          })}
        </svg>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 relative">
        <div className={`text-center mb-12 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: m.color, fontFamily: 'var(--font-body)' }}>
            — {t('about.ceoMessage')}
          </span>
          <blockquote
            className="text-[28px] lg:text-[36px] leading-[1.25] text-[var(--color-text-primary)] max-w-[880px] mx-auto"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            <span className="not-italic" style={{ color: m.color }}>“</span>
            <em className="italic font-normal">{m.lead}</em>
            <span className="not-italic" style={{ color: m.color }}>”</span>
          </blockquote>
        </div>

        {/* Signature card */}
        <div className={`flex items-center justify-center gap-4 mb-10 fade-up ${visible ? 'visible' : ''} stagger-2`}>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
            style={{ background: m.color, fontFamily: 'var(--font-body)' }}
          >
            {m.initials}
          </div>
          <div className="text-start">
            <div className="text-[18px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>{m.name}</div>
            <div className="text-[13px] font-medium" style={{ color: m.color, fontFamily: 'var(--font-body)' }}>{m.role}</div>
          </div>
        </div>

        {/* Full message */}
        <div className={`max-w-[780px] mx-auto fade-up ${visible ? 'visible' : ''} stagger-3`}>
          <div className="space-y-4">
            {(expanded ? m.paragraphs : m.paragraphs.slice(0, 2)).map((p, i) => (
              <p
                key={i}
                className={`text-[15px] leading-relaxed ${p === closingLine ? 'font-semibold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {p}
              </p>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-semibold px-5 py-2.5 rounded-full border transition-colors"
              style={{ color: m.color, borderColor: `color-mix(in srgb, ${m.color} 35%, transparent)`, fontFamily: 'var(--font-body)' }}
            >
              {expanded ? t('common.showLess') : t('common.readFullMessage')}
              <svg
                width="13" height="13" viewBox="0 0 12 12" fill="none"
                className="transition-transform duration-200"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const { ref, visible } = useInView(0.1)
  const { t } = useLang()
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-20">
        <div className={`text-center mb-6 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block" style={{ fontFamily: 'var(--font-body)' }}>{t('about.valuesEyebrow')}</span>
          <h2 className="text-[40px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('about.valuesTitle')}
          </h2>
        </div>
      </div>
      {VALUES.map((v, i) => (
        <ValueBlock key={v.num} value={v} flip={i % 2 === 1} visible={visible} delay={i * 0.1} />
      ))}
    </section>
  )
}

function ValueBlock({ value: v, flip, visible, delay }: { value: typeof VALUES[0]; flip: boolean; visible: boolean; delay: number }) {
  const { t } = useLang()
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
      <div className={`grid lg:grid-cols-2 gap-12 items-center ${flip ? '' : ''}`}>
        <div className={`relative overflow-hidden ${flip ? 'lg:order-2' : ''} fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}s` }}>
          <div className="absolute -top-4 -start-4 text-[90px] sm:text-[130px] lg:text-[160px] font-bold leading-none pointer-events-none select-none gradient-numeral opacity-[0.07]" style={{ fontFamily: 'var(--font-display)' }}>
            {v.num}
          </div>
          <div className="relative">
            <h3 className="text-[38px] font-bold leading-tight text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {t(v.titleKey)}{' '}
              <em className="italic font-normal" style={{ color: v.color }}>{t(v.emphasisKey)}</em>
            </h3>
            <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{t(v.descKey)}</p>
          </div>
        </div>
        <div className={`${flip ? 'lg:order-1' : ''} fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay + 0.15}s` }}>
          <div
            className="h-48 rounded-3xl flex items-center justify-center"
            style={{ background: `color-mix(in srgb, ${v.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${v.color} 22%, transparent)` }}
          >
            <span className="text-8xl opacity-20">{v.num}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Vision2030() {
  const { ref, visible } = useInView(0.2)
  const { t } = useLang()
  const pct = useOdometer(45, visible, 1800)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, var(--color-tunisia-tint), var(--color-bg-secondary) 60%)' }}
    >
      {/* Hex background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 32 }).map((_, i) => {
            const col = i % 8
            const row = Math.floor(i / 8)
            const ox = col * 100 + (row % 2) * 50
            const oy = row * 86
            return (
              <polygon
                key={i}
                points={`${ox+50},${oy} ${ox+100},${oy+28} ${ox+100},${oy+72} ${ox+50},${oy+100} ${ox},${oy+72} ${ox},${oy+28}`}
                fill="none" stroke="var(--color-tunisia)" strokeWidth="1"
              />
            )
          })}
        </svg>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <div className={`text-center mb-14 fade-up ${visible ? 'visible' : ''}`}>
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <TunisiaFlag width={22} height={16} />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--color-tunisia)', fontFamily: 'var(--font-body)' }}>
              {t('about.vision.eyebrow')}
            </span>
            <span className="tunisia-rule" />
          </div>
          <h2 className="text-[44px] text-[var(--color-text-primary)] leading-tight mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            <span className="text-[var(--color-primary)]">-{pct}{t('about.vision.unit')}</span>{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('about.vision.by')}</em>
          </h2>
          <p className="text-[16px] text-[var(--color-text-secondary)] max-w-[580px] mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            {t('about.vision.desc')}
          </p>
        </div>

        <div className={`grid lg:grid-cols-3 gap-5 fade-up ${visible ? 'visible' : ''} stagger-2`}>
          {VISION_PILLARS.map(p => (
            <div key={p.titleKey} className="card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--color-tint-teal)', color: 'var(--color-primary)' }}>
                <p.icon size={22} strokeWidth={1.6} />
              </div>
              <h3 className="text-[18px] font-semibold text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>{t(p.titleKey)}</h3>
              <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{t(p.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
