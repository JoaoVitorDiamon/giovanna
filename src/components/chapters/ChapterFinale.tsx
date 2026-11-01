import { motion } from 'motion/react'
import { assets, content, meta } from '../../config/experience'
import { useCinematicIntro } from '../../hooks/useCinematicIntro'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AmbientDust } from '../ui/AmbientDust'
import { PulseHeartLight } from '../ui/PulseHeartLight'

interface ChapterFinaleProps {
  onRestart: () => void
}

export function ChapterFinale({ onRestart }: ChapterFinaleProps) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useCinematicIntro(true)
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section
      ref={rootRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#090909] px-6"
    >
      <AmbientDust />
      <PulseHeartLight />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, delay: 0.2, ease }}
      >
        <img
          src={assets.giovanna01}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.2] blur-[1.5px]"
        />
        <div className="absolute inset-0 bg-[#090909]/65" />
      </motion.div>

      <div
        aria-hidden
        data-cinematic-light
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(196,165,116,0.18), transparent 52%)',
        }}
      />
      <div
        aria-hidden
        data-cinematic-veil
        className="pointer-events-none absolute inset-0 z-[1] bg-[#090909]"
      />

      <div className="relative z-10 flex max-w-lg flex-col items-center px-2 text-center">
        <motion.p
          className="font-serif text-[clamp(1.8rem,9vw,2.8rem)] text-[#F3EFE8]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.35, ease }}
        >
          {meta.dedicatee}
        </motion.p>

        <motion.h2
          className="font-serif mt-8 text-[clamp(1.45rem,6.5vw,2.4rem)] leading-[1.25] text-[#F3EFE8] text-balance"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.4, ease }}
        >
          {content.finale.title}
        </motion.h2>

        <div className="mt-10 space-y-3">
          {content.finale.lines.map((line, i) => (
            <motion.p
              key={line}
              className="font-serif text-[clamp(1.1rem,4.5vw,1.4rem)] text-[#A6A29C]"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 2.5 + i * 0.5, ease }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="mt-12"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 3.8, ease }}
        >
          <p className="font-sans text-[12px] tracking-[0.12em] text-[#A6A29C]">
            {content.finale.closing}
          </p>
          <p className="font-serif mt-2 text-[1.35rem] text-[#F3EFE8]">
            {content.finale.signature}
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={onRestart}
          className="mt-14 min-h-11 px-4 font-sans text-[10px] tracking-[0.28em] text-[#A6A29C] uppercase"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4.8, ease }}
        >
          {content.finale.replay}
        </motion.button>
      </div>
    </section>
  )
}
