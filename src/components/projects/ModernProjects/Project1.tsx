"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EditableText } from "@/components/common/EditableText"
import usePortfolioStore from "@/components/store/usePortfolioStore"

interface ProjectProps {
  isEditable?: boolean
}

export default function Project1({ isEditable = true }: ProjectProps) {
  const { projectContent, updateProjectContent } = usePortfolioStore()
  const { title = "Selected Work", items = [] } = projectContent || {}
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  const handleUpdateItem = (id: number, key: string, val: string) => {
    const newItems = items.map(item => item.id === id ? { ...item, [key]: val } : item)
    updateProjectContent({ items: newItems })
  }

  return (
    <section className="w-full py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            {isEditable ? (
              <EditableText 
                  value={title} 
                  onChange={(val) => updateProjectContent({ title: val })} 
                  tag="h2"
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              />
            ) : (
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
            )}
            <p className="mt-2 max-w-[500px] text-muted-foreground">
              Explore my featured projects and case studies from various industries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide} aria-label="Previous project">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide} aria-label="Next project">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden">
          <motion.div
            animate={{ x: -currentIndex * 100 + "%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex w-full"
          >
            {items.map((project) => (
              <div key={project.id} className="min-w-full px-4">
                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                  <div className="overflow-hidden rounded-lg relative aspect-video bg-muted">
                    <Image
                      src="/placeholder.svg"
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <Badge className="mb-2 w-fit">Project</Badge>
                    {isEditable ? (
                       <EditableText 
                          value={project.title} 
                          onChange={(val) => handleUpdateItem(project.id, 'title', val)} 
                          tag="h3"
                          className="mb-2 text-2xl font-bold md:text-3xl"
                      />
                    ) : (
                      <h3 className="mb-2 text-2xl font-bold md:text-3xl">{project.title}</h3>
                    )}
                    
                    {isEditable ? (
                      <EditableText 
                          value={project.description} 
                          onChange={(val) => handleUpdateItem(project.id, 'description', val)} 
                          tag="p"
                          className="mb-6 text-muted-foreground"
                      />
                    ) : (
                      <p className="mb-6 text-muted-foreground">{project.description}</p>
                    )}

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Tech Stack</h4>
                        <p className="text-base font-medium">{project.tags.join(", ")}</p>
                      </div>
                    </div>

                    <Button className="w-fit" asChild>
                      <Link href="#">
                        View Project <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
