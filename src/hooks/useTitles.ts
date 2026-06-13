import { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { isDemoMode } from '../config'
import { DEMO_TITLES } from '../demoData'
import { fetchTitles } from '../api'
import { showToast } from '../components/Toast'
import type { TitleProject } from '../types'

const POLL_MS = Number(import.meta.env.VITE_POLL_INTERVAL_MS ?? 30_000)

export function useTitles(): {
  data: TitleProject[]
  isLoading: boolean
  isError: boolean
  isDemo: boolean
} {
  const errorToastedRef = useRef(false)

  const query = useQuery<TitleProject[], Error>({
    queryKey: ['titles', import.meta.env.VITE_PAPERCLIP_COMPANY_ID],
    queryFn: () => fetchTitles(import.meta.env.VITE_PAPERCLIP_API_KEY ?? ''),
    enabled: !isDemoMode,
    refetchInterval: POLL_MS,
    retry: 1,
    staleTime: 0,
  })

  useEffect(() => {
    if (query.isError && !errorToastedRef.current) {
      errorToastedRef.current = true
      showToast('Could not reach Paperclip API — showing demo data', 'warning')
    }
    if (!query.isError) {
      errorToastedRef.current = false
    }
  }, [query.isError])

  if (isDemoMode) {
    return { data: DEMO_TITLES, isLoading: false, isError: false, isDemo: true }
  }

  return {
    data: query.isError ? DEMO_TITLES : (query.data ?? []),
    isLoading: query.isLoading,
    isError: query.isError,
    isDemo: query.isError,
  }
}
