import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function SplitHero() {
  return (
    <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Text Content */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
          <span className="block">Creative</span>
          <span className="block">Vision</span>
          <span className="block text-muted-foreground">Realized</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
          Fashion designer and visual artist creating at the intersection of tradition and innovation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="group">
            View Portfolio
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline">
            Contact Me
          </Button>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full h-[50vh] md:h-auto overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=720"
          alt="Fashion design showcase"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
    </section>
  )
}
