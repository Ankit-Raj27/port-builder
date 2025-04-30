import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react"

export default function DarkFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">NOIR</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Fashion design and photography studio specializing in avant-garde aesthetics and visual storytelling.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h3 className="mb-4 text-lg font-medium">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 transition-colors hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-gray-400 transition-colors hover:text-white">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 transition-colors hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="text-gray-400 transition-colors hover:text-white">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Join Our Community</h3>
              <p className="mb-4 text-gray-400">Stay updated with our latest collections, exhibitions, and events.</p>
              <form className="space-y-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
                />
                <Button className="w-full group">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-gray-800 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Noir Studio. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
