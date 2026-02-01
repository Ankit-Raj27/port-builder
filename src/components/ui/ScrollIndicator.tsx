"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface ScrollIndicatorProps {
    className?: string
    targetId?: string
}

export function ScrollIndicator({ className, targetId }: ScrollIndicatorProps) {
    const handleClick = () => {
        if (targetId) {
            const element = document.getElementById(targetId)
            element?.scrollIntoView({ behavior: "smooth" })
        } else {
            window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
            })
        }
    }

    return (
        <motion.button
            onClick={handleClick}
            className={cn(
                "flex flex-col items-center gap-2 cursor-pointer group",
                className
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
        >
            <motion.span
                className="text-sm text-white/60 group-hover:text-white/80 transition-colors"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Scroll to explore
            </motion.span>
            <motion.div
                className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
                whileHover={{ borderColor: "rgba(255,255,255,0.6)" }}
            >
                <motion.div
                    className="w-1.5 h-3 bg-white/60 rounded-full"
                    animate={{ y: [0, 12, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>
            <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <ChevronDown className="w-5 h-5 text-white/40" />
            </motion.div>
        </motion.button>
    )
}

// Animated background gradient mesh
export function GradientMesh({ className }: { className?: string }) {
    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/30 blur-[120px]"
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -100, 50, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ top: "10%", left: "20%" }}
            />
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[100px]"
                animate={{
                    x: [0, -80, 60, 0],
                    y: [0, 80, -40, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ top: "40%", right: "15%" }}
            />
            <motion.div
                className="absolute w-[350px] h-[350px] rounded-full bg-indigo-500/25 blur-[90px]"
                animate={{
                    x: [0, 60, -80, 0],
                    y: [0, -60, 80, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ bottom: "20%", left: "30%" }}
            />
        </div>
    )
}

// Animated grid pattern
export function GridPattern({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "absolute inset-0 pointer-events-none opacity-20",
                className
            )}
            style={{
                backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
                backgroundSize: "50px 50px",
            }}
        />
    )
}
