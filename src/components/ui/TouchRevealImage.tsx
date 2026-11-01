import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Vignette } from './Vignette'

interface TouchRevealImageProps {
  src: string
  alt: string
  overlay?: number
  hint?: string
}

/**
 * Photo hidden in darkness — her finger paints light and reveals the image.
 * Designed for iPhone intimacy.
 */
export function TouchRevealImage({
  src,
  alt,
  overlay = 0.25,
  hint = 'Deslize o dedo para revelar',
}: TouchRevealImageProps) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const [showHint, setShowHint] = useState(!reduced)
  const x = useMotionValue(50)
  const y = useMotionValue(42)
  const sx = useSpring(x, { stiffness: 140, damping: 30 })
  const sy = useSpring(y, { stiffness: 140, damping: 30 })
  const radius = useSpring(reduced ? 140 : 16, { stiffness: 100, damping: 24 })
  const touched = useRef(false)

  useEffect(() => {
    if (reduced) {
      radius.set(140)
      setShowHint(false)
      if (veilRef.current) {
        veilRef.current.style.opacity = '0'
      }
    }
  }, [reduced, radius])

  useEffect(() => {
    if (reduced) return

    const apply = () => {
      const el = veilRef.current
      if (!el) return
      const cx = sx.get()
      const cy = sy.get()
      const r = radius.get()
      const mask = `radial-gradient(circle at ${cx}% ${cy}%, transparent 0%, transparent ${r}%, black ${r + 28}%)`
      el.style.webkitMaskImage = mask
      el.style.maskImage = mask
    }

    const offs = [sx.on('change', apply), sy.on('change', apply), radius.on('change', apply)]
    apply()
    return () => offs.forEach((off) => off())
  }, [reduced, sx, sy, radius])

  const move = (clientX: number, clientY: number) => {
    const el = rootRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set(((clientX - rect.left) / rect.width) * 100)
    y.set(((clientY - rect.top) / rect.height) * 100)

    if (!touched.current) {
      touched.current = true
      setShowHint(false)
      radius.set(36)
      window.setTimeout(() => radius.set(46), 350)
      try {
        navigator.vibrate?.(12)
      } catch {
        /* ignore */
      }
    }
  }

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 touch-none overflow-hidden bg-[#090909]"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        move(e.clientX, e.clientY)
      }}
      onPointerMove={(e) => {
        if (e.buttons > 0 || e.pressure > 0) move(e.clientX, e.clientY)
      }}
      data-no-tap
    >
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        animate={reduced ? undefined : { scale: [1.06, 1.12], x: ['0%', '-1.2%'] }}
        transition={{ duration: 24, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
        style={{ scale: 1.06 }}
      />

      {!reduced && <div ref={veilRef} aria-hidden className="absolute inset-0 bg-[#090909]" />}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(9,9,9,${overlay + 0.4}) 0%, rgba(9,9,9,${overlay * 0.25}) 48%, transparent 100%)`,
        }}
      />
      <Vignette intensity={0.48} />

      {showHint && (
        <motion.p
          className="pointer-events-none absolute bottom-[24%] left-0 right-0 z-10 px-6 text-center font-sans text-[11px] tracking-[0.2em] text-[#F3EFE8]/75 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          {hint}
        </motion.p>
      )}
    </div>
  )
}
