"use client"

import type { ChatMessage } from "@/types"
import { cn } from "@/lib/utils"

interface ChatMessageBubbleProps {
  message: ChatMessage
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex flex-col",
        isUser ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card border rounded-tl-sm"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-2 border-t border-border/50">
            <p className="text-xs font-semibold opacity-80 mb-1">Sources</p>
            <div className="flex gap-1 flex-wrap">
              {Array.from(new Set(message.sources)).map((s, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-muted px-2 py-0.5 rounded-full truncate max-w-[180px]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
