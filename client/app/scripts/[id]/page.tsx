"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { CodeEditor } from "@/components/code-editor"
import { OutputConsole } from "@/components/output-console"
import { ArrowLeft, Loader2, Play, Save } from "lucide-react"

export default function ScriptPage() {
  const params = useParams()
  const router = useRouter()
  const scriptId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isExecuting, setIsExecuting] = useState(false)
  const [script, setScript] = useState({
    id: "",
    title: "",
    prompt: "",
    code: "",
    output: { stdout: "", stderr: "" },
  })

  useEffect(() => {
    // Mock API call to fetch script details
    setTimeout(() => {
      // This would be an API call in a real application
      setScript({
        id: scriptId,
        title: "Data Analysis Script",
        prompt: "Create a script to analyze CSV data and generate statistics",
        code: `# Python script for data analysis
import pandas as pd
import numpy as np

def analyze_data(file_path):
    # Load the data
    print(f"Loading data from {file_path}")
    
    # In a real script, this would load from a file
    # For demo purposes, we'll create some mock data
    data = {
        'value': np.random.normal(0, 1, 1000),
        'category': np.random.choice(['A', 'B', 'C'], 1000)
    }
    
    df = pd.DataFrame(data)
    
    # Calculate statistics
    print("\\nCalculating statistics...")
    print(f"Number of rows: {len(df)}")
    print(f"Mean value: {df['value'].mean():.2f}")
    print(f"Standard deviation: {df['value'].std():.2f}")
    
    # Group by category
    print("\\nStatistics by category:")
    grouped = df.groupby('category')['value'].agg(['mean', 'std', 'count'])
    print(grouped)
    
    return "Analysis complete!"

if __name__ == "__main__":
    result = analyze_data("data.csv")
    print(f"\\n{result}")`,
        output: {
          stdout:
            "Loading data from data.csv\n\nCalculating statistics...\nNumber of rows: 1000\nMean value: 0.02\nStandard deviation: 0.99\n\nStatistics by category:\n  mean   std  count\nA  0.03  1.01    334\nB -0.01  0.97    333\nC  0.04  1.00    333\n\nAnalysis complete!",
          stderr: "",
        },
      })
      setIsLoading(false)
    }, 1000)
  }, [scriptId])

  const handleSave = () => {
    // Mock saving the script
    console.log("Saving script:", script)
    // In a real app, this would call an API to save the script
  }

  const handleExecute = () => {
    if (!script.code.trim()) return

    setIsExecuting(true)

    // Mock API call to execute code
    setTimeout(() => {
      // Update with new execution results
      setScript((prev) => ({
        ...prev,
        output: {
          stdout:
            "Loading data from data.csv\n\nCalculating statistics...\nNumber of rows: 1000\nMean value: -0.05\nStandard deviation: 1.02\n\nStatistics by category:\n  mean   std  count\nA -0.08  1.03    342\nB -0.02  0.99    328\nC -0.04  1.04    330\n\nAnalysis complete!",
          stderr: "",
        },
      }))
      setIsExecuting(false)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Loading script...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to History
      </Button>

      <div className="mb-6">
        <Input
          value={script.title}
          onChange={(e) => setScript({ ...script, title: e.target.value })}
          className="text-2xl font-bold border-none px-0 text-foreground focus-visible:ring-0"
        />
        <p className="text-muted-foreground mt-2">
          <span className="font-medium">Prompt:</span> {script.prompt}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Python Code</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeEditor value={script.code} onChange={(code) => setScript({ ...script, code })} height="400px" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button onClick={handleExecute} disabled={isExecuting}>
              {isExecuting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Execute
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="stdout">
              <TabsList className="mb-2">
                <TabsTrigger value="stdout">Standard Output</TabsTrigger>
                <TabsTrigger value="stderr">Standard Error</TabsTrigger>
              </TabsList>
              <TabsContent value="stdout">
                <OutputConsole content={script.output.stdout} />
              </TabsContent>
              <TabsContent value="stderr">
                <OutputConsole content={script.output.stderr} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
