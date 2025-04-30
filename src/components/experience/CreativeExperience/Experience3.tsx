"use client"
import { motion } from "framer-motion"
import { Calendar, Award, Briefcase, GraduationCap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const experiences = [
  {
    id: 1,
    title: "Fashion Director",
    company: "Atelier Moderne",
    period: "2022 - Present",
    description: "Overseeing creative direction for all collections and brand identity.",
    icon: Briefcase,
    color: "bg-rose-100 text-rose-600",
  },
  {
    id: 2,
    title: "Designer of the Year",
    company: "Fashion Council",
    period: "2023",
    description: "Recognized for innovation in sustainable luxury fashion design.",
    icon: Award,
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: 3,
    title: "Lead Designer",
    company: "Maison Lumière",
    period: "2019 - 2022",
    description: "Created seasonal collections and managed design team.",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    title: "Solo Exhibition",
    company: "Gallery Modern",
    period: "2021",
    description: "Photography exhibition exploring fashion and identity.",
    icon: Award,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 5,
    title: "Master's Degree",
    company: "Fashion Institute",
    period: "2017 - 2019",
    description: "Graduated with honors in Fashion Design and Visual Arts.",
    icon: GraduationCap,
    color: "bg-violet-100 text-violet-600",
  },
  {
    id: 6,
    title: "Junior Designer",
    company: "Studio Noir",
    period: "2015 - 2019",
    description: "Assisted with collection development and runway presentations.",
    icon: Briefcase,
    color: "bg-pink-100 text-pink-600",
  },
]

export default function GridExperience() {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Experience & Achievements</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            A visual timeline of my professional journey in fashion design and photography
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${experience.color}`}>
                  <experience.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>{experience.company}</span>
                    <span className="text-xs">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {experience.period}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mb-4 text-muted-foreground">{experience.description}</p>
              <Button
                variant="ghost"
                size="sm"
                className="group/btn mt-2 flex items-center p-0 text-sm font-medium text-primary"
              >
                Learn more
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>

              {/* Decorative corner */}
              <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-muted opacity-0 transition-opacity group-hover:opacity-100"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
