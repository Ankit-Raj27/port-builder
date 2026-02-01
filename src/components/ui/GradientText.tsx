"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientTextProps {
    children: React.ReactNode
    className?: string
    colors?: string[]
    animationSpeed?: number
    showShimmer?: boolean
}

export function GradientText({
    children,
    className,
    colors = ["#a855f7", "#6366f1", "#3b82f6", "#a855f7"],
    animationSpeed = 3,
    showShimmer = true,
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
        backgroundSize: "200% auto",
    }

    return (
        <motion.span
            className={cn(
                "inline-block bg-clip-text text-transparent",
                className
            )}
            style={gradientStyle}
            animate={{
                backgroundPosition: ["0% center", "200% center"],
            }}
            transition={{
                duration: animationSpeed,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            {children}
            {showShimmer && (
                <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                        x: ["-100%", "100%"],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                    }}
                />
            )}
        </motion.span>
    )
}

// Split text animation component
interface SplitTextProps {
    text: string
    className?: string
    delay?: number
    staggerDelay?: number
}

export function SplitText({
    text,
    className,
    delay = 0,
    staggerDelay = 0.03,
}: SplitTextProps) {
    const words = text.split(" ")

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    }

    const wordVariants = {
        hidden: {
            y: 50,
            opacity: 0,
            rotateX: -90,
        },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    }

    return (
        <motion.span
            className={cn("inline-flex flex-wrap", className)}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-[0.25em]"
                    style={{ perspective: "1000px" }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    )
}

// Animated heading with blur-in effect
interface BlurInTextProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

export function BlurInText({
    children,
    className,
    delay = 0,
}: BlurInTextProps) {
    return (
        <motion.span
            className={cn("inline-block", className)}
            initial={{
                opacity: 0,
                filter: "blur(10px)",
                y: 20,
            }}
            animate={{
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
            }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
        >
            {children}
        </motion.span>
    )
}

// Character-by-character animation
interface CharacterAnimationProps {
    text: string
    className?: string
    delay?: number
    staggerDelay?: number
}

export function CharacterAnimation({
    text,
    className,
    delay = 0,
    staggerDelay = 0.02,
}: CharacterAnimationProps) {
    const characters = text.split("")

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    }

    const characterVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    }

    return (
        <motion.span
            className={cn("inline-block", className)}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={characterVariants}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    )
}
