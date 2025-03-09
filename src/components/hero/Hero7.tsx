import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Hero7() {
  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="container grid items-center gap-6 px-4 md:grid-cols-2 md:gap-10 lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-xl md:order-last">
          <Image src="/placeholder.svg?height=600&width=600" alt="John Doe" fill className="object-cover" priority />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">John Doe</h1>
            <p className="mt-2 text-xl font-medium text-primary">Full Stack Developer</p>
          </div>

          <p className="text-muted-foreground">
            I build accessible, user-friendly web applications that solve real-world problems. With 5+ years of
            experience in web development, I specialize in creating performant and scalable solutions.
          </p>

          <div className="flex gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild>
              <Link href="#contact">
                Let us Talk
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resume.pdf" target="_blank">
                Download Resume
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

