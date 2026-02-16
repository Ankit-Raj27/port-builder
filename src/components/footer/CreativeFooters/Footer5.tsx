import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function SplitFooter() {
  return (
    <footer className="bg-muted">
      <div className="container px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">ATELIER</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Creating timeless designs at the intersection of art and fashion. Sustainable practices, innovative
              techniques, and a commitment to craftsmanship.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-muted-foreground transition-colors hover:text-foreground">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="text-muted-foreground transition-colors hover:text-foreground">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-muted-foreground transition-colors hover:text-foreground">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  123 Atelier Street, Fashion District
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">+1 (212) 555-0123</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">hello@atelier.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Newsletter</h3>
            <p className="mb-4 text-muted-foreground">
              Subscribe to our newsletter for updates on new collections, events, and exclusive content.
            </p>
            <form className="flex flex-col gap-2">
              <Input type="email" placeholder="Your email" className="bg-background" />
              <Button>Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Atelier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
