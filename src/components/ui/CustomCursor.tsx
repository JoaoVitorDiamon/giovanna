import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'
import { useIsTouch } from '../../hooks/useIsTouch'

export function CustomCursor() {
  const isTouch = useIsTouch()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 })

  useEffect(() => {
    if (isTouch) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isTouch, x, y])

  if (isTouch) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
    >
      <div className="h-3 w-3 rounded-full bg-[#F3EFE8]" />
      <div className="absolute top-1/2 left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F3EFE8]/35" />
    </motion.div>
  )
}
