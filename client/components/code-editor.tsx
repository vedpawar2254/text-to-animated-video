"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react").then((mod) => mod.default), {
  ssr: false,
  loading: () => <EditorSkeleton height="300px" />,
})

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  height?: string
  readOnly?: boolean
}

export function CodeEditor({ value, onChange, height = "400px", readOnly = false }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)

  // Handle hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          // Force re-render when theme changes
          setMounted(false)
          setTimeout(() => setMounted(true), 0)
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  if (!mounted) {
    return <EditorSkeleton height={height} />
  }

  return (
    <div className="border rounded-md overflow-hidden shadow-sm">
      <MonacoEditor
        height={height}
        language="python"
        theme={
          typeof window !== "undefined" && document.documentElement.classList.contains("dark") ? "vs-dark" : "light"
        }
        value={value}
        onChange={(value) => onChange(value || "")}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          readOnly,
          automaticLayout: true,
          padding: { top: 16 },
        }}
      />
    </div>
  )
}

function EditorSkeleton({ height }: { height: string }) {
  return <Skeleton style={{ height }} className="w-full" />
}
