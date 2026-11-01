import { content } from '../../config/experience'
import { AmbientDust } from '../ui/AmbientDust'
import { ContinueWhisper } from '../ui/ContinueWhisper'
import { InteractiveGlow } from '../ui/InteractiveGlow'
import { MemoryDeck } from '../ui/MemoryDeck'
import { RevealText } from '../ui/RevealText'

export function ChapterPresence() {
  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden bg-[#090909]">
      <AmbientDust />
      <InteractiveGlow intensity={0.18} />

      <div className="relative z-10 flex h-full min-h-0 flex-col justify-between px-5 pt-[max(3.5rem,calc(env(safe-area-inset-top)+2.5rem))] pb-[max(5rem,calc(env(safe-area-inset-bottom)+4rem))]">
        <div data-no-tap>
          <p className="mb-4 font-sans text-[10px] tracking-[0.28em] text-[#C4A574] uppercase">
            II — A maneira como você melhora tudo
          </p>
          <RevealText
            as="h2"
            delay={0.15}
            className="font-serif max-w-[18ch] text-[clamp(1.35rem,5.5vw,1.9rem)] leading-[1.3] text-[#F3EFE8] text-balance"
          >
            Eu queria que você pudesse se enxergar do jeito que eu te enxergo.
          </RevealText>
        </div>

        <div className="flex flex-1 items-center justify-center py-6">
          <MemoryDeck cards={content.presence.moments} />
        </div>

        <div className="flex flex-col items-center gap-5" data-no-tap>
          <RevealText
            delay={0.6}
            className="font-serif text-center text-[clamp(1.05rem,4.2vw,1.35rem)] leading-[1.45] text-[#A6A29C] text-balance"
          >
            O mundo fica um pouquinho melhor porque você existe.
          </RevealText>
          <ContinueWhisper />
        </div>
      </div>
    </section>
  )
}
