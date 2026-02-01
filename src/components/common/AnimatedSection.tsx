"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur" | "slideUp"

interface AnimatedSectionProps {
    children: React.ReactNode
    className?: string
    animation?: AnimationType
    delay?: number
    duration?: number
    once?: boolean
    amount?: number
}

const animations: Record<AnimationType, Variants> = {
    fadeUp: {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    blur: {
        hidden: { opacity: 0, filter: "blur(10px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
    },
    slideUp: {
        hidden: { opacity: 0, y: 100, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
    },
}

export function AnimatedSection({
    children,
    className,
    animation = "fadeUp",
    delay = 0,
    duration = 0.6,
    once = true,
    amount = 0.3,
}: AnimatedSectionProps) {
    return (
        <motion.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={animations[animation]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    )
}

// Staggered children animation wrapper
interface StaggerContainerProps {
    children: React.ReactNode
    className?: string
    staggerDelay?: number
    delay?: number
    once?: boolean
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
    delay = 0,
    once = true,
}: StaggerContainerProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    }

    return (
        <motion.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.3 }}
            variants={containerVariants}
        >
            {children}
        </motion.div>
    )
}

// Individual stagger item
interface StaggerItemProps {
    children: React.ReactNode
    className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    }

    return (
        <motion.div className={cn(className)} variants={itemVariants}>
            {children}
        </motion.div>
    )
}

// Parallax wrapper for scroll-based movement
interface ParallaxProps {
    children: React.ReactNode
    className?: string
    speed?: number
    direction?: "up" | "down"
}

export function Parallax({
    children,
    className,
    speed = 0.5,
    direction = "up",
}: ParallaxProps) {
    const yValue = direction === "up" ? -100 * speed : 100 * speed

    return (
        <motion.div
            className={cn(className)}
            initial={{ y: 0 }}
            whileInView={{ y: yValue }}
            viewport={{ once: false, amount: 0 }}
            transition={{
                type: "tween",
                ease: "linear",
            }}
        >
            {children}
        </motion.div>
    )
}

// 3D Card tilt effect
interface TiltCardProps {
    children: React.ReactNode
    className?: string
    tiltStrength?: number
}

export function TiltCard({
    children,
    className,
    tiltStrength = 10,
}: TiltCardProps) {
    const [rotateX, setRotateX] = React.useState(0)
    const [rotateY, setRotateY] = React.useState(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const x = (e.clientX - centerX) / (rect.width / 2)
        const y = (e.clientY - centerY) / (rect.height / 2)

        setRotateX(-y * tiltStrength)
        setRotateY(x * tiltStrength)
    }

    const handleMouseLeave = () => {
        setRotateX(0)
        setRotateY(0)
    }

    return (
        <motion.div
            className={cn("relative", className)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX,
                rotateY,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
            style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
        >
            {children}
        </motion.div>
    )
}

// Floating animation
interface FloatingProps {
    children: React.ReactNode
    className?: string
    duration?: number
    distance?: number
}

export function Floating({
    children,
    className,
    duration = 3,
    distance = 10,
}: FloatingProps) {
    return (
        <motion.div
            className={cn(className)}
            animate={{
                y: [-distance, distance, -distance],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    )
}
