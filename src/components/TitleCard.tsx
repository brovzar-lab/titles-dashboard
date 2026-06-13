import { motion } from 'framer-motion'
import { TitleProject } from '../types'

const LANE_STATUS_COLORS: Record<string, string> = {
  'Gate Review': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Script Development': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Packaging: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Financing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Writers Room': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Pilot Script': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Greenlit: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
}

interface TitleCardProps {
  title: TitleProject
  onClick: () => void
  index: number
}

export function TitleCard({ title, onClick, index }: TitleCardProps) {
  const statusClass =
    LANE_STATUS_COLORS[title.status] ?? 'bg-slate-500/20 text-slate-300 border-slate-500/30'

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}
      onClick={onClick}
      className="group w-full overflow-hidden rounded-xl border border-white/5 bg-[#0F1420] text-left transition-colors hover:border-white/10 focus:outline-none"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={title.posterUrl}
          alt={title.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D16] via-[#0A0D16]/30 to-transparent" />

        {/* Bottom text on poster */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-serif text-base font-semibold leading-tight text-white drop-shadow-lg line-clamp-2">
            {title.title}
          </h3>
          <p className="mt-1 text-xs leading-snug text-slate-300/80 line-clamp-2 drop-shadow">
            {title.logline}
          </p>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-3 py-2.5">
        {/* Genre chips */}
        <div className="flex flex-wrap gap-1">
          {title.genre.slice(0, 2).map((g) => (
            <span
              key={g}
              className="rounded-full border border-white/8 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400"
            >
              {g}
            </span>
          ))}
          {title.genre.length > 2 && (
            <span className="rounded-full border border-white/8 bg-white/5 px-2 py-0.5 text-[10px] text-slate-500">
              +{title.genre.length - 2}
            </span>
          )}
        </div>

        {/* Status chip */}
        <div className="mt-2 flex items-center justify-between">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${statusClass}`}
          >
            {title.status}
          </span>
          <span className="text-[10px] text-slate-500">
            {title.format.split('/')[1]}
          </span>
        </div>
      </div>
    </motion.button>
  )
}
