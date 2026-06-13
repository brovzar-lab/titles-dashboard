export const isDemoMode =
  !import.meta.env.VITE_PAPERCLIP_API_KEY ||
  import.meta.env.VITE_PAPERCLIP_API_KEY === 'REPLACE_WITH_VALUE'

export const PAPERCLIP_API_URL =
  import.meta.env.VITE_PAPERCLIP_API_URL ?? 'https://app.paperclip.ing'

export const PAPERCLIP_COMPANY_ID = import.meta.env.VITE_PAPERCLIP_COMPANY_ID ?? ''
