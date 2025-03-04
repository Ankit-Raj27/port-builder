"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, MousePointer } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero3() {
  const [, setScreenSize] = useState({ width: 0, height: 0 })
  const [dots, setDots] = useState<{ x: number; y: number; opacity: number; scale: number }[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })

      const newDots = Array.from({ length: 100 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.5 + 0.3,
        scale: Math.random() * 0.5 + 0.5,
      }))

      setDots(newDots)
    }
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>

        {/* Animated Dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          {dots.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white"
              initial={{
                x: dot.x,
                y: dot.y,
                opacity: dot.opacity,
                scale: dot.scale,
              }}
              animate={{
                y: [dot.y, dot.y - 50],
                opacity: [dot.opacity, dot.opacity + 0.2],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 flex flex-col items-center px-4 text-center md:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-sm"
        >
          Creative Developer & Designer
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 max-w-4xl bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-center text-4xl font-bold tracking-tighter text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Crafting Digital Experiences That Inspire & Engage
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 max-w-[700px] text-xl text-white/70 md:text-2xl"
        >
          I am Jordan Lee, a creative developer and designer specializing in immersive digital
          experiences that push the boundaries of web design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
            <Link href="/projects">
              View My Work <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            asChild
          >
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
      >
        <span className="mb-2 text-sm text-white/50">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MousePointer className="h-6 w-6 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
