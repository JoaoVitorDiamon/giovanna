import { motion, useMotionValue, useTransform } from 'motion/react'
import { useState } from 'react'
import { assets, content } from '../../config/experience'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AmbientDust } from '../ui/AmbientDust'
import { ContinueWhisper } from '../ui/ContinueWhisper'
import { PulseHeartLight } from '../ui/PulseHeartLight'
import { StaggerLines } from '../ui/RevealText'

export function ChapterFeeling() {
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState(reduced)
  const y = useMotionValue(0)
  const envelopeY = useTransform(y, [0, 140], [0, 140])
  const letterY = useTransform(y, [0, 140], [40, 0])
  const letterOpacity = useTransform(y, [0, 80, 140], [0, 0.5, 1])

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#090909] px-4">
      <AmbientDust />
      <PulseHeartLight />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img
          src={assets.giovanna01}
          alt=""
          className="h-full w-full object-cover opacity-[0.16] blur-[2px]"
        />
        <div className="absolute inset-0 bg-[#090909]/7" />
      </motion.div>

      <div className="relative z-10 w-full max-w-md" data-no-tap>
        {!open ? (
          <motion.div
            className="relative mx-auto touch-none"
            style={{ y: envelopeY }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 160 }}
            dragElastic={0.12}
            onDrag={(_, info) => y.set(Math.max(0, info.offset.y))}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 400) {
                setOpen(true)
                try {
                  navigator.vibrate?.(15)
                } catch {
                  /* ignore */
                }
              } else {
                y.set(0)
              }
            }}
          >
            <div
              className="relative overflow-hidden rounded-sm border border-[#F3EFE8]/12 px-6 py-14 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
              style={{
                background: 'linear-gradient(160deg, #1c1712, #0e0c0a)',
              }}
            >
              <p className="font-sans text-[10px] tracking-[0.28em] text-[#C4A574] uppercase">
                Para Giovanna
              </p>
              <p className="font-serif mt-6 text-[1.45rem] text-[#F3EFE8]">Uma carta pra você</p>
              <motion.p
                className="mt-10 font-sans text-[10px] tracking-[0.22em] text-[#A6A29C] uppercase"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                Puxe para baixo
              </motion.p>
              <motion.div
                aria-hidden
                className="mx-auto mt-3 h-8 w-px bg-[#C4A574]/60"
                style={{ y: letterY, opacity: letterOpacity }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.article
            className="relative overflow-hidden rounded-sm border border-[#F3EFE8]/1 px-5 py-8 shadow-[0_40px_100px_rgba(0,0,0,0.6)] sm:px-8 sm:py-10"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'linear-gradient(165deg, #1a1612 0%, #120f0c 50%, #0c0b09 100%)',
            }}
          >
            <p className="mb-6 font-sans text-[10px] tracking-[0.28em] text-[#C4A574] uppercase">
              V — O que eu sinto por você
            </p>

            <h2 className="font-serif text-[clamp(1.45rem,6vw,2.1rem)] leading-[1.2] text-[#F3EFE8] text-balance">
              {content.feeling.lead}
            </h2>

            <div className="my-6 h-px w-14 bg-[#C4A574]/45" />

            <StaggerLines
              lines={content.feeling.lines}
              className="space-y-3.5"
              lineClassName="font-serif text-[clamp(1rem,3.8vw,1.2rem)] leading-[1.5] text-[#A6A29C] text-balance"
              baseDelay={0.35}
              stagger={0.4}
            />

            <div className="mt-8 flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-full ring-1 ring-[#F3EFE8]/15">
                <img src={assets.nossaFoto01} alt="" className="h-full w-full object-cover" />
              </div>
              <p className="font-sans text-[10px] tracking-[0.14em] text-[#A6A29C] uppercase">
                Só sua
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <ContinueWhisper />
            </div>
          </motion.article>
        )}
      </div>
    </section>
  )
}
