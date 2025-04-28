import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Footer2() {
  return (
    <footer id="contact" className="bg-background">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">John Doe</h3>
            <p className="text-sm text-muted-foreground">
              Frontend Developer & UI/UX Designer based in San Francisco, CA.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:john@example.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="#projects" className="text-sm text-muted-foreground hover:text-foreground">
                Projects
              </Link>
              <Link href="#experience" className="text-sm text-muted-foreground hover:text-foreground">
                Experience
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: john@example.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Location: San Francisco, CA</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to my newsletter for updates on new projects and articles.
            </p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="max-w-[220px]" required />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} John Doe. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Designed and built with ❤️</p>
        </div>
      </div>
    </footer>
  )
}

