import { content } from '../../config/experience'
import { StaggerLines } from '../ui/RevealText'
import { TouchRevealImage } from '../ui/TouchRevealImage'

export function ChapterSpecial() {
  return (
    <section className="relative flex h-full w-full items-end overflow-hidden">
      <TouchRevealImage
        src={content.special.image}
        alt={content.special.imageAlt}
        overlay={0.22}
        hint="Toque e deslize para me ver"
      />

      <div
        className="relative z-20 w-full px-5 pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] pt-10 md:max-w-2xl md:px-14"
        data-no-tap
      >
        <p className="mb-4 font-sans text-[10px] tracking-[0.28em] text-[#C4A574] uppercase">
          I — O que existe de especial em você
        </p>
        <StaggerLines
          lines={content.special.lines}
          className="space-y-4"
          lineClassName="font-serif text-[clamp(1.2rem,5.2vw,2rem)] leading-[1.35] text-[#F3EFE8] text-balance"
          baseDelay={0.2}
          stagger={0.65}
        />
      </div>
    </section>
  )
}
