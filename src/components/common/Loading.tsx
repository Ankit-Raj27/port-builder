"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingPage() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100
                return prev + Math.random() * 15
            })
        }, 200)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#000] z-50">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[180px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[150px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                    style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                />
            </div>

            {/* Logo/Brand */}
            <motion.div
                className="relative z-10 mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                >
                    PortBuilder
                </motion.div>
            </motion.div>

            {/* Animated loader */}
            <div className="relative z-10 mb-8">
                <div className="relative w-20 h-20">
                    {/* Outer ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Cyan ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            border: "2px solid transparent",
                            borderTopColor: "#00f0ff",
                            borderRightColor: "#00f0ff",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Purple ring */}
                    <motion.div
                        className="absolute inset-2 rounded-full"
                        style={{
                            border: "2px solid transparent",
                            borderTopColor: "#8b5cf6",
                            borderLeftColor: "#8b5cf6",
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Center dot */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative z-10 w-48 mb-4">
                <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Loading text */}
            <motion.div
                className="relative z-10 text-sm text-white/40 font-medium"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Loading experience...
            </motion.div>

            {/* Decorative particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-cyan-400/50"
                        initial={{
                            x: "50%",
                            y: "50%",
                            scale: 0,
                        }}
                        animate={{
                            x: `${50 + (Math.random() - 0.5) * 40}%`,
                            y: `${50 + (Math.random() - 0.5) * 40}%`,
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
