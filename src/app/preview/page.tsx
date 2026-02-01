"use client"

import { useEffect, useState } from "react"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Loader2 } from "lucide-react"
import Navbar1 from "@/components/navbars/ModernNavbars/Navbar1"
import Hero1 from "@/components/heroes/ModernHero/Hero1"
import Footer1 from "@/components/footer/ModernFooter/Footer1"

// Define Component Mapping
const componentMap = {
  navbar: {
    Navbar1,
  },
  hero: {
    Hero1,
  },
  footer: {
    Footer1,
  },
}

interface SelectedComponents {
  navbar?: keyof typeof componentMap.navbar
  hero?: keyof typeof componentMap.hero
  footer?: keyof typeof componentMap.footer
}

const PreviewPage = () => {
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponents>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("selectedComponents")
    if (stored) {
      setSelectedComponents(JSON.parse(stored))
    }
    // Simulate a brief loading for smooth transition
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const hasComponents = selectedComponents.navbar || selectedComponents.hero || selectedComponents.footer

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="p-4 rounded-full bg-purple-500/10 border border-purple-500/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-8 h-8 text-purple-400" />
            </motion.div>
            <p className="text-gray-400 text-sm">Loading preview...</p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          className="w-full min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {!hasComponents ? (
            // Empty state
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px]"
                  animate={{
                    x: [0, 30, -30, 0],
                    y: [0, -20, 20, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ top: "30%", left: "30%" }}
                />
              </div>

              <motion.div
                className="relative z-10 text-center px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="mx-auto w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Eye className="w-10 h-10 text-purple-400" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  No components selected
                </h2>
                <p className="text-gray-400 max-w-md mx-auto">
                  Go back to the editor and select some components to preview your portfolio.
                </p>
                <motion.a
                  href="/template"
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-medium"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Choose a Template
                </motion.a>
              </motion.div>
            </div>
          ) : (
            // Preview content with smooth transitions
            <>
              {/* Navbar Preview */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {selectedComponents.navbar &&
                  componentMap.navbar[selectedComponents.navbar] &&
                  React.createElement(componentMap.navbar[selectedComponents.navbar])}
              </motion.div>

              {/* Hero Preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {selectedComponents.hero &&
                  componentMap.hero[selectedComponents.hero] &&
                  React.createElement(componentMap.hero[selectedComponents.hero])}
              </motion.div>

              {/* Footer Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {selectedComponents.footer &&
                  componentMap.footer[selectedComponents.footer] &&
                  React.createElement(componentMap.footer[selectedComponents.footer])}
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PreviewPage
