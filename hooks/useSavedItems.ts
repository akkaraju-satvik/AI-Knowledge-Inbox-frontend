"use client"

import { useState, useEffect, useCallback } from "react"
import { getItems } from "@/lib/api"
import type { SavedItem } from "@/types"

export function useSavedItems() {
  const [items, setItems] = useState<SavedItem[]>([])
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      const data = await getItems()
      setItems(data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Could not fetch saved items. Is the backend running?")
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { items, error, refresh }
}
