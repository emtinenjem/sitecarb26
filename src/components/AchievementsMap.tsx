import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useLang } from '../i18n/LanguageContext'
import { WORLD_VIEWBOX, COUNTRY_PATHS } from '../data/worldMap'
import { IconBadge, IconSparkle, IconGlobe, IconBuilding } from './icons'

const HUB = 'tn'

const ACHIEVEMENTS = [
  {
    icon: IconBadge, iconProps: { label: '1' }, color: 'var(--color-primary)',
    titleEn: '1st Place', titleFr: '1re place', titleAr: 'المركز الأول',
    locEn: 'Tunisia & Algeria', locFr: 'Tunisie et Algérie', locAr: 'تونس والجزائر',
    descEn: 'Photocarb placed 1st in a regional competition spanning Tunisia and Algeria, recognizing the platform\'s approach to carbon-intelligence software.',
    descFr: "Photocarb s'est classée 1re dans une compétition régionale couvrant la Tunisie et l'Algérie, reconnaissant l'approche de la plateforme en matière de logiciel de veille carbone.",
    descAr: 'حلّت فوتوكارب في المركز الأول في مسابقة إقليمية شملت تونس والجزائر، تقديرًا لمقاربة المنصة في برمجيات الذكاء الكربوني.',
  },
  {
    icon: IconBadge, iconProps: { label: '3' }, color: 'var(--color-violet)',
    titleEn: '3rd Place — Bronze', titleFr: '3e place — Bronze', titleAr: 'المركز الثالث — برونزية',
    locEn: 'Morocco & BRICS (China)', locFr: 'Maroc et BRICS (Chine)', locAr: 'المغرب وبريكس (الصين)',
    descEn: 'A bronze, third-place finish at a competition held across Morocco and the BRICS circuit in China.',
    descFr: "Une troisième place, médaille de bronze, lors d'une compétition organisée au Maroc et dans le circuit BRICS en Chine.",
    descAr: 'مركز ثالث وميدالية برونزية في مسابقة أُقيمت بين المغرب ومسار بريكس في الصين.',
  },
  {
    icon: IconSparkle, color: 'var(--color-info)',
    titleEn: 'Best Innovation Award of the Year', titleFr: "Prix de la meilleure innovation de l'année", titleAr: 'جائزة أفضل ابتكار للعام',
    locEn: 'Kenya', locFr: 'Kenya', locAr: 'كينيا',
    descEn: "Named Best Innovation of the Year in Kenya, recognizing Photocarb's carbon-intelligence platform on the African stage.",
    descFr: "Nommée meilleure innovation de l'année au Kenya, reconnaissant la plateforme de veille carbone de Photocarb sur la scène africaine.",
    descAr: 'حازت فوتوكارب جائزة أفضل ابتكار للعام في كينيا، تقديرًا لمنصتها للذكاء الكربوني على المستوى الأفريقي.',
  },
  {
    icon: IconGlobe, color: 'var(--color-lime)',
    titleEn: 'Featured Participant', titleFr: 'Participation à l\'honneur', titleAr: 'مشاركة مميزة',
    locEn: 'Italy & Dubai', locFr: 'Italie et Dubaï', locAr: 'إيطاليا ودبي',
    descEn: "Selected to take part in innovation and sustainability programs in Italy and Dubai, extending Photocarb's network beyond North Africa.",
    descFr: "Sélectionnée pour participer à des programmes d'innovation et de durabilité en Italie et à Dubaï, étendant le réseau de Photocarb au-delà de l'Afrique du Nord.",
    descAr: 'اختيرت فوتوكارب للمشاركة في برامج ابتكار واستدامة في إيطاليا ودبي، موسّعةً شبكتها إلى ما وراء شمال أفريقيا.',
  },
  {
    icon: IconBuilding, color: 'var(--color-tunisia)',
    titleEn: 'Headquarters & Gulf Office', titleFr: 'Siège social et bureau du Golfe', titleAr: 'المقر الرئيسي والمكتب الخليجي',
    locEn: 'Sousse, Tunisia & Doha, Qatar', locFr: 'Sousse, Tunisie et Doha, Qatar', locAr: 'سوسة، تونس والدوحة، قطر',
    descEn: "Photocarb's home base: engineering and delivery run from Sousse, Tunisia, with a Gulf office in Doha, Qatar.",
    descFr: "La base de Photocarb : l'ingénierie et la livraison sont pilotées depuis Sousse, en Tunisie, avec un bureau du Golfe à Doha, au Qatar.",
    descAr: 'قاعدة فوتوكارب: الهندسة والتنفيذ ينطلقان من سوسة، تونس، مع مكتب خليجي في الدوحة، قطر.',
  },
]

/** Centroids read from the live COUNTRY_PATHS bounding boxes (see worldMap.ts), in the shared WORLD_VIEWBOX coordinate space. */
const MARKERS = [
  { iso: 'tn', cx: 429.9, cy: 443.3, hub: true, color: 'var(--color-tunisia)', achIndex: 4 },
  { iso: 'dz', cx: 411.4, cy: 458.9, color: 'var(--color-primary)', achIndex: 0 },
  { iso: 'ma', cx: 384.6, cy: 458.7, color: 'var(--color-violet)', achIndex: 1 },
  { iso: 'cn', cx: 635.1, cy: 419.2, color: 'var(--color-violet)', achIndex: 1 },
  { iso: 'ke', cx: 499.6, cy: 530.0, color: 'var(--color-info)', achIndex: 2 },
  { iso: 'it', cx: 435.3, cy: 420.7, color: 'var(--color-lime)', achIndex: 3 },
  { iso: 'ae', cx: 534.4, cy: 467.2, color: 'var(--color-lime)', achIndex: 3 },
  { iso: 'qa', cx: 528.3, cy: 464.9, color: 'var(--color-qatar)', achIndex: 4 },
]

function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const dist = Math.sqrt(dx * dx + dy * dy) || 1
  const offset = dist * 0.22
  const nx = -dy / dist
  const ny = dx / dist
  return `M ${x1},${y1} Q ${mx + nx * offset},${my + ny * offset} ${x2},${y2}`
}

export default function AchievementsMap() {
  const { ref, visible } = useInView(0.1)
  const { lang } = useLang()
  const [selected, setSelected] = useState<number | null>(null)

  const L = lang === 'ar'
    ? {
        eyebrow: 'حضور عالمي',
        title: 'معترف بها خارج حدود تونس.',
        subtitle: 'من سوسة إلى الجزائر والمغرب وكينيا والصين وإيطاليا ودبي — انقر على أي دولة لمعرفة القصة.',
        disclaimer: 'تكريمات ونتائج ذاتية التصريح من فوتوكارب في مسابقات ابتكار إقليمية وبرامج قطاعية؛ التفاصيل الكاملة للجهة المنظمة متاحة عند الطلب.',
      }
    : lang === 'fr'
    ? {
        eyebrow: 'Reconnaissance mondiale',
        title: 'Reconnue au-delà des frontières tunisiennes.',
        subtitle: "De Sousse à l'Algérie, au Maroc, au Kenya, à la Chine, à l'Italie et à Dubaï — cliquez sur un pays pour découvrir l'histoire.",
        disclaimer: "Distinctions et classements autodéclarés par Photocarb, obtenus lors de compétitions d'innovation régionales et de programmes sectoriels ; détails complets de l'organisateur disponibles sur demande.",
      }
    : {
        eyebrow: 'Global Recognition',
        title: 'Recognized Beyond Tunisia’s Borders.',
        subtitle: 'From Sousse to Algeria, Morocco, Kenya, China, Italy and Dubai — click any country to see the story.',
        disclaimer: 'Recognitions and rankings self-reported by Photocarb from regional innovation competitions and industry programs; full organizer details available on request.',
      }

  const hub = MARKERS.find(m => m.iso === HUB)!
  const toggle = (i: number) => setSelected(prev => (prev === i ? null : i))
  const aTitle = (a: typeof ACHIEVEMENTS[number]) => lang === 'ar' ? a.titleAr : lang === 'fr' ? a.titleFr : a.titleEn
  const aLoc = (a: typeof ACHIEVEMENTS[number]) => lang === 'ar' ? a.locAr : lang === 'fr' ? a.locFr : a.locEn
  const aDesc = (a: typeof ACHIEVEMENTS[number]) => lang === 'ar' ? a.descAr : lang === 'fr' ? a.descFr : a.descEn

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-10 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 block text-[var(--color-navy)]" style={{ fontFamily: 'var(--font-body)' }}>
            {L.eyebrow}
          </span>
          <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {L.title}
          </h2>
          <p className="text-[14.5px] text-[var(--color-text-secondary)] max-w-[600px] mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            {L.subtitle}
          </p>
        </div>

        <div className={`grid lg:grid-cols-[1.5fr_1fr] gap-6 items-start fade-up ${visible ? 'visible' : ''} stagger-2`}>
          {/* Animated map */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-3 lg:p-6 shadow-[var(--shadow-card)] overflow-hidden" dir="ltr">
            <svg viewBox={WORLD_VIEWBOX} className="w-full h-auto block">
              <defs>
                <radialGradient id="radar-sweep" cx="0%" cy="0%" r="100%">
                  <stop offset="0%" stopColor="var(--color-tunisia)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--color-tunisia)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Base map */}
              {Object.entries(COUNTRY_PATHS).map(([iso, d]) => (
                <path key={iso} d={d} fill="var(--color-border)" fillOpacity={0.55} stroke="var(--color-surface)" strokeWidth={0.3} />
              ))}

              {/* Rotating radar sweep, anchored on the Tunisia hub */}
              <g className="orbit-group" style={{ transformOrigin: `${hub.cx}px ${hub.cy}px` }}>
                <path d={`M ${hub.cx},${hub.cy} L ${hub.cx + 260},${hub.cy - 40} A 260 260 0 0 0 ${hub.cx + 180},${hub.cy - 190} Z`} fill="url(#radar-sweep)" />
              </g>

              {/* Arcs from hub to every other marker */}
              {MARKERS.filter(m => m.iso !== HUB).map(m => (
                <path
                  key={`arc-${m.iso}`}
                  d={arcPath(hub.cx, hub.cy, m.cx, m.cy)}
                  fill="none"
                  stroke={m.color}
                  strokeWidth={selected === m.achIndex ? 2 : 1.3}
                  strokeDasharray="5 6"
                  opacity={selected === null || selected === m.achIndex ? 0.85 : 0.25}
                  className="animate-dash-flow"
                  style={{ transition: 'opacity 0.2s, stroke-width 0.2s' }}
                />
              ))}

              {/* Highlighted countries + markers — clickable. Selected country(ies) painted last so the scale-up pop never gets clipped by a sibling. */}
              {(selected === null ? MARKERS : [...MARKERS].sort((a, b) => (a.achIndex === selected ? 1 : 0) - (b.achIndex === selected ? 1 : 0))).map(m => {
                const isSel = selected === m.achIndex
                const dimmed = selected !== null && !isSel
                return (
                  <g
                    key={m.iso}
                    onClick={() => toggle(m.achIndex)}
                    role="button"
                    tabIndex={0}
                    aria-label={aTitle(ACHIEVEMENTS[m.achIndex])}
                    style={{ cursor: 'pointer', opacity: dimmed ? 0.35 : 1, transition: 'opacity 0.2s', outline: 'none' }}
                  >
                    {COUNTRY_PATHS[m.iso] && (
                      <path
                        d={COUNTRY_PATHS[m.iso]}
                        fill={m.color}
                        fillOpacity={isSel ? 0.85 : 0.5}
                        stroke={m.color}
                        strokeWidth={isSel ? 1.4 : 0.6}
                        style={{
                          transform: isSel ? 'scale(1.6)' : 'scale(1)',
                          transformOrigin: `${m.cx}px ${m.cy}px`,
                          transformBox: 'view-box',
                          transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), fill-opacity 0.2s',
                        }}
                      />
                    )}
                    <circle cx={m.cx} cy={m.cy} r={m.hub ? 7 : 5} fill={m.color} className="animate-pulse-ring" style={{ animationDelay: `${(m.cx % 5) * 0.3}s` }} />
                    <circle cx={m.cx} cy={m.cy} r={m.hub ? 5 : 3.2} fill={m.color} stroke="var(--color-surface)" strokeWidth="1.2" />
                    <title>{aTitle(ACHIEVEMENTS[m.achIndex])}</title>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Achievement list — clickable, expands with description */}
          <div className="space-y-3">
            {ACHIEVEMENTS.map((a, i) => {
              const isSel = selected === i
              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggle(i)}
                  className={`rounded-xl border bg-[var(--color-surface)] px-4 py-3.5 card-hover cursor-pointer fade-up ${visible ? 'visible' : ''}`}
                  style={{
                    transitionDelay: `${0.05 * i}s`,
                    borderColor: isSel ? a.color : 'var(--color-border)',
                    boxShadow: isSel ? `0 0 0 1px ${a.color}` : 'none',
                    outline: 'none',
                  }}
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `color-mix(in srgb, ${a.color} 14%, transparent)`, color: a.color }}
                    >
                      {'iconProps' in a && a.iconProps
                        ? <a.icon {...a.iconProps} color={a.color} />
                        : <a.icon size={17} strokeWidth={1.7} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-bold text-[var(--color-text-primary)] leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                        {aTitle(a)}
                      </div>
                      <div className="text-[12.5px] text-[var(--color-text-secondary)] mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                        {aLoc(a)}
                      </div>
                    </div>
                    <svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      className="shrink-0 mt-1.5 transition-transform duration-200"
                      style={{ transform: isSel ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--color-text-secondary)' }}
                    >
                      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <AnimatePresence>
                    {isSel && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)] pt-3 mt-3 border-t border-[var(--color-border)]" style={{ fontFamily: 'var(--font-body)' }}>
                          {aDesc(a)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        <p className="text-[11.5px] text-[var(--color-text-secondary)] italic text-center mt-6 max-w-[560px] mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
          {L.disclaimer}
        </p>
      </div>
    </section>
  )
}
