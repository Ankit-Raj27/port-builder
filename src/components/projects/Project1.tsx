"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


// Sample project data
const projects = [
  {
    id: 1,
    title: "Modern Banking App",
    description: "A sleek, user-friendly banking application with advanced security features and intuitive interface.",
    image: "/placeholder.svg",
    category: "UI/UX Design",
    client: "FinTech Corp",
    year: "2023",
    link: "/projects/banking-app",
  },
  {
    id: 2,
    title: "E-learning Platform",
    description: "Comprehensive learning management system with interactive courses and progress tracking.",
    image: "/placeholder.svg",
    category: "Web Development",
    client: "EduTech Inc",
    year: "2023",
    link: "/projects/elearning-platform",
  },
  {
    id: 3,
    title: "Smart Home App",
    description: "IoT control center for managing all smart home devices from a single interface.",
    image: "/placeholder.svg",
    category: "Mobile App",
    client: "HomeConnect",
    year: "2022",
    link: "/projects/smart-home",
  },
]

export default function Project1() {
  const [currentIndex, setCurrentIndex] = useState(0)
  // const carousel = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1))
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Selected Work</h2>
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
            {projects.map((project) => (
              <div key={project.id} className="min-w-full px-4">
                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={800}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <Badge className="mb-2 w-fit">{project.category}</Badge>
                    <h3 className="mb-2 text-2xl font-bold md:text-3xl">{project.title}</h3>
                    <p className="mb-6 text-muted-foreground">{project.description}</p>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                        <p className="text-base font-medium">{project.client}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Year</h4>
                        <p className="text-base font-medium">{project.year}</p>
                      </div>
                    </div>

                    <Button className="w-fit" asChild>
                      <Link href={project.link}>
                        View Case Study <ExternalLink className="ml-2 h-4 w-4" />
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