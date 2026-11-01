export function Vignette({ intensity = 0.55 }: { intensity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        background: `radial-gradient(ellipse at center, transparent 35%, rgba(9,9,9,${intensity}) 100%)`,
      }}
    />
  )
}
