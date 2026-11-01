import { motion } from 'motion/react'
import { content } from '../../config/experience'
import { useCinematicIntro } from '../../hooks/useCinematicIntro'
import { useHoldGesture } from '../../hooks/useHoldGesture'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AmbientDust } from '../ui/AmbientDust'

interface OpeningProps {
  onStart: () => void
}

export function Opening({ onStart }: OpeningProps) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useCinematicIntro(true)
  const ease = [0.22, 1, 0.36, 1] as const
  const { progress, holding, bind } = useHoldGesture({
    durationMs: reduced ? 200 : 1300,
    onComplete: onStart,
  })

  return (
    <section
      ref={rootRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#090909] px-6"
    >
      <AmbientDust />
      <div
        aria-hidden
        data-cinematic-light
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 42%, rgba(196,165,116,0.1), transparent 55%)',
        }}
      />
      <div
        aria-hidden
        data-cinematic-veil
        className="pointer-events-none absolute inset-0 z-[1] bg-[#090909]"
      />

      {/* Warm circle that grows while she holds */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-[2] rounded-full"
        style={{
          width: '70vmax',
          height: '70vmax',
          background:
            'radial-gradient(circle, rgba(196,165,116,0.22) 0%, transparent 65%)',
          opacity: 0.25 + progress * 0.75,
          transform: `translate(-50%, -50%) scale(${0.55 + progress * 0.55})`,
        }}
      />

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <motion.p
          className="font-sans text-[11px] tracking-[0.28em] text-[#A6A29C] uppercase sm:text-[12px]"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
        >
          {content.opening.whisper}
        </motion.p>

        <motion.h1
          className="font-serif mt-7 text-[clamp(2.6rem,12vw,4.5rem)] leading-none text-[#F3EFE8]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.9, ease }}
        >
          {content.opening.name}
        </motion.h1>

        <motion.div
          className="mt-16 flex flex-col items-center"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.1, ease }}
        >
          <button
            type="button"
            className="relative flex h-24 w-24 touch-manipulation items-center justify-center rounded-full"
            aria-label="Segure para começar"
            {...bind}
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border border-[#F3EFE8]/20"
            />
            <svg className="absolute inset-1 -rotate-90" viewBox="0 0 100 100" aria-hidden>
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgba(196,165,116,0.85)"
                strokeWidth="1.5"
                strokeDasharray={`${progress * 289} 289`}
                strokeLinecap="round"
              />
            </svg>
            <span
              className={`font-sans text-[10px] tracking-[0.2em] uppercase transition-colors ${
                holding ? 'text-[#C4A574]' : 'text-[#F3EFE8]/85'
              }`}
            >
              Segure
            </span>
          </button>
          <p className="mt-5 font-sans text-[10px] tracking-[0.24em] text-[#A6A29C] uppercase">
            para abrir
          </p>
        </motion.div>
      </div>
    </section>
  )
}
