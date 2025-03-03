"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample project data
const projects = [
  {
    id: 1,
    title: "Minimalist Portfolio Website",
    description:
      "A clean, minimalist portfolio website for a photographer showcasing their work with a focus on visual content.",
    image: "/placeholder.svg?height=600&width=400",
    category: "Web Design",
    height: "tall", // tall, medium, or short
    link: "/projects/portfolio-website",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description:
      "A user-friendly mobile banking application with intuitive navigation and secure transaction features.",
    image: "/placeholder.svg?height=400&width=600",
    category: "UI/UX Design",
    height: "medium",
    link: "/projects/banking-app",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description:
      "A comprehensive e-commerce solution with product management, cart functionality, and secure checkout.",
    image: "/placeholder.svg?height=300&width=600",
    category: "Web Development",
    height: "short",
    link: "/projects/ecommerce-platform",
  },
  {
    id: 4,
    title: "Health & Fitness Tracker",
    description:
      "A mobile application for tracking fitness activities, nutrition, and health metrics with data visualization.",
    image: "/placeholder.svg?height=600&width=400",
    category: "Mobile App",
    height: "tall",
    link: "/projects/fitness-tracker",
  },
  {
    id: 5,
    title: "Corporate Brand Identity",
    description:
      "Complete brand identity design including logo, color palette, typography, and brand guidelines for a corporate client.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Branding",
    height: "medium",
    link: "/projects/brand-identity",
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description:
      "An analytics dashboard for tracking social media performance across multiple platforms with data visualization.",
    image: "/placeholder.svg?height=300&width=600",
    category: "Web Development",
    height: "short",
    link: "/projects/social-dashboard",
  },
  {
    id: 7,
    title: "Travel Booking App",
    description:
      "A comprehensive travel booking application for flights, hotels, and experiences with personalized recommendations.",
    image: "/placeholder.svg?height=400&width=600",
    category: "UI/UX Design",
    height: "medium",
    link: "/projects/travel-app",
  },
  {
    id: 8,
    title: "Restaurant Website",
    description:
      "A visually appealing website for a high-end restaurant featuring menu, reservations, and location information.",
    image: "/placeholder.svg?height=600&width=400",
    category: "Web Design",
    height: "tall",
    link: "/projects/restaurant-website",
  },
]

export default function Project3() {

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Creative Portfolio</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A showcase of my creative work across various disciplines and industries.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`group relative cursor-pointer overflow-hidden rounded-lg ${
                    project.height === "tall" ? "row-span-2" : project.height === "medium" ? "row-span-1" : ""
                  }`}
                  style={{
                    height: project.height === "tall" ? "600px" : project.height === "medium" ? "400px" : "300px",
                  }}
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="mb-2 inline-block rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      {project.category}
                    </span>
                    <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
                    <div className="flex items-center text-sm font-medium text-white">
                      View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>{project.title}</DialogTitle>
                  <DialogDescription>{project.category}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="mb-4 text-muted-foreground">{project.description}</p>
                    <Button asChild>
                      <Link href={project.link}>
                        View Full Project <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

