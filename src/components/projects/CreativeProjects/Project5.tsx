"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

// This would typically come from a CMS or API
const projects = [
  {
    id: 1,
    title: "Minimalist Collection",
    category: "Fashion Design",
    year: "2023",
    image: "/placeholder.svg?height=800&width=600",
    size: "large",
  },
  {
    id: 2,
    title: "Urban Portraits",
    category: "Photography",
    year: "2022",
    image: "/placeholder.svg?height=400&width=600",
    size: "small",
  },
  {
    id: 3,
    title: "Textile Exploration",
    category: "Material Design",
    year: "2023",
    image: "/placeholder.svg?height=600&width=400",
    size: "medium",
  },
  {
    id: 4,
    title: "Runway Show",
    category: "Event",
    year: "2022",
    image: "/placeholder.svg?height=800&width=600",
    size: "large",
  },
  {
    id: 5,
    title: "Concept Development",
    category: "Process",
    year: "2023",
    image: "/placeholder.svg?height=400&width=600",
    size: "small",
  },
  {
    id: 6,
    title: "Editorial Shoot",
    category: "Photography",
    year: "2022",
    image: "/placeholder.svg?height=600&width=400",
    size: "medium",
  },
]

export default function StaggeredGallery() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Selected Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A curated selection of projects showcasing my creative vision
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group cursor-pointer",
                project.size === "large" && "md:col-span-2 md:row-span-2",
                project.size === "medium" && "md:col-span-1 md:row-span-2",
                project.size === "small" && "md:col-span-1 md:row-span-1",
              )}
            >
              <div className="relative overflow-hidden rounded-lg">
                <div
                  className={cn(
                    "relative w-full",
                    project.size === "large" && "aspect-[4/5]",
                    project.size === "medium" && "aspect-[3/4]",
                    project.size === "small" && "aspect-square",
                  )}
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{project.category}</span>
                    <span className="text-sm text-white/80">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <div className="mt-4 flex items-center text-sm text-white">
                    <span>View Project</span>
                    <ArrowUpRight className="ml-1 h-4 w-4" />
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
