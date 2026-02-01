"use client"

import { SearchBar } from "@/components/forms/search"
import { Navbar } from "@/components/navbars/Navbar"
import Footer from "@/components/common/Footer"
import { motion, Variants } from "framer-motion"
import { Sparkles, Search, Layout } from "lucide-react"
import { GradientText } from "@/components/ui/GradientText"
import { AnimatedSection } from "@/components/common/AnimatedSection"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px]"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "30%", left: "50%", transform: "translateX(-50%)" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[120px]"
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ bottom: "20%", left: "20%" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full bg-violet-500/10 blur-[100px]"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "20%", right: "15%" }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <section className="relative z-10 max-w-[1200px] mx-auto items-center justify-center py-24 flex flex-col md:py-32 px-6">
        <motion.div
          className="text-center w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Welcome to your workspace</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Choose a template and{" "}
            <br className="hidden md:block" />
            <GradientText
              colors={["#a855f7", "#6366f1", "#3b82f6", "#06b6d4", "#a855f7"]}
              animationSpeed={4}
            >
              start creating
            </GradientText>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            Browse through our collection of professionally designed templates
            and customize them to match your unique style.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-xl mx-auto"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <SearchBar />
            </motion.div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: <Layout className="w-5 h-5" />, label: "Templates", value: "15+" },
              { icon: <Search className="w-5 h-5" />, label: "Components", value: "50+" },
              { icon: <Sparkles className="w-5 h-5" />, label: "Customizations", value: "∞" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <motion.div
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.1)",
                  }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-600/20 text-purple-400"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
