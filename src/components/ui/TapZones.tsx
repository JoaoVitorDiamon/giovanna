import type { SyntheticEvent } from 'react'

interface TapZonesProps {
  onPrev: () => void
  onNext: () => void
  enabled: boolean
}

/**
 * Stories no iPhone: toque à esquerda volta, à direita avança.
 * O próprio botão não pode se cancelar — antes o clique era ignorado
 * porque o alvo era um <button>.
 */
export function TapZones({ onPrev, onNext, enabled }: TapZonesProps) {
  if (!enabled) return null

  const go =
    (fn: () => void) => (event: SyntheticEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      fn()
    }

  return (
    <div className="fixed inset-0 z-[45] flex">
      <button
        type="button"
        aria-label="Story anterior"
        data-tap-zone="prev"
        className="h-full w-[32%] touch-manipulation bg-transparent"
        onClick={go(onPrev)}
      />
      <button
        type="button"
        aria-label="Próximo story"
        data-tap-zone="next"
        className="h-full flex-1 touch-manipulation bg-transparent"
        onClick={go(onNext)}
      />
    </div>
  )
}
