"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// This would typically come from a CMS or API
const projects = [
  {
    id: 1,
    title: "Summer Collection",
    category: "fashion",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    title: "Portrait Series",
    category: "photography",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "Textile Patterns",
    category: "design",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 4,
    title: "Editorial Shoot",
    category: "photography",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 5,
    title: "Winter Collection",
    category: "fashion",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 6,
    title: "Material Studies",
    category: "design",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 7,
    title: "Runway Show",
    category: "fashion",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 8,
    title: "Concept Photography",
    category: "photography",
    image: "/placeholder.svg?height=600&width=800",
  },
]

const categories = ["all", "fashion", "photography", "design"]

export default function FilterGallery() {
  const [activeCategory, setActiveCategory] = React.useState("all")
  const [filteredProjects, setFilteredProjects] = React.useState(projects)

  React.useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter((project) => project.category === activeCategory)
      setFilteredProjects(filtered)
    }
  }, [activeCategory])

  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Portfolio</h2>
          <p className="mt-4 text-lg text-muted-foreground">Browse through my work by category</p>

          {/* Filter Buttons */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === category ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer overflow-hidden rounded-lg bg-muted"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black">
                      View Project
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  <p className="text-sm capitalize text-muted-foreground">{project.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
