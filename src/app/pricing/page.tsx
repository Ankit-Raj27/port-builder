"use client"

import { CheckCheck, CircleOff } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbars/Navbar"
import Footer from "@/components/common/Footer"
import PaymentButton from "@/components/common/button/SubscriptionButton"
import LoadingPage from "@/components/common/Loading"
import { useState } from "react"
import { MeshGradientBackground } from "@/components/ui/AntigravityComponents"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const MotionCard = motion.create(Card)

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "For individuals just getting started",
    features: [
      { name: "1 portfolio website", included: true },
      { name: "Basic templates", included: true },
      { name: "Community support", included: true },
      { name: "Custom domain", included: false },
      { name: "Analytics dashboard", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Current Plan",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499",
    description: "For professionals who need more",
    features: [
      { name: "Unlimited portfolios", included: true },
      { name: "Premium templates", included: true },
      { name: "Priority support", included: true },
      { name: "Custom domain", included: true },
      { name: "Analytics dashboard", included: true },
      { name: "Remove branding", included: true },
    ],
    cta: "Get Started",
    popular: true,
    amount: 499,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and organizations",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Team collaboration", included: true },
      { name: "Custom integrations", included: true },
      { name: "Dedicated support", included: true },
      { name: "SLA guarantee", included: true },
      { name: "Custom branding", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingPage() {
  const [loading, setLoading] = useState(false)

  if (loading) {
    return <LoadingPage />
  }

  return (
    <>
      <Navbar />

      {/* Antigravity-inspired background */}
      <MeshGradientBackground intensity="subtle" />

      <section className="relative z-10 min-h-screen bg-transparent py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
              Pricing Plans
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Upgrade anytime as your requirements grow.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {plans.map((plan) => (
              <MotionCard
                key={plan.name}
                variants={cardVariants}
                className={`relative overflow-hidden bg-white/[0.03] backdrop-blur-xl border-white/[0.08] hover:border-white/[0.15] transition-all duration-500 ${plan.popular ? "border-cyan-500/50 md:scale-105" : ""
                  }`}
                whileHover={{
                  y: -8,
                  boxShadow: plan.popular
                    ? "0 0 60px rgba(0, 240, 255, 0.15)"
                    : "0 0 40px rgba(255, 255, 255, 0.05)"
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
                )}

                <CardHeader>
                  {plan.popular && (
                    <Badge className="w-fit mb-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      Most Popular
                    </Badge>
                  )}
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-white/50">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    {plan.name !== "Enterprise" && (
                      <span className="text-white/40 ml-2">/one-time</span>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={feature.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-center gap-3"
                      >
                        {feature.included ? (
                          <div className="w-5 h-5 rounded-full bg-cyan-400/10 flex items-center justify-center">
                            <CheckCheck className="w-3 h-3 text-cyan-400" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                            <CircleOff className="w-3 h-3 text-white/20" />
                          </div>
                        )}
                        <span className={feature.included ? "text-white/70" : "text-white/30"}>
                          {feature.name}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  {plan.amount ? (
                    <motion.div
                      className="w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PaymentButton amount={plan.amount} setLoading={setLoading} />
                    </motion.div>
                  ) : (
                    <motion.button
                      className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${plan.name === "Free"
                        ? "bg-white/5 text-white/50 border border-white/10 cursor-default"
                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                        }`}
                      whileHover={plan.name !== "Free" ? { scale: 1.02 } : {}}
                      whileTap={plan.name !== "Free" ? { scale: 0.98 } : {}}
                    >
                      {plan.cta}
                    </motion.button>
                  )}
                </CardFooter>
              </MotionCard>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-white/30 text-sm">
              Secure payments powered by Razorpay • 30-day money back guarantee
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
