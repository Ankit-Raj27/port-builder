import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function Home() {
  const projects = [
    {
      title: "Aceternity",
      description: "A design and development studio that focuses on building quality apps.",
      image: "/11.png",
      tags: ["Next.js", "Tailwindcss"],
    },
    {
      title: "Algochum",
      description: "Practice for technical interviews with hands on coding challenges.",
      image: "/11.png",
      tags: ["React", "Node.js"],
    },
  ]

  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Hello there! I&apos;m John</h1>
          <span className="text-4xl">👋</span>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          I&apos;m a full-stack developer that loves building products and web apps that can impact millions of lives
        </p>
        <p className="mt-2 text-lg text-muted-foreground">
          I&apos;m a senior software engineer with 7 years of experience building scalable web apps that are performance
          optimized and good looking.
        </p>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">What I&apos;ve been working on</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-[2/1]">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-2">{project.title}</CardTitle>
                <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

