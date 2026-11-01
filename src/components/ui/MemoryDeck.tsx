import { motion, type PanInfo, useMotionValue, useTransform } from 'motion/react'
import { useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export interface MemoryCard {
  image: string
  caption: string
  line: string
}

interface MemoryDeckProps {
  cards: readonly MemoryCard[]
}

/** Physical photo stack — swipe on iPhone like shuffling printed memories */
export function MemoryDeck({ cards }: MemoryDeckProps) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-180, 180], [-10, 10])
  const opacity = useTransform(x, [-180, -80, 0, 80, 180], [0.4, 1, 1, 1, 0.4])

  const current = cards[index]
  const next = cards[(index + 1) % cards.length]

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) {
      setIndex((i) => (i + 1) % cards.length)
      x.set(0)
      try {
        navigator.vibrate?.(10)
      } catch {
        /* ignore */
      }
    } else {
      x.set(0)
    }
  }

  if (!current) return null

  return (
    <div className="relative mx-auto h-[58vw] max-h-[360px] w-[72vw] max-w-[300px]" data-no-tap>
      {/* Next card peek */}
      {next && (
        <div className="absolute inset-0 translate-y-2 scale-[0.94] rotate-3 overflow-hidden rounded-[2px] bg-[#1a1714] p-[3%] opacity-70 ring-1 ring-[#F3EFE8]/10">
          <img src={next.image} alt="" className="h-full w-full object-cover" draggable={false} />
        </div>
      )}

      <motion.figure
        className="absolute inset-0 cursor-grab overflow-hidden rounded-[2px] bg-[#1a1714] p-[3%] shadow-[0_28px_60px_rgba(0,0,0,0.55)] ring-1 ring-[#F3EFE8]/14 active:cursor-grabbing"
        style={reduced ? undefined : { x, rotate, opacity }}
        drag={reduced ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.72}
        onDragEnd={onDragEnd}
        whileTap={{ scale: 0.985 }}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={current.image}
            alt={current.caption}
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/70 via-transparent to-transparent" />
        </div>
        <figcaption className="mt-2.5 px-1">
          <p className="font-sans text-[10px] tracking-[0.18em] text-[#C4A574] uppercase">
            {current.caption}
          </p>
          <p className="font-serif mt-1 text-[15px] leading-snug text-[#F3EFE8]">{current.line}</p>
        </figcaption>
      </motion.figure>

      <p className="absolute -bottom-9 left-0 right-0 text-center font-sans text-[10px] tracking-[0.18em] text-[#A6A29C]/80 uppercase">
        Deslize a foto
      </p>
    </div>
  )
}
