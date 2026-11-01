interface ContinueWhisperProps {
  label?: string
  className?: string
}

export function continueNarrative() {
  window.dispatchEvent(new CustomEvent('narrative:next'))
}

export function ContinueWhisper({
  label = 'Toque para continuar',
  className = '',
}: ContinueWhisperProps) {
  return (
    <button
      type="button"
      onClick={continueNarrative}
      className={`min-h-11 font-sans text-[10px] tracking-[0.24em] text-[#F3EFE8]/85 uppercase ${className}`}
    >
      {label}
    </button>
  )
}
