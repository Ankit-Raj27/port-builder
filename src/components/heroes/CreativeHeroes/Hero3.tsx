"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Spring Collection",
    subtitle: "2023",
    description: "Ethereal fabrics and bold silhouettes inspired by coastal landscapes.",
    image: "/placeholder.svg?height=1080&width=1920",
    color: "from-rose-500/20 to-transparent",
  },
  {
    id: 2,
    title: "Summer Lookbook",
    subtitle: "2023",
    description: "Lightweight materials and flowing designs for the warmer months.",
    image: "/placeholder.svg?height=1080&width=1920",
    color: "from-amber-500/20 to-transparent",
  },
  {
    id: 3,
    title: "Autumn Editorial",
    subtitle: "2023",
    description: "Rich textures and layered pieces that transition through the seasons.",
    image: "/placeholder.svg?height=1080&width=1920",
    color: "from-emerald-500/20 to-transparent",
  },
]

export default function Hero1() {
  const [current, setCurrent] = React.useState(0)
  const { length } = slides

  React.useEffect(() => {
    const timer = setTimeout(() => {
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const nextSlide = React.useCallback(() => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1))
  }, [length])

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 4500)
    return () => clearInterval(interval)
  }, [nextSlide])

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => {
          return (
            index === current && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className={cn("absolute inset-0 bg-gradient-to-r", slide.color)}></div>
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full items-center">
                  <div className="container">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="max-w-2xl text-white"
                    >
                      <div className="mb-4 text-lg font-light">{slide.subtitle}</div>
                      <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
                        {slide.title}
                      </h1>
                      <p className="mb-8 text-lg text-white/80 sm:text-xl">{slide.description}</p>
                      <Button className="bg-white text-black hover:bg-white/90">Explore Collection</Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          )
        })}
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform">
        <div className="flex items-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={cn("h-2 w-2 rounded-full transition-all", index === current ? "bg-white w-8" : "bg-white/50")}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  )
}
