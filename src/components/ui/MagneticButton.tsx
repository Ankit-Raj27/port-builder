"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    magneticStrength?: number
    onClick?: () => void
    disabled?: boolean
}

export function MagneticButton({
    children,
    className,
    magneticStrength = 0.3,
    onClick,
    disabled = false,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current || disabled) return

        const rect = buttonRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * magneticStrength
        const deltaY = (e.clientY - centerY) * magneticStrength

        setPosition({ x: deltaX, y: deltaY })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
        setIsHovered(false)
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            disabled={disabled}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            animate={{
                x: position.x,
                y: position.y,
                scale: isHovered ? 1.05 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative overflow-hidden rounded-full px-8 py-3 font-medium transition-all duration-300",
                "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600",
                "hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]",
                "text-white",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
                "before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
            {/* Ripple effect container */}
            <motion.span
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={isHovered ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.6 }}
            />
        </motion.button>
    )
}

// Alternative variant with outline style
export function MagneticButtonOutline({
    children,
    className,
    magneticStrength = 0.3,
    onClick,
    disabled = false,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current || disabled) return

        const rect = buttonRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * magneticStrength
        const deltaY = (e.clientY - centerY) * magneticStrength

        setPosition({ x: deltaX, y: deltaY })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
        setIsHovered(false)
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            disabled={disabled}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            animate={{
                x: position.x,
                y: position.y,
                scale: isHovered ? 1.05 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative overflow-hidden rounded-full px-8 py-3 font-medium transition-all duration-300",
                "border-2 border-white/30 hover:border-white/60",
                "bg-white/5 backdrop-blur-sm",
                "hover:bg-white/10",
                "text-white",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    )
}
