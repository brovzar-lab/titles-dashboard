export function DemoBadge() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
      <span className="text-xs font-medium tracking-wide text-amber-300 uppercase">Demo Mode</span>
    </div>
  )
}
