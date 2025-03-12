import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const experience = [
  {
    period: "2021 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    description:
      "Leading the frontend development team in building scalable and performant web applications. Implementing modern frontend architecture and mentoring junior developers.",
    achievements: [
      "Reduced page load time by 60% through code optimization and lazy loading",
      "Implemented a component library that increased development speed by 40%",
      "Led the migration from a legacy codebase to Next.js and TypeScript",
    ],
    skills: ["React", "Next.js", "TypeScript", "GraphQL", "Performance Optimization"],
  },
  {
    period: "2018 - 2021",
    title: "Frontend Developer",
    company: "Digital Solutions Ltd.",
    description:
      "Developed responsive web applications for clients across various industries. Collaborated with designers and backend developers to deliver high-quality products.",
    achievements: [
      "Built 15+ client websites with a focus on accessibility and performance",
      "Implemented CI/CD pipelines that reduced deployment time by 70%",
      "Created interactive data visualizations for financial dashboard products",
    ],
    skills: ["React", "JavaScript", "CSS", "RESTful APIs", "Agile"],
  },
  {
    period: "2017 - 2018",
    title: "Web Developer Intern",
    company: "StartUp Hub",
    description:
      "Assisted in the development of web applications and learned industry best practices. Participated in code reviews and contributed to the company's design system.",
    achievements: [
      "Developed and maintained the company's internal dashboard",
      "Contributed to open-source projects as part of company initiatives",
      "Redesigned the company website, improving mobile UX and conversion rates",
    ],
    skills: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
  },
]

export default function Experience2() {
  return (
    <section id="experience" className="bg-background py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Professional Experience</h2>
          <p className="max-w-[700px] text-muted-foreground">
            A timeline of my professional journey and key achievements
          </p>
        </div>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border md:ml-5">
          {experience.map((job, index) => (
            <div key={index} className="relative flex flex-col gap-6 md:flex-row">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm md:mt-0.5">
                {index + 1}
              </div>

              <Card className="w-full">
                <CardHeader>
                  <div className="space-y-1">
                    <Badge variant="outline" className="w-fit">
                      {job.period}
                    </Badge>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{job.description}</p>

                  <div>
                    <h4 className="mb-2 font-medium">Key Achievements:</h4>
                    <ul className="ml-6 list-disc space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

