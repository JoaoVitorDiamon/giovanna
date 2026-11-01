import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Vignette } from './Vignette'

interface CinematicImageProps {
  src: string
  alt: string
  className?: string
  kenBurns?: 'in' | 'out' | 'pan'
  overlay?: number
  priority?: boolean
}

export function CinematicImage({
  src,
  alt,
  className = '',
  kenBurns = 'in',
  overlay = 0.42,
  priority = false,
}: CinematicImageProps) {
  const reduced = usePrefersReducedMotion()

  const ken = {
    in: { scale: [1.08, 1.18], x: ['0%', '-1%'], y: ['0%', '-1.5%'] },
    out: { scale: [1.2, 1.08], x: ['-1%', '0%'], y: ['-1%', '0%'] },
    pan: { scale: [1.12, 1.12], x: ['-2%', '2%'], y: ['0%', '-1%'] },
  }[kenBurns]

  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#090909] ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full max-w-none object-cover will-change-transform"
        initial={reduced ? undefined : { scale: ken.scale[0], x: ken.x[0], y: ken.y[0] }}
        animate={
          reduced
            ? undefined
            : {
                scale: ken.scale,
                x: ken.x,
                y: ken.y,
              }
        }
        transition={{
          duration: 28,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(9,9,9,${Math.min(overlay + 0.25, 0.9)}) 0%, rgba(9,9,9,${overlay * 0.45}) 45%, rgba(9,9,9,${overlay * 0.35}) 100%)`,
        }}
      />
      <Vignette intensity={0.62} />
    </div>
  )
}
