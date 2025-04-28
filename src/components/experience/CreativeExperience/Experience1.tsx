import { CalendarIcon, GraduationCap, Briefcase } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const workExperience = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    period: "2021 - Present",
    description:
      "Led the development of the company's flagship product, improving performance by 40%. Mentored junior developers and implemented best practices for code quality and testing.",
    skills: ["React", "Next.js", "TypeScript", "GraphQL", "Jest"],
  },
  {
    title: "Frontend Developer",
    company: "Digital Solutions Ltd.",
    location: "New York, NY",
    period: "2018 - 2021",
    description:
      "Developed responsive web applications for clients across various industries. Collaborated with designers and backend developers to deliver high-quality products.",
    skills: ["React", "JavaScript", "CSS", "RESTful APIs", "Agile"],
  },
  {
    title: "Web Developer Intern",
    company: "StartUp Hub",
    location: "Boston, MA",
    period: "2017 - 2018",
    description:
      "Assisted in the development of web applications and learned industry best practices. Participated in code reviews and contributed to the company's design system.",
    skills: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
  },
]

const education = [
  {
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    period: "2015 - 2017",
    description:
      "Specialized in Human-Computer Interaction and Web Technologies. Thesis on improving web accessibility for users with disabilities.",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "MIT",
    location: "Cambridge, MA",
    period: "2011 - 2015",
    description: "Graduated with honors. Participated in various hackathons and coding competitions.",
  },
]

export default function Experience1() {
  return (
    <section id="experience" className="bg-muted py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Experience & Education</h2>
          <p className="max-w-[700px] text-muted-foreground">My professional journey and educational background</p>
        </div>

        <Tabs defaultValue="work" className="w-full">
          <TabsList className="mb-8 w-full justify-start sm:w-auto">
            <TabsTrigger value="work" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Work Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Education
            </TabsTrigger>
          </TabsList>

          <TabsContent value="work" className="mt-0 space-y-6">
            {workExperience.map((job, index) => (
              <Card key={index} className={cn("overflow-hidden")}>
                <CardHeader>
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>
                        {job.company} • {job.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {job.period}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <div
                        key={skill}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="education" className="mt-0 space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className={cn("overflow-hidden")}>
                <CardHeader>
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <CardTitle>{edu.degree}</CardTitle>
                      <CardDescription>
                        {edu.institution} • {edu.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {edu.period}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

