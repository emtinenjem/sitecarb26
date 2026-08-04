import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useLang } from '../i18n/LanguageContext'
import { IconNetwork, IconBuilding, IconBolt, IconTelescope } from './icons'

type CategoryKey = 'all' | 'institutions' | 'innovation' | 'academic'

const CATEGORY_COLOR: Record<Exclude<CategoryKey, 'all'>, string> = {
  institutions: 'var(--color-navy)',
  innovation: 'var(--color-primary)',
  academic: 'var(--color-violet)',
}

const CATEGORY_ICON: Record<Exclude<CategoryKey, 'all'>, typeof IconBuilding> = {
  institutions: IconBuilding,
  innovation: IconBolt,
  academic: IconTelescope,
}

/**
 * Drop a logo file at /public/images/partners/{slug}.{ext} and it renders
 * automatically — falls back to a monogram badge until the real file exists.
 */
const PARTNERS: { name: string; slug: string; ext: string; category: Exclude<CategoryKey, 'all'> }[] = [
  { name: 'QSTP', slug: 'qstp', ext: 'png', category: 'innovation' },
  { name: 'Qatar Foundation', slug: 'qatar-foundation', ext: 'png', category: 'institutions' },
  { name: 'Qatar Financial Centre', slug: 'qatar-financial-centre', ext: 'png', category: 'institutions' },
  { name: 'Qatar Chamber', slug: 'qatar-chamber', ext: 'png', category: 'institutions' },
  { name: 'Ministry of Commerce and Industry', slug: 'moci', ext: 'png', category: 'institutions' },
  { name: 'FGCCC', slug: 'fgccc', ext: 'jpg', category: 'institutions' },
  { name: 'IPTIC', slug: 'iptic', ext: 'png', category: 'innovation' },
  { name: 'RedStart', slug: 'redstart', ext: 'png', category: 'innovation' },
  { name: 'ISSTE', slug: 'isste', ext: 'png', category: 'academic' },
  { name: 'University of Sousse', slug: 'university-of-sousse', ext: 'png', category: 'academic' },
  { name: 'University della Calabria', slug: 'university-della-calabria', ext: 'png', category: 'academic' },
  { name: 'PEESO', slug: 'peeso', ext: 'png', category: 'innovation' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.03 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.18 } },
}

function initials(name: string) {
  const words = name.split(' ').filter(w => w.length > 1 || /[A-Z]/.test(w))
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

function PartnerCard({
  name, slug, ext, category, index, visible,
}: { name: string; slug: string; ext: string; category: Exclude<CategoryKey, 'all'>; index: number; visible: boolean }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const color = CATEGORY_COLOR[category]

  return (
    <motion.div
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      exit="exit"
      whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="group relative flex items-center gap-3 rounded-full pl-2.5 pr-5 py-2.5 backdrop-blur-md transition-colors duration-300"
      style={{
        background: 'color-mix(in srgb, var(--color-surface) 65%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-text-primary) 10%, transparent)',
        boxShadow: '0 1px 2px color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
      }}
      title={name}
    >
      {/* Hover glow ring in the category color */}
      <div
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${color}, 0 6px 18px color-mix(in srgb, ${color} 28%, transparent)` }}
      />

      {/* Category dot */}
      <span className="relative h-1.5 w-1.5 rounded-full shrink-0" style={{ background: color }} />

      {/* Logo coin */}
      <div
        className="relative h-9 w-9 shrink-0 flex items-center justify-center rounded-full overflow-hidden"
        style={{ background: 'var(--color-surface)', boxShadow: '0 1px 2px color-mix(in srgb, var(--color-text-primary) 10%, transparent)' }}
      >
        {!failed && (
          <img
            src={`/images/partners/${slug}.${ext}`}
            alt={name}
            className="max-h-6 max-w-6 object-contain"
            style={{ display: loaded ? 'block' : 'none' }}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
        {(failed || !loaded) && (
          <span
            className="w-full h-full rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
            style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color, fontFamily: 'var(--font-body)', display: !failed && loaded ? 'none' : 'flex' }}
          >
            {initials(name)}
          </span>
        )}
      </div>

      <span className="relative text-[13px] font-semibold text-[var(--color-text-primary)] whitespace-nowrap" style={{ fontFamily: 'var(--font-body)' }}>
        {name}
      </span>
    </motion.div>
  )
}

export default function Partners() {
  const { ref, visible } = useInView(0.1)
  const { lang } = useLang()
  const [filter, setFilter] = useState<CategoryKey>('all')

  const L = lang === 'ar'
    ? {
        eyebrow: 'شركاؤنا',
        title: 'جزء من ',
        titleAccent: 'منظومة أوسع.',
        subtitle: 'من حاضنات الابتكار القطرية إلى الجامعات وغرف التجارة الإقليمية التي رافقت مسيرة فوتوكارب.',
        categories: { all: 'الكل', institutions: 'مؤسسات', innovation: 'الابتكار والاحتضان', academic: 'أكاديمي وبحثي' },
      }
    : lang === 'fr'
    ? {
        eyebrow: 'Notre écosystème',
        title: "Partie d'un ",
        titleAccent: 'réseau plus large.',
        subtitle: "Des organismes d'innovation qataris aux universités régionales et chambres de commerce qui ont accompagné le parcours de Photocarb.",
        categories: { all: 'Tous', institutions: 'Institutions', innovation: 'Innovation & Incubation', academic: 'Académique & Recherche' },
      }
    : {
        eyebrow: 'Our Ecosystem',
        title: 'Part of a ',
        titleAccent: 'Wider Network.',
        subtitle: "From Qatari innovation bodies to regional universities and chambers of commerce that have supported Photocarb's journey.",
        categories: { all: 'All', institutions: 'Institutions', innovation: 'Innovation & Incubation', academic: 'Academic & Research' },
      }

  const filtered = filter === 'all' ? PARTNERS : PARTNERS.filter(p => p.category === filter)

  const filterKeys: CategoryKey[] = ['all', 'institutions', 'innovation', 'academic']

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative overflow-hidden bg-[var(--color-bg)] py-24">
      {/* Ambient color-blob background — distinct from the hex motif used elsewhere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full opacity-[0.10] blur-3xl" style={{ background: 'var(--color-primary)' }} />
        <div className="absolute top-10 -right-24 w-[380px] h-[380px] rounded-full opacity-[0.09] blur-3xl" style={{ background: 'var(--color-violet)' }} />
        <div className="absolute -bottom-28 left-1/3 w-[440px] h-[440px] rounded-full opacity-[0.08] blur-3xl" style={{ background: 'var(--color-lime)' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <div className={`text-center mb-10 fade-up ${visible ? 'visible' : ''}`}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
            style={{ borderColor: 'color-mix(in srgb, var(--color-navy) 25%, transparent)', background: 'color-mix(in srgb, var(--color-navy) 6%, transparent)' }}
          >
            <IconNetwork size={13} strokeWidth={1.8} style={{ color: 'var(--color-navy)' }} />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-body)' }}>
              {L.eyebrow}
            </span>
          </span>
          <h2 className="text-[36px] lg:text-[42px] leading-tight text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {L.title}
            <span
              className="italic font-normal bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, var(--color-primary), var(--color-violet))' }}
            >
              {L.titleAccent}
            </span>
          </h2>
          <p className="text-[14.5px] text-[var(--color-text-secondary)] max-w-[600px] mx-auto mb-8" style={{ fontFamily: 'var(--font-body)' }}>
            {L.subtitle}
          </p>

          {/* Category filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {filterKeys.map((key) => {
              const active = filter === key
              const color = key === 'all' ? 'var(--color-primary)' : CATEGORY_COLOR[key]
              const Icon = key === 'all' ? null : CATEGORY_ICON[key]
              const count = key === 'all' ? PARTNERS.length : PARTNERS.filter(p => p.category === key).length
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-[12.5px] font-semibold transition-all duration-250"
                  style={{
                    fontFamily: 'var(--font-body)',
                    borderColor: active ? color : 'color-mix(in srgb, var(--color-text-primary) 12%, transparent)',
                    background: active ? `color-mix(in srgb, ${color} 12%, transparent)` : 'var(--color-surface)',
                    color: active ? color : 'var(--color-text-secondary)',
                  }}
                >
                  {Icon && <Icon size={13} strokeWidth={2} style={{ color: active ? color : 'currentColor' }} />}
                  {L.categories[key]}
                  <span
                    className="ml-0.5 min-w-[18px] px-1 rounded-full text-[10px] leading-[18px] font-bold"
                    style={{ background: active ? color : 'color-mix(in srgb, var(--color-text-primary) 8%, transparent)', color: active ? 'var(--color-surface)' : 'var(--color-text-secondary)' }}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <motion.div layout className="flex flex-wrap items-center justify-center gap-3 max-w-[1100px] mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <PartnerCard key={p.slug} name={p.name} slug={p.slug} ext={p.ext} category={p.category} index={i} visible={visible} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
