import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

interface UseHoldGestureOptions {
  durationMs?: number
  onComplete: () => void
  disabled?: boolean
}

export function useHoldGesture({
  durationMs = 1400,
  onComplete,
  disabled = false,
}: UseHoldGestureOptions) {
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)
  const raf = useRef<number | null>(null)
  const start = useRef<number>(0)
  const done = useRef(false)

  const stop = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = null
    setHolding(false)
    if (!done.current) setProgress(0)
  }, [])

  const tick = useCallback(() => {
    const elapsed = performance.now() - start.current
    const p = Math.min(1, elapsed / durationMs)
    setProgress(p)
    if (p >= 1) {
      done.current = true
      setHolding(false)
      onComplete()
      return
    }
    raf.current = requestAnimationFrame(tick)
  }, [durationMs, onComplete])

  const begin = useCallback(() => {
    if (disabled || done.current) return
    start.current = performance.now()
    setHolding(true)
    raf.current = requestAnimationFrame(tick)
  }, [disabled, tick])

  const bind = {
    onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => {
      e.currentTarget.setPointerCapture?.(e.pointerId)
      begin()
    },
    onPointerUp: stop,
    onPointerCancel: stop,
    onPointerLeave: stop,
  }

  return { progress, holding, bind }
}
