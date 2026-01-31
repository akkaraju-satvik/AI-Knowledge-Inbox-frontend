"use client"

import { useRef, useEffect } from "react"
import { Bot, Database } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessageBubble } from "./ChatMessageBubble"
import { ChatInput } from "./ChatInput"
import type { ChatMessage } from "@/types"

interface ChatPanelProps {
  history: ChatMessage[]
  loading: boolean
  onAsk: (question: string) => void
}

export function ChatPanel({ history, loading, onAsk }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Bot className="h-6 w-6 text-primary" />
          RAG Assistant
        </CardTitle>
        <CardDescription>
          Ask questions based on your saved notes and URLs.
        </CardDescription>
      </CardHeader>
      <ScrollArea className="flex-1 min-h-0 p-6">
        <div className="space-y-6">
          {history.length === 0 && (
            <div className="flex flex-col items-center justify-center text-muted-foreground mt-20">
              <Database className="h-16 w-16 opacity-20 mb-4" />
              <p className="text-sm font-medium">Knowledge base ready. Ask away.</p>
            </div>
          )}
          {history.map((msg, i) => (
            <ChatMessageBubble key={i} message={msg} />
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <CardContent className="p-4 border-t">
        <ChatInput onSend={onAsk} disabled={loading} />
      </CardContent>
    </Card>
  )
}
