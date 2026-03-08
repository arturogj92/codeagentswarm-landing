export interface ResendEmail {
  id: string
  from: string
  to: string[]
  subject: string
  created_at: string
  html?: string
  text?: string
  last_event: string
}

export interface ResendEmailListResponse {
  data: ResendEmail[]
}

export interface ResendReceivedEmail {
  id: string
  from: string
  to: string[]
  subject: string
  created_at: string
  html?: string
  text?: string
}

export interface ResendReceivedEmailListResponse {
  data: ResendReceivedEmail[]
}
