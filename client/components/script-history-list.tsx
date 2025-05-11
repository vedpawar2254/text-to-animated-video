"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Play, Trash2 } from "lucide-react"

// Mock data for script history
const mockScripts = [
  {
    id: "script-1",
    title: "Data Analysis Script",
    prompt: "Create a script to analyze CSV data and generate statistics",
    createdAt: "2025-05-10T14:30:00Z",
    lastExecuted: "2025-05-11T09:15:00Z",
    status: "success",
  },
  {
    id: "script-2",
    title: "Web Scraper",
    prompt: "Generate a web scraper for product information",
    createdAt: "2025-05-08T11:20:00Z",
    lastExecuted: "2025-05-08T16:45:00Z",
    status: "error",
  },
  {
    id: "script-3",
    title: "Image Processing",
    prompt: "Create a script to resize and convert images",
    createdAt: "2025-05-05T09:10:00Z",
    lastExecuted: "2025-05-07T13:30:00Z",
    status: "success",
  },
]

export function ScriptHistoryList() {
  const [scripts, setScripts] = useState(mockScripts)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const handleDelete = (id: string) => {
    setScripts(scripts.filter((script) => script.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Scripts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Prompt</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="hidden md:table-cell">Last Executed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scripts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No scripts found. Generate your first script on the dashboard.
                </TableCell>
              </TableRow>
            ) : (
              scripts.map((script) => (
                <TableRow key={script.id}>
                  <TableCell className="font-medium">{script.title}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{script.prompt}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(script.createdAt)}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(script.lastExecuted)}</TableCell>
                  <TableCell>
                    <Badge variant={script.status === "success" ? "default" : "destructive"}>{script.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline" asChild>
                        <Link href={`/scripts/${script.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button size="icon" variant="outline">
                        <Play className="h-4 w-4" />
                        <span className="sr-only">Run</span>
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => handleDelete(script.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
