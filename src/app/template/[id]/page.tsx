"use client"

import ModernTemplate from "@/app/custom/ModernTemplate"
import CreativeTemplate from "@/app/custom/CreativeTemplate"
import BusinessTemplate from "@/app/custom/BusinessTemplate"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

const templatesMap: Record<string, JSX.Element> = {
  Modern: <ModernTemplate />,
  Creative: <CreativeTemplate />,
  Business: <BusinessTemplate />,
}

const Page = () => {
  const params = useParams()
  const id = params?.id as string

  const SelectedTemplate = templatesMap[id]

  if (!SelectedTemplate) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-orange-600/10 blur-[150px]"
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
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mx-auto w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <AlertCircle className="w-10 h-10 text-orange-400" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Template not found
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            The template you&apos;re looking for doesn&apos;t exist. Please choose from our available templates.
          </p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/template">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-medium"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Browse Templates
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {SelectedTemplate}
      </motion.div>
    </AnimatePresence>
  )
}

export default Page
