"use client"

import { motion, Variants } from "framer-motion"
import { useState, useRef } from "react"
import { Pause, Play, Volume2, VolumeX, Maximize } from 'lucide-react'
import { AnimatedSection } from "@/components/common/AnimatedSection"

interface VideoPlayerProps {
    poster?: string
}

export default function VideoPlayer({ poster }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    const togglePlay = () => {
        const video = videoRef.current
        if (!video) { return }

        if (isPlaying) {
            video.pause()
        } else {
            video.play()
        }
        setIsPlaying(!isPlaying)
    }

    const toggleMute = () => {
        const video = videoRef.current
        if (!video) { return }

        video.muted = !video.muted
        setIsMuted(!isMuted)
    }

    const toggleFullscreen = () => {
        const video = videoRef.current
        if (!video) { return }

        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            video.requestFullscreen()
        }
    }

    const controlButtonVariants: Variants = {
        initial: { scale: 1 },
        hover: { scale: 1.1 },
        tap: { scale: 0.95 },
    }

    return (
        <AnimatedSection animation="slideUp" delay={0.2}>
            <motion.div
                className="relative w-full bg-gradient-to-b from-[#0a0a0a] via-[#000] to-[#0a0a0a] py-20 px-4 sm:px-6 lg:px-8"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        className="absolute w-[500px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full"
                        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <motion.span
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className="text-sm text-blue-400">Demo</span>
                        </motion.span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            How Our Site{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Works
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Watch this short video to understand the features and workflow of our platform.
                        </p>
                    </motion.div>

                    {/* Video container with glassmorphism */}
                    <motion.div
                        className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-2 shadow-2xl"
                        whileHover={{
                            borderColor: "rgba(255,255,255,0.2)",
                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Gradient accent at top */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-t-2xl" />

                        <div className="relative aspect-video rounded-xl overflow-hidden">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                poster={poster}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                            >
                                <source src="Demo.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Gradient overlay at bottom */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center justify-between">
                                    {/* Left controls */}
                                    <div className="flex items-center gap-3">
                                        <motion.button
                                            onClick={togglePlay}
                                            variants={controlButtonVariants}
                                            initial="initial"
                                            whileHover="hover"
                                            whileTap="tap"
                                            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
                                        >
                                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                        </motion.button>

                                        <motion.button
                                            onClick={toggleMute}
                                            variants={controlButtonVariants}
                                            initial="initial"
                                            whileHover="hover"
                                            whileTap="tap"
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
                                        >
                                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                        </motion.button>
                                    </div>

                                    {/* Right controls */}
                                    <motion.button
                                        onClick={toggleFullscreen}
                                        variants={controlButtonVariants}
                                        initial="initial"
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
                                    >
                                        <Maximize size={18} />
                                    </motion.button>
                                </div>
                            </motion.div>

                            {/* Play button overlay when paused */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: !isPlaying ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
                                    animate={{ scale: !isPlaying ? [1, 1.1, 1] : 1 }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Play className="w-8 h-8 text-white ml-1" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Features below video */}
                    <motion.div
                        className="mt-12 grid grid-cols-3 gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {[
                            { label: "Easy Setup", value: "5 min" },
                            { label: "No Code", value: "100%" },
                            { label: "Free Tier", value: "Forever" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <span className="block text-2xl font-bold text-white mb-1">
                                    {item.value}
                                </span>
                                <span className="text-sm text-gray-500">{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </AnimatedSection>
    )
}
