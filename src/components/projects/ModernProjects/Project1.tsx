"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import usePortfolioStore from "@/components/store/usePortfolioStore"

type ProjectProps = Record<string, never>;

export default function Project1({ }: ProjectProps) {
  const { projectContent } = usePortfolioStore()
  const { title = "Selected Work", items = [] } = projectContent || {}
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  return (
    <section className="w-full py-32 bg-[#fff] font-sans selection:bg-blue-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
               <Sparkles size={12} /> <span>Craftsmanship</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-black">
              {title}
            </h2>
            <p className="max-w-[600px] text-gray-400 text-lg font-medium leading-relaxed">
              Synthesizing complex problems into elegant digital experiences.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
            <Button variant="ghost" size="icon" onClick={prevSlide} className="rounded-xl hover:bg-white hover:shadow-md transition-all">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="h-4 w-px bg-gray-200" />
            <Button variant="ghost" size="icon" onClick={nextSlide} className="rounded-xl hover:bg-white hover:shadow-md transition-all">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-visible">
          <motion.div
            animate={{ x: -currentIndex * 100 + "%" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex w-full"
          >
            {items.map((project) => (
              <div key={project.id} className="min-w-full px-2">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                  <div className="overflow-hidden rounded-[3rem] relative aspect-[4/3] bg-gray-50 border-[12px] border-white shadow-2xl group cursor-pointer">
                    <Image
                      src="/placeholder.svg"
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex flex-col justify-center space-y-8 p-4">
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-black md:text-5xl tracking-tight leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-lg leading-relaxed font-medium">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button className="w-fit bg-black text-white h-14 px-10 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 group" asChild>
                      <a href={project.link || "#"} target="_blank" rel="noopener noreferrer">
                        Deep Dive <ExternalLink className="ml-3 h-4 w-4 group-hover:rotate-12 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
