"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { SavedItem } from "@/types"

interface SavedItemsListProps {
  items: SavedItem[]
}

export function SavedItemsList({ items }: SavedItemsListProps) {
  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-3">
        {items.length === 0 && (
          <div className="text-center text-muted-foreground py-10 text-sm">
            No items saved yet.
          </div>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-xs font-normal">
                {item.type === "url" ? "WEB" : "NOTE"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-foreground line-clamp-2 font-medium">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
