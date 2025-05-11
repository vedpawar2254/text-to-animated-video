"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

interface OutputConsoleProps {
  content: string
}

export function OutputConsole({ content }: OutputConsoleProps) {
  return (
    <ScrollArea className="h-[200px] w-full rounded-md border bg-muted dark:bg-muted/30 p-4 output-console">
      <pre className="font-mono text-sm whitespace-pre-wrap">{content || "No output to display"}</pre>
    </ScrollArea>
  )
}
