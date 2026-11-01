import { motion } from 'motion/react'
import type { MemoryStory as Memory } from '../../config/experience'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function MemoryStory({ memory, index, total }: { memory: Memory; index: number; total: number }) {
  const reduced = usePrefersReducedMotion()
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section className="relative flex h-full w-full items-end overflow-hidden bg-[#090909]">
      <motion.img
        src={memory.image}
        alt=""
        className="absolute inset-0 h-full w-full max-w-none object-cover"
        initial={reduced ? false : { scale: 1.08 }}
        animate={{ scale: reduced ? 1 : 1.14 }}
        transition={{ duration: 18, ease: 'linear' }}
        draggable={false}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(9,9,9,0.92) 0%, rgba(9,9,9,0.55) 42%, rgba(9,9,9,0.28) 100%)',
        }}
      />

      <div className="relative z-10 w-full px-5 pt-16 pb-[max(4.5rem,calc(env(safe-area-inset-bottom)+3.25rem))]">
        <motion.p
          className="font-sans text-[11px] tracking-[0.28em] text-[#C4A574] uppercase"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {memory.date}
          <span className="ml-3 text-[#A6A29C]">
            {index + 1} / {total}
          </span>
        </motion.p>

        <motion.h2
          className="font-serif mt-4 text-[clamp(1.7rem,8vw,2.6rem)] leading-[1.15] text-[#F3EFE8] text-balance"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease }}
        >
          {memory.title}
        </motion.h2>

        <div className="mt-6 max-w-md space-y-4">
          {memory.lines.map((line, i) => (
            <motion.p
              key={line}
              className="font-serif text-[clamp(1.05rem,4.4vw,1.28rem)] leading-[1.45] text-[#F3EFE8]/92 text-balance"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 + i * 0.16, ease }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
