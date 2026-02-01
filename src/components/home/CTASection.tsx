"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react"
import { CyberButton, GlowText, BeamEffect } from "@/components/ui/AntigravityComponents"

export default function CTASection() {
  const benefits = [
    { icon: <Zap className="w-5 h-5" />, text: "Instant Setup" },
    { icon: <Shield className="w-5 h-5" />, text: "Secure & Private" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 Support" },
  ]

  return (
    <section className="relative py-32 bg-[#000] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glow */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[200px]"
          style={{
            background: "radial-gradient(circle, rgba(0,240,255,0.12) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Beam effects */}
      <BeamEffect />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Glass card container */}
        <motion.div
          className="relative rounded-[32px] overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Border gradient */}
          <div className="absolute inset-0 rounded-[32px] p-px bg-gradient-to-b from-cyan-500/30 via-transparent to-purple-500/30">
            <div className="h-full w-full rounded-[32px] bg-[#050505]" />
          </div>

          {/* Content */}
          <div className="relative p-10 md:p-16 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Limited Time Offer</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-white/90">Ready to </span>
              <GlowText color="gradient" glow={false} className="text-3xl md:text-4xl lg:text-5xl font-bold">
                level up
              </GlowText>
              <span className="text-white/90"> your portfolio?</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg text-white/50 max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of developers who have already transformed their online presence.
              Start building today and stand out from the crowd.
            </motion.p>

            {/* Benefits */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  className="flex items-center gap-2 text-white/60"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ color: "rgba(0,240,255,0.8)" }}
                >
                  <span className="text-cyan-400">{benefit.icon}</span>
                  <span className="text-sm font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/sign-up">
                <CyberButton variant="primary" size="lg">
                  <Sparkles className="w-5 h-5" />
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </CyberButton>
              </Link>

              <Link href="/pricing">
                <CyberButton variant="secondary" size="lg">
                  View Pricing
                </CyberButton>
              </Link>
            </motion.div>

            {/* Trust text */}
            <motion.p
              className="mt-8 text-xs text-white/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              No credit card required • Cancel anytime • 14-day free trial
            </motion.p>
          </div>

          {/* Decorative orbs */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-cyan-500/10 blur-[60px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-purple-500/10 blur-[60px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}