"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection() {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="h-auto text-white shadow-lg p-16 w-full bg-gradient-to-tr from-[#1a1a1a] via-[#000] to-[#1a1a1a] dark:bg-gradient-to-tr dark:from-[#1a1a1a] dark:via-[#000] dark:to-[#1a1a1a] flex flex-col items-center justify-center px-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-4xl mx-auto text-center space-y-8"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-navy-900">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="block dark:text-white"
          >
            Your vision. Your goals.
          </motion.span>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="block dark:text-gray-400"
          >
            Your website.
          </motion.span>
        </h1>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            type: "spring",
            stiffness: 200,
          }}
          viewport={{ once: true }}
        >
          <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-lg bg-gray font-medium dark:bg-[#1A1A1A] text-navy-900 dark:hover:"
            >
              <Link href="/pricing">Get Started</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}