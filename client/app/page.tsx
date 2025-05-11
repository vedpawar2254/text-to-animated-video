import { ScriptGenerator } from "@/components/script-generator"

export default function Home() {
  return (
    <div className="container py-10 max-w-6xl px-20 ">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3">AI Python Script Generator</h1>
        <p className="text-muted-foreground text-lg">
          Generate Python scripts using AI, then edit and execute them directly in your browser.
        </p>
      </div>
      <ScriptGenerator />
    </div>
  )
}
