import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface MemoryFrameProps {
  src: string
  alt: string
  caption?: string
  className?: string
  rotate?: number
  delay?: number
  priority?: boolean
}

export function MemoryFrame({
  src,
  alt,
  caption,
  className = '',
  rotate = -3,
  delay = 0,
  priority = false,
}: MemoryFrameProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.figure
      className={`relative ${className}`}
      initial={reduced ? false : { opacity: 0, y: 28, rotate: rotate - 4, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, rotate, scale: 1 }}
      transition={{ duration: 1.25, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'center bottom' }}
    >
      <div className="relative overflow-hidden rounded-[2px] bg-[#1a1714] p-[3%] shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-[#F3EFE8]/12">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#090909]">
          <motion.img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover"
            animate={
              reduced
                ? undefined
                : { scale: [1.05, 1.14], x: ['0%', '-1.5%'], y: ['0%', '-1%'] }
            }
            transition={{ duration: 22, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(9,9,9,0.45) 0%, transparent 45%), radial-gradient(ellipse at center, transparent 40%, rgba(9,9,9,0.35) 100%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                'linear-gradient(120deg, transparent 30%, rgba(243,239,232,0.18) 48%, transparent 62%)',
            }}
          />
        </div>
        {caption ? (
          <figcaption className="mt-3 px-1 font-sans text-[10px] tracking-[0.18em] text-[#A6A29C] uppercase">
            {caption}
          </figcaption>
        ) : null}
      </div>
    </motion.figure>
  )
}
