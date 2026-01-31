"use client"

import { useState, useCallback } from "react"
import { askQuestion } from "@/lib/api"
import type { ChatMessage } from "@/types"

export function useChat() {
  const [history, setHistory] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)

  const ask = useCallback(async (question: string) => {
    if (!question.trim()) return
    setLoading(true)
    const userMsg: ChatMessage = { role: "user", content: question }
    setHistory((prev) => [...prev, userMsg])
    try {
      const res = await askQuestion(question)
      const aiMsg: ChatMessage = {
        role: "assistant",
        content: res.answer,
        sources: res.sources,
      }
      setHistory((prev) => [...prev, aiMsg])
    } catch (e) {
      console.error(e)
      const errorMsg: ChatMessage = {
        role: "assistant",
        content: "Error: Could not retrieve answer from the backend.",
      }
      setHistory((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }, [])

  return { history, loading, ask }
}
