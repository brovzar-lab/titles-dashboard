import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TitleProject } from '../types'

interface DetailPanelProps {
  title: TitleProject | null
  onClose: () => void
}

const FORMAT_LABEL: Record<string, string> = {
  'film/feature': 'Feature Film',
  'film/documentary': 'Documentary',
  'tv/series': 'TV Series',
  'tv/limited': 'Limited Series',
  'tv/miniseries': 'Miniseries',
}

export function DetailPanel({ title, onClose }: DetailPanelProps) {
  useEffect(() => {
    if (!title) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [title, onClose])

  return (
    <AnimatePresence>
      {title && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto bg-[#0A0D16] shadow-2xl"
          >
            {/* Hero image 16:9 */}
            <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden">
              <img
                src={title.heroUrl}
                alt={title.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0A0D16]" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-5 p-6">
              {/* Header */}
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  {FORMAT_LABEL[title.format] ?? title.format}
                </p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-white">{title.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{title.logline}</p>
              </div>

              {/* Metadata grid */}
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <MetaField label="Status" value={title.status} />
                <MetaField
                  label="Runtime"
                  value={
                    title.runtime ??
                    (title.episodes ? `${title.episodes} episodes` : '—')
                  }
                />
                <MetaField label="Format" value={FORMAT_LABEL[title.format] ?? title.format} />
                <MetaField label="Genre" value={title.genre.slice(0, 2).join(', ')} />
              </div>

              {/* Description */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Synopsis
                </p>
                <p className="text-sm leading-relaxed text-slate-300">{title.description}</p>
              </div>

              {/* Talent */}
              {title.talent.length > 0 && (
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Talent
                  </p>
                  <div className="flex flex-col gap-2">
                    {title.talent.map((t) => (
                      <div
                        key={t.name}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5"
                      >
                        <span className="text-sm font-medium text-white">{t.name}</span>
                        <span className="text-xs text-slate-500">{t.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Open in Paperclip */}
              {title.issueId && (
                <a
                  href={`/APPU/issues/${title.issueId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/8 hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2H2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M8 1h5v5M13 1L7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Open in Paperclip
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-widest text-slate-600">{label}</p>
      <p className="mt-0.5 text-sm text-slate-200">{value}</p>
    </div>
  )
}
