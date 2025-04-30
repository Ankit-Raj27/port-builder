"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Pause, Play } from 'lucide-react'

interface VideoPlayerProps {
    src: string
    poster?: string
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(true)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const imageHoverVariants = {
        initial: { scale: 1 },
        hover: {
          scale: 1.05,
          transition: { duration: 0.3 },
        },
      }

    useEffect(() => {
        const video = videoRef.current
        if (!video) { return }

        const updateProgress = () => {
            if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100)
                setCurrentTime(video.currentTime)
            }
        }

        const handleDurationChange = () => {
            setDuration(video.duration)
        }

        video.addEventListener("timeupdate", updateProgress)
        video.addEventListener("durationchange", handleDurationChange)

        return () => {
            video.removeEventListener("timeupdate", updateProgress)
            video.removeEventListener("durationchange", handleDurationChange)
        }
    }, [])

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


    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current
        if (!video) { return }

        const progressBar = e.currentTarget
        const rect = progressBar.getBoundingClientRect()
        const pos = (e.clientX - rect.left) / rect.width

        video.currentTime = pos * video.duration
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
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
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div
                        className="relative h-1 w-full bg-white/30 rounded-full cursor-pointer mb-4"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={togglePlay}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-white/90 transition-colors"
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>

                            <div className="text-white text-sm">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )

}
