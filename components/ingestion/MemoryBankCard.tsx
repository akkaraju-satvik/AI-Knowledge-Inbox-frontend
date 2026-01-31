"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { SavedItemsList } from "./SavedItemsList"
import type { SavedItem } from "@/types"

interface MemoryBankCardProps {
  items: SavedItem[]
}

export function MemoryBankCard({ items }: MemoryBankCardProps) {
  return (
    <Card className="flex-1 min-h-0 flex flex-col overflow-hidden">
      <CardHeader className="shrink-0 pb-2 border-b">
        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Memory Bank ({items.length})
        </CardTitle>
      </CardHeader>
      <div className="flex-1 min-h-0 overflow-hidden">
        <SavedItemsList items={items} />
      </div>
    </Card>
  )
}
