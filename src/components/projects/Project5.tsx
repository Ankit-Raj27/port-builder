import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = ["All", "Web Development", "UI/UX Design", "Mobile Apps"]

const projects = [
  {
    title: "Agency Website Redesign",
    description: "Complete redesign of a digital agency website with improved UX and performance.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Web Development",
    url: "#",
  },
  {
    title: "E-learning Dashboard",
    description: "User dashboard for an e-learning platform with progress tracking and course management.",
    image: "/placeholder.svg?height=400&width=600",
    category: "UI/UX Design",
    url: "#",
  },
  {
    title: "Fitness Tracking App",
    description: "Mobile application for tracking workouts, nutrition, and fitness goals.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Mobile Apps",
    url: "#",
  },
  {
    title: "Real Estate Platform",
    description: "Web platform for browsing, buying, and selling properties with virtual tours.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Web Development",
    url: "#",
  },
]

export default function Projects5() {
  return (
    <section id="projects" className="bg-muted py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Projects</h2>
            <p className="mt-2 text-muted-foreground">Selected works that demonstrate my skills and expertise</p>
          </div>
          <Button asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>

        <Tabs defaultValue="All" className="mt-12">
          <TabsList className="mb-8 w-full justify-start overflow-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="All" className="mt-0">
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <Link key={project.title} href={project.url} className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="mt-2 text-white/80">{project.description}</p>
                    <div className="mt-4 flex items-center">
                      <span className="text-sm font-medium text-primary">View Project</span>
                      <ArrowUpRight className="ml-1 h-4 w-4 text-primary" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          {categories.slice(1).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid gap-8 md:grid-cols-2">
                {projects
                  .filter((project) => project.category === category)
                  .map((project) => (
                    <Link key={project.title} href={project.url} className="group relative overflow-hidden rounded-lg">
                      <div className="aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent p-6 flex flex-col justify-end">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        <p className="mt-2 text-white/80">{project.description}</p>
                        <div className="mt-4 flex items-center">
                          <span className="text-sm font-medium text-primary">View Project</span>
                          <ArrowUpRight className="ml-1 h-4 w-4 text-primary" />
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

