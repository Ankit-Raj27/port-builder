"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ParallaxHero() {
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Fashion design"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <motion.div style={{ y: textY }} className="container text-center text-white">
          <span className="mb-4 inline-block text-sm font-light uppercase tracking-widest">Fashion Designer</span>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block">Crafting</span>
            <span className="block">Wearable Art</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
            Creating sustainable, avant-garde designs that challenge conventions and celebrate individuality.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            Discover Collections
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div style={{ opacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white">
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm">Scroll to Explore</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
