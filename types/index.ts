export interface SavedItem {
  id: number
  content: string
  source: string
  type: "url" | "text"
  created_at: string
}
