import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  size: 1 + (i % 3) * 0.6,
  duration: 14 + (i % 7) * 2.5,
  delay: (i % 5) * 1.2,
  opacity: 0.08 + (i % 4) * 0.04,
}))

export function AmbientDust() {
  const reduced = usePrefersReducedMotion()
  if (reduced) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#F3EFE8]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -40, 10, -20, 0],
            x: [0, 12, -8, 6, 0],
            opacity: [p.opacity, p.opacity * 1.4, p.opacity * 0.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
