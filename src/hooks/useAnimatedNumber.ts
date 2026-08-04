import { useEffect, useRef, useState } from 'react'

/** Eases smoothly from the previous value to a new target every time `target` changes. */
export function useAnimatedNumber(target: number, duration = 700) {
  const [value, setValue] = useState(target)
  const raf = useRef<number>(0)
  const from = useRef(target)
  const start = useRef<number | null>(null)

  useEffect(() => {
    const fromValue = from.current
    if (fromValue === target) return
    start.current = null
    const step = (ts: number) => {
      if (!start.current) start.current = ts
      const elapsed = ts - start.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(fromValue + (target - fromValue) * eased)
      if (progress < 1) {
        raf.current = requestAnimationFrame(step)
      } else {
        from.current = target
      }
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration])

  return value
}
