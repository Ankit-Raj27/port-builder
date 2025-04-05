import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Hero1() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Hi, I am <span className="text-primary">John Doe</span>
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl">Frontend Developer & UI/UX Designer</p>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              I create beautiful, responsive websites with modern technologies that help businesses grow and users
              smile.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="#projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[400px] w-[400px] overflow-hidden rounded-full border-8 border-muted">
              <Image
                src="/images/component/hero1.jpg?height=400&width=400"
                alt="John Doe"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

