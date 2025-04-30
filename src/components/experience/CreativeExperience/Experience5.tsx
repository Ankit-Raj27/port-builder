import { CalendarDays, Award, Briefcase, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    id: 1,
    title: "Creative Director",
    company: "Atelier Moderne",
    period: "2020 - Present",
    description: "Leading creative direction for seasonal collections and brand campaigns.",
    icon: Briefcase,
    badges: ["Fashion", "Direction", "Brand Strategy"],
  },
  {
    id: 2,
    title: "Fashion Week Showcase",
    company: "Paris Fashion Week",
    period: "2019",
    description: "Featured collection at Paris Fashion Week receiving critical acclaim.",
    icon: Award,
    badges: ["Showcase", "International"],
  },
  {
    id: 3,
    title: "Senior Designer",
    company: "Maison Lumière",
    period: "2016 - 2020",
    description: "Designed ready-to-wear collections and collaborated with artisanal craftspeople.",
    icon: Briefcase,
    badges: ["Design", "Collaboration"],
  },
  {
    id: 4,
    title: "Master's Degree",
    company: "Central Saint Martins",
    period: "2014 - 2016",
    description: "Master's in Fashion Design with distinction, specializing in sustainable practices.",
    icon: GraduationCap,
    badges: ["Education", "Sustainability"],
  },
]

export default function TimelineExperience() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Journey</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A timeline of my career highlights, exhibitions, and educational background.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Date indicator for desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <Card className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                  {/* Date indicator for mobile */}
                  <div className="md:hidden absolute left-4 top-6 z-10">
                    <div className="w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>

                  <CardHeader className="md:pl-6 pl-16">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <span>{item.company}</span>
                      <span className="text-xs">•</span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {item.period}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="md:pl-6 pl-16">
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.badges.map((badge) => (
                        <Badge key={badge} variant="secondary">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
