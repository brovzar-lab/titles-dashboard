export type TitleLane = 'gate' | 'film' | 'tv'

export type TitleFormat =
  | 'film/feature'
  | 'film/documentary'
  | 'tv/series'
  | 'tv/limited'
  | 'tv/miniseries'

export interface TalentAttachment {
  name: string
  role: string
}

export interface TitleProject {
  id: string
  title: string
  lane: TitleLane
  format: TitleFormat
  genre: string[]
  logline: string
  description: string
  posterUrl: string
  heroUrl: string
  status: string
  talent: TalentAttachment[]
  issueId?: string
  runtime?: string
  episodes?: number
}
