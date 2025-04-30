"use client"

import * as React from "react"
import Link from "next/link"
import { Search, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { title: "Home", href: "/" },
  { title: "Collections", href: "/collections" },
  { title: "Lookbook", href: "/lookbook" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
]

export default function TransparentNavbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        " top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm text-black" : "bg-transparent text-white",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="relative h-8 w-32">
            <div className="absolute inset-0 flex items-center">
              <span className="text-xl font-bold tracking-tight">LUMIÈRE</span>
            </div>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navigationItems.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full border border-current",
              isScrolled
                ? "text-black hover:text-primary hover:bg-transparent"
                : "text-white hover:text-white hover:bg-white/20",
            )}
          >
            Book Now
          </Button>
        </div>
      </div>
    </header>
  )
}
