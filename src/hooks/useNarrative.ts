import { useCallback, useMemo, useState } from 'react'
import {
  chapters,
  narrativeOrder,
  type ChapterId,
} from '../config/experience'

export function useNarrative() {
  const [index, setIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)

  const currentId = narrativeOrder[index] as ChapterId
  const currentMeta = chapters[index]
  const isFirst = index === 0
  const isLast = index === narrativeOrder.length - 1
  const progress = index / (narrativeOrder.length - 1)

  const goTo = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(narrativeOrder.length - 1, nextIndex))
      if (clamped === index) return
      setDirection(clamped > index ? 1 : -1)
      setIndex(clamped)
      if (clamped > 0) setStarted(true)
    },
    [index],
  )

  const next = useCallback(() => {
    if (isLast) return
    setDirection(1)
    setIndex((i) => Math.min(narrativeOrder.length - 1, i + 1))
    setStarted(true)
  }, [isLast])

  const prev = useCallback(() => {
    if (isFirst) return
    setDirection(-1)
    setIndex((i) => Math.max(0, i - 1))
  }, [isFirst])

  const start = useCallback(() => {
    setStarted(true)
    setDirection(1)
    setIndex(1)
  }, [])

  const restart = useCallback(() => {
    setDirection(-1)
    setStarted(false)
    setIndex(0)
  }, [])

  const chapterIndex = useMemo(
    () => Object.fromEntries(narrativeOrder.map((id, i) => [id, i])) as Record<
      ChapterId,
      number
    >,
    [],
  )

  return {
    index,
    currentId,
    currentMeta,
    direction,
    started,
    isFirst,
    isLast,
    progress,
    chapterIndex,
    goTo,
    next,
    prev,
    start,
    restart,
    total: narrativeOrder.length,
  }
}

export type NarrativeApi = ReturnType<typeof useNarrative>
