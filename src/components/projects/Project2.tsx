"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample project data
const projects = [
  {
    id: 1,
    title: "E-commerce Redesign",
    description:
      "A complete redesign of an e-commerce platform focusing on user experience and conversion optimization.",
    image: "/placeholder.svg?height=600&width=800",
    category: "UI/UX Design",
    tags: ["E-commerce", "UI/UX", "Figma"],
    link: "/projects/ecommerce-redesign",
  },
  {
    id: 2,
    title: "Finance Dashboard",
    description: "A comprehensive dashboard for financial data visualization and analysis.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Development",
    tags: ["Dashboard", "React", "Data Visualization"],
    link: "/projects/finance-dashboard",
  },
  {
    id: 3,
    title: "Travel App",
    description: "A mobile app for travel planning and booking with personalized recommendations.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Mobile App",
    tags: ["Mobile", "React Native", "UI Design"],
    link: "/projects/travel-app",
  },
  {
    id: 4,
    title: "Brand Identity",
    description: "Complete brand identity design for a sustainable fashion startup.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Branding",
    tags: ["Branding", "Logo Design", "Identity"],
    link: "/projects/brand-identity",
  },
  {
    id: 5,
    title: "Health & Fitness Platform",
    description: "A web platform for fitness tracking, nutrition planning, and wellness content.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Development",
    tags: ["Health", "Full Stack", "Next.js"],
    link: "/projects/health-platform",
  },
  {
    id: 6,
    title: "Educational App",
    description: "An interactive learning application for students with gamification elements.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Mobile App",
    tags: ["Education", "Mobile", "UX Research"],
    link: "/projects/educational-app",
  },
]

// Categories for filtering
const categories = ["All", "UI/UX Design", "Web Development", "Mobile App", "Branding"]

export default function Project2() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="mb-2">
              My Work
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore my recent work across various industries and disciplines.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={project.link}
              className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-lg"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="mb-2">
                  {project.category}
                </Badge>
                <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                <p className="mb-4 text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-background">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

