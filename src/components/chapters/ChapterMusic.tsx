import { motion } from 'motion/react'
import { content } from '../../config/experience'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SoundtrackPlayer } from '../music/SoundtrackPlayer'
import { AmbientDust } from '../ui/AmbientDust'
import { ContinueWhisper } from '../ui/ContinueWhisper'
import { RevealText } from '../ui/RevealText'

function SoundRings() {
  const reduced = usePrefersReducedMotion()
  if (reduced) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#C4A574]/22"
          style={{ width: `${34 + i * 22}vmin`, height: `${34 + i * 22}vmin` }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.35, 0.12] }}
          transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
    </div>
  )
}

export function ChapterMusic() {
  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden bg-[#090909]">
      <AmbientDust />
      <SoundRings />

      <div
        className="relative z-10 flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain px-5 pt-[max(3.75rem,calc(env(safe-area-inset-top)+2.75rem))] pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))]"
        data-no-tap
      >
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center gap-7">
          <div>
            <p className="mb-4 font-sans text-[10px] tracking-[0.28em] text-[#C4A574] uppercase">
              A música que me lembra você
            </p>
            <RevealText
              as="h2"
              delay={0.1}
              className="font-serif text-[clamp(1.3rem,5.5vw,1.85rem)] leading-[1.3] text-[#F3EFE8] text-balance"
            >
              {content.music.headline}
            </RevealText>
          </div>

          <SoundtrackPlayer />

          <ul className="space-y-3 border-t border-[#F3EFE8]/10 pt-5">
            {content.music.allusions.map((item, i) => (
              <RevealText
                key={item.label}
                delay={0.45 + i * 0.12}
                as="li"
                className="flex flex-col gap-0.5"
              >
                <span className="font-serif text-[16px] text-[#F3EFE8]/90">{item.label}</span>
                <span className="font-sans text-[10px] tracking-[0.16em] text-[#A6A29C]/75 uppercase">
                  {item.hint}
                </span>
              </RevealText>
            ))}
          </ul>

          <ContinueWhisper className="mt-2 self-center" label="A declaração →" />
        </div>
      </div>
    </section>
  )
}
