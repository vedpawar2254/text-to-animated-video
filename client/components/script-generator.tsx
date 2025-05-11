"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeEditor } from "@/components/code-editor"
import { OutputConsole } from "@/components/output-console"
import { Loader2, Play, Save, Wand2 } from "lucide-react"

export function ScriptGenerator() {
  const [prompt, setPrompt] = useState("")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState({ stdout: "", stderr: "" })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Mock API call to generate code
    setTimeout(() => {
      const generatedCode = `# Generated Python script based on: "${prompt}"
import random

def main():
    print("Hello from AI-generated Python script!")
    print(f"You asked me to: {prompt}")
    
    # Generate some random numbers
    random_numbers = [random.randint(1, 100) for _ in range(5)]
    print(f"Here are 5 random numbers: {random_numbers}")
    
    # Calculate the sum and average
    total = sum(random_numbers)
    average = total / len(random_numbers)
    print(f"Sum: {total}")
    print(f"Average: {average:.2f}")

if __name__ == "__main__":
    main()`

      setCode(generatedCode)
      setIsGenerating(false)
    }, 1500)
  }

  const handleExecute = async () => {
    if (!code.trim()) return

    setIsExecuting(true)

    // Mock API call to execute code
    setTimeout(() => {
      // Simulate script execution output
      const stdout = `Hello from AI-generated Python script!
You asked me to: ${prompt}
Here are 5 random numbers: [42, 17, 89, 33, 61]
Sum: 242
Average: 48.40`

      setOutput({
        stdout,
        stderr: "",
      })
      setIsExecuting(false)
    }, 1000)
  }

  const handleSave = () => {
    // Mock saving the script
    console.log("Saving script:", { prompt, code })
    // In a real app, this would call an API to save the script
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="col-span-1 shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle>Generate Script</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-6">
          <Textarea
            placeholder="Describe the Python script you want to generate..."
            className="min-h-[200px] resize-none focus:ring-primary/20"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Script
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Python Code</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeEditor value={code} onChange={setCode} height="300px" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleSave} disabled={!code.trim()}>
              <Save className="mr-2 h-4 w-4" />
              Save Script
            </Button>
            <Button onClick={handleExecute} disabled={!code.trim() || isExecuting}>
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

        <Card>
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
                <OutputConsole content={output.stdout} />
              </TabsContent>
              <TabsContent value="stderr">
                <OutputConsole content={output.stderr} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
