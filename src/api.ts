import { PAPERCLIP_API_URL, PAPERCLIP_COMPANY_ID } from './config'
import type { TitleProject, TitleLane, TitleFormat } from './types'

// ── Internal Paperclip types ───────────────────────────────────────────────

interface PaperclipLabel {
  id: string
  name: string
  color?: string
}

interface PaperclipIssue {
  id: string
  identifier: string
  title: string
  description: string | null
  status: string
  projectId: string | null
  labels: PaperclipLabel[]
  assigneeAgentId: string | null
}

interface PaperclipProject {
  id: string
  name: string
  urlKey: string
}

interface PaperclipAttachment {
  id: string
  name: string
  mimeType: string
  url?: string
}

// ── URL helpers (dev: direct; prod: serverless proxy) ──────────────────────

function apiUrl(path: string): string {
  if (import.meta.env.DEV && import.meta.env.VITE_PAPERCLIP_API_URL) {
    return `${import.meta.env.VITE_PAPERCLIP_API_URL}${path}`
  }
  return `/api/proxy?path=${encodeURIComponent(path)}`
}

function apiHeaders(apiKey: string): HeadersInit {
  if (import.meta.env.DEV && import.meta.env.VITE_PAPERCLIP_API_KEY) {
    return { Authorization: `Bearer ${import.meta.env.VITE_PAPERCLIP_API_KEY}` }
  }
  if (apiKey) {
    return { Authorization: `Bearer ${apiKey}` }
  }
  return {}
}

async function get<T>(path: string, apiKey: string): Promise<T> {
  const res = await fetch(apiUrl(path), { headers: apiHeaders(apiKey) })
  if (!res.ok) throw new Error(`Paperclip API ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

// ── Mapping helpers ────────────────────────────────────────────────────────

const FILM_PROJECT_KEYWORDS = ['film development', 'film']
const TV_PROJECT_KEYWORDS = ['tv development', 'television development', 'tv']
const GATE_LABELS = ['gate', 'development-gate']

function matchesAny(name: string, keywords: string[]): boolean {
  const lower = name.toLowerCase()
  return keywords.some((k) => lower.includes(k))
}

const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80'
const FALLBACK_HERO = 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=85'

function inferFormat(issue: PaperclipIssue, lane: TitleLane): TitleFormat {
  const labels = issue.labels.map((l) => l.name.toLowerCase())
  if (labels.includes('documentary')) return 'film/documentary'
  if (labels.includes('limited')) return 'tv/limited'
  if (labels.includes('miniseries')) return 'tv/miniseries'
  if (labels.includes('series') || lane === 'tv') return 'tv/series'
  return 'film/feature'
}

function parseGenres(issue: PaperclipIssue): string[] {
  const skip = new Set([...GATE_LABELS, 'film', 'tv', 'gate'])
  return issue.labels
    .map((l) => l.name)
    .filter((n) => !skip.has(n.toLowerCase()))
}

function parseLogline(description: string | null): string {
  if (!description) return ''
  const firstLine = description.split('\n').find((l) => l.trim())?.replace(/^#+\s*/, '').trim() ?? ''
  return firstLine.length > 0 && firstLine.length <= 250
    ? firstLine
    : description.split(/[.!?]/)[0]?.trim().slice(0, 250) ?? ''
}

function issueToTitle(
  issue: PaperclipIssue,
  lane: TitleLane,
  posterUrl: string | null,
): TitleProject {
  const poster = posterUrl ?? FALLBACK_POSTER
  const hero = posterUrl
    ? posterUrl.replace('w=400', 'w=1200').replace('q=80', 'q=85')
    : FALLBACK_HERO

  return {
    id: issue.id,
    title: issue.title,
    lane,
    format: inferFormat(issue, lane),
    genre: parseGenres(issue),
    logline: parseLogline(issue.description),
    description: issue.description ?? '',
    posterUrl: poster,
    heroUrl: hero,
    status: issue.status,
    talent: [],
    issueId: issue.identifier,
  }
}

// ── Poster attachment fetching ─────────────────────────────────────────────

async function fetchPosterUrl(issueId: string, apiKey: string): Promise<string | null> {
  try {
    const data = await get<{ attachments: PaperclipAttachment[] }>(
      `/api/issues/${issueId}/attachments`,
      apiKey,
    )
    const img = data.attachments.find((a) => a.mimeType?.startsWith('image/'))
    return img?.url ?? null
  } catch {
    return null
  }
}

// ── Main fetcher ───────────────────────────────────────────────────────────

export async function fetchTitles(apiKey: string): Promise<TitleProject[]> {
  const cid = PAPERCLIP_COMPANY_ID
  if (!cid) throw new Error('VITE_PAPERCLIP_COMPANY_ID not set')

  // Discover Film / TV project IDs and fetch gate (in_review) issues in parallel
  const [projectsData, gateData] = await Promise.all([
    get<{ projects: PaperclipProject[] }>(`/api/companies/${cid}/projects`, apiKey),
    get<{ issues: PaperclipIssue[] }>(
      `/api/companies/${cid}/issues?status=in_review&limit=50`,
      apiKey,
    ),
  ])

  const filmProjectId =
    projectsData.projects.find((p) => matchesAny(p.name, FILM_PROJECT_KEYWORDS))?.id ?? null
  const tvProjectId =
    projectsData.projects.find((p) => matchesAny(p.name, TV_PROJECT_KEYWORDS))?.id ?? null

  // Fetch Film / TV project issues (empty if no project found)
  const [filmData, tvData] = await Promise.all([
    filmProjectId
      ? get<{ issues: PaperclipIssue[] }>(
          `/api/companies/${cid}/issues?projectId=${filmProjectId}&limit=50`,
          apiKey,
        )
      : Promise.resolve({ issues: [] as PaperclipIssue[] }),
    tvProjectId
      ? get<{ issues: PaperclipIssue[] }>(
          `/api/companies/${cid}/issues?projectId=${tvProjectId}&limit=50`,
          apiKey,
        )
      : Promise.resolve({ issues: [] as PaperclipIssue[] }),
  ])

  // Gate: in_review issues + anything labeled gate/development-gate across all lanes
  const filmGate = filmData.issues.filter((i) =>
    i.labels.some((l) => GATE_LABELS.includes(l.name.toLowerCase())),
  )
  const tvGate = tvData.issues.filter((i) =>
    i.labels.some((l) => GATE_LABELS.includes(l.name.toLowerCase())),
  )
  const gateIds = new Set<string>()
  const gateIssues: PaperclipIssue[] = []
  for (const issue of [...gateData.issues, ...filmGate, ...tvGate]) {
    if (!gateIds.has(issue.id)) {
      // Exclude gate issues already in film/tv project lanes unless they are explicitly in gate status
      const inFilm = filmProjectId && issue.projectId === filmProjectId
      const inTv = tvProjectId && issue.projectId === tvProjectId
      if (!inFilm && !inTv) {
        gateIds.add(issue.id)
        gateIssues.push(issue)
      } else if (issue.labels.some((l) => GATE_LABELS.includes(l.name.toLowerCase()))) {
        gateIds.add(issue.id)
        gateIssues.push(issue)
      }
    }
  }

  const filmIssues = filmData.issues.filter((i) => !gateIds.has(i.id))
  const tvIssues = tvData.issues.filter((i) => !gateIds.has(i.id))

  // Fetch poster attachments concurrently
  const allIssues = [...gateIssues, ...filmIssues, ...tvIssues]
  const posterEntries = await Promise.all(
    allIssues.map(async (issue) => {
      const url = await fetchPosterUrl(issue.id, apiKey)
      return [issue.id, url] as const
    }),
  )
  const posterMap = new Map(posterEntries)

  return [
    ...gateIssues.map((i) => issueToTitle(i, 'gate', posterMap.get(i.id) ?? null)),
    ...filmIssues.map((i) => issueToTitle(i, 'film', posterMap.get(i.id) ?? null)),
    ...tvIssues.map((i) => issueToTitle(i, 'tv', posterMap.get(i.id) ?? null)),
  ]
}

// Keep PAPERCLIP_API_URL visible to TS (used in config import side-effect check)
export { PAPERCLIP_API_URL }
