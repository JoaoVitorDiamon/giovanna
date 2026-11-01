import { motion } from 'motion/react'

interface StoryProgressProps {
  index: number
  count: number
  visible: boolean
}

/** Instagram Stories–style bars — one segment per day */
export function StoryProgress({ index, count, visible }: StoryProgressProps) {
  if (!visible || count < 1) return null

  return (
    <div
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 px-3 pt-[max(0.65rem,env(safe-area-inset-top))]"
      aria-hidden
    >
      <div className="flex gap-[2px]">
        {Array.from({ length: count }, (_, i) => {
          const filled = i < index
          const current = i === index
          return (
            <div key={i} className="h-[2.5px] flex-1 overflow-hidden rounded-full bg-[#F3EFE8]/22">
              <motion.div
                className="h-full rounded-full bg-[#F3EFE8]"
                initial={false}
                animate={{
                  width: filled || current ? '100%' : '0%',
                  opacity: current ? 1 : filled ? 0.65 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
