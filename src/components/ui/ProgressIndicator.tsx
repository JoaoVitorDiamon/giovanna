import { motion } from 'motion/react'
import { chapters } from '../../config/experience'

interface ProgressIndicatorProps {
  index: number
  total: number
  visible: boolean
  onSelect?: (index: number) => void
}

export function ProgressIndicator({
  index,
  total,
  visible,
  onSelect,
}: ProgressIndicatorProps) {
  if (!visible) return null

  const progress = total <= 1 ? 0 : index / (total - 1)
  const meta = chapters[index]

  return (
    <div className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex items-start justify-between px-5 pt-5 md:px-10 md:pt-8">
      <div className="pointer-events-auto">
        <p className="font-sans text-[10px] tracking-[0.28em] text-[#A6A29C] uppercase md:text-[11px]">
          {meta?.label}
        </p>
      </div>

      <div className="pointer-events-auto flex flex-col items-end gap-3">
        <div className="flex items-center gap-2">
          {chapters.map((chapter, i) => (
            <button
              key={chapter.id}
              type="button"
              aria-label={`Ir para ${chapter.label}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => onSelect?.(i)}
              className="group relative flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`block h-[3px] rounded-full transition-all duration-500 ${
                  i === index
                    ? 'w-5 bg-[#C4A574]'
                    : i < index
                      ? 'w-2.5 bg-[#F3EFE8]/55'
                      : 'w-2.5 bg-[#F3EFE8]/22 group-hover:bg-[#F3EFE8]/4'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="h-px w-24 overflow-hidden bg-[#F3EFE8]/12 md:w-32">
          <motion.div
            className="h-full bg-[#C4A574]/80"
            initial={false}
            animate={{ scaleX: progress }}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  )
}
