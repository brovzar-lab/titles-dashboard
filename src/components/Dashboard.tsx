import { useState } from 'react'
import { useTitles } from '../hooks/useTitles'
import { TitleCard } from './TitleCard'
import { DetailPanel } from './DetailPanel'
import { DemoBadge } from './DemoBadge'
import { TitleProject, TitleLane } from '../types'
import { isDemoMode } from '../config'

const LANES: { id: TitleLane; label: string; accent: string; headerBg: string; countBg: string }[] = [
  {
    id: 'gate',
    label: 'Development Gate',
    accent: 'border-t-amber-500',
    headerBg: 'from-amber-500/10 to-transparent',
    countBg: 'bg-amber-500/15 text-amber-300',
  },
  {
    id: 'film',
    label: 'Film Development',
    accent: 'border-t-blue-500',
    headerBg: 'from-blue-500/10 to-transparent',
    countBg: 'bg-blue-500/15 text-blue-300',
  },
  {
    id: 'tv',
    label: 'TV Development',
    accent: 'border-t-rose-600',
    headerBg: 'from-rose-600/10 to-transparent',
    countBg: 'bg-rose-600/15 text-rose-300',
  },
]

function LaneSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="aspect-[2/3] w-full animate-pulse rounded-xl bg-white/5" />
      ))}
    </div>
  )
}

export function Dashboard() {
  const { data: titles, isLoading, error } = useTitles()
  const [selected, setSelected] = useState<TitleProject | null>(null)

  const byLane = (lane: TitleLane) =>
    (titles ?? []).filter((t) => t.lane === lane)

  return (
    <>
      <div className="min-h-screen bg-[#06080F] px-6 py-8 md:px-10 lg:px-14">
        {/* Header */}
        <header className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-600">
              Development Pipeline
            </p>
            <h1 className="mt-1 font-serif text-3xl font-bold text-white">Titles</h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-600">
              {titles ? `${titles.length} titles` : '—'}
            </p>
          </div>
        </header>

        {error && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            Failed to load titles. Showing demo data.
          </div>
        )}

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LANES.map((lane) => {
            const cards = byLane(lane.id)
            return (
              <div key={lane.id} className="flex flex-col">
                {/* Lane header */}
                <div
                  className={`mb-4 rounded-xl border-t-2 ${lane.accent} bg-gradient-to-b ${lane.headerBg} px-4 py-3`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                      {lane.label}
                    </h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${lane.countBg}`}
                    >
                      {isLoading ? '…' : cards.length}
                    </span>
                  </div>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-4">
                  {isLoading ? (
                    <LaneSkeleton />
                  ) : cards.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/8 py-12 text-center text-xs text-slate-600">
                      No titles
                    </div>
                  ) : (
                    cards.map((t, i) => (
                      <TitleCard
                        key={t.id}
                        title={t}
                        index={i}
                        onClick={() => setSelected(t)}
                      />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {isDemoMode && !selected && <DemoBadge />}
      <DetailPanel title={selected} onClose={() => setSelected(null)} />
    </>
  )
}
