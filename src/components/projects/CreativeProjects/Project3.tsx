"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// This would typically come from a CMS or API
const projects = [
  {
    id: 1,
    title: "Autumn Collection",
    category: "Fashion Design",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 2,
    title: "Studio Portraits",
    category: "Photography",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 3,
    title: "Textile Experiments",
    category: "Material Design",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 4,
    title: "Editorial Shoot",
    category: "Photography",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 5,
    title: "Sustainable Fabrics",
    category: "Research",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 6,
    title: "Runway Show",
    category: "Event",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 7,
    title: "Pattern Making",
    category: "Process",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 8,
    title: "Concept Sketches",
    category: "Design",
    image: "/placeholder.svg?height=600&width=600",
  },
]

export default function GridGallery() {
  const [selectedProject, setSelectedProject] = React.useState<(typeof projects)[0] | null>(null)
  const [open, setOpen] = React.useState(false)

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setOpen(true)
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Portfolio</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A curated selection of my work across fashion design and photography
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black">
                    <Plus className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription>{selectedProject.category}</DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
