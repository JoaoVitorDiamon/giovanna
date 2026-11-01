import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useCinematicIntro(active = true) {
  const rootRef = useRef<HTMLElement | null>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!active || reduced || !rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cinematic-light]',
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 2.8,
          ease: 'power2.out',
        },
      )

      gsap.fromTo(
        '[data-cinematic-veil]',
        { opacity: 1 },
        {
          opacity: 0,
          duration: 2.2,
          delay: 0.15,
          ease: 'power3.out',
        },
      )
    }, rootRef)

    return () => ctx.revert()
  }, [active, reduced])

  return rootRef
}
