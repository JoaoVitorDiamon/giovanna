interface TapZonesProps {
  onPrev: () => void
  onNext: () => void
  enabled: boolean
}

/**
 * iPhone Stories navigation:
 * tap left = back, tap right = forward.
 * Ignores controls marked with data-no-tap.
 */
export function TapZones({ onPrev, onNext, enabled }: TapZonesProps) {
  if (!enabled) return null

  const guard = (e: React.SyntheticEvent, fn: () => void) => {
    const t = e.target
    if (t instanceof Element && t.closest('[data-no-tap], button, a, input, textarea, [role="slider"]')) {
      return
    }
    fn()
  }

  return (
    <div className="absolute inset-0 z-30 flex touch-manipulation">
      <button
        type="button"
        aria-label="Anterior"
        className="h-full w-[28%] bg-transparent"
        onClick={(e) => guard(e, onPrev)}
      />
      <button
        type="button"
        aria-label="Próximo"
        className="h-full flex-1 bg-transparent"
        onClick={(e) => guard(e, onNext)}
      />
    </div>
  )
}
