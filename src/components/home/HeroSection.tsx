"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Play, Zap, Layers, Palette } from "lucide-react"
import {
  MeshGradientBackground,
  CyberButton,
  GlowText,
  BeamEffect,
} from "@/components/ui/AntigravityComponents"

interface HeroSectionProps {
  setIsLoading: (loading: boolean) => void
}

export default function HeroSection({ setIsLoading }: HeroSectionProps) {
  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast",
      description: "Build in minutes, not hours",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Modular Design",
      description: "Mix and match components",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Fully Customizable",
      description: "Your vision, your style",
      gradient: "from-orange-400 to-red-500",
    },
  ]

  const stats = [
    { value: "10K", suffix: "+", label: "Active Users" },
    { value: "500", suffix: "+", label: "Templates" },
    { value: "99.9", suffix: "%", label: "Uptime" },
  ]

  return (
    <section className="relative h-screen overflow-hidden bg-[#000] flex flex-col">
      {/* Mesh gradient background */}
      <MeshGradientBackground intensity="normal" />

      {/* Beam effects */}
      <BeamEffect />

      {/* Main content - centered vertically */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm"
            whileHover={{ scale: 1.02, borderColor: "rgba(0,240,255,0.5)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs text-cyan-300 font-medium">New: AI-Powered Templates</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <div className="text-center mb-4">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              className="block text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Build portfolios
            </motion.span>
            <GlowText
              color="gradient"
              glow={false}
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              the new way
            </GlowText>
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          className="text-base md:text-lg text-white/50 text-center max-w-xl mx-auto mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Create stunning developer portfolios in minutes with our next-generation builder.
          No coding required. Just pure creativity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/sign-up" onClick={() => setIsLoading(true)}>
            <CyberButton variant="primary" size="md">
              <Sparkles className="w-4 h-4" />
              Start Building
              <ArrowRight className="w-4 h-4" />
            </CyberButton>
          </Link>

          <Link href="/template">
            <CyberButton variant="secondary" size="md">
              <Play className="w-4 h-4" />
              View Templates
            </CyberButton>
          </Link>
        </motion.div>

        {/* Feature cards - compact */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-4 hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{
                y: -4,
                boxShadow: "0 10px 40px rgba(0,240,255,0.1)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${feature.gradient} shrink-0`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-0.5">{feature.title}</h3>
                  <p className="text-white/50 text-xs">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section - compact */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {stat.value}
                <span className="text-cyan-400">{stat.suffix}</span>
              </div>
              <p className="mt-1 text-xs text-white/50 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - positioned at bottom */}
      <motion.div
        className="relative z-20 pb-4 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1 cursor-pointer group"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-[10px] text-white/30 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
            Scroll
          </span>
          <motion.div
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-cyan-400/50 transition-colors"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-white/40 group-hover:bg-cyan-400 transition-colors"
              animate={{ opacity: [1, 0.3, 1], y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
