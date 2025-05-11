"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Code2, History, Home } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Code2 className="h-5 w-5" />
            <span>AI Python Generator</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link
              href="/history"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/history" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-1">
                <History className="h-4 w-4" />
                <span>History</span>
              </div>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
