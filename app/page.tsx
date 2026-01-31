"use client"

import { useSavedItems, useChat } from "@/hooks"
import { AddKnowledgeCard, MemoryBankCard } from "@/components/ingestion"
import { ChatPanel } from "@/components/chat"
import { ConnectionAlert } from "@/components/common"

export default function Home() {
  const { items, error, refresh } = useSavedItems()
  const { history, loading, ask } = useChat()

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <ConnectionAlert message={error ?? ""} />

      <div className="flex-1 min-h-0 overflow-hidden p-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-0">
          <section className="lg:col-span-4 flex flex-col gap-6 min-h-0 h-full">
            <div className="shrink-0">
              <AddKnowledgeCard onIngested={refresh} />
            </div>
            <MemoryBankCard items={items} />
          </section>

          <section className="lg:col-span-8 min-h-0 h-full">
            <ChatPanel history={history} loading={loading} onAsk={ask} />
          </section>
        </div>
      </div>
    </div>
  )
}
