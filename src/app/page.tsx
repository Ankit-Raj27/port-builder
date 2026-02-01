"use client"

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbars/Navbar"
import Footer from "@/components/common/Footer"
import LoadingPage from "@/components/common/Loading"
import HeroSection from "@/components/home/HeroSection"
import TemplatesSection from "@/components/home/TemplatesSection"
import CTASection from "@/components/home/CTASection"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/template")
    }
  }, [isSignedIn, router])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="home-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative bg-[#000] min-h-screen"
      >
        {/* Fixed navbar */}
        <Navbar />

        {/* Loading overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#000]"
            >
              <LoadingPage />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="font-['Inter'] relative">
          {/* Hero Section */}
          <HeroSection setIsLoading={setIsLoading} />

          {/* Decorative section divider */}
          <div className="relative h-32 bg-[#000] overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-1/2 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400/50"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400/30"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Templates Section */}
          <TemplatesSection />

          {/* Another divider */}
          <div className="relative h-20 bg-[#000] overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-1/2 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
          </div>

          {/* CTA Section */}
          <CTASection />

          {/* Footer */}
          <Footer />
        </main>

        {/* Cursor follower glow (desktop only) */}
        <div
          className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
          id="cursor-glow"
        >
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)",
              left: "var(--cursor-x, 50%)",
              top: "var(--cursor-y, 50%)",
              transform: "translate(-50%, -50%)",
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}