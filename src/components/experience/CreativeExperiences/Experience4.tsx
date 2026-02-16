"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const experiences = [
  {
    year: "2023",
    title: "Creative Director",
    company: "Atelier Moderne",
    description: "Leading creative vision for the brand, overseeing all collections and artistic direction.",
  },
  {
    year: "2022",
    title: "Fashion Week Showcase",
    company: "New York Fashion Week",
    description: "Presented debut collection at NYFW to critical acclaim.",
  },
  {
    year: "2021",
    title: "Solo Exhibition",
    company: "Gallery Contemporary",
    description: "Photography exhibition exploring the relationship between fashion and architecture.",
  },
  {
    year: "2020",
    title: "Senior Designer",
    company: "Maison Lumière",
    description: "Led design team for seasonal collections and special collaborations.",
  },
  {
    year: "2018",
    title: "Master's Degree",
    company: "Fashion Institute",
    description: "Graduated with distinction in Fashion Design and Visual Communication.",
  },
]

export default function HorizontalTimeline() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const timelineRef = React.useRef<HTMLDivElement>(null)

  const scrollToYear = (index: number) => {
    setActiveIndex(index)
    if (timelineRef.current) {
      const yearElements = timelineRef.current.querySelectorAll(".year-marker")
      if (yearElements[index]) {
        yearElements[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Career Timeline</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            A chronological journey through my professional career and achievements
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative mt-16">
          {/* Timeline Line */}
          <div className="absolute top-[45px] left-0 w-full h-0.5 bg-border"></div>

          {/* Year Markers */}
          <div
            ref={timelineRef}
            className="relative flex overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex min-w-max px-4 sm:px-0 sm:justify-between w-full">
              {experiences.map((experience, index) => (
                <div
                  key={experience.year}
                  className={cn(
                    "year-marker flex flex-col items-center mx-8 sm:mx-0",
                    index === 0 && "sm:ml-0",
                    index === experiences.length - 1 && "sm:mr-0",
                  )}
                >
                  <button
                    onClick={() => scrollToYear(index)}
                    className={cn(
                      "relative z-10 flex h-[90px] w-[90px] flex-col items-center justify-center rounded-full border-2 bg-background transition-all",
                      activeIndex === index
                        ? "border-primary text-primary scale-110"
                        : "border-muted-foreground/30 text-muted-foreground hover:border-muted-foreground",
                    )}
                  >
                    <span className="text-2xl font-bold">{experience.year}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mt-8">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl rounded-xl bg-background p-6 shadow-sm"
            >
              <div className="mb-2 text-sm font-medium text-muted-foreground">{experiences[activeIndex].company}</div>
              <h3 className="mb-4 text-2xl font-bold">{experiences[activeIndex].title}</h3>
              <p className="text-muted-foreground">{experiences[activeIndex].description}</p>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => scrollToYear(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 bg-muted hover:bg-muted/80"
            >
              Previous
            </button>
            <button
              onClick={() => scrollToYear(Math.min(experiences.length - 1, activeIndex + 1))}
              disabled={activeIndex === experiences.length - 1}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
