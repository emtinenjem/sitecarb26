import { useLang } from '../i18n/LanguageContext'

const WORDMARK_GRADIENT =
  'linear-gradient(90deg, var(--color-navy) 0%, var(--color-primary) 100%)'

interface Props {
  markSize?: number
  showWordmark?: boolean
  wordmarkClassName?: string
  className?: string
}

/** Real Photocarb mark (public/images/logo.png) + gradient wordmark sampled from the logo's own colors. */
export default function PhotoCarbLogo({ markSize = 40, showWordmark = true, wordmarkClassName = '', className = '' }: Props) {
  const { lang } = useLang()
  const wordmark = lang === 'ar' ? 'فوتوكارب' : 'Photocarb'
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/images/logo.png"
        alt="Photocarb"
        width={markSize}
        height={markSize}
        className="shrink-0 object-contain"
        style={{ width: markSize, height: markSize }}
      />
      {showWordmark && (
        <span
          className={`font-bold text-[21px] tracking-tight bg-clip-text text-transparent leading-none ${wordmarkClassName}`}
          style={{ backgroundImage: WORDMARK_GRADIENT, fontFamily: 'var(--font-display)' }}
        >
          {wordmark}
        </span>
      )}
    </span>
  )
}
