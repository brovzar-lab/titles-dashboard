import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToastMessage {
  id: number
  message: string
  kind: 'info' | 'error' | 'warning'
}

let _nextId = 0
const _listeners: Array<(t: ToastMessage) => void> = []

export function showToast(message: string, kind: ToastMessage['kind'] = 'info') {
  const t: ToastMessage = { id: ++_nextId, message, kind }
  _listeners.forEach((fn) => fn(t))
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    const handler = (t: ToastMessage) => {
      setToasts((prev) => [...prev, t])
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== t.id)), 4500)
    }
    _listeners.push(handler)
    return () => {
      const i = _listeners.indexOf(handler)
      if (i >= 0) _listeners.splice(i, 1)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium shadow-xl backdrop-blur-sm border ${
              t.kind === 'error'
                ? 'border-red-500/30 bg-red-900/70 text-red-200'
                : t.kind === 'warning'
                  ? 'border-amber-500/30 bg-amber-900/70 text-amber-200'
                  : 'border-white/10 bg-[#1E2535]/90 text-white/90'
            }`}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
