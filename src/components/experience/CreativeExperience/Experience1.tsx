"use client"
import { motion } from "framer-motion"
import { Briefcase, Award, GraduationCap, Calendar } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    id: "exp-1",
    title: "Creative Director",
    company: "Studio Noir",
    period: "2021 - Present",
    description:
      "Leading the creative vision for a boutique fashion studio specializing in avant-garde designs and editorial photography. Responsible for concept development, team management, and client relationships.",
    icon: Briefcase,
    skills: ["Creative Direction", "Team Leadership", "Client Management"],
  },
  {
    id: "exp-2",
    title: "Design Award",
    company: "International Fashion Awards",
    period: "2022",
    description:
      "Received the Emerging Designer Award for innovative use of sustainable materials and boundary-pushing silhouettes in the 'Metamorphosis' collection.",
    icon: Award,
    skills: ["Sustainable Design", "Innovation", "Recognition"],
  },
  {
    id: "exp-3",
    title: "Senior Designer",
    company: "Maison Lumière",
    period: "2018 - 2021",
    description:
      "Created seasonal collections and collaborated with artisanal craftspeople to develop unique textiles and embellishments. Led a team of junior designers and pattern makers.",
    icon: Briefcase,
    skills: ["Collection Development", "Textile Innovation", "Team Management"],
  },
  {
    id: "exp-4",
    title: "Master's Degree",
    company: "Royal College of Art",
    period: "2016 - 2018",
    description:
      "Graduated with distinction in Fashion Design, with a focus on experimental pattern cutting and the intersection of technology and traditional craftsmanship.",
    icon: GraduationCap,
    skills: ["Pattern Cutting", "Research", "Technical Innovation"],
  },
  {
    id: "exp-5",
    title: "Photography Exhibition",
    company: "Gallery Modern",
    period: "2019",
    description:
      "Solo exhibition 'Fabric in Motion' exploring the relationship between textiles, movement, and light through fashion photography.",
    icon: Award,
    skills: ["Photography", "Artistic Direction", "Exhibition"],
  },
]

export default function AccordionExperience() {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Professional Journey</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            An interactive timeline of my career highlights, exhibitions, and education
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem value={experience.id} className="border-b border-muted">
                  <AccordionTrigger className="py-6">
                    <div className="flex items-center text-left">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <experience.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{experience.title}</h3>
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
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-2">
                    <div className="ml-14">
                      <p className="mb-4 text-muted-foreground">{experience.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
