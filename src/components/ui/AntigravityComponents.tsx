"use client"

import { motion } from "framer-motion"
import { useRef, useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

// ============================================
// BENTO GRID COMPONENT
// ============================================
interface BentoGridProps {
    children: ReactNode
    className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
                className
            )}
        >
            {children}
        </div>
    )
}

interface BentoCardProps {
    children: ReactNode
    className?: string
    span?: "default" | "wide" | "tall" | "large"
    gradient?: string
}

export function BentoCard({
    children,
    className,
    span = "default",
    gradient,
}: BentoCardProps) {
    const spanClasses = {
        default: "",
        wide: "md:col-span-2",
        tall: "md:row-span-2",
        large: "md:col-span-2 md:row-span-2",
    }

    return (
        <motion.div
            className={cn(
                "relative overflow-hidden rounded-3xl",
                "bg-white/[0.03] backdrop-blur-xl",
                "border border-white/[0.08]",
                "transition-all duration-500",
                "hover:border-white/[0.15] hover:bg-white/[0.05]",
                "group",
                spanClasses[span],
                className
            )}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            whileHover={{
                boxShadow: "0 0 60px rgba(0, 240, 255, 0.08)",
            }}
        >
            {/* Gradient overlay on hover */}
            {gradient && (
                <motion.div
                    className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                        gradient
                    )}
                />
            )}

            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
            </div>

            <div className="relative z-10 p-6 md:p-8 h-full">{children}</div>
        </motion.div>
    )
}

// ============================================
// MESH GRADIENT BACKGROUND
// ============================================
interface MeshGradientBackgroundProps {
    className?: string
    intensity?: "subtle" | "normal" | "vibrant"
}

export function MeshGradientBackground({
    className,
    intensity = "normal",
}: MeshGradientBackgroundProps) {
    const opacities = {
        subtle: { primary: 0.05, secondary: 0.03 },
        normal: { primary: 0.12, secondary: 0.08 },
        vibrant: { primary: 0.2, secondary: 0.15 },
    }

    const { primary, secondary } = opacities[intensity]

    return (
        <div className={cn("fixed inset-0 pointer-events-none overflow-hidden", className)}>
            {/* Primary cyan blob */}
            <motion.div
                className="absolute rounded-full blur-[180px]"
                style={{
                    width: "60vw",
                    height: "60vw",
                    maxWidth: "800px",
                    maxHeight: "800px",
                    background: `radial-gradient(circle, rgba(0,240,255,${primary}) 0%, transparent 70%)`,
                    top: "0%",
                    left: "60%",
                    transform: "translate(-50%, -30%)",
                }}
                animate={{
                    x: [0, 80, -40, 0],
                    y: [0, -60, 40, 0],
                    scale: [1, 1.15, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Purple blob */}
            <motion.div
                className="absolute rounded-full blur-[180px]"
                style={{
                    width: "50vw",
                    height: "50vw",
                    maxWidth: "700px",
                    maxHeight: "700px",
                    background: `radial-gradient(circle, rgba(139,92,246,${primary}) 0%, transparent 70%)`,
                    bottom: "10%",
                    left: "10%",
                }}
                animate={{
                    x: [0, -60, 40, 0],
                    y: [0, 50, -30, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Blue accent */}
            <motion.div
                className="absolute rounded-full blur-[150px]"
                style={{
                    width: "40vw",
                    height: "40vw",
                    maxWidth: "500px",
                    maxHeight: "500px",
                    background: `radial-gradient(circle, rgba(66,133,244,${secondary}) 0%, transparent 70%)`,
                    top: "50%",
                    right: "5%",
                }}
                animate={{
                    x: [0, 40, -20, 0],
                    y: [0, -40, 60, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Noise texture */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    )
}

// ============================================
// CYBER BUTTON
// ============================================
interface CyberButtonProps {
    children: ReactNode
    className?: string
    variant?: "primary" | "secondary" | "ghost"
    size?: "sm" | "md" | "lg"
    onClick?: () => void
    disabled?: boolean
}

export function CyberButton({
    children,
    className,
    variant = "primary",
    size = "md",
    onClick,
    disabled = false,
}: CyberButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current || disabled) return
        const rect = buttonRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const x = (e.clientX - centerX) * 0.15
        const y = (e.clientY - centerY) * 0.15
        setPosition({ x, y })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
        setIsHovered(false)
    }

    const sizeClasses = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    }

    const variantClasses = {
        primary: cn(
            "bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500",
            "text-black font-semibold",
            "shadow-[0_0_30px_rgba(0,240,255,0.3)]",
            "hover:shadow-[0_0_50px_rgba(0,240,255,0.5)]"
        ),
        secondary: cn(
            "bg-white/5 backdrop-blur-sm",
            "border border-white/20",
            "text-white",
            "hover:bg-white/10 hover:border-cyan-400/50"
        ),
        ghost: cn(
            "bg-transparent",
            "text-white/70",
            "hover:text-white hover:bg-white/5"
        ),
    }

    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            disabled={disabled}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            animate={{
                x: position.x,
                y: position.y,
                scale: isHovered ? 1.02 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 0.5,
            }}
            whileTap={{ scale: 0.97 }}
            className={cn(
                "relative overflow-hidden rounded-full font-medium",
                "transition-all duration-300",
                sizeClasses[size],
                variantClasses[variant],
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            {/* Shimmer effect */}
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
            />
        </motion.button>
    )
}

// ============================================
// GLOW TEXT
// ============================================
interface GlowTextProps {
    children: ReactNode
    className?: string
    color?: "cyan" | "purple" | "blue" | "gradient"
    glow?: boolean
}

export function GlowText({
    children,
    className,
    color = "gradient",
    glow = true,
}: GlowTextProps) {
    const colorClasses = {
        cyan: "text-cyan-400",
        purple: "text-purple-400",
        blue: "text-blue-400",
        gradient: "bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent",
    }

    const glowStyles = {
        cyan: { textShadow: "0 0 40px rgba(0,240,255,0.5), 0 0 80px rgba(0,240,255,0.3)" },
        purple: { textShadow: "0 0 40px rgba(139,92,246,0.5), 0 0 80px rgba(139,92,246,0.3)" },
        blue: { textShadow: "0 0 40px rgba(66,133,244,0.5), 0 0 80px rgba(66,133,244,0.3)" },
        gradient: {},
    }

    return (
        <motion.span
            className={cn(colorClasses[color], className)}
            style={glow ? glowStyles[color] : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {children}
        </motion.span>
    )
}

// ============================================
// FLOATING CARDS
// ============================================
interface FloatingCardProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function FloatingCard({ children, className, delay = 0 }: FloatingCardProps) {
    return (
        <motion.div
            className={cn(
                "relative rounded-2xl",
                "bg-white/[0.03] backdrop-blur-xl",
                "border border-white/[0.08]",
                "p-6",
                className
            )}
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            whileHover={{
                y: -8,
                rotateX: 5,
                boxShadow: "0 20px 60px rgba(0,240,255,0.1)",
                borderColor: "rgba(0,240,255,0.3)",
            }}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
            {children}
        </motion.div>
    )
}

// ============================================
// BEAM EFFECT
// ============================================
export function BeamEffect({ className }: { className?: string }) {
    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {/* Horizontal beam */}
            <motion.div
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                style={{ top: "30%" }}
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 1, 1, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                }}
            />

            {/* Vertical beam */}
            <motion.div
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-400/50 to-transparent"
                style={{ left: "70%" }}
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "100%", opacity: [0, 1, 1, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />
        </div>
    )
}

// ============================================
// REVEAL TEXT
// ============================================
interface RevealTextProps {
    children: string
    className?: string
    delay?: number
}

export function RevealText({ children, className, delay = 0 }: RevealTextProps) {
    return (
        <motion.div className={cn("overflow-hidden", className)}>
            <motion.span
                className="block"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.25, 0.4, 0.25, 1],
                }}
            >
                {children}
            </motion.span>
        </motion.div>
    )
}

// ============================================
// STAT COUNTER
// ============================================
interface StatCounterProps {
    value: string
    label: string
    suffix?: string
    className?: string
}

export function StatCounter({ value, label, suffix = "", className }: StatCounterProps) {
    return (
        <motion.div
            className={cn("text-center", className)}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.div
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {value}
                <span className="text-cyan-400">{suffix}</span>
            </motion.div>
            <motion.p
                className="mt-2 text-sm md:text-base text-white/50 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {label}
            </motion.p>
        </motion.div>
    )
}
