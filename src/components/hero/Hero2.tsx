import { ArrowDown } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Hero2() {
  return (
    <section className="relative bg-muted py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <Badge className="mb-4">Available for Hire</Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">John Doe</h1>
          <p className="mt-4 max-w-[700px] text-xl text-muted-foreground">Creative Developer & Designer</p>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {["React", "Next.js", "TypeScript", "Tailwind", "Figma", "UI/UX"].map((skill) => (
              <div key={skill} className="flex h-20 items-center justify-center rounded-lg bg-background p-4 shadow-sm">
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="#projects">
                Explore My Work
                <ArrowDown className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

