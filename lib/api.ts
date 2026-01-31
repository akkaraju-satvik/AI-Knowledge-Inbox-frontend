import type { SavedItem } from "@/types"

const API_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) ||
  "http://localhost:8000"

interface IngestResponse {
  message?: string
}

interface QueryResponse {
  answer?: string
  sources?: string[] | Record<string, unknown>[]
  error?: string
}

interface ListDocumentsResponse {
  documents: {
    id: number
    content: string | null
    type: string | null
    url: string | null
    ingested_at: string | null
  }[]
}

function normalizeSource(source: string | Record<string, unknown>): string {
  if (typeof source === "string") return source
  if (source && typeof source === "object") {
    const src = source as Record<string, unknown>
    if (typeof src.source === "string") return src.source
    if (typeof src.url === "string") return src.url
    if (typeof src.page_content === "string") return src.page_content
  }
  return JSON.stringify(source)
}

export async function ingestContent(
  type: "text" | "url",
  content: string
): Promise<IngestResponse> {
  const res = await fetch(`${API_URL}/ingest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, content }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { detail?: string }).detail || "Failed to save")
  }
  return res.json()
}

export async function askQuestion(question: string): Promise<{
  answer: string
  sources: string[]
}> {
  const res = await fetch(`${API_URL}/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  })
  if (!res.ok) throw new Error("Failed to get answer")
  const data = (await res.json()) as QueryResponse
  if (data.error) throw new Error(data.error)
  const sources = Array.isArray(data.sources)
    ? data.sources.map(normalizeSource)
    : []
  return { answer: data.answer ?? "", sources }
}

export async function getItems(): Promise<SavedItem[]> {
  const res = await fetch(`${API_URL}/list_documents`)
  if (!res.ok) throw new Error("Failed to fetch items")
  const data = (await res.json()) as ListDocumentsResponse
  return (data.documents ?? []).map((document) => ({
    id: document.id,
    content: document.content ?? "",
    source: document.url?.trim() ? document.url : "Note",
    type: (document.type === "url" ? "url" : "text") as "url" | "text",
    created_at: document.ingested_at ?? new Date().toISOString(),
  }))
}

export async function deleteDocument(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/documents/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete")
}
