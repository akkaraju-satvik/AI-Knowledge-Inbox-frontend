"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface ConnectionAlertProps {
  message: string
  className?: string
}

export function ConnectionAlert({ message, className }: ConnectionAlertProps) {
  if (!message) return null
  return (
    <Alert
      variant="destructive"
      className={cn("mb-6 max-w-2xl mx-auto", className)}
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Connection Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
