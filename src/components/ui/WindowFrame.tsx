/** Cinematic window mullion overlay for longing scenes */
export function WindowFrame() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[15]">
      <div className="absolute inset-[8%] border border-[#F3EFE8]/10 md:inset-[10%_18%]" />
      <div className="absolute top-[8%] bottom-[8%] left-1/2 w-px -translate-x-1/2 bg-[#F3EFE8]/10 md:top-[10%] md:bottom-[10%]" />
      <div className="absolute right-[8%] left-[8%] top-1/2 h-px -translate-y-1/2 bg-[#F3EFE8]/08 md:right-[18%] md:left-[18%]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(9,9,9,0.35) 0%, transparent 20%, transparent 70%, rgba(9,9,9,0.55) 100%)',
        }}
      />
    </div>
  )
}
