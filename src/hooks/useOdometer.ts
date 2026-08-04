import { useEffect, useRef, useState } from 'react'

export function useOdometer(target: number, triggered: boolean, duration = 1800) {
  const [value, setValue] = useState(0)
  const raf = useRef<number>(0)
  const start = useRef<number | null>(null)

  useEffect(() => {
    if (!triggered) return
    start.current = null
    const step = (ts: number) => {
      if (!start.current) start.current = ts
      const elapsed = ts - start.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [triggered, target, duration])

  return value
}
