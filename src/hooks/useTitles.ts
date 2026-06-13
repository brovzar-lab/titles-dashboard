import { useQuery } from '@tanstack/react-query'
import { isDemoMode } from '../config'
import { DEMO_TITLES } from '../demoData'
import { fetchTitles } from '../api'
import { TitleProject } from '../types'

export function useTitles() {
  return useQuery<TitleProject[]>({
    queryKey: ['titles'],
    queryFn: () => {
      if (isDemoMode) return Promise.resolve(DEMO_TITLES)
      const apiKey = import.meta.env.VITE_PAPERCLIP_API_KEY as string
      return fetchTitles(apiKey)
    },
    staleTime: 60_000,
    refetchInterval: isDemoMode ? false : 30_000,
  })
}
