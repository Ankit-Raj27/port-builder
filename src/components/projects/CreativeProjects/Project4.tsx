"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would typically come from a CMS or API
const projects = [
  {
    id: 1,
    title: "Summer Collection",
    category: "fashion",
    image: "/placeholder.svg?height=600&width=400",
    aspectRatio: "portrait",
  },
  {
    id: 2,
    title: "Editorial Shoot",
    category: "photography",
    image: "/placeholder.svg?height=400&width=600",
    aspectRatio: "landscape",
  },
  {
    id: 3,
    title: "Runway Show",
    category: "fashion",
    image: "/placeholder.svg?height=500&width=500",
    aspectRatio: "square",
  },
  {
    id: 4,
    title: "Brand Campaign",
    category: "photography",
    image: "/placeholder.svg?height=600&width=400",
    aspectRatio: "portrait",
  },
  {
    id: 5,
    title: "Concept Design",
    category: "fashion",
    image: "/placeholder.svg?height=400&width=600",
    aspectRatio: "landscape",
  },
  {
    id: 6,
    title: "Studio Session",
    category: "photography",
    image: "/placeholder.svg?height=500&width=500",
    aspectRatio: "square",
  },
]

export default function MasonryGallery() {
  const [activeCategory, setActiveCategory] = React.useState("all")

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl text-center mb-8">
            A curated selection of my most impactful work across fashion design and photography.
          </p>

          <Tabs defaultValue="all" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
                All
              </TabsTrigger>
              <TabsTrigger value="fashion" onClick={() => setActiveCategory("fashion")}>
                Fashion
              </TabsTrigger>
              <TabsTrigger value="photography" onClick={() => setActiveCategory("photography")}>
                Photography
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "group relative overflow-hidden rounded-lg cursor-pointer",
                project.aspectRatio === "portrait" ? "row-span-2" : "",
                project.aspectRatio === "landscape" ? "col-span-2" : "",
              )}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <h3 className="text-white text-xl font-medium">{project.title}</h3>
                    <p className="text-white/80 capitalize">{project.category}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
