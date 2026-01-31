"use client"

import { useState, useCallback } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (question: string) => void
  disabled?: boolean
  className?: string
}

export function ChatInput({ onSend, disabled, className }: ChatInputProps) {
  const [value, setValue] = useState("")

  const handleSubmit = useCallback(() => {
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue("")
  }, [value, disabled, onSend])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <Input
        placeholder="Ask a question..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1"
      />
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={disabled}
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}
