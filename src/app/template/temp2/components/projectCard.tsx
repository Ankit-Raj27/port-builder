import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

function ProjectCard() {
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
    )
}

export default ProjectCard
