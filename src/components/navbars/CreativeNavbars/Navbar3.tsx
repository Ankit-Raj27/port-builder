"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { title: "Work", href: "/work" },
  { title: "About", href: "/about" },
  { title: "Process", href: "/process" },
  { title: "Journal", href: "/journal" },
  { title: "Contact", href: "/contact" },
]

export default function MinimalLogoNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("work")

  return (
    <div>
      <header className=" top-0 left-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-black"></div>
            <span className="text-lg font-medium">NOIR STUDIO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      activeSection === item.title.toLowerCase() && "text-primary",
                    )}
                    onClick={() => setActiveSection(item.title.toLowerCase())}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="container flex h-full flex-col pt-20 pb-6">
          <nav className="flex-1">
            <ul className="flex flex-col space-y-6 py-8">
              {navigationItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-2xl font-light"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setActiveSection(item.title.toLowerCase())
                    }}
                  >
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                        {item.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">Get in touch</p>
              <a href="mailto:hello@noirstudio.com" className="text-sm hover:underline">
                hello@noirstudio.com
              </a>
              <a href="tel:+1234567890" className="text-sm hover:underline">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
