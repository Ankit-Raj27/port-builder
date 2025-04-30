"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TextFocusHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black py-20 text-white">
      <div className="absolute inset-0 z-0">
        {/* Abstract background pattern */}
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="mb-6 text-6xl font-bold leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
              <span className="block bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                VISIONARY
              </span>
              <span className="block bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                DESIGN
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-white/70 sm:text-xl"
          >
            Pushing the boundaries of fashion through innovative design, sustainable practices, and a commitment to
            artistic expression.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <Button
              size="lg"
              className="group border border-white bg-transparent text-white hover:bg-white hover:text-black"
            >
              View Portfolio
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:border-white hover:bg-transparent"
            >
              About the Designer
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex justify-center space-x-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold">10+</div>
            <div className="text-sm text-white/70">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-sm text-white/70">Collections</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">25+</div>
            <div className="text-sm text-white/70">Awards</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
