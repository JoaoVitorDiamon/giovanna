import { assets, content } from '../../config/experience'
import { CinematicImage } from '../ui/CinematicImage'
import { InteractiveGlow } from '../ui/InteractiveGlow'
import { MemoryFrame } from '../ui/MemoryFrame'
import { StaggerLines } from '../ui/RevealText'

export function ChapterFuture() {
  return (
    <section className="relative flex h-full w-full items-end overflow-hidden">
      <CinematicImage
        src={content.future.image}
        alt={content.future.imageAlt}
        kenBurns="out"
        overlay={0.36}
      />
      <InteractiveGlow intensity={0.14} />

      <div className="pointer-events-none absolute top-[16%] right-4 z-20 w-[34vw] max-w-[150px] sm:right-8">
        <MemoryFrame
          src={assets.nossaFoto01}
          alt="Em breve"
          rotate={4}
          delay={0.4}
          caption="em breve"
        />
      </div>

      <div
        className="relative z-20 w-full px-5 pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))]"
        data-no-tap
      >
        <p className="mb-5 font-sans text-[10px] tracking-[0.28em] text-[#C4A574] uppercase">
          VI — O futuro próximo
        </p>
        <StaggerLines
          lines={[
            'Eu não sei exatamente o que vamos fazer quando eu te encontrar.',
            'Talvez a gente saia. Talvez fique conversando por horas.',
            'Talvez não faça absolutamente nada.',
            'Mas eu sei que vai ser especial. Porque vai ser com você.',
          ]}
          className="space-y-3.5"
          lineClassName="font-serif text-[clamp(1.15rem,4.8vw,1.65rem)] leading-[1.35] text-[#F3EFE8] text-balance"
          baseDelay={0.25}
          stagger={0.48}
        />
      </div>
    </section>
  )
}
