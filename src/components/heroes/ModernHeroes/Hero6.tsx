"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import usePortfolioStore from "@/components/store/usePortfolioStore"

export default function Hero6() {
  const { heroContent } = usePortfolioStore()
  const { title, name, subtitle, description, primaryButton, primaryLink = "#projects", secondaryButton, secondaryLink = "#contact" } = heroContent

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
              {subtitle}
            </span>
          </motion.div>
          
          <motion.h1
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="block">{title}</span>
            <span className="block mt-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {name}
            </span>
          </motion.h1>
          
          <motion.p
            className="max-w-[700px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
          
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
              <Link href={primaryLink}>
                {primaryButton} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
              <Link href={secondaryLink}>{secondaryButton}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
