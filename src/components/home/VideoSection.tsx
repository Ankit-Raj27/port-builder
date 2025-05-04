"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { Pause, Play } from 'lucide-react'

interface VideoPlayerProps {
    poster?: string
}

export default function VideoPlayer({ poster }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(true)

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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid justify-center items-center text-center w-full  bg-gradient-to-tr from-[#1a1a1a] via-[#000] to-[#1a1a1a]  py-12 px-4 sm:px-6 lg:px-8">
            <h2 className=" text-3xl font-bold text-white mb-4">How Our Site Works</h2>
            <p className="text-lg text-gray-600 mb-8">
                Watch this short video to understand the features and workflow of our platform.
            </p>
            <div className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-black">
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border border-slate-600">

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
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={togglePlay}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-white/90 transition-colors"
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )

}
