import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { memories, type ChapterId } from '../config/experience'
import { useNarrative } from '../hooks/useNarrative'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ChapterFinale } from './chapters/ChapterFinale'
import { ChapterMusic } from './chapters/ChapterMusic'
import { MemoryStory } from './chapters/MemoryStory'
import { Opening } from './chapters/Opening'
import { CustomCursor } from './ui/CustomCursor'
import { FilmGrain } from './ui/FilmGrain'
import { StoryProgress } from './ui/StoryProgress'
import { TapZones } from './ui/TapZones'

const ease = [0.22, 1, 0.36, 1] as const

function ChapterScene({
  id,
  onStart,
  onRestart,
}: {
  id: ChapterId
  onStart: () => void
  onRestart: () => void
}) {
  if (id === 'opening') return <Opening onStart={onStart} />
  if (id === 'music') return <ChapterMusic />
  if (id === 'finale') return <ChapterFinale onRestart={onRestart} />

  const memoryIndex = memories.findIndex((memory) => memory.id === id)
  const memory = memories[memoryIndex]
  if (!memory) return null

  return <MemoryStory memory={memory} index={memoryIndex} total={memories.length} />
}

export function Experience() {
  const narrative = useNarrative()
  const reduced = usePrefersReducedMotion()
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const lock = useRef(false)

  const advance = () => {
    if (lock.current) return
    lock.current = true
    window.setTimeout(() => {
      lock.current = false
    }, 650)
    if (narrative.currentId === 'opening') return
    narrative.next()
  }

  const goBack = () => {
    if (lock.current) return
    lock.current = true
    window.setTimeout(() => {
      lock.current = false
    }, 650)
    narrative.prev()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        if (narrative.currentId === 'opening') narrative.start()
        else advance()
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goBack()
      }
      if (e.key === 'Home') {
        e.preventDefault()
        narrative.restart()
      }
    }
    const onNextEvent = () => advance()
    window.addEventListener('keydown', onKey)
    window.addEventListener('narrative:next', onNextEvent)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('narrative:next', onNextEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narrative.currentId, narrative])

  useEffect(() => {
    const blockedControl = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false
      if (target.closest('[data-tap-zone]')) return false
      return Boolean(target.closest('button, a, input, textarea, [role="slider"], [data-no-tap]'))
    }

    const onStart = (e: TouchEvent) => {
      if (blockedControl(e.target)) {
        touchStart.current = null
        return
      }
      const t = e.changedTouches[0]
      if (!t) return
      touchStart.current = { x: t.clientX, y: t.clientY }
    }

    const onEnd = (e: TouchEvent) => {
      const start = touchStart.current
      const t = e.changedTouches[0]
      if (!start || !t) return
      const dx = t.clientX - start.x
      const dy = t.clientY - start.y
      touchStart.current = null

      const tapZone = e.target instanceof Element ? e.target.closest('[data-tap-zone]') : null
      const moved = Math.hypot(dx, dy)

      // Toque parado no story: avança ou volta. O lock evita disparo duplo com o click.
      if (tapZone && moved < 18) {
        if (tapZone.getAttribute('data-tap-zone') === 'prev') goBack()
        else advance()
        return
      }

      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) advance()
        else goBack()
      }
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narrative.currentId, narrative])

  const memoryIndex = memories.findIndex((memory) => memory.id === narrative.currentId)
  const showStoryUi = memoryIndex >= 0

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#090909] text-[#F3EFE8] select-none">
      <CustomCursor />
      <FilmGrain />
      <StoryProgress index={memoryIndex} count={memories.length} visible={showStoryUi} />

      <AnimatePresence mode="wait" custom={narrative.direction}>
        <motion.div
          key={narrative.currentId}
          custom={narrative.direction}
          className="absolute inset-0"
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: narrative.direction > 0 ? 28 : -28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, x: narrative.direction > 0 ? -24 : 24 }}
          transition={{ duration: reduced ? 0.15 : 0.55, ease }}
        >
          <ChapterScene
            id={narrative.currentId}
            onStart={narrative.start}
            onRestart={narrative.restart}
          />
        </motion.div>
      </AnimatePresence>

      <TapZones enabled={showStoryUi} onPrev={goBack} onNext={advance} />

      {showStoryUi && (
        <p className="pointer-events-none fixed bottom-[max(0.85rem,env(safe-area-inset-bottom))] left-0 right-0 z-40 text-center font-sans text-[9px] tracking-[0.28em] text-[#A6A29C]/70 uppercase">
          Toque à direita para continuar
        </p>
      )}

      <AnimatePresence>
        {!reduced && (
          <motion.div
            key={`bloom-${narrative.currentId}`}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[35]"
            initial={{ opacity: 0.28 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.9, ease }}
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(196,165,116,0.2), transparent 58%)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
