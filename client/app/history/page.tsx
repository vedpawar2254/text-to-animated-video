import { ScriptHistoryList } from "@/components/script-history-list"

export default function HistoryPage() {
  return (
    <div className="container py-10 max-w-6xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3">Script History</h1>
        <p className="text-muted-foreground text-lg">View, edit, and execute your previously generated scripts.</p>
      </div>
      <ScriptHistoryList />
    </div>
  )
}
