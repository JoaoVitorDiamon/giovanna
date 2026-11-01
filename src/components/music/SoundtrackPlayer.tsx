import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { assets } from '../../config/experience'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function SoundtrackPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [available, setAvailable] = useState(true)
  const [current, setCurrent] = useState(0)
  const [barCount, setBarCount] = useState(24)

  useEffect(() => {
    const update = () => setBarCount(window.innerWidth < 420 ? 18 : window.innerWidth < 768 ? 24 : 32)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const bars = useMemo(
    () =>
      Array.from({ length: barCount }, (_, i) => ({
        id: i,
        h: 18 + ((i * 17) % 48),
      })),
    [barCount],
  )

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume

    const onTime = () => {
      setCurrent(audio.currentTime)
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    }
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnded = () => setPlaying(false)
    const onError = () => {
      setAvailable(false)
      setPlaying(false)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [volume])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio || !available) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }

    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setAvailable(false)
      setPlaying(false)
    }
  }

  const seek = (value: number) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    audio.currentTime = value * duration
    setProgress(value)
  }

  return (
    <div className="w-full max-w-none lg:max-w-md">
      <audio ref={audioRef} src={assets.soundtrack} preload="metadata" />

      <div className="relative w-full overflow-hidden rounded-sm border border-[#F3EFE8]/10 bg-[#F3EFE8]/[0.03] px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5 md:px-6 md:py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 30% 0%, rgba(196,165,116,0.18), transparent 55%)',
          }}
        />

        <div className="relative mb-4 flex h-12 items-end justify-between gap-[2px] sm:mb-5 sm:h-14 sm:gap-[3px]">
          {bars.map((bar) => (
            <motion.span
              key={bar.id}
              className="min-w-[2px] flex-1 origin-bottom rounded-full bg-[#C4A574]/55"
              animate={
                playing
                  ? {
                      height: [
                        `${bar.h * 0.35}%`,
                        `${bar.h}%`,
                        `${bar.h * 0.55}%`,
                        `${bar.h * 0.85}%`,
                        `${bar.h * 0.4}%`,
                      ],
                      opacity: [0.35, 0.85, 0.5, 0.75, 0.4],
                    }
                  : { height: `${Math.max(12, bar.h * 0.28)}%`, opacity: 0.28 }
              }
              transition={{
                duration: playing ? 1.1 + (bar.id % 5) * 0.12 : 0.6,
                repeat: playing ? Infinity : 0,
                ease: 'easeInOut',
                delay: (bar.id % 7) * 0.05,
              }}
              style={{ height: `${bar.h * 0.3}%` }}
            />
          ))}
        </div>

        <div className="relative flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={toggle}
            disabled={!available}
            aria-label={playing ? 'Pausar trilha' : 'Tocar trilha'}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F3EFE8]/25 text-[#F3EFE8] transition-colors hover:border-[#C4A574]/70 hover:text-[#C4A574] disabled:opacity-40"
          >
            <AnimatePresence mode="wait" initial={false}>
              {playing ? (
                <motion.span
                  key="pause"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex gap-1"
                >
                  <span className="h-3.5 w-[3px] bg-current" />
                  <span className="h-3.5 w-[3px] bg-current" />
                </motion.span>
              ) : (
                <motion.span
                  key="play"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="ml-0.5 border-y-[7px] border-l-[12px] border-y-transparent border-l-current"
                />
              )}
            </AnimatePresence>
          </button>

          <div className="min-w-0 flex-1">
            <label className="sr-only" htmlFor="soundtrack-progress">
              Progresso da trilha
            </label>
            <input
              id="soundtrack-progress"
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              disabled={!available}
              className="h-1.5 w-full max-w-full cursor-pointer appearance-none rounded-full bg-[#F3EFE8]/15 accent-[#C4A574] disabled:opacity-40"
            />
            <div className="mt-2 flex justify-between font-sans text-[10px] tracking-wider text-[#A6A29C]">
              <span>{formatTime(current)}</span>
              <span>{available ? formatTime(duration) : '—'}</span>
            </div>
          </div>
        </div>

        <div className="relative mt-3 flex items-center gap-3 sm:mt-4">
          <label
            htmlFor="soundtrack-volume"
            className="shrink-0 font-sans text-[10px] tracking-[0.18em] text-[#A6A29C] uppercase"
          >
            Vol
          </label>
          <input
            id="soundtrack-volume"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="h-1.5 w-full min-w-0 cursor-pointer appearance-none rounded-full bg-[#F3EFE8]/15 accent-[#C4A574]"
            aria-label="Volume"
          />
        </div>

        {!available && (
          <p className="relative mt-3 break-words font-sans text-[11px] leading-relaxed text-[#A6A29C]/90 sm:mt-4">
            Coloque uma trilha autorizada em{' '}
            <span className="text-[#F3EFE8]/80">public/assets/soundtrack.mp3</span>.
          </p>
        )}
      </div>
    </div>
  )
}
