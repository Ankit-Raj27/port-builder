import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "PostgreSQL", level: 65 },
      { name: "MongoDB", level: 60 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 60 },
      { name: "Figma", level: 75 },
      { name: "Jest", level: 70 },
      { name: "CI/CD", level: 65 },
    ],
  },
]

const companies = [
  {
    name: "Tech Innovations Inc.",
    logo: "/placeholder.svg?height=80&width=80",
    position: "Senior Frontend Developer",
    period: "2021 - Present",
    responsibilities: [
      "Leading the frontend development team of 5 engineers",
      "Architecting scalable and maintainable frontend solutions",
      "Implementing performance optimizations and best practices",
      "Mentoring junior developers and conducting code reviews",
    ],
  },
  {
    name: "Digital Solutions Ltd.",
    logo: "/placeholder.svg?height=80&width=80",
    position: "Frontend Developer",
    period: "2018 - 2021",
    responsibilities: [
      "Developing responsive web applications for enterprise clients",
      "Collaborating with designers to implement pixel-perfect UIs",
      "Writing unit and integration tests for critical components",
      "Participating in agile development processes",
    ],
  },
  {
    name: "StartUp Hub",
    logo: "/placeholder.svg?height=80&width=80",
    position: "Web Developer Intern",
    period: "2017 - 2018",
    responsibilities: [
      "Assisting in the development of web applications",
      "Learning industry best practices and coding standards",
      "Contributing to the company's internal design system",
      "Participating in code reviews and team meetings",
    ],
  },
]

export default function Experience3() {
  return (
    <section id="experience" className="bg-muted py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Skills & Experience</h2>
          <p className="max-w-[700px] text-muted-foreground">My technical skills and professional experience</p>
        </div>

        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="mb-8 w-full grid grid-cols-2 h-auto">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Work Experience</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="mt-0">
            <div className="grid gap-8 md:grid-cols-3">
              {skills.map((category) => (
                <Card key={category.category} className="h-full">
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {category.items.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full bg-primary" style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experience" className="mt-0">
            <div className="space-y-8">
              {companies.map((company) => (
                <Card key={company.name} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="flex items-center justify-center border-b p-6 md:w-1/4 md:border-b-0 md:border-r">
                      <div className="relative h-20 w-20">
                        <Image
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <CardHeader className="p-0 pb-4">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                          <div>
                            <CardTitle>{company.position}</CardTitle>
                            <CardDescription>{company.name}</CardDescription>
                          </div>
                          <div className="text-sm font-medium text-muted-foreground">{company.period}</div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ul className="ml-6 list-disc space-y-2">
                          {company.responsibilities.map((responsibility, i) => (
                            <li key={i}>{responsibility}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

