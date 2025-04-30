"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// This would typically come from a CMS or API
const projects = [
  {
    id: 1,
    title: "Avant-Garde Collection",
    category: "Fashion Design",
    description: "Experimental designs pushing the boundaries of conventional silhouettes.",
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    id: 2,
    title: "Editorial Series",
    category: "Photography",
    description: "High-concept fashion photography for leading publications.",
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    id: 3,
    title: "Sustainable Materials",
    category: "Research",
    description: "Exploring eco-friendly textiles and production methods.",
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    id: 4,
    title: "Fashion Week",
    category: "Runway",
    description: "Seasonal collections showcased at international fashion weeks.",
    image: "/placeholder.svg?height=800&width=1200",
  },
]

export default function CarouselGallery() {
  const [current, setCurrent] = React.useState(0)
  const length = projects.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  const goToSlide = (index: number) => {
    setCurrent(index)
  }

  if (!Array.isArray(projects) || projects.length <= 0) {
    return null
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A showcase of my most significant work in fashion design and photography
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Carousel */}
          <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              {projects.map(
                (project, index) =>
                  index === current && (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 h-full w-full"
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
                        <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                          <div className="mb-2 text-sm font-medium uppercase tracking-wider">{project.category}</div>
                          <h3 className="mb-2 text-2xl font-bold sm:text-3xl">{project.title}</h3>
                          <p className="mb-4 max-w-lg text-white/80">{project.description}</p>
                          <Button variant="outline" className="border-white text-white hover:bg-white/20">
                            View Project
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40"
            onClick={prevSlide}
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40"
            onClick={nextSlide}
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Navigation */}
          <div className="mt-6 flex justify-center space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn("h-2 w-2 rounded-full transition-all", index === current ? "bg-primary w-8" : "bg-muted")}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
