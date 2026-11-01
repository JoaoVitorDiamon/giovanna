interface ChapterNavProps {
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
  visible: boolean
  nextLabel?: string
}

export function ChapterNav({
  canPrev,
  canNext,
  onPrev,
  onNext,
  visible,
  nextLabel = 'Continuar',
}: ChapterNavProps) {
  if (!visible) return null

  return (
    <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 flex items-end justify-between px-5 pb-6 md:px-10 md:pb-10">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        className="pointer-events-auto font-sans text-[11px] tracking-[0.22em] text-[#A6A29C] uppercase transition-colors duration-300 enabled:hover:text-[#F3EFE8] disabled:opacity-0"
        aria-label="Capítulo anterior"
      >
        Voltar
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className="pointer-events-auto group relative font-sans text-[11px] tracking-[0.24em] text-[#F3EFE8] uppercase transition-opacity duration-300 disabled:opacity-0"
        aria-label="Próximo capítulo"
      >
        <span className="relative">
          {nextLabel}
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-50 bg-[#C4A574]/70 transition-transform duration-500 group-hover:scale-x-100" />
        </span>
      </button>
    </div>
  )
}
