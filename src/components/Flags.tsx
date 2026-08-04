interface FlagProps {
  width?: number
  height?: number
  className?: string
}

const W = 28
const H = 20

function qatarZigzagPath(bandWidth: number, teeth = 9) {
  const outerX = bandWidth + 4
  const step = H / teeth
  let d = `M0,0 L${bandWidth},0 `
  for (let i = 0; i < teeth; i++) {
    const yMid = step * i + step / 2
    const yEnd = step * (i + 1)
    d += `L${outerX},${yMid} L${bandWidth},${yEnd} `
  }
  d += `L0,${H} Z`
  return d
}

/** Simplified vector Qatar flag — maroon field, serrated white hoist band. */
export function QatarFlag({ width = W, height = H, className = '' }: FlagProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${W} ${H}`}
      className={`rounded-[3px] shadow-sm ${className}`}
      style={{ display: 'block' }}
      aria-label="Qatar flag"
      role="img"
    >
      <rect width={W} height={H} rx="2.5" fill="#8A1538" />
      <path d={qatarZigzagPath(8)} fill="white" />
      <rect width={W} height={H} rx="2.5" fill="none" stroke="black" strokeOpacity="0.08" />
    </svg>
  )
}

// Authentic hilal (crescent) + 5-point star, built the way the real flag is: two EQUAL-radius
// circles (red, then a white "bite") offset by a small amount, which is what produces a thin,
// correctly-shaped crescent — not two differently-sized circles, which reads as a fat blob.
// The star sits nested in the crescent's opening, one point straight up, not touching the horns.
const STAR_POINTS =
  '15.8,8.1 16.26,9.37 17.61,9.41 16.54,10.24 16.92,11.54 15.8,10.78 14.68,11.54 15.06,10.24 13.99,9.41 15.34,9.37'

/** Simplified vector Tunisia flag — red field, white disc, small red crescent and star (not a Turkish flag!). */
export function TunisiaFlag({ width = W, height = H, className = '' }: FlagProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${W} ${H}`}
      className={`rounded-[3px] shadow-sm ${className}`}
      style={{ display: 'block' }}
      aria-label="Tunisia flag"
      role="img"
    >
      <rect width={W} height={H} rx="2.5" fill="#E70013" />
      {/* White disc, well clear of the flag edges */}
      <circle cx="14" cy="10" r="6.3" fill="white" />
      {/* Red crescent: equal-radius red circle and white "bite" circle, offset horizontally — the offset alone (not a radius difference) is what makes a correctly thin crescent */}
      <circle cx="12.9" cy="10" r="3.4" fill="#E70013" />
      <circle cx="13.7" cy="10" r="3.4" fill="white" />
      {/* Red star nested in the crescent's opening, one point up */}
      <polygon points={STAR_POINTS} fill="#E70013" />
      <rect width={W} height={H} rx="2.5" fill="none" stroke="black" strokeOpacity="0.08" />
    </svg>
  )
}
