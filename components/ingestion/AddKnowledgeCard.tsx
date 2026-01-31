"use client"

import { useState } from "react"
import { Plus, RefreshCw, FileText, Link as LinkIcon, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ingestContent } from "@/lib/api"

type IngestTab = "text" | "url"

interface AddKnowledgeCardProps {
  onIngested?: () => void
}

export function AddKnowledgeCard({ onIngested }: AddKnowledgeCardProps) {
  const [activeTab, setActiveTab] = useState<IngestTab>("text")
  const [input, setInput] = useState("")
  const [ingesting, setIngesting] = useState(false)

  const handleIngest = async () => {
    if (!input.trim()) return
    setIngesting(true)
    try {
      await ingestContent(activeTab, input)
      setInput("")
      onIngested?.()
    } catch (e) {
      console.error(e)
      alert("Failed to save content. Check console.")
    } finally {
      setIngesting(false)
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Add Knowledge
        </CardTitle>
        <CardDescription>Add notes or URLs to your knowledge base.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          <Button
            variant={activeTab === "text" ? "default" : "ghost"}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab("text")}
          >
            <FileText className="w-4 h-4 mr-2" /> Text
          </Button>
          <Button
            variant={activeTab === "url" ? "default" : "ghost"}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab("url")}
          >
            <LinkIcon className="w-4 h-4 mr-2" /> URL
          </Button>
        </div>
        <Textarea
          placeholder={
            activeTab === "url"
              ? "https://example.com/article"
              : "Paste your notes here..."
          }
          className="min-h-[120px] resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleIngest}
          disabled={ingesting}
          className="w-full"
        >
          {ingesting ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {ingesting ? "Ingesting..." : "Save to Memory"}
        </Button>
      </CardFooter>
    </Card>
  )
}
