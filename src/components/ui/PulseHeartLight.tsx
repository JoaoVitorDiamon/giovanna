import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** Soft breathing amber orb — intimacy without heart icons */
export function PulseHeartLight({ className = '' }: { className?: string }) {
  const reduced = usePrefersReducedMotion()

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute top-1/2 left-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(196,165,116,0.28) 0%, rgba(196,165,116,0.08) 35%, transparent 68%)',
        }}
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.08, 1, 1.05, 1],
                opacity: [0.55, 0.85, 0.6, 0.8, 0.55],
              }
        }
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
        }}
      />
      <motion.div
        className="absolute top-[46%] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#C4A574]/70 blur-[1px]"
        animate={reduced ? undefined : { scale: [1, 1.35, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
