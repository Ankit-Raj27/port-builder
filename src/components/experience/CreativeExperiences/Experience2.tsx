import { Calendar, Award, Briefcase } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    id: 1,
    title: "Lead Designer",
    company: "Fashion Forward Studio",
    period: "2021 - Present",
    description:
      "Leading design team for seasonal collections and client collaborations. Responsible for concept development, material selection, and final production oversight.",
    icon: Briefcase,
    badges: ["Leadership", "Design", "Production"],
  },
  {
    id: 2,
    title: "Fashion Week Showcase",
    company: "Milan Fashion Week",
    period: "2020",
    description:
      "Selected to showcase original collection at Milan Fashion Week. Received critical acclaim for innovative use of sustainable materials and avant-garde silhouettes.",
    icon: Award,
    badges: ["Recognition", "Sustainability"],
  },
  {
    id: 3,
    title: "Senior Designer",
    company: "Couture House",
    period: "2018 - 2021",
    description:
      "Created custom designs for high-profile clients. Specialized in evening wear and experimental textiles. Managed a team of junior designers and pattern makers.",
    icon: Briefcase,
    badges: ["Couture", "Management"],
  },
  {
    id: 4,
    title: "Fashion Photography Exhibition",
    company: "Gallery Modern",
    period: "2019",
    description:
      "Solo exhibition featuring fashion photography exploring the intersection of traditional craftsmanship and contemporary design aesthetics.",
    icon: Award,
    badges: ["Photography", "Exhibition"],
  },
]

export default function CardExperience() {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Experience & Achievements</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            A curated overview of my professional journey, exhibitions, and recognition in the fashion industry
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <span>{item.company}</span>
                      <span className="text-xs">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.period}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
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
          ))}
        </div>
      </div>
    </section>
  )
}
