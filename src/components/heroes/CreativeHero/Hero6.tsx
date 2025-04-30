"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VideoHero() {
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [isMuted, setIsMuted] = React.useState(true)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-black">
        <video ref={videoRef} autoPlay loop muted playsInline className="h-full w-full object-cover">
          {/* Replace with your actual video source */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-with-a-black-and-white-outfit-39880-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
              Fashion in Motion
            </h1>
            <p className="mb-8 text-lg text-white/80 sm:text-xl">
              Bringing designs to life through dynamic visual storytelling and cinematic fashion films.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-black hover:bg-white/90">Explore Collections</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                Behind the Scenes
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <button
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>
    </section>
  )
}
