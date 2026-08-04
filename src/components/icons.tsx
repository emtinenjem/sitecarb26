// Custom line-icon set for Photocarb — consistent 24x24 stroke grid, currentColor,
// hexagon/carbon brand motif. Replaces emoji icons used throughout the site.
import type { CSSProperties } from 'react'

export interface IconProps {
  size?: number
  className?: string
  strokeWidth?: number
  style?: CSSProperties
}

const base = (size = 20, strokeWidth = 1.6) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export function IconHex({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <polygon points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,7.5" />
    </svg>
  )
}

export function IconBrain({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M9 4a3 3 0 0 0-3 3 2.5 2.5 0 0 0-1 4.5A2.7 2.7 0 0 0 6.5 16 3 3 0 0 0 9 20" />
      <path d="M15 4a3 3 0 0 1 3 3 2.5 2.5 0 0 1 1 4.5A2.7 2.7 0 0 1 17.5 16 3 3 0 0 1 15 20" />
      <path d="M9 4v16M15 4v16M9 8h3M12 12h3M9 16h3" />
    </svg>
  )
}

export function IconForecast({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M3 17l5-6 4 3 5-7 4 4" />
      <path d="M17 6h4v4" />
      <path d="M3 20h18" strokeDasharray="1 3.2" />
    </svg>
  )
}

export function IconSatellite({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <rect x="8.5" y="8.5" width="7" height="7" rx="1" transform="rotate(45 12 12)" />
      <path d="M14.5 9.5l3-3M9.5 14.5l-3 3M3 21l3.5-3.5M17 3l-1.7 1.7M21 7l-1.7 1.7" />
    </svg>
  )
}

export function IconChart({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M4 20V4M4 20h16" />
      <rect x="7" y="13" width="2.6" height="7" />
      <rect x="12" y="9" width="2.6" height="11" />
      <rect x="17" y="5.5" width="2.6" height="14.5" />
    </svg>
  )
}

export function IconScan({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  )
}

export function IconServer({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <rect x="4" y="4" width="16" height="6.5" rx="1.3" />
      <rect x="4" y="13.5" width="16" height="6.5" rx="1.3" />
      <path d="M7.5 7.25h.01M7.5 16.75h.01" strokeWidth={strokeWidth ? strokeWidth + 0.6 : 2.2} />
    </svg>
  )
}

export function IconShield({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M12 3.5l7 2.7v5.4c0 4.6-3 7.8-7 9-4-1.2-7-4.4-7-9V6.2z" />
      <path d="M9 12l2 2 4-4.2" />
    </svg>
  )
}

export function IconLock({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
      <path d="M12 15v2" />
    </svg>
  )
}

export function IconLink({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M9.5 14.5l5-5" />
      <path d="M11 6.5l1-1a3.5 3.5 0 0 1 5 5l-1.5 1.5" />
      <path d="M13 17.5l-1 1a3.5 3.5 0 0 1-5-5l1.5-1.5" />
    </svg>
  )
}

export function IconPackage({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" />
      <path d="M4 7.2L12 11l8-3.8M12 11v10" />
    </svg>
  )
}

export function IconGlobe({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.4 4 5.3 4 8.5s-1.4 6.1-4 8.5c-2.6-2.4-4-5.3-4-8.5s1.4-6.1 4-8.5z" />
    </svg>
  )
}

export function IconTelescope({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M3 15.5l12-6.5 2.5 4.6-12 6.4z" />
      <path d="M15.5 9l4-2.2 1.6 3-4 2.2" />
      <path d="M9 13.5L5.5 20M12.5 15.3L10 20" />
      <circle cx="6.3" cy="16.7" r="1.1" />
    </svg>
  )
}

export function IconFlask({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M10 3h4M10 3v6.2L4.8 18a1.8 1.8 0 0 0 1.55 2.7h11.3A1.8 1.8 0 0 0 19.2 18L14 9.2V3" />
      <path d="M8.5 15h7" />
    </svg>
  )
}

export function IconBolt({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M13 3L5 13.5h5.5L11 21l8-10.5h-5.5z" />
    </svg>
  )
}

export function IconLoop({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5" />
      <path d="M20 4v4.5h-4.5" />
      <path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5" />
      <path d="M4 20v-4.5h4.5" />
    </svg>
  )
}

export function IconGear({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.8 6.2l-1.6 1.6M7.8 16.2l-1.6 1.6M17.8 17.8l-1.6-1.6M7.8 7.8L6.2 6.2" />
    </svg>
  )
}

export function IconTrendingUp({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M4 16l5.5-6 4 3 6.5-8" />
      <path d="M15.5 5h4.5v4.5" />
    </svg>
  )
}

export function IconTarget({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.8" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconSignature({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M3.5 17.5c2-.3 3.4-1.4 4.3-3.3 1-2.2 1.7-6.3 1-8-.6-1.5-2 .4-2.2 2-.3 2.6 1 6.7 3 8.3 1.6 1.3 3-.4 3.6-1.8.5 1 1.7 1.7 3.3 1.1 1.1-.4 1.9-1.2 2.5-2.1" />
      <path d="M4 20.5h16" strokeDasharray="1 3.2" />
    </svg>
  )
}

export function IconFolder({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4l2 2.2h7.5A1.5 1.5 0 0 1 20 8.7v9.3a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V6.5z" />
    </svg>
  )
}

export function IconClipboard({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <rect x="5.5" y="4.5" width="13" height="17" rx="1.5" />
      <rect x="9" y="3" width="6" height="3" rx="1" />
      <path d="M9 11h6M9 14.5h6M9 18h4" />
    </svg>
  )
}

export function IconFactory({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M4 20V11l4.5 3V11l4.5 3V8l6 3.5V20z" />
      <path d="M4 20h16" />
      <path d="M9 20v-3.5M14 20v-3.5" />
    </svg>
  )
}

export function IconNetwork({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M12 7v5M12 12L6.3 16.4M12 12l5.7 4.4" />
    </svg>
  )
}

export function IconCoins({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <ellipse cx="9" cy="7" rx="5.5" ry="3" />
      <path d="M3.5 7v4c0 1.66 2.46 3 5.5 3s5.5-1.34 5.5-3V7" />
      <path d="M3.5 11v4c0 1.66 2.46 3 5.5 3s5.5-1.34 5.5-3v-4" />
      <path d="M14.5 12.3c2.7.3 4.7 1.5 4.7 3s-2.46 3-5.5 3c-1.3 0-2.5-.25-3.4-.66" />
    </svg>
  )
}

export function IconEuro({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M17 6.5A6.5 6.5 0 1 0 17 17.7" />
      <path d="M4.5 10h9M4.5 14h7.5" />
    </svg>
  )
}

export function IconLeaf({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M5 19c-1-6 1.5-13.5 14.5-14 .8 12-6.5 15-14.5 14z" />
      <path d="M5.5 18.5C9 14.5 12.5 11 17.5 6.5" />
    </svg>
  )
}

export function IconPlane({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M3 13.5l7-2 4.5-8 2 .5-2 7.8 5 1.4v2l-5 .2-2.5 7.3-2-.4.5-6.3-6 1z" />
    </svg>
  )
}

export function IconBrick({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <rect x="3.5" y="5" width="8" height="5.5" />
      <rect x="12.5" y="5" width="8" height="5.5" />
      <rect x="8" y="13.5" width="8" height="5.5" />
    </svg>
  )
}

export function IconPlug({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M9 3v5M15 3v5" />
      <path d="M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0z" />
      <path d="M12 15.5V21" />
    </svg>
  )
}

export function IconCheckCircle({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.3 12.3l2.5 2.5 5-5.4" />
    </svg>
  )
}

export function IconCheck({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth ?? 2)} className={className} style={style} aria-hidden="true">
      <path d="M4.5 12.5l4.5 4.5L19.5 6" />
    </svg>
  )
}

export function IconCross({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth ?? 2)} className={className} style={style} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function IconCircleDot({ size, className, strokeWidth, style, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      {filled && <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />}
    </svg>
  )
}

export function IconCalculator({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="1.6" />
      <path d="M7.5 6.5h9" />
      <path d="M7.5 11h.01M12 11h.01M16.5 11h.01M7.5 14.5h.01M12 14.5h.01M16.5 14.5v3.5M7.5 18h.01M12 18h.01" strokeWidth={strokeWidth ? strokeWidth + 0.8 : 2.4} />
    </svg>
  )
}

export function IconRecycle({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M10 3.5L7 9h3M7 9L4.7 12.8" />
      <path d="M17 6l3.3 5.5-2.6 1.5M20.3 11.5h-6" />
      <path d="M17.5 18.5H12l1.6-2.7M12 18.5l-3-1.7 1.5-2.6" />
    </svg>
  )
}

export function IconPin({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  )
}

export function IconPhone({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M5.5 4h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 4 5.6 1.5 1.5 0 0 1 5.5 4z" />
    </svg>
  )
}

export function IconMail({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.8" />
      <path d="M4 6.5l8 6.5 8-6.5" />
    </svg>
  )
}

export function IconSensor({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="2.4" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M5.3 5.3a9.5 9.5 0 0 0 0 13.4M18.7 5.3a9.5 9.5 0 0 1 0 13.4" />
    </svg>
  )
}

export function IconScale({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M12 3v18M8 21h8" />
      <path d="M12 6L5 8M12 6l7 2" />
      <path d="M5 8l-2.5 5a2.5 2.5 0 0 0 5 0zM19 8l-2.5 5a2.5 2.5 0 0 0 5 0z" />
    </svg>
  )
}

export function IconSparkle({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <path d="M12 3l1.8 5.6L19.5 10.4 13.8 12.2 12 18l-1.8-5.8L4.5 10.4l5.7-1.8z" />
      <path d="M19 3.5l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6z" />
    </svg>
  )
}

export function IconClock({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  )
}

export function IconBuilding({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <rect x="5" y="3.5" width="10" height="17" rx="1" />
      <path d="M15 9h4v11.5H5" />
      <path d="M8 7h1M11 7h1M8 10.5h1M11 10.5h1M8 14h1M11 14h1M17.5 12.5h1M17.5 16h1" />
    </svg>
  )
}

/** Compact circular badge — used in place of flag emojis (🇪🇺 / 🇶🇦) for a professional, non-literal mark. */
export function IconBadge({
  label,
  size = 22,
  className,
  color = 'currentColor',
}: {
  label: string
  size?: number
  className?: string
  color?: string
}) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `1.4px solid ${color}`,
        color,
        fontSize: size * 0.38,
        fontWeight: 700,
        fontFamily: 'var(--font-body)',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}
    >
      {label}
    </span>
  )
}

export function IconInstagram({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconLinkedIn({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="7.8" cy="7.6" r="1" fill="currentColor" stroke="none" />
      <path d="M7.8 10.8V17" />
      <path d="M11.6 17v-6.2" />
      <path d="M11.6 12.2c0-1.1.9-2 2-2s2 .9 2 2V17" />
    </svg>
  )
}

export function IconFacebook({ size, className, strokeWidth, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} className={className} style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M14 7.5h-1.2c-1.1 0-2 .9-2 2v2H9v2.3h1.8V19h2.4v-5.2h1.9l.3-2.3h-2.2v-1.6c0-.4.3-.7.7-.7H14V7.5Z" />
    </svg>
  )
}
