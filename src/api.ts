import { PAPERCLIP_API_URL, PAPERCLIP_COMPANY_ID } from './config'
import { TitleProject } from './types'

// Phase A: placeholder — real integration in Phase B once backend schema is agreed
export async function fetchTitles(_apiKey: string): Promise<TitleProject[]> {
  const res = await fetch(
    `${PAPERCLIP_API_URL}/api/companies/${PAPERCLIP_COMPANY_ID}/issues?labelId=title&status=todo,in_progress,backlog`,
    {
      headers: {
        Authorization: `Bearer ${_apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  )
  if (!res.ok) throw new Error(`API error ${res.status}`)
  // TODO: map Paperclip issues to TitleProject shape when schema is finalised
  return []
}
