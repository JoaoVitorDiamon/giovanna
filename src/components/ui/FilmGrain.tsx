export function FilmGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay opacity-[0.07]"
    >
      <div className="grain h-full w-full animate-[grain-shift_8s_steps(10)_infinite]" />
      <style>{`
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 0.5%); }
          30% { transform: translate(-0.5%, 1%); }
          40% { transform: translate(0.5%, -0.5%); }
          50% { transform: translate(-1%, 0.5%); }
          60% { transform: translate(1%, -1%); }
          70% { transform: translate(-0.5%, -0.5%); }
          80% { transform: translate(0.5%, 1%); }
          90% { transform: translate(-1%, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[grain-shift_8s_steps\\(10\\)_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
