import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'
import { useIsTouch } from '../../hooks/useIsTouch'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function InteractiveGlow({ intensity = 0.22 }: { intensity?: number }) {
  const isTouch = useIsTouch()
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight * 0.4 : 0)
  const sx = useSpring(x, { stiffness: 60, damping: 24, mass: 0.8 })
  const sy = useSpring(y, { stiffness: 60, damping: 24, mass: 0.8 })

  useEffect(() => {
    if (reduced) return

    const move = (clientX: number, clientY: number) => {
      x.set(clientX)
      y.set(clientY)
    }

    const onMouse = (e: MouseEvent) => move(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) move(t.clientX, t.clientY)
    }

    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [reduced, x, y])

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, rgba(196,165,116,${intensity}), transparent 55%)`,
        }}
      />
    )
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen"
      style={{
        background: `radial-gradient(circle 280px at ${isTouch ? '50%' : '0px'} ${isTouch ? '35%' : '0px'}, rgba(196,165,116,${intensity}), transparent 70%)`,
        // springs drive custom properties via left/top on a child for performance
      }}
    >
      <motion.div
        className="absolute h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: sx,
          top: sy,
          background: `radial-gradient(circle, rgba(196,165,116,${intensity * 1.35}) 0%, rgba(196,165,116,0.05) 42%, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}
