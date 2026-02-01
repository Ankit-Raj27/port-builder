"use client"

import Link from "next/link"
import { SignUp, useAuth } from "@clerk/nextjs"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, UserPlus } from "lucide-react"

export default function SignUpPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/template")
    }
  }, [isSignedIn, router])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
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
          style={{ top: "20%", right: "30%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px]"
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ bottom: "20%", left: "30%" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[100px]"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "60%", right: "20%" }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
        <motion.div
          className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[450px] py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300">Create your account</span>
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Join{" "}
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Port-Builder
              </span>
            </h1>
            <p className="text-gray-400">
              Start building your portfolio in minutes
            </p>
          </motion.div>

          {/* Clerk Sign Up */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex justify-center"
          >
            <SignUp
              forceRedirectUrl={"/template"}
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl",
                  headerTitle: "text-white",
                  headerSubtitle: "text-gray-400",
                  socialButtonsBlockButton: "bg-white/10 border-white/20 text-white hover:bg-white/20",
                  formFieldLabel: "text-gray-300",
                  formFieldInput: "bg-white/5 border-white/10 text-white placeholder:text-gray-500",
                  footerActionLink: "text-purple-400 hover:text-purple-300",
                  identityPreviewEditButton: "text-purple-400",
                }
              }}
            />
          </motion.div>

          {/* Terms */}
          <motion.p
            className="px-8 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-purple-400 hover:text-purple-300 underline-offset-4 hover:underline transition-colors">
              Terms of Use
            </Link>{" "}
            and acknowledge you&apos;ve read our{" "}
            <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline-offset-4 hover:underline transition-colors">
              Privacy Policy
            </Link>
            .
          </motion.p>

          {/* Back to home */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/"
              className="text-gray-500 hover:text-white text-sm transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Back to home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
