import { motion } from 'motion/react'
import { content } from '../../config/experience'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { CinematicImage } from '../ui/CinematicImage'
import { StaggerLines } from '../ui/RevealText'
import { WindowFrame } from '../ui/WindowFrame'

export function ChapterLonging() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="relative flex h-full w-full items-end overflow-hidden">
      <CinematicImage
        src={content.longing.image}
        alt={content.longing.imageAlt}
        kenBurns="pan"
        overlay={0.38}
      />
      <WindowFrame />

      <div aria-hidden className="pointer-events-none absolute inset-0 z-[12] opacity-25 mix-blend-screen">
        {!reduced &&
          Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute top-0 w-px bg-gradient-to-b from-transparent via-[#F3EFE8]/55 to-transparent"
              style={{ left: `${10 + i * 11}%`, height: '100%' }}
              animate={{ opacity: [0.08, 0.3, 0.08], y: ['-6%', '6%', '-6%'] }}
              transition={{ duration: 6 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
      </div>

      <div
        className="relative z-20 w-full px-5 pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))]"
        data-no-tap
      >
        <p className="mb-5 font-sans text-[10px] tracking-[0.28em] text-[#C4A574] uppercase">
          III — Saudade
        </p>
        <StaggerLines
          lines={[
            'Tem uma coisa que eu queria muito agora.',
            'Estar com você.',
            'Só estar.',
            'Eu tô com tanta saudade.',
            'E eu não vejo a hora de te encontrar de novo.',
          ]}
          className="space-y-3.5"
          lineClassName="font-serif text-[clamp(1.2rem,5vw,1.75rem)] leading-[1.35] text-[#F3EFE8] text-balance"
          baseDelay={0.2}
          stagger={0.5}
        />
      </div>
    </section>
  )
}
