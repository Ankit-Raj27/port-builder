"use client"

import { useState } from "react"
import { SearchIcon } from 'lucide-react'

const suggestions = [
  "Artist",
  "Software Engineer",
  "Photographer",
  "Designer",
]

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    // Add your search logic here
    console.log(`Searching for: ${suggestion}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your search logic here
    console.log(`Searching for: ${searchQuery}`)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search templates..."
          className="w-full pl-10 pr-4 py-3 text-lg border-b  border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
          aria-label="Search templates"
        />
      </form>
      
      <div className="mt-4 flex items-center gap-2 flex-wrap ">
        <span className="text-sm font-medium">Top picks:</span>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            className="px-4 py-1.5 text-sm rounded-full border border-gray-200 hover:border-gray-400 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

