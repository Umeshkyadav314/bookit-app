"use client"

import type React from "react"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Sun, Moon, Menu, X, Search } from "lucide-react"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setMobileMenuOpen(false)
    }
  }

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-secondary text-sm">
              🗺️
            </div>
            <span className="hidden sm:inline">Highway Delite</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search experiences"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field text-sm flex-1 rounded-l-lg"
              />
              <button type="submit" className="btn-primary px-4 rounded-r-lg rounded-l-none text-sm">
                Search
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-border rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-primary" />
              ) : (
                <Moon size={20} className="text-secondary" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-border rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search experiences"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field text-sm flex-1"
              />
              <button type="submit" className="btn-primary px-3 text-sm">
                <Search size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
