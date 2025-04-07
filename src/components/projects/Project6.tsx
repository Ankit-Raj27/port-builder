import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const featuredProject = {
  title: "E-commerce Platform",
  description:
    "A comprehensive e-commerce solution with product management, cart functionality, payment processing, and order management.",
  image: "/images/project/p41.jpg?height=600&width=800",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Stripe"],
  url: "#",
}

const otherProjects = [
  {
    title: "Personal Blog",
    description: "A blog platform with markdown support, categories, and search functionality.",
    technologies: ["Next.js", "MDX", "Tailwind CSS"],
    url: "#",
  },
  {
    title: "Weather App",
    description: "Real-time weather application with location detection and 7-day forecast.",
    technologies: ["React", "OpenWeather API", "Geolocation API"],
    url: "#",
  },
  {
    title: "Task Manager",
    description: "Collaborative task management tool with real-time updates and team features.",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    url: "#",
  },
  {
    title: "Recipe Finder",
    description: "Search and save recipes based on ingredients, dietary restrictions, and cuisine.",
    technologies: ["Next.js", "Spoonacular API", "Tailwind CSS"],
    url: "#",
  },
]

export default function Projects6() {
  return (
    <section id="projects" className="bg-background py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Selected Work</h2>
          <p className="max-w-[700px] text-muted-foreground">
            A collection of projects that showcase my skills, creativity, and problem-solving abilities.
          </p>
        </div>

        {/* Featured Project */}
        <div className="mb-16 overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto">
              <Image
                src={featuredProject.image || "/placeholder.svg"}
                alt={featuredProject.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-6">
              <div>
                <h3 className="text-2xl font-bold">{featuredProject.title}</h3>
                <p className="mt-2 text-muted-foreground">{featuredProject.description}</p>
                <div className="mt-6">
                  <h4 className="text-sm font-medium">Technologies</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {featuredProject.technologies.map((tech) => (
                      <div key={tech} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button className="mt-6" asChild>
                <Link href={featuredProject.url}>
                  View Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Other Projects */}
        <div>
          <h3 className="mb-8 text-2xl font-bold">Other Projects</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {otherProjects.map((project) => (
              <Card key={project.title} className="h-full">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <div key={tech} className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                        {tech}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="ml-auto" asChild>
                    <Link href={project.url}>
                      View Details
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

