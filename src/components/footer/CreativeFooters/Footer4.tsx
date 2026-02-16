import Link from "next/link"
import { Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MinimalContactFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:py-16">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">STUDIO</span>
            </Link>
            <div className="mt-4 flex items-center gap-6">
              <Link
                href="mailto:hello@studio.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                hello@studio.com
              </Link>
              <Link
                href="tel:+12125550123"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                +1 (212) 555-0123
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
            <Button variant="outline" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <div className="flex gap-4">
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
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
